import { useState, useEffect } from 'react';
import { getUniversityConfig } from '../services/firestoreService';

export const useFeatures = () => {
  const [config, setConfig] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    let isCancelled = false;

    const loadConfig = async () => {
      try {
        setLoading(true);
        const universityConfig = await getUniversityConfig('demo_university');
        
        if (!isCancelled) {
          setConfig(universityConfig);
          setError(null);
        }
      } catch (err) {
        console.error('Error loading university config:', err);
        if (!isCancelled) {
          setError(err);
          // Provide fallback config
          setConfig({
            branding: {
              logoUrl: '',
              primaryColor: '#10b981',
              secondaryColor: '#059669',
              welcomeMessage: 'Welcome to Portal'
            },
            institutionCode: 'ANOKHIYAM2024',
            name: 'Educational Institution',
            enabled_features: {},
            enabled_roles: []
          });
        }
      } finally {
        if (!isCancelled) {
          setLoading(false);
        }
      }
    };

    loadConfig();

    return () => {
      isCancelled = true;
    };
  }, []); // Run once on mount

  const getBranding = (institutionCode = 'ANOKHIYAM2024') => {
    if (!config) {
      return {
        logoUrl: '',
        primaryColor: '#10b981',
        secondaryColor: '#059669',
        welcomeMessage: 'Welcome to Portal'
      };
    }
    
    return config.branding || {
      logoUrl: '',
      primaryColor: '#10b981', 
      secondaryColor: '#059669',
      welcomeMessage: config.welcomeMessage || 'Welcome to Portal'
    };
  };

  const getEnabledFeatures = (role) => {
    if (!config || !config.enabled_features) return [];
    return config.enabled_features[`${role}_dashboard`] || [];
  };

  const getEnabledRoles = () => {
    if (!config) return [];
    return config.enabled_roles || [];
  };

  return {
    config,
    loading,
    error,
    getBranding,
    getEnabledFeatures,
    getEnabledRoles
  };
};
