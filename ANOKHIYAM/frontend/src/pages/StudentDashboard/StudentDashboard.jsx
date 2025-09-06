import React, { useState } from 'react';
import { useFeatures } from '../../hooks/useFeatures';
import { getCurrentUniversityId } from '../../config/universityConfig';
import StudentSidebar from '../../components/StudentSidebar/StudentSidebar';
import StudentHeader from '../../components/StudentHeader/StudentHeader';
import AcademicCard from '../../components/StudentCards/AcademicCard';
import AttendanceCard from '../../components/StudentCards/AttendanceCard';
import AssignmentsCard from '../../components/StudentCards/AssignmentsCard';
import ExamsCard from '../../components/StudentCards/ExamsCard';
import styles from './StudentDashboard.module.css';

const StudentDashboard = () => {
  const [activeTab, setActiveTab] = useState('overview');
  
  // Feature toggle integration
  const universityId = getCurrentUniversityId();
  const { hasFeature, loading, config, error } = useFeatures();

  // Loading state
  if (loading) {
    return (
      <div className={styles.dashboardContainer}>
        <StudentSidebar activeItem="Dashboard" />
        <div className={styles.mainContent}>
          <StudentHeader />
          <div className={styles.content}>
            <div style={{
              display: 'flex',
              justifyContent: 'center',
              alignItems: 'center',
              height: '60vh',
              fontFamily: 'Poppins, sans-serif'
            }}>
              <div>Loading dashboard configuration...</div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  // Error state
  if (error) {
    return (
      <div className={styles.dashboardContainer}>
        <StudentSidebar activeItem="Dashboard" />
        <div className={styles.mainContent}>
          <StudentHeader />
          <div className={styles.content}>
            <div style={{
              display: 'flex',
              justifyContent: 'center',
              alignItems: 'center',
              height: '60vh',
              fontFamily: 'Poppins, sans-serif',
              color: '#ef4444'
            }}>
              <div>Error loading dashboard: {error}</div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  const renderContent = () => {
    switch(activeTab) {
      case 'profile':
        return (
          <div className={styles.contentSection}>
            <h2>My Profile</h2>
            <p>View and update your personal information</p>
            <div className={styles.profileInfo}>
              <div className={styles.profileItem}>
                <strong>Name:</strong> John Smith
              </div>
              <div className={styles.profileItem}>
                <strong>Student ID:</strong> CS-2021-045
              </div>
              <div className={styles.profileItem}>
                <strong>Department:</strong> Computer Science
              </div>
              <div className={styles.profileItem}>
                <strong>Year:</strong> Final Year
              </div>
              <div className={styles.profileItem}>
                <strong>Email:</strong> student@anokhiyam.com
              </div>
              <div className={styles.profileItem}>
                <strong>Phone:</strong> +91 98765 43210
              </div>
            </div>
          </div>
        );
      
      case 'grades':
        return (
          <div className={styles.contentSection}>
            <h2>My Grades</h2>
            <p>View your academic performance and grades</p>
            {hasFeature('student_dashboard', 'grades') ? (
              <div className={styles.gradesContent}>
                <p>Grades functionality available for {config?.package} package students.</p>
                {/* Your existing grades content here */}
              </div>
            ) : (
              <div className={styles.featureDisabled}>
                <p>Grades feature not available in your current package.</p>
                <p>Contact administration to upgrade your package.</p>
              </div>
            )}
          </div>
        );
      
      default:
        return (
          <>
            <div className={styles.pageHeader}>
              <h1 className={styles.pageTitle}>Student Dashboard</h1>
              <p className={styles.pageSubtitle}>
                Welcome back, Student! Here's your academic overview.
              </p>
              {config && (
                <div className={styles.universityInfo}>
                  {config.name} - {config.package} Package
                </div>
              )}
            </div>

            <div className={styles.statsGrid}>
              {/* Show cards based on enabled features */}
              {hasFeature('student_dashboard', 'grades') && <AcademicCard />}
              {hasFeature('student_dashboard', 'attendance') && <AttendanceCard />}
              {hasFeature('student_dashboard', 'assignments') && <AssignmentsCard />}
              <ExamsCard />
            </div>

            <div className={styles.actionsSection}>
              <h2 className={styles.sectionTitle}>Quick Actions</h2>
              <div className={styles.actionGrid}>
                {/* Profile - Always available */}
                <button className={styles.actionBtn} onClick={() => setActiveTab('profile')}>
                  <div className={styles.actionContent}>
                    <h4 className={styles.actionTitle}>My Profile</h4>
                    <p className={styles.actionDesc}>View and update your information</p>
                  </div>
                </button>

                {/* Grades - Only show if enabled */}
                {hasFeature('student_dashboard', 'grades') && (
                  <button className={styles.actionBtn} onClick={() => setActiveTab('grades')}>
                    <div className={styles.actionContent}>
                      <h4 className={styles.actionTitle}>View Grades</h4>
                      <p className={styles.actionDesc}>Check your academic performance</p>
                    </div>
                  </button>
                )}

                {/* Assignments - Only show if enabled */}
                {hasFeature('student_dashboard', 'assignments') && (
                  <button className={styles.actionBtn}>
                    <div className={styles.actionContent}>
                      <h4 className={styles.actionTitle}>Assignments</h4>
                      <p className={styles.actionDesc}>View pending assignments</p>
                    </div>
                  </button>
                )}

                {/* Class Schedule - Always available */}
                <button className={styles.actionBtn}>
                  <div className={styles.actionContent}>
                    <h4 className={styles.actionTitle}>Class Schedule</h4>
                    <p className={styles.actionDesc}>View your class timetable</p>
                  </div>
                </button>

                {/* Library - Only show if enabled */}
                {hasFeature('student_dashboard', 'library') && (
                  <button className={styles.actionBtn}>
                    <div className={styles.actionContent}>
                      <h4 className={styles.actionTitle}>Library Books</h4>
                      <p className={styles.actionDesc}>Check issued library books</p>
                    </div>
                  </button>
                )}

                {/* Hostel - Only show if enabled */}
                {hasFeature('student_dashboard', 'hostel') && (
                  <button className={styles.actionBtn}>
                    <div className={styles.actionContent}>
                      <h4 className={styles.actionTitle}>Hostel Info</h4>
                      <p className={styles.actionDesc}>View hostel room details</p>
                    </div>
                  </button>
                )}

                {/* Fee Payment - Only show if enabled */}
                {hasFeature('student_dashboard', 'fee_payment') && (
                  <button className={styles.actionBtn}>
                    <div className={styles.actionContent}>
                      <h4 className={styles.actionTitle}>Fee Payment</h4>
                      <p className={styles.actionDesc}>Pay fees online</p>
                    </div>
                  </button>
                )}
              </div>
            </div>

            <div className={styles.recentSection}>
              <h2 className={styles.sectionTitle}>Recent Updates</h2>
              <div className={styles.activityList}>
                {/* Grades activity - Only show if grades enabled */}
                {hasFeature('student_dashboard', 'grades') && (
                  <div className={styles.activityItem}>
                    <div className={styles.activityIcon}>GRADE</div>
                    <div className={styles.activityContent}>
                      <h4>Grade Updated</h4>
                      <p>Your grade for JavaScript Fundamentals quiz has been updated</p>
                      <span className={styles.activityTime}>2 hours ago</span>
                    </div>
                  </div>
                )}

                {/* Assignment activity - Only show if assignments enabled */}
                {hasFeature('student_dashboard', 'assignments') && (
                  <div className={styles.activityItem}>
                    <div className={styles.activityIcon}>TASK</div>
                    <div className={styles.activityContent}>
                      <h4>New Assignment</h4>
                      <p>React Components assignment posted in Web Development</p>
                      <span className={styles.activityTime}>1 day ago</span>
                    </div>
                  </div>
                )}

                {/* Library activity - Only show if library enabled */}
                {hasFeature('student_dashboard', 'library') && (
                  <div className={styles.activityItem}>
                    <div className={styles.activityIcon}>BOOK</div>
                    <div className={styles.activityContent}>
                      <h4>Library Book Due</h4>
                      <p>"Data Structures & Algorithms" is due for return tomorrow</p>
                      <span className={styles.activityTime}>2 days ago</span>
                    </div>
                  </div>
                )}

                {/* Show a message if no features are enabled */}
                {!hasFeature('student_dashboard', 'grades') && 
                 !hasFeature('student_dashboard', 'assignments') && 
                 !hasFeature('student_dashboard', 'library') && (
                  <div className={styles.activityItem}>
                    <div className={styles.activityIcon}>INFO</div>
                    <div className={styles.activityContent}>
                      <h4>Welcome to {config?.package} Package</h4>
                      <p>You have access to essential academic features. Contact administration for more features.</p>
                      <span className={styles.activityTime}>Today</span>
                    </div>
                  </div>
                )}
              </div>
            </div>

            {/* Debug info for development */}
            {process.env.NODE_ENV === 'development' && config && (
              <div className={styles.debugSection}>
                <h3>Debug Info:</h3>
                <div className={styles.debugInfo}>
                  <p><strong>University:</strong> {config.name}</p>
                  <p><strong>Package:</strong> {config.package}</p>
                  <p><strong>Enabled Features:</strong></p>
                  <ul>
                    {config.enabled_features?.student_dashboard?.map(feature => (
                      <li key={feature}>✓ {feature}</li>
                    ))}
                  </ul>
                  <p><strong>Available Quick Actions:</strong></p>
                  <ul>
                    <li>✓ Profile (always)</li>
                    <li>✓ Class Schedule (always)</li>
                    {hasFeature('student_dashboard', 'grades') && <li>✓ Grades</li>}
                    {hasFeature('student_dashboard', 'assignments') && <li>✓ Assignments</li>}
                    {hasFeature('student_dashboard', 'library') && <li>✓ Library</li>}
                    {hasFeature('student_dashboard', 'hostel') && <li>✓ Hostel</li>}
                    {hasFeature('student_dashboard', 'fee_payment') && <li>✓ Fee Payment</li>}
                  </ul>
                </div>
              </div>
            )}
          </>
        );
    }
  };

  return (
    <div className={styles.dashboardContainer}>
      <StudentSidebar activeItem="Dashboard" />
      <div className={styles.mainContent}>
        <StudentHeader />
        <div className={styles.content}>
          {activeTab !== 'overview' && (
            <button 
              className={styles.backBtn}
              onClick={() => setActiveTab('overview')}
            >
              ← Back to Dashboard
            </button>
          )}
          {renderContent()}
        </div>
      </div>
    </div>
  );
};

export default StudentDashboard;
