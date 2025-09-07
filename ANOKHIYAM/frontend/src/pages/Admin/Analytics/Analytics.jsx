import React from 'react';
import AdminSidebar from '../../../components/AdminSidebar/AdminSidebar';
import AdminHeader from '../../../components/AdminHeader/AdminHeader';
import styles from './Analytics.module.css';

const Analytics = () => {
  return (
    <div className={styles.dashboardContainer}>
      <AdminSidebar activeItem="analytics" />
      <div className={styles.mainContent}>
        <AdminHeader />
        <div className={styles.content}>
          <div className={styles.pageHeader}>
            <h1 className={styles.pageTitle}>Analytics & Reports</h1>
            <p className={styles.pageSubtitle}>View system analytics and generate reports</p>
          </div>
          
          <div className={styles.contentSection}>
            <h2>Content will be added later</h2>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Analytics;
