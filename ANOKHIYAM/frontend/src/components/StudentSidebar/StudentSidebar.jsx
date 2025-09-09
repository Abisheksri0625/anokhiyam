import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import styles from './StudentSidebar.module.css';
import LogoImage from '../../assets/logo.png'; // Adjust your logo path


const StudentSidebar = ({ activeItem = 'Dashboard', isCollapsed, setIsCollapsed }) => {
  const navigate = useNavigate();
  const [hoveredItem, setHoveredItem] = useState(null);


  const menuItems = [
    {
      section: 'MAIN',
      items: [
        { id: 'dashboard', label: 'Dashboard', icon: 'dashboard', path: '/student-dashboard' },
        { id: 'grades', label: 'Grades', icon: 'grades', path: '/student/grades' },
        { id: 'attendance', label: 'Attendance', icon: 'attendance', path: '/student/attendance' },
        { id: 'assignments', label: 'Assignments', icon: 'assignments', path: '/student/assignments' },
        { id: 'schedule', label: 'Class Schedule', icon: 'schedule', path: '/student/schedule' },
        { id: 'library', label: 'Library', icon: 'library', path: '/student/library' },
        { id: 'hostel', label: 'Hostel', icon: 'hostel', path: '/student/hostel' },
        { id: 'fees', label: 'Fee Payment', icon: 'fees', path: '/student/fees' },
        { id: 'feedback', label: 'Feedback & Report', icon: 'feedback', path: '/student/feedback' }
      ]
    },
    {
      section: 'SETTINGS',
      items: [
        { id: 'notifications', label: 'Notifications', icon: 'notifications', path: '/student/notifications' },
        { id: 'settings', label: 'Settings', icon: 'settings', path: '/student/settings' }
      ]
    }
  ];


  // Icons (replace or adjust as necessary)
  const getIcon = (iconType) => {
    const icons = {
      dashboard: (
        <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <path d="M3 9L12 2L21 9V20C21 20.5523 20.5523 21 20 21H4C3.44772 21 3 20.5523 3 20V9Z"/>
          <path d="M9 22V12H15V22"/>
        </svg>
      ),
      grades: (
        <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <line x1="9" y1="11" x2="15" y2="11"/>
          <line x1="9" y1="15" x2="15" y2="15"/>
          <path d="M17 21L20 18L17 15"/>
          <path d="M3 5C3 3.89543 3.89543 3 5 3H19C20.1046 3 21 3.89543 21 5V11.5"/>
          <path d="M5 21H13"/>
        </svg>
      ),
      attendance: (
        <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <path d="M22 11.08V12C21.9988 14.1564 21.3005 16.2547 20.0093 17.9818C18.7182 19.7089 16.9033 20.9725 14.8354 21.5839C12.7674 22.1953 10.5573 22.1219 8.53447 21.3746C6.51168 20.6273 4.78465 19.2461 3.61096 17.4371C2.43727 15.628 1.87979 13.4881 2.02168 11.3363C2.16356 9.18457 2.99721 7.13633 4.39828 5.49707C5.79935 3.85781 7.69279 2.71537 9.79619 2.24013C11.8996 1.76488 14.1003 1.98232 16.07 2.86"/>
          <polyline points="22 4 12 14.01 9 11.01"/>
        </svg>
      ),
      assignments: (
        <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <rect x="1" y="4" width="22" height="16" rx="2" ry="2"/>
          <line x1="1" y1="10" x2="23" y2="10"/>
        </svg>
      ),
      schedule: (
        <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <rect x="3" y="4" width="18" height="18" rx="2" ry="2"/>
          <line x1="16" y1="2" x2="16" y2="6"/>
          <line x1="8" y1="2" x2="8" y2="6"/>
          <line x1="3" y1="10" x2="21" y2="10"/>
        </svg>
      ),
      library: (
        <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <path d="M4 19.5C4 18.837 4.26339 18.2011 4.73223 17.7322C5.20107 17.2634 5.83696 17 6.5 17H20"/>
          <path d="M6.5 2H20V22H6.5C5.83696 22 5.20107 21.7366 4.73223 21.2678C4.26339 20.7989 4 20.163 4 19.5V4.5C4 3.83696 4.26339 3.20107 4.73223 2.73223C5.20107 2.26339 5.83696 2 6.5 2Z"/>
          <line x1="9" y1="7" x2="17" y2="7"/>
          <line x1="9" y1="11" x2="17" y2="11"/>
        </svg>
      ),
      hostel: (
        <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <path d="M3 21L21 21"/>
          <path d="M5 21V7L13 2L21 7V21"/>
          <path d="M9 9V21"/>
          <path d="M15 9V21"/>
          <path d="M9 12H15"/>
          <path d="M9 15H15"/>
        </svg>
      ),
      fees: (
        <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <rect x="1" y="4" width="22" height="16" rx="2" ry="2"/>
          <line x1="1" y1="10" x2="23" y2="10"/>
        </svg>
      ),
      feedback: (
        <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <path d="M21 15C21 15.5304 20.7893 16.0391 20.4142 16.4142C20.0391 16.7893 19.5304 17 19 17H7L3 21V5C3 4.46957 3.21071 3.96086 3.58579 3.58579C3.96086 3.21071 4.46957 3 5 3H19C19.5304 3 20.0391 3.21071 20.4142 3.58579C20.7893 3.96086 21 4.46957 21 5V15Z"/>
          <path d="M7 8H17"/>
          <path d="M7 12H13"/>
        </svg>
      ),
      notifications: (
        <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <path d="M18 8c0-3.114-1.762-5.692-4.5-6.5v0a6.992 6.992 0 0 0-2 0v0C7.762 2.308 6 4.886 6 8c0 4.177-1 7-1 7h14s-1-2.823-1-7z"/>
          <path d="M13.73 21a2 2 0 1 1-3.46 0"/>
        </svg>
      ),
      settings: (
        <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <circle cx="12" cy="12" r="3"/>
          <path d="M19.4 15a1.77 1.77 0 0 1 0 2.4l-.38.35a2 2 0 0 1-2.4 0l-.35-.38a1.77 1.77 0 0 1 0-2.4l.38-.35a2 2 0 0 1 2.4 0l.35.38zM12 19.4a1.77 1.77 0 0 1 2.4 0l.35.38a2 2 0 0 1 0 2.4l-.38.35a1.77 1.77 0 0 1-2.4 0l-.35-.38a2 2 0 0 1 0-2.4l.38-.35z"/>
        </svg>
      )
    };
    return icons[iconType] || icons.dashboard;
  };


  const handleMenuClick = (item) => {
    navigate(item.path);
  };


  return (
    <div className={`${styles.sidebar} ${isCollapsed ? styles.collapsed : ''}`}>
      <div className={styles.logoSection}>
        {!isCollapsed && (
          <>
            <button
              className={styles.hamburgerBtn}
              onClick={() => setIsCollapsed(!isCollapsed)}
            >
              <span></span>
              <span></span>
              <span></span>
            </button>
            <span className={styles.logoText}>ANOKHIYAM</span>
          </>
        )}


        {isCollapsed && (
          <div className={styles.collapsedHeader}>
            <div className={styles.logoIcon}>
              <img src={LogoImage} alt="Logo" />
            </div>
            <button
              className={styles.hamburgerBtnCollapsed}
              onClick={() => setIsCollapsed(!isCollapsed)}
            >
              <span></span>
              <span></span>
              <span></span>
            </button>
          </div>
        )}
      </div>


      <div className={styles.menu}>
        {menuItems.map((section, sectionIndex) => (
          <div key={sectionIndex} className={styles.menuSection}>
            {!isCollapsed && <div className={styles.sectionTitle}>{section.section}</div>}
            {section.items.map((item) => (
              <div
                key={item.id}
                className={`${styles.menuItem} ${
                  activeItem.toLowerCase() === item.id ? styles.active : ''
                }`}
                onClick={() => handleMenuClick(item)}
                onMouseEnter={() => setHoveredItem(item.id)}
                onMouseLeave={() => setHoveredItem(null)}
                title={isCollapsed ? item.label : ''}
              >
                <div className={styles.menuIcon}>{getIcon(item.icon)}</div>
                {!isCollapsed && <span className={styles.menuLabel}>{item.label}</span>}
                {isCollapsed && hoveredItem === item.id && (
                  <div className={styles.tooltip}>{item.label}</div>
                )}
              </div>
            ))}
          </div>
        ))}
      </div>
    </div>
  );
};


export default StudentSidebar;
