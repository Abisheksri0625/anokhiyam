import React from 'react';
import styles from './HeroSection.module.css';

const HeroSection = () => {
  return (
    <section className={styles.hero}>
      <div className={styles.container}>
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
  );
};

export default HeroSection;
