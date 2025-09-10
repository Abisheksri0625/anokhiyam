import React, { useState, useEffect } from 'react';
import StudentSidebar from '../../../components/StudentSidebar/StudentSidebar';
import StudentHeader from '../../../components/StudentHeader/StudentHeader';
import styles from './StudentLibrary.module.css';

const mockBooks = [
  { title: 'Data Structures', author: 'Mark Weiss', year: 2012, available: true },
  { title: 'Operating Systems', author: 'Silberschatz', year: 2018, available: false },
  { title: 'Computer Networks', author: 'Andrew Tanenbaum', year: 2011, available: true },
  { title: 'Artificial Intelligence', author: 'Stuart Russell', year: 2020, available: true },
  { title: 'Compiler Design', author: 'Aho', year: 2006, available: false }
  
];

const recommendedBooks = [
  { title: 'Machine Learning', author: 'Tom Mitchell', year: 1997 },
  { title: 'Database Systems', author: 'Elmasri', year: 2013 },
  { title: 'Compiler Design', author: 'Aho', year: 2006 }
];

const StudentLibrary = () => {
  const [isCollapsed, setIsCollapsed] = useState(() => localStorage.getItem('studentSidebarCollapsed') === 'true');
  const [searchQuery, setSearchQuery] = useState('');
  const [filteredBooks, setFilteredBooks] = useState([]);
  const [requestedBook, setRequestedBook] = useState(null);
  const [borrowedBooks, setBorrowedBooks] = useState([
    'Discrete Mathematics',
    'Introduction to Algorithms',
    'Software Engineering'
  ]);
  const [dueDates, setDueDates] = useState({
    'Discrete Mathematics': '2025-09-15',
    'Introduction to Algorithms': '2025-09-20',
    'Software Engineering': '2025-09-25'
  });
  const [requestAccepted, setRequestAccepted] = useState(false);
  const [feedbackMessage, setFeedbackMessage] = useState('');

  useEffect(() => {
    localStorage.setItem('studentSidebarCollapsed', isCollapsed);
  }, [isCollapsed]);

  const handleSearchSubmit = (e) => {
    e.preventDefault();
    const results = mockBooks.filter(book =>
      book.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      book.author.toLowerCase().includes(searchQuery.toLowerCase())
    ).slice(0, 3);
    setFilteredBooks(results);
  };

  const handleRequest = (book) => {
    setRequestedBook(book.title);
    setRequestAccepted(book.available);
  };

  const handleFeedbackSend = () => {
    if (feedbackMessage.trim()) {
      alert(`Feedback submitted: ${feedbackMessage}`);
      setFeedbackMessage('');
    }
  };

  const isNearDeadline = (dateStr) => {
    const today = new Date();
    const dueDate = new Date(dateStr);
    const diffDays = (dueDate - today) / (1000 * 60 * 60 * 24);
    return diffDays <= 5;
  };

  return (
    <div className={styles.pageContainer}>
      <StudentSidebar activeItem="library" isCollapsed={isCollapsed} setIsCollapsed={setIsCollapsed} />
      <div className={`${styles.mainContent} ${isCollapsed ? styles.collapsed : ''}`}>
        <StudentHeader isCollapsed={isCollapsed} onMenuToggle={() => setIsCollapsed(!isCollapsed)} />
        <div className={styles.content}>
          <h1 style={{ color: '#059669', marginBottom: '1.5rem' }}>Library Portal</h1>

          <div style={{ display: 'flex', gap: '2rem', flexWrap: 'wrap' }}>
            {/* LEFT HALF */}
            <div style={{ flex: 1, minWidth: '300px' }}>
              {/* Search Bar */}
              <form onSubmit={handleSearchSubmit} style={{ marginBottom: '2rem' }}>
                <input
                  type="text"
                  placeholder="Enter book title or author..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  style={{
                    padding: '0.75rem 1rem',
                    borderRadius: '8px',
                    border: '1px solid #ccc',
                    width: '100%',
                    fontSize: '1rem',
                    background: '#f0fdf4'
                  }}
                />
              </form>

              {/* Search Results */}
              {filteredBooks.length > 0 && (
                <div>
                  <h2 style={{ marginBottom: '1rem' }}>Search Results</h2>
                  <ul style={{ listStyle: 'none', padding: 0 }}>
                    {filteredBooks.map((book, index) => (
                      <li key={index} style={{
                        marginBottom: '1rem',
                        padding: '1rem',
                        background: '#fff',
                        borderRadius: '8px',
                        boxShadow: '0 2px 6px rgba(0,0,0,0.05)',
                        borderLeft: `4px solid ${book.available ? '#10b981' : '#ef4444'}`
                      }}>
                        <strong>{book.title}</strong><br />
                        Author: {book.author}<br />
                        Published Year: {book.year}<br />
                        Status: {book.available ? 'Available' : 'Not Available'}
                        <br />
                        <button
                          onClick={() => handleRequest(book)}
                          disabled={!book.available}
                          style={{
                            marginTop: '0.5rem',
                            padding: '0.5rem 1rem',
                            background: book.available ? '#10b981' : '#ccc',
                            color: '#fff',
                            border: 'none',
                            borderRadius: '6px',
                            cursor: book.available ? 'pointer' : 'not-allowed'
                          }}
                        >
                          Request Book
                        </button>
                      </li>
                    ))}
                  </ul>
                </div>
              )}

              {/* Recommended Books */}
              <div style={{
                marginTop: '2rem',
                background: '#ffffff',
                padding: '1.5rem',
                borderRadius: '12px',
                boxShadow: '0 4px 12px rgba(0,0,0,0.05)',
                borderLeft: '4px solid #10b981'
              }}>
                <h2>📖 Recommended Books</h2>
                <ul style={{ listStyle: 'none', padding: 0 }}>
                  {recommendedBooks.map((book, index) => (
                    <li key={index} style={{
                      marginBottom: '1rem',
                      padding: '1rem',
                      background: '#f9fafb',
                      borderRadius: '8px',
                      borderLeft: '4px solid #10b981'
                    }}>
                      <strong>{book.title}</strong><br />
                      Author: {book.author}<br />
                      Published Year: {book.year}
                    </li>
                  ))}
                </ul>
              </div>
            </div>

            {/* RIGHT HALF */}
            <div style={{
              flex: 1,
              minWidth: '300px',
              background: '#ffffff',
              padding: '1.5rem',
              borderRadius: '12px',
              boxShadow: '0 4px 12px rgba(0,0,0,0.05)',
              borderLeft: '4px solid #059669'
            }}>
              <h2>📦 Tracking</h2>
              <p><strong>Requested Book:</strong> {requestedBook || 'None'}</p>
              <p><strong>Request Accepted:</strong> {requestedBook ? (requestAccepted ? 'Yes' : 'No') : 'N/A'}</p>
              <p><strong>Borrowed Books:</strong></p>
              <ul>
                {borrowedBooks.map((book, index) => (
                  <li key={index}>{book}</li>
                ))}
              </ul>
              <p><strong>Due Dates:</strong></p>
              <ul>
                {Object.entries(dueDates).map(([book, date]) => (
                  <li key={book}>
                    <span style={{ color: isNearDeadline(date) ? '#ef4444' : '#111827' }}>{book}</span>: {date}
                  </li>
                ))}
              </ul>

              {/* Feedback Section */}
              <div style={{ marginTop: '2rem' }}>
                <h3>📬 Feedback</h3>
                <textarea
                  value={feedbackMessage}
                  onChange={(e) => setFeedbackMessage(e.target.value)}
                  placeholder="Describe your issue or suggestion..."
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
                  onClick={handleFeedbackSend}
                  style={{
                    padding: '0.5rem 1rem',
                    background: '#059669',
                    color: '#fff',
                    border: 'none',
                    borderRadius: '6px',
                    cursor: 'pointer'
                  }}
                >
                  Send Feedback
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default StudentLibrary;


