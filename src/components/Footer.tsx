import { motion } from "framer-motion";
import { useState } from "react";
import { useLanguage } from "@/contexts/LanguageContext";
import { useCookieBanner } from "@/contexts/CookieBannerContext";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { LegalNoticeModal } from "@/components/LegalNoticeModal";
import { Github, Mail, ExternalLink, Cookie, FileText, Download } from "lucide-react";

export const Footer = () => {
  const { t } = useLanguage();
  const { showBanner } = useCookieBanner();
  const [showLegalNotice, setShowLegalNotice] = useState(false);
  const [showCVPopup, setShowCVPopup] = useState(false);

  const reopenCookiePreferences = () => {
    // Simplement rouvrir la bannière sans recharger
    showBanner();
  };

  const currentYear = new Date().getFullYear();

  const footerLinks = [
    {
      icon: <Download className="w-4 h-4" />,
      label: t("footer.downloadCV"),
      onClick: () => setShowCVPopup(true)
    },
    {
      icon: <FileText className="w-4 h-4" />,
      label: t("footer.legalNotice"),
      onClick: () => setShowLegalNotice(true)
    },
    {
      icon: <Cookie className="w-4 h-4" />,
      label: t("footer.cookieManagement"),
      onClick: reopenCookiePreferences
    }
  ];

  const socialLinks = [
    {
      icon: <Github className="w-5 h-5" />,
      label: t("footer.github"),
      href: "https://github.com/kinou-p"
    },
    {
      icon: <Mail className="w-5 h-5" />,
      label: t("footer.email"),
      href: "mailto:contact@apommier.com"
    }
  ];

  return (
    <footer className="bg-background/50 backdrop-blur-sm border-t border-border/50">
      <div className="container mx-auto px-4 py-12">
        <div className="flex flex-col md:flex-row justify-between gap-8 mb-8">
          {/* Colonne 1: Logo et description */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="space-y-4 md:max-w-sm"
          >
            <div className="text-2xl font-bold text-gradient">
              Alexandre Pommier
            </div>
            <p className="text-sm text-muted-foreground leading-relaxed">
              {t("footer.description")}
            </p>
            <div className="flex items-center gap-3">
              {socialLinks.map((link, index) => (
                <motion.a
                  key={link.label}
                  href={link.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  initial={{ opacity: 0, scale: 0.8 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.3, delay: index * 0.1 }}
                  whileHover={{ scale: 1.1 }}
                  className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center text-primary hover:bg-primary/20 transition-colors"
                  title={link.label}
                >
                  {link.icon}
                </motion.a>
              ))}
            </div>
          </motion.div>

          {/* Colonne 2: Navigation rapide */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="space-y-4 md:max-w-xs"
          >
            <h3 className="font-semibold text-lg">{t("footer.navigation")}</h3>
            <nav className="space-y-2">
              {["home", "projects", "skills", "contact"].map((item) => (
                <Button
                  key={item}
                  variant="ghost"
                  size="sm"
                  onClick={() => {
                    const element = document.getElementById(item);
                    if (element) {
                      element.scrollIntoView({ behavior: "smooth" });
                    }
                  }}
                  className="justify-start h-auto p-2 text-muted-foreground hover:text-foreground hover:bg-transparent relative group"
                >
                  <span className="relative">
                    {t(`nav.${item}`)}
                    <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-primary group-hover:w-full transition-all duration-300" />
                  </span>
                </Button>
              ))}
            </nav>
          </motion.div>

          {/* Colonne 3: Informations légales */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="space-y-4 md:max-w-xs"
          >
            <h3 className="font-semibold text-lg">{t("footer.information")}</h3>
            <nav className="flex flex-col space-y-2">
              {footerLinks.map((link, index) => (
                <Button
                  key={link.label}
                  variant="ghost"
                  size="sm"
                  onClick={link.onClick}
                  className="justify-start h-auto p-2 text-muted-foreground hover:text-foreground hover:bg-transparent relative group"
                >
                  <span className="mr-2">{link.icon}</span>
                  <span className="relative">
                    {link.label}
                    <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-primary group-hover:w-full transition-all duration-300" />
                  </span>
                </Button>
              ))}
            </nav>
          </motion.div>
        </div>

        <Separator className="mb-6" />

        {/* Bas du footer */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.3 }}
          className="flex flex-col md:flex-row justify-between items-center gap-4 text-sm text-muted-foreground"
        >
          <div className="text-center md:text-left">
            © {currentYear} Alexandre Pommier. {t("footer.copyright")}
          </div>
          <div className="flex items-center gap-4 text-xs">
            <div className="flex items-center gap-1">
              {t("footer.builtWith")} 
              <a 
                href="https://reactjs.org" 
                target="_blank" 
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1 hover:text-foreground transition-colors"
              >
                React <ExternalLink className="w-3 h-3" />
              </a>
            </div>
          </div>
        </motion.div>
      </div>

      {/* Modal mentions légales */}
      <LegalNoticeModal
        isOpen={showLegalNotice}
        onClose={() => setShowLegalNotice(false)}
      />

      {/* Popup CV en travaux */}
      {showCVPopup && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50" onClick={() => setShowCVPopup(false)}>
          <div className="bg-background p-6 rounded-lg shadow-lg max-w-sm mx-4" onClick={(e) => e.stopPropagation()}>
            <h3 className="text-lg font-semibold mb-2">{t("footer.cvWorkInProgressTitle")}</h3>
            <p className="text-muted-foreground mb-4">
              {t("footer.cvWorkInProgress")}
            </p>
            <Button onClick={() => setShowCVPopup(false)} className="w-full">
              {t("footer.understood")}
            </Button>
          </div>
        </div>
      )}
    </footer>
  );
};