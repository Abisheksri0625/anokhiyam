import React from 'react';
import styles from './StudentCards.module.css';

const AssignmentsCard = ({ pending = 3, completed = 28, upcoming = 2 }) => {
  return (
    <div className={`${styles.card} ${styles.assignmentsCard}`}>
      <div className={styles.cardHeader}>
        <h3 className={styles.cardTitle}>Assignments</h3>
        <div className={styles.cardIcon}>
          <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M14 2H6C4.89543 2 4 2.89543 4 4V20C4 21.1046 4.89543 22 6 22H18C19.1046 22 20 21.1046 20 20V8L14 2Z" stroke="currentColor" strokeWidth="2"/>
            <polyline points="14,2 14,8 20,8" stroke="currentColor" strokeWidth="2"/>
            <line x1="16" y1="13" x2="8" y2="13" stroke="currentColor" strokeWidth="2"/>
            <line x1="16" y1="17" x2="8" y2="17" stroke="currentColor" strokeWidth="2"/>
            <polyline points="10,9 9,10 8,9" stroke="currentColor" strokeWidth="2"/>
          </svg>
        </div>
      </div>
      
      <div className={styles.cardContent}>
        <div className={styles.mainValue}>{pending}</div>
        <div className={styles.changeValue}>Pending Assignments</div>
        <div className={styles.description}>
          {completed} completed • {upcoming} due this week
        </div>
      </div>
      
      <div className={styles.assignmentsList}>
        <div className={styles.assignmentItem}>
          <span className={styles.assignmentDot}></span>
          <span>React Components - Due Tomorrow</span>
        </div>
        <div className={styles.assignmentItem}>
          <span className={styles.assignmentDot}></span>
          <span>Database Design - Due in 3 days</span>
        </div>
      </div>
    </div>
  );
};

export default AssignmentsCard;
