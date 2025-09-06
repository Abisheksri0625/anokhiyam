import React, { useState } from 'react';
import StudentSidebar from '../../components/StudentSidebar/StudentSidebar';
import StudentHeader from '../../components/StudentHeader/StudentHeader';
import AcademicCard from '../../components/StudentCards/AcademicCard';
import AttendanceCard from '../../components/StudentCards/AttendanceCard';
import AssignmentsCard from '../../components/StudentCards/AssignmentsCard';
import ExamsCard from '../../components/StudentCards/ExamsCard';
import styles from './StudentDashboard.module.css';

const StudentDashboard = () => {
  const [activeTab, setActiveTab] = useState('overview');

  const renderContent = () => {
    switch(activeTab) {
      case 'profile':
        return (
          <div className={styles.contentSection}>
            <h2>My Profile</h2>
            <p>View and update your personal information</p>
            <div className={styles.profileInfo}>
              <div className={styles.profileItem}>
                <strong>Name:</strong> John Smith
              </div>
              <div className={styles.profileItem}>
                <strong>Student ID:</strong> CS-2021-045
              </div>
              <div className={styles.profileItem}>
                <strong>Department:</strong> Computer Science
              </div>
              <div className={styles.profileItem}>
                <strong>Year:</strong> Final Year
              </div>
              <div className={styles.profileItem}>
                <strong>Email:</strong> student@anokhiyam.com
              </div>
              <div className={styles.profileItem}>
                <strong>Phone:</strong> +91 98765 43210
              </div>
            </div>
          </div>
        );
      case 'grades':
        return (
          <div className={styles.contentSection}>
            <h2>My Grades</h2>
            <p>View your academic performance and grades</p>
          </div>
        );
      default:
        return (
          <>
            <div className={styles.pageHeader}>
              <h1 className={styles.pageTitle}>Student Dashboard</h1>
              <p className={styles.pageSubtitle}>Welcome back, Student! Here's your academic overview.</p>
            </div>

            <div className={styles.statsGrid}>
              <AcademicCard />
              <AttendanceCard />
              <AssignmentsCard />
              <ExamsCard />
            </div>

            <div className={styles.actionsSection}>
              <h2 className={styles.sectionTitle}>Quick Actions</h2>
              <div className={styles.actionGrid}>
                <button className={styles.actionBtn} onClick={() => setActiveTab('profile')}>
                  <span className={styles.actionIcon}>👤</span>
                  <div className={styles.actionContent}>
                    <h4 className={styles.actionTitle}>My Profile</h4>
                    <p className={styles.actionDesc}>View and update your information</p>
                  </div>
                </button>

                <button className={styles.actionBtn} onClick={() => setActiveTab('grades')}>
                  <span className={styles.actionIcon}>📊</span>
                  <div className={styles.actionContent}>
                    <h4 className={styles.actionTitle}>View Grades</h4>
                    <p className={styles.actionDesc}>Check your academic performance</p>
                  </div>
                </button>

                <button className={styles.actionBtn}>
                  <span className={styles.actionIcon}>📚</span>
                  <div className={styles.actionContent}>
                    <h4 className={styles.actionTitle}>Assignments</h4>
                    <p className={styles.actionDesc}>View pending assignments</p>
                  </div>
                </button>

                <button className={styles.actionBtn}>
                  <span className={styles.actionIcon}>📅</span>
                  <div className={styles.actionContent}>
                    <h4 className={styles.actionTitle}>Class Schedule</h4>
                    <p className={styles.actionDesc}>View your class timetable</p>
                  </div>
                </button>

                <button className={styles.actionBtn}>
                  <span className={styles.actionIcon}>📖</span>
                  <div className={styles.actionContent}>
                    <h4 className={styles.actionTitle}>Library Books</h4>
                    <p className={styles.actionDesc}>Check issued library books</p>
                  </div>
                </button>

                <button className={styles.actionBtn}>
                  <span className={styles.actionIcon}>🏠</span>
                  <div className={styles.actionContent}>
                    <h4 className={styles.actionTitle}>Hostel Info</h4>
                    <p className={styles.actionDesc}>View hostel room details</p>
                  </div>
                </button>
              </div>
            </div>

            <div className={styles.recentSection}>
              <h2 className={styles.sectionTitle}>Recent Updates</h2>
              <div className={styles.activityList}>
                <div className={styles.activityItem}>
                  <div className={styles.activityIcon}>📊</div>
                  <div className={styles.activityContent}>
                    <h4>Grade Updated</h4>
                    <p>Your grade for JavaScript Fundamentals quiz has been updated</p>
                    <span className={styles.activityTime}>2 hours ago</span>
                  </div>
                </div>

                <div className={styles.activityItem}>
                  <div className={styles.activityIcon}>📚</div>
                  <div className={styles.activityContent}>
                    <h4>New Assignment</h4>
                    <p>React Components assignment posted in Web Development</p>
                    <span className={styles.activityTime}>1 day ago</span>
                  </div>
                </div>

                <div className={styles.activityItem}>
                  <div className={styles.activityIcon}>📖</div>
                  <div className={styles.activityContent}>
                    <h4>Library Book Due</h4>
                    <p>"Data Structures & Algorithms" is due for return tomorrow</p>
                    <span className={styles.activityTime}>2 days ago</span>
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
      <StudentSidebar activeItem="Dashboard" />
      <div className={styles.mainContent}>
        <StudentHeader />
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

export default StudentDashboard;
