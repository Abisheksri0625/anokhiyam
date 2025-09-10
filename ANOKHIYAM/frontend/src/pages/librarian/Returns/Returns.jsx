import React, { useState } from "react";
import LibrarianSidebar from "../../../components/LibrarianSidebar/LibrarianSidebar";
import LibrarianHeader from "../../../components/LibrarianHeader/LibrarianHeader";
import styles from "./Returns.module.css";

const Returns = () => {
  const [isCollapsed, setIsCollapsed] = useState(false);

  const records = [
    {
      studentName: "N. Arun Kumar",
      bookTitle: "The Alchemist",
      issuedDate: "10.02.2023",
      issuedTime: "12:00",
      returnDate: "16.02.2023",
      returnTime: "10:00",
      department: "ECE",
      year: "01",
      status: "Not Yet",
    },
    {
      studentName: "Priya Sharma",
      bookTitle: "Modern Methods in Chemistry",
      issuedDate: "15.02.2023",
      issuedTime: "11:15",
      returnDate: "20.02.2023",
      returnTime: "09:30",
      department: "CSE",
      year: "02",
      status: "Not Yet",
    },
    {
      studentName: "Rahul Verma",
      bookTitle: "Data Structures in C",
      issuedDate: "22.04.2023",
      issuedTime: "02:20",
      returnDate: "28.04.2023",
      returnTime: "01:00",
      department: "CSE",
      year: "03",
      status: "Confirmed",
    },
    {
      studentName: "Meena Iyer",
      bookTitle: "Python Programming",
      issuedDate: "01.05.2023",
      issuedTime: "04:00",
      returnDate: "06.05.2023",
      returnTime: "03:15",
      department: "ECE",
      year: "04",
      status: "Confirmed",
    },
    {
      studentName: "Karthik R",
      bookTitle: "Clean Code",
      issuedDate: "06.09.2023",
      issuedTime: "09:45",
      returnDate: "09.09.2023",
      returnTime: "11:45",
      department: "MECH",
      year: "01",
      status: "Not Yet",
    },
  ];

  const isOverdue = (returnDate) => {
    const today = new Date();
    const [day, month, year] = returnDate.split(".");
    const dueDate = new Date(`${year}-${month}-${day}`);
    return dueDate < today;
  };

  const RecordRow = ({ record }) => (
    <tr className={isOverdue(record.returnDate) ? styles.overdue : ""}>
      <td>{record.studentName}</td>
      <td>{record.bookTitle}</td>
      <td>{record.issuedDate} | {record.issuedTime}</td>
      <td>{record.returnDate} | {record.returnTime}</td>
      <td>{record.department}</td>
      <td>{record.year}</td>
      <td>
        <span className={
          record.status === "Confirmed"
            ? styles.confirmed
            : styles.notConfirmed
        }>
          {record.status === "Confirmed" ? "✅" : "⏳"} {record.status}
        </span>
      </td>
    </tr>
  );

  return (
    <div className={styles.layout}>
      <div className={`${styles.sidebar} ${isCollapsed ? styles.collapsedSidebar : ""}`}>
        <LibrarianSidebar
          activeItem="returns"
          isCollapsed={isCollapsed}
          setIsCollapsed={setIsCollapsed}
        />
      </div>

      <div className={`${styles.mainContent} ${isCollapsed ? styles.collapsed : ""}`}>
        <LibrarianHeader isCollapsed={isCollapsed} />

        <div className={styles.pageHeader}>
          <h1 className={styles.pageTitle}>Returns</h1>
          <p className={styles.pageSubtitle}>Record of Issued & Returned Books</p>
        </div>

        <div className={styles.tableWrapper}>
          <table className={styles.reportTable}>
            <thead>
              <tr>
                <th>Student Name</th>
                <th>Book Title</th>
                <th>Book Issued</th>
                <th>Return</th>
                <th>Department</th>
                <th>Year</th>
                <th>Status</th>
              </tr>
            </thead>
            <tbody>
              {records.map((record, index) => (
                <RecordRow key={index} record={record} />
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default Returns;