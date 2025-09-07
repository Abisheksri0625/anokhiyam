import React from 'react';
import AdminSidebar from '../../components/AdminSidebar/AdminSidebar';
import AdminHeader from '../../components/AdminHeader/AdminHeader';
import EntranceResultsCard from '../../components/AdminCards/EntranceResultsCard';
import SemesterResultsCard from '../../components/AdminCards/SemesterResultsCard';
import TotalStudentsCard from '../../components/AdminCards/TotalStudentsCard';
import PendingAdmissionsCard from '../../components/AdminCards/PendingAdmissionsCard';
import styles from './AdminDashboard.module.css';

const AdminDashboard = () => {
  return (
    <div className={styles.dashboardContainer}>
      <AdminSidebar activeItem="Dashboard" />
      <div className={styles.mainContent}>
        <AdminHeader />
        <div className={styles.content}>
          <div className={styles.pageHeader}>
            <h1 className={styles.pageTitle}>Admin Dashboard</h1>
            <p className={styles.pageSubtitle}>Welcome back, Administrator! Here's your system overview.</p>
          </div>

          <div className={styles.statsGrid}>
            <EntranceResultsCard />
            <SemesterResultsCard />
            <TotalStudentsCard />
            <PendingAdmissionsCard />
          </div>

          <div className={styles.recentSection}>
            <h2 className={styles.sectionTitle}>Recent Activity</h2>
            <div className={styles.activityList}>
              <div className={styles.activityItem}>
                <div className={styles.activityIcon}>📊</div>
                <div className={styles.activityContent}>
                  <h4>Entrance Results Published</h4>
                  <p>Published results for 145 students - Entrance Exam 2025</p>
                  <span className={styles.activityTime}>2 hours ago</span>
                </div>
              </div>

              <div className={styles.activityItem}>
                <div className={styles.activityIcon}>👤</div>
                <div className={styles.activityContent}>
                  <h4>New User Account Created</h4>
                  <p>Created teacher account for Prof. Sarah Johnson</p>
                  <span className={styles.activityTime}>4 hours ago</span>
                </div>
              </div>

              <div className={styles.activityItem}>
                <div className={styles.activityIcon}>📋</div>
                <div className={styles.activityContent}>
                  <h4>Semester Results Uploaded</h4>
                  <p>Uploaded Semester 6 results for Computer Science</p>
                  <span className={styles.activityTime}>1 day ago</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminDashboard;
