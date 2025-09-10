import React, { useState, useEffect } from 'react';
import StudentSidebar from '../../../components/StudentSidebar/StudentSidebar';
import StudentHeader from '../../../components/StudentHeader/StudentHeader';
import styles from './StudentSchedule.module.css';

const timetable = {
  Monday: ['CS451', 'CS452', 'CS453', 'LIB/SEMINAR', 'CS458 Lab', 'Lunch', 'CS455', 'CS456'],
  Tuesday: ['CS452', 'CS454', 'CS453', 'CS459 Lab', 'Lunch', 'CS457', 'MX401', 'CS451'],
  Wednesday: ['CS455', 'CS456', 'CS451', 'CS460 Lab', 'Lunch', 'CS454', 'CS452', 'LIB/SEMINAR'],
  Thursday: ['CS453', 'CS454', 'CS451', 'CS458 Lab', 'Lunch', 'CS459 Lab', 'CS455', 'CS457'],
  Friday: ['CS456', 'CS452', 'CS453', 'CS460 Lab', 'Lunch', 'CS454', 'MX401', 'CS451']
};

const subjects = {
  CS451: 'Software Engineering – Dr. L. Sai Ramesh',
  CS452: 'Compiler Design – Mrs. S. Usha',
  CS453: 'Digital Image Processing – Mrs. M. Jayanthi',
  CS454: 'AI & Image Processing – Mrs. R. Kavitha',
  CS455: 'UX Design – Mrs. M. Lavanya',
  CS456: 'Fundamentals of DIP – Mrs. R. Kavitha',
  CS457: 'Women & Gender Studies – Mrs. Shanti Shalini',
  MX401: 'Constitution of India – Mrs. Shanti Shalini',
  'CS458 Lab': 'Software Design Lab – Dr. Sai Ramesh, Dr. Deepthi Kumari',
  'CS459 Lab': 'DIP Lab – Mr. Krishnasari, Mrs. Jayanapriyan',
  'CS460 Lab': 'UX Design Lab – Mr. Krishnasari, Mrs. Lavanya',
  'LIB/SEMINAR': 'Library/Seminar – Dr. Shalini / Mrs. S. Usha',
  Lunch: 'Lunch Break'
};

const timeSlots = [
  '8:45 AM', '9:30 AM', '10:15 AM', '11:00 AM',
  '11:45 AM', '12:30 PM', '1:15 PM', '2:00 PM'
];

const StudentSchedule = () => {
  const [isCollapsed, setIsCollapsed] = useState(() => localStorage.getItem('studentSidebarCollapsed') === 'true');

  useEffect(() => {
    localStorage.setItem('studentSidebarCollapsed', isCollapsed);
  }, [isCollapsed]);

  const theorySubjects = Object.entries(subjects).filter(([code]) => !code.includes('Lab') && code !== 'Lunch');
  const labSubjects = Object.entries(subjects).filter(([code]) => code.includes('Lab'));

  return (
    <div className={styles.pageContainer}>
      <StudentSidebar activeItem="schedule" isCollapsed={isCollapsed} setIsCollapsed={setIsCollapsed} />
      <div className={`${styles.mainContent} ${isCollapsed ? styles.collapsed : ''}`}>
        <StudentHeader isCollapsed={isCollapsed} onMenuToggle={() => setIsCollapsed(!isCollapsed)} />
        <div className={styles.content}>
          <h1>Class Schedule – V Semester (CSE)</h1>

          {/* Timetable */}
          <div style={{ overflowX: 'auto', marginBottom: '2rem' }}>
            <table style={{
              width: '100%',
              borderCollapse: 'collapse',
              fontSize: '0.9rem',
              background: '#f0fdf4',
              border: '1px solid #d1fae5'
            }}>
              <thead>
                <tr style={{ background: '#10b981', color: 'white' }}>
                  <th style={{ padding: '0.75rem', border: '1px solid #d1fae5' }}>Day</th>
                  {timeSlots.map((time, idx) => (
                    <th key={idx} style={{ padding: '0.75rem', border: '1px solid #d1fae5' }}>{time}</th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {Object.entries(timetable).map(([day, slots]) => (
                  <tr key={day}>
                    <td style={{ padding: '0.75rem', border: '1px solid #d1fae5', fontWeight: '600' }}>{day}</td>
                    {slots.map((code, idx) => (
                      <td key={day + idx} style={{
                        padding: '0.75rem',
                        border: '1px solid #d1fae5',
                        textAlign: 'center',
                        background: code.includes('Lab') ? '#ecfdf5' : '#ffffff'
                      }}>
                        <strong>{code}</strong>
                      </td>
                    ))}
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {/* Subject Details */}
          <div style={{ display: 'flex', gap: '2rem', flexWrap: 'wrap' }}>
            <div style={{
              flex: 1,
              background: '#ffffff',
              padding: '1rem 1.5rem',
              borderRadius: '8px',
              border: '2px solid #10b981',
              boxShadow: '0 0 0 1px #d1fae5'
            }}>
              <h3 style={{ color: '#065f46' }}>Theory Subjects</h3>
              <ul style={{ lineHeight: '1.8', marginTop: '1rem' }}>
                {theorySubjects.map(([code, detail]) => (
                  <li key={code}><strong>{code}:</strong> {detail}</li>
                ))}
              </ul>
            </div>
            <div style={{
              flex: 1,
              background: '#ffffff',
              padding: '1rem 1.5rem',
              borderRadius: '8px',
              border: '2px solid #10b981',
              boxShadow: '0 0 0 1px #d1fae5'
            }}>
              <h3 style={{ color: '#065f46' }}>Lab Subjects</h3>
              <ul style={{ lineHeight: '1.8', marginTop: '1rem' }}>
                {labSubjects.map(([code, detail]) => (
                  <li key={code}><strong>{code}:</strong> {detail}</li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default StudentSchedule;