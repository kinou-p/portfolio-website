import { motion } from "framer-motion";
import { useLanguage } from "@/contexts/LanguageContext";
import { ProjectCard } from "@/components/ProjectCard";
import { projectsData } from "@/data/projects";
import { Server, Gamepad2, Cloud, Terminal, Box, Globe, Scale } from "lucide-react";

export const ProjectsSection = () => {
  const { t } = useLanguage();

  const projects = [
    {
      key: "avopieces",
      icon: <Scale className="w-6 h-6 text-primary" />,
      image: "/images/sites/avopieces/mookup/3-devices-white (1).webp",
    },
    {
      key: "nas",
      icon: <Server className="w-6 h-6 text-primary" />,
      image: "/images/projects/homemade_nas.webp",
    },
    {
      key: "transcendence",
      icon: <Gamepad2 className="w-6 h-6 text-primary" />,
      image: "/images/projects/pong.webp",
    },
    {
      key: "cloud",
      icon: <Cloud className="w-6 h-6 text-primary" />,
      image: "/images/projects/cloud_1.webp",
    },
    {
      key: "minishell",
      icon: <Terminal className="w-6 h-6 text-primary" />,
      image: "/images/projects/minishell.webp",
    },
    {
      key: "etsidemain",
      icon: <Globe className="w-6 h-6 text-primary" />,
      image: "/images/sites/etsidemain/mookup/3-devices-white.webp",
    },
    {
      key: "cube3d",
      icon: <Box className="w-6 h-6 text-primary" />,
      image: "/images/projects/cub3d.webp",
    },
  ];

  return (
    <section id="projects" className="py-20 md:py-32">
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl md:text-5xl font-bold mb-4">
            {t("projects.title")}
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            {t("projects.subtitle")}
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {projects.map((project, index) => (
            <ProjectCard
              key={project.key}
              title={t(`projects.items.${project.key}.title`)}
              description={t(`projects.items.${project.key}.description`)}
              icon={project.icon}
              image={project.image}
              technologies={projectsData[project.key]?.technologies}
              delay={index * 0.1}
              projectId={project.key}
            />
          ))}
        </div>
      </div>
    </section>
  );
};
