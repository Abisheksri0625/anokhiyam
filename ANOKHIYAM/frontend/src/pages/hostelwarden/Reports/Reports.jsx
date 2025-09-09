import React, { useState } from 'react';
import HostelSidebar from '../../../components/HostelSidebar/HostelSidebar';
import HostelHeader from '../../../components/HostelHeader/HostelHeader';
import styles from './Reports.module.css';

const Reports = () => {
  const [isCollapsed, setIsCollapsed] = useState(false);
  const [selectedReport, setSelectedReport] = useState(null);
  const [reports, setReports] = useState([
    {
      id: 1,
      student: "Arjun Kumar",
      roomNumber: "A101",
      title: "Leaking Tap",
      description: "The tap in my bathroom has been leaking continuously for two days. Water wastage is happening.",
      date: "2025-09-05",
      time: "10:30 AM",
      status: "Pending",
    },
    {
      id: 2,
      student: "Priya Sharma",
      roomNumber: "A202",
      title: "WiFi Issue",
      description: "WiFi has been very slow and disconnects frequently in the last 3 days.",
      date: "2025-09-06",
      time: "02:45 PM",
      status: "Pending",
    },
    {
      id: 3,
      student: "Ravi Verma",
      roomNumber: "B301",
      title: "Mess Food Quality",
      description: "Food in the mess has been stale and cold for the past week. Needs urgent attention.",
      date: "2025-09-07",
      time: "01:15 PM",
      status: "Pending",
    },
    {
      id: 4,
      student: "Abishek",
      roomNumber: "c301",
      title: "Mess Food Quality",
      description: "Food in the mess has been stale and cold for the past week. Needs urgent attention.",
      date: "2025-09-07",
      time: "01:30 PM",
      status: "Pending",
    },
     {
      id: 5,
      student: "Priya Sharma",
      roomNumber: "A202",
      title: "WiFi Issue",
      description: "WiFi has been very slow and disconnects frequently in the last 3 days.",
      date: "2025-09-06",
      time: "02:45 PM",
      status: "Pending",
    },
     {
      id: 5,
      student: "Priya Sharma",
      roomNumber: "A202",
      title: "WiFi Issue",
      description: "WiFi has been very slow and disconnects frequently in the last 3 days.",
      date: "2025-09-06",
      time: "02:45 PM",
      status: "Pending",
    },
     {
      id: 5,
      student: "Priya Sharma",
      roomNumber: "A202",
      title: "WiFi Issue",
      description: "WiFi has been very slow and disconnects frequently in the last 3 days.",
      date: "2025-09-06",
      time: "02:45 PM",
      status: "Pending",
    },
  ]);

  const handleAction = (id, action) => {
    setReports(reports.map(report =>
      report.id === id ? { ...report, status: action === "done" ? "Solved ✅" : "Denied ❌" } : report
    ));
    setSelectedReport(null); // Close modal
  };

  return (
    <div className={styles.dashboardContainer}>
      <HostelSidebar 
        activeItem="reports" 
        isCollapsed={isCollapsed}
        setIsCollapsed={setIsCollapsed}
      />
      <div className={`${styles.mainContent} ${isCollapsed ? styles.collapsed : ''}`}>
        <HostelHeader isCollapsed={isCollapsed} />
        <div className={styles.content}>
          <div className={styles.reportsContainer}>
            <h1>Student Reports</h1>
            <table className={styles.table}>
              <thead>
                <tr>
                  <th>Student</th>
                  <th>Room No.</th>
                  <th>Title</th>
                  <th>Date</th>
                  <th>Time</th>
                  <th>Status</th>
                  <th>Action</th>
                </tr>
              </thead>
              <tbody>
                {reports.map((report) => (
                  <tr key={report.id}>
                    <td>{report.student}</td>
                    <td>{report.roomNumber}</td>
                    <td>{report.title}</td>
                    <td>{report.date}</td>
                    <td>{report.time}</td>
                    <td>{report.status}</td>
                    <td>
                      <button 
                        className={styles.viewBtn} 
                        onClick={() => setSelectedReport(report)}
                      >
                        View
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>

            {/* Modal for report details */}
            {selectedReport && (
              <div className={styles.modalOverlay} onClick={() => setSelectedReport(null)}>
                <div className={styles.modal} onClick={(e) => e.stopPropagation()}>
                  <h2>{selectedReport.title}</h2>
                  <p><strong>Student:</strong> {selectedReport.student}</p>
                  <p><strong>Room:</strong> {selectedReport.roomNumber}</p>
                  <p><strong>Date:</strong> {selectedReport.date} at {selectedReport.time}</p>
                  <p><strong>Description:</strong> {selectedReport.description}</p>
                  <div className={styles.modalActions}>
                    <button 
                      className={styles.doneBtn} 
                      onClick={() => handleAction(selectedReport.id, "done")}
                    >
                      Done
                    </button>
                    <button 
                      className={styles.denyBtn} 
                      onClick={() => handleAction(selectedReport.id, "deny")}
                    >
                      Deny
                    </button>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Reports;
