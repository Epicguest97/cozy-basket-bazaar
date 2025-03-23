
import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import { trackPageView } from '@/lib/trackInteractions';

export const usePageTracking = () => {
  const location = useLocation();
  
  useEffect(() => {
    // Track the page view when location changes
    const pageUrl = window.location.origin + location.pathname;
    trackPageView(pageUrl);
  }, [location]);
};
