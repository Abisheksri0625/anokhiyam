import React from 'react';
import styles from './StudentCards.module.css';

const AcademicCard = ({ cgpa = 8.5, semester = "7th", credits = 156, rank = 12 }) => {
  return (
    <div className={`${styles.card} ${styles.academicCard}`}>
      <div className={styles.cardHeader}>
        <h3 className={styles.cardTitle}>Academic Performance</h3>
        <div className={styles.cardIcon}>
          <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M12 6.253V16.64L7 13.82V4.428L12 6.253Z" stroke="currentColor" strokeWidth="2"/>
            <path d="M12 6.253L17 4.428V13.82L12 16.64V6.253Z" stroke="currentColor" strokeWidth="2"/>
            <path d="M7 4.428L12 2.603L17 4.428L12 6.253L7 4.428Z" stroke="currentColor" strokeWidth="2"/>
          </svg>
        </div>
      </div>
      
      <div className={styles.cardContent}>
        <div className={styles.mainValue}>{cgpa}/10</div>
        <div className={styles.changeValue}>Current CGPA</div>
        <div className={styles.description}>
          {semester} Semester • {credits} Credits • Rank #{rank}
        </div>
      </div>
      
      <div className={styles.progressBar}>
        <div className={styles.progressFill} style={{width: `${(cgpa/10) * 100}%`}}></div>
      </div>
    </div>
  );
};

export default AcademicCard;
