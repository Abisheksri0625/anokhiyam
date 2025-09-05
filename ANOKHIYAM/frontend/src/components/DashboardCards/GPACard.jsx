import React from 'react';
import styles from './DashboardCards.module.css';

const GPACard = ({ gpa = 3.7, change = "+0.2 from last semester", description = "Based on completed coursework" }) => {
  return (
    <div className={`${styles.card} ${styles.gpaCard}`}>
      <div className={styles.cardHeader}>
        <h3 className={styles.cardTitle}>Current GPA</h3>
        <div className={styles.cardIcon}>
          <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M13 2L3 14H12L11 22L21 10H12L13 2Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
          </svg>
        </div>
      </div>
      
      <div className={styles.cardContent}>
        <div className={styles.mainValue}>{gpa}</div>
        <div className={styles.changeValue}>{change}</div>
        <div className={styles.description}>{description}</div>
      </div>
    </div>
  );
};

export default GPACard;
