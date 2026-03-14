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
- **Detection/** (5 démos) : collision bitmap, mathématique, line-to-line, raycast
- **Fractal/** (2 démos) : arbres fractals récursifs, space colonization
- **MiniGame/** (5 démos) : système solaire v1→v3, vaisseau v1→v2
- **Pure_JS/** (2 démos) : rappels JS purs, constructeurs, contextes

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

## État du portfolio — session 2026-03-14

### Branch de dev
`claude/add-portfolio-demos-cEtCe` — **12+ commits d'avance sur `main`**, pas encore mergé.
GitHub Pages déploie depuis `main` → les changements ne sont visibles en ligne que si mergés.

### Ce qui est implémenté (portfolio/*)
- `index.html` : page d'accueil galerie + timeline
- `js/ProjectData.js` : catalogue de 9 démos (Particules, Fractales, Détection, Mini-jeux + Athena placeholder)
- `js/Gallery.js` : grille de cards groupées par catégorie, lazy load via IntersectionObserver
- `js/Timeline.js` + `js/TimelineData.js` : frise chronologique avec dates et jalons
- `js/DemoViewer.js` : viewer fullscreen avec modes Jouer / Comprendre, sélecteur de versions (`<select>`)
- `js/TouchControls.js` : contrôles tactiles overlay (D-pad portrait / joystick landscape / bouton tir)
- `css/main.css`, `css/gallery.css`, `css/viewer.css` : styles complets

### Démos avec touch activé
- **Vaisseau** (toutes versions : Propulsion, Friction, v1, v2) → `{ dpad: true, fire: true/false }`
- **Système Solaire v2 et v3** → `{ dpad: true, fire: false }`
- Autres démos : pas de touch (souris/clic seulement)

### Bugs corrigés cette session
1. D-pad ne fonctionnait pas → les démos écoutent sur `document.body`, pas `window`
2. Fix 2 → `KeyboardEvent` créé avec `new iwin.KeyboardEvent(...)` (constructeur de l'iframe) pour compatibilité Safari/iOS
3. Bouton tir fonctionnait dès le départ (dispatche `MouseEvent` sur `document.body` — même cible)

### À tester
- D-pad et joystick sur téléphone après mise à jour GitHub Pages (fix `iwin.KeyboardEvent`)
- Si toujours KO : envisager une approche alternative (ex. stocker state dans l'iframe via `contentWindow.myKeys = {}` + polling dans les démos)

### Prochaines étapes probables
- Merger la branche dans `main` pour déploiement stable
- Phase 3 : mode "Comprendre" (bulles explicatives + code surligné)
