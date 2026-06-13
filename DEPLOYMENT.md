# 🚀 Guide de Déploiement - Artemis Marketing

Ce guide vous explique comment déployer le site Artemis Marketing sur GitHub et Cloudflare Pages.

## 📋 Prérequis

- Compte GitHub
- Compte Cloudflare
- Git installé localement
- Node.js et npm

## 🐙 1. Déploiement sur GitHub

### Créer le repository GitHub

1. **Aller sur GitHub.com** et se connecter
2. **Cliquer sur "New repository"**
3. **Nom du repository** : `artemis-marketing`
4. **Description** : `Consulting & IT Development Services Website`
5. **Visibilité** : Public ou Private selon votre préférence
6. **Ne pas** initialiser avec README (le projet en a déjà un)
7. **Cliquer sur "Create repository"**

### Pousser le code sur GitHub

Le repository git est déjà initialisé. Exécutez ces commandes :

```bash
# Ajouter l'origine GitHub (remplacer [username] par votre nom d'utilisateur)
git remote add origin https://github.com/[username]/artemis-marketing.git

# Pousser le code
git push -u origin main
```

## ☁️ 2. Déploiement sur Cloudflare Pages

### Configuration Cloudflare Pages

1. **Se connecter à Cloudflare Dashboard**
2. **Aller dans "Pages"** dans le menu de gauche
3. **Cliquer sur "Create a project"**
4. **Sélectionner "Connect to Git"**
5. **Autoriser Cloudflare** à accéder à votre GitHub
6. **Sélectionner le repository** `artemis-marketing`
7. **Configuration du build** :
   - **Project name** : `artemis-marketing`
   - **Production branch** : `main`
   - **Build command** : `npm run build`
   - **Build output directory** : `build`
   - **Root directory** : `/` (par défaut)

### Variables d'environnement (optionnel)

Si vous avez des variables d'environnement :
1. Dans les paramètres du projet Cloudflare Pages
2. Aller dans "Environment variables"
3. Ajouter vos variables si nécessaire

### Déploiement automatique

- **Déploiement automatique** : Activé par défaut
- À chaque push sur `main`, Cloudflare redéploiera automatiquement
- Les URLs de preview sont créées pour les branches de développement

## 🔧 3. Configuration Post-Déploiement

### Domaine personnalisé (optionnel)

1. **Dans Cloudflare Pages** : Aller dans "Custom domains"
2. **Ajouter votre domaine** (ex: artemis-marketing.com)
3. **Configurer les DNS** selon les instructions Cloudflare

### SSL/TLS

- SSL est automatiquement configuré par Cloudflare
- Certificat SSL gratuit inclus

### Performance & Sécurité

Cloudflare Pages inclut automatiquement :
- ✅ CDN global
- ✅ Compression Brotli/Gzip
- ✅ Minification automatique
- ✅ Protection DDoS
- ✅ Analytics de base

## 🛠 4. Maintenance & Mises à jour

### Workflow de développement

```bash
# Développement local
npm start              # Lancer le serveur de développement

# Tester le build de production
npm run build         # Créer le build de production
npm install -g serve  # Installer serve globalement
serve -s build        # Tester le build localement

# Déployer les changements
git add .
git commit -m "Description des changements"
git push origin main  # Déploie automatiquement sur Cloudflare
```

### Monitoring

1. **Cloudflare Analytics** : Disponible dans le dashboard
2. **Logs de build** : Visibles dans la section "Deployments"
3. **Erreurs** : Consultables dans les logs Cloudflare

## 🚨 5. Dépannage

### Erreurs de build communes

**Error: Command failed: npm run build**
```bash
# Solution : Vérifier les dépendances
npm install --legacy-peer-deps
npm run build
```

**Routes React non trouvées (404)**
- Vérifier que le fichier `public/_redirects` existe
- Contenu : `/*    /index.html   200`

### Performance

**Bundle trop volumineux**
```bash
# Analyser les dépendances
npm install -g webpack-bundle-analyzer
npx webpack-bundle-analyzer build/static/js/*.js
```

## 📊 6. URLs Importantes

Après déploiement, vous aurez accès à :

- **URL de production** : `https://artemis-marketing.pages.dev`
- **URLs de preview** : `https://[commit-hash].artemis-marketing.pages.dev`
- **Dashboard Cloudflare** : https://dash.cloudflare.com/

## ✅ Checklist de Déploiement

- [ ] Code pushé sur GitHub
- [ ] Repository connecté à Cloudflare Pages
- [ ] Configuration de build correcte
- [ ] Premier déploiement réussi
- [ ] Site accessible à l'URL Cloudflare
- [ ] Toutes les pages fonctionnent
- [ ] Formulaires de contact fonctionnels
- [ ] Responsive design vérifié
- [ ] Performance testée (PageSpeed Insights)

## 🔗 Ressources Utiles

- [Documentation Cloudflare Pages](https://developers.cloudflare.com/pages/)
- [Create React App Deployment](https://create-react-app.dev/docs/deployment/)
- [GitHub Pages vs Cloudflare Pages](https://pages.cloudflare.com/)

---

**🎉 Félicitations ! Votre site Artemis Marketing est maintenant déployé !**
