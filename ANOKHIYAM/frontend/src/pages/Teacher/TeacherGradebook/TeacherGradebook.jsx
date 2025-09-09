import React, { useState, useEffect } from 'react';
import { jsPDF } from 'jspdf';
import TeacherSidebar from '../../../components/TeacherSidebar/TeacherSidebar';
import TeacherHeader from '../../../components/TeacherHeader/TeacherHeader';
import styles from './TeacherGradebook.module.css';

const classes = ['CSE A', 'CSE B', 'CSE C'];
const sections = ['A', 'B', 'C'];

const students = [
  { regNo: '21CS001', name: 'John David', class: 'CSE A', section: 'A' },
  { regNo: '21CS002', name: 'Priya Sharma', class: 'CSE A', section: 'A' },
  { regNo: '21CS003', name: 'Arjun Kumar', class: 'CSE B', section: 'B' },
  { regNo: '21CS004', name: 'Sneha Reddy', class: 'CSE C', section: 'C' },
  { regNo: '21CS005', name: 'Michael Raj', class: 'CSE C', section: 'C' }
];

const subjects = ['Subject 1', 'Subject 2', 'Subject 3', 'Subject 4', 'Subject 5'];

const TeacherGradebook = () => {
  const [isCollapsed, setIsCollapsed] = useState(() => {
    const saved = localStorage.getItem('teacherSidebarCollapsed');
    return saved === 'true';
  });

  const [selectedClass, setSelectedClass] = useState('');
  const [selectedSection, setSelectedSection] = useState('');
  const [selectedStudent, setSelectedStudent] = useState('');
  const [selectedSubject, setSelectedSubject] = useState('');
  const [marks, setMarks] = useState(() =>
    subjects.reduce((acc, subject) => ({ ...acc, [subject]: '' }), {})
  );

  useEffect(() => {
    localStorage.setItem('teacherSidebarCollapsed', isCollapsed);
  }, [isCollapsed]);

  const filteredStudents = students.filter(
    (s) => s.class === selectedClass && s.section === selectedSection
  );

  const handleMarkChange = (subject, value) => {
    const numeric = Math.max(0, Math.min(100, Number(value)));
    setMarks((prev) => ({ ...prev, [subject]: numeric }));
  };

  const handleSave = () => {
    const regNo = students.find((s) => s.name === selectedStudent)?.regNo || '';
    console.log('Saved Marks:', { selectedClass, selectedSection, selectedStudent, regNo, marks });
    alert('Marks saved successfully!');
  };

  const handleExport = () => {
    const doc = new jsPDF();
    doc.setFontSize(16);
    doc.text('Gradebook Entry', 20, 20);
    doc.setFontSize(12);
    doc.text(`Class: ${selectedClass}`, 20, 30);
    doc.text(`Section: ${selectedSection}`, 20, 36);
    doc.text(`Student: ${selectedStudent}`, 20, 42);
    const regNo = students.find((s) => s.name === selectedStudent)?.regNo || '';
    doc.text(`Register No: ${regNo}`, 20, 48);

    let y = 60;
    subjects.forEach((subject) => {
      doc.text(`${subject}: ${marks[subject] || '-'}`, 20, y);
      y += 8;
    });

    doc.save(`${selectedStudent}_Gradebook.pdf`);
  };

  return (
    <div className={styles.pageContainer}>
      <TeacherSidebar
        activeItem="gradebook"
        isCollapsed={isCollapsed}
        setIsCollapsed={setIsCollapsed}
      />
      <div className={`${styles.mainContent} ${isCollapsed ? styles.collapsed : ''}`}>
        <TeacherHeader isCollapsed={isCollapsed} />
        <div className={styles.content}>
          <div className={styles.pageHeader}>
            <h1 className={styles.pageTitle}>Enter Marks</h1>
            <p className={styles.pageSubtitle}>Staff Portal - Gradebook Entry</p>
          </div>

          <div className={styles.contentArea}>
            {/* Class Selection */}
            <div className={styles.formGroup}>
              <label>Select Class:</label>
              <select value={selectedClass} onChange={(e) => {
                setSelectedClass(e.target.value);
                setSelectedSection('');
                setSelectedStudent('');
              }}>
                <option value="">-- Select Class --</option>
                {classes.map((cls) => (
                  <option key={cls} value={cls}>{cls}</option>
                ))}
              </select>
            </div>

            {/* Section Selection */}
            {selectedClass && (
              <div className={styles.formGroup}>
                <label>Select Section:</label>
                <select value={selectedSection} onChange={(e) => {
                  setSelectedSection(e.target.value);
                  setSelectedStudent('');
                }}>
                  <option value="">-- Select Section --</option>
                  {sections.map((sec) => (
                    <option key={sec} value={sec}>{sec}</option>
                  ))}
                </select>
              </div>
            )}

            {/* Student Selection */}
            {selectedClass && selectedSection && (
              <div className={styles.formGroup}>
                <label>Select Student:</label>
                <select value={selectedStudent} onChange={(e) => setSelectedStudent(e.target.value)}>
                  <option value="">-- Select Student --</option>
                  {filteredStudents.map((student) => (
                    <option key={student.regNo} value={student.name}>{student.name}</option>
                  ))}
                </select>
              </div>
            )}

            {/* Register No */}
            {selectedStudent && (
              <div className={styles.formGroup}>
                <label>Register No:</label>
                <input
                  type="text"
                  readOnly
                  value={students.find((s) => s.name === selectedStudent)?.regNo || ''}
                />
              </div>
            )}

            {/* Subject Selection */}
            {selectedStudent && (
              <div className={styles.formGroup}>
                <label>Select Subject:</label>
                <select value={selectedSubject} onChange={(e) => setSelectedSubject(e.target.value)}>
                  <option value="">-- Select Subject --</option>
                  {subjects.map((subject, idx) => (
                    <option key={idx} value={subject}>{subject}</option>
                  ))}
                </select>
              </div>
            )}

            {/* Marks Table */}
            {selectedStudent && (
              <table className={styles.marksTable}>
                <thead>
                  <tr>
                    <th>Subject</th>
                    <th>Marks (Out of 100)</th>
                  </tr>
                </thead>
                <tbody>
                  {subjects.map((subject, idx) => (
                    <tr key={idx}>
                      <td>{subject}</td>
                      <td>
                        <input
                          type="number"
                          min="0"
                          max="100"
                          value={marks[subject]}
                          onChange={(e) => handleMarkChange(subject, e.target.value)}
                        />
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            )}

            {/* Action Buttons */}
            {selectedStudent && (
              <div className={styles.buttonGroup}>
                <button onClick={handleSave} className={styles.saveBtn}>Save Marks</button>
                <button onClick={handleExport} className={styles.exportBtn}>Export as PDF</button>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default TeacherGradebook;
