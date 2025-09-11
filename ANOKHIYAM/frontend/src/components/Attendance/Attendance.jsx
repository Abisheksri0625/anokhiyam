import React, { useState, useEffect } from 'react';
import { db, auth } from '../../config/firebase';
import {
  collection, 
  query, 
  where, 
  getDocs
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
      if (!currentUser) {
        setError('No authenticated user found');
        return;
      }

      // Get student info
      const studentCredsRef = collection(db, 'student_credentials');
      const studentQuery = query(studentCredsRef, where('loginEmail', '==', currentUser.email));
      const studentSnapshot = await getDocs(studentQuery);
      
      if (studentSnapshot.empty) {
        setError('Student credentials not found for your email');
        return;
      }

      const studentData = studentSnapshot.docs[0].data();
      const studentId = studentSnapshot.docs[0].id;
      
      setStudentInfo({
        ...studentData,
        id: studentId
      });

      // Fetch attendance records
      const attendanceRef = collection(db, 'attendance');
      const attendanceQuery = query(
        attendanceRef,
        where('studentId', '==', studentId)
      );

      const attendanceSnapshot = await getDocs(attendanceQuery);
      
      if (attendanceSnapshot.empty) {
        setError('No attendance records found');
        return;
      }

      const attendance = attendanceSnapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data()
      }));

      attendance.sort((a, b) => new Date(b.date) - new Date(a.date));
      setAttendanceData(attendance);
      
      if (attendance.length > 0) {
        setSelectedDate(attendance[0].date);
        calculateOverallAttendance(attendance);
      }

    } catch (error) {
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
        <div className={styles.centerMessage}>
          <div className={styles.loader}></div>
          <h3>Loading attendance data...</h3>
          <p>Please wait while we fetch your records.</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className={styles.container}>
        <div className={styles.centerMessage}>
          <div className={styles.errorIcon}>⚠️</div>
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
      {/* Header Section */}
      <div className={styles.headerSection}>
        <div className={styles.titleGroup}>
          <h1 className={styles.pageTitle}>My Attendance</h1>
          <div className={styles.overallStats}>
            <span className={styles.attendancePercentage}>{overallAttendance}%</span>
            <span className={styles.attendanceLabel}>Overall</span>
          </div>
        </div>

        {studentInfo && (
          <div className={styles.studentCard}>
            <div className={styles.studentName}>
              {studentInfo.firstName} {studentInfo.lastName}
            </div>
            <div className={styles.studentDetails}>
              <span>Roll No: {studentInfo.acceptedStudentId}</span>
              <span>•</span>
              <span>{studentInfo.loginEmail}</span>
            </div>
          </div>
        )}
      </div>

      {attendanceData.length > 0 ? (
        <>
          {/* Date Selection */}
          <div className={styles.controlSection}>
            <div className={styles.dateSelector}>
              <label className={styles.dateLabel}>Select Date:</label>
              <select
                value={selectedDate}
                onChange={e => setSelectedDate(e.target.value)}
                className={styles.dateSelect}
              >
                {attendanceData.map((record) => (
                  <option key={record.id} value={record.date}>
                    {new Date(record.date).toLocaleDateString('en-US', {
                      weekday: 'short',
                      month: 'short', 
                      day: 'numeric'
                    })} - {record.presentPeriods}/{record.totalPeriods}
                  </option>
                ))}
              </select>
            </div>
          </div>

          {/* Attendance Display */}
          {currentDay && (
            <div className={styles.attendanceSection}>
              <div className={styles.dayHeader}>
                <div className={styles.dateInfo}>
                  <h2>{new Date(currentDay.date).toLocaleDateString('en-US', { 
                    weekday: 'long', 
                    year: 'numeric', 
                    month: 'long', 
                    day: 'numeric' 
                  })}</h2>
                  <p>Submitted: {new Date(currentDay.submittedAt).toLocaleString()}</p>
                </div>
                <div className={styles.dayStats}>
                  <div className={styles.statBox}>
                    <span className={styles.statNumber}>{currentDay.presentPeriods}</span>
                    <span className={styles.statLabel}>Present</span>
                  </div>
                  <div className={styles.statDivider}>/</div>
                  <div className={styles.statBox}>
                    <span className={styles.statNumber}>{currentDay.totalPeriods}</span>
                    <span className={styles.statLabel}>Total</span>
                  </div>
                  <div className={styles.dailyPercentage}>
                    {((currentDay.presentPeriods / currentDay.totalPeriods) * 100).toFixed(1)}%
                  </div>
                </div>
              </div>

              <div className={styles.periodsGrid}>
                {Object.keys(currentDay.periods)
                  .sort((a, b) => parseInt(a) - parseInt(b))
                  .map((period) => (
                    <div 
                      key={period} 
                      className={`${styles.periodCard} ${
                        currentDay.periods[period] === 'P' ? styles.present : styles.absent
                      }`}
                    >
                      <div className={styles.periodNumber}>Period {period}</div>
                      <div className={styles.statusBadge}>
                        <span className={styles.statusIcon}>
                          {currentDay.periods[period] === 'P' ? '✓' : '✗'}
                        </span>
                        <span className={styles.statusText}>
                          {currentDay.periods[period] === 'P' ? 'Present' : 'Absent'}
                        </span>
                      </div>
                    </div>
                  ))}
              </div>
            </div>
          )}
        </>
      ) : (
        <div className={styles.centerMessage}>
          <div className={styles.emptyIcon}>📊</div>
          <h3>No Attendance Records</h3>
          <p>Your attendance will appear here once your teacher marks it.</p>
        </div>
      )}
    </div>
  );
};

export default Attendance;
