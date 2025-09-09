import React from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import styles from './ResultDisplay.module.css';
import { 
  ArrowLeft, 
  Download, 
  Trophy, 
  CheckCircle, 
  XCircle,
  Calendar,
  User,
  Hash,
  ArrowRight
} from 'phosphor-react';
import Logo from '../../assets/logo.png';

const ResultDisplay = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { studentData, resultData, studentName, uid } = location.state || {};

  const handleProceedToAdmission = () => {
    navigate('/admission-form', {
      state: {
        studentData,
        resultData,
        studentName,
        uid
      }
    });
  };

  const handleDownload = () => {
    // Generate downloadable result
    const resultContent = `
ANOKHIYAM ENTRANCE EXAM RESULT
==============================

Student Name: ${resultData.studentName}
Student UID: ${resultData.uid}
Institution Code: ${studentData.institutionCode}
Date of Birth: ${resultData.dob}

SUBJECT WISE RESULTS:
${resultData.subjects.map(subject => 
  `${subject.name}: ${subject.marks}/100`
).join('\n')}

OVERALL RESULT:
Total Marks: ${resultData.obtainedMarks}/${resultData.totalMarks}
Percentage: ${resultData.percentage}%
Result: ${resultData.result}

Generated on: ${new Date().toLocaleDateString()}
    `;

    const blob = new Blob([resultContent], { type: 'text/plain' });
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `${resultData.uid}_result.txt`;
    a.click();
    window.URL.revokeObjectURL(url);
  };

  if (!studentData || !resultData) {
    navigate('/check-results');
    return null;
  }

  const isPassed = resultData.result === 'PASS' && resultData.percentage >= 35;
  const publishDate = resultData.publishDate?.toDate?.() || new Date(resultData.publishDate);

  return (
    <div className={styles.container}>
      <div className={styles.backgroundPattern}></div>
      
      {/* Header */}
      <header className={styles.header}>
        <button 
          onClick={() => navigate('/check-results')} 
          className={styles.backButton}
        >
          <ArrowLeft size={18} weight="bold" />
          Back
        </button>
        <div className={styles.logo}>
          <img src={Logo} alt="Anokhiyam Logo" className={styles.logoImage} />
        </div>
        <button onClick={handleDownload} className={styles.downloadButton}>
          <Download size={18} weight="bold" />
          Download
        </button>
      </header>

      <div className={styles.mainContent}>
        <div className={styles.resultContainer}>
          {/* Result Header */}
          <div className={styles.resultHeader}>
            <div className={styles.statusWrapper}>
              <div className={`${styles.statusIcon} ${isPassed ? styles.passIcon : styles.failIcon}`}>
                {isPassed ? 
                  <Trophy size={32} weight="light" /> : 
                  <XCircle size={32} weight="light" />
                }
              </div>
              <div className={styles.statusContent}>
                <h1 className={styles.resultTitle}>Entrance Exam Results</h1>
                <div className={`${styles.resultStatus} ${isPassed ? styles.passStatus : styles.failStatus}`}>
                  {resultData.result} - {resultData.percentage}%
                </div>
              </div>
            </div>
          </div>

          {/* Student Info */}
          <div className={styles.studentInfo}>
            <div className={styles.infoCard}>
              <div className={styles.infoRow}>
                <div className={styles.infoItem}>
                  <User size={16} />
                  <span>{resultData.studentName}</span>
                </div>
                <div className={styles.infoItem}>
                  <Hash size={16} />
                  <span>{resultData.uid}</span>
                </div>
                <div className={styles.infoItem}>
                  <Calendar size={16} />
                  <span>{publishDate.toLocaleDateString('en-IN')}</span>
                </div>
              </div>
            </div>
          </div>

          {/* Results Content */}
          <div className={styles.resultsContent}>
            {/* Overall Score */}
            <div className={styles.scoreSection}>
              <div className={`${styles.scoreCard} ${isPassed ? styles.passCard : styles.failCard}`}>
                <div className={styles.scoreNumber}>{resultData.percentage}%</div>
                <div className={styles.scoreLabel}>
                  {resultData.obtainedMarks} / {resultData.totalMarks}
                </div>
                <div className={styles.scoreStatus}>{resultData.result}</div>
              </div>
            </div>

            {/* Subject Results */}
            <div className={styles.subjectsSection}>
              <h3 className={styles.sectionTitle}>Subject-wise Results</h3>
              <div className={styles.subjectsList}>
                {resultData.subjects?.map((subject, index) => {
                  const subjectPercentage = (subject.marks / 100) * 100;
                  const subjectPassed = subject.marks >= 35;
                  
                  return (
                    <div key={index} className={styles.subjectCard}>
                      <div className={styles.subjectHeader}>
                        <span className={styles.subjectName}>{subject.name}</span>
                        <span className={`${styles.subjectStatus} ${subjectPassed ? styles.pass : styles.fail}`}>
                          {subjectPassed ? 'PASS' : 'FAIL'}
                        </span>
                      </div>
                      <div className={styles.subjectDetails}>
                        <span className={styles.subjectMarks}>{subject.marks}/100</span>
                        <span className={styles.subjectPercentage}>{subjectPercentage}%</span>
                      </div>
                      <div className={styles.progressBar}>
                        <div 
                          className={`${styles.progressFill} ${subjectPassed ? styles.passProgress : styles.failProgress}`}
                          style={{ width: `${Math.min(subjectPercentage, 100)}%` }}
                        ></div>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          </div>

          {/* Action Section */}
          {isPassed ? (
            <div className={styles.actionSection}>
              <div className={styles.congratsMessage}>
                <CheckCircle size={20} weight="bold" />
                <span>Congratulations! You have qualified for admission.</span>
              </div>
              <button 
                onClick={handleProceedToAdmission}
                className={styles.admissionButton}
              >
                Proceed to Admission Form
                <ArrowRight size={16} weight="bold" />
              </button>
            </div>
          ) : (
            <div className={styles.failureSection}>
              <div className={styles.failureMessage}>
                <XCircle size={20} weight="bold" />
                <div className={styles.failureText}>
                  <span>Unfortunately, you did not meet the minimum requirements.</span>
                  <span>Minimum required: 35% overall</span>
                </div>
              </div>
            </div>
          )}

        </div>
      </div>
    </div>
  );
};

export default ResultDisplay;
