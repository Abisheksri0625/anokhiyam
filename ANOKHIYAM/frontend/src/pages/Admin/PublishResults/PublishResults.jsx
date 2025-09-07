import React from 'react';
import AdminSidebar from '../../../components/AdminSidebar/AdminSidebar';
import AdminHeader from '../../../components/AdminHeader/AdminHeader';
import styles from './PublishResults.module.css';

const PublishResults = () => {
  return (
    <div className={styles.dashboardContainer}>
      <AdminSidebar activeItem="publish-results" />
      <div className={styles.mainContent}>
        <AdminHeader />
        <div className={styles.content}>
          <div className={styles.pageHeader}>
            <h1 className={styles.pageTitle}>Publish Results</h1>
            <p className={styles.pageSubtitle}>Bulk upload and publish examination results</p>
          </div>
          
          <div className={styles.contentSection}>
            <h2>Content will be added later</h2>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PublishResults;
