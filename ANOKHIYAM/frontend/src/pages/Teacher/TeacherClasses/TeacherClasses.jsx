import React, { useState, useEffect } from 'react';
import TeacherSidebar from '../../../components/TeacherSidebar/TeacherSidebar';
import TeacherHeader from '../../../components/TeacherHeader/TeacherHeader';
import styles from './TeacherClasses.module.css';

const timeSlots = [
  '8:45 AM', '9:30 AM', '10:15 AM', '11:00 AM',
  '11:45 AM', '12:30 PM', '1:15 PM', '2:00 PM'
];

// Sample timetable for Mary Teacher
const timetable = {
  Monday: ['IV CSE A', '--', 'III CSE A', '--', 'II CSE B', '--', 'II CSE C', 'IV CSE A'],
  Tuesday: ['--', 'IV CSE A', '--', 'II CSE B', '--', 'II CSE A', 'II CSE C', '--'],
  Wednesday: ['IV CSE A', '--', 'II CSE C', 'III CSE A', '--', 'II CSE B', '--', '--'],
  Thursday: ['--', 'II CSE A', '--', 'II CSE C', 'IV CSE A', '--', 'III CSE A', '--'],
  Friday: ['IV CSE A', '--', 'II CSE C', '--', 'IV  CSE A', 'III CSE A', '--', 'II CSE B']
};

const TeacherClasses = () => {
  const [isCollapsed, setIsCollapsed] = useState(() => {
    const saved = localStorage.getItem('teacherSidebarCollapsed');
    return saved === 'true';
  });

  useEffect(() => {
    localStorage.setItem('teacherSidebarCollapsed', isCollapsed);
  }, [isCollapsed]);

  return (
    <div className={styles.pageContainer}>
      <TeacherSidebar
        activeItem="classes"
        isCollapsed={isCollapsed}
        setIsCollapsed={setIsCollapsed}
      />
      <div className={`${styles.mainContent} ${isCollapsed ? styles.collapsed : ''}`}>
        <TeacherHeader isCollapsed={isCollapsed} />
        <div className={styles.content}>
          <div className={styles.pageHeader}>
            <h1 className={styles.pageTitle}>My Classes</h1>
            <p className={styles.pageSubtitle}>Timetable for Mary Teacher – V Semester</p>
          </div>
          <div className={styles.contentArea}>
            <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: '0.9rem' }}>
              <thead>
                <tr style={{ background: '#ec4899', color: 'white' }}>
                  <th style={{ padding: '0.75rem', border: '1px solid #f3f4f6' }}>Day</th>
                  {timeSlots.map((slot, idx) => (
                    <th key={idx} style={{ padding: '0.75rem', border: '1px solid #f3f4f6' }}>{slot}</th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {Object.entries(timetable).map(([day, slots]) => (
                  <tr key={day}>
                    <td style={{ padding: '0.75rem', border: '1px solid #f3f4f6', fontWeight: '600' }}>{day}</td>
                    {slots.map((entry, idx) => (
                      <td
                        key={idx}
                        style={{
                          padding: '0.75rem',
                          border: '1px solid #f3f4f6',
                          color: entry === '--' ? '#9ca3af' : '#1f2937',
                          textAlign: 'center'
                        }}
                      >
                        {entry}
                      </td>
                    ))}
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TeacherClasses;
