import React, { useState } from "react";
import HostelSidebar from '../../../components/HostelSidebar/HostelSidebar';
import HostelHeader from '../../../components/HostelHeader/HostelHeader';
import styles from "./Outpass.module.css";

const Outpass = () => {
  const [isCollapsed, setIsCollapsed] = useState(false);

  const [requests, setRequests] = useState([
    {
      id: 1,
      studentName: "Rahul Sharma",
      studentId: "S101",
      reason: "Medical Appointment",
      fromDate: "2025-09-10",
      toDate: "2025-09-11",
      status: "pending",
    },
    {
      id: 2,
      studentName: "Priya Patel",
      studentId: "S102",
      reason: "Family Function",
      fromDate: "2025-09-12",
      toDate: "2025-09-13",
      status: "pending",
    },
    {
      id: 3,
      studentName: "Kiran Singh",
      studentId: "S103",
      reason: "Project Presentation",
      fromDate: "2025-09-11",
      toDate: "2025-09-11",
      status: "pending",
    },
    {
      id: 4,
      studentName: "Meena Gupta",
      studentId: "S104",
      reason: "Workshop",
      fromDate: "2025-09-13",
      toDate: "2025-09-13",
      status: "pending",
    }
  ]);

  const handleAccept = (id) => {
    setRequests((prev) =>
      prev.map((req) => (req.id === id ? { ...req, status: "accepted" } : req))
    );
  };

  const handleReject = (id) => {
    setRequests((prev) =>
      prev.map((req) => (req.id === id ? { ...req, status: "rejected" } : req))
    );
  };

  return (
    <div className={styles.dashboardContainer}>
      <HostelSidebar
        activeItem="outpass-requests"
        isCollapsed={isCollapsed}
        setIsCollapsed={setIsCollapsed}
      />
      <div className={`${styles.mainContent} ${isCollapsed ? styles.collapsed : ""}`}>
        <HostelHeader isCollapsed={isCollapsed} />
        <div className={styles.content}>
          <h1 className={styles.headerTitle}>Outpass Requests</h1>
          <div className={styles.requestList}>
            {requests.length === 0 ? (
              <p className={styles.noRequests}>No pending outpass requests.</p>
            ) : (
              requests.map((req) => (
                <div key={req.id} className={styles.requestCard}>
                  <div className={styles.header}>
                    <h3>
                      {req.studentName} ({req.studentId})
                    </h3>
                    <span className={`${styles.status} ${styles[req.status]}`}>
                      {req.status.charAt(0).toUpperCase() + req.status.slice(1)}
                    </span>
                  </div>
                  <p>
                    <strong>Reason/Place:</strong> {req.reason}
                  </p>
                  <p>
                    <strong>From:</strong> {req.fromDate} <strong>To:</strong> {req.toDate}
                  </p>
                  {req.status === "pending" && (
                    <div className={styles.actions}>
                      <button
                        className={styles.acceptButton}
                        onClick={() => handleAccept(req.id)}
                      >
                        Accept
                      </button>
                      <button
                        className={styles.rejectButton}
                        onClick={() => handleReject(req.id)}
                      >
                        Reject
                      </button>
                    </div>
                  )}
                  {(req.status === "accepted" || req.status === "rejected") && (
                    <p className={styles.finalMessage}>
                      {req.status === "accepted"
                        ? "Outpass approved. Digital pass will be available to the student."
                        : "Outpass request rejected. Student will be notified."}
                    </p>
                  )}
                </div>
              ))
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Outpass;