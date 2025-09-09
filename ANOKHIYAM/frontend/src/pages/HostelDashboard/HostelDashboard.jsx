import React, { useState } from 'react';
import HostelSidebar from '../../components/HostelSidebar/HostelSidebar';
import HostelHeader from '../../components/HostelHeader/HostelHeader';
import styles from './HostelDashboard.module.css';
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  CartesianGrid,
  Legend,
} from 'recharts';
import { FaUser, FaClipboardList, FaFileAlt } from 'react-icons/fa';

const HostelDashboard = () => {
  const [isCollapsed, setIsCollapsed] = useState(false);

  const occupancyData = [
    { name: 'Occupied', value: 132, fill: '#10b981' },
    { name: 'Vacant', value: 24, fill: '#3b82f6' },
    { name: 'Maintenance', value: 7, fill: '#ef4444' },
  ];

  const monthlyReportData = [
    { month: 'Jan', occupancy: 80, complaints: 5 },
    { month: 'Feb', occupancy: 85, complaints: 7 },
    { month: 'Mar', occupancy: 78, complaints: 4 },
    { month: 'Apr', occupancy: 90, complaints: 6 },
    { month: 'May', occupancy: 88, complaints: 3 },
  ];

  const quickStatsData = [
    { title: 'Total Students', value: 156, icon: <FaUser color="#2563eb" size={32} /> },
    { title: 'Present Today', value: 142, icon: <FaUser color="#10b981" size={32} /> },
    { title: 'Absent Today', value: 14, icon: <FaUser color="#ef4444" size={32} /> },
    { title: 'Pending Complaints', value: 5, icon: <FaClipboardList color="#f59e0b" size={32} /> },
  ];

  const events = [
    { date: '2025-09-10', title: 'Sports Day' },
    { date: '2025-09-12', title: 'Cultural Fest' },
    { date: '2025-09-15', title: 'Maintenance Check' },
  ];

  const [tasks, setTasks] = useState([
    { text: 'Check maintenance requests', completed: false },
    { text: 'Inspect vacant rooms', completed: false },
    { text: 'Verify student attendance', completed: false },
    { text: 'Prepare monthly occupancy report', completed: false },
  ]);

  const toggleTask = (index) => {
    const newTasks = [...tasks];
    newTasks[index].completed = !newTasks[index].completed;
    setTasks(newTasks);
  };

  const QuickStatsCard = ({ title, value, icon }) => (
    <div className={styles.quickStatsCard}>
      <div className={styles.quickIcon}>{icon}</div>
      <div>
        <h4 className={styles.quickTitle}>{title}</h4>
        <div className={styles.quickValue}>{value}</div>
      </div>
    </div>
  );

  const renderContent = () => (
    <>
      {/* Page Header */}
      <div className={styles.pageHeader}>
        <h1 className={styles.pageTitle}>Hostel Dashboard</h1>
       
      </div>

      {/* Quick Stats Row */}
      <div className={styles.quickStatsRow}>
        {quickStatsData.map((stat, idx) => (
          <QuickStatsCard key={idx} title={stat.title} value={stat.value} icon={stat.icon} />
        ))}
      </div>

      {/* Occupancy Snapshot + To-Do/Events Row */}
      <div className={styles.mainDashboardRow}>
        <div className={styles.leftStats}>
          <div className={styles.statsCard}>
            <h3 className={styles.cardTitle}>Occupancy Snapshot</h3>
            <ResponsiveContainer width="100%" height={250}>
              <BarChart data={occupancyData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="name" />
                <YAxis />
                <Tooltip />
                <Legend />
                {occupancyData.map((entry) => (
                  <Bar key={entry.name} dataKey="value" fill={entry.fill} name={entry.name} />
                ))}
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>

        <div className={styles.rightPanel}>
          <div className={styles.boxCard}>
            <h4 className={styles.cardTitle}>Today's To-Do List</h4>
            <ul className={styles.todoList}>
              {tasks.map((task, idx) => (
                <li key={idx} className={task.completed ? styles.completedTask : ''}>
                  <input
                    type="checkbox"
                    checked={task.completed}
                    onChange={() => toggleTask(idx)}
                  />
                  <span className={styles.taskText}>{task.text}</span>
                </li>
              ))}
            </ul>
          </div>

          <div className={styles.boxCard}>
            <h4 className={styles.cardTitle}>Upcoming Events</h4>
            <ul className={styles.notificationList}>
              {events.map((event, idx) => (
                <li key={idx}>{event.date} - {event.title}</li>
              ))}
            </ul>
          </div>
        </div>
      </div>

      {/* Reports & Analytics + Total Reports */}
      <div className={styles.reportsSection}>
        <div className={styles.statsCard} style={{ flex: '1 1 70%' }}>
          <h3 className={styles.cardTitle}>Reports & Analytics</h3>
          <ResponsiveContainer width="100%" height={280}>
            <BarChart data={monthlyReportData}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="month" />
              <YAxis />
              <Tooltip />
              <Legend />
              <Bar dataKey="occupancy" fill="#10b981" name="Occupancy %" />
              <Bar dataKey="complaints" fill="#ef4444" name="Complaints" />
            </BarChart>
          </ResponsiveContainer>
        </div>
        <div className={styles.totalReportsCard}>
          
        </div>
      </div>

      {/* Side-by-Side: Today's Events & Food Menu */}
      <div className={styles.sideBySideTables}>
        <div className={styles.tableCard}>
          <h4 className={styles.cardTitle}>Today's Events</h4>
          <table className={styles.scheduleTable}>
            <thead><tr><th>Time</th><th>Event</th></tr></thead>
            <tbody>
              <tr><td>08:00 AM</td><td>Breakfast Gathering</td></tr>
              <tr><td>11:00 AM</td><td>Science Club Meeting</td></tr>
              <tr><td>03:00 PM</td><td>Sports Event</td></tr>
              <tr><td>05:00 PM</td><td>Maintenance Inspection</td></tr>
            </tbody>
          </table>
        </div>
        <div className={styles.tableCard}>
          <h4 className={styles.cardTitle}>Today's Food Menu</h4>
          <table className={styles.scheduleTable}>
            <thead><tr><th>Time</th><th>Menu</th></tr></thead>
            <tbody>
              <tr><td>08:00 AM</td><td>Poha, Tea, Fruit</td></tr>
              <tr><td>01:00 PM</td><td>Rice, Dal, Curry, Salad</td></tr>
              <tr><td>08:00 PM</td><td>Chapati, Vegetable, Soup</td></tr>
            </tbody>
          </table>
        </div>
      </div>
    </>
  );

  return (
    <div className={styles.dashboardContainer}>
      <HostelSidebar activeItem="Dashboard" isCollapsed={isCollapsed} setIsCollapsed={setIsCollapsed} />
      <div className={`${styles.mainContent} ${isCollapsed ? styles.collapsed : ''}`}>
        <HostelHeader isCollapsed={isCollapsed} />
        <div className={styles.content}>{renderContent()}</div>
      </div>
    </div>
  );
};

export default HostelDashboard;
