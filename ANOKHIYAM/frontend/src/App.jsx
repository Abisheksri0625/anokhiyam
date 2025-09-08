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

// Librarian Pages
import BookManagement from './pages/librarian/BookManagement/BookManagement';
import Inventory from './pages/librarian/Inventory/Inventory';
import IssuedBooks from './pages/librarian/IssuedBooks/IssuedBooks';
import Returns from './pages/librarian/Returns/Returns';
import StudentRecords from './pages/librarian/StudentRecords/StudentRecords';
import OverdueBooks from './pages/librarian/OverdueBooks/OverdueBooks';
import Reports from './pages/librarian/Reports/Reports';
import LibrarianNotifications from './pages/librarian/LibrarianNotifications/LibrarianNotifications';
import LibrarianSettings from './pages/librarian/LibrarianSettings/LibrarianSettings';

// Hostel Warden Pages
import RoomManagement from './pages/hostelwarden/RoomManagement/RoomManagement';
import Occupancy from './pages/hostelwarden/Occupancy/Occupancy';
import HostelStudentRecords from './pages/hostelwarden/StudentRecords/StudentRecords';
import CheckInOut from './pages/hostelwarden/CheckInOut/CheckInOut';
import VisitorLogs from './pages/hostelwarden/VisitorLogs/VisitorLogs';
import Maintenance from './pages/hostelwarden/Maintenance/Maintenance';
import HostelReports from './pages/hostelwarden/Reports/Reports';
import HostelNotifications from './pages/hostelwarden/HostelNotifications/HostelNotifications';
import HostelSettings from './pages/hostelwarden/HostelSettings/HostelSettings';

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

            {/* Librarian Routes */}
            <Route path="/librarian/books" element={
              <ProtectedRoute requiredRole="librarian">
                <BookManagement />
              </ProtectedRoute>
            } />
            <Route path="/librarian/inventory" element={
              <ProtectedRoute requiredRole="librarian">
                <Inventory />
              </ProtectedRoute>
            } />
            <Route path="/librarian/issued-books" element={
              <ProtectedRoute requiredRole="librarian">
                <IssuedBooks />
              </ProtectedRoute>
            } />
            <Route path="/librarian/returns" element={
              <ProtectedRoute requiredRole="librarian">
                <Returns />
              </ProtectedRoute>
            } />
            <Route path="/librarian/students" element={
              <ProtectedRoute requiredRole="librarian">
                <StudentRecords />
              </ProtectedRoute>
            } />
            <Route path="/librarian/overdue" element={
              <ProtectedRoute requiredRole="librarian">
                <OverdueBooks />
              </ProtectedRoute>
            } />
            <Route path="/librarian/reports" element={
              <ProtectedRoute requiredRole="librarian">
                <Reports />
              </ProtectedRoute>
            } />
            <Route path="/librarian/notifications" element={
              <ProtectedRoute requiredRole="librarian">
                <LibrarianNotifications />
              </ProtectedRoute>
            } />
            <Route path="/librarian/settings" element={
              <ProtectedRoute requiredRole="librarian">
                <LibrarianSettings />
              </ProtectedRoute>
            } />
            
            <Route path="/hostel-dashboard" element={
              <ProtectedRoute requiredRole="hostel_warden">
                <HostelDashboard />
              </ProtectedRoute>
            } />

            {/* Hostel Warden Routes */}
            <Route path="/hostel/rooms" element={
              <ProtectedRoute requiredRole="hostel_warden">
                <RoomManagement />
              </ProtectedRoute>
            } />
            <Route path="/hostel/occupancy" element={
              <ProtectedRoute requiredRole="hostel_warden">
                <Occupancy />
              </ProtectedRoute>
            } />
            <Route path="/hostel/students" element={
              <ProtectedRoute requiredRole="hostel_warden">
                <HostelStudentRecords />
              </ProtectedRoute>
            } />
            <Route path="/hostel/check-in-out" element={
              <ProtectedRoute requiredRole="hostel_warden">
                <CheckInOut />
              </ProtectedRoute>
            } />
            <Route path="/hostel/visitors" element={
              <ProtectedRoute requiredRole="hostel_warden">
                <VisitorLogs />
              </ProtectedRoute>
            } />
            <Route path="/hostel/maintenance" element={
              <ProtectedRoute requiredRole="hostel_warden">
                <Maintenance />
              </ProtectedRoute>
            } />
            <Route path="/hostel/reports" element={
              <ProtectedRoute requiredRole="hostel_warden">
                <HostelReports />
              </ProtectedRoute>
            } />
            <Route path="/hostel/notifications" element={
              <ProtectedRoute requiredRole="hostel_warden">
                <HostelNotifications />
              </ProtectedRoute>
            } />
            <Route path="/hostel/settings" element={
              <ProtectedRoute requiredRole="hostel_warden">
                <HostelSettings />
              </ProtectedRoute>
            } />
          </Routes>
        </div>
      </Router>
    </AuthProvider>
  );
}

export default App;
