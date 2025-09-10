import React, { useState, useEffect } from 'react';
import { jsPDF } from 'jspdf';
import { db } from '../../../config/firebase';
import { 
  collection, 
  getDocs, 
  doc, 
  setDoc, 
  query, 
  where 
} from 'firebase/firestore';
import TeacherSidebar from '../../../components/TeacherSidebar/TeacherSidebar';
import TeacherHeader from '../../../components/TeacherHeader/TeacherHeader';
import styles from './TeacherGradebook.module.css';
import { FloppyDisk, FilePdf } from 'phosphor-react';

const subjects = ['Mathematics', 'Physics', 'Chemistry', 'Computer Science', 'English'];

const TeacherGradebook = () => {
  const [isCollapsed, setIsCollapsed] = useState(() => {
    const saved = localStorage.getItem('teacherSidebarCollapsed');
    return saved === 'true';
  });

  const [students, setStudents] = useState([]);
  const [selectedStudent, setSelectedStudent] = useState('');
  const [marks, setMarks] = useState(() =>
    subjects.reduce((acc, subject) => ({ ...acc, [subject]: '' }), {})
  );
  const [loading, setLoading] = useState(false);
  const [saving, setSaving] = useState(false);

  useEffect(() => {
    localStorage.setItem('teacherSidebarCollapsed', isCollapsed);
  }, [isCollapsed]);

  useEffect(() => {
    fetchAllStudents();
  }, []);

  const fetchAllStudents = async () => {
    try {
      setLoading(true);
      const studentsRef = collection(db, 'student_credentials');
      const snapshot = await getDocs(studentsRef);
      const studentData = snapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data()
      }));
      setStudents(studentData);
    } catch {
      alert('Error fetching students. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  const fetchStudentGrades = async (studentId) => {
    try {
      const gradesRef = collection(db, 'student_grades');
      const q = query(gradesRef, where('studentId', '==', studentId));
      const snapshot = await getDocs(q);
      if (!snapshot.empty) {
        const gradeData = snapshot.docs[0].data();
        setMarks(gradeData.subjects || subjects.reduce((acc, subject) => ({ ...acc, [subject]: '' }), {}));
      } else {
        setMarks(subjects.reduce((acc, subject) => ({ ...acc, [subject]: '' }), {}));
      }
    } catch (error) {
      console.error('Error fetching grades:', error);
    }
  };

  const handleStudentChange = (studentId) => {
    setSelectedStudent(studentId);
    if (studentId) fetchStudentGrades(studentId);
    else setMarks(subjects.reduce((acc, subject) => ({ ...acc, [subject]: '' }), {}));
  };

  const handleMarkChange = (subject, value) => {
    const numeric = Math.max(0, Math.min(100, Number(value) || 0));
    setMarks(prev => ({ ...prev, [subject]: numeric }));
  };

  const handleSave = async () => {
    if (!selectedStudent) {
      alert('Please select a student first.');
      return;
    }
    const student = students.find(s => s.id === selectedStudent);
    if (!student) {
      alert('Student not found.');
      return;
    }
    setSaving(true);
    try {
      const gradeData = {
        studentId: selectedStudent,
        studentName: `${student.firstName} ${student.lastName}`,
        rollNumber: student.acceptedStudentId,
        email: student.loginEmail,
        subjects: marks,
        updatedAt: new Date().toISOString(),
        updatedBy: 'teacher'
      };
      const docId = `grades_${selectedStudent}`;
      await setDoc(doc(db, 'student_grades', docId), gradeData);
      alert('Grades saved successfully!');
    } catch {
      alert('Error saving grades. Please try again.');
    } finally {
      setSaving(false);
    }
  };

  const handleExport = () => {
    if (!selectedStudent) {
      alert('Please select a student first.');
      return;
    }
    const student = students.find(s => s.id === selectedStudent);
    const doc = new jsPDF();

    doc.setFontSize(16);
    doc.text('Student Gradebook Report', 20, 20);
    doc.setFontSize(12);
    doc.text(`Student: ${student.firstName} ${student.lastName}`, 20, 35);
    doc.text(`Roll No: ${student.acceptedStudentId}`, 20, 42);
    doc.text(`Email: ${student.loginEmail}`, 20, 49);
    doc.text(`Generated: ${new Date().toLocaleString()}`, 20, 56);

    let y = 70;
    doc.setFontSize(14);
    doc.text('Subject-wise Marks:', 20, y);
    y += 10;

    doc.setFontSize(11);
    subjects.forEach(subject => {
      const mark = marks[subject] || 'Not Assigned';
      doc.text(`${subject}: ${mark}`, 25, y);
      y += 8;
    });

    const totalMarks = Object.values(marks).reduce((sum, mark) => sum + (Number(mark) || 0), 0);
    const maxMarks = subjects.length * 100;
    const percentage = (totalMarks / maxMarks) * 100;

    y += 10;
    doc.setFontSize(12);
    doc.text(`Total Marks: ${totalMarks} / ${maxMarks}`, 20, y);
    doc.text(`Percentage: ${percentage.toFixed(2)} %`, 20, y + 8);

    doc.save(`${student.firstName}_${student.lastName}_gradebook.pdf`);
  };

  const selectedStudentData = students.find(s => s.id === selectedStudent);

  return (
    <div className={styles.pageContainer}>
      <TeacherSidebar isCollapsed={isCollapsed} setIsCollapsed={setIsCollapsed} />
      <div className={`${styles.mainContent} ${isCollapsed ? styles.collapsed : ''}`}>
        <TeacherHeader isCollapsed={isCollapsed} />
        <div className={styles.content}>
          <div className={styles.pageHeader}>
            <h1>Student Gradebook</h1>
            <p>Upload and manage student grades</p>
          </div>

          <div className={styles.contentArea}>
            <div className={styles.formGroup}>
              <label htmlFor="studentSelect">Select Student:</label>
              <select
                id="studentSelect"
                value={selectedStudent}
                onChange={(e) => handleStudentChange(e.target.value)}
                className={styles.studentSelect}
              >
                <option value="">-- Select Student --</option>
                {students.map((student) => (
                  <option key={student.id} value={student.id}>
                    {student.firstName} {student.lastName} ({student.acceptedStudentId})
                  </option>
                ))}
              </select>
            </div>

            {selectedStudentData && (
              <div className={styles.studentInfo}>
                <div className={styles.detailsItem}>
                  <strong>Name:</strong> {selectedStudentData.firstName} {selectedStudentData.lastName}
                </div>
                <div className={styles.detailsItem}>
                  <strong>Roll Number:</strong> {selectedStudentData.acceptedStudentId}
                </div>
                <div className={styles.detailsItem}>
                  <strong>Email:</strong> {selectedStudentData.email || selectedStudentData.loginEmail}
                </div>
              </div>
            )}

            {selectedStudent && (
              <>
                <div className={styles.gradesSection}>
                  <h2>Subject-wise Marks:</h2>
                  <table className={styles.marksTable}>
                    <thead>
                      <tr>
                        <th>Subject</th>
                        <th>Marks (Out of 100)</th>
                        <th>Grade</th>
                      </tr>
                    </thead>
                    <tbody>
                      {subjects.map((subject) => {
                        const mark = marks[subject] || '';
                        let grade = '-';
                        if (mark !== '') {
                          const score = Number(mark);
                          if (score >= 90) grade = 'A+';
                          else if (score >= 80) grade = 'A';
                          else if (score >= 70) grade = 'B+';
                          else if (score >= 60) grade = 'B';
                          else if (score >= 50) grade = 'C';
                          else grade = 'F';
                        }
                        return (
                          <tr key={subject}>
                            <td>{subject}</td>
                            <td>
                              <input
                                type="number"
                                min="0"
                                max="100"
                                value={mark}
                                placeholder="Enter"
                                className={styles.markInput}
                                onChange={(e) => handleMarkChange(subject, e.target.value)}
                              />
                            </td>
                            <td>
                              <span className={`${styles.grade} ${styles[grade.replace('+', 'Plus')]}`}>
                                {grade}
                              </span>
                            </td>
                          </tr>
                        );
                      })}
                    </tbody>
                  </table>
                </div>

                <div className={styles.gradeSummary}>
                  <h3>Grade Summary:</h3>
                  <div className={styles.summaryCards}>
                    <div className={styles.summaryCard}>
                      <p>Total Marks</p>
                      <h4>{Object.values(marks).reduce((acc, cur) => acc + (Number(cur) || 0), 0)} / 500</h4>
                    </div>
                    <div className={styles.summaryCard}>
                      <p>Percentage</p>
                      <h4>{((Object.values(marks).reduce((acc, cur) => acc + (Number(cur) || 0), 0) / 500) * 100).toFixed(2)}%</h4>
                    </div>
                    <div className={styles.summaryCard}>
                      <p>Overall Grade</p>
                      <h4>
                        {(() => {
                          const total = Object.values(marks).reduce((acc, cur) => acc + (Number(cur) || 0), 0);
                          const pct = (total / 500) * 100;
                          if (pct >= 90) return 'A+';
                          if (pct >= 80) return 'A';
                          if (pct >= 70) return 'B+';
                          if (pct >= 60) return 'B';
                          if (pct >= 50) return 'C';
                          return 'F';
                        })()}
                      </h4>
                    </div>
                  </div>
                </div>

                <div className={styles.buttonGroup}>
                  <button 
                    onClick={handleSave} 
                    disabled={saving} 
                    className={styles.saveBtn}
                    aria-label="Save grades"
                  >
                    <FloppyDisk size={20} weight="bold" />
                    {saving ? 'Saving...' : 'Save Grades'}
                  </button>
                  <button onClick={handleExport} className={styles.exportBtn} aria-label="Export PDF">
                    <FilePdf size={20} weight="bold" />
                    Export PDF
                  </button>
                </div>
              </>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default TeacherGradebook;
