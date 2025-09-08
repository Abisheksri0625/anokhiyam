import React, { useState } from 'react';
import HostelSidebar from '../../components/HostelSidebar/HostelSidebar';
import HostelHeader from '../../components/HostelHeader/HostelHeader';
import styles from './HostelDashboard.module.css';

const HostelDashboard = () => {
  const [activeTab, setActiveTab] = useState('overview');
  const [isCollapsed, setIsCollapsed] = useState(false);

  // Dashboard Cards Components
  const TotalRoomsCard = () => (
    <div className={styles.statsCard}>
      <div className={styles.cardHeader}>
        <div className={styles.cardIcon}>
          <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
            <rect x="3" y="3" width="18" height="18" rx="2" ry="2" stroke="currentColor" strokeWidth="2"/>
            <line x1="9" y1="9" x2="9" y2="21" stroke="currentColor" strokeWidth="2"/>
            <line x1="15" y1="9" x2="15" y2="21" stroke="currentColor" strokeWidth="2"/>
            <line x1="3" y1="15" x2="21" y2="15" stroke="currentColor" strokeWidth="2"/>
          </svg>
        </div>
        <div className={styles.cardTrend}>
          <span className={`${styles.trendValue} ${styles.positive}`}>+2</span>
        </div>
      </div>
      <div className={styles.cardContent}>
        <h3 className={styles.cardTitle}>Total Rooms</h3>
        <div className={styles.cardValue}>156</div>
        <p className={styles.cardDescription}>Available: 24 • Occupied: 132</p>
      </div>
    </div>
  );

  const OccupancyCard = () => (
    <div className={styles.statsCard}>
      <div className={styles.cardHeader}>
        <div className={styles.cardIcon}>
          <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M20 21V19C20 17.9391 19.5786 16.9217 18.8284 16.1716C18.0783 15.4214 17.0609 15 16 15H8C6.93913 15 5.92172 15.4214 5.17157 16.1716C4.42143 16.9217 4 17.9391 4 19V21" stroke="currentColor" strokeWidth="2"/>
            <circle cx="12" cy="7" r="4" stroke="currentColor" strokeWidth="2"/>
          </svg>
        </div>
        <div className={styles.cardTrend}>
          <span className={`${styles.trendValue} ${styles.positive}`}>+5%</span>
        </div>
      </div>
      <div className={styles.cardContent}>
        <h3 className={styles.cardTitle}>Occupancy Rate</h3>
        <div className={styles.cardValue}>84.6%</div>
        <div className={styles.progressBar}>
          <div className={styles.progressFill} style={{ width: '84.6%' }}></div>
        </div>
      </div>
    </div>
  );

  const CheckInsCard = () => (
    <div className={styles.statsCard}>
      <div className={styles.cardHeader}>
        <div className={styles.cardIcon}>
          <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M9 11L12 14L22 4" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
            <path d="M21 12V19C21 20.1046 20.1046 21 19 21H5C3.89543 21 3 20.1046 3 19V5C3.89543 5 5 3.89543 5 3H16" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
          </svg>
        </div>
        <div className={styles.cardTrend}>
          <span className={`${styles.trendValue} ${styles.positive}`}>+12</span>
        </div>
      </div>
      <div className={styles.cardContent}>
        <h3 className={styles.cardTitle}>Today's Check-ins</h3>
        <div className={styles.cardValue}>28</div>
        <p className={styles.cardDescription}>Check-outs: 15 • Pending: 3</p>
      </div>
    </div>
  );

  const MaintenanceCard = () => (
    <div className={styles.statsCard}>
      <div className={styles.cardHeader}>
        <div className={styles.cardIcon}>
          <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M14.7 6.3C15.3 5.7 15.3 4.7 14.7 4.1C14.1 3.5 13.1 3.5 12.5 4.1L12 4.6L11.5 4.1C10.9 3.5 9.9 3.5 9.3 4.1C8.7 4.7 8.7 5.7 9.3 6.3L10.6 7.6L11.3 8.3L12 9L12.7 8.3L14 7L14.7 6.3Z" stroke="currentColor" strokeWidth="2"/>
            <path d="M8.5 10.5L7 12L15 20L17 18L9 10" stroke="currentColor" strokeWidth="2"/>
            <path d="M15 5L17 7" stroke="currentColor" strokeWidth="2"/>
            <path d="M18 8L20 10" stroke="currentColor" strokeWidth="2"/>
          </svg>
        </div>
        <div className={styles.cardTrend}>
          <span className={`${styles.trendValue} ${styles.negative}`}>-3</span>
        </div>
      </div>
      <div className={styles.cardContent}>
        <h3 className={styles.cardTitle}>Maintenance Requests</h3>
        <div className={styles.cardValue}>7</div>
        <p className={styles.cardDescription}>Pending: 4 • In Progress: 3</p>
      </div>
    </div>
  );

  const RoleBasedUserManagement = () => (
    <div className={styles.contentSection}>
      <h2>User Management</h2>
      <p>Manage hostel staff and student user accounts</p>
    </div>
  );

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
      <HostelSidebar 
        activeItem="Dashboard" 
        isCollapsed={isCollapsed}
        setIsCollapsed={setIsCollapsed}
      />
      <div className={`${styles.mainContent} ${isCollapsed ? styles.collapsed : ''}`}>
        <HostelHeader isCollapsed={isCollapsed} />
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
