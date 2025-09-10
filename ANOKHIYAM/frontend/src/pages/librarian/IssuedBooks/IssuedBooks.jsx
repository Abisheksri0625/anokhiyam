import React, { useState } from "react";
import LibrarianSidebar from "../../../components/LibrarianSidebar/LibrarianSidebar";
import LibrarianHeader from "../../../components/LibrarianHeader/LibrarianHeader";
import styles from "./IssuedBooks.module.css";

const IssuedBooks = () => {
  const [isCollapsed, setIsCollapsed] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const [filterDept, setFilterDept] = useState("All");

  // Sample issued books data
  const issuedBooks = [
    { no: 1, title: "Introduction to Algorithms", id: "S1001", name: "Rahul Sharma", issued: "01 Sep 2025", duration: "14 Days", returnDate: "15 Sep 2025", dept: "CSE", year: "3rd Year" },
    { no: 2, title: "Data Structures in Java", id: "S1002", name: "Priya Patel", issued: "02 Sep 2025", duration: "14 Days", returnDate: "16 Sep 2025", dept: "IT", year: "1st Year" },
    { no: 3, title: "Physics for Scientists", id: "S1003", name: "Arjun Kumar", issued: "03 Sep 2025", duration: "14 Days", returnDate: "17 Sep 2025", dept: "Physics", year: "2nd Year" },
    { no: 4, title: "Digital Signal Processing", id: "S1004", name: "Sneha Reddy", issued: "04 Sep 2025", duration: "14 Days", returnDate: "18 Sep 2025", dept: "ECE", year: "2nd Year" },
    { no: 5, title: "Database Management Sys.", id: "S1005", name: "Vikash Singh", issued: "05 Sep 2025", duration: "14 Days", returnDate: "19 Sep 2025", dept: "BCA", year: "3rd Year" },
    { no: 6, title: "Financial Accounting", id: "S1006", name: "Anita Gupta", issued: "06 Sep 2025", duration: "14 Days", returnDate: "20 Sep 2025", dept: "Commerce", year: "1st Year" },
    { no: 7, title: "Microprocessor Arch.", id: "S1007", name: "Deepak Kumar", issued: "07 Sep 2025", duration: "14 Days", returnDate: "21 Sep 2025", dept: "EEE", year: "2nd Year" },
    { no: 8, title: "Machine Learning Basics", id: "S1008", name: "Nisha Verma", issued: "08 Sep 2025", duration: "14 Days", returnDate: "22 Sep 2025", dept: "CSE", year: "4th Year" },
    { no: 9, title: "Business Communication", id: "S1009", name: "Amit Yadav", issued: "09 Sep 2025", duration: "14 Days", returnDate: "23 Sep 2025", dept: "MBA", year: "1st Year" },
    { no: 10, title: "Operating Systems", id: "S1010", name: "Rohan Das", issued: "10 Sep 2025", duration: "14 Days", returnDate: "24 Sep 2025", dept: "IT", year: "2nd Year" },
    // ... (add rest of your 25 records here)
  ];

  // Filtering logic
  const filteredBooks = issuedBooks.filter((book) => {
    const matchesDept = filterDept === "All" || book.dept === filterDept;
    const matchesSearch =
      book.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      book.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      book.id.toLowerCase().includes(searchTerm.toLowerCase());

    return matchesDept && matchesSearch;
  });

  return (
    <div className={styles.dashboardContainer}>
      {/* Sidebar */}
      <LibrarianSidebar
        activeItem="issued-books"
        isCollapsed={isCollapsed}
        setIsCollapsed={setIsCollapsed}
      />

      {/* Main Content */}
      <div className={`${styles.mainContent} ${isCollapsed ? styles.collapsed : ""}`}>
        <LibrarianHeader isCollapsed={isCollapsed} />

        <div className={styles.content}>
          <h1 className={styles.pageTitle}>Issued Books</h1>

          {/* Filters */}
          <div className={styles.actions}>
            <select value={filterDept} onChange={(e) => setFilterDept(e.target.value)}>
              <option value="All">All Departments</option>
              <option value="CSE">CSE</option>
              <option value="IT">IT</option>
              <option value="ECE">ECE</option>
              <option value="EEE">EEE</option>
              <option value="BCA">BCA</option>
              <option value="Commerce">Commerce</option>
              <option value="MBA">MBA</option>
              <option value="Physics">Physics</option>
              <option value="Mech Engg">Mech Engg</option>
              <option value="B.Sc Maths">B.Sc Maths</option>
            </select>

            <input
              type="text"
              placeholder="Search by book, student ID, or name..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>

          {/* Table */}
          <div className={styles.tableWrapper}>
            <table className={styles.reportTable}>
              <thead>
                <tr>
                  <th>No</th>
                  <th>Book Title</th>
                  <th>Student ID</th>
                  <th>Student Name</th>
                  <th>Issued Date</th>
                  <th>Duration</th>
                  <th>Return Date</th>
                  <th>Department</th>
                  <th>Year of Study</th>
                </tr>
              </thead>
              <tbody>
                {filteredBooks.length > 0 ? (
                  filteredBooks.map((book) => (
                    <tr key={book.no}>
                      <td>{book.no}</td>
                      <td>{book.title}</td>
                      <td>{book.id}</td>
                      <td>{book.name}</td>
                      <td>{book.issued}</td>
                      <td>{book.duration}</td>
                      <td>{book.returnDate}</td>
                      <td>{book.dept}</td>
                      <td>{book.year}</td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td colSpan="9" style={{ textAlign: "center", padding: "1rem" }}>
                      No issued books found.
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
};

export default IssuedBooks;