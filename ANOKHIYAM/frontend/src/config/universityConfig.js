import { doc, getDoc, collection, getDocs, query, where } from 'firebase/firestore';
import { db } from './firebase';

// Get university configuration by institution code
export const getUniversityConfigByCode = async (institutionCode) => {
  try {
    console.log('🔍 Fetching university config for code:', institutionCode);
    
    // Query by institution code
    const configsRef = collection(db, 'university_configs');
    const q = query(configsRef, where('institutionCode', '==', institutionCode));
    const querySnapshot = await getDocs(q);
    
    if (!querySnapshot.empty) {
      const configDoc = querySnapshot.docs[0];
      const config = configDoc.data();
      console.log('✅ University config loaded:', config);
      
      // Store the university ID for future use
      localStorage.setItem('currentUniversityId', configDoc.id);
      
      return config;
    } else {
      console.log('⚠️ No config found for institution code:', institutionCode);
      return null;
    }
  } catch (error) {
    console.error('❌ Error fetching university config:', error);
    return null;
  }
};

// Get university configuration by document ID
export const getUniversityConfig = async (universityId = 'demo_university') => {
  try {
    console.log('🔍 Fetching university config for ID:', universityId);
    
    const configRef = doc(db, 'university_configs', universityId);
    const configSnap = await getDoc(configRef);
    
    if (configSnap.exists()) {
      const config = configSnap.data();
      console.log('✅ University config loaded:', config);
      return config;
    } else {
      console.log('⚠️ No config found, using default');
      return {
        universityId,
        name: 'Default University',
        package: 'BASIC',
        enabled_roles: ['student', 'teacher'],
        enabled_features: {
          student_dashboard: ['grades', 'attendance', 'profile'],
          teacher_dashboard: ['grade_entry', 'attendance_marking']
        },
        isActive: true
      };
    }
  } catch (error) {
    console.error('❌ Error fetching university config:', error);
    return null;
  }
};

// ✅ ADD: Missing getCurrentUniversityId function
export const getCurrentUniversityId = () => {
  return localStorage.getItem('currentUniversityId') || 'demo_university';
};

// ✅ ADD: Missing setCurrentUniversityId function
export const setCurrentUniversityId = (universityId) => {
  localStorage.setItem('currentUniversityId', universityId);
  console.log('🏫 Current university set to:', universityId);
};

// Validate institution code
export const validateInstitutionCode = async (institutionCode) => {
  try {
    const config = await getUniversityConfigByCode(institutionCode);
    return config !== null && config.isActive;
  } catch (error) {
    console.error('❌ Error validating institution code:', error);
    return false;
  }
};
