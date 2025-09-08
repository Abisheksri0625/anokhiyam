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

// Student Pages
import StudentProfile from './pages/student/StudentProfile/StudentProfile';
import StudentGrades from './pages/student/StudentGrades/StudentGrades';
import StudentAttendance from './pages/student/StudentAttendance/StudentAttendance';
import StudentAssignments from './pages/student/StudentAssignments/StudentAssignments';
import StudentSchedule from './pages/student/StudentSchedule/StudentSchedule';
import StudentLibrary from './pages/student/StudentLibrary/StudentLibrary';
import StudentHostel from './pages/student/StudentHostel/StudentHostel';
import StudentFees from './pages/student/StudentFees/StudentFees';
import StudentNotifications from './pages/student/StudentNotifications/StudentNotifications';
import StudentSettings from './pages/student/StudentSettings/StudentSettings';

// Admin Pages
import EntranceResults from './pages/Admin/EntranceResults/EntranceResults';
import SemesterResults from './pages/Admin/SemesterResults/SemesterResults';
import PublishResults from './pages/Admin/PublishResults/PublishResults';
import Admissions from './pages/Admin/Admissions/Admissions';
import UserManagement from './pages/Admin/UserManagement/UserManagement';
import Analytics from './pages/Admin/Analytics/Analytics';
import StaffManagement from './pages/Admin/StaffManagement/StaffManagement';
import Notifications from './pages/Admin/Notifications/Notifications';
import Settings from './pages/Admin/Settings/Settings';

// Teacher Pages
import TeacherStudents from './pages/Teacher/TeacherStudents/TeacherStudents';
import TeacherAnalytics from './pages/Teacher/TeacherAnalytics/TeacherAnalytics';
import TeacherInterventions from './pages/Teacher/TeacherInterventions/TeacherInterventions';
import TeacherAssignments from './pages/Teacher/TeacherAssignments/TeacherAssignments';
import TeacherGradebook from './pages/Teacher/TeacherGradebook/TeacherGradebook';
import TeacherAttendance from './pages/Teacher/TeacherAttendance/TeacherAttendance';
import TeacherClasses from './pages/Teacher/TeacherClasses/TeacherClasses';
import TeacherNotifications from './pages/Teacher/TeacherNotifications/TeacherNotifications';
import TeacherSettings from './pages/Teacher/TeacherSettings/TeacherSettings';

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

            {/* Student Routes */}
            <Route path="/student/profile" element={
              <ProtectedRoute requiredRole="student">
                <StudentProfile />
              </ProtectedRoute>
            } />

            <Route path="/student/grades" element={
              <ProtectedRoute requiredRole="student">
                <StudentGrades />
              </ProtectedRoute>
            } />

            <Route path="/student/attendance" element={
              <ProtectedRoute requiredRole="student">
                <StudentAttendance />
              </ProtectedRoute>
            } />

            <Route path="/student/assignments" element={
              <ProtectedRoute requiredRole="student">
                <StudentAssignments />
              </ProtectedRoute>
            } />

            <Route path="/student/schedule" element={
              <ProtectedRoute requiredRole="student">
                <StudentSchedule />
              </ProtectedRoute>
            } />

            <Route path="/student/library" element={
              <ProtectedRoute requiredRole="student">
                <StudentLibrary />
              </ProtectedRoute>
            } />

            <Route path="/student/hostel" element={
              <ProtectedRoute requiredRole="student">
                <StudentHostel />
              </ProtectedRoute>
            } />

            <Route path="/student/fees" element={
              <ProtectedRoute requiredRole="student">
                <StudentFees />
              </ProtectedRoute>
            } />

            <Route path="/student/notifications" element={
              <ProtectedRoute requiredRole="student">
                <StudentNotifications />
              </ProtectedRoute>
            } />

            <Route path="/student/settings" element={
              <ProtectedRoute requiredRole="student">
                <StudentSettings />
              </ProtectedRoute>
            } />
            
            <Route path="/teacher-dashboard" element={
              <ProtectedRoute requiredRole="teacher">
                <TeacherDashboard />
              </ProtectedRoute>
            } />

            {/* Teacher Routes */}
            <Route path="/teacher/students" element={
              <ProtectedRoute requiredRole="teacher">
                <TeacherStudents />
              </ProtectedRoute>
            } />

            <Route path="/teacher/analytics" element={
              <ProtectedRoute requiredRole="teacher">
                <TeacherAnalytics />
              </ProtectedRoute>
            } />

            <Route path="/teacher/interventions" element={
              <ProtectedRoute requiredRole="teacher">
                <TeacherInterventions />
              </ProtectedRoute>
            } />

            <Route path="/teacher/assignments" element={
              <ProtectedRoute requiredRole="teacher">
                <TeacherAssignments />
              </ProtectedRoute>
            } />

            <Route path="/teacher/gradebook" element={
              <ProtectedRoute requiredRole="teacher">
                <TeacherGradebook />
              </ProtectedRoute>
            } />

            <Route path="/teacher/attendance" element={
              <ProtectedRoute requiredRole="teacher">
                <TeacherAttendance />
              </ProtectedRoute>
            } />

            <Route path="/teacher/classes" element={
              <ProtectedRoute requiredRole="teacher">
                <TeacherClasses />
              </ProtectedRoute>
            } />

            <Route path="/teacher/notifications" element={
              <ProtectedRoute requiredRole="teacher">
                <TeacherNotifications />
              </ProtectedRoute>
            } />

            <Route path="/teacher/settings" element={
              <ProtectedRoute requiredRole="teacher">
                <TeacherSettings />
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
