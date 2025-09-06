import React from 'react';
import styles from './TeacherCards.module.css';

const ActiveInterventionsCard = ({ count = 4, description = "Students receiving support" }) => {
  return (
    <div className={`${styles.card} ${styles.interventionsCard}`}>
      <div className={styles.cardHeader}>
        <h3 className={styles.cardTitle}>Active Interventions</h3>
        <div className={styles.cardIcon}>
          <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M16 21V19C16 17.9391 15.5786 16.9217 14.8284 16.1716C14.0783 15.4214 13.0609 15 12 15H5C3.93913 15 2.92172 15.4214 2.17157 16.1716C1.42143 16.9217 1 17.9391 1 19V21" stroke="currentColor" strokeWidth="2"/>
            <circle cx="8.5" cy="7" r="4" stroke="currentColor" strokeWidth="2"/>
            <line x1="20" y1="8" x2="20" y2="14" stroke="currentColor" strokeWidth="2"/>
            <line x1="23" y1="11" x2="17" y2="11" stroke="currentColor" strokeWidth="2"/>
          </svg>
        </div>
      </div>
      
      <div className={styles.cardContent}>
        <div className={styles.mainValue}>{count}</div>
        <div className={styles.description}>{description}</div>
      </div>
    </div>
  );
};

export default ActiveInterventionsCard;
