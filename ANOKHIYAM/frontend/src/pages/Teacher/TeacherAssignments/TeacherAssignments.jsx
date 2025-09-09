import React, { useState, useEffect } from 'react';
import TeacherSidebar from '../../../components/TeacherSidebar/TeacherSidebar';
import TeacherHeader from '../../../components/TeacherHeader/TeacherHeader';
import styles from './TeacherAssignments.module.css';

const TeacherAssignments = () => {
  const [isCollapsed, setIsCollapsed] = useState(() => {
    const saved = localStorage.getItem('teacherSidebarCollapsed');
    return saved === 'true';
  });

  const [assignments, setAssignments] = useState([
    {
      id: 1,
      title: "Math Homework - Algebra",
      description: "Solve the equations from chapter 5",
      dueDate: "2025-09-15",
      className: "III CSE A"
    },
    {
      id: 2,
      title: "Science Project",
      description: "Prepare a model on renewable energy",
      dueDate: "2025-09-20",
      className: "IV CSE B"
    }
  ]);

  const [formData, setFormData] = useState({
    title: "",
    description: "",
    dueDate: "",
    file: null,
    className: ""
  });

  const [filterClass, setFilterClass] = useState("");

  useEffect(() => {
    localStorage.setItem('teacherSidebarCollapsed', isCollapsed);
  }, [isCollapsed]);

  const handleChange = (e) => {
    const { name, value, files } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: files ? files[0] : value
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!formData.title || !formData.dueDate || !formData.className) {
      alert("Please fill all required fields!");
      return;
    }

    const newAssignment = {
      id: assignments.length + 1,
      title: formData.title,
      description: formData.description,
      dueDate: formData.dueDate,
      file: formData.file,
      className: formData.className
    };

    setAssignments((prev) => [...prev, newAssignment]);

    setFormData({
      title: "",
      description: "",
      dueDate: "",
      file: null,
      className: ""
    });
  };

  const filteredAssignments = filterClass
    ? assignments.filter((a) => a.className === filterClass)
    : assignments;

  return (
    <div className={styles.pageContainer}>
      <TeacherSidebar
        activeItem="assignments"
        isCollapsed={isCollapsed}
        setIsCollapsed={setIsCollapsed}
      />
      <div className={`${styles.mainContent} ${isCollapsed ? styles.collapsed : ''}`}>
        <TeacherHeader isCollapsed={isCollapsed} />
        <div className={styles.content}>
          <div className={styles.pageHeader}>
            <h1 className={styles.pageTitle}>Assignments</h1>
            <p className={styles.pageSubtitle}>Create, manage and grade assignments</p>
          </div>

          {/* Create Assignment Form */}
          <div className={styles.contentArea}>
            <form onSubmit={handleSubmit} className={styles.assignmentForm}>
              <input
                type="text"
                name="title"
                placeholder="Assignment Title"
                value={formData.title}
                onChange={handleChange}
                required
              />
              <textarea
                name="description"
                placeholder="Description"
                value={formData.description}
                onChange={handleChange}
              />
              <input
                type="date"
                name="dueDate"
                value={formData.dueDate}
                onChange={handleChange}
                required
              />
              <select
                name="className"
                value={formData.className}
                onChange={handleChange}
                required
                className={styles.classFilter}
              >
                <option value="">Select Class</option>
                <option value="III CSE A">III CSE A</option>
                <option value="IV CSE B">IV CSE B</option>
                <option value="II CSE A">II CSE A</option>
              </select>
              <input
                type="file"
                name="file"
                onChange={handleChange}
              />
              <button type="submit" className={styles.submitBtn}>Create Assignment</button>
            </form>
          </div>

          {/* Assignment List */}
          <div className={styles.contentArea}>
            <h2>All Assignments</h2>
            <select
              value={filterClass}
              onChange={(e) => setFilterClass(e.target.value)}
              className={styles.classFilter}
            >
              <option value="">All Classes</option>
              <option value="III CSE A">III CSE A</option>
              <option value="IV CSE B">IV CSE B</option>
              <option value="II CSE A">II CSE A</option>
            </select>
            <div className={styles.assignmentList}>
              {filteredAssignments.length === 0 ? (
                <p>No assignments for selected class.</p>
              ) : (
                filteredAssignments.map((a) => (
                  <div key={a.id} className={styles.assignmentCard}>
                    <h3>{a.title}</h3>
                    <p>{a.description}</p>
                    <p><strong>Due Date:</strong> {a.dueDate}</p>
                    <p><strong>Class:</strong> {a.className}</p>
                    {a.file && <p><strong>File:</strong> {a.file.name}</p>}
                  </div>
                ))
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TeacherAssignments;
