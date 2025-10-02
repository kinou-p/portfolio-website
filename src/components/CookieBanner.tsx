import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Cookie } from "lucide-react";
import { useLanguage } from "@/contexts/LanguageContext";
import { useCookieBanner } from "@/contexts/CookieBannerContext";

export const CookieBanner = () => {
  const { t } = useLanguage();
  const { isVisible, hideBanner } = useCookieBanner();

  const acceptAllCookies = () => {
    localStorage.setItem("cookieConsent", "accepted");
    localStorage.setItem("analyticsEnabled", "true");
    hideBanner();
    
    // Émettre un événement pour charger GTM
    window.dispatchEvent(new Event('cookieConsentAccepted'));
    
    // Activer Google Tag Manager si déjà chargé
    if (typeof window !== 'undefined' && (window as any).gtag) {
      (window as any).gtag('consent', 'update', {
        'analytics_storage': 'granted'
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
        <motion.div
          initial={{ y: 100, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          exit={{ y: 100, opacity: 0 }}
          transition={{ type: "spring", damping: 25, stiffness: 200 }}
          className="fixed bottom-4 left-4 right-4 md:left-auto md:right-4 md:max-w-md z-50"
        >
          <Card className="border-border/50 bg-card/95 backdrop-blur-lg shadow-2xl">
            <div className="p-4">
              {/* Header minimaliste */}
              <div className="flex items-start gap-3 mb-4">
                <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center shrink-0">
                  <Cookie className="w-5 h-5 text-primary" />
                </div>
                <div className="flex-1">
                  <h3 className="font-semibold text-base mb-1">Cookies</h3>
                  <p className="text-sm text-muted-foreground">
                    Nous utilisons des cookies pour améliorer votre expérience et analyser le trafic.
                  </p>
                </div>
              </div>

              {/* Boutons d'action - Accepter en premier */}
              <div className="flex gap-2">
                <Button
                  size="sm"
                  onClick={acceptAllCookies}
                  className="flex-1"
                >
                  Accepter
                </Button>
                <Button
                  variant="outline"
                  size="sm"
                  onClick={rejectAll}
                  className="flex-1"
                >
                  Refuser
                </Button>
              </div>
            </div>
          </Card>
        </motion.div>
      )}
    </AnimatePresence>
  );
};