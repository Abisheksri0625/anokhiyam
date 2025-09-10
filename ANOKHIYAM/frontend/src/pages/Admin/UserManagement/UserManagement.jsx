import React, { useState } from 'react';
import AdminSidebar from '../../../components/AdminSidebar/AdminSidebar';
import AdminHeader from '../../../components/AdminHeader/AdminHeader';
import styles from './UserManagement.module.css';

const UserManagement = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [filterRole, setFilterRole] = useState('');
  const [filterStatus, setFilterStatus] = useState('');
  const [showForm, setShowForm] = useState(false);
  const [formMode, setFormMode] = useState('add');
  const [selectedUser, setSelectedUser] = useState(null);

  const users = [
    { id: '1001', name: 'Alex', role: 'Admin', status: 'Active' },
    { id: '1002', name: 'John', role: 'Staff', status: 'Active' },
    { id: '1003', name: 'Sara', role: 'Student', status: 'Inactive' }
  ];

  const filteredUsers = users.filter(user =>
    user.name.toLowerCase().includes(searchQuery.toLowerCase()) &&
    (filterRole ? user.role === filterRole : true) &&
    (filterStatus ? user.status === filterStatus : true)
  );

  const handleEdit = (user) => {
    setSelectedUser(user);
    setFormMode('edit');
    setShowForm(true);
  };

  const handleAddNew = () => {
    setSelectedUser(null);
    setFormMode('add');
    setShowForm(true);
  };

  return (
    <div className={styles.dashboardContainer}>
      <AdminSidebar activeItem="users" />
      <div className={styles.mainContent}>
        <AdminHeader />
        <div className={styles.content}>
          <div className={styles.pageHeader}>
            <h1 className={styles.pageTitle}>User Management</h1>
            <p className={styles.pageSubtitle}>Create and manage user accounts</p>
          </div>

          <div className={styles.contentSection}>
            {/* Search and Filters */}
            <div style={{ display: 'flex', gap: '1rem', flexWrap: 'wrap', marginBottom: '1.5rem' }}>
              <input
                type="text"
                placeholder="Search User..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
              <select value={filterRole} onChange={(e) => setFilterRole(e.target.value)}>
                <option value="">Filter by Role</option>
                <option value="Admin">Admin</option>
                <option value="Staff">Staff</option>
                <option value="Student">Student</option>
              </select>
              <select value={filterStatus} onChange={(e) => setFilterStatus(e.target.value)}>
                <option value="">Filter by Status</option>
                <option value="Active">Active</option>
                <option value="Inactive">Inactive</option>
              </select>
              <button onClick={handleAddNew}>+ Add New User</button>
            </div>

            {/* User Table */}
            <div style={{ overflowX: 'auto', marginBottom: '2rem' }}>
              <table style={{ width: '100%', borderCollapse: 'collapse' }}>
                <thead>
                  <tr style={{ background: '#f1f5f9' }}>
                    <th style={{ padding: '0.75rem' }}>UserID</th>
                    <th style={{ padding: '0.75rem' }}>Name</th>
                    <th style={{ padding: '0.75rem' }}>Role</th>
                    <th style={{ padding: '0.75rem' }}>Status</th>
                    <th style={{ padding: '0.75rem' }}>Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {filteredUsers.map((user) => (
                    <tr key={user.id} style={{ borderBottom: '1px solid #e5e7eb' }}>
                      <td style={{ padding: '0.75rem' }}>{user.id}</td>
                      <td style={{ padding: '0.75rem' }}>{user.name}</td>
                      <td style={{ padding: '0.75rem' }}>{user.role}</td>
                      <td style={{ padding: '0.75rem' }}>{user.status}</td>
                      <td style={{ padding: '0.75rem' }}>
                        <button
                          onClick={() => handleEdit(user)}
                          style={{
                            background: 'linear-gradient(135deg, #3b82f6 0%, #1d4ed8 100%)',
                            color: '#fff',
                            padding: '0.4rem 0.8rem',
                            border: 'none',
                            borderRadius: '6px',
                            fontWeight: '500',
                            cursor: 'pointer',
                            transition: 'background 0.3s ease'
                          }}
                        >
                          Edit
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            {/* Add/Edit User Form Popup */}
            {showForm && (
              <div style={{
                background: '#f9fafb',
                border: '1px solid #e5e7eb',
                borderRadius: '1rem',
                padding: '2rem',
                boxShadow: '0 2px 10px rgba(0,0,0,0.05)',
                maxWidth: '500px',
                margin: '0 auto'
              }}>
                <h2>{formMode === 'add' ? 'Add New User' : 'Edit User'}</h2>
                <form>
                  <div style={{ marginBottom: '1rem' }}>
                    <label>Full Name:</label><br />
                    <input type="text" defaultValue={selectedUser?.name || ''} />
                  </div>
                  <div style={{ marginBottom: '1rem' }}>
                    <label>Email/Username:</label><br />
                    <input type="text" />
                  </div>
                  <div style={{ marginBottom: '1rem' }}>
                    <label>Role:</label><br />
                    <select defaultValue={selectedUser?.role || ''}>
                      <option value="">Select Role</option>
                      <option value="Student">Student</option>
                      <option value="Staff">Staff</option>
                      <option value="Admin">Admin</option>
                    </select>
                  </div>
                  <div style={{ marginBottom: '1rem' }}>
                    <label>Status:</label><br />
                    <select defaultValue={selectedUser?.status || 'Active'}>
                      <option value="Active">Active</option>
                      <option value="Inactive">Inactive</option>
                    </select>
                  </div>
                  <div style={{ marginBottom: '1rem' }}>
                    <label>Password:</label><br />
                    <input type="password" />
                  </div>
                  <div style={{ display: 'flex', gap: '1rem' }}>
                    <button type="submit">Save</button>
                    <button type="button" onClick={() => setShowForm(false)}>Cancel</button>
                  </div>
                </form>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default UserManagement;
