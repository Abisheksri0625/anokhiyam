import React from 'react';
import Header from './components/Header/Header';
import HeroSection from './components/HeroSection/HeroSection';
import FeaturesGrid from './components/FeaturesGrid/FeaturesGrid';
import AboutSection from './components/AboutSection/AboutSection';
import StatsSection from './components/StatsSection/StatsSection';
import './index.css';

function App() {
  return (
    <div className="app">
      <Header />
      <HeroSection />
      <FeaturesGrid />
      <AboutSection />
      <StatsSection />
    </div>
  );
}

export default App;
