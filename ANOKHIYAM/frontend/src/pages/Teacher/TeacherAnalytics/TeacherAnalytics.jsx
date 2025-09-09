import React, { useState, useEffect } from 'react';
import TeacherSidebar from '../../../components/TeacherSidebar/TeacherSidebar';
import TeacherHeader from '../../../components/TeacherHeader/TeacherHeader';
import styles from './TeacherAnalytics.module.css';

const subjects = ['Math', 'Science', 'English', 'History', 'Computer Science'];

const topStudents = [
  { name: 'John David', marks: 95 },
  { name: 'Priya Sharma', marks: 93 },
  { name: 'Arjun Kumar', marks: 91 },
  { name: 'Sneha Reddy', marks: 90 },
  { name: 'Michael Raj', marks: 89 }
];

const bottomStudents = [
  { name: 'Ravi Kumar', marks: 45 },
  { name: 'Anjali Mehta', marks: 48 },
  { name: 'Karan Singh', marks: 50 },
  { name: 'Divya Nair', marks: 52 },
  { name: 'Rahul Das', marks: 53 }
];

const atRiskStudents = [
  { name: 'Ravi Kumar', attendance: '68%', marks: 45 },
  { name: 'Anjali Mehta', attendance: '72%', marks: 48 },
  { name: 'Karan Singh', attendance: '70%', marks: 50 }
];

const TeacherAnalytics = () => {
  const [isCollapsed, setIsCollapsed] = useState(() => {
    const saved = localStorage.getItem('teacherSidebarCollapsed');
    return saved === 'true';
  });

  const [selectedSubject, setSelectedSubject] = useState(subjects[0]);

  useEffect(() => {
    localStorage.setItem('teacherSidebarCollapsed', isCollapsed);
  }, [isCollapsed]);

  const handleExportPDF = () => {
    alert('Exporting report as PDF...');
  };

  const handleExportExcel = () => {
    alert('Exporting report as Excel...');
  };

  const handleSaveReport = () => {
    alert('Report saved successfully!');
  };

  return (
    <div className={styles.pageContainer}>
      <TeacherSidebar
        activeItem="analytics"
        isCollapsed={isCollapsed}
        setIsCollapsed={setIsCollapsed}
      />
      <div className={`${styles.mainContent} ${isCollapsed ? styles.collapsed : ''}`}>
        <TeacherHeader isCollapsed={isCollapsed} />
        <div className={styles.content}>
          <div className={styles.pageHeader}>
            <h1 className={styles.pageTitle}>Teacher Analytics Dashboard</h1>
            <p className={styles.pageSubtitle}>View detailed analytics and performance reports</p>
          </div>

          <div className={styles.contentArea}>
            {/* Teacher Info and Subject Dropdown */}
            <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '2rem' }}>
              <div><strong>Teacher:</strong> Mary Teacher</div>
              <div>
                <label><strong>Subject:</strong></label>{' '}
                <select
                  value={selectedSubject}
                  onChange={(e) => setSelectedSubject(e.target.value)}
                  style={{ padding: '0.5rem', borderRadius: '0.5rem', border: '1px solid #d1d5db' }}
                >
                  {subjects.map((subj, idx) => (
                    <option key={idx} value={subj}>{subj}</option>
                  ))}
                </select>
              </div>
            </div>

            {/* Overall Performance Summary */}
            <div style={{ marginBottom: '2rem', background: '#f9fafb', padding: '1rem', borderRadius: '1rem' }}>
              <h3>Overall Performance</h3>
              <p><strong>Average Marks:</strong> 78%</p>
              <p><strong>Pass Percentage:</strong> 85%</p>
              <p><strong>Fail Percentage:</strong> 15%</p>
            </div>

            {/* Top and Bottom Students */}
            <div style={{ display: 'flex', gap: '2rem', marginBottom: '2rem' }}>
              <div style={{ flex: 1 }}>
                <h3>Top 5 Students</h3>
                <ul>
                  {topStudents.map((student, idx) => (
                    <li key={idx}>{student.name} - {student.marks} marks</li>
                  ))}
                </ul>
              </div>
              <div style={{ flex: 1 }}>
                <h3>Bottom 5 Students</h3>
                <ul>
                  {bottomStudents.map((student, idx) => (
                    <li key={idx}>{student.name} - {student.marks} marks</li>
                  ))}
                </ul>
              </div>
            </div>

            {/* At-risk Students */}
            <div style={{ marginBottom: '2rem' }}>
              <h3>At-risk Students</h3>
              <table style={{ width: '100%', borderCollapse: 'collapse' }}>
                <thead>
                  <tr style={{ background: '#f3f4f6' }}>
                    <th style={{ padding: '0.75rem', border: '1px solid #e5e7eb' }}>Name</th>
                    <th style={{ padding: '0.75rem', border: '1px solid #e5e7eb' }}>Attendance</th>
                    <th style={{ padding: '0.75rem', border: '1px solid #e5e7eb' }}>Marks</th>
                  </tr>
                </thead>
                <tbody>
                  {atRiskStudents.map((student, idx) => (
                    <tr key={idx}>
                      <td style={{ padding: '0.75rem', border: '1px solid #e5e7eb' }}>{student.name}</td>
                      <td style={{ padding: '0.75rem', border: '1px solid #e5e7eb' }}>{student.attendance}</td>
                      <td style={{ padding: '0.75rem', border: '1px solid #e5e7eb' }}>{student.marks}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            {/* Action Buttons */}
            <div style={{ display: 'flex', gap: '1rem' }}>
              <button onClick={handleExportPDF} style={{ padding: '0.75rem 1.5rem', background: '#ec4899', color: 'white', border: 'none', borderRadius: '0.5rem' }}>
                Export as PDF
              </button>
              <button onClick={handleExportExcel} style={{ padding: '0.75rem 1.5rem', background: '#06b6d4', color: 'white', border: 'none', borderRadius: '0.5rem' }}>
                Export as Excel
              </button>
              <button onClick={handleSaveReport} style={{ padding: '0.75rem 1.5rem', background: '#10b981', color: 'white', border: 'none', borderRadius: '0.5rem' }}>
                Save Report
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TeacherAnalytics;
