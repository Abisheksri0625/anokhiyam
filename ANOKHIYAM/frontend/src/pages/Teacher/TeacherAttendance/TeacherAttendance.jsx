// components/TeachAttendance/TeachAttendance.jsx
import React, { useState, useEffect } from 'react';
import { db } from '../../../config/firebase';
import { collection, getDocs, addDoc, query, where } from 'firebase/firestore';
import TeacherSidebar from '../../../components/TeacherSidebar/TeacherSidebar';
import TeacherHeader from '../../../components/TeacherHeader/TeacherHeader';
import styles from './TeacherAttendance.module.css';

const TeachAttendance = () => {
  const [students, setStudents] = useState([]);
  const [selectedDate, setSelectedDate] = useState(new Date().toISOString().split('T')[0]);
  const [attendance, setAttendance] = useState({});
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [isCollapsed, setIsCollapsed] = useState(() => {
    return localStorage.getItem('teacherSidebarCollapsed') === 'true';
  });

  useEffect(() => {
    fetchStudents();
  }, []);

  useEffect(() => {
    localStorage.setItem('teacherSidebarCollapsed', isCollapsed);
  }, [isCollapsed]);

  const fetchStudents = async () => {
    try {
      const studentsRef = collection(db, 'student_credentials');
      const snapshot = await getDocs(studentsRef);
      const studentList = snapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data()
      }));
      
      setStudents(studentList);
      
      // Initialize attendance state
      const initialAttendance = {};
      studentList.forEach(student => {
        initialAttendance[student.id] = {
          1: 'P', 2: 'P', 3: 'P', 4: 'P', 5: 'P', 6: 'P'
        };
      });
      setAttendance(initialAttendance);
    } catch (error) {
      console.error('Error fetching students:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleAttendanceChange = (studentId, period, status) => {
    setAttendance(prev => ({
      ...prev,
      [studentId]: {
        ...prev[studentId],
        [period]: status
      }
    }));
  };

  const submitAttendance = async () => {
    try {
      setSaving(true);
      
      for (const studentId of Object.keys(attendance)) {
        const presentPeriods = Object.values(attendance[studentId]).filter(status => status === 'P').length;
        const totalPeriods = Object.keys(attendance[studentId]).length;
        
        await addDoc(collection(db, 'attendance'), {
          studentId,
          date: selectedDate,
          periods: attendance[studentId],
          presentPeriods,
          totalPeriods,
          submittedAt: new Date().toISOString()
        });
      }
      
      alert('Attendance submitted successfully!');
    } catch (error) {
      console.error('Error submitting attendance:', error);
      alert('Error submitting attendance');
    } finally {
      setSaving(false);
    }
  };

  if (loading) {
    return (
      <div className={styles.pageContainer}>
        <TeacherSidebar
          activeItem="attendance"
          isCollapsed={isCollapsed}
          setIsCollapsed={setIsCollapsed}
        />
        
        <div className={`${styles.mainContent} ${isCollapsed ? styles.collapsed : ''}`}>
          <TeacherHeader isCollapsed={isCollapsed} />
          
          <div className={styles.loadingContainer}>
            <div className={styles.loadingSpinner}></div>
            <p>Loading students...</p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className={styles.pageContainer}>
      {/* Sidebar */}
      <TeacherSidebar
        activeItem="attendance"
        isCollapsed={isCollapsed}
        setIsCollapsed={setIsCollapsed}
      />

      {/* Main Content */}
      <div className={`${styles.mainContent} ${isCollapsed ? styles.collapsed : ''}`}>
        {/* Header */}
        <TeacherHeader isCollapsed={isCollapsed} />

        {/* Page Content */}
        <div className={styles.pageContent}>
          {/* Content Container */}
          <div className={styles.contentContainer}>
            {/* Date Selection Header */}
            <div className={styles.controlsHeader}>
              <h2 className={styles.sectionTitle}>Attendance System</h2>
              <div className={styles.dateSection}>
                <label>Select Date: </label>
                <input
                  type="date"
                  value={selectedDate}
                  onChange={(e) => setSelectedDate(e.target.value)}
                  className={styles.dateInput}
                />
              </div>
            </div>

            {/* Stats Bar */}
            <div className={styles.statsBar}>
              <div>Total Students: {students.length}</div>
              <div>Date: {new Date(selectedDate).toLocaleDateString()}</div>
            </div>

            {/* Scrollable Attendance Table */}
            <div className={styles.tableContainer}>
              <table className={styles.attendanceTable}>
                <thead>
                  <tr>
                    <th>S.NO</th>
                    <th>STUDENT NAME</th>
                    <th>ROLL NO</th>
                    <th>PERIOD 1</th>
                    <th>PERIOD 2</th>
                    <th>PERIOD 3</th>
                    <th>PERIOD 4</th>
                    <th>PERIOD 5</th>
                    <th>PERIOD 6</th>
                  </tr>
                </thead>
                <tbody>
                  {students.map((student, index) => (
                    <tr key={student.id} className={index % 2 === 0 ? styles.evenRow : styles.oddRow}>
                      <td className={styles.snoCell}>{index + 1}</td>
                      <td className={styles.nameCell}>{student.firstName} {student.lastName}</td>
                      <td className={styles.rollCell}>{student.acceptedStudentId}</td>
                      {[1, 2, 3, 4, 5, 6].map(period => (
                        <td key={period} className={styles.periodCell}>
                          <select
                            value={attendance[student.id]?.[period] || 'P'}
                            onChange={(e) => handleAttendanceChange(student.id, period, e.target.value)}
                            className={`${styles.attendanceSelect} ${
                              attendance[student.id]?.[period] === 'P' ? styles.present : styles.absent
                            }`}
                          >
                            <option value="P">Present</option>
                            <option value="A">Absent</option>
                          </select>
                        </td>
                      ))}
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            {/* Submit Button */}
            <div className={styles.submitSection}>
              <button
                onClick={submitAttendance}
                disabled={saving}
                className={styles.submitButton}
              >
                {saving ? 'Submitting...' : 'Submit Attendance'}
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TeachAttendance;
