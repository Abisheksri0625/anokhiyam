import React from 'react';
import styles from './AdminCards.module.css';

const TotalStudentsCard = ({ total = 1250, active = 1180, pending = 70 }) => {
  return (
    <div className={`${styles.card} ${styles.studentsCard}`}>
      <div className={styles.cardHeader}>
        <h3 className={styles.cardTitle}>Total Students</h3>
        <div className={styles.cardIcon}>
          <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M17 21V19C17 17.9391 16.5786 16.9217 15.8284 16.1716C15.0783 15.4214 14.0609 15 13 15H5C3.93913 15 2.92172 15.4214 2.17157 16.1716C1.42143 16.9217 1 17.9391 1 19V21" stroke="currentColor" strokeWidth="2"/>
            <circle cx="9" cy="7" r="4" stroke="currentColor" strokeWidth="2"/>
            <path d="M23 21V19C23 18.1645 22.7155 17.3541 22.2094 16.7006C21.7033 16.047 20.9996 15.5867 20.2 15.3829" stroke="currentColor" strokeWidth="2"/>
            <path d="M16 3.13C16.8604 3.35031 17.623 3.85071 18.1676 4.55232C18.7122 5.25392 19.0078 6.11683 19.0078 7.005C19.0078 7.89318 18.7122 8.75608 18.1676 9.45769C17.623 10.1593 16.8604 10.6597 16 10.88" stroke="currentColor" strokeWidth="2"/>
          </svg>
        </div>
      </div>
      
      <div className={styles.cardContent}>
        <div className={styles.mainValue}>{total.toLocaleString()}</div>
        <div className={styles.changeValue}>{active} Active Students</div>
        <div className={styles.description}>{pending} pending admissions</div>
      </div>
    </div>
  );
};

export default TotalStudentsCard;
