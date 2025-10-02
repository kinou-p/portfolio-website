import { motion } from "framer-motion";
import { Badge } from "@/components/ui/badge";

interface SkillBadgeProps {
  name: string;
  icon?: string;
  iconUrl?: string;
  color?: string;
  delay?: number;
}

export const SkillBadge = ({ name, icon, iconUrl, color = "default", delay = 0 }: SkillBadgeProps) => {
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.8 }}
      whileInView={{ opacity: 1, scale: 1 }}
      viewport={{ once: true }}
      transition={{ duration: 0.3, delay }}
      whileHover={{ scale: 1.05 }}
    >
      <Badge
        variant="secondary"
        className="text-base py-2 px-4 font-medium hover:bg-primary hover:text-primary-foreground transition-colors"
      >
        {iconUrl ? (
          <img src={iconUrl} alt={`${name} logo`} className="mr-2 w-5 h-5" />
        ) : icon ? (
          <span className="mr-2">{icon}</span>
        ) : null}
        {name}
      </Badge>
    </motion.div>
  );
};
