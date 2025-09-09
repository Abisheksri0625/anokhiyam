import React, { useState, useEffect } from 'react';
import { 
  collection, 
  query, 
  where, 
  orderBy, 
  onSnapshot, 
  doc, 
  updateDoc,
  serverTimestamp 
} from 'firebase/firestore';
import { db } from '../../../config/firebase';
import AdminSidebar from '../../../components/AdminSidebar/AdminSidebar';
import AdminHeader from '../../../components/AdminHeader/AdminHeader';
import ApplicationDetailsModal from '../../../components/ApplicationDetailsModal/ApplicationDetailsModal';
import styles from './Admissions.module.css';
import { 
  Eye, 
  CheckCircle, 
  XCircle, 
  Clock,
  Users,
  TrendUp,
  User,
  GraduationCap
} from 'phosphor-react';

const Admissions = () => {
  const [applications, setApplications] = useState([]);
  const [filteredApplications, setFilteredApplications] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState('pending');
  const [selectedCaste, setSelectedCaste] = useState('all');
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [stats, setStats] = useState({
    pending: 0,
    accepted: 0,
    rejected: 0,
    total: 0
  });
  
  // Modal state
  const [showModal, setShowModal] = useState(false);
  const [selectedApplicationId, setSelectedApplicationId] = useState(null);

  const categories = [
    { id: 'pending', label: 'Pending Review', color: '#f59e0b', icon: Clock },
    { id: 'accepted', label: 'Accepted', color: '#10b981', icon: CheckCircle },
    { id: 'rejected', label: 'Rejected', color: '#ef4444', icon: XCircle }
  ];

  const castes = [
    { id: 'all', label: 'All Categories' },
    { id: 'OC', label: 'Open Category' },
    { id: 'BC', label: 'Backward Class' },
    { id: 'MBC', label: 'Most Backward Class' },
    { id: 'SC', label: 'Scheduled Caste' },
    { id: 'ST', label: 'Scheduled Tribe' }
  ];

  useEffect(() => {
    loadApplications();
  }, []);

  useEffect(() => {
    filterApplications();
  }, [applications, selectedCategory, selectedCaste]);

  const loadApplications = () => {
    try {
      console.log('Loading applications...');
      const q = query(
        collection(db, 'admission_applications'),
        where('institutionCode', '==', 'DEMO001'),
        orderBy('priority', 'asc')
      );

      const unsubscribe = onSnapshot(q, (querySnapshot) => {
        const apps = [];
        querySnapshot.forEach((doc) => {
          apps.push({
            id: doc.id,
            ...doc.data()
          });
        });

        console.log('Loaded applications:', apps.length);
        setApplications(apps);
        calculateStats(apps);
        setLoading(false);
      }, (error) => {
        console.error('Error loading applications:', error);
        setError('Failed to load applications: ' + error.message);
        setLoading(false);
      });

      return () => unsubscribe();
    } catch (error) {
      console.error('Error setting up listener:', error);
      setError('Error setting up data listener: ' + error.message);
      setLoading(false);
    }
  };

  const calculateStats = (apps) => {
    const stats = {
      pending: apps.filter(app => app.status === 'pending').length,
      accepted: apps.filter(app => app.status === 'accepted').length,
      rejected: apps.filter(app => app.status === 'rejected').length,
      total: apps.length
    };
    setStats(stats);
  };

  const filterApplications = () => {
    let filtered = applications;

    // Filter by status (pending, accepted, rejected)
    if (selectedCategory !== 'all') {
      filtered = filtered.filter(app => app.status === selectedCategory);
    }

    // Filter by caste category
    if (selectedCaste !== 'all') {
      filtered = filtered.filter(app => app.personalInfo?.category === selectedCaste);
    }

    setFilteredApplications(filtered);
  };

  const handleViewDetails = (applicationId) => {
    setSelectedApplicationId(applicationId);
    setShowModal(true);
  };

  const handleCloseModal = () => {
    setShowModal(false);
    setSelectedApplicationId(null);
  };

  const handleAcceptApplication = async (applicationId) => {
    try {
      const docRef = doc(db, 'admission_applications', applicationId);
      await updateDoc(docRef, {
        status: 'accepted',
        processedDate: serverTimestamp(),
        processedBy: 'admin'
      });
      
      console.log('Application accepted:', applicationId);
      // Note: Add notification service here for SMS/Email
    } catch (error) {
      console.error('Error accepting application:', error);
      alert('Error accepting application: ' + error.message);
    }
  };

  const handleRejectApplication = async (applicationId) => {
    const reason = prompt('Please enter rejection reason:');
    if (!reason) return;

    try {
      const docRef = doc(db, 'admission_applications', applicationId);
      await updateDoc(docRef, {
        status: 'rejected',
        rejectionReason: reason,
        processedDate: serverTimestamp(),
        processedBy: 'admin'
      });
      
      console.log('Application rejected:', applicationId);
      // Note: Add notification service here for SMS/Email
    } catch (error) {
      console.error('Error rejecting application:', error);
      alert('Error rejecting application: ' + error.message);
    }
  };

  const renderApplicationCard = (application) => (
    <div key={application.id} className={styles.applicationCard}>
      <div className={styles.cardHeader}>
        <div className={styles.studentInfo}>
          <div className={styles.avatar}>
            <User size={20} />
          </div>
          <div className={styles.studentDetails}>
            <h3 className={styles.studentName}>
              {application.personalInfo?.firstName} {application.personalInfo?.lastName}
            </h3>
            <p className={styles.studentId}>UID: {application.uid}</p>
          </div>
        </div>
        <div className={styles.cardActions}>
          <button 
            className={styles.viewButton}
            onClick={() => handleViewDetails(application.id)}
            title="View Details"
          >
            <Eye size={16} />
            View Details
          </button>
        </div>
      </div>

      <div className={styles.cardBody}>
        <div className={styles.infoRow}>
          <span className={styles.label}>Course:</span>
          <span className={styles.value}>{application.selectedCourse}</span>
        </div>
        <div className={styles.infoRow}>
          <span className={styles.label}>Category:</span>
          <span className={`${styles.value} ${styles.categoryBadge} ${styles[application.personalInfo?.category?.toLowerCase()]}`}>
            {application.personalInfo?.category}
          </span>
        </div>
        <div className={styles.infoRow}>
          <span className={styles.label}>Percentage:</span>
          <span className={styles.value}>{application.academicInfo?.entrancePercentage}%</span>
        </div>
        <div className={styles.infoRow}>
          <span className={styles.label}>Email:</span>
          <span className={styles.value}>{application.contactInfo?.studentEmail}</span>
        </div>
      </div>

      {selectedCategory === 'pending' && (
        <div className={styles.cardFooter}>
          <button 
            className={styles.acceptButton}
            onClick={() => handleAcceptApplication(application.id)}
          >
            <CheckCircle size={16} />
            Accept
          </button>
          <button 
            className={styles.rejectButton}
            onClick={() => handleRejectApplication(application.id)}
          >
            <XCircle size={16} />
            Reject
          </button>
        </div>
      )}

      {application.status === 'rejected' && application.rejectionReason && (
        <div className={styles.rejectionReason}>
          <strong>Rejection Reason:</strong> {application.rejectionReason}
        </div>
      )}
    </div>
  );

  return (
    <div className={styles.dashboardContainer}>
      <AdminSidebar activeItem="admissions" />
      <div className={styles.mainContent}>
        <AdminHeader />
        <div className={styles.content}>
          
          <div className={styles.pageHeader}>
            <h1 className={styles.pageTitle}>Admission Management</h1>
            <p className={styles.pageSubtitle}>
              Review and approve student applications based on caste categories (FCFS Method)
            </p>
          </div>

          {/* Stats Cards */}
          <div className={styles.statsGrid}>
            {categories.map((category) => {
              const IconComponent = category.icon;
              return (
                <div 
                  key={category.id} 
                  className={`${styles.statCard} ${selectedCategory === category.id ? styles.active : ''}`}
                  onClick={() => setSelectedCategory(category.id)}
                >
                  <div className={styles.statIcon} style={{ color: category.color }}>
                    <IconComponent size={24} />
                  </div>
                  <div className={styles.statContent}>
                    <h3>{stats[category.id] || 0}</h3>
                    <p>{category.label}</p>
                  </div>
                </div>
              );
            })}
            <div className={styles.statCard}>
              <div className={styles.statIcon} style={{ color: '#6b7280' }}>
                <TrendUp size={24} />
              </div>
              <div className={styles.statContent}>
                <h3>{stats.total}</h3>
                <p>Total Applications</p>
              </div>
            </div>
          </div>

          {/* Filter Controls */}
          <div className={styles.filterControls}>
            <div className={styles.filterGroup}>
              <label>Status:</label>
              <select 
                value={selectedCategory} 
                onChange={(e) => setSelectedCategory(e.target.value)}
                className={styles.filterSelect}
              >
                {categories.map((category) => (
                  <option key={category.id} value={category.id}>
                    {category.label}
                  </option>
                ))}
              </select>
            </div>

            <div className={styles.filterGroup}>
              <label>Caste Category:</label>
              <select 
                value={selectedCaste} 
                onChange={(e) => setSelectedCaste(e.target.value)}
                className={styles.filterSelect}
              >
                {castes.map((caste) => (
                  <option key={caste.id} value={caste.id}>
                    {caste.label}
                  </option>
                ))}
              </select>
            </div>
          </div>

          {/* Applications List */}
          <div className={styles.applicationsSection}>
            <div className={styles.sectionHeader}>
              <h2>
                {categories.find(c => c.id === selectedCategory)?.label} - {selectedCaste === 'all' ? 'All Categories' : selectedCaste}
                <span className={styles.count}>({filteredApplications.length})</span>
              </h2>
              {selectedCategory === 'pending' && (
                <p className={styles.fcfsNote}>⏰ First Come First Serve Order</p>
              )}
            </div>

            {loading && (
              <div className={styles.loading}>
                <div className={styles.spinner}></div>
                <p>Loading applications...</p>
              </div>
            )}

            {error && (
              <div className={styles.error}>
                <p>❌ {error}</p>
              </div>
            )}

            {!loading && filteredApplications.length === 0 && (
              <div className={styles.emptyState}>
                <Users size={48} />
                <h3>No applications in this category</h3>
                <p>Applications will appear here once students submit their forms.</p>
              </div>
            )}

            {!loading && filteredApplications.length > 0 && (
              <div className={styles.applicationsGrid}>
                {filteredApplications.map(renderApplicationCard)}
              </div>
            )}
          </div>

        </div>
      </div>

      {/* Application Details Modal */}
      <ApplicationDetailsModal
        applicationId={selectedApplicationId}
        isOpen={showModal}
        onClose={handleCloseModal}
      />
    </div>
  );
};

export default Admissions;
