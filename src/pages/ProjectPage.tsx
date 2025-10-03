import { useParams, useNavigate, useLocation } from "react-router-dom";
import { useEffect } from "react";
import { motion } from "framer-motion";
import { ArrowLeft, Github, ExternalLink, Mail } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";
import { ScrollProgress } from "@/components/ScrollProgress";
import { Header } from "@/components/Header";
import { ImageGallery } from "@/components/ImageGallery";
import { SkillBadge } from "@/components/SkillBadge";
import { useLanguage } from "@/contexts/LanguageContext";
import { useTheme } from "@/contexts/ThemeContext";
import { projectsData } from "@/data/projects";
import { LanguageProvider } from "@/contexts/LanguageContext";

const ProjectPageContent = () => {
  const { projectId } = useParams<{ projectId: string }>();
  const navigate = useNavigate();
  const location = useLocation();
  const { language, t } = useLanguage();
  const { theme } = useTheme();

  // Reset scroll position when projectId changes
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [projectId, location.pathname]);

  const project = projectId ? projectsData[projectId] : null;

  if (!project) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-4xl font-bold mb-4">{t("project.notFound")}</h1>
          <Button onClick={() => navigate("/")}>
            <ArrowLeft className="w-4 h-4 mr-2" />
            {t("project.backToHome")}
          </Button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen overflow-y-hidden">
      <ScrollProgress />
      <Header />
      
      {/* Hero Section */}
      <section className="py-20 md:py-32 mt-16">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="max-w-4xl mx-auto text-center mb-12"
          >
            <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl xl:text-7xl font-bold mb-6">
              {project.title[language]}
            </h1>
            <p className="text-xl md:text-2xl text-muted-foreground mb-8">
              {project.shortDescription[language]}
            </p>
            <div className="flex flex-wrap gap-2 justify-center mb-8">
              {project.technologies.map((tech, index) => (
                <SkillBadge
                  key={tech.name}
                  name={tech.name}
                  icon={tech.icon}
                  iconUrl={tech.iconUrl}
                  delay={index * 0.05}
                />
              ))}
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="max-w-5xl mx-auto rounded-xl overflow-hidden border border-border/50 bg-card/50 backdrop-blur"
          >
            <img
              src={project.mainImage}
              alt={project.title[language]}
              className="w-full h-[400px] object-cover"
            />
          </motion.div>
        </div>
      </section>

      {/* Description Section */}
      <section className="py-20 bg-muted/30">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5 }}
            >
              <h2 className="text-3xl md:text-4xl font-bold mb-6">
                {t("project.description") || "Description"}
              </h2>
              <p className="text-lg text-muted-foreground leading-relaxed mb-6">
                {project.detailedDescription[language]}
              </p>
              
              {/* Liens intégrés dans la description */}
              {(project.githubUrl || project.demoUrl) && (
                <div className="flex flex-wrap gap-3 mb-12">
                  {project.githubUrl && (
                    <Button
                      variant="outline"
                      size="sm"
                      asChild
                      className="gap-2"
                    >
                      <a href={project.githubUrl} target="_blank" rel="noopener noreferrer">
                        <Github className="w-4 h-4" />
                        {t("project.viewGithub") || "View on GitHub"}
                      </a>
                    </Button>
                  )}
                  {project.demoUrl && (
                    <Button
                      size="sm"
                      asChild
                      className="gap-2"
                    >
                      <a href={project.demoUrl} target="_blank" rel="noopener noreferrer">
                        <ExternalLink className="w-4 h-4" />
                        {t("project.viewDemo") || "View Live Demo"}
                      </a>
                    </Button>
                  )}
                </div>
              )}
            </motion.div>

            <div className="grid md:grid-cols-2 gap-8">
              <motion.div
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5 }}
              >
                <Card className="h-full border-border/50 bg-card/50 backdrop-blur">
                  <CardContent className="pt-6">
                    <h3 className="text-2xl font-bold mb-4">
                      {t("project.objectives") || "Objectives"}
                    </h3>
                    <ul className="space-y-3">
                      {project.objectives[language].map((objective, index) => (
                        <li key={index} className="flex items-start gap-2">
                          <span className="text-primary mt-1">✓</span>
                          <span className="text-muted-foreground">{objective}</span>
                        </li>
                      ))}
                    </ul>
                  </CardContent>
                </Card>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, x: 20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5 }}
              >
                <Card className="h-full border-border/50 bg-card/50 backdrop-blur">
                  <CardContent className="pt-6">
                    <h3 className="text-2xl font-bold mb-4">
                      {t("project.challenges") || "Challenges"}
                    </h3>
                    <ul className="space-y-3">
                      {project.challenges[language].map((challenge, index) => (
                        <li key={index} className="flex items-start gap-2">
                          <span className="text-primary mt-1">⚡</span>
                          <span className="text-muted-foreground">{challenge}</span>
                        </li>
                      ))}
                    </ul>
                  </CardContent>
                </Card>
              </motion.div>
            </div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.2 }}
              className="mt-8"
            >
              <Card className="border-border/50 bg-card/50 backdrop-blur">
                <CardContent className="pt-6">
                  <h3 className="text-2xl font-bold mb-4">
                    {t("project.solution") || "Solution"}
                  </h3>
                  <p className="text-muted-foreground leading-relaxed">
                    {project.solution[language]}
                  </p>
                </CardContent>
              </Card>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Gallery Section */}
      {project.images.length > 0 && (
        <section className="py-20">
          <div className="container mx-auto px-4">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5 }}
              className="max-w-6xl mx-auto"
            >
              <h2 className="text-3xl md:text-4xl font-bold mb-12 text-center">
                {t("project.gallery") || "Gallery"}
              </h2>
              <ImageGallery images={project.images} projectTitle={project.title[language]} />
            </motion.div>
          </div>
        </section>
      )}

      {/* CTA Section */}
      <section className="py-20 bg-muted/30">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="max-w-4xl mx-auto text-center"
          >
            <h2 className="text-3xl md:text-4xl font-bold mb-6">
              {t("project.interested") || "Interested in this project?"}
            </h2>
            <p className="text-xl text-muted-foreground mb-8">
              {t("project.contactMe") || "Let's discuss how I can help with your project"}
            </p>
            <div className="flex flex-wrap gap-4 justify-center">
              <Button
                size="lg"
                onClick={() => navigate("/#contact")}
                className="gap-2"
              >
                <Mail className="w-5 h-5" />
                {t("hero.cta2") || "Contact me"}
              </Button>
              <Button
                variant="outline"
                size="lg"
                onClick={() => navigate("/")}
                className="gap-2"
              >
                <ArrowLeft className="w-5 h-5" />
                {t("project.backToHome")}
              </Button>
            </div>
          </motion.div>
        </div>
      </section>
    </div>
  );
};

const ProjectPage = () => {
  return (
    <LanguageProvider>
      <ProjectPageContent />
    </LanguageProvider>
  );
};

export default ProjectPage;
