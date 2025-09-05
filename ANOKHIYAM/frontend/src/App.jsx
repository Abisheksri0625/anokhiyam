import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Header from './components/Header/Header';
import HeroSection from './components/HeroSection/HeroSection';
import FeaturesGrid from './components/FeaturesGrid/FeaturesGrid';
import AboutSection from './components/AboutSection/AboutSection';
import StatsSection from './components/StatsSection/StatsSection';
import Login from './pages/Login/Login';
import StudentDashboard from './pages/StudentDashboard/StudentDashboard';
import './index.css';

// Landing Page Component
const LandingPage = () => (
  <>
    <Header />
    <HeroSection />
    <FeaturesGrid />
    <AboutSection />
    <StatsSection />
  </>
);

function App() {
  return (
    <Router>
      <div className="app">
        <Routes>
          <Route path="/" element={<LandingPage />} />
          <Route path="/login" element={<Login />} />
          <Route path="/student-dashboard" element={<StudentDashboard />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
