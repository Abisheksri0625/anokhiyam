import React from 'react';
import AdminSidebar from '../../../components/AdminSidebar/AdminSidebar';
import AdminHeader from '../../../components/AdminHeader/AdminHeader';
import styles from './StaffManagement.module.css';

const StaffManagement = () => {
  return (
    <div className={styles.dashboardContainer}>
      <AdminSidebar activeItem="staff" />
      <div className={styles.mainContent}>
        <AdminHeader />
        <div className={styles.content}>
          <div className={styles.pageHeader}>
            <h1 className={styles.pageTitle}>Staff Management</h1>
            <p className={styles.pageSubtitle}>Manage faculty and administrative staff</p>
          </div>
          
          <div className={styles.contentSection}>
            <h2>Content will be added later</h2>
          </div>
        </div>
      </div>
    </div>
  );
};

export default StaffManagement;
