import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import styles from './Login.module.css';

const Login = () => {
  const navigate = useNavigate();
  const { currentUser, login, logout, authInitialized, setLoginTime, getUserRoles } = useAuth();
  const [formData, setFormData] = useState({
    institutionCode: 'ANOKHIYAM2024', // Pre-filled
    role: '', // ✅ Empty string, NOT false
    email: '',
    password: '',
    rememberMe: false
  });
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [errors, setErrors] = useState({});
  const [availableRoles, setAvailableRoles] = useState([]);
  const [showRoleSelection, setShowRoleSelection] = useState(false);

  // ✅ FIXED: Correct role options matching Firestore exactly
  const roles = [
    { value: 'student', label: 'Student' },
    { value: 'teacher', label: 'Teacher' },
    { value: 'admin', label: 'Admin' },
    { value: 'librarian', label: 'Librarian' },
    { value: 'hostel_warden', label: 'Hostel Warden' } // ✅ Must match Firestore exactly
  ];

  // Check authentication state when component mounts
  useEffect(() => {
    if (authInitialized) {
      if (currentUser) {
        const storedRole = localStorage.getItem('userRole');
        if (storedRole) {
          console.log('✅ User already authenticated, redirecting to dashboard');
          redirectToDashboard(storedRole);
        } else {
          setShowRoleSelection(true);
          loadUserRoles(currentUser.email);
        }
      }
    }
  }, [currentUser, authInitialized]);

  const loadUserRoles = async (email) => {
    try {
      const userRoles = await getUserRoles(email);
      setAvailableRoles(userRoles);
      
      // If user has only one role, auto-select it
      if (userRoles.length === 1) {
        setFormData(prev => ({ ...prev, role: userRoles[0] }));
      }
    } catch (error) {
      console.error('❌ Error loading user roles:', error);
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
    
    console.log('🚀 Redirecting to dashboard:', dashboardRoutes[role]);
    navigate(dashboardRoutes[role] || '/student-dashboard');
  };

  const handleInputChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value
    }));
    
    // Clear errors when user starts typing/selecting
    if (errors[name]) {
      setErrors(prev => ({
        ...prev,
        [name]: ''
      }));
    }
  };

  const validateForm = () => {
    const newErrors = {};
    
    if (!formData.institutionCode) {
      newErrors.institutionCode = 'Institution code is required';
    }
    if (!formData.role || formData.role === '') {
      newErrors.role = 'Please select your role';
    }
    if (!currentUser) {
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
    }
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  // ✅ UPDATED: Complete handleSubmit with proper validation and debugging
  const handleSubmit = async (e) => {
    e.preventDefault();
    
    // Basic form validation
    if (!validateForm()) {
      console.error('❌ Form validation failed');
      return;
    }

    // ✅ CRITICAL: Role validation before login attempt
    if (!formData.role || formData.role === '' || formData.role === false) {
      console.error('❌ No role selected or invalid role:', formData.role);
      setErrors({ role: 'Please select a role before logging in' });
      return;
    }

    // ✅ Debug log to verify role value
    console.log('🔍 Login attempt with role:', formData.role);
    console.log('🔍 Full form data:', {
      email: formData.email,
      role: formData.role,
      institutionCode: formData.institutionCode,
      roleType: typeof formData.role
    });

    setLoading(true);
    setErrors({});
    
    try {
      // If user is already authenticated, just store role and redirect
      if (currentUser) {
        console.log('✅ User already authenticated, storing role and redirecting');
        localStorage.setItem('userRole', formData.role);
        setLoginTime();
        redirectToDashboard(formData.role);
        return;
      }

      // Otherwise, perform login with role validation
      console.log('🔐 Attempting login with credentials:', {
        email: formData.email,
        role: formData.role,
        institutionCode: formData.institutionCode
      });
      
      const { userCredential, userData } = await login(
        formData.email, 
        formData.password, 
        formData.role, // ✅ Pass the actual selected role string
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
        // Handle custom validation errors
        errorMessage = error.message;
      }
      
      setErrors({ general: errorMessage });
    } finally {
      setLoading(false);
    }
  };

  const handleSwitchUser = async () => {
    try {
      setLoading(true);
      await logout();
      setShowRoleSelection(false);
      setAvailableRoles([]);
      setFormData({
        institutionCode: 'ANOKHIYAM2024',
        role: '', // ✅ Reset to empty string
        email: '',
        password: '',
        rememberMe: false
      });
    } catch (error) {
      console.error('❌ Switch user error:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleClose = () => {
    navigate('/');
  };

  // Filter roles based on available roles for authenticated user
  const getFilteredRoles = () => {
    if (currentUser && availableRoles.length > 0) {
      return roles.filter(role => availableRoles.includes(role.value));
    }
    return roles;
  };

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
              {currentUser 
                ? 'You are logged in. Please select your authorized role to continue.' 
                : 'Use the credentials provided by your institution'
              }
            </p>
          </div>

          {currentUser && (
            <div className={styles.loggedInNotice}>
              <div className={styles.loggedInInfo}>
                <span>✅ Logged in as: {currentUser.email}</span>
                {availableRoles.length > 0 && (
                  <span className={styles.roleInfo}>
                    Authorized role: {availableRoles.join(', ')}
                  </span>
                )}
              </div>
              <button 
                type="button" 
                onClick={handleSwitchUser}
                className={styles.switchUserBtn}
                disabled={loading}
              >
                {loading ? 'Switching...' : 'Switch User'}
              </button>
            </div>
          )}

          {errors.general && (
            <div className={styles.errorAlert}>
              {errors.general}
            </div>
          )}

          <form className={styles.form} onSubmit={handleSubmit}>
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
                  placeholder="e.g., ANOKHIYAM2024"
                  className={`${styles.input} ${errors.institutionCode ? styles.inputError : ''}`}
                  readOnly
                />
              </div>
              <p className={styles.helpText}>Institution code (provided by administration)</p>
              {errors.institutionCode && <span className={styles.errorText}>{errors.institutionCode}</span>}
            </div>

            {/* ✅ FIXED: Proper Role Dropdown with Exact Values */}
            <div className={styles.formGroup}>
              <label className={styles.label}>Role</label>
              <div className={styles.selectGroup}>
                <select
                  name="role"
                  value={formData.role}
                  onChange={handleInputChange}
                  className={`${styles.select} ${errors.role ? styles.inputError : ''}`}
                  required
                >
                  <option value="">Select your role</option>
                  {getFilteredRoles().map(role => (
                    <option key={role.value} value={role.value}>
                      {role.label}
                    </option>
                  ))}
                </select>
              </div>
              {currentUser && availableRoles.length > 0 && (
                <p className={styles.helpText}>You are authorized for: {availableRoles.join(', ')}</p>
              )}
              {errors.role && <span className={styles.errorText}>{errors.role}</span>}
            </div>

            {!currentUser && (
              <>
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
                    />
                  </div>
                  {errors.email && <span className={styles.errorText}>{errors.email}</span>}
                </div>

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
              </>
            )}

            <button type="submit" className={styles.submitBtn} disabled={loading}>
              {loading ? (
                <div className={styles.spinner}></div>
              ) : (
                currentUser ? 'Continue to Dashboard' : 'Sign in'
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
