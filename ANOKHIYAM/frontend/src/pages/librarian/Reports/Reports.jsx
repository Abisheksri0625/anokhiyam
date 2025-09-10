import React, { useState } from "react";
import LibrarianSidebar from "../../../components/LibrarianSidebar/LibrarianSidebar";
import LibrarianHeader from "../../../components/LibrarianHeader/LibrarianHeader";
import styles from "./Reports.module.css";

const Reports = () => {
  const [isCollapsed, setIsCollapsed] = useState(false);

  const [feedbacks, setFeedbacks] = useState([
    {
      id: 1,
      student: "Rahul Sharma",
      department: "CSE",
      date: "2025-09-09",
      message: "Library hours are too short.",
      status: "Pending",
      reply: "",
    },
    {
      id: 2,
      student: "Priya Patel",
      department: "MBA",
      date: "2025-09-08",
      message: "Need more copies of research methodology book.",
      status: "Resolved",
      reply: "Ordered 5 new copies, arriving soon.",
    },
    {
      id: 3,
      student: "Arjun Kumar",
      department: "B.Sc Physics",
      date: "2025-09-07",
      message: "WiFi speed in library is very slow.",
      status: "Pending",
      reply: "",
    },
    {
      id: 4,
      student: "Sneha Reddy",
      department: "M.Tech ECE",
      date: "2025-09-06",
      message: "More seating space is required during exam season.",
      status: "Pending",
      reply: "",
    },
    {
      id: 5,
      student: "Vikash Singh",
      department: "BCA",
      date: "2025-09-05",
      message: "Old programming books should be replaced with updated editions.",
      status: "Resolved",
      reply: "We have ordered the latest editions of Java and Python books.",
    },
    {
      id: 6,
      student: "Anita Gupta",
      department: "M.Com",
      date: "2025-09-04",
      message: "Air conditioning is not working properly in the reading hall.",
      status: "Pending",
      reply: "",
    },
  ]);

  const handleReply = (id, replyText) => {
    setFeedbacks((prev) =>
      prev.map((fb) =>
        fb.id === id ? { ...fb, reply: replyText, status: "Resolved" } : fb
      )
    );
  };

  return (
    <div className={styles.dashboardContainer}>
      <LibrarianSidebar
        activeItem="reports"
        isCollapsed={isCollapsed}
        setIsCollapsed={setIsCollapsed}
      />
      <div
        className={`${styles.mainContent} ${
          isCollapsed ? styles.collapsed : ""
        }`}
      >
        <LibrarianHeader isCollapsed={isCollapsed} />
        <div className={styles.content}>
          <h1 className={styles.pageTitle}>Reports - Student Feedback</h1>

          {/* Feedback Messages Table */}
          <div className={styles.tableBox}>
            <h2>Feedback Messages</h2>
            <table>
              <thead>
                <tr>
                  <th>No</th>
                  <th>Student Name</th>
                  <th>Department</th>
                  <th>Date</th>
                  <th>Message</th>
                  <th>Status</th>
                  <th>Reply</th>
                </tr>
              </thead>
              <tbody>
                {feedbacks.map((fb, index) => (
                  <React.Fragment key={fb.id}>
                    <tr>
                      <td>{index + 1}</td>
                      <td>{fb.student}</td>
                      <td>{fb.department}</td>
                      <td>{fb.date}</td>
                      <td>{fb.message}</td>
                      <td
                        className={
                          fb.status === "Pending"
                            ? styles.statusPending
                            : styles.statusResolved
                        }
                      >
                        {fb.status}
                      </td>
                      <td>
                        {fb.reply ? (
                          <div className={styles.replyBubble}>{fb.reply}</div>
                        ) : (
                          <div className={styles.replyBox}>
                            <input
                              type="text"
                              placeholder="Write reply..."
                              onKeyDown={(e) => {
                                if (e.key === "Enter" && e.target.value.trim()) {
                                  handleReply(fb.id, e.target.value);
                                  e.target.value = "";
                                }
                              }}
                            />
                            <button
                              onClick={(e) => {
                                const input =
                                  e.target.parentElement.querySelector("input");
                                if (input.value.trim()) {
                                  handleReply(fb.id, input.value);
                                  input.value = "";
                                }
                              }}
                            >
                              Send
                            </button>
                          </div>
                        )}
                      </td>
                    </tr>
                  </React.Fragment>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Reports;