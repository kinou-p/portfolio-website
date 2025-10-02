// Configuration et initialisation de Google Tag Manager avec gestion du consentement
// Chargement différé pour optimiser les performances LCP/FCP

declare global {
  interface Window {
    gtag: (...args: any[]) => void;
    dataLayer: any[];
  }
}

let gtmLoaded = false;

// Charger GTM uniquement après le consentement de l'utilisateur
const loadGTMScript = () => {
  if (gtmLoaded) return;
  
  // Initialiser le dataLayer
  window.dataLayer = window.dataLayer || [];
  
  // Charger le script GTM de manière asynchrone après un délai
  const script = document.createElement('script');
  script.async = true;
  script.src = 'https://www.googletagmanager.com/gtm.js?id=GTM-5V6TCG4C';
  
  // Ajouter le script après l'événement load pour ne pas bloquer le rendu initial
  if (document.readyState === 'complete') {
    document.head.appendChild(script);
  } else {
    window.addEventListener('load', () => {
      // Délai supplémentaire pour prioriser le contenu
      setTimeout(() => {
        document.head.appendChild(script);
      }, 1000);
    });
  }
  
  gtmLoaded = true;
};

export const initializeGTM = () => {
  // Vérifier si l'utilisateur a déjà donné son consentement
  const cookieConsent = localStorage.getItem('cookieConsent');
  const analyticsEnabled = localStorage.getItem('analyticsEnabled');

  // Charger GTM uniquement si les cookies sont acceptés
  if (cookieConsent === 'accepted' && analyticsEnabled === 'true') {
    loadGTMScript();
  }
  
  // Sinon, attendre le consentement
  window.addEventListener('cookieConsentAccepted', () => {
    loadGTMScript();
  });
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