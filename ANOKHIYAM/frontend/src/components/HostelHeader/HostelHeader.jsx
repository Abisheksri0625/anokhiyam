import React, { useState, useEffect } from 'react';
import { useAuth } from '../../context/AuthContext';
import styles from './HostelHeader.module.css';

const HostelHeader = ({ sidebarState = 2 }) => { // Accept sidebarState as prop
  const { currentUser, logout } = useAuth();
  const [searchQuery, setSearchQuery] = useState('');
  const [showUserDropdown, setShowUserDropdown] = useState(false);
  const [isMobile, setIsMobile] = useState(false);

  // Check for mobile screen size
  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 1024);
    };

    checkMobile();
    window.addEventListener("resize", checkMobile);
    return () => window.removeEventListener("resize", checkMobile);
  }, []);

  const handleLogout = async () => {
    try {
      await logout();
      console.log('Logged out successfully');
    } catch (error) {
      console.error('Logout error:', error);
    }
  };

  // Determine header class based on sidebar state
  const getHeaderClass = () => {
    if (isMobile) return styles.header;
    
    // sidebarState: 0 = collapsed, 1 = hover, 2 = expanded, 3 = pinned
    const isCollapsed = sidebarState === 0 || sidebarState === 1;
    return `${styles.header} ${isCollapsed ? styles.headerCollapsed : styles.headerExpanded}`;
  };

  return (
    <header className={getHeaderClass()}>
      <div className={styles.leftSection}>
        <button className={styles.menuBtn}>
          <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M3 12H21M3 6H21M3 18H21" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
          </svg>
        </button>

        <div className={styles.searchContainer}>
          <div className={styles.searchIcon}>
            <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
              <circle cx="11" cy="11" r="8" stroke="currentColor" strokeWidth="2"/>
              <path d="m21 21-4.35-4.35" stroke="currentColor" strokeWidth="2"/>
            </svg>
          </div>
          <input
            type="text"
            placeholder="Search rooms, students..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className={styles.searchInput}
          />
        </div>
      </div>

      <div className={styles.rightSection}>
        <div className={styles.notificationContainer}>
          <button className={styles.notificationBtn}>
            <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M18 8C18 6.4087 17.3679 4.88258 16.2426 3.75736C15.1174 2.63214 13.5913 2 12 2C10.4087 2 8.88258 2.63214 7.75736 3.75736C6.63214 4.88258 6 6.4087 6 8C6 15 3 17 3 17H21C21 17 18 15 18 8Z" stroke="currentColor" strokeWidth="2"/>
            </svg>
            <span className={styles.notificationBadge}>6</span>
          </button>
        </div>

        <div className={styles.userContainer}>
          <button 
            className={styles.userBtn}
            onClick={() => setShowUserDropdown(!showUserDropdown)}
          >
            <div className={styles.userInfo}>
              <span className={styles.userName}>Hostel Manager</span>
              <span className={styles.userRole}>Hostel Warden</span>
            </div>
            <div className={styles.userAvatar}>
              <img src="/api/placeholder/32/32" alt="User" />
            </div>
            <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M6 9L12 15L18 9" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
            </svg>
          </button>

          {showUserDropdown && (
            <div className={styles.userDropdown}>
              <a href="/hostel/profile">Profile</a>
              <a href="/hostel/settings">Settings</a>
              <hr />
              <button onClick={handleLogout} className={styles.logoutLink}>Logout</button>
            </div>
          )}
        </div>
      </div>
    </header>
  );
};

export default HostelHeader;