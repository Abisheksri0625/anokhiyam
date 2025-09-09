import React, { useState, useEffect } from 'react';
import { db } from '../../config/firebase';
import { 
  collection, 
  query, 
  where, 
  onSnapshot,
  doc,
  updateDoc,
  getDocs
} from 'firebase/firestore';
import styles from './TeachLeave.module.css';

const TeachLeave = () => {
  const [requests, setRequests] = useState([]);
  const [activeTab, setActiveTab] = useState('Pending');
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchLeaveRequests();
  }, [activeTab]);

  const fetchLeaveRequests = () => {
    const requestsRef = collection(db, 'leave_requests');
    const q = query(
      requestsRef, 
      where('status', '==', activeTab)
    );

    const unsubscribe = onSnapshot(q, (snapshot) => {
      const requestData = snapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data()
      }));
      
      // Sort by createdAt on the client side to avoid index issues
      requestData.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));
      
      setRequests(requestData);
      setLoading(false);
    });

    return unsubscribe;
  };

  const handleAction = async (requestId, newStatus) => {
    try {
      const requestRef = doc(db, 'leave_requests', requestId);
      await updateDoc(requestRef, {
        status: newStatus,
        updatedAt: new Date().toISOString(),
        reviewedBy: 'teacher'
      });

      alert(`✅ Request ${newStatus.toLowerCase()} successfully!`);
    } catch (error) {
      console.error('Error updating request:', error);
      alert('Error updating request. Please try again.');
    }
  };

  const requiresProof = (request) => {
    const keywords = ['marriage', 'death', 'health', 'medical'];
    return (
      request.days > 2 &&
      keywords.some(k => request.reason.toLowerCase().includes(k)) &&
      !request.proof
    );
  };

  return (
    <div className={styles.leaveContainer}>
      <div className={styles.header}>
        <h2>Leave Request Management</h2>
      </div>

      {/* Tab Navigation - Removed "Forwarded to HOD" */}
      <div className={styles.tabNavigation}>
        {['Pending', 'Accepted', 'Rejected'].map(tab => (
          <button
            key={tab}
            className={`${styles.tabButton} ${activeTab === tab ? styles.activeTab : ''}`}
            onClick={() => setActiveTab(tab)}
          >
            {tab} ({requests.length})
          </button>
        ))}
      </div>

      {loading ? (
        <div className={styles.loading}>Loading requests...</div>
      ) : (
        <div className={styles.requestsContainer}>
          {requests.length > 0 ? (
            <table className={styles.leaveTable}>
              <thead>
                <tr>
                  <th>Student Name</th>
                  <th>Roll No</th>
                  <th>Type</th>
                  <th>From</th>
                  <th>To</th>
                  <th>Days</th>
                  <th>Reason</th>
                  <th>Proof</th>
                  <th>Submitted</th>
                  {activeTab === 'Pending' && <th>Actions</th>}
                </tr>
              </thead>
              <tbody>
                {requests.map(request => (
                  <tr key={request.id}>
                    <td><strong>{request.studentName}</strong></td>
                    <td>{request.rollNumber}</td>
                    <td>
                      <span className={styles.leaveType}>{request.type}</span>
                    </td>
                    <td>{new Date(request.from).toLocaleDateString()}</td>
                    <td>{new Date(request.to).toLocaleDateString()}</td>
                    <td><strong>{request.days}</strong></td>
                    <td className={styles.reasonCell}>
                      <div className={styles.reasonText}>{request.reason}</div>
                    </td>
                    <td>
                      {requiresProof(request) ? (
                        <span className={styles.missingProof}>Required</span>
                      ) : request.proof ? (
                        <span className={styles.proofAvailable}>Available</span>
                      ) : (
                        <span className={styles.notRequired}>Not Required</span>
                      )}
                    </td>
                    <td>{new Date(request.createdAt).toLocaleDateString()}</td>
                    {activeTab === 'Pending' && (
                      <td>
                        <div className={styles.actionButtons}>
                          <button
                            className={styles.acceptBtn}
                            onClick={() => handleAction(request.id, 'Accepted')}
                          >
                            ✅ Accept
                          </button>
                          <button
                            className={styles.rejectBtn}
                            onClick={() => handleAction(request.id, 'Rejected')}
                          >
                            ❌ Reject
                          </button>
                        </div>
                      </td>
                    )}
                  </tr>
                ))}
              </tbody>
            </table>
          ) : (
            <div className={styles.noRequests}>
              <h3>No {activeTab.toLowerCase()} requests found</h3>
              <p>All {activeTab.toLowerCase()} leave requests will appear here.</p>
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default TeachLeave;