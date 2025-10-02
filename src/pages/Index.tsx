import { useEffect, lazy, Suspense } from "react";
import { useLocation } from "react-router-dom";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { ScrollProgress } from "@/components/ScrollProgress";
import { CookieBanner } from "@/components/CookieBanner";
import { HeroSection } from "@/components/sections/HeroSection";
import { LanguageProvider } from "@/contexts/LanguageContext";
import { CookieBannerProvider } from "@/contexts/CookieBannerContext";

// Lazy load des sections non critiques
const ProjectsSection = lazy(() => import("@/components/sections/ProjectsSection").then(module => ({ default: module.ProjectsSection })));
const SkillsSection = lazy(() => import("@/components/sections/SkillsSection").then(module => ({ default: module.SkillsSection })));
const ContactSection = lazy(() => import("@/components/sections/ContactSection").then(module => ({ default: module.ContactSection })));

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
    <LanguageProvider>
      <CookieBannerProvider>
        <div className="min-h-screen">
          <ScrollProgress />
          <Header />
          <main>
            <HeroSection />
            <Suspense fallback={<div className="py-20 md:py-32" />}>
              <ProjectsSection />
            </Suspense>
            <Suspense fallback={<div className="py-20 md:py-32" />}>
              <SkillsSection />
            </Suspense>
            <Suspense fallback={<div className="py-20 md:py-32" />}>
              <ContactSection />
            </Suspense>
          </main>
          <Footer />
          <CookieBanner />
        </div>
      </CookieBannerProvider>
    </LanguageProvider>
  );
};

export default Index;
