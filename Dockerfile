# Étape 1: Build
FROM node:18-alpine AS builder

WORKDIR /app

# Installer les dépendances système nécessaires
RUN apk add --no-cache git

# Copier les fichiers de dépendances
COPY package*.json ./
COPY bun.lockb* ./

# Installer TOUTES les dépendances (y compris devDependencies pour le build)
RUN npm ci || npm install

# Copier le code source
COPY . .

# Build l'application en mode production
RUN npm run build

# Vérifier que le dossier dist existe
RUN ls -la /app/dist

# Étape 2: Production avec Nginx
FROM nginx:alpine

# Copier les fichiers buildés depuis l'étape builder
COPY --from=builder /app/dist /usr/share/nginx/html

# Copier la configuration Nginx optimisée
COPY nginx.conf /etc/nginx/nginx.conf

# Exposer le port 80
EXPOSE 80

# Démarrer Nginx
CMD ["nginx", "-g", "daemon off;"]
