// components/attendance/Attendance.jsx
import React, { useState, useEffect } from 'react';
import { db, auth } from '../../config/firebase';
import { 
  collection, 
  query, 
  where, 
  getDocs, 
  orderBy 
} from 'firebase/firestore';
import styles from './Attendance.module.css';

const Attendance = () => {
  const [attendanceData, setAttendanceData] = useState([]);
  const [selectedDate, setSelectedDate] = useState('');
  const [loading, setLoading] = useState(true);
  const [overallAttendance, setOverallAttendance] = useState(0);
  const [studentInfo, setStudentInfo] = useState(null);
  const [error, setError] = useState('');

  useEffect(() => {
    fetchStudentAttendance();
  }, []);

  const fetchStudentAttendance = async () => {
    try {
      setLoading(true);
      setError('');
      
      const currentUser = auth.currentUser;
      console.log('Current user:', currentUser);
      
      if (!currentUser) {
        setError('No authenticated user found');
        return;
      }

      console.log('Current user email:', currentUser.email);

      // First, get student info from student_credentials using email
      const studentCredsRef = collection(db, 'student_credentials');
      const studentQuery = query(studentCredsRef, where('loginEmail', '==', currentUser.email));
      const studentSnapshot = await getDocs(studentQuery);
      
      console.log('Student query result:', studentSnapshot.docs.length, 'documents found');
      
      if (studentSnapshot.empty) {
        console.log('No student credentials found for email:', currentUser.email);
        setError('Student credentials not found for your email');
        return;
      }

      const studentData = studentSnapshot.docs[0].data();
      const studentId = studentSnapshot.docs[0].id;
      
      console.log('Student data found:', studentData);
      console.log('Student ID:', studentId);
      
      setStudentInfo({
        ...studentData,
        id: studentId
      });

      // Then fetch attendance records for this student
      const attendanceRef = collection(db, 'attendance');
      const attendanceQuery = query(
        attendanceRef,
        where('studentId', '==', studentId)
      );

      console.log('Fetching attendance for studentId:', studentId);
      const attendanceSnapshot = await getDocs(attendanceQuery);
      
      console.log('Attendance query result:', attendanceSnapshot.docs.length, 'documents found');
      
      if (attendanceSnapshot.empty) {
        console.log('No attendance records found for studentId:', studentId);
        setError('No attendance records found');
        return;
      }

      const attendance = attendanceSnapshot.docs.map(doc => {
        const data = doc.data();
        console.log('Attendance record:', data);
        return {
          id: doc.id,
          ...data
        };
      });

      // Sort by date (newest first)
      attendance.sort((a, b) => new Date(b.date) - new Date(a.date));
      
      setAttendanceData(attendance);
      
      if (attendance.length > 0) {
        setSelectedDate(attendance[0].date);
        calculateOverallAttendance(attendance);
      }

    } catch (error) {
      console.error('Error fetching attendance:', error);
      setError('Error fetching attendance data: ' + error.message);
    } finally {
      setLoading(false);
    }
  };

  const calculateOverallAttendance = (data) => {
    const totalPeriods = data.reduce((acc, day) => acc + (day.totalPeriods || 8), 0);
    const presentPeriods = data.reduce((acc, day) => acc + (day.presentPeriods || 0), 0);
    const percentage = totalPeriods > 0 ? ((presentPeriods / totalPeriods) * 100).toFixed(2) : 0;
    setOverallAttendance(percentage);
  };

  const currentDay = attendanceData.find(d => d.date === selectedDate);

  if (loading) {
    return (
      <div className={styles.container}>
        <div className={styles.loading}>
          <h3>Loading attendance data...</h3>
          <p>Please wait while we fetch your attendance records.</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className={styles.container}>
        <div className={styles.error}>
          <h3>Error Loading Attendance</h3>
          <p>{error}</p>
          <button onClick={() => window.location.reload()} className={styles.retryButton}>
            Try Again
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className={styles.container}>
      <div className={styles.header}>
        <h2>Attendance Report</h2>
        <p className={styles.percentage}>Overall Attendance: {overallAttendance}%</p>
      </div>

      {studentInfo && (
        <div className={styles.studentInfo}>
          <p><strong>Student:</strong> {studentInfo.firstName} {studentInfo.lastName}</p>
          <p><strong>Roll No:</strong> {studentInfo.acceptedStudentId}</p>
          <p><strong>Email:</strong> {studentInfo.loginEmail}</p>
        </div>
      )}

      {attendanceData.length > 0 ? (
        <>
          <div className={styles.controlGroup}>
            <label htmlFor="dateSelect"><strong>Select Date:</strong></label>
            <select
              id="dateSelect"
              value={selectedDate}
              onChange={e => setSelectedDate(e.target.value)}
              className={styles.dropdown}
            >
              {attendanceData.map((record) => (
                <option key={record.id} value={record.date}>
                  {new Date(record.date).toLocaleDateString()} 
                  ({record.presentPeriods}/{record.totalPeriods} Present)
                </option>
              ))}
            </select>
          </div>

          {currentDay && (
            <div className={styles.attendanceDetails}>
              <h3>Attendance for {new Date(currentDay.date).toLocaleDateString()}</h3>
              
              <div className={styles.dayInfo}>
                <p><strong>Submitted by:</strong> {currentDay.submittedBy}</p>
                <p><strong>Submitted at:</strong> {new Date(currentDay.submittedAt).toLocaleString()}</p>
              </div>
              
              <table className={styles.table}>
                <thead>
                  <tr>
                    {Object.keys(currentDay.periods).sort((a, b) => parseInt(a) - parseInt(b)).map((period) => (
                      <th key={period}>Period {period}</th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    {Object.keys(currentDay.periods).sort((a, b) => parseInt(a) - parseInt(b)).map((period) => (
                      <td key={period} className={styles[currentDay.periods[period]]}>
                        {currentDay.periods[period] === 'P' ? 'Present' : 'Absent'}
                      </td>
                    ))}
                  </tr>
                </tbody>
              </table>
              
              <div className={styles.summary}>
                <p><strong>Present:</strong> {currentDay.presentPeriods} / {currentDay.totalPeriods}</p>
                <p><strong>Daily Attendance:</strong> {((currentDay.presentPeriods / currentDay.totalPeriods) * 100).toFixed(2)}%</p>
              </div>
            </div>
          )}
        </>
      ) : (
        <div className={styles.noData}>
          <h3>No Attendance Data Found</h3>
          <p>Your attendance records will appear here once your teacher submits attendance.</p>
          <div className={styles.troubleshoot}>
            <h4>Troubleshooting:</h4>
            <ul>
              <li>Make sure your teacher has submitted attendance</li>
              <li>Check if your email matches your student record</li>
              <li>Contact your teacher if the issue persists</li>
            </ul>
          </div>
        </div>
      )}
    </div>
  );
};

export default Attendance;
