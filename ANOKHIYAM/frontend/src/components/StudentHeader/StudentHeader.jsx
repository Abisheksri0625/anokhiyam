import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';  // Add this import
import { db, auth } from '../../config/firebase';
import { 
  collection, 
  query, 
  where, 
  onSnapshot 
} from 'firebase/firestore';
import styles from './StudentHeader.module.css';

const StudentHeader = ({ isCollapsed, onMenuToggle }) => {
  const [searchQuery, setSearchQuery] = useState('');
  const [showUserDropdown, setShowUserDropdown] = useState(false);
  const [studentInfo, setStudentInfo] = useState(null);

  useEffect(() => {
    fetchStudentInfo();
  }, []);

  const fetchStudentInfo = async () => {
    try {
      const currentUser = auth.currentUser;
      if (!currentUser) return;

      const studentCredsRef = collection(db, 'student_credentials');
      const studentQuery = query(studentCredsRef, where('loginEmail', '==', currentUser.email));
      
      const unsubscribe = onSnapshot(studentQuery, (snapshot) => {
        if (!snapshot.empty) {
          setStudentInfo(snapshot.docs[0].data());
        }
      });

      return unsubscribe;
    } catch (error) {
      console.error('Error fetching student info:', error);
    }
  };

  const handleLogout = async () => {
    try {
      await auth.signOut();
      window.location.href = '/login';
    } catch (error) {
      console.error('Error signing out:', error);
    }
  };

  const getDisplayName = () => {
    if (!studentInfo) return 'Loading...';
    return `${studentInfo.firstName} ${studentInfo.lastName}`;
  };

  const getInitials = () => {
    if (!studentInfo) return 'S';
    return `${studentInfo.firstName.charAt(0)}${studentInfo.lastName.charAt(0)}`.toUpperCase();
  };

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (showUserDropdown && !event.target.closest(`.${styles.userContainer}`)) {
        setShowUserDropdown(false);
      }
    };

    document.addEventListener('click', handleClickOutside);
    return () => document.removeEventListener('click', handleClickOutside);
  }, [showUserDropdown]);

  return (
    <header className={`${styles.header} ${isCollapsed ? styles.collapsed : ''}`}>
      <div className={styles.leftSection}>
        <button className={styles.menuBtn} onClick={onMenuToggle}>
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <path d="M3 12H21M3 6H21M3 18H21"/>
          </svg>
        </button>
        
        <div className={styles.searchContainer}>
          <svg className={styles.searchIcon} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <circle cx="11" cy="11" r="8"/>
            <line x1="21" y1="21" x2="16.65" y2="16.65"/>
          </svg>
          <input
            type="text"
            placeholder="Search assignments, grades, schedule..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className={styles.searchInput}
          />
        </div>
      </div>

      <div className={styles.rightSection}>
        <div className={styles.userContainer}>
          <button
            className={styles.userBtn}
            onClick={() => setShowUserDropdown(!showUserDropdown)}
          >
            <div className={styles.userInfo}>
              <span className={styles.userName}>{getDisplayName()}</span>
              <span className={styles.userRole}>
                {studentInfo ? `${studentInfo.course || 'Student'} • Final Year` : 'Student'}
              </span>
            </div>
            <div className={styles.userAvatar}>
              <div className={styles.avatarInitials}>{getInitials()}</div>
            </div>
            <svg 
              className={`${styles.chevron} ${showUserDropdown ? styles.rotate : ''}`}
              viewBox="0 0 24 24" 
              fill="none" 
              stroke="currentColor" 
              strokeWidth="2"
            >
              <path d="M6 9L12 15L18 9"/>
            </svg>
          </button>

          {showUserDropdown && (
            <div className={styles.dropdown}>
              <Link to="/student/profile" className={styles.dropdownItem} onClick={() => setShowUserDropdown(false)}>
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"/>
                  <circle cx="12" cy="7" r="4"/>
                </svg>
                My Profile
              </Link>
              <Link to="/student/settings" className={styles.dropdownItem} onClick={() => setShowUserDropdown(false)}>
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <circle cx="12" cy="12" r="3"/>
                  <path d="M12 1v6m0 6v6"/>
                </svg>
                Settings
              </Link>
              <button onClick={handleLogout} className={styles.logoutBtn}>
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4"/>
                  <polyline points="16,17 21,12 16,7"/>
                  <line x1="21" y1="12" x2="9" y2="12"/>
                </svg>
                Logout
              </button>
            </div>
          )}
        </div>
      </div>
    </header>
  );
};

export default StudentHeader;
