import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import { useFeatures } from '../../hooks/useFeatures';
import styles from './Login.module.css';

const Login = () => {
  const navigate = useNavigate();
  const { currentUser, login, logout, authInitialized, setLoginTime, getUserRoles } = useAuth();
  
  const [formData, setFormData] = useState({
    institutionCode: '', // Start empty - user must enter
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

  // Use features hook with dynamic institution code
  const { 
    config, 
    loading: featuresLoading, 
    error: configError,
    hasRole, 
    getEnabledRoles, 
    getBranding,
    loadConfigByCode 
  } = useFeatures(formData.institutionCode);

  // Define all possible roles
  const roles = [
    { value: 'student', label: 'Student' },
    { value: 'teacher', label: 'Teacher' },
    { value: 'admin', label: 'Admin' },
    { value: 'librarian', label: 'Librarian' },
    { value: 'hostel_warden', label: 'Hostel Warden' }
  ];

  // Handle institution code validation
  const handleInstitutionCodeChange = async (e) => {
    const code = e.target.value;
    setFormData(prev => ({ ...prev, institutionCode: code, role: '' })); // Reset role when code changes
    setCodeValidated(false);
    
    // Clear previous errors
    if (errors.institutionCode) {
      setErrors(prev => ({ ...prev, institutionCode: '' }));
    }

    // Load config when user finishes typing (after 500ms delay)
    if (code.length >= 3) {
      setTimeout(() => {
        if (formData.institutionCode === code) {
          loadConfigByCode(code);
        }
      }, 500);
    }
  };

  // Validate institution code when config loads
  useEffect(() => {
    if (config && !configError) {
      setCodeValidated(true);
      console.log('✅ Institution code validated:', config.name);
    } else if (configError && formData.institutionCode) {
      setCodeValidated(false);
      setErrors(prev => ({ ...prev, institutionCode: configError }));
    }
  }, [config, configError, formData.institutionCode]);

  // Get available roles for this university (only show if code is validated)
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
    
    // Clear errors when user starts typing/selecting
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
    
    // ✅ ALWAYS VALIDATE EMAIL AND PASSWORD
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
    
    if (!validateForm()) {
      return;
    }

    setLoading(true);
    setErrors({});
    
    try {
      console.log('🔐 Attempting login with credentials:', {
        email: formData.email,
        role: formData.role,
        institutionCode: formData.institutionCode
      });
      
      const { userCredential, userData } = await login(
        formData.email, 
        formData.password, 
        formData.role, 
        formData.rememberMe
      );
      
      console.log('✅ Login successful:', {
        user: userCredential.user.email,
        role: userData.role,
        displayName: userData.displayName
      });
      
      // Store role and login time
      localStorage.setItem('userRole', formData.role);
      setLoginTime();
      
      // Navigate to appropriate dashboard
      redirectToDashboard(formData.role);
      
    } catch (error) {
      console.error('❌ Login error:', error);
      
      let errorMessage = 'Login failed. Please try again.';
      
      // Handle Firebase Auth errors
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

  // Get university branding for dynamic styling
  const branding = getBranding();

  // Show loading while features are being loaded
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
        <div className={styles.header}>
          <div className={styles.logo}>
            <span className={styles.logoText}>ANOKHIYAM</span>
          </div>
          <button className={styles.closeBtn} onClick={handleClose}>
            <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M18 6L6 18M6 6L18 18" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
            </svg>
          </button>
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

          {/* Show university info when code is validated */}
          {codeValidated && config && (
            <div className={styles.universityInfo} style={{ 
              backgroundColor: branding.primaryColor + '10',
              borderColor: branding.primaryColor 
            }}>
              <h3>✅ {config.name}</h3>
              <p>Package: {config.package} | Available Roles: {getEnabledRoles().join(', ')}</p>
            </div>
          )}

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
                  className={`${styles.input} ${errors.institutionCode ? styles.inputError : ''} ${codeValidated ? styles.inputSuccess : ''}`}
                />
                {featuresLoading && (
                  <div className={styles.loadingSpinner}>⏳</div>
                )}
                {codeValidated && (
                  <div className={styles.successIcon}>✅</div>
                )}
              </div>
              <p className={styles.helpText}>
                {codeValidated 
                  ? `Connected to ${config.name}` 
                  : 'Provided by your institution administration'
                }
              </p>
              {errors.institutionCode && <span className={styles.errorText}>{errors.institutionCode}</span>}
            </div>

            {/* Role dropdown */}
            <div className={styles.formGroup}>
              <label className={styles.label}>Role</label>
              <div className={styles.selectGroup}>
                <select
                  name="role"
                  value={formData.role}
                  onChange={handleInputChange}
                  className={`${styles.select} ${errors.role ? styles.inputError : ''}`}
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
              </div>
              {codeValidated && (
                <p className={styles.helpText}>
                  Available roles: {getFilteredRoles().map(r => r.label).join(', ')}
                </p>
              )}
              {errors.role && <span className={styles.errorText}>{errors.role}</span>}
            </div>

            {/* ✅ EMAIL FIELD - ALWAYS SHOW */}
            <div className={styles.formGroup}>
              <label className={styles.label}>Email Address</label>
              <div className={styles.inputGroup}>
                <div className={styles.inputIcon}>
                  <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M16 7C16 9.20914 14.2091 11 12 11C9.79086 11 8 9.20914 8 7C8 4.79086 9.79086 3 12 3C14.2091 3 16 4.79086 16 7Z" stroke="currentColor" strokeWidth="2"/>
                    <path d="M12 14C8.13401 14 5 17.134 5 21H19C19 17.134 15.866 14 12 14Z" stroke="currentColor" strokeWidth="2"/>
                  </svg>
                </div>
                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleInputChange}
                  placeholder="Your email address"
                  className={`${styles.input} ${errors.email ? styles.inputError : ''}`}
                  required
                />
              </div>
              {errors.email && <span className={styles.errorText}>{errors.email}</span>}
            </div>

            {/* ✅ PASSWORD FIELD - ALWAYS SHOW */}
            <div className={styles.formGroup}>
              <label className={styles.label}>Password</label>
              <div className={styles.inputGroup}>
                <div className={styles.inputIcon}>
                  <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <rect x="3" y="11" width="18" height="11" rx="2" ry="2" stroke="currentColor" strokeWidth="2"/>
                    <circle cx="12" cy="16" r="1" fill="currentColor"/>
                    <path d="M7 11V7C7 4.79086 8.79086 3 11 3H13C15.2091 3 17 4.79086 17 7V11" stroke="currentColor" strokeWidth="2"/>
                  </svg>
                </div>
                <input
                  type={showPassword ? 'text' : 'password'}
                  name="password"
                  value={formData.password}
                  onChange={handleInputChange}
                  placeholder="Your password"
                  className={`${styles.input} ${errors.password ? styles.inputError : ''}`}
                  required
                />
                <button
                  type="button"
                  className={styles.passwordToggle}
                  onClick={() => setShowPassword(!showPassword)}
                >
                  <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                    {showPassword ? (
                      <path d="M17.94 17.94C16.2306 19.243 14.1491 19.9649 12 20C5 20 2 12 2 12C2.24389 11.5136 2.56446 10.9421 2.97847 10.2916M9.9 4.24C10.5883 4.0789 11.2931 3.99836 12 4C19 4 22 12 22 12C21.393 13.1356 20.6691 14.2048 19.84 15.19M14.12 14.12C13.8454 14.4148 13.5141 14.6512 13.1462 14.8151C12.7782 14.9791 12.3809 15.0673 11.9781 15.0744C11.5753 15.0815 11.1749 15.0074 10.8016 14.8565C10.4283 14.7056 10.0887 14.481 9.80385 14.1962C9.51900 13.9113 9.29439 13.5717 9.14351 13.1984C8.99262 12.8251 8.91853 12.4247 8.92563 12.0219C8.93274 11.6191 9.02091 11.2218 9.18488 10.8538C9.34884 10.4858 9.58525 10.1546 9.88 9.88" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
                    ) : (
                      <>
                        <path d="M1 12S4 4 12 4S23 12 23 12S20 20 12 20S1 12 1 12Z" stroke="currentColor" strokeWidth="2"/>
                        <circle cx="12" cy="12" r="3" stroke="currentColor" strokeWidth="2"/>
                      </>
                    )}
                  </svg>
                </button>
              </div>
              {errors.password && <span className={styles.errorText}>{errors.password}</span>}
            </div>

            {/* ✅ REMEMBER ME - ALWAYS SHOW */}
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

            {/* Submit Button */}
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
