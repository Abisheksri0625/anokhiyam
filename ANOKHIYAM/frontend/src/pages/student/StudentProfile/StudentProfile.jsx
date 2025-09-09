import React, { useState } from 'react';
import FeedbackForm from '../../../components/FeedbackForm/FeedbackForm';
import ReportForm from '../../../components/ReportForm/ReportForm';
import StudentHeader from '../../../components/StudentHeader/StudentHeader';
import StudentSidebar from '../../../components/StudentSidebar/StudentSidebar';
import styles from './StudentProfile.module.css';

export default function StudentProfile() {
  const [mode, setMode] = useState('feedback');
  const [isCollapsed, setIsCollapsed] = useState(false);

  const handleMenuToggle = () => {
    setIsCollapsed(prev => !prev);
  };

  return (
    <div className={styles.wrapper}>
      <StudentSidebar
        activeItem="profile"
        isCollapsed={isCollapsed}
        setIsCollapsed={setIsCollapsed}
      />
      <div className={`${styles.mainContent} ${isCollapsed ? styles.collapsed : ''}`}>
        <StudentHeader isCollapsed={isCollapsed} onMenuToggle={handleMenuToggle} />
        <div className={styles.container}>
      

          <div className={styles.toggle}>
            <button
              className={mode === 'feedback' ? styles.active : styles.inactive}
              onClick={() => setMode('feedback')}
            >
              Feedback
            </button>
            <button
              className={mode === 'report' ? styles.active : styles.inactive}
              onClick={() => setMode('report')}
            >
              Report
            </button>
          </div>

          <div className={styles.content}>
            {mode === 'feedback' ? <FeedbackForm /> : <ReportForm />}
          </div>
        </div>
      </div>
    </div>
  );
}
