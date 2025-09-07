import React from 'react';
import AdminSidebar from '../../../components/AdminSidebar/AdminSidebar';
import AdminHeader from '../../../components/AdminHeader/AdminHeader';
import styles from './Settings.module.css';

const Settings = () => {
  return (
    <div className={styles.dashboardContainer}>
      <AdminSidebar activeItem="settings" />
      <div className={styles.mainContent}>
        <AdminHeader />
        <div className={styles.content}>
          <div className={styles.pageHeader}>
            <h1 className={styles.pageTitle}>Settings</h1>
            <p className={styles.pageSubtitle}>Manage your account settings</p>
          </div>
          
          <div className={styles.contentSection}>
            <h2>Content will be added later</h2>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Settings;
