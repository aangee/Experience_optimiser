# CLAUDE.md — Contexte session aangee × Experience_optimiser

> Fichier de contexte pour Nysa (Claude Code). Lire en début de session pour reprendre sans tout réexpliquer.

---

## Qui est aangee

- Développeur autodidacte, apprend JS depuis plusieurs années
- Pense en **systèmes** : infrastructure partagée, réutilisabilité, architecture propre
- Deux machines : **DESKTOP-TROOPER** (PC principal, Windows 10, `I:\All_Projets\`) et **Pokéball** (portable HP, Windows 11, `F:\PROJECTS\`)
- A un fils de 10 ans (utilise Blender et Scratch/visual scripting)
- Gère sa mémoire de session via **nysa-atlas** (repo GitHub privé, hub de contexte Nysa ↔ aangee)

## Projets connus

| Projet | Repo | Description | État |
|--------|------|-------------|------|
| Experience_optimiser | github.com/aangee/Experience_optimiser | 30+ démos canvas/physique JS, projet d'apprentissage | Complet |
| angine_js_v01 (Athena) | github.com/aangee/angine_js_v01 | Mini moteur ECS Unity-like en JS (jeu spatial) | Partiel, branches `refactor/add-manager` + `menu` |
| portfolio_projets | github.com/aangee/portfolio_projets | Ancienne tentative de site portfolio | Squelette abandonné |
| nysa-atlas | github.com/aangee/nysa-atlas (privé) | Hub mémoire Nysa ↔ aangee, context + guides + roadmap | Actif |
| HaccpOpsCore | local | App HACCP avec OCR (Google ML Kit / Tesseract.js) | MVP stable |
| AutoDocV1Light | github.com/aangee/AutoDocV1Light | Semi-autoDoc pour bateau, C# | 2023 |
| nysa-launcher | `F:\tools\nysa-desktop-session\` | Extension VSCode pour lancer sessions Nysa | Fonctionnel |

## Analyse de Experience_optimiser

### Architecture
- `_lib/MasterClass.js` : lib partagée avec `Vec2D`, `Particle`, `ParticleVec2D`, `SetupCanvas`, `Utils`
- `_lib/MasterCss.css` : styles globaux canvas (fond sombre, titre, panneau info)
- Chaque sous-dossier = une démo autonome (HTML + JS)
- **Réorg 2026-03-14** : `@_Global_Class/` + `@_Global_Css/` fusionnés en `_lib/` (19 HTML mis à jour)

### Contenu des démos
- **Paticule/** (18 démos) : physique particules, tweening, easing, friction, ressorts, gravité
- **Detection/** (5 démos) : collision bitmap, mathématique, line-to-line, point-to-line, raycast
- **Fractal/** (2 démos) : arbres fractals récursifs (5 algos dans 1 démo), space colonization
- **MiniGame/** (6 démos) : système solaire v1→v3, vaisseau v1→v2→v3
- **Pure_JS/** : `rappel/appel_function/` (démo avec index.html), `object/function/` (brouillon JS sans HTML, pas affichable)

### Note sur Fractal_Trees
La démo contient **5 algorithmes** sélectionnables via boutons : `f_Ifs`, `f_PyTree`, `f_PyTree_Anim`, `f_Tree`, `f_Tree_Anim`. Pas de démos cachées ailleurs dans le repo — aangee prévoit d'ajouter de nouvelles expériences (algo colonisation, etc.) depuis ses machines locales.

### Points forts du code
- MasterClass.js bien conçu, réutilisable
- Utils propre (`lerp`, `map`, `clamp`, Bézier...)
- Ship_v02 : propriétés privées ES2022, composition, 3 canvas séparés
- Détection bitmap créative (getImageData + globalCompositeOperation)

### Points d'amélioration identifiés
- Pas de deltatime → physique dépend du FPS
- Duplication Particle / ParticleVec2D
- Variables globales dans les main.js de jeux
- Magic numbers non documentés (friction: 0.86, 0.9975...)
- SetupCanvas ne gère pas le redimensionnement fenêtre

## Analyse de angine_js_v01 (Athena)

Architecture **ECS Unity-like** complète :

```
Athena (orchestrateur principal)
├── MasterManager
│   ├── FactoryManager → PlayerFactory, ShipFactory, SolarSystemFactory
│   └── GameManager → createPlayer(), createSolarSystem()
├── Service (4 canvas superposés)
│   ├── MAP        (monde 2000×2000)
│   ├── CAMERA     (vue joueur centré)
│   ├── BROADCAST  (HUD / texte debug)
│   └── HIT        (collisions bitmap, couleurs uniques)
├── Pattern Command (inputs clavier encapsulés)
└── ResourcesLoader (préchargement images/audio)
```

Classes core : `GameObject`, `Component`, `Transform`, `Vec2D`
Entités : `Player`, `Ship`, `Planet`, `SolarSystem`
Composants : `Renderer`, `ShipRenderer`, `PlanetRender`, `BitmapCollider`
Physique : `Engin` (vélocité, friction, gravité, ressorts), `Thruster`

**BitmapCollider** : chaque objet a une couleur RGB unique → dessinée sur canvas HIT invisible → collision = lecture pixel sous le vaisseau.

---

## Projet en cours : Nouveau Portfolio

### Vision
Fusionner `Experience_optimiser` + `angine_js_v01` en un **site portfolio moderne** qui raconte la courbe d'apprentissage d'aangee.

### Audience
- **Aujourd'hui** : fils de 10 ans (joueur, curieux, Scratch/Blender)
- **Demain** : lui-même pour archiver, éventuellement recruteurs/curieux

### Deux modes d'exploration par démo
1. **Mode Jouer** — démo brute, bandeau discret avec contrôles disponibles
2. **Mode Comprendre** — même démo + bulles explicatives sur les interactions, panneau code surligné

### Style
- Sobre, fond sombre (cohérent avec l'esthétique canvas existante)
- Animations légères (hover souris, transitions)
- Pas de framework lourd — JS vanilla ou léger

### Décisions prises
- Repartir de zéro (ne pas récupérer portfolio_projets)
- Garder les démos existantes comme contenu, ne pas les réécrire
- Portfolio intégré dans `Experience_optimiser` (dossier `portfolio/`), déployé via GitHub Pages
- Prévoir un emplacement pour les projets futurs (Ship avancé sur Chromebook, angine v2...)

### État d'avancement (2026-03-14)
- **Phase 1 terminée** : squelette `portfolio/` mergé sur `main`
  - `portfolio/index.html` + `css/` (main, gallery, viewer) + `js/` (app, Gallery, DemoViewer, ProjectData)
  - 3 démos référencées dans ProjectData.js
  - GitHub Pages : activer depuis Settings → Pages → dossier `/portfolio`
- **Phase 2** : DemoViewer + modes Jouer/Comprendre — à faire

### Workflow Git (Claude Code)
- Chaque session crée une branche `claude/...`
- Merger via PR sur GitHub → `main`
- Ne pas travailler directement sur `main` (push refusé par le système)

### Voir ROADMAP.md pour le plan détaillé

---

## État du portfolio — session 2026-03-14 (soir)

### Branche de dev active
`claude/fix-dpad-touch-mobile-75QDf` — plusieurs commits, pas encore mergé dans `main`.
GitHub Pages déploie depuis `main` → merger via PR pour que les changements soient visibles.

### Ce qui est implémenté (portfolio/*)
- `index.html` : navigation par **deux onglets** (Portfolio / Timeline) dans le header
- `js/app.js` : logique de switch onglets (toggle `.hidden`)
- `js/ProjectData.js` : **15 entrées** (Particules, Fractales, Détection, Mini-jeux + Athena placeholder)
- `js/Gallery.js` : grille de cards avec badge `🕹` sur les cartes qui ont des contrôles
- `js/Timeline.js` + `js/TimelineData.js` : frise chronologique, mise à jour avec Ship v3 et nouveaux jalons
- `js/DemoViewer.js` : viewer fullscreen, modes Jouer / Comprendre, sélecteur de versions
- `js/TouchControls.js` : contrôles tactiles (D-pad / joystick / bouton tir)
- `css/main.css`, `css/gallery.css`, `css/viewer.css` : styles complets

### Structure des cartes dans ProjectData.js
| Catégorie | Cartes | Versions |
|-----------|--------|----------|
| Particules | Feu d'artifice, Mouvement, Gravité, Cycle de vie, Ressort, Optimisation, Tweening, Easing | Oui pour Mouvement, Gravité, Cycle de vie, Tweening |
| Fractales | Space Colonization, Fractal Trees | Non |
| Détection | Détection (fusionnée) | Oui : Mathématique, Bitmap, Ligne à Ligne, Point à Ligne, Raycast |
| Mini-jeu | Système Solaire, Vaisseau | Oui : v1→v3 pour les deux |
| Architecture | Athena (placeholder) | Non |

### Démos avec touch activé
- **Vaisseau** (Propulsion, Friction, v1, v2, v3) → `{ dpad: true, fire: true/false }`
- **Système Solaire v2 et v3** → `{ dpad: true, fire: false }`

### Ship v03 — MiniGame/06_Ship_v03/
Créé lors de cette session, 5 bugs corrigés par rapport à v02 :
1. `beginPath()` manquant avant `rect()` → path s'accumulait frame par frame
2. `getImageData` appelé 2× par frame → réduit à 1 seul appel
3. `new AudioSource()` à chaque tir → instance unique réutilisée (`this.shootSound`)
4. 50 étoiles redessinées chaque frame → canvas offscreen statique + `drawImage()`
5. Bug angle astéroïdes : conversion degrés/radians incorrecte supprimée
6. Bug caméra : `isVueFollow = false` + worldCanvas remis à taille écran (évite le décalage astéroïdes/ship)

### Prochaines étapes
- **Merger** `claude/fix-dpad-touch-mobile-75QDf` dans `main` via PR GitHub
- **Nouveaux contenus** : aangee va fouiller ses machines locales pour ajouter de nouvelles expériences fractales / colonisation
- **Phase 3** : mode "Comprendre" (bulles explicatives + code surligné)
