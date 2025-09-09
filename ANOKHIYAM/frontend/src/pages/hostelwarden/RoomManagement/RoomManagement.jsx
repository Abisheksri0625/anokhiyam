import React, { useState } from 'react';
import HostelSidebar from '../../../components/HostelSidebar/HostelSidebar';
import HostelHeader from '../../../components/HostelHeader/HostelHeader';
import styles from './RoomManagement.module.css';

const RoomManagement = () => {
  const [isCollapsed, setIsCollapsed] = useState(false);
  const [activeView, setActiveView] = useState('overview');
  const [selectedFloor, setSelectedFloor] = useState('all');
  const [selectedStatus, setSelectedStatus] = useState('all');
  const [selectedRoomType, setSelectedRoomType] = useState('all');

  // Sample room data
  const rooms = [
    { id: 1, number: 'A-101', floor: '1st Floor', type: 'Single', capacity: 1, occupied: 1, status: 'occupied', student: 'Rahul Sharma', maintenance: 'good', lastCleaned: '2025-09-07' },
    { id: 2, number: 'A-102', floor: '1st Floor', type: 'Double', capacity: 2, occupied: 2, status: 'occupied', student: 'Arjun Kumar, Vikash Singh', maintenance: 'good', lastCleaned: '2025-09-07' },
    { id: 3, number: 'A-103', floor: '1st Floor', type: 'Single', capacity: 1, occupied: 0, status: 'available', student: '-', maintenance: 'needs-repair', lastCleaned: '2025-09-05' },
    { id: 4, number: 'B-201', floor: '2nd Floor', type: 'Triple', capacity: 3, occupied: 1, status: 'partially-occupied', student: 'Priya Patel', maintenance: 'good', lastCleaned: '2025-09-08' },
    { id: 5, number: 'B-202', floor: '2nd Floor', type: 'Double', capacity: 2, occupied: 0, status: 'maintenance', student: '-', maintenance: 'under-repair', lastCleaned: '2025-09-03' },
    { id: 6, number: 'C-301', floor: '3rd Floor', type: 'Single', capacity: 1, occupied: 1, status: 'occupied', student: 'Sneha Reddy', maintenance: 'good', lastCleaned: '2025-09-08' },
    { id: 7, number: 'C-302', floor: '3rd Floor', type: 'Double', capacity: 2, occupied: 0, status: 'available', student: '-', maintenance: 'good', lastCleaned: '2025-09-06' },
    { id: 8, number: 'C-303', floor: '3rd Floor', type: 'Triple', capacity: 3, occupied: 2, status: 'partially-occupied', student: 'Anita Gupta, Pooja Jain', maintenance: 'needs-attention', lastCleaned: '2025-09-07' },
  ];

  // Calculate statistics
  const totalRooms = rooms.length;
  const occupiedRooms = rooms.filter(room => room.status === 'occupied').length;
  const availableRooms = rooms.filter(room => room.status === 'available').length;
  const partiallyOccupied = rooms.filter(room => room.status === 'partially-occupied').length;
  const maintenanceRooms = rooms.filter(room => room.status === 'maintenance').length;
  const totalCapacity = rooms.reduce((sum, room) => sum + room.capacity, 0);
  const totalOccupied = rooms.reduce((sum, room) => sum + room.occupied, 0);

  // Filter rooms based on selections
  const filteredRooms = rooms.filter(room => {
    const floorMatch = selectedFloor === 'all' || room.floor === selectedFloor;
    const statusMatch = selectedStatus === 'all' || room.status === selectedStatus;
    const typeMatch = selectedRoomType === 'all' || room.type === selectedRoomType;
    return floorMatch && statusMatch && typeMatch;
  });

  const getStatusColor = (status) => {
    switch (status) {
      case 'occupied': return 'occupied';
      case 'available': return 'available';
      case 'partially-occupied': return 'partial';
      case 'maintenance': return 'maintenance';
      default: return 'available';
    }
  };

  const getMaintenanceStatus = (maintenance) => {
    switch (maintenance) {
      case 'good': return 'good';
      case 'needs-attention': return 'attention';
      case 'needs-repair': return 'repair';
      case 'under-repair': return 'under-repair';
      default: return 'good';
    }
  };

  return (
    <div className={styles.dashboardContainer}>
      <HostelSidebar 
        activeItem="rooms" 
        isCollapsed={isCollapsed}
        setIsCollapsed={setIsCollapsed}
      />
      <div className={`${styles.mainContent} ${isCollapsed ? styles.collapsed : ''}`}>
        <HostelHeader isCollapsed={isCollapsed} />
        <div className={styles.content}>
          <div className={styles.roomManagementContainer}>
            {/* Header */}
            <div className={styles.header}>
              <h1>Room Management</h1>
              <p>Manage hostel rooms, occupancy, and maintenance</p>
            </div>

            {/* Statistics Cards */}
            <div className={styles.statsContainer}>
              <div className={styles.statCard}>
                <div className={styles.statNumber}>{totalRooms}</div>
                <div className={styles.statLabel}>Total Rooms</div>
              </div>
              <div className={styles.statCard}>
                <div className={styles.statNumber}>{occupiedRooms}</div>
                <div className={styles.statLabel}>Fully Occupied</div>
              </div>
              <div className={styles.statCard}>
                <div className={styles.statNumber}>{availableRooms}</div>
                <div className={styles.statLabel}>Available</div>
              </div>
              <div className={styles.statCard}>
                <div className={styles.statNumber}>{partiallyOccupied}</div>
                <div className={styles.statLabel}>Partially Occupied</div>
              </div>
              <div className={styles.statCard}>
                <div className={styles.statNumber}>{maintenanceRooms}</div>
                <div className={styles.statLabel}>Under Maintenance</div>
              </div>
              <div className={styles.statCard}>
                <div className={styles.statNumber}>{Math.round((totalOccupied / totalCapacity) * 100)}%</div>
                <div className={styles.statLabel}>Occupancy Rate</div>
              </div>
            </div>

            {/* Navigation Tabs */}
            <div className={styles.tabsContainer}>
              <button 
                className={`${styles.tab} ${activeView === 'overview' ? styles.active : ''}`}
                onClick={() => setActiveView('overview')}
              >
                Room Overview
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

            {/* Filters */}
            <div className={styles.filtersSection}>
              <div className={styles.filterGroup}>
                <select 
                  className={styles.filterSelect}
                  value={selectedFloor}
                  onChange={(e) => setSelectedFloor(e.target.value)}
                >
                  <option value="all">All Floors</option>
                  <option value="1st Floor">1st Floor</option>
                  <option value="2nd Floor">2nd Floor</option>
                  <option value="3rd Floor">3rd Floor</option>
                </select>

                <select 
                  className={styles.filterSelect}
                  value={selectedStatus}
                  onChange={(e) => setSelectedStatus(e.target.value)}
                >
                  <option value="all">All Status</option>
                  <option value="occupied">Occupied</option>
                  <option value="available">Available</option>
                  <option value="partially-occupied">Partially Occupied</option>
                  <option value="maintenance">Under Maintenance</option>
                </select>

                <select 
                  className={styles.filterSelect}
                  value={selectedRoomType}
                  onChange={(e) => setSelectedRoomType(e.target.value)}
                >
                  <option value="all">All Room Types</option>
                  <option value="Single">Single Occupancy</option>
                  <option value="Double">Double Occupancy</option>
                  <option value="Triple">Triple Occupancy</option>
                </select>
              </div>
            </div>

            {/* Content based on active view */}
            {activeView === 'overview' && (
              <div className={styles.tableContainer}>
                <table className={styles.roomsTable}>
                  <thead>
                    <tr>
                      <th>Room No.</th>
                      <th>Floor</th>
                      <th>Type</th>
                      <th>Occupancy</th>
                      <th>Status</th>
                      <th>Current Students</th>
                      <th>Actions</th>
                    </tr>
                  </thead>
                  <tbody>
                    {filteredRooms.map(room => (
                      <tr key={room.id}>
                        <td><strong>{room.number}</strong></td>
                        <td>{room.floor}</td>
                        <td>{room.type}</td>
                        <td>{room.occupied}/{room.capacity}</td>
                        <td>
                          <span className={`${styles.statusBadge} ${styles[getStatusColor(room.status)]}`}>
                            {room.status.replace('-', ' ')}
                          </span>
                        </td>
                        <td className={styles.studentInfo}>{room.student}</td>
                        <td>
                          <div className={styles.actionButtons}>
                            <button className={styles.actionBtn}>Edit</button>
                            <button className={styles.actionBtn}>Assign</button>
                          </div>
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
                      <th>Floor</th>
                      <th>Maintenance Status</th>
                      <th>Last Cleaned</th>
                      <th>Priority</th>
                      <th>Actions</th>
                    </tr>
                  </thead>
                  <tbody>
                    {filteredRooms.map(room => (
                      <tr key={room.id}>
                        <td><strong>{room.number}</strong></td>
                        <td>{room.floor}</td>
                        <td>
                          <span className={`${styles.maintenanceBadge} ${styles[getMaintenanceStatus(room.maintenance)]}`}>
                            {room.maintenance.replace('-', ' ')}
                          </span>
                        </td>
                        <td>{room.lastCleaned}</td>
                        <td>
                          <span className={`${styles.priorityBadge} ${room.maintenance === 'under-repair' ? styles.high : room.maintenance === 'needs-repair' ? styles.medium : styles.low}`}>
                            {room.maintenance === 'under-repair' ? 'High' : room.maintenance === 'needs-repair' ? 'Medium' : 'Low'}
                          </span>
                        </td>
                        <td>
                          <div className={styles.actionButtons}>
                            <button className={styles.actionBtn}>Schedule</button>
                            <button className={styles.actionBtn}>Report</button>
                          </div>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            )}

            {activeView === 'allocation' && (
              <div className={styles.allocationGrid}>
                {filteredRooms.map(room => (
                  <div key={room.id} className={`${styles.roomCard} ${styles[getStatusColor(room.status)]}`}>
                    <div className={styles.roomHeader}>
                      <h3>{room.number}</h3>
                      <span className={`${styles.statusIndicator} ${styles[getStatusColor(room.status)]}`}></span>
                    </div>
                    <div className={styles.roomDetails}>
                      <p><strong>Floor:</strong> {room.floor}</p>
                      <p><strong>Type:</strong> {room.type}</p>
                      <p><strong>Capacity:</strong> {room.occupied}/{room.capacity}</p>
                      {room.student !== '-' && (
                        <p><strong>Students:</strong> {room.student}</p>
                      )}
                    </div>
                    <div className={styles.roomActions}>
                      <button className={styles.assignBtn} disabled={room.status === 'maintenance'}>
                        {room.status === 'available' ? 'Assign Student' : 'Manage'}
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default RoomManagement;
