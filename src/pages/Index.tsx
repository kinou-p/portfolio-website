import { useEffect } from "react";
import { useLocation } from "react-router-dom";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { ScrollProgress } from "@/components/ScrollProgress";
import { CookieBanner } from "@/components/CookieBanner";
import { HeroSection } from "@/components/sections/HeroSection";
import { ProjectsSection } from "@/components/sections/ProjectsSection";
import { SkillsSection } from "@/components/sections/SkillsSection";
import { ContactSection } from "@/components/sections/ContactSection";
import { ThemeProvider } from "@/contexts/ThemeContext";
import { LanguageProvider } from "@/contexts/LanguageContext";
import { CookieBannerProvider } from "@/contexts/CookieBannerContext";

const Index = () => {
  const location = useLocation();

  // Handle navigation with hash from project pages
  useEffect(() => {
    if (location.hash) {
      const element = document.getElementById(location.hash.substring(1));
      if (element) {
        setTimeout(() => {
          element.scrollIntoView({ behavior: "smooth" });
        }, 100);
      }
    }
  }, [location.hash]);

  return (
    <ThemeProvider>
      <LanguageProvider>
        <CookieBannerProvider>
          <div className="min-h-screen">
            <ScrollProgress />
            <Header />
            <main>
              <HeroSection />
              <ProjectsSection />
              <SkillsSection />
              <ContactSection />
            </main>
            <Footer />
            <CookieBanner />
          </div>
        </CookieBannerProvider>
      </LanguageProvider>
    </ThemeProvider>
  );
};

export default Index;
