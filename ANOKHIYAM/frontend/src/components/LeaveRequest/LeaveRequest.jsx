import React, { useState, useEffect } from 'react';
import { db, auth } from '../../config/firebase';
import { 
  collection, 
  addDoc, 
  query, 
  where, 
  getDocs,
  onSnapshot
} from 'firebase/firestore';
import styles from './LeaveRequest.module.css';

const LeaveRequest = () => {
  const [form, setForm] = useState({
    from: '',
    to: '',
    type: 'Leave',
    reason: '',
    proof: null
  });

  const [submitted, setSubmitted] = useState(false);
  const [myRequests, setMyRequests] = useState([]);
  const [studentInfo, setStudentInfo] = useState(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    fetchStudentInfo();
  }, []);

  useEffect(() => {
    if (studentInfo) {
      fetchMyRequests();
    }
  }, [studentInfo]);

  const fetchStudentInfo = async () => {
    try {
      const currentUser = auth.currentUser;
      if (!currentUser) return;

      const studentCredsRef = collection(db, 'student_credentials');
      const studentQuery = query(studentCredsRef, where('loginEmail', '==', currentUser.email));
      const studentSnapshot = await getDocs(studentQuery);
      
      if (!studentSnapshot.empty) {
        const studentData = studentSnapshot.docs[0].data();
        setStudentInfo({
          ...studentData,
          id: studentSnapshot.docs[0].id
        });
      }
    } catch (error) {
      console.error('Error fetching student info:', error);
    }
  };

  const fetchMyRequests = () => {
    if (!studentInfo) return;

    const requestsRef = collection(db, 'leave_requests');
    const q = query(
      requestsRef, 
      where('studentId', '==', studentInfo.id)
    );

    // Real-time listener for status updates
    const unsubscribe = onSnapshot(q, (snapshot) => {
      const requests = snapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data()
      }));
      
      // Sort by createdAt on client side
      requests.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));
      
      setMyRequests(requests);
    });

    return unsubscribe;
  };

  const handleChange = (e) => {
    const { name, value, files } = e.target;
    setForm(prev => ({
      ...prev,
      [name]: files ? files[0] : value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!studentInfo) {
      alert('Student information not found');
      return;
    }

    const fromDate = new Date(form.from);
    const toDate = new Date(form.to);
    const diff = (toDate - fromDate) / (1000 * 60 * 60 * 24) + 1;

    if (diff > 2 && !form.proof) {
      alert("Proof required for leave more than 2 consecutive days.");
      return;
    }

    setLoading(true);
    try {
      const leaveRequest = {
        studentId: studentInfo.id,
        studentName: `${studentInfo.firstName} ${studentInfo.lastName}`,
        rollNumber: studentInfo.acceptedStudentId,
        email: studentInfo.loginEmail,
        from: form.from,
        to: form.to,
        type: form.type,
        reason: form.reason,
        days: diff,
        status: 'Pending',
        proof: form.proof ? form.proof.name : null,
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString()
      };

      await addDoc(collection(db, 'leave_requests'), leaveRequest);
      
      setSubmitted(true);
      setForm({
        from: '',
        to: '',
        type: 'Leave',
        reason: '',
        proof: null
      });
      
      alert('✅ Leave request submitted successfully!');
      
    } catch (error) {
      console.error('Error submitting leave request:', error);
      alert('Error submitting leave request. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  const handleNewRequest = () => {
    setSubmitted(false);
    setForm({
      from: '',
      to: '',
      type: 'Leave',
      reason: '',
      proof: null
    });
  };

  const getStatusColor = (status) => {
    switch (status) {
      case 'Pending': return '#f59e0b';
      case 'Accepted': return '#10b981';
      case 'Rejected': return '#ef4444';
      default: return '#6b7280';
    }
  };

  const getStatusIcon = (status) => {
    switch (status) {
      case 'Pending': return '⏳';
      case 'Accepted': return '✅';
      case 'Rejected': return '❌';
      default: return '❓';
    }
  };

  const fromDate = new Date(form.from);
  const toDate = new Date(form.to);
  const diff = (toDate - fromDate) / (1000 * 60 * 60 * 24) + 1;
  const showProofUpload = form.from && form.to && diff > 2;

  if (submitted) {
    return (
      <div className={styles.container}>
        <h2>My Leave Requests</h2>
        
        <div className={styles.requestsList}>
          {myRequests.length > 0 ? (
            myRequests.map(request => (
              <div key={request.id} className={styles.requestCard}>
                <div className={styles.requestHeader}>
                  <h3>{request.type} - {request.days} Days</h3>
                  <span 
                    className={styles.status}
                    style={{ backgroundColor: getStatusColor(request.status) }}
                  >
                    {getStatusIcon(request.status)} {request.status}
                  </span>
                </div>
                <div className={styles.requestDetails}>
                  <p><strong>From:</strong> {new Date(request.from).toLocaleDateString()}</p>
                  <p><strong>To:</strong> {new Date(request.to).toLocaleDateString()}</p>
                  <p><strong>Reason:</strong> {request.reason}</p>
                  <p><strong>Submitted:</strong> {new Date(request.createdAt).toLocaleString()}</p>
                  {request.updatedAt !== request.createdAt && (
                    <p><strong>Last Updated:</strong> {new Date(request.updatedAt).toLocaleString()}</p>
                  )}
                </div>
                {request.status === 'Accepted' && (
                  <div className={styles.approvedBanner}>
                    🎉 Your leave request has been approved!
                  </div>
                )}
                {request.status === 'Rejected' && (
                  <div className={styles.rejectedBanner}>
                    ❌ Your leave request has been rejected. Please contact your teacher for more information.
                  </div>
                )}
              </div>
            ))
          ) : (
            <p>No leave requests found.</p>
          )}
        </div>

        <button className={styles.newRequestBtn} onClick={handleNewRequest}>
          Submit New Request
        </button>
      </div>
    );
  }

  return (
    <div className={styles.container}>
      <h2>Submit Leave Request</h2>
      {studentInfo && (
        <div className={styles.studentInfo}>
          <p><strong>Student:</strong> {studentInfo.firstName} {studentInfo.lastName}</p>
          <p><strong>Roll No:</strong> {studentInfo.acceptedStudentId}</p>
        </div>
      )}
      
      <form onSubmit={handleSubmit} className={styles.form}>
        <div className={styles.row}>
          <label>Leave from:</label>
          <input type="date" name="from" value={form.from} onChange={handleChange} required />
        </div>
        <div className={styles.row}>
          <label>Leave to:</label>
          <input type="date" name="to" value={form.to} onChange={handleChange} required />
        </div>
        <div className={styles.row}>
          <label>Leave type:</label>
          <select name="type" value={form.type} onChange={handleChange}>
            <option value="Leave">Leave</option>
            <option value="OD">OD</option>
          </select>
        </div>
        <div className={styles.row}>
          <label>Reason:</label>
          <textarea name="reason" value={form.reason} onChange={handleChange} required />
        </div>
        {showProofUpload && (
          <div className={styles.row}>
            <label>Upload Proof:</label>
            <input type="file" name="proof" onChange={handleChange} />
            <small>Required for leave more than 2 days</small>
          </div>
        )}
        <div className={styles.buttonGroup}>
          <button type="button" className={styles.cancel} onClick={handleNewRequest}>Cancel</button>
          <button type="submit" className={styles.submit} disabled={loading}>
            {loading ? 'Submitting...' : 'Submit Request'}
          </button>
        </div>
      </form>
    </div>
  );
};

export default LeaveRequest;