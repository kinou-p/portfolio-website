import { motion } from "framer-motion";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";

interface ProjectCardProps {
  title: string;
  description: string;
  icon: React.ReactNode;
  image?: string;
  delay?: number;
}

export const ProjectCard = ({ title, description, icon, image, delay = 0 }: ProjectCardProps) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5, delay }}
      whileHover={{ y: -5 }}
    >
      <Card className="h-full hover:shadow-lg transition-all duration-300 border-border/50 bg-card/50 backdrop-blur relative overflow-hidden">
        {image && (
          <div className="absolute top-4 right-4 w-16 h-16 rounded-lg overflow-hidden border-2 border-background/20 shadow-lg">
            <img 
              src={image} 
              alt={`${title} preview`}
              className="w-full h-full object-cover"
            />
          </div>
        )}
        <CardHeader>
          <div className="w-12 h-12 rounded-lg bg-primary/10 flex items-center justify-center mb-4">
            {icon}
          </div>
          <CardTitle className="text-xl pr-20">{title}</CardTitle>
        </CardHeader>
        <CardContent>
          <CardDescription className="text-base leading-relaxed">
            {description}
          </CardDescription>
        </CardContent>
      </Card>
    </motion.div>
  );
};
