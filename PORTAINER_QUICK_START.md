# 🚀 Déploiement Rapide sur Portainer

## ⚡ Méthode Express (3 minutes)

### 1️⃣ Connectez-vous à Portainer

Ouvrez votre Portainer : `https://votre-portainer.com`

### 2️⃣ Créez une Stack

1. Menu **Stacks** → **+ Add stack**
2. Nom : `portfolio-website`
3. Sélectionnez **"Repository"**

### 3️⃣ Configuration Git

**Pour repository PUBLIC :**
```
Repository URL: https://github.com/kinou-p/portfolio-website
Reference: refs/heads/main
Compose path: docker-compose.yml
Authentication: ❌ Décoché
```

**Pour repository PRIVÉ :**
```
Repository URL: https://github.com/kinou-p/portfolio-website
Reference: refs/heads/main
Compose path: docker-compose.yml
Authentication: ✅ Coché
Username: kinou-p
Token: ghp_votre_token_github
```

**Comment obtenir un token GitHub :**
1. GitHub → Settings → Developer settings → Personal access tokens
2. Generate new token (classic)
3. Cochez `repo` → Generate
4. Copiez le token (commence par `ghp_`)

### 4️⃣ Déployez

Cliquez sur **"Deploy the stack"** → Attendez 2-5 min → C'est fait ! ✅

### 5️⃣ Vérifiez

Allez sur : `https://alexandre-pommier.com` 🎉

---

## 🔄 Mise à jour automatique

### Configurez le Webhook GitHub

1. Dans Portainer : **Stacks** → `portfolio-website` → **Webhooks** → **+ Add webhook**
2. Copiez l'URL générée
3. Sur GitHub : **Settings** → **Webhooks** → **Add webhook**
4. Collez l'URL Portainer
5. Événement : `push`

Maintenant chaque `git push` met à jour automatiquement votre site ! 🚀

---

## 📖 Documentation complète

Voir [PORTAINER_DEPLOYMENT.md](./PORTAINER_DEPLOYMENT.md) pour :
- Guide détaillé étape par étape
- Troubleshooting
- Configuration avancée
- Monitoring et logs

---

## 🆘 Problèmes ?

### Le site ne s'affiche pas

1. Vérifiez les logs : Portainer → **Containers** → `portfolio-website` → **Logs**
2. Vérifiez que Traefik fonctionne : `docker ps | grep traefik`
3. Vérifiez le DNS : `nslookup alexandre-pommier.com`

### Le build échoue

1. Vérifiez l'accès au repository GitHub
2. Vérifiez les logs de build dans Portainer
3. Vérifiez que le Dockerfile existe dans le repo

---

## ✅ Checklist

- [ ] Portainer accessible
- [ ] Réseau `portfolio` créé (`docker network create portfolio`)
- [ ] Traefik configuré et actif
- [ ] Stack créée dans Portainer
- [ ] Site accessible en HTTPS
- [ ] Webhook configuré (optionnel mais recommandé)

---

**Besoin d'aide ?** Consultez la doc complète ou les logs ! 📚
