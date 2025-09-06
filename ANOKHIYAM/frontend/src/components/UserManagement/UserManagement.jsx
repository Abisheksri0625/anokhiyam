import React, { useState } from 'react';
import { createUserWithEmailAndPassword } from 'firebase/auth';
import { doc, setDoc } from 'firebase/firestore';
import { auth, db } from '../../config/firebase';
import styles from './UserManagement.module.css';

const UserManagement = () => {
  const [formData, setFormData] = useState({
    email: '',
    password: '',
    displayName: '',
    role: '',
    institutionCode: 'ANOKHIYAM2024',
    studentId: '',
    department: '',
    phone: ''
  });
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState({ type: '', text: '' });

  const roles = [
    { value: 'student', label: 'Student' },
    { value: 'teacher', label: 'Teacher' },
    { value: 'admin', label: 'Admin' },
    { value: 'librarian', label: 'Librarian' },
    { value: 'hostel_warden', label: 'Hostel Warden' }
  ];

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

      // Store additional user data in Firestore
      await setDoc(doc(db, 'users', user.uid), {
        uid: user.uid,
        email: formData.email,
        displayName: formData.displayName,
        role: formData.role,
        institutionCode: formData.institutionCode,
        studentId: formData.studentId,
        department: formData.department,
        phone: formData.phone,
        createdAt: new Date().toISOString(),
        isActive: true
      });

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
        phone: ''
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

  return (
    <div className={styles.container}>
      <div className={styles.header}>
        <h2>Create New User Account</h2>
        <p>Add new students, teachers, and staff members to the system</p>
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
              {roles.map(role => (
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

        <button type="submit" disabled={loading} className={styles.submitBtn}>
          {loading ? 'Creating Account...' : 'Create User Account'}
        </button>
      </form>
    </div>
  );
};

export default UserManagement;
