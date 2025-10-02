import { useEffect } from 'react';

export const useServiceWorker = () => {
  useEffect(() => {
    if ('serviceWorker' in navigator && process.env.NODE_ENV === 'production') {
      // Enregistrer le service worker après un petit délai pour ne pas bloquer le rendu
      const registerSW = async () => {
        try {
          const registration = await navigator.serviceWorker.register('/sw.js', {
            scope: '/'
          });

          registration.addEventListener('updatefound', () => {
            const newWorker = registration.installing;
            if (newWorker) {
              newWorker.addEventListener('statechange', () => {
                if (newWorker.state === 'installed' && navigator.serviceWorker.controller) {
                  // Nouvelle version disponible
                  console.log('New service worker available, consider refreshing the page');
                }
              });
            }
          });

          console.log('Service Worker registered successfully');
        } catch (error) {
          console.log('Service Worker registration failed:', error);
        }
      };

      // Attendre que la page soit interactive avant d'enregistrer le SW
      if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', registerSW);
      } else {
        // Petit délai pour ne pas bloquer le rendu initial
        setTimeout(registerSW, 100);
      }
    }
  }, []);
};
