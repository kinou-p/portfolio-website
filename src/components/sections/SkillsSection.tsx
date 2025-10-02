import { motion } from "framer-motion";
import { useLanguage } from "@/contexts/LanguageContext";
import { SkillBadge } from "@/components/SkillBadge";

export const SkillsSection = () => {
  const { t } = useLanguage();

  const languages = [
    { 
      name: "JavaScript", 
      iconUrl: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/javascript/javascript-original.svg"
    },
    { 
      name: "TypeScript", 
      iconUrl: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/typescript/typescript-original.svg"
    },
    { 
      name: "Python", 
      iconUrl: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/python/python-original.svg"
    },
    { 
      name: "C/C++", 
      iconUrl: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/cplusplus/cplusplus-original.svg"
    },
    { 
      name: "HTML5", 
      iconUrl: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/html5/html5-original.svg"
    },
    { 
      name: "CSS3", 
      iconUrl: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/css3/css3-original.svg"
    },
  ];

  const frameworks = [
    { 
      name: "React", 
      iconUrl: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/react/react-original.svg"
    },
    { 
      name: "Node.js", 
      iconUrl: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/nodejs/nodejs-original.svg"
    },
    { 
      name: "NestJS", 
      iconUrl: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/nestjs/nestjs-original.svg"
    },
    { 
      name: "Docker", 
      iconUrl: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/docker/docker-original.svg"
    },
    { 
      name: "Linux", 
      iconUrl: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/linux/linux-original.svg"
    },
    { 
      name: "PostgreSQL", 
      iconUrl: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/postgresql/postgresql-original.svg"
    },
    { 
      name: "MongoDB", 
      iconUrl: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/mongodb/mongodb-original.svg"
    },
    { 
      name: "MySQL", 
      iconUrl: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/mysql/mysql-original.svg"
    },
    { 
      name: "Ansible", 
      iconUrl: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/ansible/ansible-original.svg"
    },
    { 
      name: "WordPress", 
      iconUrl: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/wordpress/wordpress-original.svg"
    },
  ];

  return (
    <section id="skills" className="py-20 md:py-32 bg-muted/30">
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl md:text-5xl font-bold mb-4">
            {t("skills.title")}
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            {t("skills.subtitle")}
          </p>
        </motion.div>

        <div className="max-w-4xl mx-auto space-y-12">
          <div>
            <motion.h3
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="text-2xl font-semibold mb-6"
            >
              {t("skills.languages")}
            </motion.h3>
            <div className="flex flex-wrap gap-3">
              {languages.map((skill, index) => (
                <SkillBadge
                  key={skill.name}
                  name={skill.name}
                  iconUrl={skill.iconUrl}
                  delay={index * 0.1}
                />
              ))}
            </div>
          </div>

          <div>
            <motion.h3
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="text-2xl font-semibold mb-6"
            >
              {t("skills.frameworks")}
            </motion.h3>
            <div className="flex flex-wrap gap-3">
              {frameworks.map((skill, index) => (
                <SkillBadge
                  key={skill.name}
                  name={skill.name}
                  iconUrl={skill.iconUrl}
                  delay={index * 0.1}
                />
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
