import React, { useState } from 'react';
import styles from './Attendance.module.css';

// Dummy data simulating teacher-submitted attendance
const dummyAttendanceData = [
  {
    date: '2025-09-01',
    periods: ['P', 'P', 'A', 'P', 'P', 'P', 'P', 'P']
  },
  {
    date: '2025-09-02',
    periods: ['P', 'P', 'P', 'P', 'P', 'P', 'P', 'P']
  },
  {
    date: '2025-09-03',
    periods: ['A', 'A', 'A', 'P', 'P', 'P', 'P', 'P']
  },
  {
    date: '2025-09-04',
    periods: ['P', 'P', 'P', 'P', 'P', 'P', 'P', 'P']
  },
  {
    date: '2025-09-05',
    periods: ['P', 'P', 'P', 'P', 'P', 'P', 'P', 'P']
  },
  {
    date: '2025-09-06',
    periods: ['A', 'P', 'P', 'P', 'A', 'P', 'P', 'P']
  },
  {
    date: '2025-09-07',
    periods: ['P', 'P', 'P', 'P', 'P', 'P', 'P', 'P']
  }
];

const Attendance = () => {
  const [selectedDate, setSelectedDate] = useState(dummyAttendanceData[0].date);

  const totalPeriods = dummyAttendanceData.reduce((acc, day) => acc + day.periods.length, 0);
  const presentPeriods = dummyAttendanceData.reduce(
    (acc, day) => acc + day.periods.filter(p => p === 'P').length,
    0
  );
  const attendancePercentage = ((presentPeriods / totalPeriods) * 100).toFixed(2);

  const currentDay = dummyAttendanceData.find(d => d.date === selectedDate);

  return (
    <div className={styles.container}>
      <div className={styles.header}>
        <h2>Attendance Report</h2>
        <p className={styles.percentage}>Overall Attendance: {attendancePercentage}%</p>
      </div>

      <label htmlFor="dateSelect">Select Date:</label>
      <select
        id="dateSelect"
        value={selectedDate}
        onChange={e => setSelectedDate(e.target.value)}
        className={styles.dropdown}
      >
        {dummyAttendanceData.map((d, i) => (
          <option key={i} value={d.date}>
            {d.date}
          </option>
        ))}
      </select>

      {currentDay && (
        <table className={styles.table}>
          <thead>
            <tr>
              {currentDay.periods.map((_, i) => (
                <th key={i}>Period {i + 1}</th>
              ))}
            </tr>
          </thead>
          <tbody>
            <tr>
              {currentDay.periods.map((status, i) => (
                <td key={i} className={styles[status]}>
                  {status}
                </td>
              ))}
            </tr>
          </tbody>
        </table>
      )}
    </div>
  );
};

export default Attendance;
