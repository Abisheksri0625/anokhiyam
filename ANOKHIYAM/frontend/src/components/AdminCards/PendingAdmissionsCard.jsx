import React from 'react';
import styles from './AdminCards.module.css';

const PendingAdmissionsCard = ({ pending = 24, approved = 156, rejected = 8 }) => {
  return (
    <div className={`${styles.card} ${styles.admissionsCard}`}>
      <div className={styles.cardHeader}>
        <h3 className={styles.cardTitle}>Admissions</h3>
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
        <div className={styles.mainValue}>{pending}</div>
        <div className={styles.changeValue}>Pending Review</div>
        <div className={styles.description}>{approved} approved, {rejected} rejected</div>
      </div>
    </div>
  );
};

export default PendingAdmissionsCard;
