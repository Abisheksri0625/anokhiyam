import React, { useState } from 'react';
import AdminSidebar from '../../../components/AdminSidebar/AdminSidebar';
import AdminHeader from '../../../components/AdminHeader/AdminHeader';
import styles from './SemesterResults.module.css';

const SemesterResults = () => {
  const [selectedClass, setSelectedClass] = useState('');
  const [selectedSection, setSelectedSection] = useState('');
  const [selectedSemester, setSelectedSemester] = useState('');
  const [selectedSubject, setSelectedSubject] = useState('');

  const studentData = [
    { regNo: '101', name: 'Alex', marks: 85 },
    { regNo: '102', name: 'John', marks: 74 },
    { regNo: '103', name: 'Priya', marks: 92 },
    { regNo: '104', name: 'Rahul', marks: 68 }
  ];

  return (
    <div className={styles.dashboardContainer}>
      <AdminSidebar activeItem="semester-results" />
      <div className={styles.mainContent}>
        <AdminHeader />
        <div className={styles.content}>
          <div className={styles.pageHeader}>
            <h1 className={styles.pageTitle}>Semester Results Management</h1>
            <p className={styles.pageSubtitle}>Manage and publish semester exam results</p>
          </div>

          <div className={styles.contentSection}>
            {/* Dropdown Filters */}
            <div style={{ display: 'flex', gap: '1rem', flexWrap: 'wrap', marginBottom: '2rem' }}>
              <select value={selectedClass} onChange={(e) => setSelectedClass(e.target.value)}>
                <option value="">Select Class</option>
                <option value="BSc CS">BSc CS</option>
                <option value="BCom">BCom</option>
              </select>
              <select value={selectedSection} onChange={(e) => setSelectedSection(e.target.value)}>
                <option value="">Select Section</option>
                <option value="A">A</option>
                <option value="B">B</option>
              </select>
              <select value={selectedSemester} onChange={(e) => setSelectedSemester(e.target.value)}>
                <option value="">Select Semester</option>
                <option value="I">I</option>
                <option value="II">II</option>
                <option value="III">III</option>
              </select>
              <select value={selectedSubject} onChange={(e) => setSelectedSubject(e.target.value)}>
                <option value="">Select Subject</option>
                <option value="Maths">Maths</option>
                <option value="Accounts">Accounts</option>
              </select>
            </div>

            {/* Action Buttons */}
            <div style={{ display: 'flex', gap: '1rem', marginBottom: '2rem' }}>
              <button>Upload Result File</button>
              <button>Manually Enter Marks</button>
            </div>

            {/* Student Table */}
            <div style={{ overflowX: 'auto', marginBottom: '2rem' }}>
              <table style={{ width: '100%', borderCollapse: 'collapse' }}>
                <thead>
                  <tr style={{ background: '#f1f5f9' }}>
                    <th style={{ padding: '0.75rem', textAlign: 'left' }}>Reg No</th>
                    <th style={{ padding: '0.75rem', textAlign: 'left' }}>Name</th>
                    <th style={{ padding: '0.75rem', textAlign: 'left' }}>Marks</th>
                  </tr>
                </thead>
                <tbody>
                  {studentData.map((student, index) => (
                    <tr key={index} style={{ borderBottom: '1px solid #e5e7eb' }}>
                      <td style={{ padding: '0.75rem' }}>{student.regNo}</td>
                      <td style={{ padding: '0.75rem' }}>{student.name}</td>
                      <td style={{ padding: '0.75rem' }}>{student.marks}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            {/* Footer Buttons */}
            <div style={{ display: 'flex', gap: '1rem' }}>
              <button style={{ background: '#3b82f6', color: '#fff', padding: '0.5rem 1rem', borderRadius: '6px', border: 'none' }}>
                Save Changes
              </button>
              <button style={{ background: '#10b981', color: '#fff', padding: '0.5rem 1rem', borderRadius: '6px', border: 'none' }}>
                Publish
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SemesterResults;
