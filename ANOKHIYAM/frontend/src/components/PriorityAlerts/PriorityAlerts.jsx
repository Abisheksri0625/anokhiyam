import React from 'react';
import styles from './PriorityAlerts.module.css';

const PriorityAlerts = ({ alerts = [] }) => {
  const defaultAlerts = [
    { id: 1, message: "Sarah Johnson - Math: 45% attendance", level: 'high' },
    { id: 2, message: "Mike Davis - Physics: Missing 3 assignments", level: 'medium' },
    { id: 3, message: "Lisa Chen - Chemistry: Grade dropped below 60%", level: 'high' }
  ];

  const displayAlerts = alerts.length > 0 ? alerts : defaultAlerts;

  return (
    <div className={styles.alertsSection}>
      <div className={styles.header}>
        <h3 className={styles.title}>Priority Alerts</h3>
        <div className={styles.alertIcon}>
          <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M10.29 3.86L1.82 18C1.64086 18.3024 1.55307 18.6453 1.56769 18.9928C1.58231 19.3403 1.69878 19.6763 1.90382 19.9616C2.10886 20.2468 2.39374 20.4697 2.72309 20.6062C3.05244 20.7427 3.41313 20.7878 3.77 20.7364H20.23C20.5869 20.7878 20.9476 20.7427 21.2769 20.6062C21.6063 20.4697 21.8911 20.2468 22.0962 19.9616C22.3012 19.6763 22.4177 19.3403 22.4323 18.9928C22.4469 18.6453 22.3591 18.3024 22.18 18L13.71 3.86C13.5217 3.56611 13.2633 3.32312 12.9596 3.15133C12.6559 2.97953 12.3164 2.88477 11.97 2.88477C11.6236 2.88477 11.2841 2.97953 10.9804 3.15133C10.6767 3.32312 10.4183 3.56611 10.23 3.86H10.29Z" stroke="currentColor" strokeWidth="2"/>
            <line x1="12" y1="9" x2="12" y2="13" stroke="currentColor" strokeWidth="2"/>
            <circle cx="12" cy="17" r="1" fill="currentColor"/>
          </svg>
        </div>
      </div>
      
      <div className={styles.subtitle}>Students needing attention</div>
      
      <div className={styles.alertsList}>
        {displayAlerts.map((alert) => (
          <div key={alert.id} className={`${styles.alertItem} ${styles[alert.level]}`}>
            <div className={styles.alertIndicator}></div>
            <div className={styles.alertMessage}>{alert.message}</div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default PriorityAlerts;
