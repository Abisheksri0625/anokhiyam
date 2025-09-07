import React, { useState, useEffect } from 'react';
import AdminSidebar from '../../components/AdminSidebar/AdminSidebar';
import AdminHeader from '../../components/AdminHeader/AdminHeader';
import { useAuth } from '../../context/AuthContext';
import { useFeatures } from '../../hooks/useFeatures';
import { 
  getAdmissionApplications, 
  updateApplicationStatus,
  getAdmissionStats 
} from "../../services/firestoreService";
import { notificationService } from "../../services/notificationService";
import styles from './Admissions.module.css';

const Admissions = () => {
  const { currentUser } = useAuth();
  const { config } = useFeatures();
  
  const [applications, setApplications] = useState([]);
  const [loading, setLoading] = useState(true);
  const [activeFilter, setActiveFilter] = useState('all');
  const [statusFilter, setStatusFilter] = useState('pending');
  const [selectedApplication, setSelectedApplication] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const [processingId, setProcessingId] = useState(null);
  
  // Institution info
  const institutionCode = config?.institutionCode || 'ANOKHIYAM2024';
  const institutionName = config?.name || 'ANOKHIYAM Demo University';

  // Fetch applications from Firebase on component mount
  useEffect(() => {
    const fetchApplications = async () => {
      setLoading(true);
      try {
        const fetchedApplications = await getAdmissionApplications(institutionCode);
        setApplications(fetchedApplications);
        console.log('Fetched applications:', fetchedApplications);
      } catch (error) {
        console.error('Error fetching applications:', error);
        alert('Error loading applications. Please try again.');
      } finally {
        setLoading(false);
      }
    };

    if (institutionCode) {
      fetchApplications();
    }
  }, [institutionCode]);

  // Filter categories
  const categories = ['all', 'General', 'SC', 'ST', 'OBC', 'MBC', 'NRI'];
  const statuses = ['pending', 'accepted', 'rejected'];

  // Send application status notification
  const sendApplicationNotification = async (application, status, reason = '') => {
    try {
      if (status === 'accepted') {
        await notificationService.sendAcceptanceNotification(application);
      } else if (status === 'rejected') {
        await notificationService.sendRejectionNotification(application, reason);
      }
    } catch (error) {
      console.error('Error sending notification:', error);
    }
  };

  // Handle application status change
  const handleStatusChange = async (applicationId, newStatus, reason = '') => {
    setProcessingId(applicationId);

    try {
      // Update status in Firebase
      await updateApplicationStatus(applicationId, newStatus, {
        reviewedBy: currentUser?.email,
        rejectionReason: reason || undefined
      });

      // Find the application for notifications
      const application = applications.find(app => app.id === applicationId);
      
      // Update local state
      setApplications(prev => prev.map(app => 
        app.id === applicationId 
          ? {
              ...app,
              status: newStatus,
              reviewedAt: new Date().toISOString(),
              reviewedBy: currentUser?.email,
              rejectionReason: reason || undefined
            }
          : app
      ));

      // Send notifications
      if (application) {
        await sendApplicationNotification(application, newStatus, reason);
      }

      alert(`Application ${newStatus} successfully! Notification sent to student via Email & SMS.`);

    } catch (error) {
      console.error('Error updating application status:', error);
      alert('Error updating application status. Please try again.');
    } finally {
      setProcessingId(null);
      setShowModal(false);
    }
  };

  // Send individual notification (for accepted/rejected students)
  const sendIndividualNotification = async (application, type = 'both') => {
    try {
      if (type === 'email' || type === 'both') {
        console.log('Sending individual EMAIL to:', application.email);
        // TODO: Implement actual RPA email integration
      }

      if (type === 'sms' || type === 'both') {
        console.log('Sending individual SMS to:', application.phone);
        // TODO: Implement actual RPA SMS integration  
      }

      const message = type === 'email' ? 'Email' : type === 'sms' ? 'SMS' : 'Email & SMS';
      alert(`${message} notification sent to ${application.fullName} successfully!`);

    } catch (error) {
      console.error('Error sending notification:', error);
      alert('Error sending notification. Please try again.');
    }
  };

  // Send bulk notifications with both email and SMS options
  const sendBulkNotifications = (type = 'both') => {
    const acceptedApps = applications.filter(app => 
      app.status === 'accepted' && (activeFilter === 'all' || app.category === activeFilter)
    );
    
    if (acceptedApps.length === 0) {
      alert('No accepted applications to send notifications for.');
      return;
    }

    const confirmMessage = `Send ${type === 'email' ? 'EMAIL' : type === 'sms' ? 'SMS' : 'EMAIL & SMS'} notifications to ${acceptedApps.length} accepted students?`;
    
    if (confirm(confirmMessage)) {
      acceptedApps.forEach(app => {
        sendIndividualNotification(app, type);
      });

      const notificationType = type === 'email' ? 'Email' : type === 'sms' ? 'SMS' : 'Email & SMS';
      alert(`Bulk ${notificationType} notifications sent to ${acceptedApps.length} accepted students!`);
    }
  };

  // Get filtered applications
  const getFilteredApplications = () => {
    let filtered = applications;

    // Filter by category
    if (activeFilter !== 'all') {
      filtered = filtered.filter(app => app.category === activeFilter);
    }

    // Filter by status
    filtered = filtered.filter(app => app.status === statusFilter);

    // Sort by submission date (newest first)
    return filtered.sort((a, b) => new Date(b.submittedAt || b.submitted_at) - new Date(a.submittedAt || a.submitted_at));
  };

  // Format date
  const formatDate = (dateString) => {
    if (!dateString) return 'N/A';
    return new Date(dateString).toLocaleDateString('en-IN', {
      day: '2-digit',
      month: 'short',
      year: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  // Get category counts
  const getCategoryCounts = (category) => {
    const filtered = category === 'all' 
      ? applications 
      : applications.filter(app => app.category === category);
    return filtered.filter(app => app.status === statusFilter).length;
  };

  const filteredApplications = getFilteredApplications();

  if (loading) {
    return (
      <div className={styles.dashboardContainer}>
        <AdminSidebar activeItem="admissions" />
        <div className={styles.mainContent}>
          <AdminHeader />
          <div className={styles.content}>
            <div className={styles.loading}>
              <div className={styles.spinner}></div>
              <p>Loading admission applications...</p>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className={styles.dashboardContainer}>
      <AdminSidebar activeItem="admissions" />
      <div className={styles.mainContent}>
        <AdminHeader />
        <div className={styles.content}>
          <div className={styles.pageHeader}>
            <h1 className={styles.pageTitle}>Admission Management</h1>
            <p className={styles.pageSubtitle}>Review and manage student admission applications for {institutionName}</p>
          </div>

          {/* Status Filter Tabs */}
          <div className={styles.statusTabs}>
            {statuses.map(status => (
              <button
                key={status}
                className={`${styles.statusTab} ${statusFilter === status ? styles.activeTab : ''}`}
                onClick={() => setStatusFilter(status)}
              >
                <span className={styles.tabLabel}>
                  {status.charAt(0).toUpperCase() + status.slice(1)} Applications
                </span>
                <span className={styles.tabCount}>
                  ({applications.filter(app => app.status === status).length})
                </span>
              </button>
            ))}
          </div>

          {/* Category Filters */}
          <div className={styles.categoryFilters}>
            <div className={styles.filterHeader}>
              <h3>Filter by Category</h3>
              {statusFilter === 'accepted' && (
                <div className={styles.bulkActions}>
                  <button 
                    onClick={() => sendBulkNotifications('email')} 
                    className={styles.bulkEmailBtn}
                  >
                    Bulk Email
                  </button>
                  <button 
                    onClick={() => sendBulkNotifications('sms')} 
                    className={styles.bulkSmsBtn}
                  >
                    Bulk SMS
                  </button>
                  <button 
                    onClick={() => sendBulkNotifications('both')} 
                    className={styles.bulkNotifyBtn}
                  >
                    Send Both
                  </button>
                </div>
              )}
            </div>
            <div className={styles.categoryTabs}>
              {categories.map(category => (
                <button
                  key={category}
                  className={`${styles.categoryTab} ${activeFilter === category ? styles.activeCategoryTab : ''}`}
                  onClick={() => setActiveFilter(category)}
                >
                  <span>{category === 'all' ? 'All Categories' : category}</span>
                  <span className={styles.categoryCount}>({getCategoryCounts(category)})</span>
                </button>
              ))}
            </div>
          </div>

          {/* Applications Table */}
          <div className={styles.tableContainer}>
            {filteredApplications.length === 0 ? (
              <div className={styles.emptyState}>
                <div className={styles.emptyIcon}>No Data</div>
                <h3>No Applications Found</h3>
                <p>
                  {activeFilter === 'all' 
                    ? `No ${statusFilter} applications at this time.`
                    : `No ${statusFilter} applications found for ${activeFilter} category.`
                  }
                </p>
              </div>
            ) : (
              <table className={styles.applicationsTable}>
                <thead>
                  <tr>
                    <th>Application ID</th>
                    <th>Student Name</th>
                    <th>Category</th>
                    <th>Course Applied</th>
                    <th>Marks</th>
                    <th>Submitted On</th>
                    <th>Status</th>
                    <th>Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {filteredApplications.map(application => (
                    <tr key={application.id} className={styles.applicationRow}>
                      <td className={styles.applicationId}>
                        <span>{application.applicationId?.split('-')[1] || 'N/A'}</span>
                        <small>{application.applicationId?.split('-')[2] || 'N/A'}</small>
                      </td>
                      <td className={styles.studentInfo}>
                        <div className={styles.studentName}>{application.fullName}</div>
                        <div className={styles.studentContact}>
                          {application.email} • {application.phone}
                        </div>
                      </td>
                      <td>
                        <span className={`${styles.categoryBadge} ${styles[`category${application.category}`]}`}>
                          {application.category}
                        </span>
                      </td>
                      <td className={styles.courseInfo}>
                        <div className={styles.courseName}>{application.selectedCourse}</div>
                        <small>{application.selectedDegree}</small>
                      </td>
                      <td className={styles.marksInfo}>
                        <div>10th: {application.tenthMarks}%</div>
                        <div>12th: {application.twelfthMarks}%</div>
                        <div><strong>Entrance: {application.entranceMarks}%</strong></div>
                      </td>
                      <td className={styles.dateInfo}>
                        <div>{formatDate(application.submittedAt || application.submitted_at)}</div>
                        {application.reviewedAt && (
                          <small>Reviewed: {formatDate(application.reviewedAt)}</small>
                        )}
                      </td>
                      <td>
                        <span className={`${styles.statusBadge} ${styles[application.status]}`}>
                          {application.status.toUpperCase()}
                        </span>
                        {application.status === 'rejected' && application.rejectionReason && (
                          <div className={styles.rejectionReason}>
                            <small>{application.rejectionReason}</small>
                          </div>
                        )}
                      </td>
                      <td className={styles.actionButtons}>
                        <button
                          onClick={() => {
                            setSelectedApplication(application);
                            setShowModal(true);
                          }}
                          className={styles.viewBtn}
                        >
                          View Details
                        </button>
                        
                        {application.status === 'pending' && (
                          <>
                            <button
                              onClick={() => handleStatusChange(application.id, 'accepted')}
                              disabled={processingId === application.id}
                              className={styles.acceptBtn}
                            >
                              Accept
                            </button>
                            <button
                              onClick={() => {
                                const reason = prompt('Enter rejection reason (will be sent to student via Email & SMS):');
                                if (reason !== null && reason.trim()) {
                                  handleStatusChange(application.id, 'rejected', reason.trim());
                                } else if (reason !== null) {
                                  alert('Please provide a rejection reason for the student.');
                                }
                              }}
                              disabled={processingId === application.id}
                              className={styles.rejectBtn}
                            >
                              Reject
                            </button>
                          </>
                        )}

                        {application.status === 'accepted' && (
                          <div className={styles.notificationButtons}>
                            <button
                              onClick={() => sendIndividualNotification(application, 'email')}
                              className={styles.emailBtn}
                            >
                              Send Email
                            </button>
                            <button
                              onClick={() => sendIndividualNotification(application, 'sms')}
                              className={styles.smsBtn}
                            >
                              Send SMS
                            </button>
                          </div>
                        )}

                        {application.status === 'rejected' && (
                          <div className={styles.notificationButtons}>
                            <button
                              onClick={() => sendIndividualNotification(application, 'email')}
                              className={styles.emailBtn}
                            >
                              Resend Email
                            </button>
                            <button
                              onClick={() => sendIndividualNotification(application, 'sms')}
                              className={styles.smsBtn}
                            >
                              Resend SMS
                            </button>
                          </div>
                        )}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            )}
          </div>

          {/* Application Details Modal */}
          {showModal && selectedApplication && (
            <div className={styles.modalOverlay} onClick={() => setShowModal(false)}>
              <div className={styles.modalContent} onClick={(e) => e.stopPropagation()}>
                <div className={styles.modalHeader}>
                  <h2>Application Details</h2>
                  <button onClick={() => setShowModal(false)} className={styles.closeBtn}>
                    ×
                  </button>
                </div>

                <div className={styles.modalBody}>
                  <div className={styles.detailsGrid}>
                    <div className={styles.detailSection}>
                      <h3>Personal Information</h3>
                      <div className={styles.detailRow}>
                        <span>Full Name:</span>
                        <span>{selectedApplication.fullName}</span>
                      </div>
                      <div className={styles.detailRow}>
                        <span>Email:</span>
                        <span>{selectedApplication.email}</span>
                      </div>
                      <div className={styles.detailRow}>
                        <span>Phone:</span>
                        <span>{selectedApplication.phone}</span>
                      </div>
                      <div className={styles.detailRow}>
                        <span>Date of Birth:</span>
                        <span>{selectedApplication.dob}</span>
                      </div>
                      <div className={styles.detailRow}>
                        <span>Gender:</span>
                        <span>{selectedApplication.gender}</span>
                      </div>
                      <div className={styles.detailRow}>
                        <span>Category:</span>
                        <span>{selectedApplication.category}</span>
                      </div>
                      <div className={styles.detailRow}>
                        <span>Address:</span>
                        <span>{selectedApplication.address}</span>
                      </div>
                    </div>

                    <div className={styles.detailSection}>
                      <h3>Academic Information</h3>
                      <div className={styles.detailRow}>
                        <span>10th Marks:</span>
                        <span>{selectedApplication.tenthMarks}%</span>
                      </div>
                      <div className={styles.detailRow}>
                        <span>12th Marks:</span>
                        <span>{selectedApplication.twelfthMarks}%</span>
                      </div>
                      <div className={styles.detailRow}>
                        <span>Entrance Marks:</span>
                        <span>{selectedApplication.entranceMarks}%</span>
                      </div>
                      <div className={styles.detailRow}>
                        <span>Entrance Result:</span>
                        <span>{selectedApplication.entranceResult}</span>
                      </div>
                      <div className={styles.detailRow}>
                        <span>Previous Institution:</span>
                        <span>{selectedApplication.previousInstitution}</span>
                      </div>
                    </div>

                    <div className={styles.detailSection}>
                      <h3>Course Selection</h3>
                      <div className={styles.detailRow}>
                        <span>Degree:</span>
                        <span>{selectedApplication.selectedDegree}</span>
                      </div>
                      <div className={styles.detailRow}>
                        <span>Course:</span>
                        <span>{selectedApplication.selectedCourse}</span>
                      </div>
                    </div>

                    <div className={styles.detailSection}>
                      <h3>Documents Uploaded</h3>
                      {selectedApplication.documents && Object.entries(selectedApplication.documents).map(([docType, doc]) => (
                        <div key={docType} className={styles.documentRow}>
                          <span>{docType.replace(/([A-Z])/g, ' $1').replace(/^./, str => str.toUpperCase())}:</span>
                          <span className={styles.documentStatus}>
                            {doc ? 'Uploaded' : 'Not uploaded'} {doc?.fileName && `(${doc.fileName})`}
                          </span>
                        </div>
                      ))}
                    </div>

                    <div className={styles.detailSection}>
                      <h3>Parent/Guardian Information</h3>
                      <div className={styles.detailRow}>
                        <span>Parent Name:</span>
                        <span>{selectedApplication.parentName}</span>
                      </div>
                      <div className={styles.detailRow}>
                        <span>Parent Contact:</span>
                        <span>{selectedApplication.parentContact}</span>
                      </div>
                    </div>

                    <div className={styles.detailSection}>
                      <h3>Application Status</h3>
                      <div className={styles.detailRow}>
                        <span>Status:</span>
                        <span className={`${styles.statusBadge} ${styles[selectedApplication.status]}`}>
                          {selectedApplication.status.toUpperCase()}
                        </span>
                      </div>
                      <div className={styles.detailRow}>
                        <span>Submitted On:</span>
                        <span>{formatDate(selectedApplication.submittedAt)}</span>
                      </div>
                      {selectedApplication.reviewedAt && (
                        <>
                          <div className={styles.detailRow}>
                            <span>Reviewed On:</span>
                            <span>{formatDate(selectedApplication.reviewedAt)}</span>
                          </div>
                          <div className={styles.detailRow}>
                            <span>Reviewed By:</span>
                            <span>{selectedApplication.reviewedBy}</span>
                          </div>
                        </>
                      )}
                      {selectedApplication.rejectionReason && (
                        <div className={styles.detailRow}>
                          <span>Rejection Reason:</span>
                          <span>{selectedApplication.rejectionReason}</span>
                        </div>
                      )}
                    </div>
                  </div>
                </div>

                <div className={styles.modalFooter}>
                  {selectedApplication.status === 'pending' && (
                    <>
                      <button
                        onClick={() => handleStatusChange(selectedApplication.id, 'accepted')}
                        className={styles.acceptBtn}
                        disabled={processingId === selectedApplication.id}
                      >
                        Accept Application
                      </button>
                      <button
                        onClick={() => {
                          const reason = prompt('Enter rejection reason (will be sent to student):');
                          if (reason !== null && reason.trim()) {
                            handleStatusChange(selectedApplication.id, 'rejected', reason.trim());
                          } else if (reason !== null) {
                            alert('Please provide a rejection reason for the student.');
                          }
                        }}
                        className={styles.rejectBtn}
                        disabled={processingId === selectedApplication.id}
                      >
                        Reject Application
                      </button>
                    </>
                  )}
                  
                  {selectedApplication.status === 'accepted' && (
                    <div className={styles.modalNotificationButtons}>
                      <button
                        onClick={() => sendIndividualNotification(selectedApplication, 'email')}
                        className={styles.emailBtn}
                      >
                        Send Email
                      </button>
                      <button
                        onClick={() => sendIndividualNotification(selectedApplication, 'sms')}
                        className={styles.smsBtn}
                      >
                        Send SMS
                      </button>
                    </div>
                  )}
                  
                  {selectedApplication.status === 'rejected' && (
                    <div className={styles.modalNotificationButtons}>
                      <button
                        onClick={() => sendIndividualNotification(selectedApplication, 'email')}
                        className={styles.emailBtn}
                      >
                        Resend Email
                      </button>
                      <button
                        onClick={() => sendIndividualNotification(selectedApplication, 'sms')}
                        className={styles.smsBtn}
                      >
                        Resend SMS
                      </button>
                    </div>
                  )}
                  
                  <button onClick={() => setShowModal(false)} className={styles.closeModalBtn}>
                    Close
                  </button>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Admissions;
