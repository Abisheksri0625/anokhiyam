import { collection, query, where, getDocs } from 'firebase/firestore';
import { db } from '../config/firebase';

export const coursesService = {
  async getCoursesByInstitution(institutionCode) {
    try {
      const q = query(
        collection(db, 'courses'),
        where('institutionCode', '==', institutionCode),
        where('isActive', '==', true)
      );
      
      const querySnapshot = await getDocs(q);
      const courses = [];
      querySnapshot.forEach((doc) => {
        courses.push({ id: doc.id, ...doc.data() });
      });
      
      return courses;
    } catch (error) {
      console.error('Error fetching courses:', error);
      throw error;
    }
  }
};
