import React, { useState, useEffect } from 'react';
import styles from './TeachLeave.module.css';

const teacherClass = 'CSE-A'; // Class assigned to this teacher

const TeachLeave = () => {
  const [requests, setRequests] = useState([]);

  useEffect(() => {
    const stored = localStorage.getItem('leaveRequests');
    const allRequests = stored ? JSON.parse(stored) : [];
    const filtered = allRequests.filter(req => req.class === teacherClass && req.status === 'Pending');
    setRequests(filtered);
  }, []);

  const getDays = (from, to) => {
    const start = new Date(from);
    const end = new Date(to);
    const days = [];
    for (let d = new Date(start); d <= end; d.setDate(d.getDate() + 1)) {
      days.push(new Date(d).toISOString().split('T')[0]);
    }
    return days;
  };

  const requiresProof = (req) => {
    const days = getDays(req.from, req.to).length;
    const keywords = ['marriage', 'death', 'health'];
    return (
      days > 2 &&
      keywords.some(k => req.reason.toLowerCase().includes(k)) &&
      !req.proof
    );
  };

  const markAbsent = (studentId, dates) => {
    dates.forEach(date => {
      const key = `attendance_${date}`;
      const stored = localStorage.getItem(key);
      if (!stored) return;

      const data = JSON.parse(stored);
      const updated = data.map(student =>
        student.id === studentId
          ? {
              ...student,
              status: Object.fromEntries(
                Object.entries(student.status).map(([period, val]) => [period, 'A'])
              )
            }
          : student
      );
      localStorage.setItem(key, JSON.stringify(updated));
    });
  };

  const handleAction = (id, action) => {
    const updatedRequests = requests.map(req =>
      req.id === id ? { ...req, status: action } : req
    );
    setRequests(updatedRequests);

    const allStored = JSON.parse(localStorage.getItem('leaveRequests')) || [];
    const updatedStored = allStored.map(req =>
      req.id === id ? { ...req, status: action } : req
    );
    localStorage.setItem('leaveRequests', JSON.stringify(updatedStored));

    if (action === 'Accepted') {
      const req = updatedRequests.find(r => r.id === id);
      const leaveDates = getDays(req.from, req.to);
      markAbsent(req.studentId, leaveDates);
    }
  };

  return (
    <div className={styles.leaveContainer}>
      <h2 className={styles.title}>Leave Requests for Class {teacherClass}</h2>
      <table className={styles.leaveTable}>
        <thead>
          <tr>
            <th>Name</th>
            <th>Roll No</th>
            <th>Type</th>
            <th>Reason</th>
            <th>From</th>
            <th>To</th>
            <th>Days</th>
            <th>Proof</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {requests.map(req => {
            const days = getDays(req.from, req.to).length;
            return (
              <tr key={req.id}>
                <td>{req.name}</td>
                <td>{req.roll}</td>
                <td>{req.type}</td>
                <td>{req.reason}</td>
                <td>{req.from}</td>
                <td>{req.to}</td>
                <td>{days}</td>
                <td>
                  {requiresProof(req) ? (
                    <span className={styles.missingProof}>Required</span>
                  ) : req.proof ? (
                    <a href={`#/${req.proof}`} className={styles.proofLink}>View</a>
                  ) : (
                    '—'
                  )}
                </td>
                <td>
                  <button className={styles.accept} onClick={() => handleAction(req.id, 'Accepted')}>Accept</button>
                  <button className={styles.reject} onClick={() => handleAction(req.id, 'Rejected')}>Reject</button>
                  <button className={styles.forward} onClick={() => handleAction(req.id, 'Forwarded to HOD')}>Forward</button>
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
};

export default TeachLeave;
