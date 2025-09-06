import React from 'react';
import { NavLink, useNavigate } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import { useFeatures } from '../../hooks/useFeatures';
import { getCurrentUniversityId } from '../../config/universityConfig';
import styles from './StudentSidebar.module.css';

const StudentSidebar = () => {
  const navigate = useNavigate();
  const { logout } = useAuth();
  const universityId = getCurrentUniversityId();
  const { hasFeature, config, loading, error } = useFeatures();

  const handleLogout = async () => {
    try {
      await logout();
      navigate('/');
    } catch (error) {
      console.error('Logout failed:', error);
    }
  };

  if (loading) {
    return (
      <div className={styles.sidebar}>
        <div className={styles.header}>
          <div className={styles.logo}>
            <span className={styles.logoText}>ANOKHIYAM</span>
            <span className={styles.portalText}>STUDENT PORTAL</span>
          </div>
        </div>
        <div className={styles.loadingMessage}>Loading menu...</div>
      </div>
    );
  }

  if (error) {
    return (
      <div className={styles.sidebar}>
        <div className={styles.header}>
          <div className={styles.logo}>
            <span className={styles.logoText}>ANOKHIYAM</span>
            <span className={styles.portalText}>STUDENT PORTAL</span>
          </div>
        </div>
        <div className={styles.errorMessage}>Error loading menu</div>
      </div>
    );
  }

  return (
    <div className={styles.sidebar}>
      <div className={styles.header}>
        <div className={styles.logo}>
          <span className={styles.logoText}>ANOKHIYAM</span>
          <span className={styles.portalText}>STUDENT PORTAL</span>
        </div>
      </div>

      <div className={styles.navigation}>
        {/* ACADEMIC SECTION */}
        <div className={styles.section}>
          <h3 className={styles.sectionTitle}>ACADEMIC</h3>
          <nav className={styles.nav}>
            <NavLink 
              to="/student-dashboard" 
              className={styles.navItem}
              end
            >
              <div className={styles.navIcon}>
                <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M3 9L12 2L21 9V20C21 20.5523 20.5523 21 20 21H4C3.44772 21 3 20.5523 3 20V9Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                  <polyline points="9,22 9,12 15,12 15,22" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
              </div>
              <span>Dashboard</span>
            </NavLink>
            
            {/* ✅ ALWAYS SHOW FOR FULL PACKAGE */}
            <NavLink to="/student-dashboard/grades" className={styles.navItem}>
              <div className={styles.navIcon}>
                <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M9 11H15M9 15H15M17 21L20 18L17 15M3 5C3 3.89543 3.89543 3 5 3H19C20.1046 3 21 3.89543 21 5V11.5M5 21H13" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
              </div>
              <span>My Grades</span>
            </NavLink>
            
            {/* ✅ ALWAYS SHOW FOR FULL PACKAGE */}
            <NavLink to="/student-dashboard/attendance" className={styles.navItem}>
              <div className={styles.navIcon}>
                <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M22 11.08V12C21.9988 14.1564 21.3005 16.2547 20.0093 17.9818C18.7182 19.7089 16.9033 20.9725 14.8354 21.5839C12.7674 22.1953 10.5573 22.1219 8.53447 21.3746C6.51168 20.6273 4.78465 19.2461 3.61096 17.4371C2.43727 15.628 1.87979 13.4881 2.02168 11.3363C2.16356 9.18457 2.99721 7.13633 4.39828 5.49707C5.79935 3.85781 7.69279 2.71537 9.79619 2.24013C11.8996 1.76488 14.1003 1.98232 16.07 2.86" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                  <polyline points="22,4 12,14.01 9,11.01" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
              </div>
              <span>Attendance</span>
            </NavLink>
            
            {/* ✅ ALWAYS SHOW FOR FULL PACKAGE */}
            <NavLink to="/student-dashboard/assignments" className={styles.navItem}>
              <div className={styles.navIcon}>
                <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M16 4H18C19.1046 4 20 4.89543 20 6V20C20 21.1046 19.1046 22 18 22H6C4.89543 22 4 21.1046 4 20V6C4 4.89543 4.89543 4 6 4H8" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                  <rect x="8" y="2" width="8" height="4" rx="1" ry="1" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                  <path d="M9 14L11 16L15 12" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
              </div>
              <span>Assignments</span>
            </NavLink>
            
            <NavLink to="/student-dashboard/schedule" className={styles.navItem}>
              <div className={styles.navIcon}>
                <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <rect x="3" y="4" width="18" height="18" rx="2" ry="2" stroke="currentColor" strokeWidth="2"/>
                  <line x1="16" y1="2" x2="16" y2="6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                  <line x1="8" y1="2" x2="8" y2="6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                  <line x1="3" y1="10" x2="21" y2="10" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
              </div>
              <span>Class Schedule</span>
            </NavLink>
            
            <NavLink to="/student-dashboard/exams" className={styles.navItem}>
              <div className={styles.navIcon}>
                <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M14.828 14.828L20.485 20.485C20.7788 20.7788 20.7788 21.2212 20.485 21.515L21.515 20.485L20.485 20.485C21.2212 20.7788 20.7788 20.7788 20.485 20.485L14.828 14.828ZM14.828 14.828C15.1102 14.546 15.2929 14.1522 15.2929 13.7396C15.2929 13.327 15.1102 12.9332 14.828 12.651L11.349 9.172C11.0668 8.8898 10.673 8.7071 10.2604 8.7071C9.8478 8.7071 9.454 8.8898 9.172 9.172L3.515 14.828C3.2212 15.1218 3.2212 15.5642 3.515 15.858L14.828 14.828Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                  <circle cx="11" cy="11" r="8" stroke="currentColor" strokeWidth="2"/>
                  <path d="M21 21L16.65 16.65" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
              </div>
              <span>Exams</span>
            </NavLink>
            
            <NavLink to="/student-dashboard/results" className={styles.navItem}>
              <div className={styles.navIcon}>
                <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <line x1="18" y1="20" x2="18" y2="10" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                  <line x1="12" y1="20" x2="12" y2="4" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                  <line x1="6" y1="20" x2="6" y2="14" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
              </div>
              <span>Results</span>
            </NavLink>
          </nav>
        </div>

        {/* SERVICES SECTION - Show for FULL package */}
        <div className={styles.section}>
          <h3 className={styles.sectionTitle}>SERVICES</h3>
          <nav className={styles.nav}>
            {/* ✅ LIBRARY - ALWAYS SHOW FOR FULL PACKAGE */}
            <NavLink to="/student-dashboard/library" className={styles.navItem}>
              <div className={styles.navIcon}>
                <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M4 19.5C4 18.837 4.26339 18.2011 4.73223 17.7322C5.20107 17.2634 5.83696 17 6.5 17H20" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                  <path d="M6.5 2H20V22H6.5C5.83696 22 5.20107 21.7366 4.73223 21.2678C4.26339 20.7989 4 20.163 4 19.5V4.5C4 3.83696 4.26339 3.20107 4.73223 2.73223C5.20107 2.26339 5.83696 2 6.5 2Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                  <line x1="9" y1="7" x2="17" y2="7" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                  <line x1="9" y1="11" x2="17" y2="11" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
              </div>
              <span>Library</span>
            </NavLink>
            
            {/* ✅ HOSTEL - ALWAYS SHOW FOR FULL PACKAGE */}
            <NavLink to="/student-dashboard/hostel" className={styles.navItem}>
              <div className={styles.navIcon}>
                <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M3 21L21 21" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                  <path d="M5 21V7L13 2L21 7V21" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                  <path d="M9 9V21" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                  <path d="M15 9V21" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                  <path d="M9 12H15" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                  <path d="M9 15H15" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
              </div>
              <span>Hostel Info</span>
            </NavLink>
            
            {/* ✅ FEE PAYMENT - ALWAYS SHOW FOR FULL PACKAGE */}
            <NavLink to="/student-dashboard/fees" className={styles.navItem}>
              <div className={styles.navIcon}>
                <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <rect x="1" y="4" width="22" height="16" rx="2" ry="2" stroke="currentColor" strokeWidth="2"/>
                  <line x1="1" y1="10" x2="23" y2="10" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
              </div>
              <span>Fee Payment</span>
            </NavLink>
          </nav>
        </div>

        {/* ACCOUNT SECTION */}
        <div className={styles.section}>
          <h3 className={styles.sectionTitle}>ACCOUNT</h3>
          <nav className={styles.nav}>
            <NavLink to="/student-dashboard/profile" className={styles.navItem}>
              <div className={styles.navIcon}>
                <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M20 21V19C20 17.9391 19.5786 16.9217 18.8284 16.1716C18.0783 15.4214 17.0609 15 16 15H8C6.93913 15 5.92172 15.4214 5.17157 16.1716C4.42143 16.9217 4 17.9391 4 19V21" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                  <circle cx="12" cy="7" r="4" stroke="currentColor" strokeWidth="2"/>
                </svg>
              </div>
              <span>Profile</span>
            </NavLink>
          </nav>
        </div>
      </div>

      {/* Package Info */}
      {config && (
        <div className={styles.packageInfo}>
          <div className={`${styles.packageBadge} ${styles[config.package?.toLowerCase()]}`}>
            {config.package} PACKAGE
          </div>
          <div className={styles.universityName}>
            {config.name}
          </div>
          <div className={styles.featuresCount}>
            Features: {config.enabled_features?.student_dashboard?.length || 0}
          </div>
        </div>
      )}

      <div className={styles.footer}>
        <button onClick={handleLogout} className={styles.logoutBtn}>
          <div className={styles.logoutIcon}>
            <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M9 21H5C4.46957 21 3.96086 20.7893 3.58579 20.4142C3.21071 20.0391 3 19.5304 3 19V5C3 4.46957 3.21071 3.96086 3.58579 3.58579C3.96086 3.21071 4.46957 3 5 3H9" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
              <polyline points="16,17 21,12 16,7" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
              <line x1="21" y1="12" x2="9" y2="12" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
          </div>
          <span>Logout</span>
        </button>
      </div>
    </div>
  );
};

export default StudentSidebar;
