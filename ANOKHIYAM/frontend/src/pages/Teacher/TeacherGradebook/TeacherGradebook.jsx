import React, { useState, useEffect } from 'react';
import { jsPDF } from 'jspdf';
import TeacherSidebar from '../../../components/TeacherSidebar/TeacherSidebar';
import TeacherHeader from '../../../components/TeacherHeader/TeacherHeader';
import styles from './TeacherGradebook.module.css';

const classes = ['III CSE-A', 'II CSE-B', 'IV CSE-A'];
const subjects = ['Operating Systems', 'Digital Image Processing', 'Computer Architecture'];
const models = ['Model 1', 'Model 2', 'Model 3'];

const students = [
  { regNo: '21CS001', name: 'John David', class: 'III CSE-A' },
  { regNo: '21CS002', name: 'Priya Sharma', class: 'III CSE-A' },
  { regNo: '21CS003', name: 'Arjun Kumar', class: 'II CSE-B' },
  { regNo: '21CS004', name: 'Sneha Reddy', class: 'IV CSE-A' },
  { regNo: '21CS005', name: 'Michael Raj', class: 'II CSE-B' }
];

const TeacherGradebook = () => {
  const [isCollapsed, setIsCollapsed] = useState(() => {
    const saved = localStorage.getItem('teacherSidebarCollapsed');
    return saved === 'true';
  });

  const [selectedClass, setSelectedClass] = useState(classes[0]);
  const [selectedSubject, setSelectedSubject] = useState(subjects[0]);
  const [selectedModel, setSelectedModel] = useState(models[0]);
  const [marks, setMarks] = useState({});

  useEffect(() => {
    localStorage.setItem('teacherSidebarCollapsed', isCollapsed);
  }, [isCollapsed]);

  useEffect(() => {
    const filtered = students.filter((s) => s.class === selectedClass);
    const initialMarks = {};
    filtered.forEach((student) => {
      initialMarks[student.regNo] = '';
    });
    setMarks(initialMarks);
  }, [selectedClass, selectedSubject, selectedModel]);

  const handleMarkChange = (regNo, value) => {
    const numeric = Math.max(0, Math.min(100, Number(value)));
    setMarks((prev) => ({ ...prev, [regNo]: numeric }));
  };

  const handleSave = () => {
    console.log('Saved Marks:', {
      class: selectedClass,
      subject: selectedSubject,
      model: selectedModel,
      marks
    });
    alert('Marks saved successfully!');
  };

  const handleExport = () => {
    const doc = new jsPDF();
    doc.setFontSize(16);
    doc.text('Gradebook Entry', 20, 20);
    doc.setFontSize(12);
    doc.text(`Class: ${selectedClass}`, 20, 30);
    doc.text(`Subject: ${selectedSubject}`, 20, 36);
    doc.text(`Model: ${selectedModel}`, 20, 42);

    let y = 60;
    students
      .filter((s) => s.class === selectedClass)
      .forEach((student) => {
        doc.text(`${student.name} (${student.regNo}): ${marks[student.regNo] || '-'}`, 20, y);
        y += 8;
      });

    doc.save(`${selectedClass}_${selectedSubject}_${selectedModel}_Gradebook.pdf`);
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
            <h1 className={styles.pageTitle}>Gradebook Entry</h1>
            <p className={styles.pageSubtitle}>Staff Portal - Model Exam Marks</p>
          </div>

          <div className={styles.formRow}>
            <div className={styles.formGroup}>
              <label>Class</label>
              <select value={selectedClass} onChange={(e) => setSelectedClass(e.target.value)}>
                {classes.map((cls) => (
                  <option key={cls} value={cls}>{cls}</option>
                ))}
              </select>
            </div>

            <div className={styles.formGroup}>
              <label>Subject</label>
              <select value={selectedSubject} onChange={(e) => setSelectedSubject(e.target.value)}>
                {subjects.map((subj) => (
                  <option key={subj} value={subj}>{subj}</option>
                ))}
              </select>
            </div>

            <div className={styles.formGroup}>
              <label>Model Exam</label>
              <select value={selectedModel} onChange={(e) => setSelectedModel(e.target.value)}>
                {models.map((model) => (
                  <option key={model} value={model}>{model}</option>
                ))}
              </select>
            </div>
          </div>

          <table className={styles.table}>
            <thead>
              <tr>
                <th>Register No</th>
                <th>Name</th>
                <th>Marks</th>
              </tr>
            </thead>
            <tbody>
              {students.filter((s) => s.class === selectedClass).map((student) => (
                <tr key={student.regNo}>
                  <td>{student.regNo}</td>
                  <td>{student.name}</td>
                  <td>
                    <input
                      type="number"
                      min="0"
                      max="100"
                      value={marks[student.regNo] || ''}
                      onChange={(e) => handleMarkChange(student.regNo, e.target.value)}
                    />
                  </td>
                </tr>
              ))}
            </tbody>
          </table>

          <div className={styles.buttonGroup}>
            <button className={styles.saveBtn} onClick={handleSave}>Save Marks</button>
            <button className={styles.exportBtn} onClick={handleExport}>Export PDF</button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TeacherGradebook;