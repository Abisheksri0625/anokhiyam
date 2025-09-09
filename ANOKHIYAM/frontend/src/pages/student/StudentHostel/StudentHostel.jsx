import React, { useState, useEffect } from 'react';
import StudentSidebar from '../../../components/StudentSidebar/StudentSidebar';
import StudentHeader from '../../../components/StudentHeader/StudentHeader';
import styles from './StudentHostel.module.css';

const StudentHostel = () => {
  const [isCollapsed, setIsCollapsed] = useState(() => localStorage.getItem('studentSidebarCollapsed') === 'true');
  const [roomNo] = useState('102');
  const [members] = useState([
    { name: 'John A', regNo: '21CS001' },
    { name: 'Priya B', regNo: '21CS002' },
    { name: 'You', regNo: '21CS003' }
  ]);

  const [issueMessage, setIssueMessage] = useState('');
  const [outpassForm, setOutpassForm] = useState({ reason: '', timeOut: '', timeIn: '' });
  const [outpassStatus, setOutpassStatus] = useState(null); // 'Accepted' or 'Rejected'
  const [approvedOutpass, setApprovedOutpass] = useState(null);

  const [roomChange, setRoomChange] = useState('No');
  const [newAcPreference, setNewAcPreference] = useState('Non-AC');
  const [sharingType, setSharingType] = useState('');
  const [roommates, setRoommates] = useState([
    { name: '', regNo: '' },
    { name: '', regNo: '' }
  ]);

  useEffect(() => {
    localStorage.setItem('studentSidebarCollapsed', isCollapsed);
  }, [isCollapsed]);

  const handleIssueSend = () => {
    if (issueMessage.trim()) {
      alert(`Issue submitted: ${issueMessage}`);
      setIssueMessage('');
    }
  };

  const handleOutpassChange = (e) => {
    const { name, value } = e.target;
    setOutpassForm(prev => ({ ...prev, [name]: value }));
  };

  const handleOutpassSubmit = (e) => {
    e.preventDefault();
    const decision = Math.random() > 0.5 ? 'Accepted' : 'Rejected';
    setOutpassStatus(decision);

    if (decision === 'Accepted') {
      const request = {
        name: 'You',
        regNo: '21CS003',
        ...outpassForm
      };
      setApprovedOutpass(request);
    }

    alert(`Outpass request ${decision} by warden`);
    setOutpassForm({ reason: '', timeOut: '', timeIn: '' });
  };

  const handleRoommateChange = (index, field, value) => {
    const updated = [...roommates];
    updated[index][field] = value;
    setRoommates(updated);
  };

  const handleRoomChangeSubmit = (e) => {
    e.preventDefault();
    console.log('Room Change Request Submitted');
    console.log('AC Preference:', newAcPreference);
    console.log('Sharing Type:', sharingType);
    console.log('Roommates:', roommates);
    alert('Room change request submitted successfully!');
  };

  return (
    <div className={styles.pageContainer}>
      <StudentSidebar
        activeItem="hostel"
        isCollapsed={isCollapsed}
        setIsCollapsed={setIsCollapsed}
        notificationCount={outpassStatus === 'Rejected' ? 1 : 0}
      />
      <div className={`${styles.mainContent} ${isCollapsed ? styles.collapsed : ''}`}>
        <StudentHeader isCollapsed={isCollapsed} onMenuToggle={() => setIsCollapsed(!isCollapsed)} />
        <div className={styles.content}>
          <h1>Hostel Section</h1>

          <div style={{ display: 'flex', gap: '2rem', flexWrap: 'wrap' }}>
            {/* LEFT: Hostel Info */}
            <div style={{ flex: 1, minWidth: '300px' }}>
              <div className={styles.greenBox}>
                <div className={styles.card}>
                  <h2>Room Information</h2>
                  <p><strong>Room No:</strong> {roomNo}</p>
                  <p><strong>Members in this Room:</strong> {members.length}</p>
                  <p><strong>AC Preference:</strong> Non-AC</p>
                </div>

                <div className={styles.card}>
                  <h2>Students in this Room</h2>
                  <ul>
                    {members.map((member, index) => (
                      <li key={index}>
                        <strong>Name:</strong> {member.name} | <strong>Reg No:</strong> {member.regNo}
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </div>

            {/* RIGHT: Issue Reporting */}
            <div style={{ flex: 1, minWidth: '300px' }}>
              <div className={styles.greenBox}>
                <div className={styles.card}>
                  <h2>Report an Issue</h2>
                  <textarea
                    value={issueMessage}
                    onChange={(e) => setIssueMessage(e.target.value)}
                    placeholder="Describe your issue in the hostel..."
                    rows={4}
                    style={{
                      width: '100%',
                      padding: '0.75rem',
                      borderRadius: '8px',
                      border: '1px solid #ccc',
                      marginBottom: '1rem',
                      fontSize: '1rem'
                    }}
                  />
                  <button
                    onClick={handleIssueSend}
                    style={{
                      padding: '0.5rem 1rem',
                      background: '#059669',
                      color: '#fff',
                      border: 'none',
                      borderRadius: '6px',
                      cursor: 'pointer'
                    }}
                  >
                    Send Issue
                  </button>
                </div>
              </div>
            </div>
          </div>

          {/* Room Change Request */}
          <div className={styles.greenBox}>
            <form onSubmit={handleRoomChangeSubmit} className={styles.card}>
              <h2>Room Change Request</h2>
              <label>
                Do you want to change your room?
                <select value={roomChange} onChange={(e) => setRoomChange(e.target.value)}>
                  <option value="No">No</option>
                  <option value="Yes">Yes</option>
                </select>
              </label>

              {roomChange === 'Yes' && (
                <>
                  <label style={{ marginTop: '1rem', display: 'block' }}>
                    <strong>AC Preference for New Room:</strong>
                    <select
                      value={newAcPreference}
                      onChange={(e) => setNewAcPreference(e.target.value)}
                      style={{ marginLeft: '1rem' }}
                    >
                      <option value="AC">AC</option>
                      <option value="Non-AC">Non-AC</option>
                    </select>
                  </label>

                  <div className={styles.card}>
                    <h2>Sharing Preference</h2>
                    <div className={styles.radioGroup}>
                      {['Single', 'Double', 'Triple', 'Four Sharing'].map((type, idx) => (
                        <label key={idx}>
                          <input
                            type="radio"
                            name="sharing"
                            value={type}
                            checked={sharingType === type}
                            onChange={(e) => setSharingType(e.target.value)}
                          />
                          {type}
                        </label>
                      ))}
                    </div>

                    {sharingType !== 'Single' && (
                      <div className={styles.roommateSection}>
                        <h2>If Sharing, select roommates:</h2>
                        {roommates.map((rm, index) => (
                          <div key={index} className={styles.roommateInput}>
                            <input
                              type="text"
                              placeholder="Name"
                              value={rm.name}
                              onChange={(e) => handleRoommateChange(index, 'name', e.target.value)}
                            />
                            <input
                              type="text"
                              placeholder="Reg No"
                              value={rm.regNo}
                              onChange={(e) => handleRoommateChange(index, 'regNo', e.target.value)}
                            />
                          </div>
                        ))}
                      </div>
                    )}

                    <div className={styles.buttonGroup}>
                      <button type="submit">Submit Request</button>
                      <button type="button" onClick={() => {
                        setRoomChange('No');
                        setNewAcPreference('Non-AC');
                        setSharingType('');
                        setRoommates([{ name: '', regNo: '' }, { name: '', regNo: '' }]);
                      }}>Cancel</button>
                    </div>
                  </div>
                </>
              )}
            </form>
          </div>

          {/* Request Outpass - MOVED BELOW Room Change */}
          <div className={styles.greenBox}>
            <div className={styles.card}>
              <h2>Request Outpass</h2>
              <form onSubmit={handleOutpassSubmit}>
                <div style={{ marginBottom: '1rem' }}>
                  <label><strong>Reason:</strong></label><br />
                  <textarea
                    name="reason"
                    value={outpassForm.reason}
                    onChange={handleOutpassChange}
                    rows={3}
                    style={{
                      width: '100%',
                      padding: '0.5rem',
                      borderRadius: '6px',
                      border: '1px solid #ccc'
                    }}
                  />
                </div>
                <div style={{ marginBottom: '1rem' }}>
                  <label><strong>Time Going Out:</strong></label><br />
                  <input
                    type="datetime-local"
                    name="timeOut"
                    value={outpassForm.timeOut}
                    onChange={handleOutpassChange}
                    style={{
                      width: '100%',
                      padding: '0.5rem',
                      borderRadius: '6px',
                      border: '1px solid #ccc'
                    }}
                  />
                </div>
                <div style={{ marginBottom: '1rem' }}>
                  <label><strong>Expected Return Time:</strong></label><br />
                  <input
                    type="datetime-local"
                    name="timeIn"
                    value={outpassForm.timeIn}
                    onChange={handleOutpassChange}
                    style={{
                      width: '100%',
                      padding: '0.5rem',
                      borderRadius: '6px',
                      border: '1px solid #ccc'
                    }}
                  />
                </div>
                <button
                  type="submit"
                  style={{
                    padding: '0.5rem 1rem',
                    background: '#10b981',
                    color: '#fff',
                    border: 'none',
                    borderRadius: '6px',
                    cursor: 'pointer'
                  }}
                >
                  Submit Outpass
                </button>
              </form>
            </div>
          </div>

          {/* Approved Outpass Popup */}
          {approvedOutpass && outpassStatus === 'Accepted' && (
            <div style={{
              marginTop: '2rem',
              padding: '1rem',
              background: '#ecfdf5',
              border: '2px solid #10b981',
              borderRadius: '1rem',
              boxShadow: '0 2px 8px rgba(0,0,0,0.05)'
            }}>
              <h2>✅ Outpass Approved</h2>
              <p><strong>Name:</strong> {approvedOutpass.name}</p>
              <p><strong>Reg No:</strong> {approvedOutpass.regNo}</p>
              <p><strong>Reason:</strong> {approvedOutpass.reason}</p>
              <p><strong>Time Out:</strong> {new Date(approvedOutpass.timeOut).toLocaleString()}</p>
              <p><strong>Expected Return:</strong> {new Date(approvedOutpass.timeIn).toLocaleString()}</p>
            </div>
          )}
        </div>
      </div>
     </div>
  );
};

export default StudentHostel;