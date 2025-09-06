import React from 'react';
import styles from './HostelCards.module.css';

const TotalRoomsCard = ({ total = 240, occupied = 198, vacant = 42 }) => {
  return (
    <div className={`${styles.card} ${styles.totalRoomsCard}`}>
      <div className={styles.cardHeader}>
        <h3 className={styles.cardTitle}>Total Rooms</h3>
        <div className={styles.cardIcon}>
          <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
            <rect x="3" y="3" width="18" height="18" rx="2" ry="2" stroke="currentColor" strokeWidth="2"/>
            <line x1="9" y1="9" x2="9" y2="21" stroke="currentColor" strokeWidth="2"/>
            <line x1="15" y1="9" x2="15" y2="21" stroke="currentColor" strokeWidth="2"/>
            <line x1="3" y1="15" x2="21" y2="15" stroke="currentColor" strokeWidth="2"/>
          </svg>
        </div>
      </div>
      
      <div className={styles.cardContent}>
        <div className={styles.mainValue}>{total}</div>
        <div className={styles.changeValue}>{occupied} occupied</div>
        <div className={styles.description}>{vacant} vacant rooms available</div>
      </div>
    </div>
  );
};

export default TotalRoomsCard;
