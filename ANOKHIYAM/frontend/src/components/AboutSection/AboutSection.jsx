import React from 'react';
import styles from './AboutSection.module.css';

const AboutSection = () => {
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

  return (
    <section className={styles.about}>
      <div className={styles.container}>
        <div className={styles.header}>
          <h2 className={styles.title}>
            Transforming Education<br />
            Through <span className={styles.gradientText}>Early Intervention</span>
          </h2>
          <p className={styles.subtitle}>
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
  );
};

export default AboutSection;
