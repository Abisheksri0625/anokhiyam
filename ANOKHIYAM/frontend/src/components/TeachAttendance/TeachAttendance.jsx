// TeachAttendance.jsx
import React, { useState, useEffect } from 'react';
import { db } from '../../config/firebase';
import { 
  collection, 
  getDocs, 
  doc, 
  setDoc 
} from 'firebase/firestore';
import styles from './TeachAttendance.module.css';

const TeachAttendance = () => {
  const [students, setStudents] = useState([]);
  const [selectedDate, setSelectedDate] = useState(new Date().toISOString().split('T')[0]);
  const [attendance, setAttendance] = useState({});
  const [loading, setLoading] = useState(false);
  const [submitting, setSubmitting] = useState(false);

  useEffect(() => {
    fetchAllStudents();
  }, []);

  const fetchAllStudents = async () => {
    try {
      setLoading(true);
      console.log('Fetching all students...');
      
      const studentsRef = collection(db, 'student_credentials');
      const snapshot = await getDocs(studentsRef);
      
      const studentData = snapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data()
      }));
      
      console.log('All students fetched:', studentData);
      setStudents(studentData);
      
      // Initialize attendance state for all students and periods (default: Present)
      const initialAttendance = {};
      studentData.forEach(student => {
        initialAttendance[student.id] = {
          1: 'P', 2: 'P', 3: 'P', 4: 'P',
          5: 'P', 6: 'P', 7: 'P', 8: 'P'
        };
      });
      setAttendance(initialAttendance);
      
    } catch (error) {
      console.error('Error fetching students:', error);
      alert('Error fetching students. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  const handleAttendanceChange = (studentId, period, status) => {
    setAttendance(prev => ({
      ...prev,
      [studentId]: {
        ...prev[studentId],
        [period]: status
      }
    }));
  };

  // Helper function to clean data and remove undefined values
  const cleanAttendanceData = (student, periods) => {
    const presentPeriods = Object.values(periods).filter(p => p === 'P').length;
    
    // Create clean data object, only including defined values
    const cleanData = {
      studentId: student.id,
      date: selectedDate,
      periods: periods,
      submittedBy: 'teacher',
      submittedAt: new Date().toISOString(),
      totalPeriods: 8,
      presentPeriods: presentPeriods
    };

    // Only add fields if they exist and are not undefined
    if (student.firstName && student.lastName) {
      cleanData.studentName = `${student.firstName} ${student.lastName}`;
    }
    
    if (student.acceptedStudentId) {
      cleanData.acceptedStudentId = student.acceptedStudentId;
    }
    
    if (student.loginEmail) {
      cleanData.loginEmail = student.loginEmail;
    }

    return cleanData;
  };

  const submitAttendance = async () => {
    if (students.length === 0) {
      alert('No students found to mark attendance.');
      return;
    }

    try {
      setSubmitting(true);
      console.log('Submitting attendance for', students.length, 'students');
      
      const attendancePromises = students.map(async (student) => {
        try {
          // Clean the data to remove any undefined values
          const cleanData = cleanAttendanceData(student, attendance[student.id]);
          
          const docId = `${student.id}_${selectedDate}`;
          console.log('Saving attendance for student:', student.firstName, student.lastName);
          
          await setDoc(doc(db, 'attendance', docId), cleanData);
          return { success: true, studentId: student.id };
        } catch (error) {
          console.error('Error saving attendance for student:', student.firstName, error);
          return { success: false, studentId: student.id, error };
        }
      });

      const results = await Promise.all(attendancePromises);
      const successful = results.filter(r => r.success).length;
      const failed = results.filter(r => !r.success).length;

      if (failed === 0) {
        alert(`✅ Attendance submitted successfully for all ${successful} students!`);
      } else {
        alert(`⚠️ Attendance submitted for ${successful} students. ${failed} failed to save.`);
        console.log('Failed submissions:', results.filter(r => !r.success));
      }
      
    } catch (error) {
      console.error('Error submitting attendance:', error);
      alert('Error submitting attendance. Please check console for details.');
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className={styles.container}>
      <div className={styles.header}>
        <h1> Attendance System </h1>
      </div>

      <div className={styles.dateControl}>
        <label htmlFor="dateSelect"><strong>Select Date:</strong></label>
        <input
          type="date"
          id="dateSelect"
          value={selectedDate}
          onChange={e => setSelectedDate(e.target.value)}
          className={styles.dateInput}
        />
      </div>

      {loading && (
        <div className={styles.loading}>
          <p>Loading all students...</p>
        </div>
      )}

      {!loading && students.length === 0 && (
        <div className={styles.noStudents}>
          <p>No students found in the system.</p>
        </div>
      )}

      {!loading && students.length > 0 && (
        <>
          <div className={styles.studentCount}>
            <p><strong>Total Students:</strong> {students.length}</p>
            <p><strong>Date:</strong> {new Date(selectedDate).toLocaleDateString()}</p>
          </div>

          <div className={styles.tableContainer}>
            <table className={styles.attendanceTable}>
              <thead>
                <tr>
                  <th style={{minWidth: '50px'}}>S.No</th>
                  <th style={{minWidth: '200px'}}>Student Name</th>
                  <th style={{minWidth: '150px'}}>Roll No</th>
                  {[1, 2, 3, 4, 5, 6, 7, 8].map(period => (
                    <th key={period} style={{minWidth: '100px'}}>Period {period}</th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {students.map((student, index) => (
                  <tr key={student.id}>
                    <td><strong>{index + 1}</strong></td>
                    <td>
                      <strong>
                        {student.firstName && student.lastName 
                          ? `${student.firstName} ${student.lastName}` 
                          : 'Name Missing'
                        }
                      </strong>
                    </td>
                    <td>{student.acceptedStudentId || 'No Roll No'}</td>
                    {[1, 2, 3, 4, 5, 6, 7, 8].map(period => (
                      <td key={period}>
                        <select
                          value={attendance[student.id]?.[period] || 'P'}
                          onChange={e => handleAttendanceChange(student.id, period, e.target.value)}
                          className={`${styles.statusSelect} ${styles[attendance[student.id]?.[period] || 'P']}`}
                        >
                          <option value="P">Present</option>
                          <option value="A">Absent</option>
                        </select>
                      </td>
                    ))}
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          <div className={styles.submitSection}>
            <button
              onClick={submitAttendance}
              disabled={submitting}
              className={styles.submitButton}
            >
              {submitting ? 'Submitting Attendance...' : `Submit Attendance for ${students.length} Students`}
            </button>
          </div>
        </>
      )}
    </div>
  );
};

export default TeachAttendance;
