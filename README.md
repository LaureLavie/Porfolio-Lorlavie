# Portfolio / CV — Site interactif de Laure Lavie

<p align="center">
	<img src="./cv_frontend/src/assets/images/laure1.PNG" alt="Avatar Laure" width="160" style="border-radius:50%" />
</p>

Bienvenue dans le dépôt du portfolio/CV de Laure Lavie — une vitrine moderne, responsive et accessible avec une page d'administration minimale pour gérer les contenus (formations, expériences, projets, loisirs, contact).

## 🎨 Identité visuelle

Ce projet utilise une palette chaleureuse et organique inspirée du site :

- Brun profond : `#795A3C`
- Sable doux : `#DAB692` / `#F9E5C6`
- Vert olive : `#436F59`
- Taupe : `#946B47`

Ces couleurs servent de repères visuels pour les boutons et la navigation. Le README reprend les avatars et images présentes dans `cv_frontend/src/assets/images` pour rester cohérent.

## ✨ Aperçu rapide

- Frontend : application React (Vite) dans `cv_frontend/` — pages publiques (Accueil, Formations, Expériences, Projets, Loisirs, Contact) et écran Admin.
- Backend : API Node/Express dans `cv_backend/` — routes pour CRUD des contenus, authentification admin et envoi d'emails de contact.
- Données statiques : `cv_backend/data/*.json` (expériences, formations, projets, loisirs).

## 🚀 Fonctionnalités principales

- Navigation stylée et responsive (palette et boutons arrondis).
- Page administrateur pour créer/éditer/supprimer les items (auth JWT basique).
- Formulaire de contact avec envoi d'email via utilitaire `cv_backend/utils/contactMail.js`.
- Export simple des données via routes d'export.

## 🛠️ Installation locale (Windows PowerShell)

Ouvrez deux terminaux — un pour le backend et un pour le frontend.

1. Backend

```powershell
cd .\cv_backend
npm install
# Créer un fichier .env (voir section Variables d'environnement)
npm run dev
```

2. Frontend

```powershell
cd .\cv_frontend
npm install
npm run dev
```

Après démarrage :

- Frontend disponible par défaut sur http://localhost:5173
- Backend sur http://localhost:3000 (selon configuration)

## 🔐 Variables d'environnement (exemples)

- Pour le backend (`cv_backend/.env`) :

```
PORT=3000
JWT_SECRET=uneClefSecrete
MAIL_USER=adresse@exemple.com
MAIL_PASS=motdepasse
```

Adaptez selon votre fournisseur d'emails pour le module d'envoi (si utilisé).

## 📁 Structure essentielle du dépôt

- `cv_frontend/` — interface utilisateur (React + Vite). Voir `src/components` et `src/pages`.
- `cv_backend/` — API Express, modèles Mongoose (si activés), routes et contrôleurs.
- `cv_backend/data/` — jeux de données JSON utilisés par le backend (ex : `experiences.json`).
- `cv_frontend/src/assets/images/` — avatars, logo et illustrations (utilisés dans le README pour cohérence visuelle).

## 🔗 Routes importantes (backend)

- Auth : `POST /api/auth/login`, `POST /api/auth/register`
- Expériences : `GET /api/experiences`, `POST /api/experiences` (privé)
- Formations : `GET /api/formations`, `POST /api/formations` (privé)
- Projets, Loisirs, Contact : mêmes conventions que ci-dessus
- Export : routes d'export disponibles dans `routes/exportRoutes.js`

Consultez `cv_backend/routes/` pour la liste complète.

## 🧭 Administration

Accès à la zone admin via la page `/admin` du frontend. L'authentification est gérée par JWT ; les helpers et middlewares sont dans `cv_backend/middlewares/auth.js`.

Si vous souhaitez créer un compte administrateur rapidement, regardez le modèle `cv_backend/models/Admin.js` et la route d'inscription `cv_backend/routes/AuthRoutes.js`.

## 🎨 Assets et exemples d'utilisation

Images/avatars utilisés dans le site (exemples) :

- `./cv_frontend/src/assets/images/laure1.PNG` — avatar principal
- `./cv_frontend/src/assets/images/logo.jpg` — logo du site
- `./cv_frontend/src/assets/images/Ellipse2.png` — décor de navigation

Utilisez ces fichiers pour conserver la cohérence graphique si vous modifiez le README ou la documentation.

## 🧪 Tests rapides / smoke test

1. Assurez-vous que le backend est lancé, puis lancez le frontend.
2. Ouvrez le navigateur sur la page d'accueil et vérifiez la navigation (Accueil, Formations, Expériences, Projets, Loisirs, Contact).
3. Testez le formulaire de contact (envoi d'email) et la connexion admin (ou l'inscription si activée).

## 🙋‍♀️ Contribuer

Si vous souhaitez contribuer : fork, créez une branche feature, et proposez une Pull Request. Pour tout changement esthétique, merci de garder la palette et la typographie (Josefin) utilisées dans `cv_frontend/src`.

## 📬 Contact

Pour toute question technique : consultez `cv_backend/controllers/contactController.js` ou envoyez un mail via le formulaire de contact.

---

Merci d'avoir regardé ce projet — ce README reprend la direction artistique du site pour faciliter la cohérence visuelle entre code et présentation.
