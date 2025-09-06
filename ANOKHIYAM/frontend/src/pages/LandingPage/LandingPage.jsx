import React from 'react';
import styles from './LandingPage.module.css';

const LandingPage = () => {
  // CHANGE 3: Added 2 more cards to features array
  const features = [
    {
      title: 'AI-Powered Analysis',
      description: 'Dynamic student growthmonitoring with AI powered predictive analysis.',
      gradient: 'linear-gradient(135deg, #8b5cf6 0%, #a78bfa 100%)'
    },
    {
      title: 'Ease of Use',
      description: 'Digitized platform for efficinecy in attendance, admissions, libaray and hostel management.',
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
    },
    {
      title: 'Resource Management',
      description: 'Comprehensive library and hostel management with automated inventory tracking and allocation.',
      gradient: 'linear-gradient(135deg, #f59e0b 0%, #f97316 100%)'
    },
    {
      title: 'Analytics Dashboard',
      description: 'Advanced reporting and analytics for institutional performance monitoring and decision-making.',
      gradient: 'linear-gradient(135deg, #8b5cf6 0%, #ec4899 100%)'
    }
  ];

  const processes = [
    {
      number: '01',
      title: 'Streamline Admissions',
      description: 'Digitize and automate student enrollment, document submission, and eligibility verification processes.',
      stat: '40% faster admission processing',
      color: '#8b5cf6'
    },
    {
      number: '02',
      title: 'Centralized Communication',
      description: 'Integrate announcements, alerts, and feedback across students, faculty, and parents in real-time.',
      stat: '85% improvement in communication flow',
      color: '#ec4899'
    },
    {
      number: '03',
      title: 'Smart Academic Monitoring',
      description: 'Track attendance, grades, and performance trends using AI to identify students needing support.',
      stat: '60% boost in early intervention',
      color: '#06b6d4'
    },
    {
      number: '04',
      title: 'Career and Counseling Support',
      description: 'Provide students with tailored guidance and resources for academic success and career readiness.',
      stat: '75% increase in student satisfaction',
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
      percentage: '24/7',
      label: 'Access',
      color: '#ec4899'
    },
    {
      percentage: '60%',
      label: 'Reduction of Manual Work',
      color: '#06b6d4'
    },
    {
      percentage: '80%',
      label: 'Cost Reduction',
      color: '#10b981'
    }
  ];

  // CHANGE 3: Updated getIcon function to handle 6 icons
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
      </svg>,
      <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M3 7V5C3 3.89543 3.89543 3 5 3H9L11 5H19C20.1046 5 21 5.89543 21 7V19C21 20.1046 20.1046 21 19 21H5C3.89543 21 3 20.1046 3 19V7Z" stroke="currentColor" strokeWidth="2"/>
        <path d="M9 12L11 14L15 10" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
      </svg>,
      <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M3 3V21L12 17L21 21V3H3Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
        <path d="M9 9L15 9" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
        <path d="M9 13L15 13" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
      </svg>
    ];
    return icons[index];
  };

  const scrollToSection = (sectionId) => {
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ 
        behavior: 'smooth',
        block: 'start'
      });
    }
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
            <button onClick={() => scrollToSection('overview')} className={styles.navLink}>Overview</button>
            <button onClick={() => scrollToSection('features')} className={styles.navLink}>Features</button>
            <button onClick={() => scrollToSection('impact')} className={styles.navLink}>Impact</button>
            <button onClick={() => scrollToSection('about')} className={styles.navLink}>About</button>
          </nav>

          <div className={styles.authSection}>
            <button className={styles.checkResultsBtn}>Check Results</button>
            <a href="/login" className={styles.loginBtn}>Log In</a>
          </div>
        </div>
      </header>

      {/* ===== HERO SECTION (INLINED FROM HeroSection.jsx) ===== */}
      <section className={styles.hero}>
        <div className={styles.heroContainer}>
          <div className={styles.content}>
            <div className={styles.textContent}>
              <h1 className={styles.headline}>
                One<br />
                stop solution<br />
                to cater to<br />
                your institution's <br />
                <span className={styles.gradientText}>Student<br />Management needs.</span>
              </h1>
              
              <p className={styles.description}>
                ANOKHIYAM streamlines core academic and administrative processes within
                an institute that connects students, teachers, and administrators under a
                single unified system, reducing manual work and improving efficiency.
              </p>

              <div className={styles.buttons}>
                <button className={styles.primaryBtn}>Schedule a Demo</button>
                <button className={styles.secondaryBtn}>Learn More</button>
              </div>
            </div>

            <div className={styles.dashboardPreview}>
              <div className={styles.floatingBoxContainer}>
                <div className={styles.accuracyCard}>
                  <div className={styles.chartIcon}>
                    <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                      <path d="M7 14L12 9L17 14" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                    </svg>
                  </div>
                  <div className={styles.cardContent}>
                    <div className={styles.percentage}>92% Accuracy</div>
                    <div className={styles.cardLabel}>Student Performance Prediction</div>
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
                    <span>Academic Dashboard</span>
                  </div>
                  <div className={styles.progressBars}>
                    <div className={styles.progressBar} style={{background: 'linear-gradient(90deg, #8b5cf6 0%, #ec4899 100%)', width: '92%'}}></div>
                    <div className={styles.progressBar} style={{background: 'linear-gradient(90deg, #ec4899 0%, #06b6d4 100%)', width: '78%'}}></div>
                    <div className={styles.progressBar} style={{background: 'linear-gradient(90deg, #06b6d4 0%, #10b981 100%)', width: '65%'}}></div>
                  </div>
                </div>

                {/* CHANGE 6: Removed "x 1280px" from statsCard */}
                <div className={styles.statsCard}>
                  <div className={styles.bigNumber}>3847</div>
                  <div className={styles.statsLabel}>Enrolled Students</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ===== FEATURES GRID SECTION (INLINED FROM FeaturesGrid.jsx) ===== */}
      <section id="overview" className={styles.features}>
        <div className={styles.featuresContainer}>
          <div className={styles.featuresHeader}>
            <h2 className={styles.featuresTitle}>
              Everything you need to<br />
              transform <span className={styles.featuresGradientText}>Institutional Management</span>
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
      <section id="features" className={styles.about}>
        <div className={styles.aboutContainer}>
          <div className={styles.aboutHeader}>
            <h2 className={styles.aboutTitle}>
              Transforming Education<br />
              Through <span className={styles.aboutGradientText}>Curated Management</span>
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
      <section id="impact" className={styles.stats}>
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
              Join educational institutions worldwide using ANOKHIYAM to have a seamless managing experience and ensure every institution reaches their full potential.
            </p>
            <div className={styles.ctaButtons}>
              <button className={styles.primaryCta}>Get Started Today</button>
              <button className={styles.secondaryCta}>Schedule Demo</button>
            </div>
          </div>
        </div>
      </section>

      {/* ===== FOOTER SECTION ===== */}
      <section id="about" className={styles.footer}>
        <div className={styles.footerContainer}>
          <div className={styles.footerBrand}>
            <span className={styles.footerLogo}>ANOKHIYAM</span>
          </div>
          
          <div className={styles.footerLinks}>
            <a href="#" className={styles.footerLink}>Terms of Service</a>
            <a href="#" className={styles.footerLink}>Privacy Policy</a>
            <a href="#" className={styles.footerLink}>Security</a>
            <a href="#" className={styles.footerLink}>Sitemap</a>
          </div>
          
          <div className={styles.footerBottom}>
            {/* Contact information moved to far left */}
            <div className={styles.contactInfo}>
              <div className={styles.contactItem}>Email: info@anokhiyam.edu.in</div>
              <div className={styles.contactItem}>Contact: +91-141-2234567</div>
            </div>
            
            <div className={styles.socialLinks}>
              <a href="#" className={styles.socialLink} aria-label="Twitter">
                <svg viewBox="0 0 24 24" fill="currentColor">
                  <path d="M23.953 4.57a10 10 0 01-2.825.775 4.958 4.958 0 002.163-2.723c-.951.555-2.005.959-3.127 1.184a4.92 4.92 0 00-8.384 4.482C7.69 8.095 4.067 6.13 1.64 3.162a4.822 4.822 0 00-.666 2.475c0 1.71.87 3.213 2.188 4.096a4.904 4.904 0 01-2.228-.616v.06a4.923 4.923 0 003.946 4.827 4.996 4.996 0 01-2.212.085 4.936 4.936 0 004.604 3.417 9.867 9.867 0 01-6.102 2.105c-.39 0-.779-.023-1.17-.067a13.995 13.995 0 007.557 2.209c9.053 0 13.998-7.496 13.998-13.985 0-.21 0-.42-.015-.63A9.935 9.935 0 0024 4.59z"/>
                </svg>
              </a>
              
              <a href="#" className={styles.socialLink} aria-label="GitHub">
                <svg viewBox="0 0 24 24" fill="currentColor">
                  <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z"/>
                </svg>
              </a>
              
              <a href="#" className={styles.socialLink} aria-label="Instagram">
                <svg viewBox="0 0 24 24" fill="currentColor">
                  <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"/>
                </svg>
              </a>
              
              {/* Replaced Dribbble with Facebook icon */}
              <a href="#" className={styles.socialLink} aria-label="Facebook">
                <svg viewBox="0 0 24 24" fill="currentColor">
                  <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/>
                </svg>
              </a>
            </div>
            
            {/* All rights reserved moved to far right */}
            <div className={styles.copyright}>
              &copy; 2024 ANOKHIYAM. All rights reserved.
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default LandingPage;