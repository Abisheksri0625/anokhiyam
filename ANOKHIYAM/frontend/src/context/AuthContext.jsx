import React, { createContext, useContext, useEffect, useState } from 'react';
import { 
  onAuthStateChanged, 
  signInWithEmailAndPassword, 
  signOut,
  setPersistence,
  browserSessionPersistence,
  browserLocalPersistence,
  createUserWithEmailAndPassword
} from 'firebase/auth';
import { doc, query, collection, where, getDocs, updateDoc, serverTimestamp } from 'firebase/firestore';
import { auth, db } from '../config/firebase';

const AuthContext = createContext({});

export const useAuth = () => {
  return useContext(AuthContext);
};

export const AuthProvider = ({ children }) => {
  const [currentUser, setCurrentUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [authInitialized, setAuthInitialized] = useState(false);
  const [userProfile, setUserProfile] = useState(null);

  const validateUserRole = async (email, selectedRole) => {
    try {
      console.log('🔍 Validating user role:', { email, selectedRole });
      
      const usersRef = collection(db, 'users');
      const q = query(usersRef, where('email', '==', email));
      const querySnapshot = await getDocs(q);
      
      if (querySnapshot.empty) {
        console.error('❌ User not found in database');
        throw new Error('User not found in system database. Please contact your administrator.');
      }
      
      const userDoc = querySnapshot.docs[0];
      const userData = userDoc.data();
      
      console.log('✅ User data from database:', userData);
      
      if (!userData.isActive) {
        throw new Error('Your account has been deactivated. Please contact your administrator.');
      }
      
      if (userData.role !== selectedRole) {
        throw new Error(`Access denied. You are not authorized for ${selectedRole} role. Your authorized role is: ${userData.role}`);
      }
      
      setUserProfile(userData);
      return userData;
      
    } catch (error) {
      console.error('❌ Role validation error:', error);
      throw error;
    }
  };

  const login = async (email, password, selectedRole, rememberMe = false) => {
    try {
      const persistence = rememberMe ? browserLocalPersistence : browserSessionPersistence;
      await setPersistence(auth, persistence);
      
      console.log('🔐 Starting login process...');
      
      // Check Firestore user first
      const usersRef = collection(db, 'users');
      const q = query(usersRef, where('email', '==', email));
      const querySnapshot = await getDocs(q);
      
      if (querySnapshot.empty) {
        throw new Error('User not found in system database. Please contact your administrator.');
      }
      
      const userDoc = querySnapshot.docs[0];
      const userData = userDoc.data();
      
      console.log('✅ User found in Firestore:', userData);
      
      if (!userData.isActive) {
        throw new Error('Your account has been deactivated. Please contact your administrator.');
      }
      
      if (userData.role !== selectedRole) {
        throw new Error(`Access denied. You are not authorized for ${selectedRole} role. Your authorized role is: ${userData.role}`);
      }
      
      let userCredential;
      
      // Handle first-time student login
      if (userData.role === 'student' && userData.tempPassword && !userData.passwordChanged) {
        console.log('🆕 First-time student login detected');
        console.log('🔍 Temp password from DB:', userData.tempPassword);
        console.log('🔍 Input password:', password);
        
        if (password !== userData.tempPassword) {
          throw new Error('Invalid temporary password. Please use the password sent to your email.');
        }
        
        console.log('✅ Creating Firebase Auth account for student...');
        userCredential = await createUserWithEmailAndPassword(auth, email, password);
        
        await updateDoc(doc(db, 'users', userDoc.id), {
          passwordChanged: true,
          firstLogin: serverTimestamp(),
          tempPassword: null
        });
        
        console.log('✅ Student Firebase Auth account created successfully');
      } else {
        console.log('🔐 Regular Firebase Auth login...');
        userCredential = await signInWithEmailAndPassword(auth, email, password);
      }
      
      console.log('✅ Authentication successful');
      setUserProfile(userData);
      
      return { userCredential, userData };
      
    } catch (error) {
      console.error('❌ Login error:', error);
      throw error;
    }
  };

  const getUserRoles = async (email) => {
    try {
      const usersRef = collection(db, 'users');
      const q = query(usersRef, where('email', '==', email));
      const querySnapshot = await getDocs(q);
      
      if (querySnapshot.empty) {
        return [];
      }
      
      const userData = querySnapshot.docs[0].data();
      return [userData.role];
      
    } catch (error) {
      console.error('Error getting user roles:', error);
      return [];
    }
  };

  const logout = async () => {
    try {
      localStorage.removeItem('userRole');
      localStorage.removeItem('lastLoginTime');
      sessionStorage.clear();
      
      setUserProfile(null);
      await signOut(auth);
      setCurrentUser(null);
      
      console.log('✅ User logged out successfully');
    } catch (error) {
      console.error('❌ Logout error:', error);
      throw error;
    }
  };

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (user) => {
      console.log('🔄 Auth state changed:', user ? user.email : 'No user');
      
      if (user) {
        const storedRole = localStorage.getItem('userRole');
        console.log('📦 Stored role:', storedRole);
        
        if (storedRole) {
          try {
            console.log('🔍 Validating stored role...');
            await validateUserRole(user.email, storedRole);
            setCurrentUser(user);
            console.log('✅ User authenticated with valid role');
          } catch (error) {
            console.error('❌ Stored role validation failed:', error);
            await logout();
            setCurrentUser(null);
          }
        } else {
          console.log('⚠️ No role stored, user needs to select role');
          setCurrentUser(user);
        }
      } else {
        console.log('👋 User signed out');
        setCurrentUser(null);
        setUserProfile(null);
        localStorage.removeItem('userRole');
        localStorage.removeItem('lastLoginTime');
      }
      
      setLoading(false);
      setAuthInitialized(true);
    });

    return unsubscribe;
  }, []);

  const setLoginTime = () => {
    localStorage.setItem('lastLoginTime', Date.now().toString());
  };

  const value = {
    currentUser,
    userProfile,
    login,
    logout,
    loading,
    authInitialized,
    setLoginTime,
    validateUserRole,
    getUserRoles
  };

  return (
    <AuthContext.Provider value={value}>
      {!loading && children}
    </AuthContext.Provider>
  );
};
