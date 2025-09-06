import React from 'react';
import styles from './HostelCards.module.css';

const MaintenanceCard = ({ pending = 12, completed = 156, urgent = 3 }) => {
  return (
    <div className={`${styles.card} ${styles.maintenanceCard}`}>
      <div className={styles.cardHeader}>
        <h3 className={styles.cardTitle}>Maintenance</h3>
        <div className={styles.cardIcon}>
          <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M14.7 6.3C15.3 5.7 15.3 4.7 14.7 4.1C14.1 3.5 13.1 3.5 12.5 4.1L12 4.6L11.5 4.1C10.9 3.5 9.9 3.5 9.3 4.1C8.7 4.7 8.7 5.7 9.3 6.3L10.6 7.6L11.3 8.3L12 9L12.7 8.3L14 7L14.7 6.3Z" stroke="currentColor" strokeWidth="2"/>
            <path d="M8.5 10.5L7 12L15 20L17 18L9 10" stroke="currentColor" strokeWidth="2"/>
            <path d="M15 5L17 7" stroke="currentColor" strokeWidth="2"/>
            <path d="M18 8L20 10" stroke="currentColor" strokeWidth="2"/>
          </svg>
        </div>
      </div>
      
      <div className={styles.cardContent}>
        <div className={styles.mainValue}>{pending}</div>
        <div className={styles.changeValue}>Pending requests</div>
        <div className={styles.description}>{urgent} urgent, {completed} completed this month</div>
      </div>
    </div>
  );
};

export default MaintenanceCard;
