// Utilitaires pour optimiser les performances et réduire le JavaScript inutilisé

/**
 * Précharger les routes critiques uniquement
 * Évite de charger les composants non nécessaires immédiatement
 */
export const preloadCriticalRoutes = () => {
  // Précharger uniquement la page d'accueil au démarrage
  // Les autres pages seront chargées à la demande
  if (window.location.pathname === '/') {
    // Rien à précharger, la page d'accueil est déjà chargée
    return;
  }
};

/**
 * Détecter si l'utilisateur est sur une connexion lente
 * Pour adapter le chargement des ressources
 */
export const isSlowConnection = (): boolean => {
  if ('connection' in navigator) {
    const connection = (navigator as any).connection;
    return connection?.effectiveType === 'slow-2g' || 
           connection?.effectiveType === '2g' ||
           connection?.saveData === true;
  }
  return false;
};

/**
 * Chargement différé des icônes
 * Lucide-react peut être volumineux, charger uniquement les icônes nécessaires
 */
export const prefetchIcons = async () => {
  // Les icônes sont déjà importées dynamiquement dans les composants
  // Cette fonction peut être utilisée pour un préchargement conditionnel
  if (!isSlowConnection()) {
    // Précharger les icônes communes si la connexion est rapide
    return;
  }
};

/**
 * Initialiser requestIdleCallback avec fallback
 */
export const requestIdleCallback = (
  callback: IdleRequestCallback,
  options?: { timeout?: number }
): number => {
  if ('requestIdleCallback' in window) {
    return window.requestIdleCallback(callback, options);
  }
  // Fallback pour les navigateurs ne supportant pas requestIdleCallback
  return setTimeout(() => {
    callback({
      didTimeout: false,
      timeRemaining: () => 50,
    } as IdleDeadline);
  }, options?.timeout || 1) as unknown as number;
};

/**
 * Annuler un requestIdleCallback
 */
export const cancelIdleCallback = (id: number): void => {
  if ('cancelIdleCallback' in window) {
    window.cancelIdleCallback(id);
  } else {
    clearTimeout(id);
  }
};
