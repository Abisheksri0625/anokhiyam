import React from 'react';
import styles from './TeacherCards.module.css';

const ClassAverageCard = ({ percentage = 78.5, change = "+2.3% this month", description = "Overall performance" }) => {
  return (
    <div className={`${styles.card} ${styles.classAverageCard}`}>
      <div className={styles.cardHeader}>
        <h3 className={styles.cardTitle}>Class Average</h3>
        <div className={styles.cardIcon}>
          <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
            <polyline points="22,12 18,12 15,21 9,3 6,12 2,12" stroke="currentColor" strokeWidth="2"/>
          </svg>
        </div>
      </div>
      
      <div className={styles.cardContent}>
        <div className={styles.mainValue}>{percentage}%</div>
        <div className={styles.changeValue}>{change}</div>
        <div className={styles.description}>{description}</div>
      </div>
    </div>
  );
};

export default ClassAverageCard;
