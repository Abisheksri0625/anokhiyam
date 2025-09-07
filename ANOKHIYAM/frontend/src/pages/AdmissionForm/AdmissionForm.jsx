import React, { useState, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { 
  submitAdmissionApplication
} from "../../services/firestoreService";
import { uploadFile, uploadAdmissionDocuments } from "../../services/storageService";


import styles from './AdmissionForm.module.css';

const AdmissionForm = () => {
  const navigate = useNavigate();
  const location = useLocation();
  
  // Get data from results page
  const passedData = location.state || {};
  
  const [step, setStep] = useState(1);
  const [isLoading, setIsLoading] = useState(false);
  const [formData, setFormData] = useState({
    // Personal Information
    fullName: passedData.studentName || '',
    dob: '',
    gender: '',
    address: '',
    phone: '',
    email: '',
    parentName: '',
    parentContact: '',
    category: 'General',
    
    // Academic Details
    tenthMarks: '',
    twelfthMarks: '',
    previousInstitution: '',
    entranceMarks: passedData.examResult?.percentage || '',
    entranceResult: passedData.examResult?.result || '',
    
    // Documents
    documents: {
      tenthCert: null,
      twelfthCert: null,
      casteCert: null,
      incomeCert: null,
      transferCert: null,
      idProof: null
    },
    
    // Course Selection
    selectedDegree: '',
    selectedCourse: '',
    coursePreferences: []
  });
  
  const [errors, setErrors] = useState({});
  const [uploadProgress, setUploadProgress] = useState({});

  // Available courses based on institution
  const availableCourses = {
    'Computer Science': ['B.Tech Computer Science', 'M.Tech Computer Science', 'MCA'],
    'Mechanical Engineering': ['B.Tech Mechanical', 'M.Tech Mechanical'],
    'Electrical Engineering': ['B.Tech Electrical', 'M.Tech Electrical'],
    'Civil Engineering': ['B.Tech Civil', 'M.Tech Civil'],
    'Information Technology': ['B.Tech IT', 'M.Tech IT']
  };

  // Course eligibility based on marks and category
  const getEligibleCourses = () => {
    const entranceMarks = parseFloat(formData.entranceMarks) || 0;
    const twelfthMarks = parseFloat(formData.twelfthMarks) || 0;
    
    let cutoff = 60; // General cutoff
    if (formData.category === 'SC' || formData.category === 'ST') cutoff = 45;
    if (formData.category === 'OBC' || formData.category === 'MBC') cutoff = 50;
    
    if (entranceMarks >= cutoff && twelfthMarks >= 60) {
      return Object.keys(availableCourses);
    }
    return [];
  };

  const handleInputChange = (field, value) => {
    setFormData(prev => ({
      ...prev,
      [field]: value
    }));
    
    // Clear error when user starts typing
    if (errors[field]) {
      setErrors(prev => ({
        ...prev,
        [field]: ''
      }));
    }
  };

  const handleFileUpload = (docType, file) => {
    if (!file) return;
    
    // Validate file
    if (file.size > 5 * 1024 * 1024) { // 5MB limit
      alert('File size should be less than 5MB');
      return;
    }
    
    if (!['image/jpeg', 'image/png', 'application/pdf'].includes(file.type)) {
      alert('Only JPEG, PNG, and PDF files are allowed');
      return;
    }
    
    setFormData(prev => ({
      ...prev,
      documents: {
        ...prev.documents,
        [docType]: file
      }
    }));
  };

  const validateStep = () => {
    const newErrors = {};
    
    switch (step) {
      case 1:
        if (!formData.fullName.trim()) newErrors.fullName = 'Full name is required';
        if (!formData.dob) newErrors.dob = 'Date of birth is required';
        if (!formData.gender) newErrors.gender = 'Gender is required';
        if (!formData.address.trim()) newErrors.address = 'Address is required';
        if (!formData.phone.trim()) newErrors.phone = 'Phone number is required';
        if (!formData.email.trim()) newErrors.email = 'Email is required';
        if (!formData.parentName.trim()) newErrors.parentName = 'Parent/Guardian name is required';
        if (!formData.parentContact.trim()) newErrors.parentContact = 'Parent contact is required';
        if (!formData.category) newErrors.category = 'Category is required';
        
        // Email validation
        if (formData.email && !/\S+@\S+\.\S+/.test(formData.email)) {
          newErrors.email = 'Invalid email address';
        }
        
        // Phone validation
        if (formData.phone && !/^\d{10}$/.test(formData.phone.replace(/\D/g, ''))) {
          newErrors.phone = 'Phone number should be 10 digits';
        }
        break;
        
      case 2:
        if (!formData.tenthMarks) newErrors.tenthMarks = '10th marks are required';
        if (!formData.twelfthMarks) newErrors.twelfthMarks = '12th marks are required';
        if (!formData.previousInstitution.trim()) newErrors.previousInstitution = 'Previous institution is required';
        
        // Marks validation
        if (formData.tenthMarks && (formData.tenthMarks < 0 || formData.tenthMarks > 100)) {
          newErrors.tenthMarks = 'Marks should be between 0 and 100';
        }
        if (formData.twelfthMarks && (formData.twelfthMarks < 0 || formData.twelfthMarks > 100)) {
          newErrors.twelfthMarks = 'Marks should be between 0 and 100';
        }
        break;
        
      case 3:
        if (!formData.documents.tenthCert) newErrors.tenthCert = '10th certificate is required';
        if (!formData.documents.twelfthCert) newErrors.twelfthCert = '12th certificate is required';
        if (!formData.documents.idProof) newErrors.idProof = 'ID proof is required';
        
        // Category-specific document validation
        if (['SC', 'ST', 'OBC', 'MBC'].includes(formData.category) && !formData.documents.casteCert) {
          newErrors.casteCert = 'Caste certificate is required for your category';
        }
        break;
        
      case 4:
        if (!formData.selectedDegree) newErrors.selectedDegree = 'Please select a degree';
        if (!formData.selectedCourse) newErrors.selectedCourse = 'Please select a course';
        break;
    }
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const nextStep = () => {
    if (validateStep()) {
      setStep(prev => prev + 1);
    }
  };

  const prevStep = () => {
    setStep(prev => prev - 1);
  };

  const handleSubmit = async () => {
    if (!validateStep()) return;
    
    setIsLoading(true);
    
    try {
      // Generate application ID
      const applicationId = `APP-${Date.now()}-${passedData.studentId || 'STU001'}`;
      
      // Upload documents first if any exist
      let documentUrls = {};
      const documentsToUpload = Object.entries(formData.documents).filter(([key, file]) => file !== null);
      
      if (documentsToUpload.length > 0) {
        console.log('Uploading documents...');
        for (const [docType, file] of documentsToUpload) {
          const uploadPath = `admission_documents/${applicationId}/${docType}/${file.name}`;
          const downloadURL = await uploadFile(file, uploadPath, (progress) => {
            setUploadProgress(prev => ({
              ...prev,
              [docType]: progress
            }));
          });
          
          documentUrls[docType] = {
            url: downloadURL,
            fileName: file.name,
            uploadedAt: new Date().toISOString()
          };
        }
      }
      
      // Prepare application data
      const applicationData = {
        ...formData,
        applicationId,
        institutionCode: passedData.institutionCode || 'ANOKHIYAM2024',
        institutionName: passedData.institutionName || 'ANOKHIYAM Demo University',
        studentId: passedData.studentId || 'STU001',
        rollNumber: passedData.rollNumber || 'ROLL001',
        examResult: passedData.examResult || {},
        documents: documentUrls,
        submittedAt: new Date().toISOString()
      };
      
      // Submit to Firebase
      const docId = await submitAdmissionApplication(applicationData);
      console.log('Application submitted with Firebase ID:', docId);
      
      alert(`Application submitted successfully!\n\nApplication ID: ${applicationId}\n\nYou will receive an email confirmation shortly. Admin will review your application within 2-3 business days.`);
      
      // Redirect to home page
      navigate('/', { 
        state: { 
          message: 'Application submitted successfully! Check your email for confirmation.',
          applicationId
        }
      });
      
    } catch (error) {
      console.error('Error submitting application:', error);
      alert('Error submitting application. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  const renderProgressBar = () => {
    return (
      <div className={styles.progressContainer}>
        <div className={styles.progressBar}>
          {[1, 2, 3, 4, 5].map(stepNumber => (
            <div
              key={stepNumber}
              className={`${styles.progressStep} ${
                stepNumber <= step ? styles.activeStep : styles.inactiveStep
              }`}
            >
              <div className={styles.stepNumber}>
                {stepNumber < step ? 'Done' : stepNumber}
              </div>
              <div className={styles.stepLabel}>
                {stepNumber === 1 && 'Personal'}
                {stepNumber === 2 && 'Academic'}
                {stepNumber === 3 && 'Documents'}
                {stepNumber === 4 && 'Course'}
                {stepNumber === 5 && 'Review'}
              </div>
            </div>
          ))}
        </div>
      </div>
    );
  };

  const renderStep = () => {
    switch (step) {
      case 1:
        return (
          <div className={styles.stepContent}>
            <h2>Personal Information</h2>
            <p className={styles.stepDescription}>Please provide your personal details</p>
            
            <div className={styles.formGrid}>
              <div className={styles.inputGroup}>
                <label>Full Name *</label>
                <input
                  type="text"
                  value={formData.fullName}
                  onChange={(e) => handleInputChange('fullName', e.target.value)}
                  className={errors.fullName ? styles.inputError : ''}
                />
                {errors.fullName && <span className={styles.errorText}>{errors.fullName}</span>}
              </div>

              <div className={styles.inputGroup}>
                <label>Date of Birth *</label>
                <input
                  type="date"
                  value={formData.dob}
                  onChange={(e) => handleInputChange('dob', e.target.value)}
                  className={errors.dob ? styles.inputError : ''}
                />
                {errors.dob && <span className={styles.errorText}>{errors.dob}</span>}
              </div>

              <div className={styles.inputGroup}>
                <label>Gender *</label>
                <select
                  value={formData.gender}
                  onChange={(e) => handleInputChange('gender', e.target.value)}
                  className={errors.gender ? styles.inputError : ''}
                >
                  <option value="">Select Gender</option>
                  <option value="Male">Male</option>
                  <option value="Female">Female</option>
                  <option value="Other">Other</option>
                </select>
                {errors.gender && <span className={styles.errorText}>{errors.gender}</span>}
              </div>

              <div className={styles.inputGroup}>
                <label>Category *</label>
                <select
                  value={formData.category}
                  onChange={(e) => handleInputChange('category', e.target.value)}
                  className={errors.category ? styles.inputError : ''}
                >
                  <option value="General">General</option>
                  <option value="SC">Scheduled Caste (SC)</option>
                  <option value="ST">Scheduled Tribe (ST)</option>
                  <option value="OBC">Other Backward Class (OBC)</option>
                  <option value="MBC">More Backward Class (MBC)</option>
                  <option value="NRI">NRI</option>
                </select>
                {errors.category && <span className={styles.errorText}>{errors.category}</span>}
              </div>

              <div className={styles.inputGroup}>
                <label>Phone Number *</label>
                <input
                  type="tel"
                  value={formData.phone}
                  onChange={(e) => handleInputChange('phone', e.target.value)}
                  placeholder="10-digit mobile number"
                  className={errors.phone ? styles.inputError : ''}
                />
                {errors.phone && <span className={styles.errorText}>{errors.phone}</span>}
              </div>

              <div className={styles.inputGroup}>
                <label>Email Address *</label>
                <input
                  type="email"
                  value={formData.email}
                  onChange={(e) => handleInputChange('email', e.target.value)}
                  placeholder="your.email@example.com"
                  className={errors.email ? styles.inputError : ''}
                />
                {errors.email && <span className={styles.errorText}>{errors.email}</span>}
              </div>

              <div className={styles.inputGroup}>
                <label>Parent/Guardian Name *</label>
                <input
                  type="text"
                  value={formData.parentName}
                  onChange={(e) => handleInputChange('parentName', e.target.value)}
                  className={errors.parentName ? styles.inputError : ''}
                />
                {errors.parentName && <span className={styles.errorText}>{errors.parentName}</span>}
              </div>

              <div className={styles.inputGroup}>
                <label>Parent Contact Number *</label>
                <input
                  type="tel"
                  value={formData.parentContact}
                  onChange={(e) => handleInputChange('parentContact', e.target.value)}
                  placeholder="Parent's mobile number"
                  className={errors.parentContact ? styles.inputError : ''}
                />
                {errors.parentContact && <span className={styles.errorText}>{errors.parentContact}</span>}
              </div>

              <div className={styles.inputGroup} style={{gridColumn: '1 / -1'}}>
                <label>Address *</label>
                <textarea
                  value={formData.address}
                  onChange={(e) => handleInputChange('address', e.target.value)}
                  placeholder="Complete address with city, state, and PIN code"
                  className={errors.address ? styles.inputError : ''}
                  rows="3"
                />
                {errors.address && <span className={styles.errorText}>{errors.address}</span>}
              </div>
            </div>
          </div>
        );

      case 2:
        return (
          <div className={styles.stepContent}>
            <h2>Academic Information</h2>
            <p className={styles.stepDescription}>Please provide your academic details</p>
            
            <div className={styles.formGrid}>
              <div className={styles.inputGroup}>
                <label>10th Grade Marks (%) *</label>
                <input
                  type="number"
                  min="0"
                  max="100"
                  step="0.01"
                  value={formData.tenthMarks}
                  onChange={(e) => handleInputChange('tenthMarks', e.target.value)}
                  placeholder="Enter percentage"
                  className={errors.tenthMarks ? styles.inputError : ''}
                />
                {errors.tenthMarks && <span className={styles.errorText}>{errors.tenthMarks}</span>}
              </div>

              <div className={styles.inputGroup}>
                <label>12th Grade Marks (%) *</label>
                <input
                  type="number"
                  min="0"
                  max="100"
                  step="0.01"
                  value={formData.twelfthMarks}
                  onChange={(e) => handleInputChange('twelfthMarks', e.target.value)}
                  placeholder="Enter percentage"
                  className={errors.twelfthMarks ? styles.inputError : ''}
                />
                {errors.twelfthMarks && <span className={styles.errorText}>{errors.twelfthMarks}</span>}
              </div>

              <div className={styles.inputGroup}>
                <label>Entrance Exam Marks (%)</label>
                <input
                  type="text"
                  value={formData.entranceMarks}
                  disabled
                  className={styles.disabledInput}
                />
                <small>From your entrance exam result</small>
              </div>

              <div className={styles.inputGroup}>
                <label>Entrance Exam Result</label>
                <input
                  type="text"
                  value={formData.entranceResult}
                  disabled
                  className={styles.disabledInput}
                />
                <small>From your entrance exam result</small>
              </div>

              <div className={styles.inputGroup} style={{gridColumn: '1 / -1'}}>
                <label>Previous Institution *</label>
                <input
                  type="text"
                  value={formData.previousInstitution}
                  onChange={(e) => handleInputChange('previousInstitution', e.target.value)}
                  placeholder="Name of your previous school/college"
                  className={errors.previousInstitution ? styles.inputError : ''}
                />
                {errors.previousInstitution && <span className={styles.errorText}>{errors.previousInstitution}</span>}
              </div>
            </div>
          </div>
        );

      case 3:
        return (
          <div className={styles.stepContent}>
            <h2>Upload Documents</h2>
            <p className={styles.stepDescription}>Please upload the required documents (JPEG, PNG, PDF - Max 5MB each)</p>
            
            <div className={styles.documentsGrid}>
              <div className={styles.documentGroup}>
                <label>10th Grade Certificate *</label>
                <input
                  type="file"
                  accept="image/*,.pdf"
                  onChange={(e) => handleFileUpload('tenthCert', e.target.files[0])}
                  className={errors.tenthCert ? styles.inputError : ''}
                />
                {formData.documents.tenthCert && (
                  <div className={styles.uploadedFile}>
                    Done: {formData.documents.tenthCert.name}
                  </div>
                )}
                {errors.tenthCert && <span className={styles.errorText}>{errors.tenthCert}</span>}
              </div>

              <div className={styles.documentGroup}>
                <label>12th Grade Certificate *</label>
                <input
                  type="file"
                  accept="image/*,.pdf"
                  onChange={(e) => handleFileUpload('twelfthCert', e.target.files[0])}
                  className={errors.twelfthCert ? styles.inputError : ''}
                />
                {formData.documents.twelfthCert && (
                  <div className={styles.uploadedFile}>
                    Done: {formData.documents.twelfthCert.name}
                  </div>
                )}
                {errors.twelfthCert && <span className={styles.errorText}>{errors.twelfthCert}</span>}
              </div>

              <div className={styles.documentGroup}>
                <label>ID Proof (Aadhaar/Passport) *</label>
                <input
                  type="file"
                  accept="image/*,.pdf"
                  onChange={(e) => handleFileUpload('idProof', e.target.files[0])}
                  className={errors.idProof ? styles.inputError : ''}
                />
                {formData.documents.idProof && (
                  <div className={styles.uploadedFile}>
                    Done: {formData.documents.idProof.name}
                  </div>
                )}
                {errors.idProof && <span className={styles.errorText}>{errors.idProof}</span>}
              </div>

              {['SC', 'ST', 'OBC', 'MBC'].includes(formData.category) && (
                <div className={styles.documentGroup}>
                  <label>Caste Certificate *</label>
                  <input
                    type="file"
                    accept="image/*,.pdf"
                    onChange={(e) => handleFileUpload('casteCert', e.target.files[0])}
                    className={errors.casteCert ? styles.inputError : ''}
                  />
                  {formData.documents.casteCert && (
                    <div className={styles.uploadedFile}>
                      Done: {formData.documents.casteCert.name}
                    </div>
                  )}
                  {errors.casteCert && <span className={styles.errorText}>{errors.casteCert}</span>}
                </div>
              )}

              <div className={styles.documentGroup}>
                <label>Income Certificate (Optional)</label>
                <input
                  type="file"
                  accept="image/*,.pdf"
                  onChange={(e) => handleFileUpload('incomeCert', e.target.files[0])}
                />
                {formData.documents.incomeCert && (
                  <div className={styles.uploadedFile}>
                    Done: {formData.documents.incomeCert.name}
                  </div>
                )}
              </div>

              <div className={styles.documentGroup}>
                <label>Transfer Certificate (Optional)</label>
                <input
                  type="file"
                  accept="image/*,.pdf"
                  onChange={(e) => handleFileUpload('transferCert', e.target.files[0])}
                />
                {formData.documents.transferCert && (
                  <div className={styles.uploadedFile}>
                    Done: {formData.documents.transferCert.name}
                  </div>
                )}
              </div>
            </div>
          </div>
        );

      case 4:
        const eligibleCourses = getEligibleCourses();
        
        return (
          <div className={styles.stepContent}>
            <h2>Course Selection</h2>
            <p className={styles.stepDescription}>Based on your marks and category, here are your eligible courses</p>
            
            {eligibleCourses.length === 0 ? (
              <div className={styles.noEligibility}>
                <h3>Eligibility Issue</h3>
                <p>Based on your current marks, you may not be eligible for admission. Please check your academic details or contact the admissions office.</p>
              </div>
            ) : (
              <div className={styles.courseSelection}>
                <div className={styles.eligibilityInfo}>
                  <h4>You are eligible for {eligibleCourses.length} degree programs</h4>
                  <p>Your entrance score: {formData.entranceMarks}% | Category: {formData.category}</p>
                </div>

                <div className={styles.inputGroup}>
                  <label>Select Degree *</label>
                  <select
                    value={formData.selectedDegree}
                    onChange={(e) => {
                      handleInputChange('selectedDegree', e.target.value);
                      handleInputChange('selectedCourse', ''); // Reset course selection
                    }}
                    className={errors.selectedDegree ? styles.inputError : ''}
                  >
                    <option value="">Choose your preferred degree</option>
                    {eligibleCourses.map(degree => (
                      <option key={degree} value={degree}>{degree}</option>
                    ))}
                  </select>
                  {errors.selectedDegree && <span className={styles.errorText}>{errors.selectedDegree}</span>}
                </div>

                {formData.selectedDegree && (
                  <div className={styles.inputGroup}>
                    <label>Select Course *</label>
                    <select
                      value={formData.selectedCourse}
                      onChange={(e) => handleInputChange('selectedCourse', e.target.value)}
                      className={errors.selectedCourse ? styles.inputError : ''}
                    >
                      <option value="">Choose your preferred course</option>
                      {availableCourses[formData.selectedDegree]?.map(course => (
                        <option key={course} value={course}>{course}</option>
                      ))}
                    </select>
                    {errors.selectedCourse && <span className={styles.errorText}>{errors.selectedCourse}</span>}
                  </div>
                )}

                {formData.selectedCourse && (
                  <div className={styles.courseInfo}>
                    <h4>Course Information</h4>
                    <div className={styles.courseDetails}>
                      <div className={styles.infoRow}>
                        <span>Duration:</span>
                        <span>{formData.selectedCourse.includes('B.Tech') ? '4 years' : formData.selectedCourse.includes('M.Tech') ? '2 years' : '3 years'}</span>
                      </div>
                      <div className={styles.infoRow}>
                        <span>Seats Available:</span>
                        <span>{Math.floor(Math.random() * 20) + 10} seats</span>
                      </div>
                      <div className={styles.infoRow}>
                        <span>Annual Fee:</span>
                        <span>Rs.{formData.selectedCourse.includes('M.Tech') ? '1,50,000' : '1,00,000'}</span>
                      </div>
                    </div>
                  </div>
                )}
              </div>
            )}
          </div>
        );

      case 5:
        return (
          <div className={styles.stepContent}>
            <h2>Review & Submit</h2>
            <p className={styles.stepDescription}>Please review all your information before submitting</p>
            
            <div className={styles.reviewSections}>
              <div className={styles.reviewSection}>
                <h3>Personal Information</h3>
                <div className={styles.reviewGrid}>
                  <div><strong>Name:</strong> {formData.fullName}</div>
                  <div><strong>DOB:</strong> {formData.dob}</div>
                  <div><strong>Gender:</strong> {formData.gender}</div>
                  <div><strong>Category:</strong> {formData.category}</div>
                  <div><strong>Phone:</strong> {formData.phone}</div>
                  <div><strong>Email:</strong> {formData.email}</div>
                  <div style={{gridColumn: '1 / -1'}}><strong>Address:</strong> {formData.address}</div>
                </div>
              </div>

              <div className={styles.reviewSection}>
                <h3>Academic Information</h3>
                <div className={styles.reviewGrid}>
                  <div><strong>10th Marks:</strong> {formData.tenthMarks}%</div>
                  <div><strong>12th Marks:</strong> {formData.twelfthMarks}%</div>
                  <div><strong>Entrance Marks:</strong> {formData.entranceMarks}%</div>
                  <div><strong>Entrance Result:</strong> {formData.entranceResult}</div>
                  <div style={{gridColumn: '1 / -1'}}><strong>Previous Institution:</strong> {formData.previousInstitution}</div>
                </div>
              </div>

              <div className={styles.reviewSection}>
                <h3>Uploaded Documents</h3>
                <div className={styles.documentList}>
                  <div>10th Certificate: {formData.documents.tenthCert?.name || 'Not uploaded'}</div>
                  <div>12th Certificate: {formData.documents.twelfthCert?.name || 'Not uploaded'}</div>
                  <div>ID Proof: {formData.documents.idProof?.name || 'Not uploaded'}</div>
                  {formData.documents.casteCert && <div>Caste Certificate: {formData.documents.casteCert.name}</div>}
                  {formData.documents.incomeCert && <div>Income Certificate: {formData.documents.incomeCert.name}</div>}
                  {formData.documents.transferCert && <div>Transfer Certificate: {formData.documents.transferCert.name}</div>}
                </div>
              </div>

              <div className={styles.reviewSection}>
                <h3>Course Selection</h3>
                <div className={styles.courseReview}>
                  <div><strong>Degree:</strong> {formData.selectedDegree}</div>
                  <div><strong>Course:</strong> {formData.selectedCourse}</div>
                  <div><strong>Institution:</strong> {passedData.institutionName}</div>
                </div>
              </div>

              <div className={styles.declarationSection}>
                <h3>Declaration</h3>
                <div className={styles.declaration}>
                  <label className={styles.checkboxLabel}>
                    <input type="checkbox" required />
                    <span>I hereby declare that all the information provided above is true and correct to the best of my knowledge. I understand that any false information may lead to rejection of my application.</span>
                  </label>
                </div>
              </div>
            </div>
          </div>
        );

      default:
        return null;
    }
  };

  return (
    <div className={styles.container}>
      <div className={styles.header}>
        <div className={styles.logo}>ANOKHIYAM</div>
        <button onClick={() => navigate('/')} className={styles.backBtn}>
          Back to Home
        </button>
      </div>

      <div className={styles.formWrapper}>
        <div className={styles.formContainer}>
          <div className={styles.formHeader}>
            <h1>Admission Application</h1>
            <p>Complete your admission process for {passedData.institutionName}</p>
          </div>

          {renderProgressBar()}
          
          <div className={styles.formContent}>
            {renderStep()}
          </div>

          <div className={styles.navigationButtons}>
            {step > 1 && (
              <button 
                onClick={prevStep} 
                className={styles.secondaryBtn}
                disabled={isLoading}
              >
                Previous
              </button>
            )}
            
            {step < 5 ? (
              <button 
                onClick={nextStep} 
                className={styles.primaryBtn}
                disabled={isLoading}
              >
                Next
              </button>
            ) : (
              <button 
                onClick={handleSubmit} 
                className={styles.submitBtn}
                disabled={isLoading}
              >
                {isLoading ? 'Submitting...' : 'Submit Application'}
              </button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdmissionForm;
