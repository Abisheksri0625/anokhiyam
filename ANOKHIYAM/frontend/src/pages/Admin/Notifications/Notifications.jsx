import React from 'react';
import AdminSidebar from '../../../components/AdminSidebar/AdminSidebar';
import AdminHeader from '../../../components/AdminHeader/AdminHeader';
import styles from './Notifications.module.css';

const Notifications = () => {
  return (
    <div className={styles.dashboardContainer}>
      <AdminSidebar activeItem="notifications" />
      <div className={styles.mainContent}>
        <AdminHeader />
        <div className={styles.content}>
          <div className={styles.pageHeader}>
            <h1 className={styles.pageTitle}>Notifications</h1>
            <p className={styles.pageSubtitle}>Manage system notifications</p>
          </div>
          
          <div className={styles.contentSection}>
            <h2>Content will be added later</h2>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Notifications;
