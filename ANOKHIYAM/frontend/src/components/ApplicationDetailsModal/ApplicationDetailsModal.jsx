import React, { useState, useEffect } from 'react';
import { doc, getDoc } from 'firebase/firestore';
import { db } from '../../config/firebase';
import styles from './ApplicationDetailsModal.module.css';
import { X, User, Phone, Envelope, MapPin, GraduationCap, Users } from 'phosphor-react';


const ApplicationDetailsModal = ({ applicationId, onClose, isOpen }) => {
  const [application, setApplication] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (isOpen && applicationId) {
      fetchApplicationDetails();
    }
  }, [isOpen, applicationId]);

  const fetchApplicationDetails = async () => {
    setLoading(true);
    setError(null);
    
    try {
      console.log('Fetching application details for ID:', applicationId);
      const docRef = doc(db, 'admission_applications', applicationId);
      const docSnap = await getDoc(docRef);
      
      if (docSnap.exists()) {
        const data = docSnap.data();
        console.log('Application data:', data);
        setApplication(data);
      } else {
        setError('Application not found');
      }
    } catch (err) {
      console.error('Error fetching application:', err);
      setError('Error loading application details');
    } finally {
      setLoading(false);
    }
  };

  if (!isOpen) return null;

  return (
    <div className={styles.modalOverlay} onClick={onClose}>
      <div className={styles.modalContent} onClick={e => e.stopPropagation()}>
        <div className={styles.modalHeader}>
          <h2>📋 Application Details</h2>
          <button className={styles.closeButton} onClick={onClose}>
            <X size={24} />
          </button>
        </div>

        {loading && (
          <div className={styles.loading}>
            <div className={styles.spinner}></div>
            <p>Loading application details...</p>
          </div>
        )}

        {error && (
          <div className={styles.error}>
            <p>❌ {error}</p>
          </div>
        )}

        {application && (
          <div className={styles.modalBody}>
            {/* Personal Information */}
            <div className={styles.section}>
              <div className={styles.sectionHeader}>
                <User size={20} />
                <h3>Personal Information</h3>
              </div>
              <div className={styles.infoGrid}>
                <div className={styles.infoItem}>
                  <span className={styles.label}>Student Name:</span>
                  <span className={styles.value}>
                    {application.personalInfo?.firstName} {application.personalInfo?.lastName}
                  </span>
                </div>
                <div className={styles.infoItem}>
                  <span className={styles.label}>Father's Name:</span>
                  <span className={styles.value}>{application.personalInfo?.fatherName}</span>
                </div>
                <div className={styles.infoItem}>
                  <span className={styles.label}>Mother's Name:</span>
                  <span className={styles.value}>{application.personalInfo?.motherName}</span>
                </div>
                <div className={styles.infoItem}>
                  <span className={styles.label}>Date of Birth:</span>
                  <span className={styles.value}>{application.personalInfo?.dateOfBirth}</span>
                </div>
                <div className={styles.infoItem}>
                  <span className={styles.label}>Father's Occupation:</span>
                  <span className={styles.value}>{application.personalInfo?.fatherOccupation}</span>
                </div>
                <div className={styles.infoItem}>
                  <span className={styles.label}>Mother's Occupation:</span>
                  <span className={styles.value}>{application.personalInfo?.motherOccupation}</span>
                </div>
                <div className={styles.infoItem}>
                  <span className={styles.label}>Annual Family Income:</span>
                  <span className={styles.value}>₹{application.personalInfo?.annualFamilyIncome?.toLocaleString()}</span>
                </div>
              </div>
            </div>

            {/* Contact Information */}
            <div className={styles.section}>
              <div className={styles.sectionHeader}>
                <Phone size={20} />
                <h3>Contact Information</h3>
              </div>
              <div className={styles.infoGrid}>
                <div className={styles.infoItem}>
                  <span className={styles.label}>Student Email:</span>
                  <span className={styles.value}>{application.contactInfo?.studentEmail}</span>
                </div>
                <div className={styles.infoItem}>
                  <span className={styles.label}>Student Phone:</span>
                  <span className={styles.value}>{application.contactInfo?.studentPhone}</span>
                </div>
                <div className={styles.infoItem}>
                  <span className={styles.label}>Father's Phone:</span>
                  <span className={styles.value}>{application.contactInfo?.fatherPhone}</span>
                </div>
                <div className={styles.infoItem}>
                  <span className={styles.label}>Mother's Phone:</span>
                  <span className={styles.value}>{application.contactInfo?.motherPhone}</span>
                </div>
                <div className={styles.infoItem}>
                  <span className={styles.label}>Address:</span>
                  <span className={styles.value}>{application.contactInfo?.studentAddress}</span>
                </div>
                <div className={styles.infoItem}>
                  <span className={styles.label}>City:</span>
                  <span className={styles.value}>{application.contactInfo?.city}</span>
                </div>
                <div className={styles.infoItem}>
                  <span className={styles.label}>State:</span>
                  <span className={styles.value}>{application.contactInfo?.state}</span>
                </div>
                <div className={styles.infoItem}>
                  <span className={styles.label}>Pincode:</span>
                  <span className={styles.value}>{application.contactInfo?.pincode}</span>
                </div>
              </div>
            </div>

            {/* Course & Category */}
            <div className={styles.section}>
              <div className={styles.sectionHeader}>
                <GraduationCap size={20} />
                <h3>Course & Category</h3>
              </div>
              <div className={styles.infoGrid}>
                <div className={styles.infoItem}>
                  <span className={styles.label}>Selected Course:</span>
                  <span className={styles.value}>{application.selectedCourse}</span>
                </div>
                <div className={styles.infoItem}>
                  <span className={styles.label}>Category:</span>
                  <span className={styles.value}>{application.personalInfo?.category}</span>
                </div>
                <div className={styles.infoItem}>
                  <span className={styles.label}>Religion:</span>
                  <span className={styles.value}>{application.personalInfo?.religion}</span>
                </div>
                <div className={styles.infoItem}>
                  <span className={styles.label}>Caste:</span>
                  <span className={styles.value}>{application.personalInfo?.caste}</span>
                </div>
              </div>
            </div>

            {/* Academic Information */}
            <div className={styles.section}>
              <div className={styles.sectionHeader}>
                <GraduationCap size={20} />
                <h3>Academic Information</h3>
              </div>
              <div className={styles.infoGrid}>
                <div className={styles.infoItem}>
                  <span className={styles.label}>Entrance Marks:</span>
                  <span className={styles.value}>{application.academicInfo?.entranceMarks}</span>
                </div>
                <div className={styles.infoItem}>
                  <span className={styles.label}>Percentage:</span>
                  <span className={styles.value}>{application.academicInfo?.entrancePercentage}%</span>
                </div>
                <div className={styles.infoItem}>
                  <span className={styles.label}>Result:</span>
                  <span className={`${styles.value} ${styles.resultBadge} ${application.academicInfo?.entranceResult === 'PASS' ? styles.pass : styles.fail}`}>
                    {application.academicInfo?.entranceResult}
                  </span>
                </div>
              </div>
            </div>

            {/* Application Status */}
            <div className={styles.section}>
              <div className={styles.sectionHeader}>
                <Users size={20} />
                <h3>Application Status</h3>
              </div>
              <div className={styles.infoGrid}>
                <div className={styles.infoItem}>
                  <span className={styles.label}>Status:</span>
                  <span className={`${styles.value} ${styles.statusBadge} ${styles[application.status]}`}>
                    {application.status?.toUpperCase()}
                  </span>
                </div>
                <div className={styles.infoItem}>
                  <span className={styles.label}>Submission Date:</span>
                  <span className={styles.value}>
                    {application.submissionDate?.toDate ? 
                      application.submissionDate.toDate().toLocaleDateString() : 
                      new Date(application.submissionDate).toLocaleDateString()
                    }
                  </span>
                </div>
                <div className={styles.infoItem}>
                  <span className={styles.label}>Documents Required:</span>
                  <span className={styles.value}>{application.documentsRequired ? 'Yes' : 'No'}</span>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default ApplicationDetailsModal;
