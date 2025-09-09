import React, { useState } from 'react';
import LibrarianSidebar from '../../../components/LibrarianSidebar/LibrarianSidebar';
import LibrarianHeader from '../../../components/LibrarianHeader/LibrarianHeader';
import styles from './StudentRecords.module.css';

const StudentRecords = () => {
  const [isCollapsed, setIsCollapsed] = useState(false);
  const [filters, setFilters] = useState({
    department: 'All',
    year: 'All',
    time: 'All',
  });
  const [selectedStudent, setSelectedStudent] = useState(null);

    const students = [
    {
      id: 'CS21-001',
      name: 'John Doe',
      department: 'CS',
      year: '2nd Year',
      borrowed: 5,
      returned: 4,
      fines: 1,
      history: [
        { book: 'Data Structures', status: 'Returned', fine: 0 },
        { book: 'Algorithms', status: 'Overdue', fine: 50 },
        { book: 'Operating Systems', status: 'Returned', fine: 0 },
      ],
    },
    {
      id: 'EE22-013',
      name: 'Priya Sharma',
      department: 'EE',
      year: '1st Year',
      borrowed: 3,
      returned: 3,
      fines: 0,
      history: [
        { book: 'Circuits 101', status: 'Returned', fine: 0 },
        { book: 'Electromagnetics', status: 'Returned', fine: 0 },
      ],
    },
    {
      id: 'ME20-007',
      name: 'Arjun Patel',
      department: 'ME',
      year: '3rd Year',
      borrowed: 7,
      returned: 6,
      fines: 2,
      history: [
        { book: 'Thermodynamics', status: 'Returned', fine: 0 },
        { book: 'Machine Design', status: 'Overdue', fine: 100 },
      ],
    },
    {
      id: 'CS22-015',
      name: 'Aditi Verma',
      department: 'CS',
      year: '1st Year',
      borrowed: 4,
      returned: 4,
      fines: 0,
      history: [
        { book: 'Python Basics', status: 'Returned', fine: 0 },
        { book: 'C Programming', status: 'Returned', fine: 0 },
      ],
    },
    {
      id: 'EE21-008',
      name: 'Rahul Nair',
      department: 'EE',
      year: '2nd Year',
      borrowed: 6,
      returned: 5,
      fines: 1,
      history: [
        { book: 'Digital Logic', status: 'Overdue', fine: 50 },
        { book: 'Signal Processing', status: 'Returned', fine: 0 },
      ],
    },
    {
      id: 'ME19-012',
      name: 'Sneha Reddy',
      department: 'ME',
      year: '4th Year',
      borrowed: 8,
      returned: 8,
      fines: 0,
      history: [
        { book: 'Heat Transfer', status: 'Returned', fine: 0 },
        { book: 'Robotics', status: 'Returned', fine: 0 },
      ],
    },
    {
      id: 'CS20-010',
      name: 'Kunal Mehta',
      department: 'CS',
      year: '3rd Year',
      borrowed: 9,
      returned: 8,
      fines: 1,
      history: [
        { book: 'Database Systems', status: 'Returned', fine: 0 },
        { book: 'Java Programming', status: 'Overdue', fine: 50 },
      ],
    },
    {
      id: 'EE19-005',
      name: 'Ananya Gupta',
      department: 'EE',
      year: '4th Year',
      borrowed: 10,
      returned: 9,
      fines: 1,
      history: [
        { book: 'Power Systems', status: 'Returned', fine: 0 },
        { book: 'Control Systems', status: 'Overdue', fine: 50 },
      ],
    },
    {
      id: 'ME22-002',
      name: 'Vikram Singh',
      department: 'ME',
      year: '1st Year',
      borrowed: 2,
      returned: 2,
      fines: 0,
      history: [
        { book: 'Engineering Graphics', status: 'Returned', fine: 0 },
      ],
    },
    {
      id: 'CS19-018',
      name: 'Nisha Yadav',
      department: 'CS',
      year: '4th Year',
      borrowed: 12,
      returned: 11,
      fines: 1,
      history: [
        { book: 'Cloud Computing', status: 'Returned', fine: 0 },
        { book: 'AI Advanced', status: 'Overdue', fine: 50 },
      ],
    },
  ];


  const filteredStudents = students.filter((student) => {
    const deptMatch =
      filters.department === 'All' || student.department === filters.department;
    const yearMatch = filters.year === 'All' || student.year === filters.year;
    return deptMatch && yearMatch;
  });

  return (
    <div className={styles.dashboardContainer}>
      <LibrarianSidebar
        activeItem="students"
        isCollapsed={isCollapsed}
        setIsCollapsed={setIsCollapsed}
      />
      <div
        className={`${styles.mainContent} ${
          isCollapsed ? styles.collapsed : ''
        }`}
      >
        <LibrarianHeader isCollapsed={isCollapsed} />

        <div className={styles.content}>
          {/* Filters */}
          <div className={styles.filters}>
            <select
              value={filters.department}
              onChange={(e) =>
                setFilters({ ...filters, department: e.target.value })
              }
            >
              <option value="All">All Departments</option>
              <option value="CS">CS</option>
              <option value="EE">EE</option>
              <option value="ME">ME</option>
            </select>

            <select
              value={filters.year}
              onChange={(e) =>
                setFilters({ ...filters, year: e.target.value })
              }
            >
              <option value="All">All Years</option>
              <option value="1st Year">1st Year</option>
              <option value="2nd Year">2nd Year</option>
              <option value="3rd Year">3rd Year</option>
              <option value="4th Year">4th Year</option>
            </select>

            <select
              value={filters.time}
              onChange={(e) =>
                setFilters({ ...filters, time: e.target.value })
              }
            >
              <option value="All">All Time</option>
              <option value="Week">This Week</option>
              <option value="Month">This Month</option>
            </select>
          </div>

          {/* Table Header */}
          <div className={styles.tableHeader}>
            <span>Name</span>
            <span>ID</span>
            <span>Department</span>
            <span>Year</span>
            <span>Borrowed</span>
            <span>Returned</span>
            <span>Fines</span>
            <span>Actions</span>
          </div>

          {/* Student Rows */}
          <div className={styles.tableBody}>
            {filteredStudents.map((student) => (
              <div key={student.id} className={styles.tableRow}>
                <span>{student.name}</span>
                <span>{student.id}</span>
                <span>{student.department}</span>
                <span>{student.year}</span>
                <span>{student.borrowed}</span>
                <span>{student.returned}</span>
                <span>{student.fines}</span>
                <button
                  className={styles.viewBtn}
                  onClick={() => setSelectedStudent(student)}
                >
                  View Full History
                </button>
              </div>
            ))}
          </div>

          {/* Modal Popup */}
          {selectedStudent && (
            <div className={styles.modalOverlay}>
              <div className={styles.modalContent}>
                <button
                  className={styles.closeBtn}
                  onClick={() => setSelectedStudent(null)}
                >
                  ×
                </button>
                <h2>{selectedStudent.name}</h2>
                <p>
                  <strong>ID:</strong> {selectedStudent.id}
                </p>
                <p>
                  <strong>Department:</strong> {selectedStudent.department}
                </p>
                <p>
                  <strong>Year:</strong> {selectedStudent.year}
                </p>

                <h3>Borrowing History</h3>
                <ul>
                  {selectedStudent.history.map((record, index) => (
                    <li key={index}>
                      {record.book} - {record.status} (Fine: ₹{record.fine})
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default StudentRecords;