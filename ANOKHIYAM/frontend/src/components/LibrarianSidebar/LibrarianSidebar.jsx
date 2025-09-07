import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import styles from './LibrarianSidebar.module.css';

const LibrarianSidebar = ({ activeItem = 'dashboard', onSidebarStateChange }) => {
  const navigate = useNavigate();
  const [sidebarState, setSidebarState] = useState(1); // 0: collapsed, 1: expanded
  const [hoveredIndex, setHoveredIndex] = useState(null);
  const [activeIndex, setActiveIndex] = useState(0);
  const [isMobile, setIsMobile] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const menuItems = [
    {
      section: 'MAIN',
      items: [
        { id: 'dashboard', label: 'Dashboard', icon: 'dashboard', path: '/librarian-dashboard' },
        { id: 'books', label: 'Book Management', icon: 'books', path: '/librarian/books' },
        { id: 'inventory', label: 'Inventory', icon: 'inventory', path: '/librarian/inventory' },
        { id: 'issued-books', label: 'Issued Books', icon: 'issued', path: '/librarian/issued-books' },
        { id: 'returns', label: 'Returns', icon: 'returns', path: '/librarian/returns' },
        { id: 'students', label: 'Student Records', icon: 'students', path: '/librarian/students' },
        { id: 'overdue', label: 'Overdue Books', icon: 'overdue', path: '/librarian/overdue' },
        { id: 'reports', label: 'Reports', icon: 'reports', path: '/librarian/reports' }
      ]
    },
    {
      section: 'SETTINGS',
      items: [
        { id: 'notifications', label: 'Notifications', icon: 'notifications', path: '/librarian/notifications' },
        { id: 'settings', label: 'Settings', icon: 'settings', path: '/librarian/settings' }
      ]
    }
  ];

  // Notify parent component when sidebar state changes
  useEffect(() => {
    if (onSidebarStateChange) {
      onSidebarStateChange(sidebarState);
    }
  }, [sidebarState, onSidebarStateChange]);

  const handleSidebarToggle = () => {
    const newState = sidebarState === 0 ? 1 : 0;
    setSidebarState(newState);
  };

  const getIcon = (iconType) => {
    const icons = {
      dashboard: (
        <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
          <rect x="3" y="3" width="7" height="7" rx="1" stroke="currentColor" strokeWidth="2"/>
          <rect x="14" y="3" width="7" height="7" rx="1" stroke="currentColor" strokeWidth="2"/>
          <rect x="3" y="14" width="7" height="7" rx="1" stroke="currentColor" strokeWidth="2"/>
          <rect x="14" y="14" width="7" height="7" rx="1" stroke="currentColor" strokeWidth="2"/>
        </svg>
      ),
      books: (
        <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M4 19.5C4 18.1193 5.11929 17 6.5 17H20" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
          <path d="M6.5 2H20V22H6.5C5.11929 22 4 20.8807 4 19.5V4.5C4 3.11929 5.11929 2 6.5 2Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
        </svg>
      ),
      inventory: (
        <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
          <rect x="2" y="3" width="20" height="14" rx="2" ry="2" stroke="currentColor" strokeWidth="2"/>
          <line x1="8" y1="21" x2="16" y2="21" stroke="currentColor" strokeWidth="2"/>
          <line x1="12" y1="17" x2="12" y2="21" stroke="currentColor" strokeWidth="2"/>
        </svg>
      ),
      issued: (
        <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M14 2H6C4.89543 2 4 2.89543 4 4V20C4 21.1046 4.89543 22 6 22H18C19.1046 22 20 21.1046 20 20V8L14 2Z" stroke="currentColor" strokeWidth="2"/>
          <path d="M14 2V8H20" stroke="currentColor" strokeWidth="2"/>
          <path d="M16 13H8" stroke="currentColor" strokeWidth="2"/>
          <path d="M16 17H8" stroke="currentColor" strokeWidth="2"/>
          <path d="M10 9H8" stroke="currentColor" strokeWidth="2"/>
        </svg>
      ),
      returns: (
        <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M3 12C3 16.9706 7.02944 21 12 21C16.9706 21 21 16.9706 21 12C21 7.02944 16.9706 3 12 3C7.02944 3 3 7.02944 3 12Z" stroke="currentColor" strokeWidth="2"/>
          <path d="M8 12L11 9M11 9L14 12M11 9V16" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
        </svg>
      ),
      students: (
        <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M17 21V19C17 17.9391 16.5786 16.9217 15.8284 16.1716C15.0783 15.4214 14.0609 15 13 15H5C3.93913 15 2.92172 15.4214 2.17157 16.1716C1.42143 16.9217 1 17.9391 1 19V21" stroke="currentColor" strokeWidth="2"/>
          <circle cx="9" cy="7" r="4" stroke="currentColor" strokeWidth="2"/>
          <path d="M23 21V19C23 18.1645 22.7155 17.3541 22.2094 16.7006C21.7033 16.047 20.9996 15.5867 20.2 15.3829" stroke="currentColor" strokeWidth="2"/>
          <path d="M16 3.13C16.8604 3.35031 17.623 3.85071 18.1676 4.55232C18.7122 5.25392 19.0078 6.11683 19.0078 7.005C19.0078 7.89318 18.7122 8.75608 18.1676 9.45769C17.623 10.1593 16.8604 10.6597 16 10.88" stroke="currentColor" strokeWidth="2"/>
        </svg>
      ),
      overdue: (
        <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
          <circle cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="2"/>
          <polyline points="12,6 12,12 16,14" stroke="currentColor" strokeWidth="2"/>
        </svg>
      ),
      reports: (
        <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
          <line x1="18" y1="20" x2="18" y2="10" stroke="currentColor" strokeWidth="2"/>
          <line x1="12" y1="20" x2="12" y2="4" stroke="currentColor" strokeWidth="2"/>
          <line x1="6" y1="20" x2="6" y2="14" stroke="currentColor" strokeWidth="2"/>
        </svg>
      ),
      notifications: (
        <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M18 8C18 6.4087 17.3679 4.88258 16.2426 3.75736C15.1174 2.63214 13.5913 2 12 2C10.4087 2 8.88258 2.63214 7.75736 3.75736C6.63214 4.88258 6 6.4087 6 8C6 15 3 17 3 17H21C21 17 18 15 18 8Z" stroke="currentColor" strokeWidth="2"/>
        </svg>
      ),
      settings: (
        <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
          <circle cx="12" cy="12" r="3" stroke="currentColor" strokeWidth="2"/>
          <path d="M19.4 15C19.2669 15.3016 19.2272 15.6362 19.286 15.9606C19.3448 16.285 19.4995 16.5843 19.73 16.82L19.79 16.88C19.976 17.0657 20.1235 17.2863 20.2241 17.5291C20.3248 17.7719 20.3766 18.0322 20.3766 18.295C20.3766 18.5578 20.3248 18.8181 20.2241 19.0609C20.1235 19.3037 19.976 19.5243 19.79 19.71C19.6043 19.896 19.3837 20.0435 19.1409 20.1441C18.8981 20.2448 18.6378 20.2966 18.375 20.2966C18.1122 20.2966 17.8519 20.2448 17.6091 20.1441C17.3663 20.0435 17.1457 19.896 16.96 19.71L16.9 19.65C16.6643 19.4195 16.365 19.2648 16.0406 19.206C15.7162 19.1472 15.3816 19.1869 15.08 19.32C14.7842 19.4468 14.532 19.6572 14.3543 19.9255C14.1766 20.1938 14.0813 20.5082 14.08 20.83V21C14.08 21.5304 13.8693 22.0391 13.4942 22.4142C13.1191 22.7893 12.6104 23 12.08 23C11.5496 23 11.0409 22.7893 10.6658 22.4142C10.2907 22.0391 10.08 21.5304 10.08 21V20.91C10.0723 20.579 9.96512 20.258 9.77251 19.9887C9.5799 19.7194 9.31074 19.5143 9 19.4C8.69838 19.2669 8.36381 19.2272 8.03941 19.286C7.71502 19.3448 7.41568 19.4995 7.18 19.73L7.12 19.79C6.93425 19.976 6.71368 20.1235 6.47088 20.2241C6.22808 20.3248 5.96783 20.3766 5.705 20.3766C5.44217 20.3766 5.18192 20.3248 4.93912 20.2241C4.69632 20.1235 4.47575 19.976 4.29 19.79C4.10405 19.6043 3.95653 19.3837 3.85588 19.1409C3.75523 18.8981 3.70343 18.6378 3.70343 18.375C3.70343 18.1122 3.75523 17.8519 3.85588 17.6091C3.95653 17.3663 4.10405 17.1457 4.29 16.96L4.35 16.9C4.58054 16.6643 4.73519 16.365 4.794 16.0406C4.85282 15.7162 4.81312 15.3816 4.68 15.08C4.55324 14.7842 4.34276 14.532 4.07447 14.3543C3.80618 14.1766 3.49179 14.0813 3.17 14.08H3C2.46957 14.08 1.96086 13.8693 1.58579 13.4942C1.21071 13.1191 1 12.6104 1 12.08C1 11.5496 1.21071 11.0409 1.58579 10.6658C1.96086 10.2907 2.46957 10.08 3 10.08H3.09C3.42099 10.0723 3.742 9.96512 4.0113 9.77251C4.28059 9.5799 4.48572 9.31074 4.6 9C4.73312 8.69838 4.77282 8.36381 4.714 8.03941C4.65519 7.71502 4.50054 7.41568 4.27 7.18L4.21 7.12C4.02405 6.93425 3.87653 6.71368 3.77588 6.47088C3.67523 6.22808 3.62343 5.96783 3.62343 5.705C3.62343 5.44217 3.67523 5.18192 3.77588 4.93912C3.87653 4.69632 4.02405 4.47575 4.21 4.29C4.39575 4.10405 4.61632 3.95653 4.85912 3.85588C5.10192 3.75523 5.36217 3.70343 5.625 3.70343C5.88783 3.70343 6.14808 3.75523 6.39088 3.85588C6.63368 3.95653 6.85425 4.10405 7.04 4.29L7.1 4.35C7.33568 4.58054 7.63502 4.73519 7.95941 4.794C8.28381 4.85282 8.61838 4.81312 8.92 4.68H9C9.29577 4.55324 9.54802 4.34276 9.72569 4.07447C9.90337 3.80618 9.99872 3.49179 10 3.17V3C10 2.46957 10.2107 1.96086 10.5858 1.58579C10.9609 1.21071 11.4696 1 12 1C12.5304 1 13.0391 1.21071 13.4142 1.58579C13.7893 1.96086 14 2.46957 14 3V3.09C14.0013 3.41179 14.0966 3.72618 14.2743 3.99447C14.452 4.26276 14.7042 4.47324 15 4.6C15.3016 4.73312 15.6362 4.77282 15.9606 4.714C16.285 4.65519 16.5843 4.50054 16.82 4.27L16.88 4.21C17.0657 4.02405 17.2863 3.87653 17.5291 3.77588C17.7719 3.67523 18.0322 3.62343 18.295 3.62343C18.5578 3.62343 18.8181 3.67523 19.0609 3.77588C19.3037 3.87653 19.5243 4.02405 19.71 4.29C19.896 4.47575 20.0435 4.69632 20.1441 4.93912C20.2448 5.18192 20.2966 5.44217 20.2966 5.705C20.2966 5.96783 20.2448 6.22808 20.1441 6.47088C20.0435 6.71368 19.896 6.93425 19.71 7.12L19.65 7.18C19.4195 7.41568 19.2648 7.71502 19.206 8.03941C19.1472 8.36381 19.1869 8.69838 19.32 9V9C19.4468 9.29577 19.6572 9.54802 19.9255 9.72569C20.1938 9.90337 20.5082 9.99872 20.83 10H21C21.5304 10 22.0391 10.2107 22.4142 10.5858C22.7893 10.9609 23 11.4696 23 12C23 12.5304 22.7893 13.0391 22.4142 13.4142C22.0391 13.7893 21.5304 14 21 14H20.91C20.5882 14.0013 20.2738 14.0966 20.0055 14.2743C19.7372 14.452 19.5268 14.7042 19.4 15Z" stroke="currentColor" strokeWidth="2"/>
        </svg>
      )
    };
    return icons[iconType] || icons.dashboard;
  };

  // Flatten items for easier indexing
  const allItems = menuItems.reduce((acc, section) => [...acc, ...section.items], []);

  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768);
    };

    checkMobile();
    window.addEventListener("resize", checkMobile);
    return () => window.removeEventListener("resize", checkMobile);
  }, []);

  useEffect(() => {
    // Set active index based on activeItem prop
    const foundIndex = allItems.findIndex(item => item.id === activeItem);
    if (foundIndex !== -1) {
      setActiveIndex(foundIndex);
    }
  }, [activeItem, allItems]);

  const handleItemClick = (item, index) => {
    setActiveIndex(index);
    if (navigate) {
      navigate(item.path);
    }
    if (isMobile) {
      setMobileMenuOpen(false);
    }
  };

  // Mobile version
  if (isMobile) {
    return (
      <>
        <button
          className={`${styles.mobileButton} ${mobileMenuOpen ? styles.hidden : ''}`}
          onClick={() => setMobileMenuOpen(true)}
        >
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <line x1="3" y1="6" x2="21" y2="6"></line>
            <line x1="3" y1="12" x2="21" y2="12"></line>
            <line x1="3" y1="18" x2="21" y2="18"></line>
          </svg>
        </button>

        {mobileMenuOpen && (
          <div className={styles.overlay} onClick={() => setMobileMenuOpen(false)} />
        )}

        <div className={`${styles.sidebarMobile} ${!mobileMenuOpen ? styles.closed : ''}`}>
          <div className={styles.mobileHeader}>
            <span className={styles.logoText}>ANOKHIYAM</span>
            <button className={styles.closeButton} onClick={() => setMobileMenuOpen(false)}>
              <svg width="18" height="18" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
                <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          </div>

          <div className={styles.mobileContent}>
            {menuItems.map((section, sectionIndex) => (
              <div key={sectionIndex} className={styles.menuSection}>
                <div className={styles.sectionTitle}>{section.section}</div>
                {section.items.map((item, itemIndex) => {
                  const globalIndex = menuItems
                    .slice(0, sectionIndex)
                    .reduce((acc, s) => acc + s.items.length, 0) + itemIndex;
                  
                  return (
                    <div
                      key={item.id}
                      className={`${styles.menuItemExpanded} ${activeIndex === globalIndex ? styles.active : ''}`}
                      onClick={() => handleItemClick(item, globalIndex)}
                    >
                      <div className={styles.menuItemIcon}>
                        {getIcon(item.icon)}
                      </div>
                      <span className={styles.menuItemLabel}>{item.label}</span>
                    </div>
                  );
                })}
              </div>
            ))}
          </div>
        </div>
      </>
    );
  }

  // Desktop version
  return (
    <div className={`${styles.sidebar} ${sidebarState === 1 ? styles.expanded : styles.collapsed}`}>
      <div className={styles.header}>
        <div className={styles.logoContainer}>
          {sidebarState === 0 ? (
            <div className={styles.logoIcon}>A</div>
          ) : (
            <span className={styles.logoText}>ANOKHIYAM</span>
          )}
        </div>
        <button
          className={styles.expandButton}
          onClick={handleSidebarToggle}
        >
          <svg
            width="16"
            height="16"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            className={`${styles.expandIcon} ${sidebarState === 1 ? styles.rotated : ''}`}
          >
            <polyline points="9,18 15,12 9,6"></polyline>
          </svg>
        </button>
      </div>

      <div className={styles.content}>
        {menuItems.map((section, sectionIndex) => (
          <div key={sectionIndex} className={styles.menuSection}>
            {sidebarState === 1 && (
              <div className={styles.sectionTitle}>{section.section}</div>
            )}
            {section.items.map((item, itemIndex) => {
              const globalIndex = menuItems
                .slice(0, sectionIndex)
                .reduce((acc, s) => acc + s.items.length, 0) + itemIndex;
              
              return (
                <div
                  key={item.id}
                  className={`${
                    sidebarState === 0 ? styles.menuItemCollapsed : styles.menuItemExpanded
                  } ${activeIndex === globalIndex ? styles.active : ''} ${
                    hoveredIndex === globalIndex ? styles.hovered : ''
                  }`}
                  onClick={() => handleItemClick(item, globalIndex)}
                  onMouseEnter={() => setHoveredIndex(globalIndex)}
                  onMouseLeave={() => setHoveredIndex(null)}
                >
                  <div className={styles.menuItemIcon}>
                    {getIcon(item.icon)}
                  </div>
                  {sidebarState === 1 && (
                    <span className={styles.menuItemLabel}>{item.label}</span>
                  )}
                  {sidebarState === 0 && hoveredIndex === globalIndex && (
                    <div className={styles.tooltip}>{item.label}</div>
                  )}
                </div>
              );
            })}
          </div>
        ))}
      </div>
    </div>
  );
};

export default LibrarianSidebar;