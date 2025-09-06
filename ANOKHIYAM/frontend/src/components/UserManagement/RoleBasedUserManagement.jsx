import React, { useState } from 'react';
import { createUserWithEmailAndPassword } from 'firebase/auth';
import { doc, setDoc } from 'firebase/firestore';
import { auth, db } from '../../config/firebase';
import { useAuth } from '../../context/AuthContext';
import styles from './UserManagement.module.css';

const RoleBasedUserManagement = () => {
  const { currentUser } = useAuth();
  const [userRole, setUserRole] = useState(localStorage.getItem('userRole'));
  const [formData, setFormData] = useState({
    email: '',
    password: '',
    displayName: '',
    role: '',
    institutionCode: 'ANOKHIYAM2024',
    studentId: '',
    department: '',
    phone: '',
    roomNumber: '',
    libraryId: ''
  });
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState({ type: '', text: '' });

  // Define what roles each user type can create
  const getRolePermissions = () => {
    switch(userRole) {
      case 'admin':
        return [
          { value: 'student', label: 'Student' },
          { value: 'teacher', label: 'Teacher' },
          { value: 'admin', label: 'Admin' },
          { value: 'librarian', label: 'Librarian' },
          { value: 'hostel_warden', label: 'Hostel Warden' }
        ];
      case 'librarian':
        return [
          { value: 'student', label: 'Student (Library Access)' }
        ];
      case 'hostel_warden':
        return [
          { value: 'student', label: 'Student (Hostel Resident)' }
        ];
      default:
        return [];
    }
  };

  const getFormTitle = () => {
    switch(userRole) {
      case 'admin':
        return 'Create New User Account';
      case 'librarian':
        return 'Register Student for Library';
      case 'hostel_warden':
        return 'Register Hostel Resident';
      default:
        return 'User Management';
    }
  };

  const getFormDescription = () => {
    switch(userRole) {
      case 'admin':
        return 'Add new students, teachers, and staff members to the system';
      case 'librarian':
        return 'Register new students for library access and services';
      case 'hostel_warden':
        return 'Add new students to hostel management system';
      default:
        return '';
    }
  };

  const rolePermissions = getRolePermissions();

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setMessage({ type: '', text: '' });

    try {
      // Create user in Firebase Auth
      const userCredential = await createUserWithEmailAndPassword(
        auth, 
        formData.email, 
        formData.password
      );
      
      const user = userCredential.user;

      // Prepare user data based on role
      let userData = {
        uid: user.uid,
        email: formData.email,
        displayName: formData.displayName,
        role: formData.role,
        institutionCode: formData.institutionCode,
        studentId: formData.studentId,
        department: formData.department,
        phone: formData.phone,
        createdAt: new Date().toISOString(),
        createdBy: currentUser.uid,
        createdByRole: userRole,
        isActive: true
      };

      // Add role-specific data
      if (userRole === 'hostel_warden' && formData.role === 'student') {
        userData.hostelData = {
          roomNumber: formData.roomNumber,
          checkInDate: new Date().toISOString(),
          hostelStatus: 'active'
        };
      }

      if (userRole === 'librarian' && formData.role === 'student') {
        userData.libraryData = {
          libraryId: formData.libraryId,
          membershipDate: new Date().toISOString(),
          libraryStatus: 'active',
          booksIssued: 0
        };
      }

      // Store user data in Firestore
      await setDoc(doc(db, 'users', user.uid), userData);

      setMessage({ 
        type: 'success', 
        text: `${formData.role} account created successfully for ${formData.displayName}!` 
      });

      // Reset form
      setFormData({
        email: '',
        password: '',
        displayName: '',
        role: '',
        institutionCode: 'ANOKHIYAM2024',
        studentId: '',
        department: '',
        phone: '',
        roomNumber: '',
        libraryId: ''
      });

    } catch (error) {
      console.error('User creation error:', error);
      setMessage({ 
        type: 'error', 
        text: `Error creating account: ${error.message}` 
      });
    } finally {
      setLoading(false);
    }
  };

  // Don't show if user doesn't have permission
  if (rolePermissions.length === 0) {
    return (
      <div className={styles.container}>
        <div className={styles.noPermission}>
          <h3>Access Denied</h3>
          <p>You don't have permission to create user accounts.</p>
        </div>
      </div>
    );
  }

  return (
    <div className={styles.container}>
      <div className={styles.header}>
        <h2>{getFormTitle()}</h2>
        <p>{getFormDescription()}</p>
      </div>

      {message.text && (
        <div className={`${styles.message} ${styles[message.type]}`}>
          {message.text}
        </div>
      )}

      <form onSubmit={handleSubmit} className={styles.form}>
        <div className={styles.row}>
          <div className={styles.formGroup}>
            <label>Full Name *</label>
            <input
              type="text"
              name="displayName"
              value={formData.displayName}
              onChange={handleInputChange}
              required
              placeholder="Enter full name"
            />
          </div>

          <div className={styles.formGroup}>
            <label>Role *</label>
            <select
              name="role"
              value={formData.role}
              onChange={handleInputChange}
              required
            >
              <option value="">Select role</option>
              {rolePermissions.map(role => (
                <option key={role.value} value={role.value}>{role.label}</option>
              ))}
            </select>
          </div>
        </div>

        <div className={styles.row}>
          <div className={styles.formGroup}>
            <label>Email Address *</label>
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleInputChange}
              required
              placeholder="Enter email address"
            />
          </div>

          <div className={styles.formGroup}>
            <label>Password *</label>
            <input
              type="password"
              name="password"
              value={formData.password}
              onChange={handleInputChange}
              required
              placeholder="Create password (min 6 characters)"
              minLength={6}
            />
          </div>
        </div>

        <div className={styles.row}>
          <div className={styles.formGroup}>
            <label>Student/Employee ID</label>
            <input
              type="text"
              name="studentId"
              value={formData.studentId}
              onChange={handleInputChange}
              placeholder="Enter ID number"
            />
          </div>

          <div className={styles.formGroup}>
            <label>Department</label>
            <input
              type="text"
              name="department"
              value={formData.department}
              onChange={handleInputChange}
              placeholder="Enter department"
            />
          </div>
        </div>

        {/* Role-specific fields */}
        {userRole === 'hostel_warden' && formData.role === 'student' && (
          <div className={styles.row}>
            <div className={styles.formGroup}>
              <label>Room Number *</label>
              <input
                type="text"
                name="roomNumber"
                value={formData.roomNumber}
                onChange={handleInputChange}
                required
                placeholder="Enter room number (e.g., 205-B)"
              />
            </div>
            <div className={styles.formGroup}>
              <label>Phone Number</label>
              <input
                type="tel"
                name="phone"
                value={formData.phone}
                onChange={handleInputChange}
                placeholder="Enter phone number"
              />
            </div>
          </div>
        )}

        {userRole === 'librarian' && formData.role === 'student' && (
          <div className={styles.row}>
            <div className={styles.formGroup}>
              <label>Library ID</label>
              <input
                type="text"
                name="libraryId"
                value={formData.libraryId}
                onChange={handleInputChange}
                placeholder="Enter library ID (auto-generated if empty)"
              />
            </div>
            <div className={styles.formGroup}>
              <label>Phone Number</label>
              <input
                type="tel"
                name="phone"
                value={formData.phone}
                onChange={handleInputChange}
                placeholder="Enter phone number"
              />
            </div>
          </div>
        )}

        {userRole === 'admin' && (
          <div className={styles.row}>
            <div className={styles.formGroup}>
              <label>Phone Number</label>
              <input
                type="tel"
                name="phone"
                value={formData.phone}
                onChange={handleInputChange}
                placeholder="Enter phone number"
              />
            </div>

            <div className={styles.formGroup}>
              <label>Institution Code</label>
              <input
                type="text"
                name="institutionCode"
                value={formData.institutionCode}
                onChange={handleInputChange}
                disabled
              />
            </div>
          </div>
        )}

        <button type="submit" disabled={loading} className={styles.submitBtn}>
          {loading ? 'Creating Account...' : `Create ${formData.role || 'User'} Account`}
        </button>
      </form>
    </div>
  );
};

export default RoleBasedUserManagement;
