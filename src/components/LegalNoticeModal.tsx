import { motion } from "framer-motion";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Separator } from "@/components/ui/separator";

interface LegalNoticeModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const LegalNoticeModal = ({ isOpen, onClose }: LegalNoticeModalProps) => {
  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-2xl max-h-[80vh]">
        <DialogHeader>
          <DialogTitle className="text-xl font-semibold">Mentions Légales</DialogTitle>
          <DialogDescription>
            Informations légales et conditions d'utilisation du site
          </DialogDescription>
        </DialogHeader>
        
        <ScrollArea className="h-full max-h-[60vh]">
          <div className="space-y-6 pr-4">
            <motion.section
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 }}
            >
              <h3 className="font-semibold text-lg mb-3 flex items-center gap-2">
                🏢 Éditeur du site
              </h3>
              <div className="space-y-2 text-sm text-muted-foreground">
                <p><strong>Nom :</strong> Alexandre Pommier</p>
                <p><strong>Statut :</strong> Étudiant à l'École 42</p>
                <p><strong>Email :</strong> contact@apommier.com</p>
                <p><strong>GitHub :</strong> @kinou-p</p>
              </div>
            </motion.section>

            <Separator />

            <motion.section
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
            >
              <h3 className="font-semibold text-lg mb-3 flex items-center gap-2">
                🌐 Hébergement
              </h3>
              <div className="space-y-2 text-sm text-muted-foreground">
                <p><strong>Hébergeur :</strong> Serveur personnel d'Alexandre Pommier</p>
                <p><strong>Type :</strong> Hébergement privé</p>
                <p><strong>Responsable :</strong> Alexandre Pommier</p>
              </div>
            </motion.section>

            <Separator />

            <motion.section
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 }}
            >
              <h3 className="font-semibold text-lg mb-3 flex items-center gap-2">
                📝 Propriété intellectuelle
              </h3>
              <div className="space-y-2 text-sm text-muted-foreground">
                <p>
                  Le contenu de ce site portfolio (textes, images, design, code source) 
                  est la propriété exclusive d'Alexandre Pommier et est protégé par le droit d'auteur.
                </p>
                <p>
                  <strong>Reproduction interdite :</strong> Toute reproduction, distribution, 
                  modification ou utilisation du contenu sans autorisation expresse est interdite.
                </p>
                <p>
                  <strong>Code source :</strong> Le code source de ce site est propriétaire 
                  et non distribué sous licence libre.
                </p>
              </div>
            </motion.section>

            <Separator />

            <motion.section
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4 }}
            >
              <h3 className="font-semibold text-lg mb-3 flex items-center gap-2">
                🔒 Données personnelles et cookies
              </h3>
              <div className="space-y-2 text-sm text-muted-foreground">
                <p>
                  <strong>Collecte de données :</strong> Ce site ne collecte aucune donnée 
                  personnelle directement. Seules les données de navigation anonymisées 
                  peuvent être collectées via Google Analytics (avec votre consentement).
                </p>
                <p>
                  <strong>Cookies :</strong> Utilisation de cookies techniques nécessaires 
                  au fonctionnement du site et de cookies analytiques (Google Analytics) 
                  soumis à votre consentement.
                </p>
                <p>
                  <strong>Vos droits :</strong> Vous pouvez à tout moment modifier vos 
                  préférences de cookies via le bouton dédié dans l'en-tête du site.
                </p>
              </div>
            </motion.section>

            <Separator />

            <motion.section
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.5 }}
            >
              <h3 className="font-semibold text-lg mb-3 flex items-center gap-2">
                ⚖️ Responsabilité
              </h3>
              <div className="space-y-2 text-sm text-muted-foreground">
                <p>
                  Les informations diffusées sur ce site sont présentées à titre informatif. 
                  Alexandre Pommier s'efforce d'assurer l'exactitude et la mise à jour des 
                  informations, mais ne peut garantir l'exactitude, la précision ou 
                  l'exhaustivité des informations.
                </p>
                <p>
                  En conséquence, l'utilisateur reconnaît utiliser ces informations sous 
                  sa responsabilité exclusive.
                </p>
              </div>
            </motion.section>

            <Separator />

            <motion.section
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.6 }}
            >
              <h3 className="font-semibold text-lg mb-3 flex items-center gap-2">
                📧 Contact
              </h3>
              <div className="space-y-2 text-sm text-muted-foreground">
                <p>
                  Pour toute question relative aux présentes mentions légales ou 
                  à l'utilisation du site, vous pouvez me contacter :
                </p>
                <p><strong>Email :</strong> contact@apommier.com</p>
                <p><strong>GitHub :</strong> github.com/kinou-p</p>
              </div>
            </motion.section>

            <div className="text-xs text-muted-foreground mt-8 pt-4 border-t">
              <p>Dernière mise à jour : Octobre 2025</p>
            </div>
          </div>
        </ScrollArea>
      </DialogContent>
    </Dialog>
  );
};