import { collection, addDoc, query, where, getDocs, orderBy, updateDoc, doc } from 'firebase/firestore';
import { db } from '../config/firebase';

export const admissionService = {
  async submitApplication(applicationData) {
    try {
      console.log('Submitting application...');
      const docRef = await addDoc(collection(db, 'admission_applications'), {
        ...applicationData,
        submissionDate: new Date(),
        status: 'pending',
        priority: Date.now() // FCFS priority
      });
      console.log('Application submitted with ID:', docRef.id);
      return { success: true, id: docRef.id };
    } catch (error) {
      console.error('Error submitting application:', error);
      throw error;
    }
  },

  async getApplicationsByCategory(institutionCode, category) {
    try {
      const q = query(
        collection(db, 'admission_applications'),
        where('institutionCode', '==', institutionCode),
        where('personalInfo.category', '==', category),
        orderBy('priority', 'asc') // FCFS order
      );
      
      const querySnapshot = await getDocs(q);
      const applications = [];
      querySnapshot.forEach((doc) => {
        applications.push({ id: doc.id, ...doc.data() });
      });
      
      return applications;
    } catch (error) {
      console.error('Error fetching applications:', error);
      throw error;
    }
  },

  async updateApplicationStatus(applicationId, status) {
    try {
      const applicationRef = doc(db, 'admission_applications', applicationId);
      await updateDoc(applicationRef, { 
        status, 
        updatedAt: new Date() 
      });
      return { success: true };
    } catch (error) {
      console.error('Error updating application:', error);
      throw error;
    }
  },

  async getAllApplications(institutionCode) {
    try {
      const q = query(
        collection(db, 'admission_applications'),
        where('institutionCode', '==', institutionCode)
      );
      
      const querySnapshot = await getDocs(q);
      const applications = [];
      querySnapshot.forEach((doc) => {
        applications.push({ id: doc.id, ...doc.data() });
      });
      
      return applications;
    } catch (error) {
      console.error('Error fetching all applications:', error);
      throw error;
    }
  }
};
