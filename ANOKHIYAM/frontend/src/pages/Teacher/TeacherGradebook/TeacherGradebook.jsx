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
    } catch (error) {
      console.error('Error fetching students:', error);
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
      console.error('Error fetching student grades:', error);
    }
  };

  const handleStudentChange = (studentId) => {
    setSelectedStudent(studentId);
    if (studentId) {
      fetchStudentGrades(studentId);
    } else {
      setMarks(subjects.reduce((acc, subject) => ({ ...acc, [subject]: '' }), {}));
    }
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
      alert('✅ Grades saved successfully!');

    } catch (error) {
      console.error('Error saving grades:', error);
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
    const percentage = ((totalMarks / maxMarks) * 100).toFixed(2);

    y += 10;
    doc.setFontSize(12);
    doc.text(`Total Marks: ${totalMarks}/${maxMarks}`, 20, y);
    doc.text(`Percentage: ${percentage}%`, 20, y + 8);

    doc.save(`${student.firstName}_${student.lastName}_Gradebook.pdf`);
  };

  const selectedStudentData = students.find(s => s.id === selectedStudent);

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
            <h1 className={styles.pageTitle}>Student Gradebook</h1>
            <p className={styles.pageSubtitle}>Upload and manage student grades</p>
          </div>

          <div className={styles.contentArea}>
            {loading ? (
              <div className={styles.loading}>
                <p>Loading students...</p>
              </div>
            ) : (
              <>
                <div className={styles.formGroup}>
                  <label><strong>Select Student:</strong></label>
                  <select 
                    value={selectedStudent} 
                    onChange={e => handleStudentChange(e.target.value)}
                    className={styles.studentSelect}
                  >
                    <option value="">-- Select Student --</option>
                    {students.map(student => (
                      <option key={student.id} value={student.id}>
                        {student.firstName} {student.lastName} ({student.acceptedStudentId})
                      </option>
                    ))}
                  </select>
                </div>

                {selectedStudentData && (
                  <div className={styles.studentInfo}>
                    <h3>Student Information</h3>
                    <div className={styles.studentDetails}>
                      <p><strong>Name:</strong> {selectedStudentData.firstName} {selectedStudentData.lastName}</p>
                      <p><strong>Roll Number:</strong> {selectedStudentData.acceptedStudentId}</p>
                      <p><strong>Email:</strong> {selectedStudentData.loginEmail}</p>
                    </div>
                  </div>
                )}

                {selectedStudent && (
                  <>
                    <div className={styles.gradesSection}>
                      <h3>Subject-wise Marks</h3>
                      <table className={styles.marksTable}>
                        <thead>
                          <tr>
                            <th>Subject</th>
                            <th>Marks (Out of 100)</th>
                            <th>Grade</th>
                          </tr>
                        </thead>
                        <tbody>
                          {subjects.map((subject, idx) => {
                            const mark = Number(marks[subject]) || 0;
                            const grade = mark >= 90 ? 'A+' : mark >= 80 ? 'A' : mark >= 70 ? 'B+' : mark >= 60 ? 'B' : mark >= 50 ? 'C' : 'F';
                            return (
                              <tr key={idx}>
                                <td><strong>{subject}</strong></td>
                                <td>
                                  <input
                                    type="number"
                                    min="0"
                                    max="100"
                                    value={marks[subject]}
                                    onChange={e => handleMarkChange(subject, e.target.value)}
                                    className={styles.markInput}
                                    placeholder="Enter marks"
                                  />
                                </td>
                                <td>
                                  <span className={`${styles.grade} ${styles[grade.replace('+', 'Plus')]}`}>
                                    {mark > 0 ? grade : '-'}
                                  </span>
                                </td>
                              </tr>
                            );
                          })}
                        </tbody>
                      </table>
                    </div>

                    <div className={styles.gradeSummary}>
                      <h4>Grade Summary</h4>
                      <div className={styles.summaryCards}>
                        <div className={styles.summaryCard}>
                          <h5>Total Marks</h5>
                          <p>{Object.values(marks).reduce((sum, mark) => sum + (Number(mark) || 0), 0)} / {subjects.length * 100}</p>
                        </div>
                        <div className={styles.summaryCard}>
                          <h5>Percentage</h5>
                          <p>{((Object.values(marks).reduce((sum, mark) => sum + (Number(mark) || 0), 0) / (subjects.length * 100)) * 100).toFixed(2)}%</p>
                        </div>
                        <div className={styles.summaryCard}>
                          <h5>Overall Grade</h5>
                          <p>
                            {(() => {
                              const percentage = (Object.values(marks).reduce((sum, mark) => sum + (Number(mark) || 0), 0) / (subjects.length * 100)) * 100;
                              return percentage >= 90 ? 'A+' : percentage >= 80 ? 'A' : percentage >= 70 ? 'B+' : percentage >= 60 ? 'B' : percentage >= 50 ? 'C' : 'F';
                            })()}
                          </p>
                        </div>
                      </div>
                    </div>

                    <div className={styles.buttonGroup}>
                      <button 
                        onClick={handleSave} 
                        className={styles.saveBtn}
                        disabled={saving}
                      >
                        {saving ? 'Saving...' : '💾 Save Grades'}
                      </button>
                      <button onClick={handleExport} className={styles.exportBtn}>
                        📄 Export PDF
                      </button>
                    </div>
                  </>
                )}
              </>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default TeacherGradebook;