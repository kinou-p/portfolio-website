import { ReactNode } from "react";

export interface ProjectData {
  id: string;
  title: { fr: string; en: string };
  shortDescription: { fr: string; en: string };
  detailedDescription: { fr: string; en: string };
  objectives: { fr: string[]; en: string[] };
  challenges: { fr: string[]; en: string[] };
  solution: { fr: string; en: string };
  images: string[];
  mainImage: string;
  technologies: { name: string; color?: string; icon?: string; iconUrl?: string }[];
  githubUrl?: string;
  demoUrl?: string;
}

export const projectsData: Record<string, ProjectData> = {
  nas: {
    id: "nas",
    title: { fr: "Homemade NAS", en: "Homemade NAS" },
    shortDescription: {
      fr: "Serveur personnel avec OpenMediaVault, password manager auto-hébergé, Home Assistant, Portainer, Plex, Traefik pour une infrastructure complète.",
      en: "Personal server with OpenMediaVault, self-hosted password manager, Home Assistant, Portainer, Plex, Traefik for a complete infrastructure.",
    },
    detailedDescription: {
      fr: "Mise en place d'un serveur NAS complet avec OpenMediaVault comme système de base. Configuration d'un écosystème de services auto-hébergés incluant un gestionnaire de mots de passe sécurisé, Home Assistant pour la domotique, Portainer pour la gestion de conteneurs, Plex pour le streaming média, et Traefik comme reverse proxy pour sécuriser tous les accès.",
      en: "Setup of a complete NAS server with OpenMediaVault as base system. Configuration of a self-hosted services ecosystem including a secure password manager, Home Assistant for home automation, Portainer for container management, Plex for media streaming, and Traefik as reverse proxy to secure all accesses.",
    },
    objectives: {
      fr: [
        "Créer une infrastructure personnelle sécurisée",
        "Auto-héberger des services critiques",
        "Apprendre l'administration système Linux",
        "Maîtriser Docker et la conteneurisation",
      ],
      en: [
        "Create a secure personal infrastructure",
        "Self-host critical services",
        "Learn Linux system administration",
        "Master Docker and containerization",
      ],
    },
    challenges: {
      fr: [
        "Configuration de la sécurité réseau",
        "Gestion des certificats SSL/TLS",
        "Optimisation des performances",
        "Backup et redondance des données",
      ],
      en: [
        "Network security configuration",
        "SSL/TLS certificate management",
        "Performance optimization",
        "Data backup and redundancy",
      ],
    },
    solution: {
      fr: "Architecture microservices avec Docker Compose, reverse proxy Traefik automatisant les certificats Let's Encrypt, système de backup automatique avec rsync, et monitoring avec Prometheus.",
      en: "Microservices architecture with Docker Compose, Traefik reverse proxy automating Let's Encrypt certificates, automatic backup system with rsync, and monitoring with Prometheus.",
    },
    mainImage: "/images/projects/homemade_nas.png",
    images: ["/images/projects/homemade_nas.png"],
    technologies: [
      { name: "OpenMediaVault", iconUrl: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/debian/debian-original.svg" },
      { name: "Docker", iconUrl: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/docker/docker-original.svg" },
      { name: "Traefik", iconUrl: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/kubernetes/kubernetes-plain.svg" },
      { name: "Linux", iconUrl: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/linux/linux-original.svg" },
      { name: "Home Assistant", iconUrl: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/python/python-original.svg" },
      { name: "Portainer", iconUrl: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/docker/docker-original.svg" },
    ],
  },
  transcendence: {
    id: "transcendence",
    title: { fr: "Ft_Transcendence", en: "Ft_Transcendence" },
    shortDescription: {
      fr: "Application web Pong social en temps réel avec React, NestJS, PostgreSQL, WebSocket et authentification sécurisée.",
      en: "Real-time social Pong web application with React, NestJS, PostgreSQL, WebSocket and secure authentication.",
    },
    detailedDescription: {
      fr: "Développement d'une application web full-stack moderne réinventant le jeu Pong classique avec des fonctionnalités sociales. Architecture client-serveur avec React pour le frontend, NestJS pour le backend, communication temps réel via WebSocket, base de données PostgreSQL, et système d'authentification OAuth2.",
      en: "Development of a modern full-stack web application reinventing the classic Pong game with social features. Client-server architecture with React for frontend, NestJS for backend, real-time communication via WebSocket, PostgreSQL database, and OAuth2 authentication system.",
    },
    objectives: {
      fr: [
        "Créer une application web full-stack complète",
        "Implémenter la communication temps réel",
        "Développer un système de matchmaking",
        "Gérer l'authentification et la sécurité",
      ],
      en: [
        "Create a complete full-stack web application",
        "Implement real-time communication",
        "Develop a matchmaking system",
        "Handle authentication and security",
      ],
    },
    challenges: {
      fr: [
        "Synchronisation du jeu en temps réel",
        "Gestion des collisions et physique",
        "Architecture scalable backend",
        "Sécurisation des communications WebSocket",
      ],
      en: [
        "Real-time game synchronization",
        "Collision and physics management",
        "Scalable backend architecture",
        "WebSocket communication security",
      ],
    },
    solution: {
      fr: "Architecture MVC avec NestJS, WebSocket rooms pour les matchs, système de queuing Redis pour le matchmaking, JWT pour l'authentification, et Canvas HTML5 pour le rendu du jeu.",
      en: "MVC architecture with NestJS, WebSocket rooms for matches, Redis queuing system for matchmaking, JWT for authentication, and HTML5 Canvas for game rendering.",
    },
    mainImage: "/images/projects/pong.png",
    images: ["/images/projects/pong.png"],
    technologies: [
      { name: "React", iconUrl: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/react/react-original.svg" },
      { name: "TypeScript", iconUrl: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/typescript/typescript-original.svg" },
      { name: "NestJS", iconUrl: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/nestjs/nestjs-original.svg" },
      { name: "PostgreSQL", iconUrl: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/postgresql/postgresql-original.svg" },
      { name: "WebSocket", iconUrl: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/javascript/javascript-original.svg" },
      { name: "Docker", iconUrl: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/docker/docker-original.svg" },
    ],
  },
  cloud: {
    id: "cloud",
    title: { fr: "Cloud-1", en: "Cloud-1" },
    shortDescription: {
      fr: "Infrastructure automatisée avec Docker et Ansible, incluant WordPress, PHPMyAdmin et MySQL containerisés.",
      en: "Automated infrastructure with Docker and Ansible, including containerized WordPress, PHPMyAdmin and MySQL.",
    },
    detailedDescription: {
      fr: "Projet d'infrastructure cloud automatisée utilisant Docker pour la conteneurisation et Ansible pour l'orchestration. Déploiement automatique d'une stack LAMP complète avec WordPress, PHPMyAdmin et MySQL, configuration réseau sécurisée, et scripts d'automatisation pour le déploiement et la maintenance.",
      en: "Automated cloud infrastructure project using Docker for containerization and Ansible for orchestration. Automatic deployment of a complete LAMP stack with WordPress, PHPMyAdmin and MySQL, secure network configuration, and automation scripts for deployment and maintenance.",
    },
    objectives: {
      fr: [
        "Automatiser le déploiement d'infrastructure",
        "Maîtriser Docker et la conteneurisation",
        "Apprendre Ansible et l'Infrastructure as Code",
        "Implémenter des bonnes pratiques DevOps",
      ],
      en: [
        "Automate infrastructure deployment",
        "Master Docker and containerization",
        "Learn Ansible and Infrastructure as Code",
        "Implement DevOps best practices",
      ],
    },
    challenges: {
      fr: [
        "Orchestration multi-conteneurs",
        "Gestion des variables d'environnement",
        "Persistance des données",
        "Automatisation complète avec Ansible",
      ],
      en: [
        "Multi-container orchestration",
        "Environment variables management",
        "Data persistence",
        "Complete automation with Ansible",
      ],
    },
    solution: {
      fr: "Docker Compose pour l'orchestration, Ansible playbooks pour l'automatisation, volumes Docker pour la persistance, et réseau bridge personnalisé pour l'isolation.",
      en: "Docker Compose for orchestration, Ansible playbooks for automation, Docker volumes for persistence, and custom bridge network for isolation.",
    },
    mainImage: "/images/projects/cloud_1.png",
    images: ["/images/projects/cloud_1.png"],
    technologies: [
      { name: "Docker", iconUrl: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/docker/docker-original.svg" },
      { name: "Ansible", iconUrl: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/ansible/ansible-original.svg" },
      { name: "WordPress", iconUrl: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/wordpress/wordpress-original.svg" },
      { name: "MySQL", iconUrl: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/mysql/mysql-original.svg" },
      { name: "Linux", iconUrl: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/linux/linux-original.svg" },
    ],
  },
  minishell: {
    id: "minishell",
    title: { fr: "Minishell", en: "Minishell" },
    shortDescription: {
      fr: "Réimplémentation d'un shell bash en C avec gestion de processus, pipes, redirections et variables d'environnement.",
      en: "Bash shell reimplementation in C with process management, pipes, redirections and environment variables.",
    },
    detailedDescription: {
      fr: "Recréation d'un interpréteur de commandes shell en langage C, reproduisant le comportement de bash. Implémentation du parsing de commandes, gestion des processus avec fork/exec, pipes pour la communication inter-processus, redirections d'entrée/sortie, gestion des signaux, et variables d'environnement.",
      en: "Recreation of a shell command interpreter in C language, reproducing bash behavior. Implementation of command parsing, process management with fork/exec, pipes for inter-process communication, input/output redirections, signal handling, and environment variables.",
    },
    objectives: {
      fr: [
        "Comprendre le fonctionnement d'un shell Unix",
        "Maîtriser les appels système POSIX",
        "Gérer les processus et la communication inter-processus",
        "Implémenter un parser robuste",
      ],
      en: [
        "Understand Unix shell functioning",
        "Master POSIX system calls",
        "Handle processes and inter-process communication",
        "Implement a robust parser",
      ],
    },
    challenges: {
      fr: [
        "Parsing de commandes complexes",
        "Gestion mémoire sans fuites",
        "Gestion des signaux (Ctrl+C, Ctrl+D, Ctrl+\\)",
        "Reproduction exacte du comportement bash",
      ],
      en: [
        "Complex command parsing",
        "Memory management without leaks",
        "Signal handling (Ctrl+C, Ctrl+D, Ctrl+\\)",
        "Exact bash behavior reproduction",
      ],
    },
    solution: {
      fr: "Tokenizer/Lexer pour le parsing, AST pour représenter les commandes, gestion des descripteurs de fichiers pour les redirections, et table de hash pour les variables d'environnement.",
      en: "Tokenizer/Lexer for parsing, AST to represent commands, file descriptor management for redirections, and hash table for environment variables.",
    },
    mainImage: "/images/projects/minishell.png",
    images: ["/images/projects/minishell.png"],
    technologies: [
      { name: "C", iconUrl: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/c/c-original.svg" },
      { name: "Linux", iconUrl: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/linux/linux-original.svg" },
      { name: "POSIX", iconUrl: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/unix/unix-original.svg" },
      { name: "Make", iconUrl: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/cmake/cmake-original.svg" },
    ],
  },
  cube3d: {
    id: "cube3d",
    title: { fr: "Cube3D", en: "Cube3D" },
    shortDescription: {
      fr: "Moteur RayCaster 3D inspiré de Wolfenstein 3D, développé avec MiniLibX et algorithmes graphiques avancés.",
      en: "3D RayCaster engine inspired by Wolfenstein 3D, developed with MiniLibX and advanced graphics algorithms.",
    },
    detailedDescription: {
      fr: "Développement d'un moteur de rendu 3D utilisant la technique du raycasting, inspiré du jeu Wolfenstein 3D. Implémentation des algorithmes DDA pour le lancer de rayons, gestion des textures, systèmes de collisions, mini-map en temps réel, et optimisations de performance pour un rendu fluide.",
      en: "Development of a 3D rendering engine using raycasting technique, inspired by Wolfenstein 3D game. Implementation of DDA algorithms for ray casting, texture management, collision systems, real-time mini-map, and performance optimizations for smooth rendering.",
    },
    objectives: {
      fr: [
        "Comprendre les algorithmes de rendu 3D",
        "Implémenter le raycasting depuis zéro",
        "Optimiser les performances graphiques",
        "Gérer les textures et sprites",
      ],
      en: [
        "Understand 3D rendering algorithms",
        "Implement raycasting from scratch",
        "Optimize graphics performance",
        "Handle textures and sprites",
      ],
    },
    challenges: {
      fr: [
        "Calculs trigonométriques optimisés",
        "Gestion de la mémoire graphique",
        "Chargement et mapping des textures",
        "Détection de collisions précise",
      ],
      en: [
        "Optimized trigonometric calculations",
        "Graphics memory management",
        "Texture loading and mapping",
        "Precise collision detection",
      ],
    },
    solution: {
      fr: "Algorithme DDA pour le raycasting, lookup tables pour les calculs trigonométriques, buffer d'image pour le double buffering, et grille 2D pour la détection de collisions.",
      en: "DDA algorithm for raycasting, lookup tables for trigonometric calculations, image buffer for double buffering, and 2D grid for collision detection.",
    },
    mainImage: "/images/projects/cub3d.png",
    images: ["/images/projects/cub3d.png"],
    technologies: [
      { name: "C", iconUrl: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/c/c-original.svg" },
      { name: "MiniLibX", iconUrl: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/c/c-original.svg" },
      { name: "Raycasting", iconUrl: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/cplusplus/cplusplus-original.svg" },
      { name: "Make", iconUrl: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/cmake/cmake-original.svg" },
    ],
  },
  etsidemain: {
    id: "etsidemain",
    title: { fr: "Site Et si demain...", en: "Et si demain... Website" },
    shortDescription: {
      fr: "Site web vitrine pour cabinet de conseil en transformation régénérative. Design moderne et responsive avec animations CSS, formulaire de contact et optimisations SEO.",
      en: "Showcase website for regenerative transformation consulting firm. Modern responsive design with CSS animations, contact form and SEO optimizations.",
    },
    detailedDescription: {
      fr: "Création d'un site web vitrine professionnel pour un cabinet de conseil spécialisé dans la transformation régénérative. Design moderne et épuré avec animations CSS sophistiquées, formulaire de contact fonctionnel, optimisations SEO avancées, performance optimisée avec lazy loading, et déploiement avec CI/CD.",
      en: "Creation of a professional showcase website for a consulting firm specialized in regenerative transformation. Modern and clean design with sophisticated CSS animations, functional contact form, advanced SEO optimizations, optimized performance with lazy loading, and CI/CD deployment.",
    },
    objectives: {
      fr: [
        "Créer une présence web professionnelle",
        "Optimiser le référencement naturel",
        "Assurer une expérience utilisateur fluide",
        "Garantir des performances optimales",
      ],
      en: [
        "Create a professional web presence",
        "Optimize natural referencing",
        "Ensure smooth user experience",
        "Guarantee optimal performance",
      ],
    },
    challenges: {
      fr: [
        "Design moderne et élégant",
        "Animations fluides et performantes",
        "Optimisation SEO complète",
        "Compatibilité multi-navigateurs",
      ],
      en: [
        "Modern and elegant design",
        "Smooth and performant animations",
        "Complete SEO optimization",
        "Multi-browser compatibility",
      ],
    },
    solution: {
      fr: "HTML5/CSS3 sémantique, animations avec transitions CSS et Intersection Observer, balises meta optimisées, structure de données JSON-LD, et optimisation des assets.",
      en: "Semantic HTML5/CSS3, animations with CSS transitions and Intersection Observer, optimized meta tags, JSON-LD data structure, and asset optimization.",
    },
    mainImage: "/images/sites/etsidemain/mookup/3-devices-white.png",
    images: [
      "/images/sites/etsidemain/mookup/3-devices-white.png",
      "/images/sites/etsidemain/mookup/desktop.png",
      "/images/sites/etsidemain/mookup/laptop.png",
      "/images/sites/etsidemain/mookup/tablet-white.png",
      "/images/sites/etsidemain/mookup/mobile-white.png",
      "/images/sites/etsidemain/pc.png",
      "/images/sites/etsidemain/tablette.png",
      "/images/sites/etsidemain/tel.png"
    ],
    technologies: [
      { name: "HTML5", iconUrl: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/html5/html5-original.svg" },
      { name: "CSS3", iconUrl: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/css3/css3-original.svg" },
      { name: "JavaScript", iconUrl: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/javascript/javascript-original.svg" },
      { name: "SEO", iconUrl: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/google/google-original.svg" },
    ],
    demoUrl: "https://etsidemain.com",
  },
  avopieces: {
    id: "avopieces",
    title: { fr: "Site Avo Pièces", en: "Avo Pieces Website" },
    shortDescription: {
      fr: "Plateforme juridique intelligente pour le cabinet AvoCab, spécialisée dans les procédures de divorce. Intègre un chatbot IA analysant les documents uploadés, système de gestion de comptes client/admin, prise de RDV en ligne et vitrine du cabinet.",
      en: "Intelligent legal platform for AvoCab law firm, specialized in divorce procedures. Features AI chatbot analyzing uploaded documents, client/admin account management system, online appointment booking and law firm showcase.",
    },
    detailedDescription: {
      fr: "Développement d'une plateforme web complète pour un cabinet d'avocats spécialisé en droit de la famille. Chatbot IA utilisant l'analyse documentaire pour fournir des réponses juridiques personnalisées, système de gestion de comptes avec authentification sécurisée, module de prise de rendez-vous intégré, interface admin pour la gestion des clients, et site vitrine présentant les services du cabinet.",
      en: "Development of a complete web platform for a law firm specialized in family law. AI chatbot using document analysis to provide personalized legal answers, account management system with secure authentication, integrated appointment booking module, admin interface for client management, and showcase website presenting the firm's services.",
    },
    objectives: {
      fr: [
        "Automatiser la première consultation juridique",
        "Faciliter la gestion des dossiers clients",
        "Moderniser la prise de rendez-vous",
        "Améliorer l'expérience client",
      ],
      en: [
        "Automate initial legal consultation",
        "Facilitate client case management",
        "Modernize appointment booking",
        "Improve client experience",
      ],
    },
    challenges: {
      fr: [
        "Intégration d'IA pour l'analyse documentaire",
        "Sécurité des données sensibles (RGPD)",
        "Architecture full-stack complexe",
        "Interface intuitive pour non-techniciens",
      ],
      en: [
        "AI integration for document analysis",
        "Sensitive data security (GDPR)",
        "Complex full-stack architecture",
        "Intuitive interface for non-technical users",
      ],
    },
    solution: {
      fr: "Architecture MERN stack, RAG (Retrieval Augmented Generation) pour le chatbot, chiffrement des données, système de roles et permissions, API RESTful, et design system cohérent.",
      en: "MERN stack architecture, RAG (Retrieval Augmented Generation) for chatbot, data encryption, roles and permissions system, RESTful API, and consistent design system.",
    },
    mainImage: "/images/sites/avopieces/mookup/3-devices-white (1).png",
    images: [
      "/images/sites/avopieces/mookup/3-devices-white (1).png",
      "/images/sites/avopieces/mookup/desktop (1).png",
      "/images/sites/avopieces/mookup/laptop (1).png",
      "/images/sites/avopieces/mookup/tablet-white (1).png",
      "/images/sites/avopieces/mookup/mobile-white (1).png",
      "/images/sites/avopieces/pc.png",
      "/images/sites/avopieces/tablette.png",
      "/images/sites/avopieces/tel.png"
    ],
    technologies: [
      { name: "React", iconUrl: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/react/react-original.svg" },
      { name: "Node.js", iconUrl: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/nodejs/nodejs-original.svg" },
      { name: "MongoDB", iconUrl: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/mongodb/mongodb-original.svg" },
      { name: "OpenAI", iconUrl: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/python/python-original.svg" },
      { name: "TypeScript", iconUrl: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/typescript/typescript-original.svg" },
    ],
    demoUrl: "https://avopieces.fr",
  },
};
