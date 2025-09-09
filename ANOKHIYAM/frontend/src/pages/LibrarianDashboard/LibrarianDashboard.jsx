import React, { useState } from 'react';
import LibrarianSidebar from '../../components/LibrarianSidebar/LibrarianSidebar';
import LibrarianHeader from '../../components/LibrarianHeader/LibrarianHeader';
import TotalBooksCard from '../../components/LibrarianCards/TotalBooksCard';
import IssuedBooksCard from '../../components/LibrarianCards/IssuedBooksCard';
import OverdueBooksCard from '../../components/LibrarianCards/OverdueBooksCard';
import ActiveStudentsCard from '../../components/LibrarianCards/ActiveStudentsCard';
import RoleBasedUserManagement from '../../components/UserManagement/RoleBasedUserManagement';
import styles from './LibrarianDashboard.module.css';

// ✅ Added imports for charts
import { PieChart, Pie, Cell, Tooltip } from 'recharts';

const LibrarianDashboard = () => {
  const [activeTab, setActiveTab] = useState('overview');
  const [isCollapsed, setIsCollapsed] = useState(false);

  // ✅ Extended data with borrows, returns, and popularBook
  const domainData = [
    { domain: "Computer Science", borrow: 70, return: 30, popularBook: "Data Structures & Algorithms" },
    { domain: "Information Technology", borrow: 60, return: 40, popularBook: "Database Management Systems" },
    { domain: "Electronics", borrow: 55, return: 45, popularBook: "Digital Logic Design" },
    { domain: "Mechanical", borrow: 65, return: 35, popularBook: "Thermodynamics" },
    { domain: "Civil Engineering", borrow: 50, return: 50, popularBook: "Strength of Materials" },
    { domain: "Biotechnology", borrow: 45, return: 55, popularBook: "Genetics: A Conceptual Approach" },
  ];

  const COLORS = ["#8b5cf6", "#06b6d4"]; // borrow vs return colors

  const renderContent = () => {
    switch (activeTab) {
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
              <p className={styles.pageSubtitle}>
                Welcome back, Librarian! Here's your library overview.
              </p>
            </div>

            <div className={styles.statsGrid}>
              <TotalBooksCard />
              <IssuedBooksCard />
              <OverdueBooksCard />
              <ActiveStudentsCard />
            </div>

            {/* ✅ Donut Charts with Stats */}
            <div className={styles.actionsSection}>
              <h2 className={styles.sectionTitle}>Borrow vs Return by Domain</h2>
              <div className={styles.actionGrid}>
                {domainData.map((item, index) => (
                  <div key={index} className={styles.chartCard}>
                    <h4 className={styles.chartTitle}>{item.domain}</h4>
                    <div className={styles.chartRow}>
                      <div className={styles.chartContainer}>
                        <PieChart width={160} height={160}>
                          <Pie
                            data={[
                              { name: "Borrow", value: item.borrow },
                              { name: "Return", value: item.return },
                            ]}
                            dataKey="value"
                            innerRadius={45}
                            outerRadius={65}
                            paddingAngle={3}
                          >
                            {[
                              { name: "Borrow", value: item.borrow },
                              { name: "Return", value: item.return },
                            ].map((entry, i) => (
                              <Cell key={`cell-${i}`} fill={COLORS[i % COLORS.length]} />
                            ))}
                          </Pie>
                          <Tooltip />
                        </PieChart>
                      </div>

                      {/* ✅ Stats beside chart */}
                      <div className={styles.chartStats}>
                        <p><strong>Borrows:</strong> {item.borrow}</p>
                        <p><strong>Returns:</strong> {item.return}</p>
                        <p><strong>Popular:</strong> {item.popularBook}</p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <div className={styles.recentSection}>
              <h2 className={styles.sectionTitle}>Recent Activities</h2>
              <div className={styles.activityList}>
                <div className={styles.activityItem}>
                  <div className={styles.activityIcon}></div>
                  <div className={styles.activityContent}>
                    <h4>Book Issued</h4>
                    <p>"Data Structures & Algorithms" issued to John Smith (CS-2021-045)</p>
                    <span className={styles.activityTime}>15 minutes ago</span>
                  </div>
                </div>

                <div className={styles.activityItem}>
                  <div className={styles.activityIcon}></div>
                  <div className={styles.activityContent}>
                    <h4>Book Returned</h4>
                    <p>"Introduction to AI" returned by Sarah Johnson (IT-2020-123)</p>
                    <span className={styles.activityTime}>1 hour ago</span>
                  </div>
                </div>

                <div className={styles.activityItem}>
                  <div className={styles.activityIcon}></div>
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
