import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { checkStudentResult, getUniversityConfig } from "../../services/firestoreService";

import styles from './CheckResults.module.css';

const CheckResults = () => {
  const navigate = useNavigate();
  const [step, setStep] = useState(1); // 1: Form, 2: Results
  const [formData, setFormData] = useState({
    institutionCode: '',
    studentId: '',
    rollNumber: '',
    dateOfBirth: ''
  });
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [result, setResult] = useState(null);
  const [institutionInfo, setInstitutionInfo] = useState(null);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
    setError('');
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!formData.institutionCode || !formData.studentId || !formData.rollNumber || !formData.dateOfBirth) {
      setError('Please fill all fields');
      return;
    }

    setIsLoading(true);
    setError('');
    
    try {
      // First verify institution exists
      const institution = await getUniversityConfig(formData.institutionCode);
      if (!institution) {
        setError('Invalid institution code. Please check and try again.');
        setIsLoading(false);
        return;
      }
      
      setInstitutionInfo({
        name: institution.name || institution.institutionName || 'Institution',
        code: formData.institutionCode
      });
      
      // Check student result in Firebase
      const resultData = await checkStudentResult(
        formData.institutionCode,
        formData.studentId,
        formData.rollNumber,
        formData.dateOfBirth
      );
      
      if (!resultData.found) {
        setError('No results found for the provided details. Please verify your information.');
        setIsLoading(false);
        return;
      }
      
      setResult(resultData.studentData);
      setStep(2);
      
    } catch (error) {
      console.error('Error checking results:', error);
      setError('Error checking results. Please try again later.');
    } finally {
      setIsLoading(false);
    }
  };

  const handleBackToForm = () => {
    setStep(1);
    setResult(null);
    setError('');
  };

  const handleBackToHome = () => {
    navigate('/');
  };

  const proceedToAdmission = () => {
    navigate('/admission-form', { 
      state: { 
        institutionCode: formData.institutionCode,
        institutionName: institutionInfo?.name,
        studentId: formData.studentId,
        rollNumber: formData.rollNumber,
        studentName: result?.studentName,
        examResult: result
      }
    });
  };

  if (step === 2 && result) {
    return (
      <div className={styles.container}>
        <div className={styles.header}>
          <div className={styles.logo}>ANOKHIYAM</div>
          <button onClick={handleBackToHome} className={styles.backBtn}>
            Back
          </button>
        </div>

        <div className={styles.resultContainer}>
          <div className={styles.institutionHeader}>
            <h2>{institutionInfo?.name}</h2>
          </div>

          <div className={styles.resultContent}>
            <h1>Examination Results</h1>
            
            <div className={styles.studentDetails}>
              <div className={styles.detailRow}>
                <span>Student Name:</span>
                <span>{result.studentName}</span>
              </div>
              <div className={styles.detailRow}>
                <span>Student ID:</span>
                <span>{result.studentId}</span>
              </div>
              <div className={styles.detailRow}>
                <span>Roll Number:</span>
                <span>{result.rollNumber}</span>
              </div>
            </div>

            <div className={styles.marksSection}>
              <h3>Subject-wise Results</h3>
              {result.subjects && result.subjects.map(subject => (
                <div key={subject} className={styles.subjectRow}>
                  <span>{subject}</span>
                  <span>{result.subjectMarks && result.subjectMarks[subject]} / 100</span>
                </div>
              ))}
              <div className={styles.totalRow}>
                <span><strong>Total</strong></span>
                <span><strong>{result.totalMarks} / {result.subjects?.length * 100}</strong></span>
              </div>
              <div className={styles.percentageRow}>
                <span><strong>Percentage</strong></span>
                <span><strong>{result.percentage}%</strong></span>
              </div>
            </div>

            <div className={`${styles.resultStatus} ${result.result === 'Pass' ? styles.passed : styles.failed}`}>
              <h2>{result.result}</h2>
              <p>
                {result.result === 'Pass'
                  ? 'Congratulations! You have successfully passed the entrance examination.'
                  : 'Unfortunately, you did not meet the minimum requirements.'
                }
              </p>
            </div>

            <div className={styles.actionButtons}>
              <button onClick={handleBackToForm} className={styles.secondaryBtn}>
                Check Another Result
              </button>
              {result.result === 'Pass' && (
                <button onClick={proceedToAdmission} className={styles.primaryBtn}>
                  Proceed to Admission
                </button>
              )}
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className={styles.container}>
      <div className={styles.header}>
        <div className={styles.logo}>ANOKHIYAM</div>
        <button onClick={handleBackToHome} className={styles.backBtn}>
          Back
        </button>
      </div>

      <div className={styles.formWrapper}>
        <div className={styles.formContainer}>
          <h1 className={styles.title}>Check Your Exam Results</h1>
          <p className={styles.subtitle}>
            Enter your details below to view your academic results and performance summary
          </p>

          <form className={styles.form} onSubmit={handleSubmit}>
            <div className={styles.inputGroup}>
              <label>Institution Code</label>
              <input
                type="text"
                name="institutionCode"
                placeholder="Enter your institution code (e.g., ANOKHIYAM2024)"
                value={formData.institutionCode}
                onChange={handleInputChange}
                className={styles.input}
                required
              />
            </div>

            <div className={styles.inputGroup}>
              <label>Student ID</label>
              <input
                type="text"
                name="studentId"
                placeholder="Enter your student ID"
                value={formData.studentId}
                onChange={handleInputChange}
                className={styles.input}
                required
              />
            </div>

            <div className={styles.inputGroup}>
              <label>Roll Number</label>
              <input
                type="text"
                name="rollNumber"
                placeholder="Enter your examination roll number"
                value={formData.rollNumber}
                onChange={handleInputChange}
                className={styles.input}
                required
              />
            </div>

            <div className={styles.inputGroup}>
              <label>Date of Birth</label>
              <input
                type="date"
                name="dateOfBirth"
                value={formData.dateOfBirth}
                onChange={handleInputChange}
                className={styles.input}
                required
              />
            </div>

            {error && <div className={styles.error}>{error}</div>}

            <button 
              type="submit" 
              className={styles.submitBtn} 
              disabled={isLoading}
            >
              {isLoading ? 'Checking Results...' : 'Check Results'}
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default CheckResults;
