import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { AuthProvider } from './context/AuthContext';
import ProtectedRoute from './components/ProtectedRoute/ProtectedRoute';

// Pages
import LandingPage from './pages/LandingPage/LandingPage';
import Login from './pages/Login/Login';
import StudentDashboard from './pages/StudentDashboard/StudentDashboard';
import TeacherDashboard from './pages/TeacherDashboard/TeacherDashboard';
import AdminDashboard from './pages/AdminDashboard/AdminDashboard';
import LibrarianDashboard from './pages/LibrarianDashboard/LibrarianDashboard';
import HostelDashboard from './pages/HostelDashboard/HostelDashboard';
import AdmissionForm from './pages/AdmissionForm/AdmissionForm';

// New Admin Pages
import EntranceResults from './pages/EntranceResults/EntranceResults';
import Admissions from './pages/Admissions/Admissions';

// Public Pages
import CheckResults from './pages/CheckResults/CheckResults';

import './index.css';

function App() {
  return (
    <AuthProvider>
      <Router>
        <div className="app">
          <Routes>
            {/* Public Routes */}
            <Route path="/" element={<LandingPage />} />
            <Route path="/login" element={<Login />} />
            <Route path="/check-results" element={<CheckResults />} />
            <Route path="/admission-form" element={<AdmissionForm />} />
            
            {/* Protected Dashboard Routes */}
            <Route path="/student-dashboard" element={
              <ProtectedRoute requiredRole="student">
                <StudentDashboard />
              </ProtectedRoute>
            } />
            
            <Route path="/teacher-dashboard" element={
              <ProtectedRoute requiredRole="teacher">
                <TeacherDashboard />
              </ProtectedRoute>
            } />
            
            <Route path="/admin-dashboard" element={
              <ProtectedRoute requiredRole="admin">
                <AdminDashboard />
              </ProtectedRoute>
            } />

            {/* Protected Admin Function Routes */}
            <Route path="/admin/entrance-results" element={
              <ProtectedRoute requiredRole="admin">
                <EntranceResults />
              </ProtectedRoute>
            } />
            
            <Route path="/admin/admissions" element={
              <ProtectedRoute requiredRole="admin">
                <Admissions />
              </ProtectedRoute>
            } />
            
            {/* Other Protected Dashboard Routes */}
            <Route path="/librarian-dashboard" element={
              <ProtectedRoute requiredRole="librarian">
                <LibrarianDashboard />
              </ProtectedRoute>
            } />
            
            <Route path="/hostel-dashboard" element={
              <ProtectedRoute requiredRole="hostel_warden">
                <HostelDashboard />
              </ProtectedRoute>
            } />
          </Routes>
        </div>
      </Router>
    </AuthProvider>
  );
}

export default App;
