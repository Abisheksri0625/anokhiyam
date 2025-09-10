import React, { useState, useEffect } from 'react';
import styles from './TeacherAttendance.module.css';
import TeacherSidebar from '../../../components/TeacherSidebar/TeacherSidebar';
import TeacherHeader from '../../../components/TeacherHeader/TeacherHeader';
import TeachAttendance from '../../../components/TeachAttendance/TeachAttendance';
import TeachLeave from '../../../components/TeachLeave/TeachLeave';

const TeacherAttendance = () => {
  const [activeTab, setActiveTab] = useState('attendance');
  const [isCollapsed, setIsCollapsed] = useState(() => {
    return localStorage.getItem('teacherSidebarCollapsed') === 'true';
  });

  useEffect(() => {
    localStorage.setItem('teacherSidebarCollapsed', isCollapsed);
  }, [isCollapsed]);

  return (
    <div className={styles.pageContainer}>
      <TeacherSidebar
        activeItem="attendance"
        isCollapsed={isCollapsed}
        setIsCollapsed={setIsCollapsed}
      />

      <div className={`${styles.mainContent} ${isCollapsed ? styles.collapsed : ''}`}>
        <TeacherHeader isCollapsed={isCollapsed} />

        <div className={styles.content}>
          <div className={styles.pageHeader}>
            <h1 className={styles.pageTitle}>Attendance</h1>
            <p className={styles.pageSubtitle}>Mark and manage student attendance</p>
          </div>

          {/* Taskbar aligned with sidebar */}
          <div className={styles.taskbar}>
            <button
              className={`${styles.tabButton} ${activeTab === 'attendance' ? styles.active : ''}`}
              onClick={() => setActiveTab('attendance')}
            >
              Attendance
            </button>
            <button
              className={`${styles.tabButton} ${activeTab === 'leave' ? styles.active : ''}`}
              onClick={() => setActiveTab('leave')}
            >
              Leave Management
            </button>
          </div>

          <div className={styles.sectionBox}>
            {activeTab === 'attendance' ? <TeachAttendance /> : <TeachLeave />}
          </div>
        </div>
      </div>
    </div>
  );
};

export default TeacherAttendance;
