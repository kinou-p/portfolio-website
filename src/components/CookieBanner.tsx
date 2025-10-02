import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Cookie, X, Settings } from "lucide-react";
import { useLanguage } from "@/contexts/LanguageContext";
import { useCookieBanner } from "@/contexts/CookieBannerContext";

export const CookieBanner = () => {
  const { t } = useLanguage();
  const { isVisible, hideBanner } = useCookieBanner();
  const [showDetails, setShowDetails] = useState(false);

  const acceptAllCookies = () => {
    localStorage.setItem("cookieConsent", "accepted");
    localStorage.setItem("analyticsEnabled", "true");
    hideBanner();
    
    // Activer Google Tag Manager
    if (typeof window !== 'undefined' && (window as any).gtag) {
      (window as any).gtag('consent', 'update', {
        'analytics_storage': 'granted'
      });
    }
  };

  const acceptNecessaryOnly = () => {
    localStorage.setItem("cookieConsent", "necessary");
    localStorage.setItem("analyticsEnabled", "false");
    hideBanner();
    
    // Désactiver les cookies analytiques
    if (typeof window !== 'undefined' && (window as any).gtag) {
      (window as any).gtag('consent', 'update', {
        'analytics_storage': 'denied'
      });
    }
  };

  const rejectAll = () => {
    localStorage.setItem("cookieConsent", "rejected");
    localStorage.setItem("analyticsEnabled", "false");
    hideBanner();
    
    // Désactiver tous les cookies non nécessaires
    if (typeof window !== 'undefined' && (window as any).gtag) {
      (window as any).gtag('consent', 'update', {
        'analytics_storage': 'denied'
      });
    }
  };

  return (
    <AnimatePresence>
      {isVisible && (
        <>
          {/* Overlay pour mobile */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-background/50 backdrop-blur-sm z-40 md:hidden"
          />
          
          {/* Bannière de cookies */}
          <motion.div
            initial={{ y: 100, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            exit={{ y: 100, opacity: 0 }}
            transition={{ type: "spring", damping: 25, stiffness: 200 }}
            className="fixed bottom-0 left-0 right-0 z-50 p-4 md:p-6"
          >
            <Card className="mx-auto max-w-4xl border-border/50 bg-card/95 backdrop-blur-lg shadow-2xl">
              <div className="p-4 md:p-6">
                {/* Header */}
                <div className="flex items-start justify-between mb-4">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center">
                      <Cookie className="w-5 h-5 text-primary" />
                    </div>
                    <div>
                      <h3 className="font-semibold text-lg">Gestion des cookies</h3>
                      <p className="text-sm text-muted-foreground">
                        Nous utilisons des cookies pour améliorer votre expérience
                      </p>
                    </div>
                  </div>
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => hideBanner()}
                    className="shrink-0"
                  >
                    <X className="w-4 h-4" />
                  </Button>
                </div>

                {/* Contenu */}
                <div className="mb-6">
                  <p className="text-sm text-muted-foreground mb-3">
                    Ce site utilise des cookies pour analyser le trafic et personnaliser le contenu. 
                    Les cookies analytiques nous aident à comprendre comment vous utilisez notre site.
                  </p>
                  
                  {showDetails && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: "auto", opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      className="space-y-3 mb-4"
                    >
                      <div className="p-3 bg-muted/50 rounded-lg">
                        <h4 className="font-medium text-sm mb-1">🍪 Cookies nécessaires</h4>
                        <p className="text-xs text-muted-foreground">
                          Requis pour le fonctionnement de base du site (préférences, sécurité)
                        </p>
                      </div>
                      <div className="p-3 bg-muted/50 rounded-lg">
                        <h4 className="font-medium text-sm mb-1">📊 Cookies analytiques</h4>
                        <p className="text-xs text-muted-foreground">
                          Google Analytics pour mesurer l'audience et améliorer le site
                        </p>
                      </div>
                    </motion.div>
                  )}
                </div>

                {/* Actions */}
                <div className="flex flex-col sm:flex-row gap-3 sm:gap-2 sm:justify-between sm:items-center">
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => setShowDetails(!showDetails)}
                    className="text-xs sm:order-first"
                  >
                    <Settings className="w-3 h-3 mr-1" />
                    {showDetails ? "Masquer les détails" : "Voir les détails"}
                  </Button>
                  
                  <div className="flex flex-col sm:flex-row gap-2">
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={rejectAll}
                      className="text-xs"
                    >
                      Tout refuser
                    </Button>
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={acceptNecessaryOnly}
                      className="text-xs"
                    >
                      Nécessaires seulement
                    </Button>
                    <Button
                      size="sm"
                      onClick={acceptAllCookies}
                      className="text-xs"
                    >
                      Tout accepter
                    </Button>
                  </div>
                </div>
              </div>
            </Card>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
};