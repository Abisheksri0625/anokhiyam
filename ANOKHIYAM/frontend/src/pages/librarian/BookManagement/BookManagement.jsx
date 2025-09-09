import React, { useState } from 'react';
import LibrarianSidebar from '../../../components/LibrarianSidebar/LibrarianSidebar';
import LibrarianHeader from '../../../components/LibrarianHeader/LibrarianHeader';
import styles from './BookManagement.module.css';

const BookManagement = () => {
  const [isCollapsed, setIsCollapsed] = useState(false);

  // Sample FCFS pre-booking requests
  const [requests, setRequests] = useState([
    {
      id: 1,
      studentId: 'CS2021-045',
      department: 'Computer Science',
      year: '3rd Year',
      bookTitle: 'Data Structures & Algorithms',
      availability: 2,
      requestTime: new Date('2024-09-01T09:30:00'),
    },
    {
      id: 2,
      studentId: 'IT2020-123',
      department: 'Information Technology',
      year: '4th Year',
      bookTitle: 'Introduction to AI',
      availability: 0,
      requestTime: new Date('2024-09-01T09:45:00'),
    },
    {
      id: 3,
      studentId: 'ME2022-078',
      department: 'Mechanical Engineering',
      year: '2nd Year',
      bookTitle: 'Thermodynamics Basics',
      availability: 5,
      requestTime: new Date('2024-09-01T10:10:00'),
    },
  ]);

  // Sort by requestTime → ensures FCFS
  const sortedRequests = [...requests].sort(
    (a, b) => a.requestTime - b.requestTime
  );

  const handleApprove = (id) => {
    setRequests((prev) => prev.filter((req) => req.id !== id));
  };

  const handleWaitlist = (id) => {
    setRequests((prev) => prev.filter((req) => req.id !== id));
  };

  return (
    <div className={styles.dashboardContainer}>
      <LibrarianSidebar
        activeItem="books"
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
          <h1 className={styles.pageTitle}>Book Management</h1>
          <p className={styles.pageSubtitle}>
            Manage student pre-booking requests (FCFS)
          </p>

          <div className={styles.requestsList}>
            {sortedRequests.length === 0 ? (
              <p className={styles.noRequests}>No pending requests 🎉</p>
            ) : (
              sortedRequests.map((req) => (
                <div key={req.id} className={styles.requestCard}>
                  <div className={styles.requestInfo}>
                    <p>
                      <strong>Student ID:</strong> {req.studentId}
                    </p>
                    <p>
                      <strong>Department:</strong> {req.department} |{' '}
                      {req.year}
                    </p>
                    <p>
                      <strong>Book Requested:</strong> {req.bookTitle}
                    </p>
                    <p>
                      <strong>Availability:</strong>{' '}
                      {req.availability > 0
                        ? `${req.availability} available`
                        : 'Not available'}
                    </p>
                  </div>
                  <div className={styles.actions}>
                    <button
                      className={styles.approveBtn}
                      onClick={() => handleApprove(req.id)}
                      disabled={req.availability === 0}
                    >
                      Approve
                    </button>
                    <button
                      className={styles.waitBtn}
                      onClick={() => handleWaitlist(req.id)}
                    >
                      Waiting List
                    </button>
                  </div>
                </div>
              ))
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default BookManagement;
