import React, { useState } from 'react';
import HostelSidebar from '../../../components/HostelSidebar/HostelSidebar';
import HostelHeader from '../../../components/HostelHeader/HostelHeader';
import styles from './RoomManagement.module.css';

const RoomManagement = () => {
  const [isCollapsed, setIsCollapsed] = useState(false);
  const [activeView, setActiveView] = useState('requests');

  // Room Requests data
  const [roomRequests, setRoomRequests] = useState([
    {
      id: 1,
      studentName: 'Rahul Sharma',
      year: '3rd Year',
      degree: 'B.Tech CSE',
      currentRoom: 'A-101',
      preferredRoommate: 'Arjun Kumar',
      status: 'pending',
    },
    {
      id: 2,
      studentName: 'Priya Patel',
      year: '2nd Year',
      degree: 'MBA',
      currentRoom: 'B-202',
      preferredRoommate: 'Neha Sharma',
      status: 'pending',
    },
  ]);

  // Maintenance data
  const [maintenanceItems, setMaintenanceItems] = useState([
    {
      id: 1,
      roomNo: 'A-103',
      issue: 'Leaking faucet',
      status: 'pending',
      lastReported: '2025-09-07',
    },
    {
      id: 2,
      roomNo: 'B-202',
      issue: 'Broken window',
      status: 'pending',
      lastReported: '2025-09-05',
    },
  ]);

  // Room Allocation data
  const [roomCards, setRoomCards] = useState([
    { id: 'A-104', type: 'Single', status: 'vacant', capacity: 1, occupied: 0, students: [] },
    { id: 'B-209', type: 'Triple', status: 'partiallyoccupied', capacity: 3, occupied: 1, students: ['Nitin Agarwal'] },
    { id: 'C-307', type: 'occupied', capacity: 2, occupied: 2, students: ['Sonia Kumar', 'Vishal Mehra'] },
    { id: 'B-211', type: 'Double', status: 'vacant', capacity: 2, occupied: 0, students: [] },
  ]);

  // Modal state
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [assignRoomId, setAssignRoomId] = useState(null);
  const [studentForm, setStudentForm] = useState({
    name: '',
    degree: '',
    year: '',
    joinDate: '',
    native: '',
  });

  // Open Modal
  const openAssignModal = (roomId) => {
    setAssignRoomId(roomId);
    setStudentForm({ name: '', degree: '', year: '', joinDate: '', native: '' });
    setIsModalOpen(true);
  };

  // Close Modal
  const closeAssignModal = () => setIsModalOpen(false);

  // Handle Form Input Change
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setStudentForm((prev) => ({ ...prev, [name]: value }));
  };

  // Submit Allocation Form
  const handleAssignSubmit = (e) => {
    e.preventDefault();
    setRoomCards((prev) =>
      prev.map((room) =>
        room.id === assignRoomId
          ? {
              ...room,
              occupied: room.occupied + 1,
              students: [...room.students, studentForm.name],
              status: room.occupied + 1 === room.capacity ? 'occupied' : 'partiallyoccupied',
            }
          : room
      )
    );
    setIsModalOpen(false);
    // TODO: Backend API integration and notification
  };

  // Accept or Reject roommate request
  const handleRequestDecision = (id, decision) => {
    setRoomRequests((prev) => prev.map((req) => (req.id === id ? { ...req, status: decision } : req)));
  };

  // Mark maintenance as resolved
  const handleResolveMaintenance = (id) => {
    setMaintenanceItems((prev) => prev.map((item) => (item.id === id ? { ...item, status: 'resolved' } : item)));
  };

  return (
    <div className={styles.dashboardContainer}>
      <div className={styles.sidebarWidth}>
        <HostelSidebar activeItem="rooms" isCollapsed={isCollapsed} setIsCollapsed={setIsCollapsed} />
      </div>

      <div className={`${styles.mainContent} ${isCollapsed ? styles.collapsed : ''}`}>
        <HostelHeader isCollapsed={isCollapsed} />

        <div className={styles.pageContent}>
          <div className={styles.header}>
            <h1 className={styles.pageTitle}>Room Management</h1>
            <p className={styles.pageSubtitle}>Manage roommate requests, maintenance, and allocations</p>
          </div>

          <div className={styles.tabsContainer}>
            <button
              className={`${styles.tab} ${activeView === 'requests' ? styles.active : ''}`}
              onClick={() => setActiveView('requests')}
            >
              Room Requests
            </button>
            <button
              className={`${styles.tab} ${activeView === 'maintenance' ? styles.active : ''}`}
              onClick={() => setActiveView('maintenance')}
            >
              Maintenance Tracker
            </button>
            <button
              className={`${styles.tab} ${activeView === 'allocation' ? styles.active : ''}`}
              onClick={() => setActiveView('allocation')}
            >
              Room Allocation
            </button>
          </div>

          {activeView === 'requests' && (
            <div className={styles.tableContainer}>
              <table className={styles.roomsTable}>
                <thead>
                  <tr>
                    <th>Name</th>
                    <th>Year</th>
                    <th>Degree</th>
                    <th>Room No.</th>
                    <th>Preferred Roommate</th>
                    <th>Status</th>
                    <th>Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {roomRequests.map((req) => (
                    <tr key={req.id}>
                      <td>{req.studentName}</td>
                      <td>{req.year}</td>
                      <td>{req.degree}</td>
                      <td>{req.currentRoom}</td>
                      <td>{req.preferredRoommate}</td>
                      <td>
                        <span
                          className={`${styles.statusBadge} ${
                            req.status === 'accepted'
                              ? styles.accepted
                              : req.status === 'rejected'
                              ? styles.rejected
                              : styles.pending
                          }`}
                        >
                          {req.status.charAt(0).toUpperCase() + req.status.slice(1)}
                        </span>
                      </td>
                      <td>
                        {req.status === 'pending' ? (
                          <div className={styles.actions}>
                            <button className={styles.acceptButton} onClick={() => handleRequestDecision(req.id, 'accepted')}>
                              Accept
                            </button>
                            <button className={styles.rejectButton} onClick={() => handleRequestDecision(req.id, 'rejected')}>
                              Reject
                            </button>
                          </div>
                        ) : (
                          <em>{req.status === 'accepted' ? 'Accepted' : 'Rejected'}</em>
                        )}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}

          {activeView === 'maintenance' && (
            <div className={styles.tableContainer}>
              <table className={styles.roomsTable}>
                <thead>
                  <tr>
                    <th>Room No.</th>
                    <th>Issue</th>
                    <th>Status</th>
                    <th>Last Reported</th>
                    <th>Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {maintenanceItems.map((item) => (
                    <tr key={item.id}>
                      <td>{item.roomNo}</td>
                      <td>{item.issue}</td>
                      <td>
                        <span className={`${styles.statusBadge} ${item.status === 'resolved' ? styles.accepted : styles.pending}`}>
                          {item.status.charAt(0).toUpperCase() + item.status.slice(1)}
                        </span>
                      </td>
                      <td>{item.lastReported}</td>
                      <td>
                        {item.status === 'pending' ? (
                          <button className={styles.acceptButton} onClick={() => handleResolveMaintenance(item.id)}>
                            Mark Resolved
                          </button>
                        ) : (
                          <em>Resolved</em>
                        )}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}

          {activeView === 'allocation' && (
            <div className={styles.cardGrid}>
              {roomCards
                .filter((room) => room.status === 'vacant' || room.status === 'partiallyoccupied')
                .map((room) => (
                  <div key={room.id} className={`${styles.roomCard} ${styles[room.status.replace('-', '')]}`}>
                    <div className={styles.roomCardHeader}>
                      <span className={styles.roomId}>{room.id}</span>
                      <span className={styles.roomType}>{room.type}</span>
                    </div>
                    <div className={styles.roomCardDetails}>
                      <span>Capacity: {room.capacity}</span>
                      <span>
                        Occupied: {room.occupied}/{room.capacity}
                      </span>
                      {room.students.length > 0 && (
                        <span className={styles.assignedStudents}>Assigned: {room.students.join(', ')}</span>
                      )}
                    </div>
                    <button className={styles.assignButton} onClick={() => openAssignModal(room.id)}>
                      Assign
                    </button>
                  </div>
                ))}

              {isModalOpen && (
                <div className={styles.modalOverlay}>
                  <div className={styles.modalBox}>
                    <h2>Assign Student To Room {assignRoomId}</h2>
                    <form className={styles.assignForm} onSubmit={handleAssignSubmit}>
                      <input
                        type="text"
                        name="name"
                        placeholder="Student Name"
                        value={studentForm.name}
                        onChange={handleInputChange}
                        required
                      />
                      <input
                        type="text"
                        name="degree"
                        placeholder="Degree"
                        value={studentForm.degree}
                        onChange={handleInputChange}
                        required
                      />
                      <input
                        type="text"
                        name="year"
                        placeholder="Year of Study"
                        value={studentForm.year}
                        onChange={handleInputChange}
                        required
                      />
                      <input
                        type="date"
                        name="joinDate"
                        placeholder="Join Date"
                        value={studentForm.joinDate}
                        onChange={handleInputChange}
                        required
                      />
                      <input
                        type="text"
                        name="native"
                        placeholder="Native"
                        value={studentForm.native}
                        onChange={handleInputChange}
                        required
                      />
                      <div className={styles.modalActions}>
                        <button type="submit" className={styles.assignButton}>
                          Assign
                        </button>
                        <button type="button" onClick={closeAssignModal} className={styles.cancelButton}>
                          Cancel
                        </button>
                      </div>
                    </form>
                  </div>
                </div>
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default RoomManagement;
