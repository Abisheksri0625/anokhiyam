import React, { createContext, useContext, useState, useEffect } from 'react';
import { 
  onAuthStateChanged, 
  signInWithEmailAndPassword, 
  signOut,
  setPersistence,
  browserSessionPersistence,
  browserLocalPersistence
} from 'firebase/auth';
import { doc, getDoc, query, collection, where, getDocs } from 'firebase/firestore';
import { auth, db } from '../services/firebase';

const AuthContext = createContext({});

export const useAuth = () => {
  return useContext(AuthContext);
};

export const AuthProvider = ({ children }) => {
  const [currentUser, setCurrentUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [userProfile, setUserProfile] = useState(null);

  // Validate user role against database
  const validateUserRole = async (email, selectedRole) => {
    try {
      const usersRef = collection(db, 'users');
      const q = query(usersRef, where('email', '==', email));
      const querySnapshot = await getDocs(q);
      
      if (querySnapshot.empty) {
        throw new Error('User not found in system database. Please contact your administrator.');
      }
      
      const userDoc = querySnapshot.docs[0];
      const userData = userDoc.data();
      
      if (!userData.isActive) {
        throw new Error('Your account has been deactivated. Please contact your administrator.');
      }
      
      if (userData.role !== selectedRole) {
        throw new Error(`Access denied. You are not authorized for ${selectedRole} role. Your authorized role is: ${userData.role}`);
      }
      
      setUserProfile(userData);
      return userData;
      
    } catch (error) {
      console.error('Role validation error:', error);
      throw error;
    }
  };

  // Login function with role validation
  const login = async (email, password, selectedRole, rememberMe = false) => {
    try {
      const persistence = rememberMe ? browserLocalPersistence : browserSessionPersistence;
      await setPersistence(auth, persistence);
      
      const userCredential = await signInWithEmailAndPassword(auth, email, password);
      const userData = await validateUserRole(email, selectedRole);
      
      return { userCredential, userData };
      
    } catch (error) {
      console.error('Login error:', error);
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
      return [userData.role];
      
    } catch (error) {
      console.error('Error getting user roles:', error);
      return [];
    }
  };

  // Logout function
  const logout = async () => {
    try {
      localStorage.removeItem('userRole');
      setUserProfile(null);
      await signOut(auth);
      setCurrentUser(null);
    } catch (error) {
      console.error('Logout error:', error);
      throw error;
    }
  };

  useEffect(() => {
    let isCancelled = false;

    const unsubscribe = onAuthStateChanged(auth, async (user) => {
      if (isCancelled) return;

      if (user) {
        const storedRole = localStorage.getItem('userRole');
        if (storedRole) {
          try {
            await validateUserRole(user.email, storedRole);
            if (!isCancelled) {
              setCurrentUser(user);
            }
          } catch (error) {
            if (!isCancelled) {
              await logout();
            }
          }
        } else {
          if (!isCancelled) {
            setCurrentUser(user);
          }
        }
      } else {
        if (!isCancelled) {
          setCurrentUser(null);
          setUserProfile(null);
        }
      }
      
      if (!isCancelled) {
        setLoading(false);
      }
    });

    return () => {
      isCancelled = true;
      unsubscribe();
    };
  }, []);

  const value = {
    currentUser,
    userProfile,
    login,
    logout,
    loading,
    validateUserRole,
    getUserRoles
  };

  return (
    <AuthContext.Provider value={value}>
      {!loading && children}
    </AuthContext.Provider>
  );
};
