import React from 'react';
import styles from './LandingPage.module.css';

const LandingPage = () => {
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

                <div className={styles.statsCard}>
                  <div className={styles.bigNumber}>3847</div>
                  <div className={styles.unit}>x 1280px</div>
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

      {/* ===== NEW FOOTER SECTION ===== */}
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
            <div className={styles.languageSelector}>
              <select className={styles.languageSelect}>
                <option value="en">English</option>
                <option value="hi">हिंदी</option>
                <option value="raj">राजस्थानी</option>
              </select>
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
              
              <a href="#" className={styles.socialLink} aria-label="Facebook">
                <svg viewBox="0 0 24 24" fill="currentColor">
                  <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/>
                </svg>
              </a>
              
              <a href="#" className={styles.socialLink} aria-label="Dribbble">
                <svg viewBox="0 0 24 24" fill="currentColor">
                  <path d="M12 0C5.374 0 0 5.373 0 12s5.374 12 12 12 12-5.373 12-12S18.626 0 12 0zm9.568 7.375c.77 1.423 1.208 3.054 1.208 4.781 0 .203-.006.405-.017.606-.187-.04-2.051-.412-3.931-.195-.04-.097-.08-.195-.123-.295-.133-.309-.275-.608-.423-.899 2.07-.84 2.989-2.065 3.286-2.998zM12 22.785c-1.274 0-2.5-.219-3.639-.618.133-.211 1.592-2.684 4.319-3.684.948 2.463 1.336 4.515 1.424 5.093-.688.143-1.39.209-2.104.209zm-3.967-1.448c-.265.402-.548.792-.846 1.168-.297-.119-1.163-.497-1.893-1.028-.73-.53-1.347-1.156-1.844-1.857.518-.193 2.317-.82 4.583-.283zm-5.09-3.066c.729.463 1.544.845 2.408 1.125.864.278 1.776.473 2.718.571-.096.2-.195.4-.297.599-1.185-.375-2.268-.946-3.197-1.687-.928-.741-1.685-1.633-2.223-2.634.197-.098.394-.184.591-.274zm-.411-2.748c.543.77 1.223 1.44 2.008 1.973.786.533 1.666.934 2.601 1.181-.097.397-.196.793-.297 1.186-2.032-.285-3.888-1.195-5.336-2.58.341-.254.681-.502 1.024-.76zM2.215 12c0-1.274.219-2.5.618-3.639.211-.133 2.684-1.592 3.684-4.319-2.463-.948-4.515-1.336-5.093-1.424-.143.688-.209 1.39-.209 2.104zm1.448 3.967c-.402.265-.792.548-1.168.846.119.297.497 1.163 1.028 1.893.53.73 1.156 1.347 1.857 1.844.193-.518.82-2.317.283-4.583zm3.066 5.09c-.463-.729-.845-1.544-1.125-2.408-.278-.864-.473-1.776-.571-2.718.2.096.4.195.599.297.375 1.185.946 2.268 1.687 3.197.741.928 1.633 1.685 2.634 2.223.098-.197.184-.394.274-.591zm2.748.411c-.77-.543-1.44-1.223-1.973-2.008-.533-.786-.934-1.666-1.181-2.601.397.097.793.196 1.186.297.285 2.032 1.195 3.888 2.58 5.336.254-.341.502-.681.76-1.024z"/>
                </svg>
              </a>
            </div>
            
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