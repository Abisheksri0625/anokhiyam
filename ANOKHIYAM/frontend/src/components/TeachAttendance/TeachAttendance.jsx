import React, { useState, useEffect } from 'react';
import * as XLSX from 'xlsx';
import { saveAs } from 'file-saver';
import styles from './TeachAttendance.module.css';

const periods = ['P1', 'P2', 'P3', 'P4', 'P5', 'P6', 'P7', 'P8'];
const useDummyData = true;

const TeachAttendance = () => {
  const [date, setDate] = useState('');
  const [attendance, setAttendance] = useState([]);
  const [editingCell, setEditingCell] = useState({ studentId: null, period: null });
  const teacherId = 'T123';

  useEffect(() => {
    const today = new Date().toISOString().split('T')[0];
    setDate(today);
    loadAttendance(today);
  }, []);

  const loadAttendance = selectedDate => {
    const saved = localStorage.getItem(`attendance_${selectedDate}`);
    if (saved) {
      setAttendance(JSON.parse(saved));
    } else {
      fetchStudents(selectedDate);
    }
  };

  const fetchStudents = async selectedDate => {
    let studentData;

    if (useDummyData) {
      studentData = [
        { id: 'S001', name: 'Aarav Kumar', roll: '101' },
        { id: 'S002', name: 'Diya Sharma', roll: '102' },
        { id: 'S003', name: 'Rohan Mehta', roll: '103' },
        { id: 'S004', name: 'Sneha Iyer', roll: '104' },
        { id: 'S005', name: 'Kabir Singh', roll: '105' },
        { id: 'S006', name: 'Meera Joshi', roll: '106' },
        { id: 'S007', name: 'Aditya Rao', roll: '107' },
        { id: 'S008', name: 'Tanvi Desai', roll: '108' },
        { id: 'S009', name: 'Vikram Patel', roll: '109' },
        { id: 'S010', name: 'Ishita Nair', roll: '110' }
      ];
    } else {
      const res = await axios.get(`/api/teacher/${teacherId}/students`);
      studentData = res.data;
    }

    const freshAttendance = studentData.map(student => ({
      ...student,
      status: periods.reduce((acc, p) => ({ ...acc, [p]: 'P' }), {}),
    }));

    setAttendance(freshAttendance);
    localStorage.setItem(`attendance_${selectedDate}`, JSON.stringify(freshAttendance));
  };

  const updateAttendance = updated => {
    setAttendance(updated);
    localStorage.setItem(`attendance_${date}`, JSON.stringify(updated));
  };

  const getStudentPercent = student => {
    const presentCount = Object.values(student.status).filter(val => val === 'P').length;
    return Math.round((presentCount / periods.length) * 100);
  };

  const getClassAverage = () => {
    const total = attendance.reduce((sum, student) => sum + getStudentPercent(student), 0);
    return attendance.length ? Math.round(total / attendance.length) : 0;
  };

  const exportAttendance = () => {
    const data = attendance.map(student => ({
      Roll: student.roll,
      Name: student.name,
      ...student.status
    }));

    const worksheet = XLSX.utils.json_to_sheet(data);
    const workbook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(workbook, worksheet, 'Attendance');
    const excelBuffer = XLSX.write(workbook, { bookType: 'xlsx', type: 'array' });
    const blob = new Blob([excelBuffer], { type: 'application/octet-stream' });
    saveAs(blob, `Attendance_${date}.xlsx`);
  };

  return (
    <div className={styles.attendanceContainer}>
      <h2 className={styles.sectionTitle}>Attendance for {date}</h2>
      <input
        type="date"
        value={date}
        onChange={e => {
          setDate(e.target.value);
          loadAttendance(e.target.value);
        }}
        className={styles.datePicker}
      />

      <table className={styles.attendanceTable}>
        <thead>
          <tr>
            <th>Roll No</th>
            <th>Name</th>
            {periods.map(p => (
              <th key={p}>{p}</th>
            ))}
            <th>% Present</th>
          </tr>
        </thead>
        <tbody>
          {attendance.map(student => (
            <tr key={student.id}>
              <td>{student.roll}</td>
              <td>{student.name}</td>
              {periods.map(p => {
                const isEditing = editingCell.studentId === student.id && editingCell.period === p;
                return (
                  <td
                    key={p}
                    className={student.status[p] === 'P' ? styles.present : styles.absent}
                    onClick={() => setEditingCell({ studentId: student.id, period: p })}
                  >
                    {isEditing ? (
                      <select
                        value={student.status[p]}
                        onChange={e => {
                          const updated = attendance.map(s =>
                            s.id === student.id
                              ? {
                                  ...s,
                                  status: {
                                    ...s.status,
                                    [p]: e.target.value,
                                  },
                                }
                              : s
                          );
                          updateAttendance(updated);
                          setEditingCell({ studentId: null, period: null });
                        }}
                        onBlur={() => setEditingCell({ studentId: null, period: null })}
                        className={styles.dropdown}
                      >
                        <option value="P">P</option>
                        <option value="A">A</option>
                      </select>
                    ) : (
                      student.status[p]
                    )}
                  </td>
                );
              })}
              <td>{getStudentPercent(student)}%</td>
            </tr>
          ))}
        </tbody>
        <tfoot>
          <tr>
            <td colSpan={periods.length + 2}>
              Class Attendance Average: {getClassAverage()}%
            </td>
          </tr>
        </tfoot>
      </table>

      <div className={styles.exportButtons}>
        <button onClick={exportAttendance} className={styles.exportButton}>
          Export to Excel
        </button>
      </div>
    </div>
  );
};

export default TeachAttendance;
