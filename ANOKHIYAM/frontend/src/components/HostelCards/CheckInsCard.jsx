import React from 'react';
import styles from './HostelCards.module.css';

const CheckInsCard = ({ today = 8, thisWeek = 45, pending = 3 }) => {
  return (
    <div className={`${styles.card} ${styles.checkInsCard}`}>
      <div className={styles.cardHeader}>
        <h3 className={styles.cardTitle}>Check-ins Today</h3>
        <div className={styles.cardIcon}>
          <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M9 11L12 14L22 4" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
            <path d="M21 12V19C21 20.1046 20.1046 21 19 21H5C3.89543 21 3 20.1046 3 19V5C3.89543 5 5 3.89543 5 3H16" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
          </svg>
        </div>
      </div>
      
      <div className={styles.cardContent}>
        <div className={styles.mainValue}>{today}</div>
        <div className={styles.changeValue}>Check-ins today</div>
        <div className={styles.description}>{thisWeek} this week, {pending} pending</div>
      </div>
    </div>
  );
};

export default CheckInsCard;
