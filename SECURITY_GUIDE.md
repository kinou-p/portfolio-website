# 🔐 Sécurisation du Repository pour Portainer

## ⚖️ Public vs Privé : Que choisir ?

### ✅ **Repository PUBLIC** (Recommandé pour un portfolio)

**Avantages :**
- ✅ Déploiement plus simple (pas d'authentification)
- ✅ Pas de gestion de tokens
- ✅ Bon pour votre CV (montre votre code)
- ✅ Open source = crédibilité

**Points d'attention :**
- ⚠️ Ne JAMAIS commit de secrets (API keys, mots de passe)
- ⚠️ Utiliser des variables d'environnement pour les configs sensibles
- ⚠️ Vérifier le `.gitignore` avant de push

**Fichiers à NE JAMAIS commit :**
```
.env
.env.local
.env.production
secrets/
*.key
*.pem
config/database.yml
```

### 🔒 **Repository PRIVÉ** (Si vous avez du code propriétaire)

**Avantages :**
- 🔒 Code source non visible publiquement
- 🔒 Contrôle d'accès granulaire
- 🔒 Adapté aux projets clients

**Inconvénients :**
- Configuration plus complexe
- Besoin de gérer des tokens/clés SSH

---

## 🔑 **Méthodes d'authentification pour dépôt PRIVÉ**

### **Méthode 1 : Personal Access Token (PAT) - Plus simple**

#### Étape 1 : Créer le token sur GitHub

1. Connectez-vous à GitHub
2. Settings → Developer settings → Personal access tokens → Tokens (classic)
3. **Generate new token (classic)**
4. Configuration :
   - **Note** : `Portainer Portfolio Deploy`
   - **Expiration** : `90 days` ou `No expiration` (moins sécurisé)
   - **Scopes** : Cochez uniquement :
     - ✅ `repo` (Full control of private repositories)
5. **Generate token**
6. ⚠️ **COPIEZ le token immédiatement** (commence par `ghp_`)
   - Vous ne pourrez plus le voir après !

#### Étape 2 : Utiliser le token dans Portainer

1. Dans Portainer : Stacks → + Add stack
2. Repository URL : `https://github.com/kinou-p/portfolio-website`
3. ✅ Cochez **"Authentication"**
4. Remplissez :
   ```
   Username: kinou-p
   Personal Access Token: ghp_xxxxxxxxxxxxxxxxxxxx
   ```

#### Étape 3 : Sécuriser le token

- ⚠️ Ne partagez JAMAIS ce token
- 🔄 Régénérez-le régulièrement (tous les 3 mois)
- 📝 Stockez-le dans un gestionnaire de mots de passe (1Password, Bitwarden)

---

### **Méthode 2 : SSH Deploy Key - Plus sécurisé**

#### Étape 1 : Générer une paire de clés SSH

Sur votre serveur Docker :

```bash
# Générer une clé SSH dédiée
ssh-keygen -t ed25519 -C "portainer-deploy-portfolio" -f ~/.ssh/portainer_portfolio

# NE METTEZ PAS de passphrase (appuyez sur Entrée 2 fois)

# Vérifier que les clés sont créées
ls -la ~/.ssh/portainer_portfolio*
# Vous devez voir :
# portainer_portfolio (clé privée)
# portainer_portfolio.pub (clé publique)
```

#### Étape 2 : Ajouter la clé publique sur GitHub

```bash
# Afficher la clé publique
cat ~/.ssh/portainer_portfolio.pub
```

Copiez la sortie (commence par `ssh-ed25519 AAAAC3...`)

1. Sur GitHub : Repository → **Settings** → **Deploy keys**
2. **Add deploy key**
3. Configuration :
   ```
   Title: Portainer Deploy
   Key: [Collez la clé publique]
   ❌ Allow write access (décoché - read-only suffit)
   ```
4. **Add key**

#### Étape 3 : Utiliser la clé dans Portainer

```bash
# Afficher la clé PRIVÉE
cat ~/.ssh/portainer_portfolio
```

Copiez TOUTE la sortie (de `-----BEGIN OPENSSH PRIVATE KEY-----` jusqu'à `-----END OPENSSH PRIVATE KEY-----`)

1. Dans Portainer : Stacks → + Add stack
2. Repository configuration :
   ```
   Repository URL: git@github.com:kinou-p/portfolio-website.git
   Repository reference: refs/heads/main
   ```
3. ✅ Cochez **"Authentication"**
4. Sélectionnez **"SSH"**
5. Collez la clé privée complète dans le champ

---

## 🔒 **Bonnes pratiques de sécurité**

### **1. Utiliser des variables d'environnement**

Ne jamais commit de secrets dans le code. Utilisez `.env` :

```bash
# .env (NE JAMAIS COMMIT)
GTM_ID=GTM-5V6TCG4C
API_KEY=secret_key_here
DATABASE_URL=postgresql://user:pass@localhost/db
```

Dans Portainer, ajoutez ces variables dans la Stack :
- Stack → Environment variables → + add variable

### **2. Fichier .gitignore robuste**

Assurez-vous que votre `.gitignore` contient :

```gitignore
# Secrets
.env
.env.*
!.env.example
*.key
*.pem
secrets/
credentials/

# Système
.DS_Store
Thumbs.db
desktop.ini

# IDE
.vscode/
.idea/
*.swp
*.swo

# Build
node_modules/
dist/
build/
.cache/

# Logs
*.log
logs/
```

### **3. Vérifier avant de commit**

```bash
# Vérifier ce qui va être commit
git status

# Vérifier qu'aucun secret n'est présent
git diff

# Si vous avez commit un secret par erreur :
# 1. Supprimez-le du code
# 2. Changez le secret (token, API key, etc.)
# 3. Faites un commit correctif
# 4. Le secret restera dans l'historique Git !
#    Utilisez git filter-branch ou BFG Repo-Cleaner pour l'effacer
```

### **4. Rotation des secrets**

- 🔄 Régénérez les tokens tous les 90 jours
- 🔄 Changez les clés SSH si elles sont compromises
- 🔄 Révoquez immédiatement tout token exposé

---

## 🎯 **Recommandation finale**

Pour un **portfolio personnel** comme le vôtre :

### ✅ **Gardez le repository PUBLIC**

**Raisons :**
1. Pas de secrets sensibles (juste un site vitrine)
2. Plus simple à déployer
3. Bon pour votre profil GitHub
4. Permet aux recruteurs de voir votre code

**Configuration sécurisée :**
```
✅ .gitignore complet
✅ Pas de .env committed
✅ Variables d'environnement dans Portainer
✅ Tokens d'API en variables d'environnement seulement
```

### 🔒 **Passez en PRIVÉ seulement si :**
- Vous avez du code propriétaire
- C'est un projet client
- Vous testez des features non prêtes

---

## 📋 **Checklist de sécurité**

Avant de rendre votre repo public :

- [ ] Vérifier `.gitignore` complet
- [ ] Aucun fichier `.env` committed
- [ ] Aucune API key dans le code
- [ ] Pas de mots de passe en dur
- [ ] Pas de tokens GitHub/AWS/etc.
- [ ] Vérifier l'historique Git : `git log -p | grep -i "password\|token\|key"`
- [ ] Supprimer les fichiers sensibles de l'historique si nécessaire
- [ ] Tester le déploiement Portainer

---

## 🆘 **J'ai commit un secret par erreur !**

### 🚨 Action immédiate :

1. **Changez le secret** (régénérez la clé API, token, etc.)
2. **Supprimez-le du code** et commit
3. **Nettoyez l'historique Git** (le secret reste dans l'historique !)

```bash
# Option 1 : BFG Repo-Cleaner (plus simple)
# Téléchargez : https://rtyley.github.io/bfg-repo-cleaner/
java -jar bfg.jar --replace-text secrets.txt  # fichier avec les secrets à remplacer

# Option 2 : git filter-branch (manuel)
git filter-branch --force --index-filter \
  "git rm --cached --ignore-unmatch chemin/vers/fichier" \
  --prune-empty --tag-name-filter cat -- --all

# Force push
git push origin --force --all
```

4. **Notifiez l'équipe** si c'est un projet collaboratif

---

## 📞 **Besoin d'aide ?**

- 📖 [GitHub Personal Access Tokens](https://docs.github.com/en/authentication/keeping-your-account-and-data-secure/creating-a-personal-access-token)
- 📖 [GitHub Deploy Keys](https://docs.github.com/en/developers/overview/managing-deploy-keys)
- 📖 [Git Secrets Scanner](https://github.com/awslabs/git-secrets)

---

Bonne sécurisation ! 🔒✨
