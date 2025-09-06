import React from 'react';
import styles from './HostelCards.module.css';

const OccupancyCard = ({ rate = 82.5, students = 396, capacity = 480 }) => {
  return (
    <div className={`${styles.card} ${styles.occupancyCard}`}>
      <div className={styles.cardHeader}>
        <h3 className={styles.cardTitle}>Occupancy Rate</h3>
        <div className={styles.cardIcon}>
          <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M20 21V19C20 17.9391 19.5786 16.9217 18.8284 16.1716C18.0783 15.4214 17.0609 15 16 15H8C6.93913 15 5.92172 15.4214 5.17157 16.1716C4.42143 16.9217 4 17.9391 4 19V21" stroke="currentColor" strokeWidth="2"/>
            <circle cx="12" cy="7" r="4" stroke="currentColor" strokeWidth="2"/>
          </svg>
        </div>
      </div>
      
      <div className={styles.cardContent}>
        <div className={styles.mainValue}>{rate}%</div>
        <div className={styles.changeValue}>{students} students</div>
        <div className={styles.description}>Out of {capacity} total capacity</div>
      </div>
    </div>
  );
};

export default OccupancyCard;
