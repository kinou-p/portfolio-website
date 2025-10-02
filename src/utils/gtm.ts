// Configuration et initialisation de Google Tag Manager avec gestion du consentement

declare global {
  interface Window {
    gtag: (...args: any[]) => void;
    dataLayer: any[];
  }
}

// Initialiser le dataLayer si il n'existe pas
window.dataLayer = window.dataLayer || [];

// Configuration du consentement par défaut (refusé jusqu'à acceptation)
if (typeof window !== 'undefined' && window.gtag) {
  window.gtag('consent', 'default', {
    'analytics_storage': 'denied',
    'ad_storage': 'denied',
    'functionality_storage': 'granted',
    'security_storage': 'granted',
  });

  // Vérifier si l'utilisateur a déjà donné son consentement
  const cookieConsent = localStorage.getItem('cookieConsent');
  const analyticsEnabled = localStorage.getItem('analyticsEnabled');

  if (cookieConsent === 'accepted' && analyticsEnabled === 'true') {
    window.gtag('consent', 'update', {
      'analytics_storage': 'granted'
    });
  }
}

export const initializeGTM = () => {
  // Cette fonction peut être utilisée pour des initialisations supplémentaires si nécessaire
  console.log('Google Tag Manager initialized');
};

export const trackEvent = (eventName: string, parameters?: Record<string, any>) => {
  if (typeof window !== 'undefined' && window.gtag) {
    window.gtag('event', eventName, parameters);
  }
};

export const trackPageView = (pageName: string) => {
  if (typeof window !== 'undefined' && window.gtag) {
    window.gtag('config', 'GTM-5V6TCG4C', {
      page_title: pageName,
      page_location: window.location.href,
    });
  }
};