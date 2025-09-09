import React, { useState, useEffect } from 'react';
import { db, auth } from '../../../config/firebase';
import { 
  collection, 
  query, 
  where, 
  getDocs,
  onSnapshot
} from 'firebase/firestore';
import StudentSidebar from '../../../components/StudentSidebar/StudentSidebar';
import StudentHeader from '../../../components/StudentHeader/StudentHeader';
import styles from './StudentGrades.module.css';

const StudentGrades = () => {
  const [grades, setGrades] = useState(null);
  const [studentInfo, setStudentInfo] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [isCollapsed, setIsCollapsed] = useState(false);

  useEffect(() => {
    fetchStudentGrades();
  }, []);

  const fetchStudentGrades = async () => {
    try {
      setLoading(true);
      setError('');
      
      const currentUser = auth.currentUser;
      
      if (!currentUser) {
        setError('No authenticated user found');
        return;
      }

      // Get student info first
      const studentCredsRef = collection(db, 'student_credentials');
      const studentQuery = query(studentCredsRef, where('loginEmail', '==', currentUser.email));
      const studentSnapshot = await getDocs(studentQuery);
      
      if (studentSnapshot.empty) {
        setError('Student credentials not found for your email');
        return;
      }

      const studentData = studentSnapshot.docs[0].data();
      const studentId = studentSnapshot.docs[0].id;
      
      setStudentInfo({
        ...studentData,
        id: studentId
      });

      // Set up real-time listener for grades
      const gradesRef = collection(db, 'student_grades');
      const gradesQuery = query(gradesRef, where('studentId', '==', studentId));
      
      const unsubscribe = onSnapshot(gradesQuery, (snapshot) => {
        if (!snapshot.empty) {
          const gradeData = snapshot.docs[0].data();
          setGrades(gradeData);
        } else {
          setGrades(null);
        }
        setLoading(false);
      });

      return unsubscribe;

    } catch (error) {
      console.error('Error fetching grades:', error);
      setError('Error fetching grades: ' + error.message);
      setLoading(false);
    }
  };

  const getGradeColor = (mark) => {
    if (mark >= 90) return '#10b981';
    if (mark >= 80) return '#22c55e';
    if (mark >= 70) return '#eab308';
    if (mark >= 60) return '#f59e0b';
    if (mark >= 50) return '#f97316';
    return '#ef4444';
  };

  const getGradeLetter = (mark) => {
    if (mark >= 90) return 'A+';
    if (mark >= 80) return 'A';
    if (mark >= 70) return 'B+';
    if (mark >= 60) return 'B';
    if (mark >= 50) return 'C';
    return 'F';
  };

  if (loading) {
    return (
      <div className={styles.layout}>
        <StudentSidebar
          activeItem="grades"
          isCollapsed={isCollapsed}
          setIsCollapsed={setIsCollapsed}
        />
        <div className={`${styles.main} ${isCollapsed ? styles.collapsed : ""}`}>
          <StudentHeader
            isCollapsed={isCollapsed}
            onMenuToggle={() => setIsCollapsed(!isCollapsed)}
          />
          <div className={styles.pageContent}>
            <div className={styles.loading}>
              <h3>Loading your grades...</h3>
              <p>Please wait while we fetch your academic records.</p>
            </div>
          </div>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className={styles.layout}>
        <StudentSidebar
          activeItem="grades"
          isCollapsed={isCollapsed}
          setIsCollapsed={setIsCollapsed}
        />
        <div className={`${styles.main} ${isCollapsed ? styles.collapsed : ""}`}>
          <StudentHeader
            isCollapsed={isCollapsed}
            onMenuToggle={() => setIsCollapsed(!isCollapsed)}
          />
          <div className={styles.pageContent}>
            <div className={styles.error}>
              <h3>Error Loading Grades</h3>
              <p>{error}</p>
              <button onClick={() => window.location.reload()} className={styles.retryButton}>
                Try Again
              </button>
            </div>
          </div>
        </div>
      </div>
    );
  }

  if (!grades) {
    return (
      <div className={styles.layout}>
        <StudentSidebar
          activeItem="grades"
          isCollapsed={isCollapsed}
          setIsCollapsed={setIsCollapsed}
        />
        <div className={`${styles.main} ${isCollapsed ? styles.collapsed : ""}`}>
          <StudentHeader
            isCollapsed={isCollapsed}
            onMenuToggle={() => setIsCollapsed(!isCollapsed)}
          />
          <div className={styles.pageContent}>
            <div className={styles.noGrades}>
              <h3>📊 No Grades Available</h3>
              <p>Your grades haven't been uploaded yet. Please check back later or contact your teacher.</p>
            </div>
          </div>
        </div>
      </div>
    );
  }

  const subjects = Object.keys(grades.subjects || {});
  const totalMarks = Object.values(grades.subjects).reduce((sum, mark) => sum + (Number(mark) || 0), 0);
  const maxMarks = subjects.length * 100;
  const percentage = maxMarks > 0 ? ((totalMarks / maxMarks) * 100).toFixed(2) : 0;
  const overallGrade = getGradeLetter(percentage);

  return (
    <div className={styles.layout}>
      <StudentSidebar
        activeItem="grades"
        isCollapsed={isCollapsed}
        setIsCollapsed={setIsCollapsed}
      />
      
      <div className={`${styles.main} ${isCollapsed ? styles.collapsed : ""}`}>
        <StudentHeader
          isCollapsed={isCollapsed}
          onMenuToggle={() => setIsCollapsed(!isCollapsed)}
        />
        
        <div className={styles.pageContent}>
          <div className={styles.container}>
            <div className={styles.header}>
              <h2>🎓 My Grades</h2>
              <p>Academic Performance Report</p>
            </div>

            {studentInfo && (
              <div className={styles.studentCard}>
                <h3>Student Information</h3>
                <div className={styles.studentDetails}>
                  <p><strong>Name:</strong> {studentInfo.firstName} {studentInfo.lastName}</p>
                  <p><strong>Roll No:</strong> {studentInfo.acceptedStudentId}</p>
                  <p><strong>Email:</strong> {studentInfo.loginEmail}</p>
                  {grades.updatedAt && (
                    <p><strong>Last Updated:</strong> {new Date(grades.updatedAt).toLocaleString()}</p>
                  )}
                </div>
              </div>
            )}

            <div className={styles.summarySection}>
              <div className={styles.summaryCard}>
                <h4>📈 Overall Performance</h4>
                <div className={styles.performanceStats}>
                  <div className={styles.stat}>
                    <span className={styles.statValue}>{totalMarks}</span>
                    <span className={styles.statLabel}>Total Marks</span>
                  </div>
                  <div className={styles.stat}>
                    <span className={styles.statValue}>{percentage}%</span>
                    <span className={styles.statLabel}>Percentage</span>
                  </div>
                  <div className={styles.stat}>
                    <span 
                      className={styles.statValue}
                      style={{ color: getGradeColor(percentage) }}
                    >
                      {overallGrade}
                    </span>
                    <span className={styles.statLabel}>Overall Grade</span>
                  </div>
                </div>
              </div>
            </div>

            <div className={styles.gradesSection}>
              <h3>📚 Subject-wise Performance</h3>
              <div className={styles.gradesGrid}>
                {subjects.map((subject) => {
                  const mark = Number(grades.subjects[subject]) || 0;
                  const grade = getGradeLetter(mark);
                  return (
                    <div key={subject} className={styles.gradeCard}>
                      <div className={styles.gradeCardHeader}>
                        <h4>{subject}</h4>
                        <span 
                          className={styles.gradeBadge}
                          style={{ backgroundColor: getGradeColor(mark) }}
                        >
                          {grade}
                        </span>
                      </div>
                      <div className={styles.gradeCardBody}>
                        <div className={styles.markDisplay}>
                          <span className={styles.mark}>{mark}</span>
                          <span className={styles.maxMark}>/ 100</span>
                        </div>
                        <div 
                          className={styles.progressBar}
                          style={{ backgroundColor: getGradeColor(mark) + '20' }}
                        >
                          <div 
                            className={styles.progressFill}
                            style={{ 
                              width: `${mark}%`,
                              backgroundColor: getGradeColor(mark)
                            }}
                          ></div>
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>

            <div className={styles.detailedSection}>
              <h3>📋 Detailed Report</h3>
              <table className={styles.gradesTable}>
                <thead>
                  <tr>
                    <th>Subject</th>
                    <th>Marks Obtained</th>
                    <th>Maximum Marks</th>
                    <th>Percentage</th>
                    <th>Grade</th>
                  </tr>
                </thead>
                <tbody>
                  {subjects.map((subject) => {
                    const mark = Number(grades.subjects[subject]) || 0;
                    const subjectPercentage = (mark / 100 * 100).toFixed(1);
                    const grade = getGradeLetter(mark);
                    return (
                      <tr key={subject}>
                        <td><strong>{subject}</strong></td>
                        <td>{mark}</td>
                        <td>100</td>
                        <td>{subjectPercentage}%</td>
                        <td>
                          <span 
                            className={styles.tableGrade}
                            style={{ color: getGradeColor(mark) }}
                          >
                            {grade}
                          </span>
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
                <tfoot>
                  <tr className={styles.totalRow}>
                    <td><strong>Total</strong></td>
                    <td><strong>{totalMarks}</strong></td>
                    <td><strong>{maxMarks}</strong></td>
                    <td><strong>{percentage}%</strong></td>
                    <td>
                      <strong style={{ color: getGradeColor(percentage) }}>
                        {overallGrade}
                      </strong>
                    </td>
                  </tr>
                </tfoot>
              </table>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default StudentGrades;