import React, { useState } from 'react';
import { useAuth } from '../../context/AuthContext';
import styles from './StudentHeader.module.css';

const StudentHeader = ({ onMenuToggle }) => {
  const { currentUser, logout } = useAuth();
  const [searchQuery, setSearchQuery] = useState('');
  const [showUserDropdown, setShowUserDropdown] = useState(false);
  const [showNotifications, setShowNotifications] = useState(false);

  const notifications = [
    {
      id: 1,
      title: 'Assignment Due Tomorrow',
      message: 'JavaScript Fundamentals assignment is due tomorrow at 11:59 PM',
      time: '2 hours ago',
      type: 'warning',
      unread: true
    },
    {
      id: 2,
      title: 'Grade Updated',
      message: 'Your grade for React Components quiz has been updated',
      time: '1 day ago',
      type: 'success',
      unread: true
    },
    {
      id: 3,
      title: 'Library Book Due',
      message: 'Data Structures & Algorithms book is due for return',
      time: '2 days ago',
      type: 'info',
      unread: false
    }
  ];

  const handleLogout = async () => {
    try {
      await logout();
      localStorage.removeItem('userRole');
      console.log('Logged out successfully');
    } catch (error) {
      console.error('Logout error:', error);
    }
  };

  const unreadCount = notifications.filter(n => n.unread).length;

  return (
    <header className={styles.header}>
      <div className={styles.leftSection}>
        <button className={styles.menuBtn} onClick={onMenuToggle}>
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
            placeholder="Search assignments, grades, schedule..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className={styles.searchInput}
          />
        </div>
      </div>

      <div className={styles.rightSection}>
        <div className={styles.quickActions}>
          <button className={styles.quickActionBtn} title="Quick Grade Check">
            <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
              <line x1="18" y1="20" x2="18" y2="10" stroke="currentColor" strokeWidth="2"/>
              <line x1="12" y1="20" x2="12" y2="4" stroke="currentColor" strokeWidth="2"/>
              <line x1="6" y1="20" x2="6" y2="14" stroke="currentColor" strokeWidth="2"/>
            </svg>
          </button>
          
          <button className={styles.quickActionBtn} title="Class Schedule">
            <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
              <rect x="3" y="4" width="18" height="18" rx="2" ry="2" stroke="currentColor" strokeWidth="2"/>
              <line x1="16" y1="2" x2="16" y2="6" stroke="currentColor" strokeWidth="2"/>
              <line x1="8" y1="2" x2="8" y2="6" stroke="currentColor" strokeWidth="2"/>
              <line x1="3" y1="10" x2="21" y2="10" stroke="currentColor" strokeWidth="2"/>
            </svg>
          </button>
        </div>

        <div className={styles.notificationContainer}>
          <button 
            className={styles.notificationBtn}
            onClick={() => setShowNotifications(!showNotifications)}
          >
            <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M18 8C18 6.4087 17.3679 4.88258 16.2426 3.75736C15.1174 2.63214 13.5913 2 12 2C10.4087 2 8.88258 2.63214 7.75736 3.75736C6.63214 4.88258 6 6.4087 6 8C6 15 3 17 3 17H21C21 17 18 15 18 8Z" stroke="currentColor" strokeWidth="2"/>
              <path d="M13.73 21C13.5542 21.3031 13.3019 21.5547 12.9982 21.7295C12.6946 21.9044 12.3504 21.9965 12 21.9965C11.6496 21.9965 11.3054 21.9044 11.0018 21.7295C10.6982 21.5547 10.4458 21.3031 10.27 21" stroke="currentColor" strokeWidth="2"/>
            </svg>
            {unreadCount > 0 && (
              <span className={styles.notificationBadge}>{unreadCount}</span>
            )}
          </button>

          {showNotifications && (
            <div className={styles.notificationDropdown}>
              <div className={styles.notificationHeader}>
                <h4>Notifications</h4>
                <span>{unreadCount} unread</span>
              </div>
              <div className={styles.notificationList}>
                {notifications.map((notification) => (
                  <div 
                    key={notification.id} 
                    className={`${styles.notificationItem} ${notification.unread ? styles.unread : ''}`}
                  >
                    <div className={`${styles.notificationType} ${styles[notification.type]}`}></div>
                    <div className={styles.notificationContent}>
                      <h5>{notification.title}</h5>
                      <p>{notification.message}</p>
                      <span className={styles.notificationTime}>{notification.time}</span>
                    </div>
                  </div>
                ))}
              </div>
              <div className={styles.notificationFooter}>
                <button>Mark all as read</button>
                <button>View all</button>
              </div>
            </div>
          )}
        </div>

        <div className={styles.userContainer}>
          <button 
            className={styles.userBtn}
            onClick={() => setShowUserDropdown(!showUserDropdown)}
          >
            <div className={styles.userInfo}>
              <span className={styles.userName}>John Smith</span>
              <span className={styles.userRole}>Computer Science • Final Year</span>
            </div>
            <div className={styles.userAvatar}>
              <img src="/api/placeholder/40/40" alt="User" />
            </div>
            <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M6 9L12 15L18 9" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
            </svg>
          </button>

          {showUserDropdown && (
            <div className={styles.userDropdown}>
              <div className={styles.userDropdownHeader}>
                <div className={styles.userDropdownAvatar}>
                  <img src="/api/placeholder/50/50" alt="User" />
                </div>
                <div>
                  <h4>John Smith</h4>
                  <p>CS-2021-045</p>
                </div>
              </div>
              <div className={styles.userDropdownMenu}>
                <a href="/student/profile">
                  <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M20 21V19C20 17.9391 19.5786 16.9217 18.8284 16.1716C18.0783 15.4214 17.0609 15 16 15H8C6.93913 15 5.92172 15.4214 5.17157 16.1716C4.42143 16.9217 4 17.9391 4 19V21" stroke="currentColor" strokeWidth="2"/>
                    <circle cx="12" cy="7" r="4" stroke="currentColor" strokeWidth="2"/>
                  </svg>
                  My Profile
                </a>
                <a href="/student/grades">
                  <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <line x1="18" y1="20" x2="18" y2="10" stroke="currentColor" strokeWidth="2"/>
                    <line x1="12" y1="20" x2="12" y2="4" stroke="currentColor" strokeWidth="2"/>
                    <line x1="6" y1="20" x2="6" y2="14" stroke="currentColor" strokeWidth="2"/>
                  </svg>
                  My Grades
                </a>
                <a href="/student/settings">
                  <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <circle cx="12" cy="12" r="3" stroke="currentColor" strokeWidth="2"/>
                  </svg>
                  Settings
                </a>
              </div>
              <div className={styles.userDropdownFooter}>
                <button onClick={handleLogout} className={styles.logoutBtn}>
                  <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M9 21H5C4.46957 21 3.96086 20.7893 3.58579 20.4142C3.21071 20.0391 3 19.5304 3 19V5C3 4.46957 3.21071 3.96086 3.58579 3.58579C3.96086 3.21071 4.46957 3 5 3H9" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                    <polyline points="16,17 21,12 16,7" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                    <line x1="21" y1="12" x2="9" y2="12" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                  </svg>
                  Sign out
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </header>
  );
};

export default StudentHeader;
