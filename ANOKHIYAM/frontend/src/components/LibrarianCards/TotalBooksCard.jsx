import React from 'react';
import styles from './LibrarianCards.module.css';

const TotalBooksCard = ({ total = 12450, available = 10230, issued = 2220 }) => {
  return (
    <div className={`${styles.card} ${styles.totalBooksCard}`}>
      <div className={styles.cardHeader}>
        <h3 className={styles.cardTitle}>Total Books</h3>
        <div className={styles.cardIcon}>
          <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M4 19.5C4 18.1193 5.11929 17 6.5 17H20" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
            <path d="M6.5 2H20V22H6.5C5.11929 22 4 20.8807 4 19.5V4.5C4 3.11929 5.11929 2 6.5 2Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
          </svg>
        </div>
      </div>
      
      <div className={styles.cardContent}>
        <div className={styles.mainValue}>{total.toLocaleString()}</div>
        <div className={styles.changeValue}>{available.toLocaleString()} available</div>
        <div className={styles.description}>{issued.toLocaleString()} currently issued</div>
      </div>
    </div>
  );
};

export default TotalBooksCard;
