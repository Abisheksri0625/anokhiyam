import React from 'react';
import styles from './LibrarianCards.module.css';

const OverdueBooksCard = ({ overdue = 28, students = 15, maxDays = 45 }) => {
  return (
    <div className={`${styles.card} ${styles.overdueBooksCard}`}>
      <div className={styles.cardHeader}>
        <h3 className={styles.cardTitle}>Overdue Books</h3>
        <div className={styles.cardIcon}>
          <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
            <circle cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="2"/>
            <polyline points="12,6 12,12 16,14" stroke="currentColor" strokeWidth="2"/>
          </svg>
        </div>
      </div>
      
      <div className={styles.cardContent}>
        <div className={styles.mainValue}>{overdue}</div>
        <div className={styles.changeValue}>Overdue books</div>
        <div className={styles.description}>{students} students, max {maxDays} days overdue</div>
      </div>
    </div>
  );
};

export default OverdueBooksCard;
