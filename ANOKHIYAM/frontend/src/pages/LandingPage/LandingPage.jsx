import React from 'react';
import { Link } from 'react-router-dom';
import styles from './LandingPage.module.css';

const LandingPage = () => {
  const features = [
    {
      title: 'AI-Powered Risk Prediction',
      description: 'Advanced machine learning algorithms identify at-risk students with 85%+ accuracy before problems become irreversible.',
      gradient: 'linear-gradient(135deg, #8b5cf6 0%, #a78bfa 100%)'
    },
    {
      title: 'Early Intervention System',
      description: 'Proactive support strategies that prevent academic failures rather than responding after they occur.',
      gradient: 'linear-gradient(135deg, #ec4899 0%, #f472b6 100%)'
    },
    {
      title: 'Multi-Stakeholder Platform',
      description: 'Seamless collaboration between teachers, students, counselors, parents, and administrators.',
      gradient: 'linear-gradient(135deg, #06b6d4 0%, #0891b2 100%)'
    },
    {
      title: 'Communication Hub',
      description: 'Centralized messaging system with real-time notifications and multi-language support.',
      gradient: 'linear-gradient(135deg, #10b981 0%, #34d399 100%)'
    }
  ];

  const processes = [
    {
      number: '01',
      title: 'Prevent Academic Failures',
      description: 'Identify at-risk students weeks or months before traditional methods detect problems',
      stat: '15% reduction in dropout rates',
      color: '#8b5cf6'
    },
    {
      number: '02',
      title: 'Enhance Communication',
      description: 'Bridge gaps between teachers, students, counselors, parents, and administrators',
      stat: '80% improvement in stakeholder collaboration',
      color: '#ec4899'
    },
    {
      number: '03',
      title: 'Enable Proactive Support',
      description: 'Shift from reactive crisis management to preventive intervention strategies',
      stat: '50% reduction in late-stage failures',
      color: '#06b6d4'
    },
    {
      number: '04',
      title: 'Improve Career Outcomes',
      description: 'Provide personalized career guidance based on individual strengths and market trends',
      stat: '70% increase in career clarity',
      color: '#10b981'
    }
  ];

  const stats = [
    {
      percentage: '85%+',
      label: 'Prediction Accuracy',
      color: '#8b5cf6'
    },
    {
      percentage: '15%',
      label: 'Dropout Reduction',
      color: '#ec4899'
    },
    {
      percentage: '50%',
      label: 'Failure Prevention',
      color: '#06b6d4'
    },
    {
      percentage: '80%',
      label: 'Better Communication',
      color: '#10b981'
    }
  ];

  const getIcon = (index) => {
    const icons = [
      <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M12 2L13.09 8.26L20 9L13.09 9.74L12 16L10.91 9.74L4 9L10.91 8.26L12 2Z" stroke="currentColor" strokeWidth="2"/>
      </svg>,
      <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
        <circle cx="12" cy="12" r="3" stroke="currentColor" strokeWidth="2"/>
        <path d="M12 1v6m0 6v6m11-7h-6m-6 0H1" stroke="currentColor" strokeWidth="2"/>
      </svg>,
      <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2" stroke="currentColor" strokeWidth="2"/>
        <circle cx="9" cy="7" r="4" stroke="currentColor" strokeWidth="2"/>
        <path d="M23 21v-2a4 4 0 0 0-3-3.87m-4-12a4 4 0 0 1 0 7.75" stroke="currentColor" strokeWidth="2"/>
      </svg>,
      <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z" stroke="currentColor" strokeWidth="2"/>
      </svg>
    ];
    return icons[index];
  };

  return (
    <div className={styles.landingPage}>
      {/* ===== HEADER SECTION (INLINED FROM Header.jsx) ===== */}
      <header className={styles.header}>
        <div className={styles.container}>
          <div className={styles.logo}>
            <span className={styles.logoText}>ANOKHIYAM</span>
          </div>

          <nav className={styles.navigation}>
            <a href="#overview" className={styles.navLink}>Overview</a>
            <a href="#features" className={styles.navLink}>Features</a>
            <a href="#about" className={styles.navLink}>About</a>
          </nav>

          <div className={styles.authSection}>
            <button className={styles.checkResultsBtn}>Check Results</button>
            <Link to="/login" className={styles.loginBtn}>Log In</Link>
          </div>
        </div>
      </header>

      {/* ===== HERO SECTION (INLINED FROM HeroSection.jsx) ===== */}
      <section className={styles.hero}>
        <div className={styles.heroContainer}>
          <div className={styles.content}>
            <div className={styles.textContent}>
              <h1 className={styles.headline}>
                Early<br />
                Intervention will<br />
                take your<br />
                students<br />
                places <span className={styles.gradientText}>Academic<br />Success can't</span>
              </h1>
              
              <p className={styles.description}>
                ANOKHIYAM provides AI-powered early intervention systems that 
                identify at-risk students before problems become irreversible. 
                Transform your institution with predictive analytics, comprehensive 
                student support, and data-driven decision making.
              </p>

              <div className={styles.buttons}>
                <button className={styles.primaryBtn}>Schedule a Demo</button>
                <button className={styles.secondaryBtn}>Learn More</button>
              </div>
            </div>

            <div className={styles.dashboardPreview}>
              <div className={styles.accuracyCard}>
                <div className={styles.chartIcon}>
                  <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M7 14L12 9L17 14" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                  </svg>
                </div>
                <div className={styles.cardContent}>
                  <div className={styles.percentage}>85% Accuracy</div>
                  <div className={styles.cardLabel}>Risk Prediction</div>
                </div>
              </div>

              <div className={styles.dashboardCard}>
                <div className={styles.cardHeader}>
                  <div className={styles.userIcon}>
                    <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                      <path d="M16 7C16 9.20914 14.2091 11 12 11C9.79086 11 8 9.20914 8 7C8 4.79086 9.79086 3 12 3C14.2091 3 16 4.79086 16 7Z" stroke="currentColor" strokeWidth="2"/>
                      <path d="M12 14C8.13401 14 5 17.134 5 21H19C19 17.134 15.866 14 12 14Z" stroke="currentColor" strokeWidth="2"/>
                    </svg>
                  </div>
                  <span>Students Dashboard</span>
                </div>
                <div className={styles.progressBars}>
                  <div className={styles.progressBar} style={{background: 'linear-gradient(90deg, #8b5cf6 0%, #ec4899 100%)', width: '85%'}}></div>
                  <div className={styles.progressBar} style={{background: 'linear-gradient(90deg, #ec4899 0%, #06b6d4 100%)', width: '70%'}}></div>
                  <div className={styles.progressBar} style={{background: 'linear-gradient(90deg, #06b6d4 0%, #10b981 100%)', width: '60%'}}></div>
                </div>
              </div>

              <div className={styles.statsCard}>
                <div className={styles.bigNumber}>2532</div>
                <div className={styles.unit}>x 1170px</div>
                <div className={styles.statsLabel}>Active Students</div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ===== FEATURES GRID SECTION (INLINED FROM FeaturesGrid.jsx) ===== */}
      <section className={styles.features}>
        <div className={styles.featuresContainer}>
          <div className={styles.featuresHeader}>
            <h2 className={styles.featuresTitle}>
              Everything you need to<br />
              transform <span className={styles.featuresGradientText}>student success</span>
            </h2>
            <p className={styles.featuresSubtitle}>
              Our platform combines cutting-edge AI technology with educational expertise to create 
              a comprehensive ecosystem for student support and academic excellence.
            </p>
          </div>

          <div className={styles.grid}>
            {features.map((feature, index) => (
              <div key={index} className={styles.featureCard}>
                <div className={styles.iconContainer} style={{background: feature.gradient}}>
                  <span className={styles.icon}>{getIcon(index)}</span>
                </div>
                <h3 className={styles.featureTitle}>{feature.title}</h3>
                <p className={styles.featureDescription}>{feature.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ===== ABOUT SECTION (INLINED FROM AboutSection.jsx) ===== */}
      <section className={styles.about}>
        <div className={styles.aboutContainer}>
          <div className={styles.aboutHeader}>
            <h2 className={styles.aboutTitle}>
              Transforming Education<br />
              Through <span className={styles.aboutGradientText}>Early Intervention</span>
            </h2>
            <p className={styles.aboutSubtitle}>
              ANOKHIYAM is designed specifically for Government of Rajasthan's Directorate of Technical Education, 
              providing a comprehensive ERP solution that unifies student management, academic tracking, 
              and institutional operations into one intelligent platform.
            </p>
          </div>

          <div className={styles.processGrid}>
            {processes.map((process, index) => (
              <div key={index} className={styles.processCard}>
                <div className={styles.processNumber} style={{color: process.color}}>
                  {process.number}
                </div>
                
                <h3 className={styles.processTitle}>{process.title}</h3>
                
                <p className={styles.processDescription}>{process.description}</p>
                
                <div className={styles.processStat}>
                  <div className={styles.checkIcon} style={{backgroundColor: process.color}}>
                    <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                      <path d="M20 6L9 17L4 12" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                    </svg>
                  </div>
                  <span className={styles.statText}>{process.stat}</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ===== STATS SECTION (INLINED FROM StatsSection.jsx) ===== */}
      <section className={styles.stats}>
        <div className={styles.statsContainer}>
          <h2 className={styles.statsTitle}>Measurable Impact</h2>
          
          <div className={styles.statsGrid}>
            {stats.map((stat, index) => (
              <div key={index} className={styles.statCard}>
                <div className={styles.statNumber} style={{color: stat.color}}>
                  {stat.percentage}
                </div>
                <div className={styles.statLabel}>
                  {stat.label}
                </div>
              </div>
            ))}
          </div>

          <div className={styles.ctaSection}>
            <h3 className={styles.ctaTitle}>Ready to transform your institution?</h3>
            <p className={styles.ctaDescription}>
              Join educational institutions worldwide using ANOKHIYAM to prevent 
              academic failures and ensure every student reaches their full potential.
            </p>
            <div className={styles.ctaButtons}>
              <button className={styles.primaryCta}>Get Started Today</button>
              <button className={styles.secondaryCta}>Schedule Demo</button>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default LandingPage;
