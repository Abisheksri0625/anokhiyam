import React from 'react';
import './index.css';

function App() {
  return (
    <div className="app">
      <header className="header">
        <h1>🎓 ANOKHIYAM</h1>
        <p>ERP Student Management System</p>
      </header>
      <main className="main">
        <div className="container">
          <h2>Welcome to ANOKHIYAM</h2>
          <p>Smart India Hackathon 2025 - Government of Rajasthan DTE</p>
          <div className="status-cards">
            <div className="card">
              <h3>Frontend Status</h3>
              <p>✅ React + Vite Running</p>
            </div>
            <div className="card">
              <h3>Backend Status</h3>
              <p>✅ Node.js + Express Running</p>
            </div>
            <div className="card">
              <h3>Repository Status</h3>
              <p>✅ GitHub Connected</p>
            </div>
          </div>
        </div>
      </main>
      <footer className="footer">
        <p>&copy; 2025 ANOKHIYAM - Smart India Hackathon</p>
      </footer>
    </div>
  );
}

export default App;
