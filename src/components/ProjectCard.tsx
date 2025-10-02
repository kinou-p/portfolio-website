import { motion } from "framer-motion";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { useNavigate } from "react-router-dom";

interface ProjectCardProps {
  title: string;
  description: string;
  icon: React.ReactNode;
  image?: string;
  delay?: number;
  projectId?: string;
}

export const ProjectCard = ({ title, description, icon, image, delay = 0, projectId }: ProjectCardProps) => {
  const navigate = useNavigate();

  const handleClick = () => {
    if (projectId) {
      navigate(`/project/${projectId}`);
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5, delay }}
      whileHover={{ y: -5 }}
      onClick={handleClick}
      className={projectId ? "cursor-pointer" : ""}
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
