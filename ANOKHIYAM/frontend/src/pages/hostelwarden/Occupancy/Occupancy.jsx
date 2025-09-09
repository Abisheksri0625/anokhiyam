import React, { useState } from 'react';
import HostelSidebar from '../../../components/HostelSidebar/HostelSidebar';
import HostelHeader from '../../../components/HostelHeader/HostelHeader';
import styles from './Occupancy.module.css';

const Occupancy = () => {
  const [isCollapsed, setIsCollapsed] = useState(false);
  const [selectedFloor, setSelectedFloor] = useState('1');
  const [selectedRoom, setSelectedRoom] = useState(null);

  // Sample room data organized by floors
  const roomData = {
    '1': [
      { id: 'A-101', capacity: 1, occupied: 1, status: 'occupied', students: [{ name: 'Rahul Sharma', degree: 'B.Tech CSE', year: '3rd Year' }] },
      { id: 'A-102', capacity: 2, occupied: 2, status: 'occupied', students: [{ name: 'Arjun Kumar', degree: 'B.Sc Physics', year: '2nd Year' }, { name: 'Vikash Singh', degree: 'BCA', year: '3rd Year' }] },
      { id: 'A-103', capacity: 1, occupied: 0, status: 'vacant', students: [] },
      { id: 'A-104', capacity: 2, occupied: 1, status: 'partial', students: [{ name: 'Amit Verma', degree: 'B.Tech IT', year: '2nd Year' }] },
      { id: 'A-105', capacity: 3, occupied: 2, status: 'partial', students: [{ name: 'Ravi Patel', degree: 'MBA', year: '1st Year' }, { name: 'Suresh Kumar', degree: 'M.Tech ECE', year: '2nd Year' }] },
      { id: 'A-106', capacity: 1, occupied: 1, status: 'occupied', students: [{ name: 'Deepak Singh', degree: 'BCA', year: '2nd Year' }] },
      { id: 'A-107', capacity: 2, occupied: 0, status: 'vacant', students: [] },
      { id: 'A-108', capacity: 2, occupied: 2, status: 'occupied', students: [{ name: 'Karan Joshi', degree: 'B.Tech ME', year: '4th Year' }, { name: 'Nitin Shah', degree: 'B.Com', year: '3rd Year' }] },
      { id: 'A-109', capacity: 3, occupied: 1, status: 'partial', students: [{ name: 'Rohit Gupta', degree: 'M.Sc Chemistry', year: '1st Year' }] },
      { id: 'A-110', capacity: 1, occupied: 0, status: 'vacant', students: [] },
    ],
    '2': [
      { id: 'B-201', capacity: 3, occupied: 1, status: 'partial', students: [{ name: 'Priya Patel', degree: 'MBA', year: '1st Year' }] },
      { id: 'B-202', capacity: 2, occupied: 0, status: 'vacant', students: [] },
      { id: 'B-203', capacity: 1, occupied: 1, status: 'occupied', students: [{ name: 'Neha Sharma', degree: 'M.Tech CSE', year: '2nd Year' }] },
      { id: 'B-204', capacity: 2, occupied: 2, status: 'occupied', students: [{ name: 'Pooja Jain', degree: 'M.Sc Chemistry', year: '1st Year' }, { name: 'Shreya Reddy', degree: 'MBA', year: '2nd Year' }] },
      { id: 'B-205', capacity: 3, occupied: 3, status: 'occupied', students: [{ name: 'Kavita Singh', degree: 'B.Tech IT', year: '3rd Year' }, { name: 'Ritu Agarwal', degree: 'BCA', year: '2nd Year' }, { name: 'Sunita Verma', degree: 'M.Com', year: '1st Year' }] },
      { id: 'B-206', capacity: 1, occupied: 0, status: 'vacant', students: [] },
      { id: 'B-207', capacity: 2, occupied: 1, status: 'partial', students: [{ name: 'Meera Gupta', degree: 'B.Sc Physics', year: '3rd Year' }] },
      { id: 'B-208', capacity: 2, occupied: 2, status: 'occupied', students: [{ name: 'Anita Singh', degree: 'M.Tech ME', year: '1st Year' }, { name: 'Rekha Patel', degree: 'B.Com', year: '2nd Year' }] },
      { id: 'B-209', capacity: 3, occupied: 2, status: 'partial', students: [{ name: 'Sonia Kumar', degree: 'MBA', year: '2nd Year' }, { name: 'Divya Joshi', degree: 'M.Sc Biology', year: '1st Year' }] },
      { id: 'B-210', capacity: 1, occupied: 1, status: 'occupied', students: [{ name: 'Asha Reddy', degree: 'B.Tech ECE', year: '4th Year' }] },
    ],
    '3': [
      { id: 'C-301', capacity: 1, occupied: 1, status: 'occupied', students: [{ name: 'Sneha Reddy', degree: 'M.Sc Chemistry', year: '1st Year' }] },
      { id: 'C-302', capacity: 2, occupied: 0, status: 'vacant', students: [] },
      { id: 'C-303', capacity: 3, occupied: 2, status: 'partial', students: [{ name: 'Anita Gupta', degree: 'M.Com', year: '1st Year' }, { name: 'Pooja Jain', degree: 'M.Sc Chemistry', year: '1st Year' }] },
      { id: 'C-304', capacity: 2, occupied: 2, status: 'occupied', students: [{ name: 'Ritika Shah', degree: 'B.Tech IT', year: '3rd Year' }, { name: 'Priyanka Singh', degree: 'BCA', year: '4th Year' }] },
      { id: 'C-305', capacity: 1, occupied: 0, status: 'vacant', students: [] },
      { id: 'C-306', capacity: 3, occupied: 1, status: 'partial', students: [{ name: 'Simran Kaur', degree: 'MBA', year: '2nd Year' }] },
      { id: 'C-307', capacity: 2, occupied: 2, status: 'occupied', students: [{ name: 'Tanvi Agarwal', degree: 'M.Tech CSE', year: '1st Year' }, { name: 'Nisha Verma', degree: 'B.Com', year: '3rd Year' }] },
      { id: 'C-308', capacity: 1, occupied: 1, status: 'occupied', students: [{ name: 'Madhuri Patel', degree: 'B.Sc Physics', year: '2nd Year' }] },
      { id: 'C-309', capacity: 3, occupied: 3, status: 'occupied', students: [{ name: 'Swati Sharma', degree: 'B.Tech ME', year: '4th Year' }, { name: 'Vandana Kumar', degree: 'M.Sc Biology', year: '2nd Year' }, { name: 'Geeta Singh', degree: 'MBA', year: '1st Year' }] },
      { id: 'C-310', capacity: 2, occupied: 0, status: 'vacant', students: [] },
    ],
    '4': [
      { id: 'B-201', capacity: 3, occupied: 1, status: 'partial', students: [{ name: 'Priya Patel', degree: 'MBA', year: '1st Year' }] },
      { id: 'B-202', capacity: 2, occupied: 0, status: 'vacant', students: [] },
      { id: 'B-203', capacity: 1, occupied: 1, status: 'occupied', students: [{ name: 'Neha Sharma', degree: 'M.Tech CSE', year: '2nd Year' }] },
      { id: 'B-204', capacity: 2, occupied: 2, status: 'occupied', students: [{ name: 'Pooja Jain', degree: 'M.Sc Chemistry', year: '1st Year' }, { name: 'Shreya Reddy', degree: 'MBA', year: '2nd Year' }] },
      { id: 'B-205', capacity: 3, occupied: 3, status: 'occupied', students: [{ name: 'Kavita Singh', degree: 'B.Tech IT', year: '3rd Year' }, { name: 'Ritu Agarwal', degree: 'BCA', year: '2nd Year' }, { name: 'Sunita Verma', degree: 'M.Com', year: '1st Year' }] },
      { id: 'B-206', capacity: 1, occupied: 0, status: 'vacant', students: [] },
      { id: 'B-207', capacity: 2, occupied: 1, status: 'partial', students: [{ name: 'Meera Gupta', degree: 'B.Sc Physics', year: '3rd Year' }] },
      { id: 'B-208', capacity: 2, occupied: 2, status: 'occupied', students: [{ name: 'Anita Singh', degree: 'M.Tech ME', year: '1st Year' }, { name: 'Rekha Patel', degree: 'B.Com', year: '2nd Year' }] },
      { id: 'B-209', capacity: 3, occupied: 2, status: 'partial', students: [{ name: 'Sonia Kumar', degree: 'MBA', year: '2nd Year' }, { name: 'Divya Joshi', degree: 'M.Sc Biology', year: '1st Year' }] },
      { id: 'B-210', capacity: 1, occupied: 1, status: 'occupied', students: [{ name: 'Asha Reddy', degree: 'B.Tech ECE', year: '4th Year' }] },
    ],
    '5': [
      { id: 'B-201', capacity: 3, occupied: 1, status: 'partial', students: [{ name: 'Priya Patel', degree: 'MBA', year: '1st Year' }] },
      { id: 'B-202', capacity: 2, occupied: 0, status: 'vacant', students: [] },
      { id: 'B-203', capacity: 1, occupied: 1, status: 'occupied', students: [{ name: 'Neha Sharma', degree: 'M.Tech CSE', year: '2nd Year' }] },
      { id: 'B-204', capacity: 2, occupied: 2, status: 'occupied', students: [{ name: 'Pooja Jain', degree: 'M.Sc Chemistry', year: '1st Year' }, { name: 'Shreya Reddy', degree: 'MBA', year: '2nd Year' }] },
      { id: 'B-205', capacity: 3, occupied: 3, status: 'occupied', students: [{ name: 'Kavita Singh', degree: 'B.Tech IT', year: '3rd Year' }, { name: 'Ritu Agarwal', degree: 'BCA', year: '2nd Year' }, { name: 'Sunita Verma', degree: 'M.Com', year: '1st Year' }] },
      { id: 'B-206', capacity: 1, occupied: 0, status: 'vacant', students: [] },
      { id: 'B-207', capacity: 2, occupied: 1, status: 'partial', students: [{ name: 'Meera Gupta', degree: 'B.Sc Physics', year: '3rd Year' }] },
      { id: 'B-208', capacity: 2, occupied: 2, status: 'occupied', students: [{ name: 'Anita Singh', degree: 'M.Tech ME', year: '1st Year' }, { name: 'Rekha Patel', degree: 'B.Com', year: '2nd Year' }] },
      { id: 'B-209', capacity: 3, occupied: 2, status: 'partial', students: [{ name: 'Sonia Kumar', degree: 'MBA', year: '2nd Year' }, { name: 'Divya Joshi', degree: 'M.Sc Biology', year: '1st Year' }] },
      { id: 'B-210', capacity: 1, occupied: 1, status: 'occupied', students: [{ name: 'Asha Reddy', degree: 'B.Tech ECE', year: '4th Year' }] },
    ],
    '6': [
      { id: 'B-201', capacity: 3, occupied: 1, status: 'partial', students: [{ name: 'Priya Patel', degree: 'MBA', year: '1st Year' }] },
      { id: 'B-202', capacity: 2, occupied: 0, status: 'vacant', students: [] },
      { id: 'B-203', capacity: 1, occupied: 1, status: 'occupied', students: [{ name: 'Neha Sharma', degree: 'M.Tech CSE', year: '2nd Year' }] },
      { id: 'B-204', capacity: 2, occupied: 2, status: 'occupied', students: [{ name: 'Pooja Jain', degree: 'M.Sc Chemistry', year: '1st Year' }, { name: 'Shreya Reddy', degree: 'MBA', year: '2nd Year' }] },
      { id: 'B-205', capacity: 3, occupied: 3, status: 'occupied', students: [{ name: 'Kavita Singh', degree: 'B.Tech IT', year: '3rd Year' }, { name: 'Ritu Agarwal', degree: 'BCA', year: '2nd Year' }, { name: 'Sunita Verma', degree: 'M.Com', year: '1st Year' }] },
      { id: 'B-206', capacity: 1, occupied: 0, status: 'vacant', students: [] },
      { id: 'B-207', capacity: 2, occupied: 1, status: 'partial', students: [{ name: 'Meera Gupta', degree: 'B.Sc Physics', year: '3rd Year' }] },
      { id: 'B-208', capacity: 2, occupied: 2, status: 'occupied', students: [{ name: 'Anita Singh', degree: 'M.Tech ME', year: '1st Year' }, { name: 'Rekha Patel', degree: 'B.Com', year: '2nd Year' }] },
      { id: 'B-209', capacity: 3, occupied: 2, status: 'partial', students: [{ name: 'Sonia Kumar', degree: 'MBA', year: '2nd Year' }, { name: 'Divya Joshi', degree: 'M.Sc Biology', year: '1st Year' }] },
      { id: 'B-210', capacity: 1, occupied: 1, status: 'occupied', students: [{ name: 'Asha Reddy', degree: 'B.Tech ECE', year: '4th Year' }] },
    ],
  };

  const getRoomStatusClass = (room) => {
    if (room.occupied === 0) return 'vacant';
    if (room.occupied === room.capacity) return 'occupied';
    return 'partial';
  };

  const currentFloorRooms = roomData[selectedFloor] || [];

  // Calculate floor statistics
  const totalRooms = currentFloorRooms.length;
  const occupiedRooms = currentFloorRooms.filter(room => room.status === 'occupied').length;
  const vacantRooms = currentFloorRooms.filter(room => room.status === 'vacant').length;
  const partialRooms = currentFloorRooms.filter(room => room.status === 'partial').length;

  return (
    <div className={styles.dashboardContainer}>
      <HostelSidebar 
        activeItem="occupancy" 
        isCollapsed={isCollapsed}
        setIsCollapsed={setIsCollapsed}
      />
      <div className={`${styles.mainContent} ${isCollapsed ? styles.collapsed : ''}`}>
        <HostelHeader isCollapsed={isCollapsed} />
        <div className={styles.content}>
          <div className={styles.occupancyContainer}>
            {/* Header */}
            <div className={styles.header}>
              <h1>Room Occupancy Overview</h1>
              <p>Visual room allocation and student details</p>
            </div>

            {/* Floor Selection and Stats */}
            <div className={styles.controlsSection}>
              <div className={styles.floorSelector}>
                <label className={styles.floorLabel}>Select Floor:</label>
                <select 
                  className={styles.floorSelect}
                  value={selectedFloor}
                  onChange={(e) => {
                    setSelectedFloor(e.target.value);
                    setSelectedRoom(null); // Reset selected room when floor changes
                  }}
                >
                  <option value="1">1st Floor</option>
                  <option value="2">2nd Floor</option>
                  <option value="3">3rd Floor</option>
                </select>
              </div>

              <div className={styles.floorStats}>
                <div className={styles.statItem}>
                  <span className={styles.statNumber}>{totalRooms}</span>
                  <span className={styles.statLabel}>Total</span>
                </div>
                <div className={styles.statItem}>
                  <span className={styles.statNumber}>{occupiedRooms}</span>
                  <span className={styles.statLabel}>Occupied</span>
                </div>
                <div className={styles.statItem}>
                  <span className={styles.statNumber}>{partialRooms}</span>
                  <span className={styles.statLabel}>Partial</span>
                </div>
                <div className={styles.statItem}>
                  <span className={styles.statNumber}>{vacantRooms}</span>
                  <span className={styles.statLabel}>Vacant</span>
                </div>
              </div>
            </div>

            {/* Legend */}
            <div className={styles.legend}>
              <div className={styles.legendItem}>
                <div className={`${styles.legendColor} ${styles.occupied}`}></div>
                <span>Fully Occupied</span>
              </div>
              <div className={styles.legendItem}>
                <div className={`${styles.legendColor} ${styles.partial}`}></div>
                <span>Partially Occupied</span>
              </div>
              <div className={styles.legendItem}>
                <div className={`${styles.legendColor} ${styles.vacant}`}></div>
                <span>Vacant</span>
              </div>
            </div>

            {/* Room Layout */}
            <div className={styles.roomLayout}>
              <div className={styles.floorTitle}>
                Floor {selectedFloor} - Room Layout
              </div>
              
              <div className={styles.roomGrid}>
                {currentFloorRooms.map((room) => (
                  <div
                    key={room.id}
                    className={`${styles.roomBox} ${styles[getRoomStatusClass(room)]} ${selectedRoom?.id === room.id ? styles.selected : ''}`}
                    onClick={() => setSelectedRoom(room)}
                  >
                    <div className={styles.roomNumber}>{room.id}</div>
                    <div className={styles.roomOccupancy}>
                      {room.occupied}/{room.capacity}
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Room Details Modal */}
            {selectedRoom && (
              <div className={styles.roomDetailsModal}>
                <div className={styles.modalContent}>
                  <div className={styles.modalHeader}>
                    <h3>Room {selectedRoom.id} Details</h3>
                    <button 
                      className={styles.closeBtn}
                      onClick={() => setSelectedRoom(null)}
                    >
                      ×
                    </button>
                  </div>
                  
                  <div className={styles.modalBody}>
                    <div className={styles.roomInfo}>
                      <div className={styles.infoItem}>
                        <strong>Capacity:</strong> {selectedRoom.capacity} beds
                      </div>
                      <div className={styles.infoItem}>
                        <strong>Occupied:</strong> {selectedRoom.occupied} beds
                      </div>
                      <div className={styles.infoItem}>
                        <strong>Available:</strong> {selectedRoom.capacity - selectedRoom.occupied} beds
                      </div>
                      <div className={styles.infoItem}>
                        <strong>Status:</strong> 
                        <span className={`${styles.statusBadge} ${styles[selectedRoom.status]}`}>
                          {selectedRoom.status === 'partial' ? 'Partially Occupied' : selectedRoom.status === 'occupied' ? 'Fully Occupied' : 'Vacant'}
                        </span>
                      </div>
                    </div>

                    {selectedRoom.students.length > 0 ? (
                      <div className={styles.studentsSection}>
                        <h4>Current Students:</h4>
                        <div className={styles.studentsList}>
                          {selectedRoom.students.map((student, index) => (
                            <div key={index} className={styles.studentCard}>
                              <div className={styles.studentName}>{student.name}</div>
                              <div className={styles.studentDetails}>
                                <span className={styles.studentDegree}>{student.degree}</span>
                                <span className={styles.studentYear}>{student.year}</span>
                              </div>
                            </div>
                          ))}
                        </div>
                      </div>
                    ) : (
                      <div className={styles.noStudents}>
                        <p>This room is currently vacant</p>
                      </div>
                    )}
                  </div>
                </div>
                <div className={styles.modalOverlay} onClick={() => setSelectedRoom(null)}></div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Occupancy;
