import React, { useState } from "react";
import { useNavigate } from "react-router-dom"; // for navigation
import HostelSidebar from "../../../components/HostelSidebar/HostelSidebar";
import HostelHeader from "../../../components/HostelHeader/HostelHeader";
import styles from "./HostelNotifications.module.css";

const HostelNotifications = () => {
  const [isCollapsed, setIsCollapsed] = useState(false);
  const navigate = useNavigate();

  const [notifications, setNotifications] = useState([
    {
      id: 1,
      title: "Report Received",
      message: "Arjun (CSE, 2nd Year) has submitted a report.",
      type: "Report",
      date: "2025-09-08",
      time: "09:15 AM",
      redirect: "/hostel/reports", // link to Reports page
      studentId: 101, // you can pass ID if needed
      read: false,
    },
    {
      id: 2,
      title: "Maintenance Update",
      message: "Rahul Sharma's plumbing issue (B-204) has been resolved.",
      type: "Maintenance",
      date: "2025-09-07",
      time: "06:30 PM",
      redirect: "/hostel/maintenance",
      read: false,
    },
    {
      id: 3,
      title: "Visitor Entry",
      message: "Parent of Priya (C-102) checked in at 04:15 PM.",
      type: "Visitor",
      date: "2025-09-07",
      time: "04:15 PM",
      redirect: "/hostel/visitors",
      read: true,
    },
    {
      id: 4,
      title: "Mess Menu Updated",
      message: "New mess menu available for this week.",
      type: "Announcement",
      date: "2025-09-07",
      time: "09:00 AM",
      redirect: "/hostel/notifications",
      read: false,
    },
    {
      id: 5,
      title: "Fee Reminder",
      message: "Final semester hostel fee is due by 15th September.",
      type: "Announcement",
      date: "2025-09-06",
      time: "10:00 AM",
      redirect: "/hostel/notifications",
      read: true,
    },
  ]);

  const handleNotificationClick = (notif) => {
    // mark as read
    setNotifications((prev) =>
      prev.map((n) =>
        n.id === notif.id ? { ...n, read: true } : n
      )
    );
    // redirect
    navigate(notif.redirect, { state: { studentId: notif.studentId } });
  };

  return (
    <div className={styles.dashboardContainer}>
      <HostelSidebar
        activeItem="notifications"
        isCollapsed={isCollapsed}
        setIsCollapsed={setIsCollapsed}
      />
      <div
        className={`${styles.mainContent} ${
          isCollapsed ? styles.collapsed : ""
        }`}
      >
        <HostelHeader isCollapsed={isCollapsed} />
        <div className={styles.content}>
          <h1 className={styles.title}>Notifications</h1>
          <ul className={styles.notificationList}>
            {notifications.map((notif) => (
              <li
                key={notif.id}
                className={`${styles.notificationItem} ${
                  notif.read ? styles.read : styles.unread
                }`}
                onClick={() => handleNotificationClick(notif)}
              >
                <div className={styles.notifHeader}>
                  <span className={styles.notifType}>{notif.type}</span>
                  <span className={styles.notifDate}>
                    {notif.date} • {notif.time}
                  </span>
                </div>
                <h3 className={styles.notifTitle}>{notif.title}</h3>
                <p className={styles.notifMessage}>{notif.message}</p>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
};

export default HostelNotifications;
