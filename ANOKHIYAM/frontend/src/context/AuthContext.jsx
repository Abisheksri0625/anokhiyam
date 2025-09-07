import React, { createContext, useContext, useEffect, useState } from 'react';
import { 
  onAuthStateChanged, 
  signInWithEmailAndPassword, 
  signOut,
  setPersistence,
  browserSessionPersistence,
  browserLocalPersistence
} from 'firebase/auth';
import { doc, getDoc, query, collection, where, getDocs } from 'firebase/firestore';
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

  // Validate user role against database
  const validateUserRole = async (email, selectedRole) => {
    try {
      console.log('🔍 Validating user role:', { email, selectedRole });
      
      // Query Firestore to find user by email
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
      
      // Check if user is active
      if (!userData.isActive) {
        throw new Error('Your account has been deactivated. Please contact your administrator.');
      }
      
      // Check if selected role matches database role
      if (userData.role !== selectedRole) {
        throw new Error(`Access denied. You are not authorized for ${selectedRole} role. Your authorized role is: ${userData.role}`);
      }
      
      // Store user profile
      setUserProfile(userData);
      
      return userData;
      
    } catch (error) {
      console.error('❌ Role validation error:', error);
      throw error;
    }
  };

  // Login function with role validation
  const login = async (email, password, selectedRole, rememberMe = false) => {
    try {
      // Set persistence based on "Remember Me" checkbox
      const persistence = rememberMe ? browserLocalPersistence : browserSessionPersistence;
      await setPersistence(auth, persistence);
      
      // First authenticate with Firebase
      console.log('🔐 Authenticating with Firebase...');
      const userCredential = await signInWithEmailAndPassword(auth, email, password);
      console.log('✅ Firebase authentication successful');
      
      // Then validate role against database
      console.log('🔍 Validating role...');
      const userData = await validateUserRole(email, selectedRole);
      console.log('✅ Role validation successful');
      
      return { userCredential, userData };
      
    } catch (error) {
      console.error('❌ Login error:', error);
      throw error;
    }
  };

  // Get user's authorized roles
  const getUserRoles = async (email) => {
    try {
      const usersRef = collection(db, 'users');
      const q = query(usersRef, where('email', '==', email));
      const querySnapshot = await getDocs(q);
      
      if (querySnapshot.empty) {
        return [];
      }
      
      const userData = querySnapshot.docs[0].data();
      return [userData.role]; // Return array with user's single authorized role
      
    } catch (error) {
      console.error('Error getting user roles:', error);
      return [];
    }
  };

  // Logout function that clears everything
  const logout = async () => {
    try {
      // Clear stored role and any other app data
      localStorage.removeItem('userRole');
      localStorage.removeItem('lastLoginTime');
      sessionStorage.clear();
      
      // Clear user profile
      setUserProfile(null);
      
      // Sign out from Firebase
      await signOut(auth);
      
      // Reset auth state
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
        // User is signed in
        const storedRole = localStorage.getItem('userRole');
        console.log('📦 Stored role:', storedRole);
        
        if (storedRole) {
          // Validate stored role against database
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
          // No role stored, user needs to select role
          console.log('⚠️ No role stored, user needs to select role');
          setCurrentUser(user);
        }
      } else {
        // User is signed out
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

  // Store login time when user logs in successfully
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
