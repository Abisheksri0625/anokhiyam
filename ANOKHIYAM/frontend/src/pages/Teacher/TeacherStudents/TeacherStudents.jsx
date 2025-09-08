import React, { useState, useEffect } from 'react';
import TeacherSidebar from '../../../components/TeacherSidebar/TeacherSidebar';
import TeacherHeader from '../../../components/TeacherHeader/TeacherHeader';
import styles from './TeacherStudents.module.css';

const TeacherStudents = () => {
  // Sidebar collapsed state managed here so hamburger toggle works everywhere
  const [isCollapsed, setIsCollapsed] = useState(() => {
    // Optional: persist sidebar state in localStorage
    const saved = localStorage.getItem('teacherSidebarCollapsed');
    return saved === 'true';
  });

  // Persist state on changes (optional)
  useEffect(() => {
    localStorage.setItem('teacherSidebarCollapsed', isCollapsed);
  }, [isCollapsed]);

  return (
    <div className={styles.pageContainer}>
      <TeacherSidebar
        activeItem="students"
        isCollapsed={isCollapsed}
        setIsCollapsed={setIsCollapsed}
      />
      <div className={`${styles.mainContent} ${isCollapsed ? styles.collapsed : ''}`}>
        <TeacherHeader isCollapsed={isCollapsed} />
        <div className={styles.content}>
          <div className={styles.pageHeader}>
            <h1 className={styles.pageTitle}>My Students</h1>
            <p className={styles.pageSubtitle}>Manage and view your student profiles</p>
          </div>
          <div className={styles.contentArea}>
            {/* Placeholder content */}
            <p>This page will be populated with student management features.</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TeacherStudents;
