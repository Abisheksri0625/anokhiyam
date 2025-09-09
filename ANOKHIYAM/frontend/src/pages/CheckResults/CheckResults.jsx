import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import styles from './CheckResults.module.css';
import { Eye, EyeSlash, ArrowLeft, Shield } from 'phosphor-react';
import { resultsService } from '../../services/resultsService';
import Logo from '../../assets/logo.png';

const CheckResults = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    institutionCode: '',
    uid: '',
    dob: ''
  });
  const [showDob, setShowDob] = useState(false);
  const [loading, setLoading] = useState(false);
  const [errors, setErrors] = useState({});

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
    
    // Clear error when user starts typing
    if (errors[name]) {
      setErrors(prev => ({
        ...prev,
        [name]: ''
      }));
    }
    if (errors.general) {
      setErrors(prev => ({
        ...prev,
        general: ''
      }));
    }
  };

  const validateForm = () => {
    const newErrors = {};
    
    if (!formData.institutionCode.trim()) {
      newErrors.institutionCode = 'Institution code is required';
    }
    
    if (!formData.uid.trim()) {
      newErrors.uid = 'Student UID is required';
    }
    
    if (!formData.dob) {
      newErrors.dob = 'Date of birth is required';
    }
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!validateForm()) return;
    
    setLoading(true);
    
    try {
      console.log('Checking results for:', formData);
      
      const result = await resultsService.getStudentResult(
        formData.institutionCode.trim(),
        formData.uid.trim(),
        formData.dob
      );
      
      if (result) {
        console.log('Result found:', result);
        navigate('/result-display', { 
          state: { 
            studentData: formData,
            resultData: result,
            studentName: result.studentName,
            uid: result.uid
          } 
        });
      } else {
        setErrors({ 
          general: 'No result found. Please verify your Institution Code, UID, and Date of Birth.' 
        });
      }
    } catch (error) {
      console.error('Error fetching result:', error);
      setErrors({ 
        general: 'Unable to fetch results at this time. Please try again later.' 
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className={styles.container}>
      <div className={styles.backgroundPattern}></div>
      
      {/* Header */}
      <header className={styles.header}>
        <button 
          onClick={() => navigate('/')} 
          className={styles.backButton}
        >
          <ArrowLeft size={18} weight="bold" />
          Back to Home
        </button>
        <div className={styles.logo}>
          <img src={Logo} alt="Anokhiyam Logo" className={styles.logoImage} />
        </div>
      </header>

      {/* Main Content */}
      <div className={styles.mainContent}>
        <div className={styles.formCard}>
          <div className={styles.formHeader}>
            <div className={styles.iconWrapper}>
              <Shield size={32} weight="light" />
            </div>
            <h1 className={styles.title}>Check Results</h1>
            <p className={styles.subtitle}>Enter your credentials to access entrance exam results</p>
          </div>

          {/* General Error Display */}
          {errors.general && (
            <div className={styles.errorAlert}>
              {errors.general}
            </div>
          )}

          <form onSubmit={handleSubmit} className={styles.form}>
            <div className={styles.inputGroup}>
              <input
                type="text"
                name="institutionCode"
                value={formData.institutionCode}
                onChange={handleInputChange}
                className={`${styles.input} ${errors.institutionCode ? styles.inputError : ''}`}
                placeholder="Institution Code (e.g., DEMO001)"
                disabled={loading}
              />
              {errors.institutionCode && (
                <span className={styles.errorText}>{errors.institutionCode}</span>
              )}
            </div>

            <div className={styles.inputGroup}>
              <input
                type="text"
                name="uid"
                value={formData.uid}
                onChange={handleInputChange}
                className={`${styles.input} ${errors.uid ? styles.inputError : ''}`}
                placeholder="Student UID (e.g., ST001)"
                disabled={loading}
              />
              {errors.uid && (
                <span className={styles.errorText}>{errors.uid}</span>
              )}
            </div>

            <div className={styles.inputGroup}>
              <div className={styles.passwordWrapper}>
                <input
                  type={showDob ? 'date' : 'password'}
                  name="dob"
                  value={formData.dob}
                  onChange={handleInputChange}
                  className={`${styles.input} ${styles.passwordInput} ${errors.dob ? styles.inputError : ''}`}
                  placeholder={showDob ? '' : 'Date of Birth (YYYY-MM-DD)'}
                  disabled={loading}
                />
                <button
                  type="button"
                  onClick={() => setShowDob(!showDob)}
                  className={styles.eyeButton}
                  disabled={loading}
                >
                  {showDob ? <EyeSlash size={16} /> : <Eye size={16} />}
                </button>
              </div>
              {errors.dob && (
                <span className={styles.errorText}>{errors.dob}</span>
              )}
            </div>

            <div className={styles.infoBox}>
              <h4>How to check your results:</h4>
              <ul>
                <li>Enter the Institution Code provided by your college</li>
                <li>Enter your unique Student UID</li>
                <li>Enter your Date of Birth as password</li>
                <li>Click "Check Results" to view your entrance exam results</li>
              </ul>
            </div>

            <button 
              type="submit" 
              className={styles.submitButton}
              disabled={loading}
            >
              {loading ? (
                <div className={styles.loadingContent}>
                  <div className={styles.spinner}></div>
                  Checking Results...
                </div>
              ) : (
                'Check Results'
              )}
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default CheckResults;
