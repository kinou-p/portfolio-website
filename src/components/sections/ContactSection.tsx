import { motion } from "framer-motion";
import { useLanguage } from "@/contexts/LanguageContext";
import { Mail, Phone, Github } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";

export const ContactSection = () => {
  const { t } = useLanguage();

  const contacts = [
    {
      icon: <Phone className="w-6 h-6" />,
      label: t("contact.phone"),
      value: "06.52.40.38.30",
      href: "tel:+33652403830",
    },
    {
      icon: <Mail className="w-6 h-6" />,
      label: t("contact.email"),
      value: "apommier@student.42.fr",
      href: "mailto:apommier@student.42.fr",
    },
    {
      icon: <Github className="w-6 h-6" />,
      label: t("contact.github"),
      value: "kinou-p",
      href: "https://github.com/kinou-p",
    },
  ];

  return (
    <section id="contact" className="py-20 md:py-32">
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl md:text-5xl font-bold mb-4">
            {t("contact.title")}
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            {t("contact.subtitle")}
          </p>
        </motion.div>

        <div className="max-w-3xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-6">
          {contacts.map((contact, index) => (
            <motion.a
              key={contact.label}
              href={contact.href}
              target="_blank"
              rel="noopener noreferrer"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              whileHover={{ y: -5 }}
            >
              <Card className="h-full hover:shadow-lg transition-all duration-300 border-border/50 bg-card/50 backdrop-blur cursor-pointer">
                <CardContent className="pt-6 text-center space-y-3">
                  <div className="w-12 h-12 rounded-lg bg-primary/10 flex items-center justify-center mx-auto text-primary">
                    {contact.icon}
                  </div>
                  <div>
                    <p className="text-sm text-muted-foreground mb-1">
                      {contact.label}
                    </p>
                    <p className="font-medium">{contact.value}</p>
                  </div>
                </CardContent>
              </Card>
            </motion.a>
          ))}
        </div>
      </div>
    </section>
  );
};
