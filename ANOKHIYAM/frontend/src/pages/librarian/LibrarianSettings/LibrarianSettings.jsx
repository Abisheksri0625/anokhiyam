import React, { useState } from 'react';
import LibrarianSidebar from '../../../components/LibrarianSidebar/LibrarianSidebar';
import LibrarianHeader from '../../../components/LibrarianHeader/LibrarianHeader';
import styles from './LibrarianSettings.module.css';  // ← Changed this line

const LibrarianSettings = () => {
  const [isCollapsed, setIsCollapsed] = useState(false);

  return (
    <div className={styles.dashboardContainer}>
      <LibrarianSidebar 
        activeItem="settings" 
        isCollapsed={isCollapsed}
        setIsCollapsed={setIsCollapsed}
      />
      <div className={`${styles.mainContent} ${isCollapsed ? styles.collapsed : ''}`}>
        <LibrarianHeader isCollapsed={isCollapsed} />
        <div className={styles.content}>
          <div className={styles.comingSoon}>
            <h1>Settings</h1>
            <p>Feature will be available soon</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LibrarianSettings;
