import React from 'react';
import AdminSidebar from '../../../components/AdminSidebar/AdminSidebar';
import AdminHeader from '../../../components/AdminHeader/AdminHeader';
import styles from './Analytics.module.css';

import {
  BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer,
  PieChart, Pie, Cell, LineChart, Line, Legend
} from "recharts";

const Analytics = () => {
  // Dummy Data
  const departmentData = [
    { department: "CSE", students: 420 },
    { department: "ECE", students: 310 },
    { department: "Mechanical", students: 220 },
    { department: "Civil", students: 180 },
    { department: "IT", students: 260 },
  ];

  const feesData = [
    { month: "Jan", collected: 120000, pending: 30000 },
    { month: "Feb", collected: 150000, pending: 20000 },
    { month: "Mar", collected: 180000, pending: 10000 },
    { month: "Apr", collected: 140000, pending: 25000 },
  ];

  const performanceData = [
    { grade: "A", students: 120 },
    { grade: "B", students: 200 },
    { grade: "C", students: 150 },
    { grade: "D", students: 60 },
    { grade: "F", students: 20 },
  ];

  const demographicsData = [
    { name: "Male", value: 500 },
    { name: "Female", value: 420 },
    { name: "Other", value: 30 },
  ];

  const COLORS = ["#6366f1", "#22c55e", "#f59e0b", "#ef4444", "#3b82f6"];

  return (
    <div className={styles.dashboardContainer}>
      {/* Sidebar */}
      <AdminSidebar />

      <div className={styles.mainContent}>
        {/* Header */}
        <AdminHeader />

        <div className={styles.content}>
          <div className={styles.pageHeader}>
            <h1 className={styles.pageTitle}>📊 Reports & Analytics</h1>
            <p className={styles.pageSubtitle}>
              Insights on student performance, fees, and department trends
            </p>
          </div>

          {/* Department Analysis */}
          <div className={styles.contentSection}>
            <h2>Department Analysis</h2>
            <ResponsiveContainer width="100%" height={300}>
              <BarChart data={departmentData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="department" />
                <YAxis />
                <Tooltip />
                <Bar dataKey="students" fill="#6366f1" radius={[6, 6, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </div>

          {/* Fees History */}
          <div className={styles.contentSection}>
            <h2>Fees Collection History</h2>
            <ResponsiveContainer width="100%" height={300}>
              <LineChart data={feesData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="month" />
                <YAxis />
                <Tooltip />
                <Legend />
                <Line type="monotone" dataKey="collected" stroke="#22c55e" strokeWidth={3} />
                <Line type="monotone" dataKey="pending" stroke="#ef4444" strokeWidth={3} />
              </LineChart>
            </ResponsiveContainer>
          </div>

          {/* Academic Performance */}
          <div className={styles.contentSection}>
            <h2>Academic Performance</h2>
            <ResponsiveContainer width="100%" height={300}>
              <BarChart data={performanceData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="grade" />
                <YAxis />
                <Tooltip />
                <Bar dataKey="students" fill="#3b82f6" radius={[6, 6, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </div>

          {/* Demographics */}
          <div className={styles.contentSection}>
            <h2>Student Demographics</h2>
            <ResponsiveContainer width="100%" height={300}>
              <PieChart>
                <Pie
                  data={demographicsData}
                  cx="50%"
                  cy="50%"
                  labelLine={false}
                  outerRadius={120}
                  dataKey="value"
                  label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
                >
                  {demographicsData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                  ))}
                </Pie>
                <Tooltip />
              </PieChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Analytics;
