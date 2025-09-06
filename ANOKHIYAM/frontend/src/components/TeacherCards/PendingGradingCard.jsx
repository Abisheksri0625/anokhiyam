import React from 'react';
import styles from './TeacherCards.module.css';

const PendingGradingCard = ({ count = 23, description = "Assignments to review" }) => {
  return (
    <div className={`${styles.card} ${styles.pendingGradingCard}`}>
      <div className={styles.cardHeader}>
        <h3 className={styles.cardTitle}>Pending Grading</h3>
        <div className={styles.cardIcon}>
          <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M14 2H6C4.89543 2 4 2.89543 4 4V20C4 21.1046 4.89543 22 6 22H18C19.1046 22 20 21.1046 20 20V8L14 2Z" stroke="currentColor" strokeWidth="2"/>
            <path d="M14 2V8H20" stroke="currentColor" strokeWidth="2"/>
            <path d="M16 13H8" stroke="currentColor" strokeWidth="2"/>
            <path d="M16 17H8" stroke="currentColor" strokeWidth="2"/>
            <path d="M10 9H8" stroke="currentColor" strokeWidth="2"/>
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

export default PendingGradingCard;
