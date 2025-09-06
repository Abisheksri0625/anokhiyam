import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { AuthProvider } from './context/AuthContext';
import ProtectedRoute from './components/ProtectedRoute/ProtectedRoute';

// Components
import Header from './components/Header/Header';
import HeroSection from './components/HeroSection/HeroSection';
import FeaturesGrid from './components/FeaturesGrid/FeaturesGrid';
import AboutSection from './components/AboutSection/AboutSection';
import StatsSection from './components/StatsSection/StatsSection';
import Login from './pages/Login/Login';
import StudentDashboard from './pages/StudentDashboard/StudentDashboard';
import TeacherDashboard from './pages/TeacherDashboard/TeacherDashboard';
import AdminDashboard from './pages/AdminDashboard/AdminDashboard';
import LibrarianDashboard from './pages/LibrarianDashboard/LibrarianDashboard';
import HostelDashboard from './pages/HostelDashboard/HostelDashboard';

import './index.css';

// Landing Page Component
const LandingPage = () => (
  <>
    <Header />
    <HeroSection />
    <FeaturesGrid />
    <AboutSection />
    <StatsSection />
  </>
);

function App() {
  return (
    <AuthProvider>
      <Router>
        <div className="app">
          <Routes>
            <Route path="/" element={<LandingPage />} />
            <Route path="/login" element={<Login />} />
            
            {/* Protected Routes */}
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
