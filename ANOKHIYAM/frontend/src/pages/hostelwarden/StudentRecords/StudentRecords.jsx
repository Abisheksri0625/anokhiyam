import React, { useState } from 'react';
import HostelSidebar from '../../../components/HostelSidebar/HostelSidebar';
import HostelHeader from '../../../components/HostelHeader/HostelHeader';
import styles from './StudentRecords.module.css';

const StudentRecords = () => {
  const [isCollapsed, setIsCollapsed] = useState(false);
  const [selectedStudent, setSelectedStudent] = useState(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [degreeFilter, setDegreeFilter] = useState('');
  const [yearFilter, setYearFilter] = useState('');

  // Mock student data
  const students = [
    {
      id: 1,
      name: "Arjun Kumar",
      roomNumber: "A-201",
      degree: "B.Tech Computer Science",
      yearOfStudy: "3rd Year",
      phone: "+91 9876543210",
      email: "arjun.kumar@college.edu",
      guardianName: "Suresh Kumar",
      guardianPhone: "+91 9876543200",
      address: "123 MG Road, Chennai, Tamil Nadu",
      outpassHistory: [
        { month: "January", count: 3 },
        { month: "February", count: 2 },
        { month: "March", count: 4 }
      ],
      feesStatus: "Paid",
      joiningDate: "2022-08-15"
    },
    {
      id: 2,
      name: "Priya Sharma",
      roomNumber: "B-105",
      degree: "B.Tech Electronics",
      yearOfStudy: "2nd Year",
      phone: "+91 9876543211",
      email: "priya.sharma@college.edu",
      guardianName: "Rajesh Sharma",
      guardianPhone: "+91 9876543201",
      address: "456 Anna Salai, Coimbatore, Tamil Nadu",
      outpassHistory: [
        { month: "January", count: 2 },
        { month: "February", count: 1 },
        { month: "March", count: 3 }
      ],
      feesStatus: "Pending",
      joiningDate: "2023-08-20"
    },
    {
      id: 3,
      name: "Mohammed Ali",
      roomNumber: "C-302",
      degree: "B.Tech Mechanical",
      yearOfStudy: "4th Year",
      phone: "+91 9876543212",
      email: "mohammed.ali@college.edu",
      guardianName: "Abdul Ali",
      guardianPhone: "+91 9876543202",
      address: "789 Nehru Street, Madurai, Tamil Nadu",
      outpassHistory: [
        { month: "January", count: 1 },
        { month: "February", count: 2 },
        { month: "March", count: 2 }
      ],
      feesStatus: "Paid",
      joiningDate: "2021-08-10"
    },
    {
      id: 4,
      name: "Sneha Patel",
      roomNumber: "A-150",
      degree: "B.Tech Civil",
      yearOfStudy: "1st Year",
      phone: "+91 9876543213",
      email: "sneha.patel@college.edu",
      guardianName: "Ramesh Patel",
      guardianPhone: "+91 9876543203",
      address: "321 Gandhi Road, Salem, Tamil Nadu",
      outpassHistory: [
        { month: "January", count: 4 },
        { month: "February", count: 3 },
        { month: "March", count: 5 }
      ],
      feesStatus: "Overdue",
      joiningDate: "2024-08-25"
    },
    {
      id: 5,
      name: "Rahul Reddy",
      roomNumber: "B-220",
      degree: "B.Tech Information Technology",
      yearOfStudy: "3rd Year",
      phone: "+91 9876543214",
      email: "rahul.reddy@college.edu",
      guardianName: "Venkat Reddy",
      guardianPhone: "+91 9876543204",
      address: "654 Poonamallee Road, Chennai, Tamil Nadu",
      outpassHistory: [
        { month: "January", count: 2 },
        { month: "February", count: 2 },
        { month: "March", count: 1 }
      ],
      feesStatus: "Paid",
      joiningDate: "2022-08-18"
    }
  ];

  // Filtering logic
  const filteredStudents = students.filter(student => {
    const matchesSearch =
      student.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      student.roomNumber.toLowerCase().includes(searchTerm.toLowerCase()) ||
      student.degree.toLowerCase().includes(searchTerm.toLowerCase());

    const matchesDegree = degreeFilter ? student.degree === degreeFilter : true;
    const matchesYear = yearFilter ? student.yearOfStudy === yearFilter : true;

    return matchesSearch && matchesDegree && matchesYear;
  });

  const handleStudentClick = (student) => {
    setSelectedStudent(student);
  };

  const handleCloseDetails = () => {
    setSelectedStudent(null);
  };

  return (
    <div className={styles.dashboardContainer}>
      <HostelSidebar 
        activeItem="students"
        isCollapsed={isCollapsed}
        setIsCollapsed={setIsCollapsed}
      />
      <div className={`${styles.mainContent} ${isCollapsed ? styles.collapsed : ''}`}>
        <HostelHeader isCollapsed={isCollapsed} />
        <div className={styles.content}>
          <div className={styles.studentsContainer}>
            <div className={styles.header}>
              <h1>Student Records</h1>
              <div className={styles.searchAndFiltersContainer}>
                <div className={styles.searchContainer}>
                  <input
                    type="text"
                    placeholder="Search students..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className={styles.searchInput}
                  />
                </div>

                <div className={styles.filtersGroup}>
                  <div className={styles.filterContainer}>
                    <select
                      value={degreeFilter}
                      onChange={(e) => setDegreeFilter(e.target.value)}
                      className={styles.filterSelect}
                    >
                      <option value="">All Degrees</option>
                      {[...new Set(students.map(s => s.degree))].map((deg, i) => (
                        <option key={i} value={deg}>{deg}</option>
                      ))}
                    </select>
                  </div>

                  <div className={styles.filterContainer}>
                    <select
                      value={yearFilter}
                      onChange={(e) => setYearFilter(e.target.value)}
                      className={styles.filterSelect}
                    >
                      <option value="">All Years</option>
                      {[...new Set(students.map(s => s.yearOfStudy))].map((yr, i) => (
                        <option key={i} value={yr}>{yr}</option>
                      ))}
                    </select>
                  </div>
                </div>
              </div>
            </div>
            
            <div className={styles.studentsTable}>
              <div className={styles.tableHeader}>
                <div className={styles.headerCell}>Name</div>
                <div className={styles.headerCell}>Room</div>
                <div className={styles.headerCell}>Degree</div>
                <div className={styles.headerCell}>Year</div>
                <div className={styles.headerCell}>Fees Status</div>
              </div>
              
              <div className={styles.tableBody}>
                {filteredStudents.length === 0 ? (
                  <div className={styles.noResults}>
                    <p>No students found matching the current filters.</p>
                  </div>
                ) : (
                  filteredStudents.map(student => (
                    <div
                      key={student.id}
                      className={styles.tableRow}
                      onClick={() => handleStudentClick(student)}
                    >
                      <div className={styles.cell}>{student.name}</div>
                      <div className={styles.cell}>{student.roomNumber}</div>
                      <div className={styles.cell}>{student.degree}</div>
                      <div className={styles.cell}>{student.yearOfStudy}</div>
                      <div className={`${styles.cell} ${styles.feesStatus} ${styles[student.feesStatus.toLowerCase()]}`}>
                        {student.feesStatus}
                      </div>
                    </div>
                  ))
                )}
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Student Details Modal */}
      {selectedStudent && (
        <div className={styles.modalOverlay} onClick={handleCloseDetails}>
          <div className={styles.modalContent} onClick={(e) => e.stopPropagation()}>
            <div className={styles.modalHeader}>
              <h2>Student Details</h2>
              <button className={styles.closeButton} onClick={handleCloseDetails}>×</button>
            </div>
            
            <div className={styles.modalBody}>
              <div className={styles.detailsSection}>
                <h3>Basic Information</h3>
                <div className={styles.detailsGrid}>
                  <div className={styles.detailItem}>
                    <span className={styles.label}>Name:</span>
                    <span className={styles.value}>{selectedStudent.name}</span>
                  </div>
                  <div className={styles.detailItem}>
                    <span className={styles.label}>Room Number:</span>
                    <span className={styles.value}>{selectedStudent.roomNumber}</span>
                  </div>
                  <div className={styles.detailItem}>
                    <span className={styles.label}>Degree:</span>
                    <span className={styles.value}>{selectedStudent.degree}</span>
                  </div>
                  <div className={styles.detailItem}>
                    <span className={styles.label}>Year of Study:</span>
                    <span className={styles.value}>{selectedStudent.yearOfStudy}</span>
                  </div>
                  <div className={styles.detailItem}>
                    <span className={styles.label}>Phone:</span>
                    <span className={styles.value}>{selectedStudent.phone}</span>
                  </div>
                  <div className={styles.detailItem}>
                    <span className={styles.label}>Email:</span>
                    <span className={styles.value}>{selectedStudent.email}</span>
                  </div>
                  <div className={styles.detailItem}>
                    <span className={styles.label}>Guardian Name:</span>
                    <span className={styles.value}>{selectedStudent.guardianName}</span>
                  </div>
                  <div className={styles.detailItem}>
                    <span className={styles.label}>Guardian Phone:</span>
                    <span className={styles.value}>{selectedStudent.guardianPhone}</span>
                  </div>
                  <div className={styles.detailItem}>
                    <span className={styles.label}>Address:</span>
                    <span className={styles.value}>{selectedStudent.address}</span>
                  </div>
                  <div className={styles.detailItem}>
                    <span className={styles.label}>Joining Date:</span>
                    <span className={styles.value}>{selectedStudent.joiningDate}</span>
                  </div>
                </div>
              </div>

              <div className={styles.detailsSection}>
                <h3>Outpass History (Monthly)</h3>
                <div className={styles.outpassHistory}>
                  {selectedStudent.outpassHistory.map((record, index) => (
                    <div key={index} className={styles.outpassRecord}>
                      <span className={styles.month}>{record.month}:</span>
                      <span className={styles.count}>{record.count} times</span>
                    </div>
                  ))}
                </div>
              </div>

              <div className={styles.detailsSection}>
                <h3>Fees Status</h3>
                <div className={`${styles.feesStatusBadge} ${styles[selectedStudent.feesStatus.toLowerCase()]}`}>
                  {selectedStudent.feesStatus}
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default StudentRecords;
