import React, { useState, useEffect } from 'react';
import { doc, getDoc, query, collection, where, getDocs } from 'firebase/firestore';
import { db } from '../../../config/firebase';
import { useAuth } from '../../../context/AuthContext';
import StudentSidebar from '../../../components/StudentSidebar/StudentSidebar';
import StudentHeader from '../../../components/StudentHeader/StudentHeader';
import styles from './StudentProfile.module.css';

const StudentProfile = () => {
  const { currentUser } = useAuth();
  const [isCollapsed, setIsCollapsed] = useState(false);
  const [activeTab, setActiveTab] = useState('personal');
  const [isEditing, setIsEditing] = useState(false);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  
  // Initialize with empty data - will be populated from Firebase
  const [profileData, setProfileData] = useState({
    // Personal Information (from admission form)
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    dateOfBirth: '',
    gender: '',
    category: '',
    nationality: 'Indian',
    
    // Academic Information (from admission form + system)
    studentId: '',
    program: '',
    previousSchool: '',
    entrancePercentage: '',
    year: 'First Year', // Default for new students
    semester: '1st Semester', // Default for new students
    batch: '',
    cgpa: 'N/A', // Not available for new students
    
    // Address Information (from admission form)
    permanentAddress: {
      street: '',
      city: '',
      state: '',
      pincode: '',
      country: 'India'
    },
    currentAddress: {
      street: 'Hostel/Campus',
      city: '',
      state: '',
      pincode: '',
      country: 'India'
    },
    
    // Emergency Contact (from admission form - parent info)
    emergencyContact: {
      name: '',
      relationship: '',
      phone: '',
      email: ''
    }
  });

  // Load student data from admission form when component mounts
  useEffect(() => {
    if (currentUser) {
      loadStudentData();
    }
  }, [currentUser]);

  const loadStudentData = async () => {
    try {
      setLoading(true);
      console.log('🔍 Loading student data for:', currentUser.email);

      // First, get student credentials to find the original application
      const credentialsQuery = query(
        collection(db, 'student_credentials'),
        where('studentEmail', '==', currentUser.email)
      );
      
      const credentialsSnapshot = await getDocs(credentialsQuery);
      
      if (credentialsSnapshot.empty) {
        throw new Error('Student credentials not found');
      }

      const credentialData = credentialsSnapshot.docs[0].data();
      console.log('✅ Found student credentials:', credentialData);

      // Get the original admission application
      const applicationDoc = await getDoc(doc(db, 'admission_applications', credentialData.applicationId));
      
      if (!applicationDoc.exists()) {
        throw new Error('Original admission application not found');
      }

      const admissionData = applicationDoc.data();
      console.log('✅ Found admission data:', admissionData);

      // Get accepted student data for additional info
      const acceptedQuery = query(
        collection(db, 'accepted_students'),
        where('studentEmail', '==', currentUser.email)
      );
      
      const acceptedSnapshot = await getDocs(acceptedQuery);
      const acceptedData = acceptedSnapshot.docs[0]?.data();

      // Map admission form data to profile structure
      const mappedData = {
        // Personal Information from admission form
        firstName: admissionData.personalInfo?.firstName || '',
        lastName: admissionData.personalInfo?.lastName || '',
        email: admissionData.contactInfo?.studentEmail || currentUser.email,
        phone: admissionData.contactInfo?.studentPhone || '',
        dateOfBirth: admissionData.personalInfo?.dateOfBirth || '',
        gender: admissionData.personalInfo?.gender || '',
        category: admissionData.personalInfo?.category || '',
        nationality: admissionData.personalInfo?.nationality || 'Indian',
        
        // Academic Information
        studentId: admissionData.uid || credentialData.uid || 'TBA',
        program: admissionData.selectedCourse || credentialData.course || '',
        previousSchool: admissionData.academicInfo?.previousSchool || '',
        entrancePercentage: admissionData.academicInfo?.entrancePercentage || '',
        year: 'First Year', // New students start in first year
        semester: '1st Semester',
        batch: `${new Date().getFullYear()}-${new Date().getFullYear() + 4}`, // 4-year program
        cgpa: 'N/A', // Not available for new students
        
        // Address Information from admission form
        permanentAddress: {
          street: admissionData.contactInfo?.address || '',
          city: admissionData.contactInfo?.city || '',
          state: admissionData.contactInfo?.state || '',
          pincode: admissionData.contactInfo?.pincode || '',
          country: 'India'
        },
        currentAddress: {
          street: 'College Campus', // Default for new students
          city: admissionData.contactInfo?.city || '',
          state: admissionData.contactInfo?.state || '',
          pincode: admissionData.contactInfo?.pincode || '',
          country: 'India'
        },
        
        // Emergency Contact from parent information
        emergencyContact: {
          name: admissionData.parentInfo?.fatherName || admissionData.parentInfo?.motherName || '',
          relationship: admissionData.parentInfo?.fatherName ? 'Father' : 'Mother',
          phone: admissionData.contactInfo?.parentPhone || '',
          email: admissionData.parentInfo?.parentEmail || ''
        }
      };

      setProfileData(mappedData);
      console.log('✅ Profile data mapped successfully:', mappedData);

    } catch (error) {
      console.error('❌ Error loading student data:', error);
      setError('Failed to load profile data. Please contact support.');
    } finally {
      setLoading(false);
    }
  };

  const handleInputChange = (section, field, value) => {
    if (section) {
      setProfileData(prev => ({
        ...prev,
        [section]: {
          ...prev[section],
          [field]: value
        }
      }));
    } else {
      setProfileData(prev => ({
        ...prev,
        [field]: value
      }));
    }
  };

  const handleSave = async () => {
    try {
      // Here you would update the student's profile in Firebase
      // For now, just log the changes
      console.log('Profile updated:', profileData);
      setIsEditing(false);
      
      // You could add a toast notification here
      alert('Profile updated successfully!');
    } catch (error) {
      console.error('Error saving profile:', error);
      alert('Failed to save profile. Please try again.');
    }
  };

  const handleCancel = () => {
    setIsEditing(false);
    // Reload original data to cancel changes
    loadStudentData();
  };

  // Loading state
  if (loading) {
    return (
      <div className={styles.profileLayout}>
        <StudentSidebar 
          activeItem="Profile" 
          isCollapsed={isCollapsed}
          setIsCollapsed={setIsCollapsed}
        />
        <div className={`${styles.mainContent} ${isCollapsed ? styles.collapsed : ''}`}>
          <StudentHeader 
            isCollapsed={isCollapsed}
            onMenuToggle={() => setIsCollapsed(!isCollapsed)}
          />
          <div className={styles.profileContainer}>
            <div className={styles.loadingState}>
              <div className={styles.spinner}></div>
              <p>Loading your profile...</p>
            </div>
          </div>
        </div>
      </div>
    );
  }

  // Error state
  if (error) {
    return (
      <div className={styles.profileLayout}>
        <StudentSidebar 
          activeItem="Profile" 
          isCollapsed={isCollapsed}
          setIsCollapsed={setIsCollapsed}
        />
        <div className={`${styles.mainContent} ${isCollapsed ? styles.collapsed : ''}`}>
          <StudentHeader 
            isCollapsed={isCollapsed}
            onMenuToggle={() => setIsCollapsed(!isCollapsed)}
          />
          <div className={styles.profileContainer}>
            <div className={styles.errorState}>
              <h3>❌ Error Loading Profile</h3>
              <p>{error}</p>
              <button onClick={loadStudentData} className={styles.retryBtn}>
                Retry
              </button>
            </div>
          </div>
        </div>
      </div>
    );
  }

  const renderPersonalInfo = () => (
    <div className={styles.tabContent}>
      <div className={styles.formGrid}>
        <div className={styles.formGroup}>
          <label>First Name</label>
          <input
            type="text"
            value={profileData.firstName}
            onChange={(e) => handleInputChange(null, 'firstName', e.target.value)}
            disabled={!isEditing}
          />
        </div>
        <div className={styles.formGroup}>
          <label>Last Name</label>
          <input
            type="text"
            value={profileData.lastName}
            onChange={(e) => handleInputChange(null, 'lastName', e.target.value)}
            disabled={!isEditing}
          />
        </div>
        <div className={styles.formGroup}>
          <label>Email</label>
          <input
            type="email"
            value={profileData.email}
            disabled // Email cannot be changed
          />
        </div>
        <div className={styles.formGroup}>
          <label>Phone Number</label>
          <input
            type="tel"
            value={profileData.phone}
            onChange={(e) => handleInputChange(null, 'phone', e.target.value)}
            disabled={!isEditing}
          />
        </div>
        <div className={styles.formGroup}>
          <label>Date of Birth</label>
          <input
            type="date"
            value={profileData.dateOfBirth}
            onChange={(e) => handleInputChange(null, 'dateOfBirth', e.target.value)}
            disabled={!isEditing}
          />
        </div>
        <div className={styles.formGroup}>
          <label>Gender</label>
          <select
            value={profileData.gender}
            onChange={(e) => handleInputChange(null, 'gender', e.target.value)}
            disabled={!isEditing}
          >
            <option value="">Select Gender</option>
            <option value="Male">Male</option>
            <option value="Female">Female</option>
            <option value="Other">Other</option>
          </select>
        </div>
        <div className={styles.formGroup}>
          <label>Category</label>
          <input
            type="text"
            value={profileData.category}
            disabled // Category from admission form, cannot be changed
          />
        </div>
        <div className={styles.formGroup}>
          <label>Nationality</label>
          <input
            type="text"
            value={profileData.nationality}
            onChange={(e) => handleInputChange(null, 'nationality', e.target.value)}
            disabled={!isEditing}
          />
        </div>
      </div>
    </div>
  );

  const renderAcademicInfo = () => (
    <div className={styles.tabContent}>
      <div className={styles.formGrid}>
        <div className={styles.formGroup}>
          <label>Student ID</label>
          <input
            type="text"
            value={profileData.studentId}
            disabled
          />
        </div>
        <div className={styles.formGroup}>
          <label>Program</label>
          <input
            type="text"
            value={profileData.program}
            disabled
          />
        </div>
        <div className={styles.formGroup}>
          <label>Previous School</label>
          <input
            type="text"
            value={profileData.previousSchool}
            disabled
          />
        </div>
        <div className={styles.formGroup}>
          <label>Entrance Percentage</label>
          <input
            type="text"
            value={profileData.entrancePercentage + '%'}
            disabled
          />
        </div>
        <div className={styles.formGroup}>
          <label>Current Year</label>
          <input
            type="text"
            value={profileData.year}
            disabled
          />
        </div>
        <div className={styles.formGroup}>
          <label>Current Semester</label>
          <input
            type="text"
            value={profileData.semester}
            disabled
          />
        </div>
        <div className={styles.formGroup}>
          <label>Batch</label>
          <input
            type="text"
            value={profileData.batch}
            disabled
          />
        </div>
        <div className={styles.formGroup}>
          <label>Current CGPA</label>
          <input
            type="text"
            value={profileData.cgpa}
            disabled
          />
        </div>
      </div>
    </div>
  );

  const renderAddressInfo = () => (
    <div className={styles.tabContent}>
      <div className={styles.addressSection}>
        <h4>Permanent Address (From Admission Form)</h4>
        <div className={styles.formGrid}>
          <div className={styles.formGroup}>
            <label>Street Address</label>
            <input
              type="text"
              value={profileData.permanentAddress.street}
              onChange={(e) => handleInputChange('permanentAddress', 'street', e.target.value)}
              disabled={!isEditing}
            />
          </div>
          <div className={styles.formGroup}>
            <label>City</label>
            <input
              type="text"
              value={profileData.permanentAddress.city}
              onChange={(e) => handleInputChange('permanentAddress', 'city', e.target.value)}
              disabled={!isEditing}
            />
          </div>
          <div className={styles.formGroup}>
            <label>State</label>
            <input
              type="text"
              value={profileData.permanentAddress.state}
              onChange={(e) => handleInputChange('permanentAddress', 'state', e.target.value)}
              disabled={!isEditing}
            />
          </div>
          <div className={styles.formGroup}>
            <label>Pincode</label>
            <input
              type="text"
              value={profileData.permanentAddress.pincode}
              onChange={(e) => handleInputChange('permanentAddress', 'pincode', e.target.value)}
              disabled={!isEditing}
            />
          </div>
        </div>
      </div>

      <div className={styles.addressSection}>
        <h4>Current Address</h4>
        <div className={styles.formGrid}>
          <div className={styles.formGroup}>
            <label>Street Address</label>
            <input
              type="text"
              value={profileData.currentAddress.street}
              onChange={(e) => handleInputChange('currentAddress', 'street', e.target.value)}
              disabled={!isEditing}
            />
          </div>
          <div className={styles.formGroup}>
            <label>City</label>
            <input
              type="text"
              value={profileData.currentAddress.city}
              onChange={(e) => handleInputChange('currentAddress', 'city', e.target.value)}
              disabled={!isEditing}
            />
          </div>
          <div className={styles.formGroup}>
            <label>State</label>
            <input
              type="text"
              value={profileData.currentAddress.state}
              onChange={(e) => handleInputChange('currentAddress', 'state', e.target.value)}
              disabled={!isEditing}
            />
          </div>
          <div className={styles.formGroup}>
            <label>Pincode</label>
            <input
              type="text"
              value={profileData.currentAddress.pincode}
              onChange={(e) => handleInputChange('currentAddress', 'pincode', e.target.value)}
              disabled={!isEditing}
            />
          </div>
        </div>
      </div>
    </div>
  );

  const renderEmergencyContact = () => (
    <div className={styles.tabContent}>
      <div className={styles.infoNote}>
        <p>👨‍👩‍👧‍👦 Emergency contact information from your admission form</p>
      </div>
      <div className={styles.formGrid}>
        <div className={styles.formGroup}>
          <label>Contact Name</label>
          <input
            type="text"
            value={profileData.emergencyContact.name}
            onChange={(e) => handleInputChange('emergencyContact', 'name', e.target.value)}
            disabled={!isEditing}
          />
        </div>
        <div className={styles.formGroup}>
          <label>Relationship</label>
          <input
            type="text"
            value={profileData.emergencyContact.relationship}
            onChange={(e) => handleInputChange('emergencyContact', 'relationship', e.target.value)}
            disabled={!isEditing}
          />
        </div>
        <div className={styles.formGroup}>
          <label>Phone Number</label>
          <input
            type="tel"
            value={profileData.emergencyContact.phone}
            onChange={(e) => handleInputChange('emergencyContact', 'phone', e.target.value)}
            disabled={!isEditing}
          />
        </div>
        <div className={styles.formGroup}>
          <label>Email</label>
          <input
            type="email"
            value={profileData.emergencyContact.email}
            onChange={(e) => handleInputChange('emergencyContact', 'email', e.target.value)}
            disabled={!isEditing}
          />
        </div>
      </div>
    </div>
  );

  return (
    <div className={styles.profileLayout}>
      <StudentSidebar 
        activeItem="Profile" 
        isCollapsed={isCollapsed}
        setIsCollapsed={setIsCollapsed}
      />
      <div className={`${styles.mainContent} ${isCollapsed ? styles.collapsed : ''}`}>
        <StudentHeader 
          isCollapsed={isCollapsed}
          onMenuToggle={() => setIsCollapsed(!isCollapsed)}
        />
        
        <div className={styles.profileContainer}>
          <div className={styles.profileHeader}>
            <div className={styles.profileInfo}>
              <div className={styles.avatarSection}>
                <div className={styles.avatar}>
                  <div className={styles.avatarPlaceholder}>
                    {profileData.firstName.charAt(0)}{profileData.lastName.charAt(0)}
                  </div>
                  {isEditing && (
                    <button className={styles.changePhotoBtn}>
                      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                        <path d="M23 19a2 2 0 0 1-2 2H3a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h4l2-3h6l2 3h4a2 2 0 0 1 2 2v11z"/>
                        <circle cx="12" cy="13" r="4"/>
                      </svg>
                    </button>
                  )}
                </div>
              </div>
              <div className={styles.basicInfo}>
                <h1>{profileData.firstName} {profileData.lastName}</h1>
                <p>{profileData.studentId} • {profileData.program}</p>
                <p>{profileData.year} • CGPA: {profileData.cgpa}</p>
                <p>📧 {profileData.email}</p>
              </div>
            </div>
            <div className={styles.actions}>
              {!isEditing ? (
                <button 
                  className={styles.editBtn}
                  onClick={() => setIsEditing(true)}
                >
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7"/>
                    <path d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z"/>
                  </svg>
                  Edit Profile
                </button>
              ) : (
                <div className={styles.editActions}>
                  <button 
                    className={styles.saveBtn}
                    onClick={handleSave}
                  >
                    Save Changes
                  </button>
                  <button 
                    className={styles.cancelBtn}
                    onClick={handleCancel}
                  >
                    Cancel
                  </button>
                </div>
              )}
            </div>
          </div>

          <div className={styles.profileContent}>
            <div className={styles.tabs}>
              <button 
                className={`${styles.tab} ${activeTab === 'personal' ? styles.active : ''}`}
                onClick={() => setActiveTab('personal')}
              >
                Personal Info
              </button>
              <button 
                className={`${styles.tab} ${activeTab === 'academic' ? styles.active : ''}`}
                onClick={() => setActiveTab('academic')}
              >
                Academic Info
              </button>
              <button 
                className={`${styles.tab} ${activeTab === 'address' ? styles.active : ''}`}
                onClick={() => setActiveTab('address')}
              >
                Address
              </button>
              <button 
                className={`${styles.tab} ${activeTab === 'emergency' ? styles.active : ''}`}
                onClick={() => setActiveTab('emergency')}
              >
                Emergency Contact
              </button>
            </div>

            <div className={styles.tabsContent}>
              {activeTab === 'personal' && renderPersonalInfo()}
              {activeTab === 'academic' && renderAcademicInfo()}
              {activeTab === 'address' && renderAddressInfo()}
              {activeTab === 'emergency' && renderEmergencyContact()}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default StudentProfile;
