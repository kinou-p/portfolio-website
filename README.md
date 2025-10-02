# 🌟 Portfolio d'Alexandre Pommier

Un portfolio moderne et interactif développé avec React, TypeScript et shadcn/ui, présentant mes projets et compétences techniques.

## 🚀 Aperçu

Ce portfolio présente mon parcours d'étudiant à 42 en informatique, avec une sélection de mes projets techniques les plus significatifs. Il intègre des animations fluides, un design responsive et un support multilingue (français/anglais).

### ✨ Fonctionnalités

- **🌙 Mode sombre/clair** - Changement de thème avec persistance
- **🌍 Multilingue** - Support français et anglais
- **📱 Responsive** - Optimisé pour tous les appareils
- **🎨 Animations** - Interactions fluides avec Framer Motion
- **🎯 Navigation intuitive** - Barre de progression et navigation smooth
- **⚡ Performance** - Construit avec Vite pour des temps de chargement optimaux

## 🛠️ Technologies utilisées

### Frontend
- **React 18** - Interface utilisateur moderne
- **TypeScript** - Typage statique pour une meilleure robustesse
- **Vite** - Build tool rapide et moderne
- **Tailwind CSS** - Framework CSS utilitaire
- **shadcn/ui** - Composants UI élégants et accessibles

### Librairies & Outils
- **Framer Motion** - Animations et transitions
- **React Router** - Navigation côté client
- **Lucide React** - Icônes modernes
- **React Query** - Gestion d'état et cache
- **React Hook Form** - Gestion des formulaires
- **next-themes** - Gestion des thèmes

### Développement
- **ESLint** - Linting et qualité du code
- **PostCSS** - Traitement CSS
- **Bun** - Gestionnaire de paquets rapide

## 📁 Structure du projet

```
pommier-portfolio/
├── public/                 # Assets statiques
├── src/
│   ├── components/        # Composants réutilisables
│   │   ├── sections/     # Sections principales du portfolio
│   │   └── ui/           # Composants UI (shadcn/ui)
│   ├── contexts/         # Contextes React (Theme, Language)
│   ├── hooks/            # Hooks personnalisés
│   ├── lib/              # Utilitaires et configurations
│   ├── pages/            # Pages de l'application
│   └── utils/            # Fonctions utilitaires et traductions
├── package.json
└── README.md
```

## 🚀 Installation et lancement

### Prérequis
- Node.js (version 18 ou supérieure)
- Bun (recommandé) ou npm/yarn

### Installation

```bash
# Cloner le repository
git clone https://github.com/kinou-p/pommier-portfolio.git
cd pommier-portfolio

# Installer les dépendances avec Bun
bun install

# Ou avec npm
npm install
```

### Développement

```bash
# Lancer le serveur de développement
bun dev

# Ou avec npm
npm run dev
```

L'application sera accessible sur `http://localhost:5173`

### Build pour la production

```bash
# Build de production
bun run build

# Prévisualiser le build
bun run preview
```

## 📋 Scripts disponibles

- `bun dev` - Lance le serveur de développement
- `bun build` - Build de production
- `bun build:dev` - Build en mode développement
- `bun lint` - Vérification du code avec ESLint
- `bun preview` - Prévisualisation du build de production

## 🎨 Personnalisation

### Thèmes
Le portfolio utilise CSS variables pour les couleurs, configurées dans `src/index.css`. Les thèmes sont gérés par `next-themes`.

### Traductions
Les traductions sont centralisées dans `src/utils/translations.ts`. Pour ajouter une nouvelle langue :
1. Ajouter les traductions dans l'objet `translations`
2. Mettre à jour le contexte de langue si nécessaire

### Contenu
- **Projets** : Modifiez `src/components/sections/ProjectsSection.tsx`
- **Compétences** : Modifiez `src/components/sections/SkillsSection.tsx`
- **Contact** : Modifiez `src/components/sections/ContactSection.tsx`

## 🌟 Projets présentés

1. **Homemade NAS** - Infrastructure personnelle complète
2. **Ft_Transcendence** - Application web Pong en temps réel
3. **Cloud-1** - Infrastructure automatisée avec Docker/Ansible
4. **Minishell** - Réimplémentation d'un shell bash en C
5. **Cube3D** - Moteur 3D RayCaster
6. **etsidemain.com** - Site vitrine pour conseil en transformation régénérative
7. **avopieces.fr** - Plateforme juridique IA pour procédures de divorce

## �️ Sécurité

Ce portfolio implémente des pratiques de sécurité avancées pour protéger contre les vulnérabilités web courantes :

- **Content Security Policy (CSP)** - Protection contre XSS
- **HSTS** - Forçage HTTPS avec preload
- **COOP/CORP/COEP** - Isolation cross-origin
- **X-Frame-Options** - Protection contre le clickjacking
- **Permissions Policy** - Contrôle des fonctionnalités du navigateur

Pour plus de détails, consultez [SECURITY.md](./SECURITY.md).

## �📱 Responsive Design

Le portfolio est entièrement responsive avec des breakpoints optimisés :
- Mobile : < 640px
- Tablet : 640px - 1024px
- Desktop : > 1024px

## 🤝 Contribution

Les contributions sont les bienvenues ! N'hésitez pas à ouvrir une issue ou proposer une pull request.

## 📄 Licence

Ce projet est sous licence MIT. Voir le fichier `LICENSE` pour plus de détails.

## 📞 Contact

**Alexandre Pommier**
- 📧 Email : [alexandre.pommier@example.com](mailto:alexandre.pommier@example.com)
- 💼 GitHub : [@kinou-p](https://github.com/kinou-p)

---

*Développé avec ❤️ par Alexandre Pommier*
