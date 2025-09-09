import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import { useFeatures } from '../../hooks/useFeatures';
import logo from '../../assets/logo.png';
import styles from './Login.module.css';

const Login = () => {
  const navigate = useNavigate();
  const { currentUser, login, logout, authInitialized, setLoginTime, getUserRoles } = useAuth();
  
  const [formData, setFormData] = useState({
    institutionCode: '',
    role: '',
    email: '',
    password: '',
    rememberMe: false
  });
  
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [errors, setErrors] = useState({});
  const [availableRoles, setAvailableRoles] = useState([]);
  const [codeValidated, setCodeValidated] = useState(false);

  const { 
    config, 
    loading: featuresLoading, 
    error: configError,
    hasRole, 
    getEnabledRoles, 
    getBranding,
    loadConfigByCode 
  } = useFeatures(formData.institutionCode);

  const roles = [
    { value: 'student', label: 'Student' },
    { value: 'teacher', label: 'Teacher' },
    { value: 'admin', label: 'Admin' },
    { value: 'librarian', label: 'Librarian' },
    { value: 'hostel_warden', label: 'Hostel Warden' }
  ];

  const handleInstitutionCodeChange = async (e) => {
    const code = e.target.value;
    setFormData(prev => ({ ...prev, institutionCode: code, role: '' }));
    setCodeValidated(false);
    
    if (errors.institutionCode) {
      setErrors(prev => ({ ...prev, institutionCode: '' }));
    }

    if (code.length >= 3) {
      setTimeout(() => {
        if (formData.institutionCode === code) {
          loadConfigByCode(code);
        }
      }, 500);
    }
  };

  useEffect(() => {
    if (config && !configError) {
      setCodeValidated(true);
      console.log('✅ Institution code validated:', config.name);
    } else if (configError && formData.institutionCode) {
      setCodeValidated(false);
      setErrors(prev => ({ ...prev, institutionCode: configError }));
    }
  }, [config, configError, formData.institutionCode]);

  const getFilteredRoles = () => {
    if (!codeValidated || featuresLoading) return [];
    
    if (currentUser && availableRoles.length > 0) {
      return roles.filter(role => 
        availableRoles.includes(role.value) && hasRole(role.value)
      );
    }
    
    return roles.filter(role => hasRole(role.value));
  };

  const handleInputChange = (e) => {
    const { name, value, type, checked } = e.target;
    
    if (name === 'institutionCode') {
      handleInstitutionCodeChange(e);
      return;
    }
    
    setFormData(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value
    }));
    
    if (errors[name]) {
      setErrors(prev => ({ ...prev, [name]: '' }));
    }
  };

  const validateForm = () => {
    const newErrors = {};
    
    if (!formData.institutionCode) {
      newErrors.institutionCode = 'Institution code is required';
    } else if (!codeValidated) {
      newErrors.institutionCode = 'Please enter a valid institution code';
    }
    
    if (!formData.role) {
      newErrors.role = 'Please select your role';
    }
    
    if (!formData.email) {
      newErrors.email = 'Email is required';
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = 'Email address is invalid';
    }
    
    if (!formData.password) {
      newErrors.password = 'Password is required';
    } else if (formData.password.length < 6) {
      newErrors.password = 'Password must be at least 6 characters';
    }
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!validateForm()) return;

    setLoading(true);
    setErrors({});
    
    try {
      const { userCredential, userData } = await login(
        formData.email, 
        formData.password, 
        formData.role, 
        formData.rememberMe
      );
      
      localStorage.setItem('userRole', formData.role);
      setLoginTime();
      redirectToDashboard(formData.role);
      
    } catch (error) {
      let errorMessage = 'Login failed. Please try again.';
      
      if (error.code) {
        switch (error.code) {
          case 'auth/user-not-found': 
            errorMessage = 'No account found with this email address'; 
            break;
          case 'auth/wrong-password': 
            errorMessage = 'Incorrect password'; 
            break;
          case 'auth/invalid-email': 
            errorMessage = 'Invalid email address'; 
            break;
          case 'auth/too-many-requests': 
            errorMessage = 'Too many failed attempts. Please try again later'; 
            break;
          case 'auth/user-disabled': 
            errorMessage = 'This account has been disabled'; 
            break;
          case 'auth/invalid-credential': 
            errorMessage = 'Invalid email or password'; 
            break;
          default: 
            errorMessage = error.message;
        }
      } else {
        errorMessage = error.message;
      }
      
      setErrors({ general: errorMessage });
    } finally {
      setLoading(false);
    }
  };

  const redirectToDashboard = (role) => {
    const dashboardRoutes = {
      'student': '/student-dashboard',
      'teacher': '/teacher-dashboard', 
      'admin': '/admin-dashboard',
      'librarian': '/librarian-dashboard',
      'hostel_warden': '/hostel-dashboard'
    };
    
    navigate(dashboardRoutes[role] || '/student-dashboard');
  };

  const handleClose = () => {
    navigate('/');
  };

  const branding = getBranding();

  if (featuresLoading) {
    return (
      <div style={{
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        height: '100vh',
        fontFamily: 'Poppins, sans-serif'
      }}>
        <div>Loading university configuration...</div>
      </div>
    );
  }

  return (
    <div className={styles.loginContainer}>
      <div className={styles.leftPanel}>
        <img src={logo} alt="Anokhiyam Logo" className={styles.logo} />
        <div className={styles.welcomeSection}>
          <div className={styles.welcomeCard}>
            <h2 className={styles.welcomeTitle}>Welcome Back!</h2>
            <p className={styles.welcomeText}>
              Access your academic portal with ease and discover endless possibilities for learning and growth.
            </p>
          </div>
        </div>
      </div>

      <div className={styles.rightPanel}>
        <div className={styles.formContainer}>
          <div className={styles.formHeader}>
            <h1 className={styles.title}>Sign in to your account</h1>
            <p className={styles.subtitle}>
              {config ? `${branding.welcomeMessage}` : 'Enter your institution code to begin'}
            </p>
          </div>

          {errors.general && (
            <div className={styles.errorAlert}>
              {errors.general}
            </div>
          )}

          <form className={styles.form} onSubmit={handleSubmit}>
            {/* Institution Code Input */}
            <div className={styles.formGroup}>
              <label className={styles.label}>Institution Code</label>
              <div className={styles.inputGroup}>
                <div className={styles.inputIcon}>
                  <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M3 7V17C3 18.1046 3.89543 19 5 19H19C20.1046 19 21 18.1046 21 17V7C21 5.89543 20.1046 5 19 5H5C3.89543 5 3 5.89543 3 7Z" stroke="currentColor" strokeWidth="2"/>
                    <path d="M3 7L12 13L21 7" stroke="currentColor" strokeWidth="2"/>
                  </svg>
                </div>
                <input
                  type="text"
                  name="institutionCode"
                  value={formData.institutionCode}
                  onChange={handleInputChange}
                  placeholder="Enter your institution code"
                  className={`${styles.input} ${errors.institutionCode ? styles.inputError : ''}`}
                />
                {featuresLoading && (
                  <div className={styles.loadingSpinner}>⏳</div>
                )}
              </div>
              {errors.institutionCode && <span className={styles.errorText}>{errors.institutionCode}</span>}
            </div>

            {/* Role dropdown */}
            <div className={styles.formGroup}>
              <label className={styles.label}>Role</label>
              <select
                name="role"
                value={formData.role}
                onChange={handleInputChange}
                className={`${styles.selectRole} ${errors.role ? styles.inputError : ''}`}
                disabled={!codeValidated}
                required
              >
                <option value="">
                  {codeValidated ? 'Select your role' : 'Enter institution code first'}
                </option>
                {getFilteredRoles().map(role => (
                  <option key={role.value} value={role.value}>
                    {role.label}
                  </option>
                ))}
              </select>
              {errors.role && <span className={styles.errorText}>{errors.role}</span>}
            </div>

            {/* Email */}
            <div className={styles.formGroup}>
              <label className={styles.label}>Email Address</label>
              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleInputChange}
                placeholder="Your email address"
                className={`${styles.input} ${errors.email ? styles.inputError : ''}`}
                required
              />
              {errors.email && <span className={styles.errorText}>{errors.email}</span>}
            </div>

            {/* Password */}
            <div className={styles.formGroup}>
              <label className={styles.label}>Password</label>
              <input
                type={showPassword ? 'text' : 'password'}
                name="password"
                value={formData.password}
                onChange={handleInputChange}
                placeholder="Your password"
                className={`${styles.input} ${errors.password ? styles.inputError : ''}`}
                required
              />
              {errors.password && <span className={styles.errorText}>{errors.password}</span>}
            </div>

            <div className={styles.formOptions}>
              <label className={styles.checkboxLabel}>
                <input
                  type="checkbox"
                  name="rememberMe"
                  checked={formData.rememberMe}
                  onChange={handleInputChange}
                  className={styles.checkbox}
                />
                <span className={styles.checkboxText}>Remember me</span>
              </label>
              <a href="#" className={styles.forgotLink}>Forgot password?</a>
            </div>

            <button 
              type="submit" 
              className={styles.submitBtn} 
              disabled={loading || !codeValidated}
              style={{ 
                backgroundColor: codeValidated ? branding.primaryColor : '#9ca3af'
              }}
            >
              {loading ? (
                <div className={styles.spinner}></div>
              ) : (
                'Sign in'
              )}
            </button>
          </form>

          <div className={styles.footer}>
            <span>Need access? Contact your institution administration</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
