import React from 'react';
import Sidebar from '../../components/Sidebar/Sidebar';
import DashboardHeader from '../../components/DashboardHeader/DashboardHeader';
import GPACard from '../../components/DashboardCards/GPACard';
import AssignmentsCard from '../../components/DashboardCards/AssignmentsCard';
import AttendanceCard from '../../components/DashboardCards/AttendanceCard';
import ActiveCoursesCard from '../../components/DashboardCards/ActiveCoursesCard';
import styles from './StudentDashboard.module.css';

const StudentDashboard = () => {
  return (
    <div className={styles.dashboardContainer}>
      <Sidebar activeItem="Dashboard" />
      <div className={styles.mainContent}>
        <DashboardHeader />
        <div className={styles.content}>
          <div className={styles.pageHeader}>
            <h1 className={styles.pageTitle}>Student Dashboard</h1>
            <p className={styles.pageSubtitle}>Welcome back, John! Here's your academic overview.</p>
          </div>

          <div className={styles.statsGrid}>
            <GPACard />
            <AssignmentsCard />
            <AttendanceCard />
            <ActiveCoursesCard />
          </div>

          <div className={styles.chartsSection}>
            <div className={styles.chartCard}>
              <h3 className={styles.chartTitle}>GPA Progress</h3>
              <div className={styles.chartPlaceholder}>
                <p>Chart will be implemented here</p>
              </div>
            </div>
            
            <div className={styles.chartCard}>
              <h3 className={styles.chartTitle}>Attendance Trend</h3>
              <div className={styles.chartPlaceholder}>
                <p>Chart will be implemented here</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default StudentDashboard;
