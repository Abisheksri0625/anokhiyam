import React from 'react';
import AdminSidebar from '../../../components/AdminSidebar/AdminSidebar';
import AdminHeader from '../../../components/AdminHeader/AdminHeader';
import styles from './UserManagement.module.css';

const UserManagement = () => {
  return (
    <div className={styles.dashboardContainer}>
      <AdminSidebar activeItem="users" />
      <div className={styles.mainContent}>
        <AdminHeader />
        <div className={styles.content}>
          <div className={styles.pageHeader}>
            <h1 className={styles.pageTitle}>User Management</h1>
            <p className={styles.pageSubtitle}>Create and manage user accounts</p>
          </div>
          
          <div className={styles.contentSection}>
            <h2>Content will be added later</h2>
          </div>
        </div>
      </div>
    </div>
  );
};

export default UserManagement;
