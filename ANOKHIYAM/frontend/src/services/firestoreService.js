import {
  collection,
  doc,
  getDocs,
  getDoc,
  addDoc,
  updateDoc,
  deleteDoc,
  query,
  where,
  orderBy,
  limit,
  serverTimestamp
} from 'firebase/firestore';
import { db } from './firebase';

export const getUniversityConfig = async (universityId) => {
  try {
    const docRef = doc(db, 'university_configs', universityId);
    const docSnap = await getDoc(docRef);
    if (docSnap.exists()) {
      return { id: docSnap.id, ...docSnap.data() };
    } else {
      throw new Error('University configuration not found');
    }
  } catch (error) {
    console.error('Error fetching university config:', error);
    throw error;
  }
};

export const saveEntranceResults = async (resultsData) => {
  try {
    const docRef = await addDoc(collection(db, 'entrance_results'), {
      ...resultsData,
      created_at: serverTimestamp(),
      updated_at: serverTimestamp()
    });
    return docRef.id;
  } catch (error) {
    console.error('Error saving entrance results:', error);
    throw error;
  }
};

export const checkStudentResult = async (institutionCode, studentId, rollNumber, dateOfBirth) => {
  try {
    const q = query(collection(db, 'entrance_results'), where('institutionCode', '==', institutionCode));
    const querySnapshot = await getDocs(q);
    
    for (const doc of querySnapshot.docs) {
      const data = doc.data();
      const studentResult = data.results?.find(student => 
        student.studentId === studentId && 
        student.rollNumber === rollNumber && 
        student.dateOfBirth === dateOfBirth
      );
      
      if (studentResult) {
        return {
          found: true,
          resultId: doc.id,
          institutionData: { code: data.institutionCode, name: data.institutionName || 'Institution' },
          studentData: studentResult,
          examData: { subjects: data.subjects, publishedAt: data.publishedAt, category: data.studentCategory }
        };
      }
    }
    return { found: false };
  } catch (error) {
    console.error('Error checking student result:', error);
    throw error;
  }
};

export const submitAdmissionApplication = async (applicationData) => {
  try {
    const docRef = await addDoc(collection(db, 'admission_applications'), {
      ...applicationData,
      status: 'pending',
      submitted_at: serverTimestamp(),
      created_at: serverTimestamp(),
      updated_at: serverTimestamp()
    });
    return docRef.id;
  } catch (error) {
    console.error('Error submitting admission application:', error);
    throw error;
  }
};

export const getAdmissionApplications = async (institutionCode) => {
  try {
    const q = query(collection(db, 'admission_applications'), where('institutionCode', '==', institutionCode), orderBy('submitted_at', 'desc'));
    const querySnapshot = await getDocs(q);
    return querySnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
  } catch (error) {
    console.error('Error fetching admission applications:', error);
    throw error;
  }
};

export const updateApplicationStatus = async (applicationId, status, reviewData) => {
  try {
    const docRef = doc(db, 'admission_applications', applicationId);
    await updateDoc(docRef, {
      status,
      ...reviewData,
      reviewed_at: serverTimestamp(),
      updated_at: serverTimestamp()
    });
    return applicationId;
  } catch (error) {
    console.error('Error updating application status:', error);
    throw error;
  }
};

export const getSubjectsConfig = async (institutionCode) => {
  try {
    const docRef = doc(db, 'subjects_config', institutionCode);
    const docSnap = await getDoc(docRef);
    if (docSnap.exists()) {
      return { id: docSnap.id, ...docSnap.data() };
    } else {
      return {
        id: institutionCode,
        subjects: {
          '12th': ['Mathematics', 'Science', 'Chemistry'],
          'pg': ['Advanced Physics', 'Advanced Chemistry', 'Advanced Mathematics']
        }
      };
    }
  } catch (error) {
    console.error('Error fetching subjects config:', error);
    throw error;
  }
};

export const saveSubjectsConfig = async (institutionCode, subjects) => {
  try {
    const docRef = doc(db, 'subjects_config', institutionCode);
    await updateDoc(docRef, { subjects, updated_at: serverTimestamp() });
    return institutionCode;
  } catch (error) {
    console.error('Error saving subjects config:', error);
    throw error;
  }
};

export const getAdmissionStats = async (institutionCode) => {
  try {
    const applications = await getAdmissionApplications(institutionCode);
    const stats = {
      total: applications.length,
      pending: applications.filter(app => app.status === 'pending').length,
      accepted: applications.filter(app => app.status === 'accepted').length,
      rejected: applications.filter(app => app.status === 'rejected').length
    };
    return stats;
  } catch (error) {
    console.error('Error fetching admission stats:', error);
    throw error;
  }
};
