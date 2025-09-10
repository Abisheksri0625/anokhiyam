import React, { useState, useEffect } from 'react';
import StudentSidebar from '../../../components/StudentSidebar/StudentSidebar';
import StudentHeader from '../../../components/StudentHeader/StudentHeader';
import styles from './StudentAssignments.module.css';
import { FiUpload } from 'react-icons/fi'; // Upload icon

const StudentAssignments = () => {
  const [isCollapsed, setIsCollapsed] = useState(() => localStorage.getItem('studentSidebarCollapsed') === 'true');

  useEffect(() => {
    localStorage.setItem('studentSidebarCollapsed', isCollapsed);
  }, [isCollapsed]);

  const assignments = [
    {
      title: 'Math Homework - Algebra',
      description: 'Solve the equations from chapter 6',
      class: 'CSE-A',
      submissionDate: '2025-09-15',
    },
    {
      title: 'Science Project',
      description: 'Prepare model on renewable energy',
      class: 'CSE-A',
      submissionDate: '2025-09-20',
    },
  ];

  return (
    <div className={styles.pageContainer}>
      <StudentSidebar activeItem="assignments" isCollapsed={isCollapsed} setIsCollapsed={setIsCollapsed} />
      <div className={`${styles.mainContent} ${isCollapsed ? styles.collapsed : ''}`}>
        <StudentHeader isCollapsed={isCollapsed} onMenuToggle={() => setIsCollapsed(!isCollapsed)} />
        <div className={styles.content}>
          <h1>Assignments</h1>
          <div className={styles.assignmentList}>
            {assignments.map((assignment, index) => (
              <div key={index} className={styles.assignmentCard}>
                <h2>{assignment.title}</h2>
                <p>{assignment.description}</p>
                <span className={styles.classTag}>Class: {assignment.class}</span>
                <p className={styles.submissionDate}>Submission Date: {assignment.submissionDate}</p>
                <label className={styles.uploadLabel}>
                  <FiUpload className={styles.uploadIcon} />
                  <input type="file" className={styles.fileInput} />
                  <span>Upload File</span>
                </label>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default StudentAssignments;
