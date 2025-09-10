import React, { useState } from 'react';
import StudentSidebar from '../../../components/StudentSidebar/StudentSidebar';
import StudentHeader from '../../../components/StudentHeader/StudentHeader';
import styles from './StudentFeedback.module.css';

const StudentFeedback = () => {
  const [isCollapsed, setIsCollapsed] = useState(false);
  const [activeTab, setActiveTab] = useState('feedback');
  const [feedbackForm, setFeedbackForm] = useState({
    type: 'general',
    subject: '',
    description: '',
    priority: 'medium',
    category: 'academic'
  });
  const [reportForm, setReportForm] = useState({
    type: 'issue',
    title: '',
    description: '',
    location: '',
    urgency: 'medium',
    anonymous: false
  });

  const handleFeedbackChange = (e) => {
    const { name, value } = e.target;
    setFeedbackForm(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleReportChange = (e) => {
    const { name, value, type, checked } = e.target;
    setReportForm(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value
    }));
  };

  const handleFeedbackSubmit = (e) => {
    e.preventDefault();
    console.log('Feedback submitted:', feedbackForm);
    alert('Feedback submitted successfully!');
    setFeedbackForm({
      type: 'general',
      subject: '',
      description: '',
      priority: 'medium',
      category: 'academic'
    });
  };

  const handleReportSubmit = (e) => {
    e.preventDefault();
    console.log('Report submitted:', reportForm);
    alert('Report submitted successfully!');
    setReportForm({
      type: 'issue',
      title: '',
      description: '',
      location: '',
      urgency: 'medium',
      anonymous: false
    });
  };

  return (
    <div className={styles.pageContainer}>
      <StudentSidebar 
        activeItem="feedback"
        isCollapsed={isCollapsed}
        setIsCollapsed={setIsCollapsed}
      />
      
      <div className={`${styles.mainContent} ${isCollapsed ? styles.collapsed : ''}`}>
        <StudentHeader 
          isCollapsed={isCollapsed} 
          onMenuToggle={() => setIsCollapsed(!isCollapsed)} 
        />
        
        <div className={styles.content}>
          <div className={styles.pageHeader}>
            <h1>Feedback & Report</h1>
            <p>Share your thoughts and report issues to help us improve</p>
          </div>

          <div className={styles.tabContainer}>
            <div className={styles.tabs}>
              <button
                className={`${styles.tab} ${activeTab === 'feedback' ? styles.active : ''}`}
                onClick={() => setActiveTab('feedback')}
              >
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <path d="M7 8h10m-10 4h6m-6 4h4"/>
                  <rect width="18" height="14" x="3" y="6" rx="2"/>
                  <path d="M3 10h18"/>
                </svg>
                Feedback
              </button>
              <button
                className={`${styles.tab} ${activeTab === 'report' ? styles.active : ''}`}
                onClick={() => setActiveTab('report')}
              >
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <path d="M10.29 3.86L1.82 18a2 2 0 0 0 1.71 3h16.94a2 2 0 0 0 1.71-3L13.71 3.86a2 2 0 0 0-3.42 0z"/>
                  <line x1="12" y1="9" x2="12" y2="13"/>
                  <point cx="12" cy="17"/>
                </svg>
                Report Issue
              </button>
            </div>
          </div>

          <div className={styles.formContainer}>
            {activeTab === 'feedback' && (
              <div className={styles.formCard}>
                <div className={styles.cardHeader}>
                  <h2>Submit Feedback</h2>
                  <p>Help us improve by sharing your thoughts and suggestions</p>
                </div>
                
                <form onSubmit={handleFeedbackSubmit} className={styles.form}>
                  <div className={styles.formRow}>
                    <div className={styles.formGroup}>
                      <label htmlFor="feedbackType">Feedback Type</label>
                      <select
                        id="feedbackType"
                        name="type"
                        value={feedbackForm.type}
                        onChange={handleFeedbackChange}
                        required
                      >
                        <option value="general">General Feedback</option>
                        <option value="suggestion">Suggestion</option>
                        <option value="compliment">Compliment</option>
                        <option value="complaint">Complaint</option>
                      </select>
                    </div>
                    
                    <div className={styles.formGroup}>
                      <label htmlFor="category">Category</label>
                      <select
                        id="category"
                        name="category"
                        value={feedbackForm.category}
                        onChange={handleFeedbackChange}
                        required
                      >
                        <option value="academic">Academic</option>
                        <option value="facilities">Facilities</option>
                        <option value="hostel">Hostel</option>
                        <option value="library">Library</option>
                        <option value="cafeteria">Cafeteria</option>
                        <option value="sports">Sports</option>
                        <option value="transport">Transport</option>
                        <option value="administration">Administration</option>
                      </select>
                    </div>
                  </div>

                  <div className={styles.formGroup}>
                    <label htmlFor="subject">Subject</label>
                    <input
                      type="text"
                      id="subject"
                      name="subject"
                      value={feedbackForm.subject}
                      onChange={handleFeedbackChange}
                      placeholder="Brief description of your feedback"
                      required
                    />
                  </div>

                  <div className={styles.formGroup}>
                    <label htmlFor="description">Description</label>
                    <textarea
                      id="description"
                      name="description"
                      value={feedbackForm.description}
                      onChange={handleFeedbackChange}
                      placeholder="Provide detailed feedback..."
                      rows="4"
                      required
                    ></textarea>
                  </div>

                  <div className={styles.formRow}>
                    <div className={styles.formGroup}>
                      <label htmlFor="priority">Priority</label>
                      <select
                        id="priority"
                        name="priority"
                        value={feedbackForm.priority}
                        onChange={handleFeedbackChange}
                        required
                      >
                        <option value="low">Low</option>
                        <option value="medium">Medium</option>
                        <option value="high">High</option>
                      </select>
                    </div>
                    <div className={styles.formGroup}>
                      <div className={styles.submitSection}>
                        <button type="submit" className={styles.submitBtn}>
                          Submit Feedback
                        </button>
                      </div>
                    </div>
                  </div>
                </form>
              </div>
            )}

            {activeTab === 'report' && (
              <div className={styles.formCard}>
                <div className={styles.cardHeader}>
                  <h2>Report an Issue</h2>
                  <p>Report problems, incidents, or safety concerns</p>
                </div>
                
                <form onSubmit={handleReportSubmit} className={styles.form}>
                  <div className={styles.formRow}>
                    <div className={styles.formGroup}>
                      <label htmlFor="reportType">Report Type</label>
                      <select
                        id="reportType"
                        name="type"
                        value={reportForm.type}
                        onChange={handleReportChange}
                        required
                      >
                        <option value="issue">General Issue</option>
                        <option value="safety">Safety Concern</option>
                        <option value="maintenance">Maintenance Request</option>
                        <option value="harassment">Harassment</option>
                        <option value="discrimination">Discrimination</option>
                        <option value="emergency">Emergency</option>
                      </select>
                    </div>
                    
                    <div className={styles.formGroup}>
                      <label htmlFor="urgency">Urgency Level</label>
                      <select
                        id="urgency"
                        name="urgency"
                        value={reportForm.urgency}
                        onChange={handleReportChange}
                        required
                      >
                        <option value="low">Low</option>
                        <option value="medium">Medium</option>
                        <option value="high">High</option>
                        <option value="critical">Critical</option>
                      </select>
                    </div>
                  </div>

                  <div className={styles.formRow}>
                    <div className={styles.formGroup}>
                      <label htmlFor="title">Title</label>
                      <input
                        type="text"
                        id="title"
                        name="title"
                        value={reportForm.title}
                        onChange={handleReportChange}
                        placeholder="Brief title of the issue"
                        required
                      />
                    </div>

                    <div className={styles.formGroup}>
                      <label htmlFor="location">Location</label>
                      <input
                        type="text"
                        id="location"
                        name="location"
                        value={reportForm.location}
                        onChange={handleReportChange}
                        placeholder="Building, Room, Area"
                      />
                    </div>
                  </div>

                  <div className={styles.formGroup}>
                    <label htmlFor="reportDescription">Description</label>
                    <textarea
                      id="reportDescription"
                      name="description"
                      value={reportForm.description}
                      onChange={handleReportChange}
                      placeholder="Detailed description of the issue..."
                      rows="4"
                      required
                    ></textarea>
                  </div>

                  <div className={styles.formRow}>
                    <div className={styles.formGroup}>
                      <div className={styles.checkboxGroup}>
                        <label className={styles.checkbox}>
                          <input
                            type="checkbox"
                            name="anonymous"
                            checked={reportForm.anonymous}
                            onChange={handleReportChange}
                          />
                          <span className={styles.checkmark}></span>
                          Submit anonymously
                        </label>
                      </div>
                    </div>
                    <div className={styles.formGroup}>
                      <div className={styles.submitSection}>
                        <button type="submit" className={styles.submitBtn}>
                          Submit Report
                        </button>
                      </div>
                    </div>
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

export default StudentFeedback;
