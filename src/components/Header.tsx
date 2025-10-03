import { Moon, Sun, Menu, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useTheme } from "@/contexts/ThemeContext";
import { useLanguage } from "@/contexts/LanguageContext";
import { motion, AnimatePresence } from "framer-motion";
import { useLocation, useNavigate } from "react-router-dom";
import { useState, useEffect, useRef } from "react";

export const Header = () => {
  const { theme, toggleTheme } = useTheme();
  const { language, setLanguage, t } = useLanguage();
  const location = useLocation();
  const navigate = useNavigate();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const mobileMenuRef = useRef<HTMLDivElement>(null);

  // Check if we're on a project page
  const isProjectPage = location.pathname.startsWith('/project/');

  // Close mobile menu when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (mobileMenuRef.current && !mobileMenuRef.current.contains(event.target as Node)) {
        setMobileMenuOpen(false);
      }
    };

    if (mobileMenuOpen) {
      document.addEventListener('mousedown', handleClickOutside);
    }

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [mobileMenuOpen]);

  const handleNavigation = (section: string) => {
    // Close mobile menu immediately
    setMobileMenuOpen(false);
    
    // Then scroll to section (happens independently)
    if (isProjectPage) {
      // If on project page, navigate to home with section anchor
      navigate(`/#${section}`);
    } else {
      // If on home page, scroll to section
      // Use setTimeout to ensure scroll happens after menu animation starts
      setTimeout(() => {
        scrollToSection(section);
      }, 100);
    }
  };

  const handleLogoClick = () => {
    if (isProjectPage) {
      // If on project page, navigate to home
      navigate('/');
    } else {
      // If on home page, scroll to top
      scrollToTop();
    }
  };

  const scrollToSection = (id: string) => {
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
    }
  };

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <motion.header
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      className="fixed top-0 left-0 right-0 z-50 border-b border-border/40 bg-background/80 backdrop-blur-lg"
      ref={mobileMenuRef}
    >
      <div className="container mx-auto px-4 py-4 flex items-center justify-between">
        <motion.button
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.2 }}
          onClick={handleLogoClick}
          className="text-2xl font-bold text-gradient hover:scale-105 transition-transform duration-200 cursor-pointer"
          aria-label={isProjectPage ? "Retour à l'accueil" : "Retour en haut de page"}
        >
          AP
        </motion.button>

        {/* Desktop Navigation */}
        <nav className="hidden md:flex items-center gap-8">
          {["home", "projects", "skills", "contact"].map((item, i) => (
            <motion.button
              key={item}
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 * i }}
              onClick={() => handleNavigation(item)}
              className="relative text-sm font-medium text-muted-foreground hover:text-foreground transition-colors group"
            >
              {t(`nav.${item}`)}
              <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-primary group-hover:w-full transition-all duration-300"></span>
            </motion.button>
          ))}
        </nav>

        <div className="flex items-center gap-2">
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.3 }}
          >
            <Button
              variant="ghost"
              size="sm"
              onClick={() => setLanguage(language === "fr" ? "en" : "fr")}
              className="font-medium"
            >
              {language === "fr" ? "🇫🇷 FR" : "🇬🇧 EN"}
            </Button>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.4 }}
          >
            <Button variant="ghost" size="icon" onClick={toggleTheme} aria-label={theme === "dark" ? "Passer en mode clair" : "Passer en mode sombre"}>
              {theme === "dark" ? (
                <Sun className="h-5 w-5" />
              ) : (
                <Moon className="h-5 w-5" />
              )}
            </Button>
          </motion.div>

          {/* Mobile Menu Button */}
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.5 }}
            className="md:hidden"
          >
            <Button
              variant="ghost"
              size="icon"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              aria-label="Toggle menu"
            >
              {mobileMenuOpen ? (
                <X className="h-5 w-5" />
              ) : (
                <Menu className="h-5 w-5" />
              )}
            </Button>
          </motion.div>
        </div>
      </div>

      {/* Mobile Navigation */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.nav
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.3 }}
            className="md:hidden border-t border-border/40 bg-background/95 backdrop-blur-lg overflow-hidden"
          >
            <div className="container mx-auto px-4 py-4 flex flex-col gap-4">
              {["home", "projects", "skills", "contact"].map((item, i) => (
                <motion.button
                  key={item}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -20 }}
                  transition={{ delay: 0.1 * i }}
                  onClick={() => handleNavigation(item)}
                  className="relative text-left text-base font-medium text-muted-foreground hover:text-foreground transition-colors py-2 group"
                >
                  {t(`nav.${item}`)}
                  <span className="absolute bottom-1 left-0 w-0 h-0.5 bg-primary group-hover:w-full transition-all duration-300"></span>
                </motion.button>
              ))}
            </div>
          </motion.nav>
        )}
      </AnimatePresence>
    </motion.header>
  );
};
