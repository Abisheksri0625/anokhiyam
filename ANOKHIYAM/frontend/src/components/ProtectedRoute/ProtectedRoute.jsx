import React from 'react';
import { Navigate } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';

const ProtectedRoute = ({ children, requiredRole }) => {
  const { currentUser, loading, authInitialized } = useAuth();
  
  // Show loading while auth is initializing
  if (!authInitialized || loading) {
    return (
      <div style={{ 
        display: 'flex', 
        justifyContent: 'center', 
        alignItems: 'center', 
        height: '100vh',
        fontFamily: 'Poppins, sans-serif'
      }}>
        <div>Loading...</div>
      </div>
    );
  }

  // If no user, redirect to login
  if (!currentUser) {
    return <Navigate to="/login" replace />;
  }

  // Check if user has required role
  const userRole = localStorage.getItem('userRole');
  if (requiredRole && userRole !== requiredRole) {
    return <Navigate to="/login" replace />;
  }

  return children;
};

export default ProtectedRoute;
