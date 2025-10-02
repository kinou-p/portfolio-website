import { createContext, useContext, useState, useEffect, ReactNode } from "react";

interface CookieBannerContextType {
  isVisible: boolean;
  showBanner: () => void;
  hideBanner: () => void;
}

const CookieBannerContext = createContext<CookieBannerContextType | undefined>(undefined);

export const useCookieBanner = () => {
  const context = useContext(CookieBannerContext);
  if (!context) {
    throw new Error("useCookieBanner must be used within a CookieBannerProvider");
  }
  return context;
};

interface CookieBannerProviderProps {
  children: ReactNode;
}

export const CookieBannerProvider = ({ children }: CookieBannerProviderProps) => {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    // Vérifier si l'utilisateur a déjà fait un choix
    const cookieConsent = localStorage.getItem("cookieConsent");
    if (!cookieConsent) {
      // Délai de 2 secondes avant d'afficher la bannière
      const timer = setTimeout(() => {
        setIsVisible(true);
      }, 2000);
      return () => clearTimeout(timer);
    }
  }, []);

  const showBanner = () => {
    setIsVisible(true);
  };

  const hideBanner = () => {
    setIsVisible(false);
  };

  return (
    <CookieBannerContext.Provider value={{ isVisible, showBanner, hideBanner }}>
      {children}
    </CookieBannerContext.Provider>
  );
};