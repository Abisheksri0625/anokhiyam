import React, { useState } from "react";
import Attendance from "../../../components/attendance/Attendance";
import LeaveRequest from "../../../components/LeaveRequest/LeaveRequest";
import YearCalendar from "../../../components/YearCalendar/YearCalendar";

import StudentSidebar from "../../../components/StudentSidebar/StudentSidebar";
import StudentHeader from "../../../components/StudentHeader/StudentHeader";

import styles from "./StudentAttendance.module.css";

const StudentAttendance = () => {
  const [activeTab, setActiveTab] = useState("attendance");
  const [isCollapsed, setIsCollapsed] = useState(false);

  // Govt/National Holidays (can expand this list)
  const holidays = [
    { date: "2025-01-26", label: "Republic Day" },
    { date: "2025-08-15", label: "Independence Day" },
    { date: "2025-10-02", label: "Gandhi Jayanti" },
    { date: "2025-12-25", label: "Christmas" }
  ];

  return (
    <div className={styles.layout}>
      {/* Sidebar */}
      <StudentSidebar
        activeItem="attendance"
        isCollapsed={isCollapsed}
        setIsCollapsed={setIsCollapsed}
      />

      {/* Main Area */}
      <div
        className={`${styles.main} ${isCollapsed ? styles.collapsed : ""}`}
      >
        {/* Header */}
        <StudentHeader
          isCollapsed={isCollapsed}
          onMenuToggle={() => setIsCollapsed(!isCollapsed)}
        />

        {/* Page Content */}
        <div className={styles.pageContent}>
          {/* Tab Navigation */}
          <div className={styles.navbar}>
            <button
              className={activeTab === "attendance" ? styles.active : ""}
              onClick={() => setActiveTab("attendance")}
            >
              Attendance
            </button>
            <button
              className={activeTab === "leave" ? styles.active : ""}
              onClick={() => setActiveTab("leave")}
            >
              Leave Request
            </button>
            <button
              className={activeTab === "calendar" ? styles.active : ""}
              onClick={() => setActiveTab("calendar")}
            >
              Calendar
            </button>
          </div>

          {/* Dynamic Content */}
          <div className={styles.content}>
            {activeTab === "attendance" && <Attendance />}
            {activeTab === "leave" && <LeaveRequest />}
            {activeTab === "calendar" && <YearCalendar holidays={holidays} />}
          </div>
        </div>
      </div>
    </div>
  );
};

export default StudentAttendance;
