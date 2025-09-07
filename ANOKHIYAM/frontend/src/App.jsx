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

// Admin Pages
import EntranceResults from './pages/Admin/EntranceResults/EntranceResults';
import SemesterResults from './pages/Admin/SemesterResults/SemesterResults';
import PublishResults from './pages/Admin/PublishResults/PublishResults';
import Admissions from './pages/Admin/Admissions/Admissions';
import UserManagement from './pages/Admin/UserManagement/UserManagement';
import Analytics from './pages/Admin/Analytics/Analytics';
import StaffManagement from './pages/Admin/StaffManagement/StaffManagement'; // Changed from SystemSettings
import Notifications from './pages/Admin/Notifications/Notifications';
import Settings from './pages/Admin/Settings/Settings';

import './index.css';

function App() {
  return (
    <AuthProvider>
      <Router>
        <div className="app">
          <Routes>
            <Route path="/" element={<LandingPage />} />
            <Route path="/login" element={<Login />} />
            
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

            {/* Admin Routes */}
            <Route path="/admin/entrance-results" element={
              <ProtectedRoute requiredRole="admin">
                <EntranceResults />
              </ProtectedRoute>
            } />

            <Route path="/admin/semester-results" element={
              <ProtectedRoute requiredRole="admin">
                <SemesterResults />
              </ProtectedRoute>
            } />

            <Route path="/admin/publish-results" element={
              <ProtectedRoute requiredRole="admin">
                <PublishResults />
              </ProtectedRoute>
            } />

            <Route path="/admin/admissions" element={
              <ProtectedRoute requiredRole="admin">
                <Admissions />
              </ProtectedRoute>
            } />

            <Route path="/admin/users" element={
              <ProtectedRoute requiredRole="admin">
                <UserManagement />
              </ProtectedRoute>
            } />

            <Route path="/admin/analytics" element={
              <ProtectedRoute requiredRole="admin">
                <Analytics />
              </ProtectedRoute>
            } />

            <Route path="/admin/staff" element={
              <ProtectedRoute requiredRole="admin">
                <StaffManagement />
              </ProtectedRoute>
            } />

            <Route path="/admin/notifications" element={
              <ProtectedRoute requiredRole="admin">
                <Notifications />
              </ProtectedRoute>
            } />

            <Route path="/admin/settings" element={
              <ProtectedRoute requiredRole="admin">
                <Settings />
              </ProtectedRoute>
            } />
            
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
