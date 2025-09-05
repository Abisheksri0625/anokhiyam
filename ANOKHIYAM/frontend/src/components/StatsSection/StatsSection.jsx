import React from 'react';
import styles from './StatsSection.module.css';

const StatsSection = () => {
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

  return (
    <section className={styles.stats}>
      <div className={styles.container}>
        <h2 className={styles.title}>Measurable Impact</h2>
        
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
  );
};

export default StatsSection;
