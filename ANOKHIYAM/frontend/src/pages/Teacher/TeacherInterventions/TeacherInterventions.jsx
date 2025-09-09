import React, { useState, useEffect } from 'react';
import TeacherSidebar from '../../../components/TeacherSidebar/TeacherSidebar';
import TeacherHeader from '../../../components/TeacherHeader/TeacherHeader';
import styles from './TeacherInterventions.module.css';

const TeacherInterventions = () => {
  const [isCollapsed, setIsCollapsed] = useState(() => localStorage.getItem('teacherSidebarCollapsed') === 'true');
  useEffect(() => {
    localStorage.setItem('teacherSidebarCollapsed', isCollapsed);
  }, [isCollapsed]);

  const classes = ['II CSE-A', 'III CSE-A', 'II CSE-B'];
  const teachers = {
    Mary: ['Math', 'Physics'],
    Joseph: ['Chemistry', 'Biology'],
  };

  const students = [
    { name: 'John D', class: 'II CSE-A', marks: { Math: 35, Physics: 70 } },
    { name: 'Meera', class: 'III CSE-A', marks: { Chemistry: 40, Biology: 85 } },
    { name: 'Arjun', class: 'II CSE-B', marks: { Math: 28, Physics: 60 } },
    { name: 'Sneha', class: 'II CSE-A', marks: { Math: 80, Physics: 45 } },
    { name: 'Ravi', class: 'III CSE-A', marks: { Chemistry: 38, Biology: 42 } },
    { name: 'Divya', class: 'II CSE-B', marks: { Math: 48, Physics: 52 } },
    { name: 'Kiran', class: 'II CSE-A', marks: { Math: 42, Physics: 49 } },
    { name: 'Fatima', class: 'III CSE-A', marks: { Chemistry: 47, Biology: 50 } },
  ];

  const [formData, setFormData] = useState({
    class: '',
    teacher: '',
    subject: '',
    date: '',
    time: '',
  });

  const [selectedStudents, setSelectedStudents] = useState([]);
  const [selectAll, setSelectAll] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
    setSelectedStudents([]);
    setSelectAll(false);
  };

  const getSubjects = () => teachers[formData.teacher] || [];

  const getEligibleStudents = () => {
    if (!formData.class || !formData.subject) return [];
    return students.filter(
      s => s.class === formData.class && s.marks[formData.subject] < 50
    );
  };

  const handleStudentToggle = (studentName) => {
    setSelectedStudents(prev =>
      prev.includes(studentName)
        ? prev.filter(name => name !== studentName)
        : [...prev, studentName]
    );
    setSelectAll(false);
  };

  const handleSelectAll = () => {
    const eligible = getEligibleStudents().map(s => s.name);
    if (selectAll) {
      setSelectedStudents([]);
    } else {
      setSelectedStudents(eligible);
    }
    setSelectAll(!selectAll);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log('Scheduled Intervention:', { ...formData, selectedStudents });
    alert(`Scheduled for: ${selectedStudents.join(', ')}`);
  };

  return (
    <div className={styles.pageContainer}>
      <TeacherSidebar activeItem="interventions" isCollapsed={isCollapsed} setIsCollapsed={setIsCollapsed} />
      <div className={`${styles.mainContent} ${isCollapsed ? styles.collapsed : ''}`}>
        <TeacherHeader isCollapsed={isCollapsed} />
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

                <label>Teacher:</label>
                <select name="teacher" value={formData.teacher} onChange={handleChange}>
                  <option value="">Select Teacher</option>
                  {Object.keys(teachers).map((t, i) => <option key={i} value={t}>{t}</option>)}
                </select>

                <label>Subject:</label>
                <select name="subject" value={formData.subject} onChange={handleChange}>
                  <option value="">Select Subject</option>
                  {getSubjects().map((subj, i) => <option key={i} value={subj}>{subj}</option>)}
                </select>
              </div>

              <div className={styles.row}>
                <label>Date:</label>
                <input type="date" name="date" value={formData.date} onChange={handleChange} />

                <label>Time:</label>
                <select name="time" value={formData.time} onChange={handleChange}>
                  <option value="">Select Time</option>
                  <option value="9AM">9AM</option>
                  <option value="2PM">2PM</option>
                </select>
              </div>

              <div className={styles.studentSection}>
                <p>Students with low marks in <strong>{formData.subject}</strong>:</p>
                {getEligibleStudents().length > 0 && (
                  <label className={styles.checkboxLabel}>
                    <input
                      type="checkbox"
                      checked={selectAll}
                      onChange={handleSelectAll}
                    />
                    Select All
                  </label>
                )}
                {getEligibleStudents().length === 0 ? (
                  <p>No students found.</p>
                ) : (
                  getEligibleStudents().map((s, i) => (
                    <label key={i} className={styles.checkboxLabel}>
                      <input
                        type="checkbox"
                        checked={selectedStudents.includes(s.name)}
                        onChange={() => handleStudentToggle(s.name)}
                      />
                      {s.name} — {s.marks[formData.subject]} marks
                    </label>
                  ))
                )}
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
