import { motion } from "framer-motion";
import { useLanguage } from "@/contexts/LanguageContext";
import { Mail, Github, Send, Share2, Briefcase } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { useState } from "react";

export const ContactSection = () => {
  const { t } = useLanguage();
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    subject: "",
    message: "",
  });

  const contacts = [
    {
      icon: <Mail className="w-6 h-6" />,
      label: t("contact.email"),
      value: "contact@apommier.com",
      href: "mailto:contact@apommier.com",
    },
    {
      icon: <Github className="w-6 h-6" />,
      label: t("contact.github"),
      value: "kinou-p",
      href: "https://github.com/kinou-p",
    },
    {
      icon: <Briefcase className="w-6 h-6" />,
      label: "Malt",
      value: "Alexandre Pommier",
      href: "https://www.malt.fr/profile/alexandrepommier",
    },
  ];

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Créer un lien mailto avec les données du formulaire
    const subject = encodeURIComponent(formData.subject || "Contact depuis le portfolio");
    const body = encodeURIComponent(
      `Nom: ${formData.name}\nEmail: ${formData.email}\n\nMessage:\n${formData.message}`
    );
    window.location.href = `mailto:contact@apommier.com?subject=${subject}&body=${body}`;
  };

  const handleShare = async () => {
    const shareData = {
      title: "Portfolio d'Alexandre Pommier",
      text: "Découvrez le portfolio d'Alexandre Pommier, étudiant développeur à 42",
      url: window.location.href,
    };

    try {
      if (navigator.share) {
        await navigator.share(shareData);
      } else {
        // Fallback : copier l'URL dans le presse-papiers
        await navigator.clipboard.writeText(window.location.href);
        // Vous pouvez ajouter ici une notification toast pour informer l'utilisateur
        alert("Lien copié dans le presse-papiers !");
      }
    } catch (error) {
      console.log("Erreur lors du partage:", error);
    }
  };

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

        <div className="max-w-4xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-12">
          {/* Informations de contact */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="space-y-6"
          >
            <h3 className="text-2xl font-semibold mb-6">Restons en contact</h3>
            <div className="space-y-4">
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
                  whileHover={{ x: 5 }}
                >
                  <Card className="hover:shadow-md transition-all duration-300 border-border/50 bg-card/50 backdrop-blur cursor-pointer">
                    <CardContent className="p-4 flex items-center space-x-4">
                      <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center text-primary flex-shrink-0">
                        {contact.icon}
                      </div>
                      <div>
                        <p className="text-sm text-muted-foreground">
                          {contact.label}
                        </p>
                        <p className="font-medium">{contact.value}</p>
                      </div>
                    </CardContent>
                  </Card>
                </motion.a>
              ))}
              
              {/* Bouton de partage */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: 0.3 }}
              >
                <Button
                  onClick={handleShare}
                  variant="outline"
                  className="w-full p-4 h-auto justify-start space-x-4 hover:shadow-md transition-all duration-300 border-border/50 bg-card/50 backdrop-blur"
                >
                  <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center text-primary flex-shrink-0">
                    <Share2 className="w-6 h-6" />
                  </div>
                  <div className="text-left">
                    <p className="text-sm text-muted-foreground">
                      Partager
                    </p>
                    <p className="font-medium">Partager mon portfolio</p>
                  </div>
                </Button>
              </motion.div>
            </div>
          </motion.div>

          {/* Formulaire de contact */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.2 }}
          >
            <Card className="border-border/50 bg-card/50 backdrop-blur">
              <CardContent className="p-6">
                <h3 className="text-2xl font-semibold mb-6">Envoyez-moi un message</h3>
                <form onSubmit={handleSubmit} className="space-y-4">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <Input
                        name="name"
                        placeholder="Votre nom"
                        value={formData.name}
                        onChange={handleInputChange}
                        required
                      />
                    </div>
                    <div>
                      <Input
                        name="email"
                        type="email"
                        placeholder="Votre email"
                        value={formData.email}
                        onChange={handleInputChange}
                        required
                      />
                    </div>
                  </div>
                  <div>
                    <Input
                      name="subject"
                      placeholder="Sujet"
                      value={formData.subject}
                      onChange={handleInputChange}
                      required
                    />
                  </div>
                  <div>
                    <Textarea
                      name="message"
                      placeholder="Votre message..."
                      rows={5}
                      value={formData.message}
                      onChange={handleInputChange}
                      required
                    />
                  </div>
                  <Button type="submit" className="w-full" size="lg">
                    <Send className="w-4 h-4 mr-2" />
                    Envoyer le message
                  </Button>
                </form>
              </CardContent>
            </Card>
          </motion.div>
        </div>
      </div>
    </section>
  );
};