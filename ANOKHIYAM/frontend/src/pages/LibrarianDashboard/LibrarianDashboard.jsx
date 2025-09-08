import React, { useState } from 'react';
import LibrarianSidebar from '../../components/LibrarianSidebar/LibrarianSidebar';
import LibrarianHeader from '../../components/LibrarianHeader/LibrarianHeader';
import TotalBooksCard from '../../components/LibrarianCards/TotalBooksCard';
import IssuedBooksCard from '../../components/LibrarianCards/IssuedBooksCard';
import OverdueBooksCard from '../../components/LibrarianCards/OverdueBooksCard';
import ActiveStudentsCard from '../../components/LibrarianCards/ActiveStudentsCard';
import RoleBasedUserManagement from '../../components/UserManagement/RoleBasedUserManagement';
import styles from './LibrarianDashboard.module.css';

const LibrarianDashboard = () => {
  const [activeTab, setActiveTab] = useState('overview');
  const [isCollapsed, setIsCollapsed] = useState(false);

  const renderContent = () => {
    switch(activeTab) {
      case 'users':
        return <RoleBasedUserManagement />;
      case 'issue-book':
        return (
          <div className={styles.contentSection}>
            <h2>Issue Book</h2>
            <p>Issue books to students and manage book lending</p>
          </div>
        );
      case 'return-book':
        return (
          <div className={styles.contentSection}>
            <h2>Return Book</h2>
            <p>Process book returns and manage overdue books</p>
          </div>
        );
      default:
        return (
          <>
            <div className={styles.pageHeader}>
              <h1 className={styles.pageTitle}>Library Dashboard</h1>
              <p className={styles.pageSubtitle}>Welcome back, Librarian! Here's your library overview.</p>
            </div>

            <div className={styles.statsGrid}>
              <TotalBooksCard />
              <IssuedBooksCard />
              <OverdueBooksCard />
              <ActiveStudentsCard />
            </div>

            <div className={styles.actionsSection}>
              <h2 className={styles.sectionTitle}>Quick Actions</h2>
              <div className={styles.actionGrid}>
                <button className={styles.actionBtn} onClick={() => setActiveTab('users')}>
                  <span className={styles.actionIcon}>👤</span>
                  <div className={styles.actionContent}>
                    <h4 className={styles.actionTitle}>Register Student</h4>
                    <p className={styles.actionDesc}>Add student to library system</p>
                  </div>
                </button>

                <button className={styles.actionBtn} onClick={() => setActiveTab('issue-book')}>
                  <span className={styles.actionIcon}>📚</span>
                  <div className={styles.actionContent}>
                    <h4 className={styles.actionTitle}>Issue Book</h4>
                    <p className={styles.actionDesc}>Issue a book to a student</p>
                  </div>
                </button>

                <button className={styles.actionBtn} onClick={() => setActiveTab('return-book')}>
                  <span className={styles.actionIcon}>↩️</span>
                  <div className={styles.actionContent}>
                    <h4 className={styles.actionTitle}>Return Book</h4>
                    <p className={styles.actionDesc}>Process book returns</p>
                  </div>
                </button>

                <button className={styles.actionBtn}>
                  <span className={styles.actionIcon}>➕</span>
                  <div className={styles.actionContent}>
                    <h4 className={styles.actionTitle}>Add New Book</h4>
                    <p className={styles.actionDesc}>Add new books to inventory</p>
                  </div>
                </button>

                <button className={styles.actionBtn}>
                  <span className={styles.actionIcon}>🔍</span>
                  <div className={styles.actionContent}>
                    <h4 className={styles.actionTitle}>Search Catalog</h4>
                    <p className={styles.actionDesc}>Search library catalog</p>
                  </div>
                </button>

                <button className={styles.actionBtn}>
                  <span className={styles.actionIcon}>⏰</span>
                  <div className={styles.actionContent}>
                    <h4 className={styles.actionTitle}>Overdue Reports</h4>
                    <p className={styles.actionDesc}>View overdue book reports</p>
                  </div>
                </button>
              </div>
            </div>

            <div className={styles.recentSection}>
              <h2 className={styles.sectionTitle}>Recent Activities</h2>
              <div className={styles.activityList}>
                <div className={styles.activityItem}>
                  <div className={styles.activityIcon}>📚</div>
                  <div className={styles.activityContent}>
                    <h4>Book Issued</h4>
                    <p>"Data Structures & Algorithms" issued to John Smith (CS-2021-045)</p>
                    <span className={styles.activityTime}>15 minutes ago</span>
                  </div>
                </div>

                <div className={styles.activityItem}>
                  <div className={styles.activityIcon}>↩️</div>
                  <div className={styles.activityContent}>
                    <h4>Book Returned</h4>
                    <p>"Introduction to AI" returned by Sarah Johnson (IT-2020-123)</p>
                    <span className={styles.activityTime}>1 hour ago</span>
                  </div>
                </div>

                <div className={styles.activityItem}>
                  <div className={styles.activityIcon}>➕</div>
                  <div className={styles.activityContent}>
                    <h4>New Books Added</h4>
                    <p>Added 25 new books to Computer Science section</p>
                    <span className={styles.activityTime}>3 hours ago</span>
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
      <LibrarianSidebar 
        activeItem="dashboard" 
        isCollapsed={isCollapsed}
        setIsCollapsed={setIsCollapsed}
      />
      <div className={`${styles.mainContent} ${isCollapsed ? styles.collapsed : ''}`}>
        <LibrarianHeader isCollapsed={isCollapsed} />
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

export default LibrarianDashboard;
