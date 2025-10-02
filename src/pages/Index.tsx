import { Header } from "@/components/Header";
import { ScrollProgress } from "@/components/ScrollProgress";
import { HeroSection } from "@/components/sections/HeroSection";
import { ProjectsSection } from "@/components/sections/ProjectsSection";
import { SkillsSection } from "@/components/sections/SkillsSection";
import { ContactSection } from "@/components/sections/ContactSection";
import { ThemeProvider } from "@/contexts/ThemeContext";
import { LanguageProvider } from "@/contexts/LanguageContext";

const Index = () => {
  return (
    <ThemeProvider>
      <LanguageProvider>
        <div className="min-h-screen">
          <ScrollProgress />
          <Header />
          <main>
            <HeroSection />
            <ProjectsSection />
            <SkillsSection />
            <ContactSection />
          </main>
        </div>
      </LanguageProvider>
    </ThemeProvider>
  );
};

export default Index;
