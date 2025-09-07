import React from 'react';
import AdminSidebar from '../../../components/AdminSidebar/AdminSidebar';
import AdminHeader from '../../../components/AdminHeader/AdminHeader';
import styles from './SemesterResults.module.css';

const SemesterResults = () => {
  return (
    <div className={styles.dashboardContainer}>
      <AdminSidebar activeItem="semester-results" />
      <div className={styles.mainContent}>
        <AdminHeader />
        <div className={styles.content}>
          <div className={styles.pageHeader}>
            <h1 className={styles.pageTitle}>Semester Results Management</h1>
            <p className={styles.pageSubtitle}>Manage and publish semester exam results</p>
          </div>
          
          <div className={styles.contentSection}>
            <h2>Content will be added later</h2>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SemesterResults;
