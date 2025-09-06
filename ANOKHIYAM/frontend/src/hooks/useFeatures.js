import { useState, useEffect } from 'react';
import { getUniversityConfigByCode, getCurrentUniversityId, getUniversityConfig } from '../config/universityConfig';

export const useFeatures = (institutionCode = null) => {
  const [config, setConfig] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Load configuration when institution code is provided or get current university
  const loadConfigByCode = async (code) => {
    if (!code) {
      setConfig(null);
      setLoading(false);
      return;
    }

    try {
      setLoading(true);
      setError(null);
      console.log('🏫 Loading configuration for:', code);
      
      const universityConfig = await getUniversityConfigByCode(code);
      
      if (universityConfig) {
        setConfig(universityConfig);
        console.log('🎛️ Features loaded for university:', universityConfig.name);
      } else {
        setError(`No configuration found for institution code: ${code}`);
        setConfig(null);
      }
    } catch (err) {
      console.error('❌ Error loading university features:', err);
      setError('Error loading university configuration');
      setConfig(null);
    } finally {
      setLoading(false);
    }
  };

  // Load configuration on mount
  useEffect(() => {
    if (institutionCode) {
      // If institution code is provided, use it
      loadConfigByCode(institutionCode);
    } else {
      // Otherwise, try to load from stored university ID
      const currentUniversityId = getCurrentUniversityId();
      if (currentUniversityId) {
        // Load by university ID instead of code
        getUniversityConfig(currentUniversityId)
          .then(config => {
            if (config) {
              setConfig(config);
              console.log('🎛️ Features loaded for university:', config.name);
            } else {
              setError('No university configuration found');
            }
          })
          .catch(err => {
            console.error('❌ Error loading university features:', err);
            setError('Error loading university configuration');
          })
          .finally(() => {
            setLoading(false);
          });
      } else {
        setLoading(false);
      }
    }
  }, [institutionCode]);

  // Check if a specific role is enabled for this university
  const hasRole = (role) => {
    if (!config) return false;
    const hasRoleEnabled = config.enabled_roles?.includes(role) || false;
    console.log(`🔍 Role check: ${role} = ${hasRoleEnabled}`);
    return hasRoleEnabled;
  };

  // Check if a specific feature is enabled for a dashboard
  const hasFeature = (dashboard, feature) => {
    if (!config) return false;
    const hasFeatureEnabled = config.enabled_features?.[dashboard]?.includes(feature) || false;
    console.log(`🔍 Feature check: ${dashboard}.${feature} = ${hasFeatureEnabled}`);
    return hasFeatureEnabled;
  };

  // Get all enabled roles
  const getEnabledRoles = () => {
    return config?.enabled_roles || [];
  };

  // Get all enabled features for a dashboard
  const getEnabledFeatures = (dashboard) => {
    return config?.enabled_features?.[dashboard] || [];
  };

  // Get package information
  const getPackageInfo = () => {
    return {
      package: config?.package || 'BASIC',
      name: config?.name || 'Unknown University',
      isActive: config?.isActive || false
    };
  };

  // Get branding information
  const getBranding = () => {
    return config?.branding || {
      primaryColor: '#10b981',
      secondaryColor: '#059669',
      logoUrl: '',
      welcomeMessage: 'Welcome to ANOKHIYAM'
    };
  };

  return {
    config,
    loading,
    error,
    hasRole,
    hasFeature,
    getEnabledRoles,
    getEnabledFeatures,
    getPackageInfo,
    getBranding,
    loadConfigByCode
  };
};
