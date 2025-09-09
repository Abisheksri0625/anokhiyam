import React, { useState, useEffect } from 'react';
import { 
  collection, 
  query, 
  where, 
  orderBy, 
  onSnapshot, 
  doc, 
  updateDoc,
  serverTimestamp,
  getDoc,
  addDoc
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
  Envelope,
  CreditCard
} from 'phosphor-react';
import emailjs from '@emailjs/browser';

// ============ EMAILJS CONFIGURATION ============
const EMAILJS_SERVICE_ID = 'service_7o20qlk';           
const EMAILJS_ADMISSION_TEMPLATE_ID = 'template_avvkrhs';  // Admission confirmation template
const EMAILJS_CREDENTIALS_TEMPLATE_ID = 'template_739g1n7'; // New credentials template  
const EMAILJS_PUBLIC_KEY = 'igm9usvUOfWwmFVTU';         

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
  
  const [showModal, setShowModal] = useState(false);
  const [selectedApplicationId, setSelectedApplicationId] = useState(null);
  const [credentials, setCredentials] = useState([]);
  const [loadingCredentials, setLoadingCredentials] = useState(false);

  const categories = [
    { id: 'pending', label: 'Pending Review', color: '#f59e0b', icon: Clock },
    { id: 'accepted', label: 'Accepted', color: '#10b981', icon: CheckCircle },
    { id: 'rejected', label: 'Rejected', color: '#ef4444', icon: XCircle },
    { id: 'credentials', label: 'Student Credentials', color: '#3b82f6', icon: User }
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
    if (EMAILJS_PUBLIC_KEY && EMAILJS_PUBLIC_KEY !== 'YOUR_PUBLIC_KEY_HERE') {
      emailjs.init(EMAILJS_PUBLIC_KEY);
      console.log('✅ EmailJS initialized');
    } else {
      console.warn('⚠️ EmailJS Public Key not configured');
    }
    
    loadApplications();
  }, []);

  useEffect(() => {
    filterApplications();
  }, [applications, selectedCategory, selectedCaste]);

  useEffect(() => {
    if (selectedCategory === 'credentials') {
      loadStudentCredentials();
    }
  }, [selectedCategory]);

  const loadApplications = () => {
    try {
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

    if (selectedCategory !== 'all') {
      filtered = filtered.filter(app => app.status === selectedCategory);
    }

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

  // ============ CREDENTIAL GENERATION FUNCTIONS ============
  const generateRandomPassword = () => {
    const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789!@#$%&*';
    let password = '';
    for (let i = 0; i < 10; i++) {
      password += chars.charAt(Math.floor(Math.random() * chars.length));
    }
    return password;
  };

  // ============ CREATE STUDENT USER RECORD (FIRESTORE ONLY - NO FIREBASE AUTH) ============
  const createStudentUserRecord = async (email, password, userData) => {
    try {
      console.log('👤 Creating student user record for:', email);

      // Create user record in Firestore only (NO Firebase Auth creation)
      // Student will create Firebase Auth account on first login
      await addDoc(collection(db, 'users'), {
        email: email,
        firstName: userData.firstName,
        lastName: userData.lastName,
        displayName: userData.fullName,
        role: 'student', // ← STUDENT ROLE
        institutionCode: 'DEMO001',
        isActive: true,
        course: userData.course,
        category: userData.category,
        // Temporary password for first-time login
        tempPassword: password,
        passwordChanged: false, // ← Will be set to true on first login
        createdDate: serverTimestamp(),
        createdBy: 'admin',
        lastLogin: null
      });

      console.log('✅ Student user record created in Firestore (no Firebase Auth created)');
      return { success: true, message: 'User record created' };

    } catch (error) {
      console.error('❌ Failed to create student user record:', error);
      return { success: false, error: error.message };
    }
  };

  // ============ EMAIL FUNCTION 1: ADMISSION CONFIRMATION ============
  const sendAdmissionConfirmationEmail = async (studentData, status, rejectionReason = '') => {
    try {
      console.log('📧 Sending admission confirmation email...');
      
      if (!EMAILJS_SERVICE_ID || !EMAILJS_ADMISSION_TEMPLATE_ID || !EMAILJS_PUBLIC_KEY) {
        throw new Error('EmailJS configuration incomplete');
      }

      const studentName = `${studentData.personalInfo?.firstName || ''} ${studentData.personalInfo?.lastName || ''}`.trim();
      const studentEmail = studentData.contactInfo?.studentEmail;
      
      if (!studentEmail) {
        throw new Error('Student email not found');
      }

      const templateParams = {
        to_email: studentEmail,
        student_name: studentName,
        course_name: studentData.selectedCourse,
        college_name: 'ANOKHIYAM College',
        admission_status: status,
        rejection_reason: rejectionReason || '',
        contact_phone: '9876543210'
      };

      console.log('📧 Admission email params:', templateParams);

      const response = await emailjs.send(
        EMAILJS_SERVICE_ID,
        EMAILJS_ADMISSION_TEMPLATE_ID,
        templateParams,
        EMAILJS_PUBLIC_KEY
      );

      console.log('✅ Admission confirmation email sent');
      return { success: true };
      
    } catch (error) {
      console.error('❌ Admission email failed:', error);
      return { success: false, error: error.message };
    }
  };

  // ============ EMAIL FUNCTION 2: CREDENTIALS EMAIL ============
  const sendCredentialsEmail = async (credentialData) => {
    try {
      console.log('🔑 Sending credentials email...');

      if (!EMAILJS_SERVICE_ID || !EMAILJS_CREDENTIALS_TEMPLATE_ID || !EMAILJS_PUBLIC_KEY) {
        throw new Error('EmailJS credentials configuration incomplete');
      }

      const templateParams = {
        to_email: credentialData.studentEmail,
        student_name: credentialData.studentName,
        course_name: credentialData.course,
        college_name: 'ANOKHIYAM College',
        admission_status: 'confirmed',
        username: credentialData.loginEmail,    // ← ACTUAL EMAIL ADDRESS
        password: credentialData.loginPassword, // ← TEMP PASSWORD
        login_url: 'https://your-website.com/login', // ← REPLACE WITH YOUR LOGIN URL
        contact_phone: '9876543210'
      };

      console.log('🔑 Credentials email params:', templateParams);

      const response = await emailjs.send(
        EMAILJS_SERVICE_ID,
        EMAILJS_CREDENTIALS_TEMPLATE_ID,
        templateParams,
        EMAILJS_PUBLIC_KEY
      );

      console.log('✅ Credentials email sent');
      return { success: true };
    } catch (error) {
      console.error('❌ Credentials email failed:', error);
      return { success: false, error: error.message };
    }
  };

  // ============ ENHANCED ACCEPT APPLICATION (USING ACTUAL EMAIL) ============
  const handleAcceptApplication = async (applicationId) => {
    if (!window.confirm('✅ Accept this application?\n\nThis will:\n- Update application status\n- Add to accepted students\n- Generate login credentials using STUDENT EMAIL\n- Send ADMISSION CONFIRMATION email')) {
      return;
    }

    try {
      const docRef = doc(db, 'admission_applications', applicationId);
      const docSnap = await getDoc(docRef);
      
      if (!docSnap.exists()) {
        alert('❌ Application not found');
        return;
      }

      const applicationData = docSnap.data();
      console.log('📋 Processing application:', applicationData);

      const studentDetails = {
        firstName: applicationData.personalInfo?.firstName || '',
        lastName: applicationData.personalInfo?.lastName || '',
        fullName: `${applicationData.personalInfo?.firstName || ''} ${applicationData.personalInfo?.lastName || ''}`.trim(),
        studentEmail: applicationData.contactInfo?.studentEmail || '', // ← ACTUAL STUDENT EMAIL
        studentPhone: applicationData.contactInfo?.studentPhone || '',
        selectedCourse: applicationData.selectedCourse || '',
        category: applicationData.personalInfo?.category || '',
        uid: applicationData.uid || '',
        entrancePercentage: applicationData.academicInfo?.entrancePercentage || 0
      };

      // STEP 1: Update application status
      await updateDoc(docRef, {
        status: 'accepted',
        processedDate: serverTimestamp(),
        processedBy: 'admin'
      });

      // STEP 2: Add to accepted_students collection
      const acceptedStudentDoc = await addDoc(collection(db, 'accepted_students'), {
        applicationId: applicationId,
        uid: studentDetails.uid,
        firstName: studentDetails.firstName,
        lastName: studentDetails.lastName,
        fullName: studentDetails.fullName,
        studentEmail: studentDetails.studentEmail, // ← ACTUAL EMAIL
        studentPhone: studentDetails.studentPhone,
        course: studentDetails.selectedCourse,
        category: studentDetails.category,
        entrancePercentage: studentDetails.entrancePercentage,
        acceptedDate: serverTimestamp(),
        acceptedBy: 'admin',
        feesPaid: false,
        paymentStatus: 'pending'
      });

      // STEP 3: Generate PASSWORD (use actual email)
      const password = generateRandomPassword();

      console.log('🔑 Generated credentials:', { 
        email: studentDetails.studentEmail, // ← ACTUAL EMAIL
        password: password 
      });

      // STEP 4: Add to student_credentials collection (EMAIL-BASED)
      const credentialsDoc = await addDoc(collection(db, 'student_credentials'), {
        applicationId: applicationId,
        acceptedStudentId: acceptedStudentDoc.id,
        uid: studentDetails.uid,
        studentEmail: studentDetails.studentEmail, // ← ACTUAL EMAIL
        studentName: studentDetails.fullName,
        firstName: studentDetails.firstName,
        lastName: studentDetails.lastName,
        course: studentDetails.selectedCourse,
        loginEmail: studentDetails.studentEmail, // ← EMAIL FOR LOGIN
        loginPassword: password, // ← PASSWORD FOR LOGIN
        active: false, // ← Inactive until fees paid
        credentialsSent: false,
        feesPaid: false,
        createdDate: serverTimestamp(),
        lastEmailSent: null,
        createdBy: 'admin'
      });

      // STEP 5: Send ADMISSION CONFIRMATION email
      const admissionEmailResult = await sendAdmissionConfirmationEmail(applicationData, 'accepted');

      // STEP 6: Show success message
      let message = `🎉 ${studentDetails.fullName} ACCEPTED!\n\n`;
      message += `✅ Application status updated\n`;
      message += `✅ Added to accepted students\n`;
      message += `🔑 Login credentials prepared:\n`;
      message += `   Email: ${studentDetails.studentEmail}\n`; // ← SHOW ACTUAL EMAIL
      message += `   Password: ${password}\n\n`;
      message += admissionEmailResult.success ? '📧 Admission confirmation email sent\n' : '❌ Admission email failed\n';
      message += `\n💡 Send login credentials from "Student Credentials" tab after fees payment`;
      
      alert(message);

    } catch (error) {
      console.error('❌ Auto-accept process failed:', error);
      alert(`❌ Error: ${error.message}`);
    }
  };

  // ============ REJECT APPLICATION ============
  const handleRejectApplication = async (applicationId) => {
    const reason = prompt('📝 Please enter rejection reason (required):');
    if (!reason || reason.trim() === '') {
      alert('❌ Rejection reason is required');
      return;
    }

    if (!window.confirm('❌ Reject this application?\n\nStudent will receive email notification.')) {
      return;
    }

    try {
      const docRef = doc(db, 'admission_applications', applicationId);
      const docSnap = await getDoc(docRef);
      
      if (!docSnap.exists()) {
        alert('❌ Application not found');
        return;
      }

      const applicationData = docSnap.data();
      const studentName = applicationData.personalInfo?.firstName || 'Student';

      await updateDoc(docRef, {
        status: 'rejected',
        rejectionReason: reason.trim(),
        processedDate: serverTimestamp(),
        processedBy: 'admin'
      });

      const emailResult = await sendAdmissionConfirmationEmail(applicationData, 'rejected', reason);

      if (emailResult.success) {
        alert(`❌ ${studentName} rejected successfully!\n📧 Email sent to ${applicationData.contactInfo?.studentEmail}`);
      } else {
        alert(`❌ ${studentName} rejected!\n❌ Email failed: ${emailResult.error}`);
      }

    } catch (error) {
      console.error('❌ Error rejecting application:', error);
      alert('❌ Error: ' + error.message);
    }
  };

  // ============ CREDENTIALS MANAGEMENT FUNCTIONS ============
  const loadStudentCredentials = () => {
    setLoadingCredentials(true);
    try {
      const q = query(
        collection(db, 'student_credentials'),
        orderBy('createdDate', 'desc')
      );

      const unsubscribe = onSnapshot(q, (querySnapshot) => {
        const creds = [];
        querySnapshot.forEach((doc) => {
          creds.push({
            id: doc.id,
            ...doc.data()
          });
        });
        setCredentials(creds);
        setLoadingCredentials(false);
      });

      return () => unsubscribe();
    } catch (error) {
      console.error('Error loading credentials:', error);
      setLoadingCredentials(false);
    }
  };

  const toggleCredentialStatus = async (credentialId, currentStatus) => {
    try {
      await updateDoc(doc(db, 'student_credentials', credentialId), {
        active: !currentStatus
      });
      alert(`✅ Credential status updated to ${!currentStatus ? 'ACTIVE' : 'INACTIVE'}`);
    } catch (error) {
      alert('❌ Error updating status: ' + error.message);
    }
  };

  const markFeesPaid = async (credentialId) => {
    try {
      await updateDoc(doc(db, 'student_credentials', credentialId), {
        feesPaid: true,
        active: true,
        paymentDate: serverTimestamp()
      });
      alert(`✅ Fees marked as paid! Account activated.`);
    } catch (error) {
      alert('❌ Error updating fees status: ' + error.message);
    }
  };

  const sendCredentialsEmailToStudent = async (credential) => {
    if (!credential.feesPaid) {
      if (!window.confirm('⚠️ Fees not marked as paid yet.\n\nSend credentials email anyway?')) {
        return;
      }
    }

    try {
      // STEP 1: Create user record in Firestore (NOT Firebase Auth)
      const authResult = await createStudentUserRecord(
        credential.studentEmail,
        credential.loginPassword,
        {
          firstName: credential.firstName,
          lastName: credential.lastName,
          fullName: credential.studentName,
          course: credential.course,
          category: credential.category || 'OC'
        }
      );

      if (!authResult.success && !authResult.message) {
        alert('❌ Failed to create user record: ' + authResult.error);
        return;
      }

      // STEP 2: Send credentials email
      const result = await sendCredentialsEmail({
        studentEmail: credential.studentEmail,
        studentName: credential.studentName,
        loginEmail: credential.studentEmail, // ← EMAIL FOR LOGIN (same as student email)
        loginPassword: credential.loginPassword,
        course: credential.course
      });

      if (result.success) {
        // STEP 3: Update credentials status
        await updateDoc(doc(db, 'student_credentials', credential.id), {
          credentialsSent: true,
          lastEmailSent: serverTimestamp(),
          active: true, // ← ACTIVATE WHEN CREDENTIALS SENT
          userRecordCreated: true // ← TRACK USER RECORD CREATION
        });
        
        alert(`✅ Login credentials sent to ${credential.studentName}!\n👤 User record created in system\n📧 Email: ${credential.studentEmail}\n🔑 Password: ${credential.loginPassword}\n\n⚠️ Admin stays logged in - Student will create Firebase Auth account on first login`);
      } else {
        alert('❌ Failed to send credentials email');
      }
    } catch (error) {
      alert('❌ Failed to send credentials: ' + error.message);
    }
  };

  // ============ RENDER APPLICATION CARD ============
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
            title="Accept and send admission confirmation"
          >
            <CheckCircle size={16} />
            <Envelope size={14} />
            Accept & Send Admission Email
          </button>
          <button 
            className={styles.rejectButton}
            onClick={() => handleRejectApplication(application.id)}
            title="Reject and send email notification"
          >
            <XCircle size={16} />
            <Envelope size={14} />
            Reject & Email
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

  // ============ RENDER CREDENTIALS CARD ============
  const renderCredentialCard = (credential) => (
    <div key={credential.id} className={styles.applicationCard}>
      <div className={styles.cardHeader}>
        <div className={styles.studentInfo}>
          <div className={styles.avatar}>
            <User size={20} />
          </div>
          <div className={styles.studentDetails}>
            <h3 className={styles.studentName}>{credential.studentName}</h3>
            <p className={styles.studentId}>{credential.studentEmail}</p>
          </div>
        </div>
        <div className={styles.statusContainer}>
          <div className={`${styles.statusBadge} ${credential.active ? styles.active : styles.inactive}`}>
            {credential.active ? 'ACTIVE' : 'INACTIVE'}
          </div>
          <div className={`${styles.statusBadge} ${credential.feesPaid ? styles.paid : styles.unpaid}`}>
            {credential.feesPaid ? 'FEES PAID' : 'FEES PENDING'}
          </div>
        </div>
      </div>

      <div className={styles.cardBody}>
        <div className={styles.infoRow}>
          <span className={styles.label}>Course:</span>
          <span className={styles.value}>{credential.course}</span>
        </div>
        <div className={styles.infoRow}>
          <span className={styles.label}>Login Email:</span>
          <span className={styles.value}>{credential.studentEmail}</span>
        </div>
        <div className={styles.infoRow}>
          <span className={styles.label}>Password:</span>
          <span className={styles.value}>{credential.loginPassword}</span>
        </div>
        <div className={styles.infoRow}>
          <span className={styles.label}>Created:</span>
          <span className={styles.value}>
            {credential.createdDate?.toDate ? credential.createdDate.toDate().toLocaleDateString() : 'N/A'}
          </span>
        </div>
        <div className={styles.infoRow}>
          <span className={styles.label}>Credentials Sent:</span>
          <span className={`${styles.value} ${credential.credentialsSent ? styles.sent : styles.notSent}`}>
            {credential.credentialsSent ? 'YES' : 'NO'}
          </span>
        </div>
      </div>

      <div className={styles.cardFooter}>
        {!credential.feesPaid && (
          <button 
            className={styles.payButton}
            onClick={() => markFeesPaid(credential.id)}
            title="Mark fees as paid"
          >
            <CreditCard size={16} />
            Mark Fees Paid
          </button>
        )}
        <button 
          className={`${styles.acceptButton} ${!credential.active ? styles.rejectButton : ''}`}
          onClick={() => toggleCredentialStatus(credential.id, credential.active)}
          title={credential.active ? 'Deactivate login access' : 'Activate login access'}
        >
          {credential.active ? 'Deactivate' : 'Activate'}
        </button>
        <button 
          className={styles.acceptButton}
          onClick={() => sendCredentialsEmailToStudent(credential)}
          title="Create user record & send login credentials (Admin stays logged in)"
        >
          <Envelope size={16} />
          Send Credentials
        </button>
      </div>
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
              📧 Dual Email System: Admission Confirmation + Login Credentials (Admin Safe)
            </p>
          </div>

          {/* Stats Cards */}
          <div className={styles.statsGrid}>
            {categories.map((category) => {
              const IconComponent = category.icon;
              let count = 0;
              if (category.id === 'credentials') {
                count = credentials.length;
              } else {
                count = stats[category.id] || 0;
              }
              
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
                    <h3>{count}</h3>
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
          {selectedCategory !== 'credentials' && (
            <div className={styles.filterControls}>
              <div className={styles.filterGroup}>
                <label>Status:</label>
                <select 
                  value={selectedCategory} 
                  onChange={(e) => setSelectedCategory(e.target.value)}
                  className={styles.filterSelect}
                >
                  {categories.filter(cat => cat.id !== 'credentials').map((category) => (
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
          )}

          {/* Applications List */}
          <div className={styles.applicationsSection}>
            <div className={styles.sectionHeader}>
              <h2>
                {selectedCategory === 'credentials' ? 'Student Credentials Management' : 
                 `${categories.find(c => c.id === selectedCategory)?.label} - ${selectedCaste === 'all' ? 'All Categories' : selectedCaste}`}
                <span className={styles.count}>
                  ({selectedCategory === 'credentials' ? credentials.length : filteredApplications.length})
                </span>
              </h2>
              {selectedCategory === 'pending' && (
                <div style={{
                  background: '#f0f9ff',
                  padding: '0.75rem 1rem',
                  borderRadius: '6px',
                  fontSize: '0.875rem',
                  color: '#0369a1',
                  display: 'flex',
                  alignItems: 'center',
                  gap: '0.5rem',
                  marginTop: '0.5rem'
                }}>
                  <Envelope size={16} />
                  <span>📧 Admission confirmation email sent automatically on accept</span>
                </div>
              )}
              {selectedCategory === 'credentials' && (
                <div style={{
                  background: '#f0f9ff',
                  padding: '0.75rem 1rem',
                  borderRadius: '6px',
                  fontSize: '0.875rem',
                  color: '#0369a1',
                  display: 'flex',
                  alignItems: 'center',
                  gap: '0.5rem',
                  marginTop: '0.5rem'
                }}>
                  <User size={16} />
                  <CreditCard size={16} />
                  <Envelope size={16} />
                  <span>🔑 Manage credentials • Mark fees paid • Send credentials email (Admin Safe)</span>
                </div>
              )}
            </div>

            {/* CREDENTIALS TAB CONTENT */}
            {selectedCategory === 'credentials' && (
              <div>
                {loadingCredentials && (
                  <div className={styles.loading}>
                    <div className={styles.spinner}></div>
                    <p>Loading credentials...</p>
                  </div>
                )}

                {!loadingCredentials && credentials.length === 0 && (
                  <div className={styles.emptyState}>
                    <User size={48} />
                    <h3>No student credentials found</h3>
                    <p>Credentials will appear here when students are accepted.</p>
                  </div>
                )}

                {!loadingCredentials && credentials.length > 0 && (
                  <div className={styles.applicationsGrid}>
                    {credentials.map(renderCredentialCard)}
                  </div>
                )}
              </div>
            )}

            {/* REGULAR APPLICATIONS CONTENT */}
            {selectedCategory !== 'credentials' && (
              <div>
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
            )}
          </div>

        </div>
      </div>

      <ApplicationDetailsModal
        applicationId={selectedApplicationId}
        isOpen={showModal}
        onClose={handleCloseModal}
      />
    </div>
  );
};

export default Admissions;
