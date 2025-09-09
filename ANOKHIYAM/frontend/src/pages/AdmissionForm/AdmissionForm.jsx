import React, { useState, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { collection, addDoc, getDocs } from 'firebase/firestore';
import { db } from '../../config/firebase';
import styles from './AdmissionForm.module.css';
import { 
  ArrowLeft, 
  ArrowRight,
  User,
  Phone,
  CheckCircle,
  Users,
  GraduationCap
} from 'phosphor-react';

const AdmissionForm = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { studentData, resultData, studentName, uid } = location.state || {};
  
  const [currentStep, setCurrentStep] = useState(1);
  const [loading, setLoading] = useState(false);
  const [errors, setErrors] = useState({});
  const [availableCourses, setAvailableCourses] = useState([]);
  
  const [formData, setFormData] = useState({
    // Step 1: Personal & Family Info
    firstName: '',
    lastName: '',
    fatherName: '',
    motherName: '',
    fatherOccupation: '',
    motherOccupation: '',
    annualFamilyIncome: '',
    
    // Step 2: Contact Info
    studentEmail: '',
    studentPhone: '',
    studentAddress: '',
    fatherPhone: '',
    fatherEmail: '',
    motherPhone: '',
    motherEmail: '',
    city: '',
    state: '',
    pincode: '',
    
    // Step 3: Category, Religion & Course Selection
    category: '',
    religion: '',
    caste: '',
    subCaste: '',
    selectedCourse: ''
  });

  const steps = [
    { 
      number: 1, 
      title: 'Personal & Family', 
      icon: User,
      description: 'Basic details about you and your family'
    },
    { 
      number: 2, 
      title: 'Contact Details', 
      icon: Phone,
      description: 'Contact information for all family members'
    },
    { 
      number: 3, 
      title: 'Course & Category', 
      icon: GraduationCap,
      description: 'Course selection and category information'
    },
    { 
      number: 4, 
      title: 'Review & Submit', 
      icon: CheckCircle,
      description: 'Review your application and submit'
    }
  ];

  // CORRECTED: Load available courses with proper error handling
  useEffect(() => {
    const loadAvailableCourses = async () => {
      try {
        console.log('🎓 Loading available courses...');
        
        // Try to load from Firestore courses collection first
        const coursesSnapshot = await getDocs(collection(db, 'courses'));
        
        if (!coursesSnapshot.empty) {
          const courses = [];
          coursesSnapshot.forEach((doc) => {
            const courseData = { id: doc.id, ...doc.data() };
            courses.push(courseData);
          });
          
          console.log('✅ Loaded courses from database:', courses);
          setAvailableCourses(courses);
        } else {
          console.log('📝 No courses collection found, using fallback courses');
          
          // CORRECTED: Fallback to hardcoded courses with COMPLETE data structure
          const fallbackCourses = [
            { 
              id: 'bcs', 
              name: 'Bachelor of Computer Science', 
              duration: '3 Years', 
              seats: 60,
              description: 'Computer Science and Programming'
            },
            { 
              id: 'bca', 
              name: 'Bachelor of Computer Applications', 
              duration: '3 Years', 
              seats: 40,
              description: 'Computer Applications and Software Development'
            },
            { 
              id: 'bcom', 
              name: 'Bachelor of Commerce', 
              duration: '3 Years', 
              seats: 80,
              description: 'Commerce and Business Studies'
            },
            { 
              id: 'bba', 
              name: 'Bachelor of Business Administration', 
              duration: '3 Years', 
              seats: 50,
              description: 'Business Administration and Management'
            },
            { 
              id: 'be', 
              name: 'Bachelor of Engineering', 
              duration: '4 Years', 
              seats: 120,
              description: 'Engineering and Technology'
            },
            { 
              id: 'bsc', 
              name: 'Bachelor of Science', 
              duration: '3 Years', 
              seats: 60,
              description: 'Science and Research'
            }
          ];
          
          console.log('✅ Using fallback courses:', fallbackCourses);
          setAvailableCourses(fallbackCourses);
        }
      } catch (error) {
        console.error('❌ Error loading courses:', error);
        
        // CORRECTED: Emergency fallback with guaranteed data
        const emergencyFallback = [
          { 
            id: 'bcs', 
            name: 'Bachelor of Computer Science', 
            duration: '3 Years', 
            seats: 60,
            description: 'Computer Science Program'
          },
          { 
            id: 'bca', 
            name: 'Bachelor of Computer Applications', 
            duration: '3 Years', 
            seats: 40,
            description: 'Computer Applications Program'
          }
        ];
        
        console.log('🆘 Using emergency fallback courses:', emergencyFallback);
        setAvailableCourses(emergencyFallback);
      }
    };

    loadAvailableCourses();
  }, []);

  // Redirect if no result data
  if (!studentData && !resultData) {
    return (
      <div className={styles.container}>
        <div className={styles.errorContainer}>
          <h2>Access Denied</h2>
          <p>Please check your results first to access the admission form.</p>
          <button onClick={() => navigate('/check-results')} className={styles.redirectButton}>
            Go to Check Results
          </button>
        </div>
      </div>
    );
  }

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
    
    // Clear error when user starts typing
    if (errors[name]) {
      setErrors(prev => ({
        ...prev,
        [name]: ''
      }));
    }
  };

  const validateStep = (step) => {
    const newErrors = {};
    
    switch (step) {
      case 1:
        if (!formData.firstName.trim()) newErrors.firstName = 'First name is required';
        if (!formData.lastName.trim()) newErrors.lastName = 'Last name is required';
        if (!formData.fatherName.trim()) newErrors.fatherName = 'Father name is required';
        if (!formData.motherName.trim()) newErrors.motherName = 'Mother name is required';
        if (!formData.annualFamilyIncome) newErrors.annualFamilyIncome = 'Annual income is required';
        break;
      case 2:
        if (!formData.studentEmail.trim()) newErrors.studentEmail = 'Email is required';
        if (!formData.studentPhone.trim()) newErrors.studentPhone = 'Phone number is required';
        if (!formData.studentAddress.trim()) newErrors.studentAddress = 'Address is required';
        if (!formData.city.trim()) newErrors.city = 'City is required';
        if (!formData.pincode.trim()) newErrors.pincode = 'Pincode is required';
        break;
      case 3:
        if (!formData.category) newErrors.category = 'Category is required';
        if (!formData.religion.trim()) newErrors.religion = 'Religion is required';
        if (!formData.selectedCourse) newErrors.selectedCourse = 'Please select a course';
        break;
    }
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleNext = () => {
    if (validateStep(currentStep)) {
      setCurrentStep(prev => Math.min(prev + 1, 4));
    }
  };

  const handlePrevious = () => {
    setCurrentStep(prev => Math.max(prev - 1, 1));
  };

  const handleSubmit = async () => {
    if (!validateStep(3)) return;
    
    setLoading(true);
    
    try {
      console.log('📝 Submitting application data...');
      
      // Find the selected course details
      const selectedCourseDetails = availableCourses.find(course => course.name === formData.selectedCourse);
      
      // Prepare application data
      const applicationData = {
        // Institution and student info
        institutionCode: studentData?.institutionCode || 'DEMO001',
        uid: uid || 'DEMO_UID',
        
        // Personal Info
        personalInfo: {
          firstName: formData.firstName,
          lastName: formData.lastName,
          fatherName: formData.fatherName,
          motherName: formData.motherName,
          fatherOccupation: formData.fatherOccupation,
          motherOccupation: formData.motherOccupation,
          annualFamilyIncome: parseFloat(formData.annualFamilyIncome),
          category: formData.category,
          religion: formData.religion,
          caste: formData.caste,
          subCaste: formData.subCaste,
          dateOfBirth: studentData?.dob || resultData?.dob
        },
        
        // Contact Info
        contactInfo: {
          studentEmail: formData.studentEmail,
          studentPhone: formData.studentPhone,
          studentAddress: formData.studentAddress,
          fatherPhone: formData.fatherPhone,
          fatherEmail: formData.fatherEmail,
          motherPhone: formData.motherPhone,
          motherEmail: formData.motherEmail,
          city: formData.city,
          state: formData.state,
          pincode: formData.pincode
        },
        
        // Academic Info
        academicInfo: {
          entranceMarks: resultData?.obtainedMarks || 0,
          entrancePercentage: resultData?.percentage || 0,
          entranceResult: resultData?.result || 'PASS'
        },
        
        // Course Selection (ENHANCED)
        selectedCourse: formData.selectedCourse,
        courseDetails: selectedCourseDetails || null,
        
        // Application metadata
        submissionDate: new Date(),
        status: 'pending',
        priority: Date.now(), // FCFS priority (timestamp)
        documentsRequired: true,
        documentsSubmitted: false
      };

      console.log('📤 Application data to be saved:', applicationData);

      // Save to database
      const docRef = await addDoc(collection(db, 'admission_applications'), applicationData);
      
      console.log('✅ Application submitted successfully with ID:', docRef.id);
      
      // Move to final step
      setCurrentStep(4);
      
    } catch (error) {
      console.error('❌ Error submitting application:', error);
      setErrors({ submit: `Error submitting application: ${error.message}` });
    } finally {
      setLoading(false);
    }
  };

  const renderStepContent = () => {
    switch (currentStep) {
      case 1:
        return (
          <div className={styles.stepContent}>
            <div className={styles.stepHeader}>
              <h2>Personal & Family Information</h2>
              <p>Tell us about yourself and your family</p>
            </div>
            
            <div className={styles.formGrid}>
              <div className={styles.inputGroup}>
                <label>First Name *</label>
                <input
                  type="text"
                  name="firstName"
                  value={formData.firstName}
                  onChange={handleInputChange}
                  className={`${styles.input} ${errors.firstName ? styles.error : ''}`}
                  placeholder="Enter your first name"
                />
                {errors.firstName && <span className={styles.errorText}>{errors.firstName}</span>}
              </div>
              
              <div className={styles.inputGroup}>
                <label>Last Name *</label>
                <input
                  type="text"
                  name="lastName"
                  value={formData.lastName}
                  onChange={handleInputChange}
                  className={`${styles.input} ${errors.lastName ? styles.error : ''}`}
                  placeholder="Enter your last name"
                />
                {errors.lastName && <span className={styles.errorText}>{errors.lastName}</span>}
              </div>
              
              <div className={styles.inputGroup}>
                <label>Father's Name *</label>
                <input
                  type="text"
                  name="fatherName"
                  value={formData.fatherName}
                  onChange={handleInputChange}
                  className={`${styles.input} ${errors.fatherName ? styles.error : ''}`}
                  placeholder="Enter father's name"
                />
                {errors.fatherName && <span className={styles.errorText}>{errors.fatherName}</span>}
              </div>
              
              <div className={styles.inputGroup}>
                <label>Mother's Name *</label>
                <input
                  type="text"
                  name="motherName"
                  value={formData.motherName}
                  onChange={handleInputChange}
                  className={`${styles.input} ${errors.motherName ? styles.error : ''}`}
                  placeholder="Enter mother's name"
                />
                {errors.motherName && <span className={styles.errorText}>{errors.motherName}</span>}
              </div>
              
              <div className={styles.inputGroup}>
                <label>Father's Occupation</label>
                <input
                  type="text"
                  name="fatherOccupation"
                  value={formData.fatherOccupation}
                  onChange={handleInputChange}
                  className={styles.input}
                  placeholder="Enter father's occupation"
                />
              </div>
              
              <div className={styles.inputGroup}>
                <label>Mother's Occupation</label>
                <input
                  type="text"
                  name="motherOccupation"
                  value={formData.motherOccupation}
                  onChange={handleInputChange}
                  className={styles.input}
                  placeholder="Enter mother's occupation"
                />
              </div>
              
              <div className={`${styles.inputGroup} ${styles.fullWidth}`}>
                <label>Annual Family Income (₹) *</label>
                <input
                  type="number"
                  name="annualFamilyIncome"
                  value={formData.annualFamilyIncome}
                  onChange={handleInputChange}
                  className={`${styles.input} ${errors.annualFamilyIncome ? styles.error : ''}`}
                  placeholder="Enter annual family income"
                />
                {errors.annualFamilyIncome && <span className={styles.errorText}>{errors.annualFamilyIncome}</span>}
              </div>
            </div>
          </div>
        );
        
      case 2:
        return (
          <div className={styles.stepContent}>
            <div className={styles.stepHeader}>
              <h2>Contact Information</h2>
              <p>Provide contact details for you and your parents</p>
            </div>
            
            <div className={styles.contactSection}>
              <h3>Student Contact Details</h3>
              <div className={styles.formGrid}>
                <div className={styles.inputGroup}>
                  <label>Email Address *</label>
                  <input
                    type="email"
                    name="studentEmail"
                    value={formData.studentEmail}
                    onChange={handleInputChange}
                    className={`${styles.input} ${errors.studentEmail ? styles.error : ''}`}
                    placeholder="Enter your email"
                  />
                  {errors.studentEmail && <span className={styles.errorText}>{errors.studentEmail}</span>}
                </div>
                
                <div className={styles.inputGroup}>
                  <label>Phone Number *</label>
                  <input
                    type="tel"
                    name="studentPhone"
                    value={formData.studentPhone}
                    onChange={handleInputChange}
                    className={`${styles.input} ${errors.studentPhone ? styles.error : ''}`}
                    placeholder="Enter your phone number"
                  />
                  {errors.studentPhone && <span className={styles.errorText}>{errors.studentPhone}</span>}
                </div>
                
                <div className={`${styles.inputGroup} ${styles.fullWidth}`}>
                  <label>Address *</label>
                  <textarea
                    name="studentAddress"
                    value={formData.studentAddress}
                    onChange={handleInputChange}
                    className={`${styles.input} ${styles.textarea} ${errors.studentAddress ? styles.error : ''}`}
                    placeholder="Enter complete address"
                    rows="3"
                  />
                  {errors.studentAddress && <span className={styles.errorText}>{errors.studentAddress}</span>}
                </div>
                
                <div className={styles.inputGroup}>
                  <label>City *</label>
                  <input
                    type="text"
                    name="city"
                    value={formData.city}
                    onChange={handleInputChange}
                    className={`${styles.input} ${errors.city ? styles.error : ''}`}
                    placeholder="Enter city"
                  />
                  {errors.city && <span className={styles.errorText}>{errors.city}</span>}
                </div>
                
                <div className={styles.inputGroup}>
                  <label>State</label>
                  <input
                    type="text"
                    name="state"
                    value={formData.state}
                    onChange={handleInputChange}
                    className={styles.input}
                    placeholder="Enter state"
                  />
                </div>
                
                <div className={styles.inputGroup}>
                  <label>Pincode *</label>
                  <input
                    type="text"
                    name="pincode"
                    value={formData.pincode}
                    onChange={handleInputChange}
                    className={`${styles.input} ${errors.pincode ? styles.error : ''}`}
                    placeholder="Enter pincode"
                  />
                  {errors.pincode && <span className={styles.errorText}>{errors.pincode}</span>}
                </div>
              </div>
            </div>
            
            <div className={styles.contactSection}>
              <h3>Parent Contact Details (Optional)</h3>
              <div className={styles.formGrid}>
                <div className={styles.inputGroup}>
                  <label>Father's Phone</label>
                  <input
                    type="tel"
                    name="fatherPhone"
                    value={formData.fatherPhone}
                    onChange={handleInputChange}
                    className={styles.input}
                    placeholder="Father's phone number"
                  />
                </div>
                
                <div className={styles.inputGroup}>
                  <label>Father's Email</label>
                  <input
                    type="email"
                    name="fatherEmail"
                    value={formData.fatherEmail}
                    onChange={handleInputChange}
                    className={styles.input}
                    placeholder="Father's email"
                  />
                </div>
                
                <div className={styles.inputGroup}>
                  <label>Mother's Phone</label>
                  <input
                    type="tel"
                    name="motherPhone"
                    value={formData.motherPhone}
                    onChange={handleInputChange}
                    className={styles.input}
                    placeholder="Mother's phone number"
                  />
                </div>
                
                <div className={styles.inputGroup}>
                  <label>Mother's Email</label>
                  <input
                    type="email"
                    name="motherEmail"
                    value={formData.motherEmail}
                    onChange={handleInputChange}
                    className={styles.input}
                    placeholder="Mother's email"
                  />
                </div>
              </div>
            </div>
          </div>
        );
        
      case 3:
        return (
          <div className={styles.stepContent}>
            <div className={styles.stepHeader}>
              <h2>Course Selection & Category Information</h2>
              <p>Choose your desired course and provide category details</p>
            </div>
            
            {/* CORRECTED: Course Selection Section */}
            <div className={styles.courseSection}>
              <h3>🎓 Course Selection</h3>
              <div className={styles.inputGroup}>
                <label>Select Course *</label>
                <select
                  name="selectedCourse"
                  value={formData.selectedCourse}
                  onChange={handleInputChange}
                  className={`${styles.input} ${errors.selectedCourse ? styles.error : ''}`}
                >
                  <option value="">-- Select a Course --</option>
                  {availableCourses.length > 0 ? (
                    availableCourses.map((course) => (
                      <option key={course.id} value={course.name}>
                        {course.name} ({course.duration}) - {course.seats} seats
                      </option>
                    ))
                  ) : (
                    <option value="" disabled>Loading courses...</option>
                  )}
                </select>
                {errors.selectedCourse && <span className={styles.errorText}>{errors.selectedCourse}</span>}
              </div>
              
              {/* CORRECTED: Course Info Display */}
              {formData.selectedCourse && (
                <div className={styles.courseInfo}>
                  <div className={styles.selectedCourseDetails}>
                    <h4>✓ Selected Course</h4>
                    <p><strong>{formData.selectedCourse}</strong></p>
                    {availableCourses.find(c => c.name === formData.selectedCourse) && (
                      <div className={styles.courseMetadata}>
                        <span>Duration: {availableCourses.find(c => c.name === formData.selectedCourse)?.duration}</span>
                        <span>Available Seats: {availableCourses.find(c => c.name === formData.selectedCourse)?.seats}</span>
                      </div>
                    )}
                  </div>
                </div>
              )}
            </div>
            
            <div className={styles.categorySection}>
              <h3>📋 Category Information</h3>
              <div className={styles.formGrid}>
                <div className={styles.inputGroup}>
                  <label>Category *</label>
                  <select
                    name="category"
                    value={formData.category}
                    onChange={handleInputChange}
                    className={`${styles.input} ${errors.category ? styles.error : ''}`}
                  >
                    <option value="">Select Category</option>
                    <option value="OC">Open Category (OC)</option>
                    <option value="BC">Backward Class (BC)</option>
                    <option value="MBC">Most Backward Class (MBC)</option>
                    <option value="SC">Scheduled Caste (SC)</option>
                    <option value="ST">Scheduled Tribe (ST)</option>
                  </select>
                  {errors.category && <span className={styles.errorText}>{errors.category}</span>}
                </div>
                
                <div className={styles.inputGroup}>
                  <label>Religion *</label>
                  <input
                    type="text"
                    name="religion"
                    value={formData.religion}
                    onChange={handleInputChange}
                    className={`${styles.input} ${errors.religion ? styles.error : ''}`}
                    placeholder="Enter your religion"
                  />
                  {errors.religion && <span className={styles.errorText}>{errors.religion}</span>}
                </div>
                
                <div className={styles.inputGroup}>
                  <label>Caste</label>
                  <input
                    type="text"
                    name="caste"
                    value={formData.caste}
                    onChange={handleInputChange}
                    className={styles.input}
                    placeholder="Enter your caste"
                  />
                </div>
                
                <div className={styles.inputGroup}>
                  <label>Sub-Caste</label>
                  <input
                    type="text"
                    name="subCaste"
                    value={formData.subCaste}
                    onChange={handleInputChange}
                    className={styles.input}
                    placeholder="Enter your sub-caste"
                  />
                </div>
              </div>
            </div>
            
            <div className={styles.documentNote}>
              <h4>📝 Document Submission</h4>
              <p>After submitting this form, you will be contacted via SMS/Email with instructions for document submission (Aadhar Card, Certificates, etc.)</p>
            </div>

            {errors.submit && (
              <div className={styles.errorAlert}>
                {errors.submit}
              </div>
            )}
          </div>
        );
        
      case 4:
        return (
          <div className={styles.stepContent}>
            <div className={styles.successContainer}>
              <div className={styles.successIcon}>
                <CheckCircle size={64} weight="fill" />
              </div>
              <h2>🎉 Application Submitted Successfully!</h2>
              <p>Your admission application has been submitted and is now under review.</p>
              
              <div className={styles.applicationSummary}>
                <h3>📋 Application Summary</h3>
                <div className={styles.summaryItem}>
                  <span>Name:</span>
                  <span>{formData.firstName} {formData.lastName}</span>
                </div>
                <div className={styles.summaryItem}>
                  <span>Category:</span>
                  <span>{formData.category}</span>
                </div>
                <div className={styles.summaryItem}>
                  <span>Email:</span>
                  <span>{formData.studentEmail}</span>
                </div>
                <div className={styles.summaryItem}>
                  <span>Course:</span>
                  <span>{formData.selectedCourse}</span>
                </div>
                <div className={styles.summaryItem}>
                  <span>Status:</span>
                  <span className={styles.pending}>Pending Review</span>
                </div>
              </div>
              
              <div className={styles.nextSteps}>
                <h3>🚀 What's Next?</h3>
                <ul>
                  <li>Your application will be reviewed by the admission committee</li>
                  <li>You will receive SMS and email notifications about your application status</li>
                  <li>If accepted, you'll receive instructions for document submission and fee payment</li>
                  <li>The admission process follows First Come First Serve (FCFS) within each category</li>
                </ul>
              </div>
              
              <button 
                onClick={() => navigate('/')}
                className={styles.homeButton}
              >
                Back to Home
              </button>
            </div>
          </div>
        );
        
      default:
        return null;
    }
  };

  return (
    <div className={styles.container}>
      {/* Header */}
      <header className={styles.header}>
        <button 
          onClick={() => navigate(-1)} 
          className={styles.backButton}
        >
          <ArrowLeft size={18} />
          Back
        </button>
        <h1>Admission Application Form</h1>
      </header>

      <div className={styles.formContainer}>
        {/* Progress Steps */}
        <div className={styles.stepsContainer}>
          {steps.map((step) => {
            const IconComponent = step.icon;
            const isActive = currentStep >= step.number;
            const isCurrent = currentStep === step.number;
            
            return (
              <div key={step.number} className={styles.stepWrapper}>
                <div 
                  className={`${styles.step} ${isActive ? styles.stepActive : ''} ${isCurrent ? styles.stepCurrent : ''}`}
                >
                  <div className={styles.stepIcon}>
                    {isActive && currentStep > step.number ? (
                      <CheckCircle size={24} weight="fill" />
                    ) : (
                      <IconComponent size={24} weight={isCurrent ? 'bold' : 'regular'} />
                    )}
                  </div>
                  <div className={styles.stepContent}>
                    <span className={styles.stepTitle}>{step.title}</span>
                    <span className={styles.stepDescription}>{step.description}</span>
                  </div>
                </div>
                {step.number < steps.length && (
                  <div className={`${styles.stepConnector} ${isActive ? styles.connectorActive : ''}`} />
                )}
              </div>
            );
          })}
        </div>

        {/* Form Content */}
        <div className={styles.formContent}>
          {renderStepContent()}
          
          {/* Navigation Buttons */}
          {currentStep < 4 && (
            <div className={styles.formActions}>
              {currentStep > 1 && (
                <button 
                  type="button" 
                  onClick={handlePrevious}
                  className={styles.previousButton}
                  disabled={loading}
                >
                  <ArrowLeft size={16} />
                  Previous
                </button>
              )}
              
              {currentStep < 3 ? (
                <button 
                  type="button" 
                  onClick={handleNext}
                  className={styles.nextButton}
                  disabled={loading}
                >
                  Next
                  <ArrowRight size={16} />
                </button>
              ) : (
                <button 
                  type="button" 
                  onClick={handleSubmit}
                  className={styles.submitButton}
                  disabled={loading}
                >
                  {loading ? (
                    <div className={styles.loadingContent}>
                      <div className={styles.spinner}></div>
                      Submitting Application...
                    </div>
                  ) : (
                    '📤 Submit Application'
                  )}
                </button>
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default AdmissionForm;
