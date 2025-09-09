import React, { useState } from 'react';
import HostelSidebar from '../../../components/HostelSidebar/HostelSidebar';
import HostelHeader from '../../../components/HostelHeader/HostelHeader';
import styles from './CheckInOut.module.css';

const CheckInOut = () => {
  const [isCollapsed, setIsCollapsed] = useState(false);
  const [filter, setFilter] = useState('all');
  const [searchTerm, setSearchTerm] = useState('');

  // Sample student data (replace with your API call later)
  const students = [
    { id: 1, name: 'Rahul Sharma', room: 'A-101', degree: 'B.Tech CSE', year: '3rd Year', status: 'checked-in', lastActivity: 'Today, 6:30 PM' },
    { id: 2, name: 'Priya Patel', room: 'B-205', degree: 'MBA', year: '1st Year', status: 'checked-out', lastActivity: 'Today, 2:15 PM' },
    { id: 3, name: 'Arjun Kumar', room: 'A-305', degree: 'B.Sc Physics', year: '2nd Year', status: 'checked-in', lastActivity: 'Today, 8:45 AM' },
    { id: 4, name: 'Sneha Reddy', room: 'C-152', degree: 'M.Tech ECE', year: '2nd Year', status: 'checked-out', lastActivity: 'Today, 11:20 AM' },
    { id: 5, name: 'Vikash Singh', room: 'A-203', degree: 'BCA', year: '3rd Year', status: 'checked-in', lastActivity: 'Today, 7:10 PM' },
    { id: 6, name: 'Anita Gupta', room: 'B-108', degree: 'M.Com', year: '1st Year', status: 'checked-out', lastActivity: 'Today, 1:45 PM' },
    { id: 7, name: 'Amit Verma', room: 'A-150', degree: 'B.Tech IT', year: '2nd Year', status: 'checked-in', lastActivity: 'Today, 5:20 PM' },
    { id: 8, name: 'Pooja Jain', room: 'C-201', degree: 'M.Sc Chemistry', year: '1st Year', status: 'checked-out', lastActivity: 'Today, 3:45 PM' },
  ];

  // Filter students based on status and search term
  const filteredStudents = students.filter(student => {
    const matchesFilter = filter === 'all' || student.status === filter;
    const matchesSearch = student.name.toLowerCase().includes(searchTerm.toLowerCase()) || 
                         student.room.toLowerCase().includes(searchTerm.toLowerCase());
    return matchesFilter && matchesSearch;
  });

  const handleFilterChange = (e) => {
    setFilter(e.target.value);
  };

  const handleSearchChange = (e) => {
    setSearchTerm(e.target.value);
  };

  return (
    <div className={styles.dashboardContainer}>
      <HostelSidebar 
        activeItem="check-in-out" 
        isCollapsed={isCollapsed}
        setIsCollapsed={setIsCollapsed}
      />
      <div className={`${styles.mainContent} ${isCollapsed ? styles.collapsed : ''}`}>
        <HostelHeader isCollapsed={isCollapsed} />
        <div className={styles.content}>
          <div className={styles.checkInOutContainer}>
            <div className={styles.header}>
              <h1>Student Check In/Out Management</h1>
              <p>Track student entries and exits</p>
            </div>
            
            <div className={styles.filtersSection}>
              <div className={styles.filterGroup}>
                <select 
                  className={styles.filterSelect}
                  value={filter}
                  onChange={handleFilterChange}
                >
                  <option value="all">All Students ({students.length})</option>
                  <option value="checked-in">
                    Checked In ({students.filter(s => s.status === 'checked-in').length})
                  </option>
                  <option value="checked-out">
                    Checked Out ({students.filter(s => s.status === 'checked-out').length})
                  </option>
                </select>
                
                <input 
                  type="text" 
                  placeholder="Search by name or room..." 
                  className={styles.searchInput}
                  value={searchTerm}
                  onChange={handleSearchChange}
                />
              </div>
            </div>

            <div className={styles.tableContainer}>
              <table className={styles.studentsTable}>
                <thead>
                  <tr>
                    <th>Student Name</th>
                    <th>Room Number</th>
                    <th>Degree</th>
                    <th>Year of Study</th>
                    <th>Status</th>
                    <th>Last Activity</th>
                  </tr>
                </thead>
                <tbody>
                  {filteredStudents.length > 0 ? (
                    filteredStudents.map(student => (
                      <tr key={student.id}>
                        <td>{student.name}</td>
                        <td>{student.room}</td>
                        <td>{student.degree}</td>
                        <td>{student.year}</td>
                        <td>
                          <span className={`${styles.status} ${student.status === 'checked-in' ? styles.checkedIn : styles.checkedOut}`}>
                            {student.status === 'checked-in' ? 'Checked In' : 'Checked Out'}
                          </span>
                        </td>
                        <td>{student.lastActivity}</td>
                      </tr>
                    ))
                  ) : (
                    <tr>
                      <td colSpan="6" className={styles.noResults}>
                        No students found matching your criteria
                      </td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CheckInOut;
