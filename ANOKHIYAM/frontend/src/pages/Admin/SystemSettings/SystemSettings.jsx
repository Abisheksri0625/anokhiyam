import React from 'react';
import AdminSidebar from '../../../components/AdminSidebar/AdminSidebar';
import AdminHeader from '../../../components/AdminHeader/AdminHeader';
import styles from './SystemSettings.module.css';

const SystemSettings = () => {
  return (
    <div className={styles.dashboardContainer}>
      <AdminSidebar activeItem="system" />
      <div className={styles.mainContent}>
        <AdminHeader />
        <div className={styles.content}>
          <div className={styles.pageHeader}>
            <h1 className={styles.pageTitle}>System Settings</h1>
            <p className={styles.pageSubtitle}>Configure system-wide settings</p>
          </div>
          
          <div className={styles.contentSection}>
            <h2>Content will be added later</h2>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SystemSettings;
