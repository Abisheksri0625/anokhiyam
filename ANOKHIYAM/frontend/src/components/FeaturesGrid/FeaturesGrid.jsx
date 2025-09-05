import React from 'react';
import styles from './FeaturesGrid.module.css';

const FeaturesGrid = () => {
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
    <section className={styles.features}>
      <div className={styles.container}>
        <div className={styles.header}>
          <h2 className={styles.title}>
            Everything you need to<br />
            transform <span className={styles.gradientText}>student success</span>
          </h2>
          <p className={styles.subtitle}>
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
  );
};

export default FeaturesGrid;
