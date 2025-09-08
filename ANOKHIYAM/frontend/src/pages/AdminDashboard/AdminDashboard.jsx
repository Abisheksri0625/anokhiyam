import React, { useState } from 'react';
import AdminSidebar from '../../components/AdminSidebar/AdminSidebar';
import AdminHeader from '../../components/AdminHeader/AdminHeader';
import EntranceResultsCard from '../../components/AdminCards/EntranceResultsCard';
import SemesterResultsCard from '../../components/AdminCards/SemesterResultsCard';
import TotalStudentsCard from '../../components/AdminCards/TotalStudentsCard';
import PendingAdmissionsCard from '../../components/AdminCards/PendingAdmissionsCard';
import { useNavigate } from 'react-router-dom';
import styles from './AdminDashboard.module.css';

const AdminDashboard = () => {
  const navigate = useNavigate();
  const [isCollapsed, setIsCollapsed] = useState(false);

  return (
    <div className={styles.dashboardContainer}>
      <AdminSidebar 
        activeItem="dashboard" 
        isCollapsed={isCollapsed}
        setIsCollapsed={setIsCollapsed}
      />
      <div className={`${styles.mainContent} ${isCollapsed ? styles.collapsed : ''}`}>
        <AdminHeader isCollapsed={isCollapsed} />
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

          <div className={styles.actionsSection}>
            <h2 className={styles.sectionTitle}>System Management</h2>
            <div className={styles.actionGrid}>
              <button className={styles.actionBtn} onClick={() => navigate('/admin/users')}>
                <span className={styles.actionIcon}>👤</span>
                <div className={styles.actionContent}>
                  <h4 className={styles.actionTitle}>Create User Accounts</h4>
                  <p className={styles.actionDesc}>Add new students, teachers, staff accounts</p>
                </div>
              </button>

              <button className={styles.actionBtn} onClick={() => navigate('/admin/entrance-results')}>
                <span className={styles.actionIcon}>📊</span>
                <div className={styles.actionContent}>
                  <h4 className={styles.actionTitle}>Publish Entrance Results</h4>
                  <p className={styles.actionDesc}>Release entrance exam results to students</p>
                </div>
              </button>

              <button className={styles.actionBtn} onClick={() => navigate('/admin/semester-results')}>
                <span className={styles.actionIcon}>📋</span>
                <div className={styles.actionContent}>
                  <h4 className={styles.actionTitle}>Publish Semester Results</h4>
                  <p className={styles.actionDesc}>Release semester exam results by year/semester</p>
                </div>
              </button>

              <button className={styles.actionBtn} onClick={() => navigate('/admin/admissions')}>
                <span className={styles.actionIcon}>🎓</span>
                <div className={styles.actionContent}>
                  <h4 className={styles.actionTitle}>Admission Management</h4>
                  <p className={styles.actionDesc}>Review and approve student applications</p>
                </div>
              </button>

              <button className={styles.actionBtn} onClick={() => navigate('/admin/publish-results')}>
                <span className={styles.actionIcon}>⚡</span>
                <div className={styles.actionContent}>
                  <h4 className={styles.actionTitle}>Bulk Results Upload</h4>
                  <p className={styles.actionDesc}>Upload results via CSV/Excel files</p>
                </div>
              </button>

              <button className={styles.actionBtn} onClick={() => navigate('/admin/analytics')}>
                <span className={styles.actionIcon}>📈</span>
                <div className={styles.actionContent}>
                  <h4 className={styles.actionTitle}>Analytics & Reports</h4>
                  <p className={styles.actionDesc}>View system analytics and generate reports</p>
                </div>
              </button>
            </div>
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
