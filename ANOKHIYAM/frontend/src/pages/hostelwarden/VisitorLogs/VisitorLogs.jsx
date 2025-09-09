import React, { useState } from 'react';
import HostelSidebar from '../../../components/HostelSidebar/HostelSidebar';
import HostelHeader from '../../../components/HostelHeader/HostelHeader';
import styles from './VisitorLogs.module.css';

const VisitorLogs = () => {
  const [isCollapsed, setIsCollapsed] = useState(false);
  const [selectedVisitor, setSelectedVisitor] = useState(null);

  const visitors = [
    { id: 1, name: "Ramesh Kumar", purpose: "Parent Visit", checkIn: "10:00 AM", checkOut: "1:00 PM", student: "Arjun Kumar (B.Tech 1st Year)" },
    { id: 2, name: "Suresh Rao", purpose: "Maintenance", checkIn: "11:30 AM", checkOut: "12:15 PM" },
    { id: 3, name: "Meena Sharma", purpose: "Parent Visit", checkIn: "9:15 AM", checkOut: "10:30 AM", student: "Priya Sharma (B.Tech 2nd Year)" },
    { id: 4, name: "Delivery Staff", purpose: "Courier Delivery", checkIn: "3:00 PM", checkOut: "3:20 PM" },
    { id: 5, name: "Anita Verma", purpose: "Parent Visit", checkIn: "2:45 PM", checkOut: "4:00 PM", student: "Ravi Verma (B.Tech 3rd Year)" },
  ];

  return (
    <div className={styles.dashboardContainer}>
      <HostelSidebar 
        activeItem="visitors" 
        isCollapsed={isCollapsed}
        setIsCollapsed={setIsCollapsed}
      />
      <div className={`${styles.mainContent} ${isCollapsed ? styles.collapsed : ''}`}>
        <HostelHeader isCollapsed={isCollapsed} />
        <div className={styles.content}>
          <div className={styles.visitorLogs}>
            <h1>Visitor Logs</h1>
            <table className={styles.table}>
              <thead>
                <tr>
                  <th>Name</th>
                  <th>Purpose</th>
                  <th>Check-In</th>
                  <th>Check-Out</th>
                  <th>Action</th>
                </tr>
              </thead>
              <tbody>
                {visitors.map((visitor) => (
                  <tr key={visitor.id}>
                    <td>{visitor.name}</td>
                    <td>{visitor.purpose}</td>
                    <td>{visitor.checkIn}</td>
                    <td>{visitor.checkOut}</td>
                    <td>
                      {visitor.purpose === "Parent Visit" ? (
                        <button 
                          className={styles.viewBtn} 
                          onClick={() => setSelectedVisitor(visitor)}
                        >
                          View Student
                        </button>
                      ) : (
                        "-"
                      )}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>

            {selectedVisitor && (
              <div className={styles.modalOverlay} onClick={() => setSelectedVisitor(null)}>
                <div className={styles.modal} onClick={(e) => e.stopPropagation()}>
                  <h2>Visitor Details</h2>
                  <p><strong>Name:</strong> {selectedVisitor.name}</p>
                  <p><strong>Purpose:</strong> {selectedVisitor.purpose}</p>
                  <p><strong>Check-In:</strong> {selectedVisitor.checkIn}</p>
                  <p><strong>Check-Out:</strong> {selectedVisitor.checkOut}</p>
                  {selectedVisitor.student && (
                    <p><strong>Student:</strong> {selectedVisitor.student}</p>
                  )}
                  <button className={styles.closeBtn} onClick={() => setSelectedVisitor(null)}>Close</button>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default VisitorLogs;
