import React, { useState } from 'react';
import TeacherSidebar from '../../components/TeacherSidebar/TeacherSidebar';
import TeacherHeader from '../../components/TeacherHeader/TeacherHeader';
import TotalStudentsCard from '../../components/TeacherCards/TotalStudentsCard';
import ClassScheduleCard from '../../components/TeacherCards/ClassScheduleCard';
import AssignmentsCard from '../../components/TeacherCards/AssignmentsCard';
import AttendanceCard from '../../components/TeacherCards/AttendanceCard';
import styles from './TeacherDashboard.module.css';

const TeacherDashboard = () => {
  const [activeTab, setActiveTab] = useState('overview');
  const [isCollapsed, setIsCollapsed] = useState(false);

  const renderContent = () => {
    switch(activeTab) {
      case 'student-profiles':
        return (
          <div className={styles.contentSection}>
            <h2>Student Profiles</h2>
            <p>View and update student academic records and information</p>
            <div className={styles.studentList}>
              <div className={styles.studentItem}>
                <div className={styles.studentInfo}>
                  <h4>John Smith</h4>
                  <p>CS-2021-045 • Computer Science</p>
                </div>
                <button className={styles.viewBtn}>View Profile</button>
              </div>
              <div className={styles.studentItem}>
                <div className={styles.studentInfo}>
                  <h4>Sarah Johnson</h4>
                  <p>IT-2020-123 • Information Technology</p>
                </div>
                <button className={styles.viewBtn}>View Profile</button>
              </div>
              <div className={styles.studentItem}>
                <div className={styles.studentInfo}>
                  <h4>Mike Wilson</h4>
                  <p>CS-2021-078 • Computer Science</p>
                </div>
                <button className={styles.viewBtn}>View Profile</button>
              </div>
            </div>
          </div>
        );
      case 'attendance':
        return (
          <div className={styles.contentSection}>
            <h2>Mark Attendance</h2>
            <p>Mark student attendance for your classes</p>
          </div>
        );
      default:
        return (
          <>
            <div className={styles.pageHeader}>
              <h1 className={styles.pageTitle}>Teacher Dashboard</h1>
              <p className={styles.pageSubtitle}>Welcome back, Teacher! Here's your teaching overview.</p>
            </div>

            <div className={styles.statsGrid}>
              <TotalStudentsCard />
              <ClassScheduleCard />
              <AssignmentsCard />
              <AttendanceCard />
            </div>

            <div className={styles.actionsSection}>
              <h2 className={styles.sectionTitle}>Quick Actions</h2>
              <div className={styles.actionGrid}>
                <button className={styles.actionBtn} onClick={() => setActiveTab('student-profiles')}>
                  <span className={styles.actionIcon}>👥</span>
                  <div className={styles.actionContent}>
                    <h4 className={styles.actionTitle}>Student Profiles</h4>
                    <p className={styles.actionDesc}>View and update student information</p>
                  </div>
                </button>

                <button className={styles.actionBtn} onClick={() => setActiveTab('attendance')}>
                  <span className={styles.actionIcon}>✅</span>
                  <div className={styles.actionContent}>
                    <h4 className={styles.actionTitle}>Mark Attendance</h4>
                    <p className={styles.actionDesc}>Mark attendance for your classes</p>
                  </div>
                </button>

                <button className={styles.actionBtn}>
                  <span className={styles.actionIcon}>📚</span>
                  <div className={styles.actionContent}>
                    <h4 className={styles.actionTitle}>Create Assignment</h4>
                    <p className={styles.actionDesc}>Create and assign homework</p>
                  </div>
                </button>

                <button className={styles.actionBtn}>
                  <span className={styles.actionIcon}>📊</span>
                  <div className={styles.actionContent}>
                    <h4 className={styles.actionTitle}>Grade Students</h4>
                    <p className={styles.actionDesc}>Grade assignments and exams</p>
                  </div>
                </button>

                <button className={styles.actionBtn}>
                  <span className={styles.actionIcon}>📅</span>
                  <div className={styles.actionContent}>
                    <h4 className={styles.actionTitle}>Class Schedule</h4>
                    <p className={styles.actionDesc}>View your teaching schedule</p>
                  </div>
                </button>

                <button className={styles.actionBtn}>
                  <span className={styles.actionIcon}>📋</span>
                  <div className={styles.actionContent}>
                    <h4 className={styles.actionTitle}>Reports</h4>
                    <p className={styles.actionDesc}>Generate class reports</p>
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
                    <h4>Assignment Created</h4>
                    <p>Created "React Components" assignment for Web Development class</p>
                    <span className={styles.activityTime}>1 hour ago</span>
                  </div>
                </div>

                <div className={styles.activityItem}>
                  <div className={styles.activityIcon}>✅</div>
                  <div className={styles.activityContent}>
                    <h4>Attendance Marked</h4>
                    <p>Marked attendance for Computer Science - Morning batch</p>
                    <span className={styles.activityTime}>3 hours ago</span>
                  </div>
                </div>

                <div className={styles.activityItem}>
                  <div className={styles.activityIcon}>📊</div>
                  <div className={styles.activityContent}>
                    <h4>Grades Updated</h4>
                    <p>Updated grades for JavaScript fundamentals quiz</p>
                    <span className={styles.activityTime}>1 day ago</span>
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
      <TeacherSidebar 
        activeItem="Dashboard" 
        isCollapsed={isCollapsed}
        setIsCollapsed={setIsCollapsed}
      />
      <div className={`${styles.mainContent} ${isCollapsed ? styles.collapsed : ''}`}>
        <TeacherHeader isCollapsed={isCollapsed} />
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

export default TeacherDashboard;
