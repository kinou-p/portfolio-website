import { motion } from "framer-motion";
import { useLanguage } from "@/contexts/LanguageContext";
import { SkillBadge } from "@/components/SkillBadge";

export const SkillsSection = () => {
  const { t } = useLanguage();

  const languages = [
    { name: "JavaScript", icon: "📜" },
    { name: "TypeScript", icon: "📘" },
    { name: "Python", icon: "🐍" },
    { name: "C/C++", icon: "⚙️" },
  ];

  const frameworks = [
    { name: "React", icon: "⚛️" },
    { name: "Node.js", icon: "📗" },
    { name: "Docker", icon: "🐳" },
    { name: "Linux", icon: "🐧" },
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
                  icon={skill.icon}
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
                  icon={skill.icon}
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
