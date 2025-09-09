import React, { useState } from 'react';
import LibrarianSidebar from '../../../components/LibrarianSidebar/LibrarianSidebar';
import LibrarianHeader from '../../../components/LibrarianHeader/LibrarianHeader';
import styles from './OverdueBooks.module.css';

const OverdueBooks = () => {
  const [isCollapsed, setIsCollapsed] = useState(false);
  const [selectedRecord, setSelectedRecord] = useState(null);

  // Dummy data
  const overdueRecords = [
    {
      id: 'STU001',
      name: 'John Smith',
      department: 'Computer Science',
      dueDate: '2025-08-20',
      daysPast: 15,
      fine: 300,
      books: [
        { title: 'Data Structures & Algorithms', borrowedOn: '2025-07-10' },
        { title: 'Operating Systems', borrowedOn: '2025-07-12' }
      ],
    },
    {
      id: 'STU002',
      name: 'Sarah Johnson',
      department: 'Electrical Engineering',
      dueDate: '2025-08-28',
      daysPast: 7,
      fine: 140,
      books: [
        { title: 'Circuit Analysis', borrowedOn: '2025-07-20' }
      ],
    },
    {
      id: 'STU003',
      name: 'Amit Kumar',
      department: 'Mechanical Engineering',
      dueDate: '2025-08-15',
      daysPast: 20,
      fine: 500,
      books: [
        { title: 'Thermodynamics', borrowedOn: '2025-07-05' },
        { title: 'Fluid Mechanics', borrowedOn: '2025-07-08' }
      ],
    },
  ];

  return (
    <div className={styles.dashboardContainer}>
      <LibrarianSidebar 
        activeItem="overdue" 
        isCollapsed={isCollapsed}
        setIsCollapsed={setIsCollapsed}
      />
      <div className={`${styles.mainContent} ${isCollapsed ? styles.collapsed : ''}`}>
        <LibrarianHeader isCollapsed={isCollapsed} />
        <div className={styles.content}>
          <h1 className={styles.pageTitle}>Overdue Books</h1>
          
          <div className={styles.tableWrapper}>
            <table className={styles.table}>
              <thead>
                <tr>
                  <th>Student Name</th>
                  <th>ID</th>
                  <th>Department</th>
                  <th>Due Date</th>
                  <th>Days Past Due</th>
                  <th>Fine (₹)</th>
                </tr>
              </thead>
              <tbody>
                {overdueRecords.map((record, index) => (
                  <tr 
                    key={index} 
                    onClick={() => setSelectedRecord(record)} 
                    className={styles.row}
                  >
                    <td>{record.name}</td>
                    <td>{record.id}</td>
                    <td>{record.department}</td>
                    <td>{record.dueDate}</td>
                    <td>{record.daysPast}</td>
                    <td>{record.fine}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {/* Popup Modal */}
          {selectedRecord && (
            <div className={styles.modalOverlay} onClick={() => setSelectedRecord(null)}>
              <div 
                className={styles.modalContent} 
                onClick={(e) => e.stopPropagation()}
              >
                <h2>{selectedRecord.name} ({selectedRecord.id})</h2>
                <p><strong>Department:</strong> {selectedRecord.department}</p>
                <p><strong>Due Date:</strong> {selectedRecord.dueDate}</p>
                <p><strong>Days Past Due:</strong> {selectedRecord.daysPast}</p>
                <p><strong>Total Fine:</strong> ₹{selectedRecord.fine}</p>

                <h3>Books Overdue:</h3>
                <ul>
                  {selectedRecord.books.map((book, i) => (
                    <li key={i}>
                      <strong>{book.title}</strong> (Borrowed on {book.borrowedOn})
                    </li>
                  ))}
                </ul>

                <div className={styles.modalActions}>
                  <button className={styles.closeBtn} onClick={() => setSelectedRecord(null)}>
                    Close
                  </button>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default OverdueBooks;
