import React, { useState, useEffect } from 'react';
import TeacherSidebar from '../../../components/TeacherSidebar/TeacherSidebar';
import TeacherHeader from '../../../components/TeacherHeader/TeacherHeader';
import styles from './TeacherStudents.module.css';

const TeacherStudents = () => {
  const [isCollapsed, setIsCollapsed] = useState(() => {
    const saved = localStorage.getItem('teacherSidebarCollapsed');
    return saved === 'true';
  });

  useEffect(() => {
    localStorage.setItem('teacherSidebarCollapsed', isCollapsed);
  }, [isCollapsed]);

  const defaultClass = 'CSE';
  const defaultSection = 'A';

  const [students, setStudents] = useState([]);
  const [filteredStudents, setFilteredStudents] = useState([]);
  const [availableClasses, setAvailableClasses] = useState([]);
  const [availableSections, setAvailableSections] = useState([]);
  const [selectedClass, setSelectedClass] = useState(defaultClass);
  const [selectedSection, setSelectedSection] = useState(defaultSection);
  const [searchTerm, setSearchTerm] = useState('');

  useEffect(() => {
    const data = [
      { name: 'John D', regNo: '101', gender: 'Male', attendance: '95%', mobile: '9876543210', class: 'CSE', section: 'A' },
      { name: 'Meera', regNo: '102', gender: 'Female', attendance: '88%', mobile: '9123456780', class: 'CSE', section: 'A' },
      { name: 'Ravi', regNo: '107', gender: 'Male', attendance: '91%', mobile: '9876543211', class: 'CSE', section: 'A' },
      { name: 'Divya', regNo: '108', gender: 'Female', attendance: '89%', mobile: '9123456781', class: 'CSE', section: 'A' },
      { name: 'Karthik', regNo: '109', gender: 'Male', attendance: '94%', mobile: '9876543212', class: 'CSE', section: 'A' },
      { name: 'Anjali', regNo: '110', gender: 'Female', attendance: '87%', mobile: '9123456782', class: 'CSE', section: 'A' },
      { name: 'Arjun', regNo: '103', gender: 'Male', attendance: '92%', mobile: '9988776655', class: 'ADS', section: 'B' },
      { name: 'Priya', regNo: '104', gender: 'Female', attendance: '90%', mobile: '9871234567', class: 'ADS', section: 'A' },
      { name: 'Kiran', regNo: '105', gender: 'Male', attendance: '85%', mobile: '9812345678', class: 'IT', section: 'D' },
      { name: 'Sneha', regNo: '106', gender: 'Female', attendance: '93%', mobile: '9812345678', class: 'CSE', section: 'D' },
      { name: 'John D', regNo: '101', gender: 'Male', attendance: '95%', mobile: '9876543210', class: 'CSE', section: 'A' },
      { name: 'Meera', regNo: '102', gender: 'Female', attendance: '88%', mobile: '9123456780', class: 'CSE', section: 'A' },
      { name: 'Ravi', regNo: '107', gender: 'Male', attendance: '91%', mobile: '9876543211', class: 'CSE', section: 'A' },
      { name: 'Divya', regNo: '108', gender: 'Female', attendance: '89%', mobile: '9123456781', class: 'CSE', section: 'A' },
      { name: 'Karthik', regNo: '109', gender: 'Male', attendance: '94%', mobile: '9876543212', class: 'CSE', section: 'A' },
      { name: 'Anjali', regNo: '110', gender: 'Female', attendance: '87%', mobile: '9123456782', class: 'CSE', section: 'A' },
      { name: 'Arjun', regNo: '103', gender: 'Male', attendance: '92%', mobile: '9988776655', class: 'ADS', section: 'B' },
      { name: 'Priya', regNo: '104', gender: 'Female', attendance: '90%', mobile: '9871234567', class: 'ADS', section: 'A' },
      { name: 'Kiran', regNo: '105', gender: 'Male', attendance: '85%', mobile: '9812345678', class: 'IT', section: 'D' },
      { name: 'Sneha', regNo: '106', gender: 'Female', attendance: '93%', mobile: '9812345678', class: 'CSE', section: 'D' },
    
    ];
    setStudents(data);
    const defaultFiltered = data.filter(s => s.class === defaultClass && s.section === defaultSection).slice(0, 6);
    setFilteredStudents(defaultFiltered);

    const classes = [...new Set(data.map(s => s.class))];
    setAvailableClasses(classes);
  }, []);

  useEffect(() => {
    if (selectedClass) {
      const sections = [...new Set(students.filter(s => s.class === selectedClass).map(s => s.section))];
      setAvailableSections(sections);
    } else {
      setAvailableSections([]);
    }
  }, [selectedClass, students]);

  const handleSearch = () => {
    const filtered = students.filter(student => {
      const matchClass = selectedClass ? student.class === selectedClass : true;
      const matchSection = selectedSection ? student.section === selectedSection : true;
      const matchSearch = searchTerm
        ? student.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
          student.regNo.includes(searchTerm)
        : true;
      return matchClass && matchSection && matchSearch;
    });
    setFilteredStudents(filtered.slice(0, 6));
  };

  return (
    <div className={styles.pageContainer}>
      <TeacherSidebar
        activeItem="students"
        isCollapsed={isCollapsed}
        setIsCollapsed={setIsCollapsed}
      />
      <div className={`${styles.mainContent} ${isCollapsed ? styles.collapsed : ''}`}>
        <TeacherHeader isCollapsed={isCollapsed} />
        <div className={styles.content}>
          <div className={styles.pageHeader}>
            <h1 className={styles.pageTitle}>My Students</h1>
            <p className={styles.pageSubtitle}>Manage and view your student profiles</p>
          </div>
          <div className={styles.contentArea}>
            {/* Filters */}
            <div style={{ display: 'flex', gap: '1rem', marginBottom: '1.5rem', flexWrap: 'wrap' }}>
              <select value={selectedClass} onChange={e => setSelectedClass(e.target.value)}>
                <option value="">Select Class</option>
                {availableClasses.map(cls => (
                  <option key={cls} value={cls}>{cls}</option>
                ))}
              </select>

              <select value={selectedSection} onChange={e => setSelectedSection(e.target.value)} disabled={!selectedClass}>
                <option value="">Select Section</option>
                {availableSections.map(sec => (
                  <option key={sec} value={sec}>Section {sec}</option>
                ))}
              </select>

              <input
                type="text"
                placeholder="Search by name or reg no"
                value={searchTerm}
                onChange={e => setSearchTerm(e.target.value)}
              />

              <button onClick={handleSearch}>Search</button>
            </div>

            {/* Student Table */}
            <table style={{ width: '100%', borderCollapse: 'collapse' }}>
              <thead>
                <tr style={{ backgroundColor: '#f1f5f9' }}>
                  <th style={thStyle}>Name</th>
                  <th style={thStyle}>Register No</th>
                  <th style={thStyle}>Gender</th>
                  <th style={thStyle}>Attendance</th>
                  <th style={thStyle}>Mobile No</th>
                  <th style={thStyle}>Class</th>
                  <th style={thStyle}>Section</th>
                </tr>
              </thead>
              <tbody>
                {filteredStudents.length > 0 ? (
                  filteredStudents.map((student, index) => (
                    <tr key={index}>
                      <td style={tdStyle}>{student.name}</td>
                      <td style={tdStyle}>{student.regNo}</td>
                      <td style={tdStyle}>{student.gender}</td>
                      <td style={tdStyle}>{student.attendance}</td>
                      <td style={tdStyle}>{student.mobile}</td>
                      <td style={tdStyle}>{student.class}</td>
                      <td style={tdStyle}>{student.section}</td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td style={tdStyle} colSpan="7">No students found.</td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
};

const thStyle = {
  padding: '12px',
  textAlign: 'left',
  fontWeight: '600',
  color: '#374151',
  borderBottom: '1px solid #e5e7eb',
};

const tdStyle = {
  padding: '12px',
  borderBottom: '1px solid #f3f4f6',
  color: '#4b5563',
};

export default TeacherStudents;
