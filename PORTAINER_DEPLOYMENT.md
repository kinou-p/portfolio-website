# 🚀 Guide de Déploiement sur Portainer

## 📋 Prérequis

1. Portainer installé et accessible
2. Traefik configuré avec le réseau `portfolio`
3. Git installé sur le serveur Docker
4. Accès à votre repository GitHub

---

## 🔧 Option 1 : Déploiement via Stack Portainer (Recommandé)

### Étape 1 : Connexion à Portainer
1. Ouvrez votre interface Portainer (ex: https://portainer.votredomaine.com)
2. Connectez-vous avec vos identifiants

### Étape 2 : Créer une nouvelle Stack
1. Dans le menu de gauche, cliquez sur **"Stacks"**
2. Cliquez sur **"+ Add stack"**
3. Donnez un nom : `portfolio-website`

### Étape 3 : Configuration de la Stack

**Option A - Déploiement depuis Git (Recommandé) :**

1. Sélectionnez **"Repository"** sous "Build method"
2. Remplissez les champs :
   - **Repository URL** : `https://github.com/kinou-p/portfolio-website`
   - **Repository reference** : `refs/heads/main`
   - **Compose path** : `docker-compose.yml`

3. **Si votre repository est PRIVÉ** :
   
   **Méthode 1 - Personal Access Token (Recommandé) :**
   - ✅ Cochez **"Authentication"**
   - **Username** : `kinou-p`
   - **Personal Access Token** : Votre token GitHub (ex: `ghp_xxxxxxxxxxxx`)
   
   Pour créer un token :
   - GitHub → Settings → Developer settings → Personal access tokens → Tokens (classic)
   - Generate new token → Cochez `repo` → Generate
   
   **Méthode 2 - SSH Deploy Key (Plus sécurisé) :**
   - Repository URL : `git@github.com:kinou-p/portfolio-website.git`
   - Authentication : SSH
   - Collez votre clé SSH privée
   
   Pour créer une deploy key :
   ```bash
   ssh-keygen -t ed25519 -C "portainer" -f ~/.ssh/portainer_deploy
   # Ajoutez la clé publique (.pub) dans GitHub → Settings → Deploy keys
   ```

4. **Si votre repository est PUBLIC** :
   - Pas besoin d'authentification
   - Laissez "Authentication" décoché

**Option B - Copier/Coller le docker-compose.yml :**

1. Sélectionnez **"Web editor"**
2. Copiez-collez le contenu du fichier `docker-compose.yml`

### Étape 4 : Variables d'environnement (optionnel)

Cliquez sur **"Advanced mode"** et ajoutez si nécessaire :
```
GTM_ID=GTM-5V6TCG4C
NODE_ENV=production
```

### Étape 5 : Déployer

1. Vérifiez que le réseau `portfolio` existe
2. Cliquez sur **"Deploy the stack"**
3. Attendez la fin du build (peut prendre 2-5 minutes)

### Étape 6 : Vérification

1. Allez dans **"Containers"**
2. Vérifiez que `portfolio-website` est **"running"** (vert)
3. Cliquez sur le container pour voir les logs
4. Testez votre site : https://alexandre-pommier.com

---

## 🔧 Option 2 : Déploiement via Container Portainer

### Étape 1 : Construire l'image en local

```bash
# Sur votre machine locale
cd /path/to/portfolio-website
docker build -t portfolio-website:latest .

# Tag pour votre registry (optionnel)
docker tag portfolio-website:latest votre-registry/portfolio-website:latest

# Push vers votre registry
docker push votre-registry/portfolio-website:latest
```

### Étape 2 : Créer le container dans Portainer

1. Dans Portainer, allez dans **"Containers"**
2. Cliquez sur **"+ Add container"**
3. Remplissez les champs :

**Configuration de base :**
- **Name** : `portfolio-website`
- **Image** : `portfolio-website:latest` (ou `votre-registry/portfolio-website:latest`)
- **Always pull the image** : Coché
- **Restart policy** : `Unless stopped`

**Network :**
- **Network** : Sélectionnez `portfolio`

**Labels (pour Traefik) :**

Cliquez sur **"+ add label"** et ajoutez :

```
traefik.enable=true
traefik.http.routers.portfolio-website.rule=Host(`alexandre-pommier.com`) || Host(`www.alexandre-pommier.com`)
traefik.http.routers.portfolio-website.entrypoints=websecure
traefik.http.routers.portfolio-website.tls=true
traefik.http.routers.portfolio-website.tls.certresolver=letsencrypt
traefik.http.services.portfolio-website.loadbalancer.server.port=80
traefik.http.routers.portfolio-website-http.rule=Host(`alexandre-pommier.com`) || Host(`www.alexandre-pommier.com`)
traefik.http.routers.portfolio-website-http.entrypoints=web
traefik.http.routers.portfolio-website-http.middlewares=redirect-to-https
traefik.http.middlewares.redirect-to-https.redirectscheme.scheme=https
traefik.http.middlewares.redirect-to-https.redirectscheme.permanent=true
```

4. Cliquez sur **"Deploy the container"**

---

## 🔄 Mise à jour du Portfolio

### Via Stack (Option 1)

1. Allez dans **"Stacks"**
2. Cliquez sur votre stack `portfolio-website`
3. Cliquez sur **"Pull and redeploy"** ou **"Git pull and redeploy"**
4. Confirmez l'action

### Via Webhook (Automatique - Recommandé)

1. Dans votre stack, allez dans **"Webhooks"**
2. Cliquez sur **"+ Add webhook"**
3. Donnez un nom : `github-auto-deploy`
4. Copiez l'URL générée (ex: `https://portainer.com/api/webhooks/xxx`)

5. Sur GitHub :
   - Allez dans **Settings** > **Webhooks** > **Add webhook**
   - Collez l'URL Portainer
   - Content type : `application/json`
   - Événements : `Just the push event`
   - Active : Coché
   - Cliquez sur **"Add webhook"**

Maintenant, chaque `git push` sur `main` déclenchera automatiquement un redéploiement ! 🎉

---

## 📊 Monitoring et Logs

### Voir les logs en temps réel

1. Allez dans **"Containers"**
2. Cliquez sur `portfolio-website`
3. Cliquez sur **"Logs"**
4. Activez **"Auto-refresh"**

### Statistiques de performance

1. Dans le container, cliquez sur **"Stats"**
2. Visualisez CPU, RAM, Network en temps réel

### Health Check

Le container inclut un health check qui vérifie :
- Toutes les 30 secondes
- Si Nginx répond sur le port 80
- 3 tentatives avant de marquer comme "unhealthy"

---

## 🛠️ Commandes utiles

### Reconstruire l'image après changement

```bash
# Si vous utilisez Stack avec Git
# Portainer fait tout automatiquement avec "Git pull and redeploy"

# Si vous gérez manuellement
docker-compose build --no-cache
docker-compose up -d
```

### Voir les containers actifs

```bash
docker ps
```

### Accéder aux logs

```bash
docker logs portfolio-website -f
```

### Redémarrer le container

```bash
docker restart portfolio-website
```

### Supprimer et recréer

```bash
docker-compose down
docker-compose up -d --build
```

---

## 🔒 Sécurité

### Variables sensibles

Si vous avez des secrets (API keys, etc.), utilisez les **Secrets** de Portainer :

1. Allez dans **"Secrets"**
2. Créez un nouveau secret
3. Référencez-le dans votre stack avec `secrets:`

### Limiter les ressources

Dans le docker-compose, ajoutez :

```yaml
deploy:
  resources:
    limits:
      cpus: '0.5'
      memory: 512M
    reservations:
      cpus: '0.25'
      memory: 256M
```

---

## ✅ Checklist de déploiement

- [ ] Portainer accessible et connecté
- [ ] Réseau `portfolio` créé
- [ ] Traefik configuré et fonctionnel
- [ ] Repository GitHub accessible
- [ ] Docker-compose.yml à jour sur le repo
- [ ] Stack créée dans Portainer
- [ ] Container démarré avec succès
- [ ] Site accessible via HTTPS
- [ ] Webhook configuré pour auto-deploy
- [ ] Logs vérifiés (pas d'erreurs)
- [ ] Health check en vert

---

## 🚨 Troubleshooting

### Le container ne démarre pas

1. Vérifiez les logs : `docker logs portfolio-website`
2. Vérifiez que le réseau `portfolio` existe
3. Vérifiez que le port 80 n'est pas déjà utilisé

### Le site n'est pas accessible

1. Vérifiez que Traefik tourne : `docker ps | grep traefik`
2. Vérifiez les labels Traefik dans Portainer
3. Vérifiez les logs Traefik : `docker logs traefik`
4. Vérifiez le DNS : `nslookup alexandre-pommier.com`

### Le build échoue

1. Vérifiez l'accès au repository GitHub
2. Vérifiez que le Dockerfile est présent
3. Vérifiez les logs de build dans Portainer
4. Essayez un build manuel : `docker build -t portfolio-website .`

### Le certificat SSL ne se génère pas

1. Vérifiez que les ports 80 et 443 sont ouverts
2. Vérifiez la configuration du résolveur Let's Encrypt dans Traefik
3. Vérifiez les logs Traefik pour les erreurs ACME

---

## 📞 Support

Si vous rencontrez des problèmes :

1. Consultez les logs du container
2. Vérifiez la documentation Traefik
3. Vérifiez la documentation Portainer
4. Ouvrez une issue sur GitHub

---

Bonne chance avec votre déploiement ! 🚀
