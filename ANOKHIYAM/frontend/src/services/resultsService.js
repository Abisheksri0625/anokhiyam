import { collection, addDoc, query, where, getDocs, writeBatch, doc } from 'firebase/firestore';
import { db } from '../config/firebase';

export const resultsService = {
  // Upload CSV results to database
  async uploadResults(csvData, institutionCode) {
    try {
      console.log('Processing CSV data...');
      const batch = writeBatch(db);
      let successCount = 0;

      for (const row of csvData) {
        // Skip empty rows
        if (!row.uid || !row.studentName) {
          console.warn('Skipping invalid row:', row);
          continue;
        }

        // Process subjects from CSV
        const subjects = this.extractSubjects(row);
        const totalMarks = subjects.length * 100;
        const obtainedMarks = subjects.reduce((sum, subject) => sum + subject.marks, 0);
        const percentage = totalMarks > 0 ? ((obtainedMarks / totalMarks) * 100) : 0;
        const result = percentage >= 35 ? 'PASS' : 'FAIL';

        const docData = {
          institutionCode,
          uid: row.uid,
          studentName: row.studentName,
          dob: row.dob,
          subjects: subjects,
          totalMarks: totalMarks,
          obtainedMarks: obtainedMarks,
          percentage: Math.round(percentage * 100) / 100,
          result: result,
          publishDate: new Date(),
          createdAt: new Date()
        };

        const docRef = doc(collection(db, 'entrance_results'));
        batch.set(docRef, docData);
        successCount++;
      }

      await batch.commit();
      console.log(`Successfully uploaded ${successCount} results`);
      return { success: true, count: successCount };
      
    } catch (error) {
      console.error('Error uploading results:', error);
      throw new Error(`Failed to upload results: ${error.message}`);
    }
  },

  // Extract subject marks from CSV row
  extractSubjects(row) {
    const subjects = [];
    const subjectFields = ['physics', 'chemistry', 'mathematics', 'biology', 'english'];
    
    Object.keys(row).forEach(key => {
      const lowerKey = key.toLowerCase();
      const value = row[key];
      
      // Check if it's a subject field and has a numeric value
      if (subjectFields.some(subject => lowerKey.includes(subject)) && 
          !isNaN(value) && value !== '') {
        subjects.push({
          name: key.charAt(0).toUpperCase() + key.slice(1).toLowerCase(),
          marks: parseInt(value)
        });
      }
    });

    return subjects;
  },

  // Get student result by credentials
  async getStudentResult(institutionCode, uid, dob) {
    try {
      const q = query(
        collection(db, 'entrance_results'),
        where('institutionCode', '==', institutionCode),
        where('uid', '==', uid),
        where('dob', '==', dob)
      );
      
      const querySnapshot = await getDocs(q);
      if (!querySnapshot.empty) {
        const doc = querySnapshot.docs[0];
        return { id: doc.id, ...doc.data() };
      }
      return null;
    } catch (error) {
      console.error('Error fetching result:', error);
      throw new Error('Failed to fetch result');
    }
  }
};
