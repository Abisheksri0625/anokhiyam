import React, { useState } from 'react';
import AdminSidebar from '../../../components/AdminSidebar/AdminSidebar';
import AdminHeader from '../../../components/AdminHeader/AdminHeader';
import styles from './StaffManagement.module.css';

const StaffManagement = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [filterDept, setFilterDept] = useState('');
  const [filterRole, setFilterRole] = useState('');
  const [showForm, setShowForm] = useState(false);
  const [formMode, setFormMode] = useState('add');
  const [selectedStaff, setSelectedStaff] = useState(null);

  const staffList = [
    { id: '2001', name: 'Alex', dept: 'CSE', role: 'Professor' },
    { id: '2002', name: 'John', dept: 'ECE', role: 'Assistant' },
    { id: '2003', name: 'Sara', dept: 'IT', role: 'Tutor' }
  ];

  const filteredStaff = staffList.filter(staff =>
    staff.name.toLowerCase().includes(searchQuery.toLowerCase()) &&
    (filterDept ? staff.dept === filterDept : true) &&
    (filterRole ? staff.role === filterRole : true)
  );

  const handleAddNew = () => {
    setSelectedStaff(null);
    setFormMode('add');
    setShowForm(true);
  };

  const handleEdit = (staff) => {
    setSelectedStaff(staff);
    setFormMode('edit');
    setShowForm(true);
  };

  return (
    <div className={styles.dashboardContainer}>
      <AdminSidebar activeItem="staff" />
      <div className={styles.mainContent}>
        <AdminHeader />
        <div className={styles.content}>
          <div className={styles.pageHeader}>
            <h1 className={styles.pageTitle}>Staff Management</h1>
            <p className={styles.pageSubtitle}>Manage faculty and administrative staff</p>
          </div>

          <div className={styles.contentSection}>
            {/* Search and Filters */}
            <div style={{ display: 'flex', gap: '1rem', flexWrap: 'wrap', marginBottom: '1.5rem' }}>
              <input
                type="text"
                placeholder="Search Staff..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
              <select value={filterDept} onChange={(e) => setFilterDept(e.target.value)}>
                <option value="">Filter by Dept</option>
                <option value="CSE">CSE</option>
                <option value="ECE">ECE</option>
                <option value="IT">IT</option>
              </select>
              <select value={filterRole} onChange={(e) => setFilterRole(e.target.value)}>
                <option value="">Filter by Role</option>
                <option value="Professor">Professor</option>
                <option value="Assistant">Assistant</option>
                <option value="Tutor">Tutor</option>
              </select>
              <button onClick={handleAddNew}>+ Add New Staff</button>
            </div>

            {/* Staff Directory Table */}
            <div style={{ overflowX: 'auto', marginBottom: '2rem' }}>
              <table style={{ width: '100%', borderCollapse: 'collapse' }}>
                <thead>
                  <tr style={{ background: '#f1f5f9' }}>
                    <th style={{ padding: '0.75rem' }}>StaffID</th>
                    <th style={{ padding: '0.75rem' }}>Name</th>
                    <th style={{ padding: '0.75rem' }}>Dept</th>
                    <th style={{ padding: '0.75rem' }}>Role</th>
                    <th style={{ padding: '0.75rem' }}>Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {filteredStaff.map((staff) => (
                    <tr key={staff.id} style={{ borderBottom: '1px solid #e5e7eb' }}>
                      <td style={{ padding: '0.75rem' }}>{staff.id}</td>
                      <td style={{ padding: '0.75rem' }}>{staff.name}</td>
                      <td style={{ padding: '0.75rem' }}>{staff.dept}</td>
                      <td style={{ padding: '0.75rem' }}>{staff.role}</td>
                      <td style={{ padding: '0.75rem' }}>
                        <button
  onClick={() => handleEdit(staff)}
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

            {/* Add/Edit Staff Form Popup */}
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
                <h2>{formMode === 'add' ? 'Add New Staff' : 'Edit Staff'}</h2>
                <form>
                  <div style={{ marginBottom: '1rem' }}>
                    <label>Full Name:</label><br />
                    <input type="text" defaultValue={selectedStaff?.name || ''} />
                  </div>
                  <div style={{ marginBottom: '1rem' }}>
                    <label>Staff ID:</label><br />
                    <input type="text" defaultValue={selectedStaff?.id || ''} />
                  </div>
                  <div style={{ marginBottom: '1rem' }}>
                    <label>Department:</label><br />
                    <select defaultValue={selectedStaff?.dept || ''}>
                      <option value="">Select Dept</option>
                      <option value="CSE">CSE</option>
                      <option value="ECE">ECE</option>
                      <option value="IT">IT</option>
                    </select>
                  </div>
                  <div style={{ marginBottom: '1rem' }}>
                    <label>Role:</label><br />
                    <select defaultValue={selectedStaff?.role || ''}>
                      <option value="">Select Role</option>
                      <option value="Professor">Professor</option>
                      <option value="Assistant">Assistant</option>
                      <option value="Tutor">Tutor</option>
                    </select>
                  </div>
                  <div style={{ marginBottom: '1rem' }}>
                    <label>Email:</label><br />
                    <input type="email" />
                  </div>
                  <div style={{ marginBottom: '1rem' }}>
                    <label>Phone:</label><br />
                    <input type="tel" />
                  </div>
                  <div style={{ marginBottom: '1rem' }}>
                    <label>Subjects Assigned:</label><br />
                    <button type="button">+ Add Subject</button>
                  </div>
                  <div style={{ marginBottom: '1rem' }}>
                    <label>Status:</label><br />
                    <select>
                      <option value="Active">Active</option>
                      <option value="Inactive">Inactive</option>
                    </select>
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

export default StaffManagement;
