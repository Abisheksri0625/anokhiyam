import React, { useState } from 'react';
import { useAuth } from '../../context/AuthContext';
import styles from './StudentHeader.module.css';

const StudentHeader = ({ isCollapsed, onMenuToggle }) => {
  const [searchQuery, setSearchQuery] = useState('');
  const [showUserDropdown, setShowUserDropdown] = useState(false);
  const [showNotifications, setShowNotifications] = useState(false);
  
  const { userProfile, logout } = useAuth();

  const handleLogout = async () => {
    try {
      await logout();
    } catch (error) {
      console.error('Logout error:', error);
    }
  };

  return (
    <header className={`${styles.header} ${isCollapsed ? styles.collapsed : ''}`}>
      <div className={styles.leftSection}>
        <button className={styles.menuBtn} onClick={onMenuToggle} aria-label="Toggle menu">
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <path d="M3 12H21M3 6H21M3 18H21"/>
          </svg>
        </button>
        <div className={styles.searchContainer}>
          <div className={styles.searchIcon}>
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <circle cx="11" cy="11" r="8"/>
              <line x1="21" y1="21" x2="16.65" y2="16.65"/>
            </svg>
          </div>
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
            aria-label="User menu"
          >
            <div className={styles.userInfo}>
              <span className={styles.userName}>
                {userProfile ? `${userProfile.firstName} ${userProfile.lastName}` : 'Loading...'}
              </span>
              <span className={styles.userRole}>
                {userProfile ? `${userProfile.program || userProfile.course} • ${userProfile.year}` : 'Student'}
              </span>
            </div>
            <div className={styles.userAvatar}>
              <div className={styles.avatarPlaceholder}>
                {userProfile ? 
                  `${userProfile.firstName?.charAt(0) || ''}${userProfile.lastName?.charAt(0) || ''}` 
                  : 'U'
                }
              </div>
            </div>
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={showUserDropdown ? styles.rotateIcon : ''}>
              <path d="M6 9L12 15L18 9"/>
            </svg>
          </button>
          {showUserDropdown && (
            <div className={styles.userDropdown}>
              <a href="/student/profile">My Profile</a>
              <a href="/student/settings">Settings</a>
              <button className={styles.logoutBtn} onClick={handleLogout}>
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
