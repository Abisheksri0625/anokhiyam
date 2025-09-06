import React from 'react';
import styles from './TeacherCards.module.css';

const ClassScheduleCard = ({ todayClasses = 4, nextClass = "Web Development", nextTime = "10:00 AM" }) => {
  return (
    <div className={`${styles.card} ${styles.scheduleCard}`}>
      <div className={styles.cardHeader}>
        <h3 className={styles.cardTitle}>Today's Schedule</h3>
        <div className={styles.cardIcon}>
          <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
            <rect x="3" y="4" width="18" height="18" rx="2" ry="2" stroke="currentColor" strokeWidth="2"/>
            <line x1="16" y1="2" x2="16" y2="6" stroke="currentColor" strokeWidth="2"/>
            <line x1="8" y1="2" x2="8" y2="6" stroke="currentColor" strokeWidth="2"/>
            <line x1="3" y1="10" x2="21" y2="10" stroke="currentColor" strokeWidth="2"/>
          </svg>
        </div>
      </div>
      
      <div className={styles.cardContent}>
        <div className={styles.mainValue}>{todayClasses}</div>
        <div className={styles.changeValue}>Classes Today</div>
        <div className={styles.description}>
          Next: {nextClass} at {nextTime}
        </div>
      </div>
      
      <div className={styles.schedulePreview}>
        <div className={styles.scheduleItem}>
          <span className={styles.scheduleTime}>09:00</span>
          <span className={styles.scheduleClass}>React Fundamentals</span>
        </div>
        <div className={`${styles.scheduleItem} ${styles.current}`}>
          <span className={styles.scheduleTime}>10:00</span>
          <span className={styles.scheduleClass}>Web Development</span>
        </div>
        <div className={styles.scheduleItem}>
          <span className={styles.scheduleTime}>14:00</span>
          <span className={styles.scheduleClass}>JavaScript Advanced</span>
        </div>
      </div>
    </div>
  );
};

export default ClassScheduleCard;
