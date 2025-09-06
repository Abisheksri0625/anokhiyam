import React, { useState } from 'react';
import HostelSidebar from '../../components/HostelSidebar/HostelSidebar';
import HostelHeader from '../../components/HostelHeader/HostelHeader';
import TotalRoomsCard from '../../components/HostelCards/TotalRoomsCard';
import OccupancyCard from '../../components/HostelCards/OccupancyCard';
import CheckInsCard from '../../components/HostelCards/CheckInsCard';
import MaintenanceCard from '../../components/HostelCards/MaintenanceCard';
import RoleBasedUserManagement from '../../components/UserManagement/RoleBasedUserManagement';
import styles from './HostelDashboard.module.css';

const HostelDashboard = () => {
  const [activeTab, setActiveTab] = useState('overview');

  const renderContent = () => {
    switch(activeTab) {
      case 'users':
        return <RoleBasedUserManagement />;
      case 'room-allocation':
        return (
          <div className={styles.contentSection}>
            <h2>Room Allocation</h2>
            <p>Allocate rooms to new students and manage room assignments</p>
          </div>
        );
      case 'check-in':
        return (
          <div className={styles.contentSection}>
            <h2>Student Check-in</h2>
            <p>Process student check-ins and room assignments</p>
          </div>
        );
      default:
        return (
          <>
            <div className={styles.pageHeader}>
              <h1 className={styles.pageTitle}>Hostel Dashboard</h1>
              <p className={styles.pageSubtitle}>Welcome back, Hostel Warden! Here's your hostel overview.</p>
            </div>

            <div className={styles.statsGrid}>
              <TotalRoomsCard />
              <OccupancyCard />
              <CheckInsCard />
              <MaintenanceCard />
            </div>

            <div className={styles.actionsSection}>
              <h2 className={styles.sectionTitle}>Quick Actions</h2>
              <div className={styles.actionGrid}>
                <button className={styles.actionBtn} onClick={() => setActiveTab('users')}>
                  <span className={styles.actionIcon}>👤</span>
                  <div className={styles.actionContent}>
                    <h4 className={styles.actionTitle}>Add Resident</h4>
                    <p className={styles.actionDesc}>Register new hostel student</p>
                  </div>
                </button>

                <button className={styles.actionBtn} onClick={() => setActiveTab('room-allocation')}>
                  <span className={styles.actionIcon}>🏠</span>
                  <div className={styles.actionContent}>
                    <h4 className={styles.actionTitle}>Room Allocation</h4>
                    <p className={styles.actionDesc}>Allocate rooms to new students</p>
                  </div>
                </button>

                <button className={styles.actionBtn} onClick={() => setActiveTab('check-in')}>
                  <span className={styles.actionIcon}>✅</span>
                  <div className={styles.actionContent}>
                    <h4 className={styles.actionTitle}>Check-in Student</h4>
                    <p className={styles.actionDesc}>Process student check-ins</p>
                  </div>
                </button>

                <button className={styles.actionBtn}>
                  <span className={styles.actionIcon}>❌</span>
                  <div className={styles.actionContent}>
                    <h4 className={styles.actionTitle}>Check-out Student</h4>
                    <p className={styles.actionDesc}>Process student check-outs</p>
                  </div>
                </button>

                <button className={styles.actionBtn}>
                  <span className={styles.actionIcon}>👥</span>
                  <div className={styles.actionContent}>
                    <h4 className={styles.actionTitle}>Visitor Entry</h4>
                    <p className={styles.actionDesc}>Register visitor entry logs</p>
                  </div>
                </button>

                <button className={styles.actionBtn}>
                  <span className={styles.actionIcon}>🔧</span>
                  <div className={styles.actionContent}>
                    <h4 className={styles.actionTitle}>Maintenance Request</h4>
                    <p className={styles.actionDesc}>Create maintenance requests</p>
                  </div>
                </button>
              </div>
            </div>

            <div className={styles.recentSection}>
              <h2 className={styles.sectionTitle}>Recent Activities</h2>
              <div className={styles.activityList}>
                <div className={styles.activityItem}>
                  <div className={styles.activityIcon}>✅</div>
                  <div className={styles.activityContent}>
                    <h4>Student Check-in</h4>
                    <p>Rahul Kumar (CS-2021-045) checked into Room 205-B</p>
                    <span className={styles.activityTime}>30 minutes ago</span>
                  </div>
                </div>

                <div className={styles.activityItem}>
                  <div className={styles.activityIcon}>🔧</div>
                  <div className={styles.activityContent}>
                    <h4>Maintenance Completed</h4>
                    <p>AC repair completed in Room 310-A</p>
                    <span className={styles.activityTime}>2 hours ago</span>
                  </div>
                </div>

                <div className={styles.activityItem}>
                  <div className={styles.activityIcon}>👥</div>
                  <div className={styles.activityContent}>
                    <h4>Visitor Registered</h4>
                    <p>Parent visitor registered for student in Room 102-C</p>
                    <span className={styles.activityTime}>4 hours ago</span>
                  </div>
                </div>
              </div>
            </div>
          </>
        );
    }
  };

  return (
    <div className={styles.dashboardContainer}>
      <HostelSidebar activeItem="Dashboard" />
      <div className={styles.mainContent}>
        <HostelHeader />
        <div className={styles.content}>
          {activeTab !== 'overview' && (
            <button 
              className={styles.backBtn}
              onClick={() => setActiveTab('overview')}
            >
              ← Back to Dashboard
            </button>
          )}
          {renderContent()}
        </div>
      </div>
    </div>
  );
};

export default HostelDashboard;
