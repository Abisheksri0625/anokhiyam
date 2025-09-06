import React from 'react';
import styles from './TeacherCards.module.css';

const AttendanceCard = ({ avgAttendance = 94, totalClasses = 128, absentToday = 8 }) => {
  return (
    <div className={`${styles.card} ${styles.attendanceCard}`}>
      <div className={styles.cardHeader}>
        <h3 className={styles.cardTitle}>Class Attendance</h3>
        <div className={styles.cardIcon}>
          <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M22 11.08V12C21.9988 14.1564 21.3005 16.2547 20.0093 17.9818C18.7182 19.7088 16.9033 20.9725 14.8354 21.5839C12.7674 22.1953 10.5573 22.1219 8.53447 21.3746C6.51168 20.6273 4.78465 19.2461 3.61096 17.4371C2.43727 15.628 1.87979 13.4905 2.02168 11.3363C2.16356 9.18203 2.99721 7.13214 4.39828 5.49883C5.79935 3.86551 7.69279 2.72636 9.79619 2.24421C11.8996 1.76206 14.1003 1.9584 16.07 2.80999" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
            <polyline points="22,4 12,14.01 9,11.01" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
          </svg>
        </div>
      </div>
      
      <div className={styles.cardContent}>
        <div className={styles.mainValue}>{avgAttendance}%</div>
        <div className={styles.changeValue}>Average Attendance</div>
        <div className={styles.description}>
          {totalClasses} classes • {absentToday} absent today
        </div>
      </div>
    </div>
  );
};

export default AttendanceCard;
