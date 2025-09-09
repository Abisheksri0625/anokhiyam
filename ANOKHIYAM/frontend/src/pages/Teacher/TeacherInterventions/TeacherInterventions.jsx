import React, { useState, useEffect } from 'react';
import TeacherSidebar from '../../../components/TeacherSidebar/TeacherSidebar';
import TeacherHeader from '../../../components/TeacherHeader/TeacherHeader';
import styles from './TeacherInterventions.module.css';

const TeacherInterventions = () => {
  const [isCollapsed, setIsCollapsed] = useState(() => localStorage.getItem('teacherSidebarCollapsed') === 'true');
  useEffect(() => {
    localStorage.setItem('teacherSidebarCollapsed', isCollapsed);
  }, [isCollapsed]);

  const classes = ['II CSE', 'III CSE'];
  const sections = ['A', 'B'];
  const subjects = ['Digital Image', 'Data Structures', 'Data Science', 'Discrete Maths', 'Operating System'];

  const students = [
    { name: 'John Doe', regNo: '101', class: 'II CSE', section: 'A', marks: { 'Digital Image': 38, 'Data Structures': 55 } },
    { name: 'Priya S', regNo: '102', class: 'II CSE', section: 'A', marks: { 'Digital Image': 42, 'Data Structures': 48 } },
    { name: 'Akash M', regNo: '103', class: 'II CSE', section: 'B', marks: { 'Digital Image': 40, 'Data Structures': 60 } },
    { name: 'Meera', regNo: '104', class: 'III CSE', section: 'A', marks: { 'Data Science': 44, 'Discrete Maths': 50 } },
    { name: 'Ravi', regNo: '105', class: 'III CSE', section: 'A', marks: { 'Data Science': 38, 'Discrete Maths': 42 } },
    { name: 'Divya', regNo: '106', class: 'II CSE', section: 'B', marks: { 'Digital Image': 48, 'Data Structures': 52 } },
  ];

  const [formData, setFormData] = useState({
    class: '',
    section: '',
    subject: '',
    date: '',
    time: '',
  });

  const [showPopup, setShowPopup] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
    setShowPopup(false);
  };

  const getEligibleStudents = () => {
    const { class: cls, section, subject } = formData;
    if (!cls || !section || !subject) return [];
    return students.filter(
      s => s.class === cls && s.section === section && s.marks[subject] < 45
    );
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (getEligibleStudents().length === 0) {
      alert('No eligible students found.');
      return;
    }
    setShowPopup(true);
    setTimeout(() => setShowPopup(false), 4000);
  };

  return (
    <div className={styles.pageContainer}>
      <TeacherSidebar activeItem="interventions" isCollapsed={isCollapsed} setIsCollapsed={setIsCollapsed} />
      <div className={`${styles.mainContent} ${isCollapsed ? styles.collapsed : ''}`}>
        <TeacherHeader isCollapsed={isCollapsed} />

        {showPopup && (
          <div style={{
            position: 'fixed',
            top: '20px',
            left: '50%',
            transform: 'translateX(-50%)',
            backgroundColor: '#10b981',
            color: 'white',
            padding: '1rem 2rem',
            borderRadius: '8px',
            boxShadow: '0 4px 12px rgba(0,0,0,0.15)',
            zIndex: 9999,
            fontWeight: '600',
            animation: 'fadeInOut 4s ease forwards'
          }}>
            ✅ Message Sent to Students Successfully
          </div>
        )}

        <div className={styles.content}>
          <div className={styles.pageHeader}>
            <h1 className={styles.pageTitle}>Interventions</h1>
            <p className={styles.pageSubtitle}>Schedule extra classes for students needing support</p>
          </div>

          <div className={styles.contentArea}>
            <form className={styles.formContainer} onSubmit={handleSubmit}>
              <div className={styles.row}>
                <label>Class:</label>
                <select name="class" value={formData.class} onChange={handleChange}>
                  <option value="">Select Class</option>
                  {classes.map((cls, i) => <option key={i} value={cls}>{cls}</option>)}
                </select>

                <label>Section:</label>
                <select name="section" value={formData.section} onChange={handleChange}>
                  <option value="">Select Section</option>
                  {sections.map((sec, i) => <option key={i} value={sec}>{sec}</option>)}
                </select>

                <label>Subject:</label>
                <select name="subject" value={formData.subject} onChange={handleChange}>
                  <option value="">Select Subject</option>
                  {subjects.map((subj, i) => <option key={i} value={subj}>{subj}</option>)}
                </select>
              </div>

              {formData.subject && (
                <>
                  <h3 style={{ marginTop: '1rem' }}>
                    Students Below 45 in <strong>{formData.subject}</strong>
                  </h3>
                  <table style={{
                    width: '100%',
                    marginTop: '1rem',
                    borderCollapse: 'collapse',
                    border: '1px solid #e5e7eb'
                  }}>
                    <thead>
                      <tr style={{ background: '#f3f4f6' }}>
                        <th style={{ padding: '0.75rem', border: '1px solid #e5e7eb' }}>S.No</th>
                        <th style={{ padding: '0.75rem', border: '1px solid #e5e7eb' }}>Student Name</th>
                        <th style={{ padding: '0.75rem', border: '1px solid #e5e7eb' }}>Register No.</th>
                        <th style={{ padding: '0.75rem', border: '1px solid #e5e7eb' }}>Marks</th>
                      </tr>
                    </thead>
                    <tbody>
                      {getEligibleStudents().length === 0 ? (
                        <tr>
                          <td colSpan="4" style={{ padding: '1rem', textAlign: 'center' }}>No students found.</td>
                        </tr>
                      ) : (
                        getEligibleStudents().map((s, i) => (
                          <tr key={i}>
                            <td style={{ padding: '0.75rem', border: '1px solid #e5e7eb' }}>{i + 1}</td>
                            <td style={{ padding: '0.75rem', border: '1px solid #e5e7eb' }}>{s.name}</td>
                            <td style={{ padding: '0.75rem', border: '1px solid #e5e7eb' }}>{s.regNo}</td>
                            <td style={{ padding: '0.75rem', border: '1px solid #e5e7eb' }}>{s.marks[formData.subject]}</td>
                          </tr>
                        ))
                      )}
                    </tbody>
                  </table>
                </>
              )}

              <div className={styles.row} style={{ marginTop: '2rem' }}>
                <label>Date:</label>
                <input type="date" name="date" value={formData.date} onChange={handleChange} />

                <label>Time:</label>
                <input type="time" name="time" value={formData.time} onChange={handleChange} />
              </div>

              <button type="submit" className={styles.submitButton}>Schedule Extra Class</button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TeacherInterventions;