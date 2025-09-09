import React, { useState } from 'react';
import HostelSidebar from '../../../components/HostelSidebar/HostelSidebar';
import HostelHeader from '../../../components/HostelHeader/HostelHeader';
import styles from './Maintenance.module.css';

const Maintenance = () => {
  const [isCollapsed, setIsCollapsed] = useState(false);
  const [selectedRequest, setSelectedRequest] = useState(null);
  const [filterStatus, setFilterStatus] = useState("All");
  const [filterUrgency, setFilterUrgency] = useState("All");

  const [requests, setRequests] = useState([
    {
      id: 1,
      student: "Rahul Sharma",
      room: "B-204",
      type: "Plumbing",
      urgency: "High",
      description: "Water leakage in bathroom sink.",
      date: "2025-09-06",
      time: "10:15 AM",
      status: "Pending",
    },
    {
      id: 2,
      student: "Priya Nair",
      room: "C-102",
      type: "Electrical",
      urgency: "Medium",
      description: "Fan making noise, needs repair.",
      date: "2025-09-07",
      time: "2:40 PM",
      status: "In Progress",
    },
    {
      id: 3,
      student: "Arjun Mehta",
      room: "A-305",
      type: "Cleaning",
      urgency: "Low",
      description: "Room cleaning request, dust build-up.",
      date: "2025-09-07",
      time: "5:20 PM",
      status: "Resolved",
    },
  ]);

  const handleStatusChange = (id, newStatus) => {
    setRequests((prev) =>
      prev.map((req) =>
        req.id === id ? { ...req, status: newStatus } : req
      )
    );
    setSelectedRequest(null);
  };

  const filteredRequests = requests.filter((req) => {
    return (
      (filterStatus === "All" || req.status === filterStatus) &&
      (filterUrgency === "All" || req.urgency === filterUrgency)
    );
  });

  return (
    <div className={styles.dashboardContainer}>
      <HostelSidebar
        activeItem="maintenance"
        isCollapsed={isCollapsed}
        setIsCollapsed={setIsCollapsed}
      />
      <div className={`${styles.mainContent} ${isCollapsed ? styles.collapsed : ''}`}>
        <HostelHeader isCollapsed={isCollapsed} />

        <div className={styles.content}>
          <h1 className={styles.title}>Maintenance Requests</h1>

          {/* Filters */}
          <div className={styles.filters}>
            <select
              value={filterStatus}
              onChange={(e) => setFilterStatus(e.target.value)}
            >
              <option value="All">All Status</option>
              <option value="Pending">Pending</option>
              <option value="In Progress">In Progress</option>
              <option value="Resolved">Resolved</option>
              <option value="Denied">Denied</option>
            </select>

            <select
              value={filterUrgency}
              onChange={(e) => setFilterUrgency(e.target.value)}
            >
              <option value="All">All Urgency</option>
              <option value="High">High</option>
              <option value="Medium">Medium</option>
              <option value="Low">Low</option>
            </select>
          </div>

          {/* Requests Table */}
          <table className={styles.table}>
            <thead>
              <tr>
                <th>Student</th>
                <th>Room</th>
                <th>Type</th>
                <th>Urgency</th>
                <th>Date</th>
                <th>Status</th>
              </tr>
            </thead>
            <tbody>
              {filteredRequests.map((req) => (
                <tr
                  key={req.id}
                  className={styles.clickableRow}
                  onClick={() => setSelectedRequest(req)}
                >
                  <td>{req.student}</td>
                  <td>{req.room}</td>
                  <td>{req.type}</td>
                  <td>
                    <span className={`${styles.badge} ${styles[req.urgency.toLowerCase()]}`}>
                      {req.urgency}
                    </span>
                  </td>
                  <td>{req.date}</td>
                  <td>
                    <span className={`${styles.status} ${styles[req.status.replace(" ", "").toLowerCase()]}`}>
                      {req.status}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Popup Modal */}
        {selectedRequest && (
          <div className={styles.modalOverlay}>
            <div className={styles.modal}>
              <h2>{selectedRequest.type} Issue</h2>
              <p><strong>Student:</strong> {selectedRequest.student}</p>
              <p><strong>Room:</strong> {selectedRequest.room}</p>
              <p><strong>Urgency:</strong> {selectedRequest.urgency}</p>
              <p><strong>Date:</strong> {selectedRequest.date} {selectedRequest.time}</p>
              <p><strong>Description:</strong> {selectedRequest.description}</p>

              <div className={styles.modalActions}>
                <button
                  className={styles.doneBtn}
                  onClick={() => handleStatusChange(selectedRequest.id, "Resolved")}
                >
                  Done
                </button>
                <button
                  className={styles.denyBtn}
                  onClick={() => handleStatusChange(selectedRequest.id, "Denied")}
                >
                  Deny
                </button>
                <button
                  className={styles.closeBtn}
                  onClick={() => setSelectedRequest(null)}
                >
                  Close
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Maintenance;
