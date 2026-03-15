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
- `lib/MasterClass.js` : lib partagée avec `Vec2D`, `Particle`, `ParticleVec2D`, `SetupCanvas`, `Utils`
- `lib/MasterCss.css` : styles globaux canvas (fond sombre, titre, panneau info)
- `lib/TouchAdapter.js` : gestion tactile partagée
- Chaque sous-dossier = une démo autonome (HTML + JS)
- **Réorg 2026-03-14** : `@_Global_Class/` + `@_Global_Css/` fusionnés en `_lib/`, puis renommé en `lib/` (2026-03-15) pour compatibilité Jekyll/GitHub Pages

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

## État du portfolio — session 2026-03-15

### GitHub Pages
- URL : `https://aangee.github.io/Experience_optimiser/`
- Config : branche `main`, dossier `/ (root)` ✓
- `index.html` racine redirige vers `portfolio/` via `<meta http-equiv="refresh">`
- `.nojekyll` présent à la racine ✓
- `lib/` (ex `_lib/`) servi correctement ✓

### Ce qui est implémenté (portfolio/*)
- `index.html` : navigation par **deux onglets** (Portfolio / Timeline) dans le header
- `js/app.js` : logique de switch onglets (toggle `.hidden`)
- `js/ProjectData.js` : **15 entrées** (Particules, Fractales, Détection, Mini-jeux + Athena placeholder)
- `js/Gallery.js` : grille de cards avec badge `🕹` sur les cartes qui ont des contrôles
- `js/Timeline.js` + `js/TimelineData.js` : frise chronologique
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

### Module LearnKit — learn/
Moteur pédagogique "Mode Comprendre" créé en 2026-03-15 :
- `learn/engine/LearnKit.js` : classe `LearnKit` (steps, navigation, SVG annotations, freeze, code highlight)
- `learn/engine/LearnKit.css` : layout deux colonnes (canvas gauche / panneau droite), responsive mobile
- `learn/feu-artifice/` : première démo pédagogique (6 étapes, feu d'artifice)
- `learn/mouvement/` : deuxième démo pédagogique (6 étapes, vélocité / gravité / rebond / friction)

#### Architecture cible (DÉCISION LONG TERME — ne pas condenser)

> **Règle** : chaque version d'un projet a son propre dossier `learn/` et son propre `learnSrc`.
> Un seul `learnSrc` par carte = mauvaise idée → le sélecteur de versions devient inutile en mode Comprendre.

Structure ProjectData.js cible :
```js
{
  name: 'Mouvement',
  versions: [
    { label: 'Vélocité',  src: '../Paticule/01_.../v1/', learnSrc: '../learn/mouvement-velocite/index.html' },
    { label: 'Gravité',   src: '../Paticule/01_.../v2/', learnSrc: '../learn/mouvement-gravite/index.html' },
    { label: 'Rebond',    src: '../Paticule/01_.../v3/', learnSrc: '../learn/mouvement-rebond/index.html' },
    { label: 'Friction',  src: '../Paticule/01_.../v4/', learnSrc: '../learn/mouvement-friction/index.html' },
  ]
}
```

Structure `learn/` cible :
```
learn/
  engine/           ← moteur générique partagé (ne pas dupliquer)
  feu-artifice/     ← 1 dossier = 1 version = 1 concept
  mouvement-velocite/
  mouvement-gravite/
  mouvement-rebond/
  mouvement-friction/
  ...
```

DemoViewer : en mode Comprendre, le sélecteur charge `version.learnSrc` (même logique que Jouer).
**État actuel (transitoire)** : `learnSrc` au niveau carte, sélecteur caché en mode Comprendre.

#### Ajouter un module LearnKit — checklist
1. Créer `learn/<nom>/index.html` (copier feu-artifice, changer titre)
2. Créer `learn/<nom>/demo.js` — exporte `initDemo(canvas, kit)`, peuple `kit.demo`
3. Créer `learn/<nom>/steps.js` — exporte `STEPS` (tableau d'objets étapes)
4. Ajouter `learnSrc: '../learn/<nom>/index.html'` dans la **version** concernée de ProjectData.js
5. **Merger la branche dans `main`** — GitHub Pages sert `main`, rien n'est visible avant le merge

#### Bugs connus / pièges
- Si le bouton "Comprendre" montre le placeholder Phase 3 → vérifier d'abord si la branche est mergée
- Si `learnSrc` pointe vers un fichier supprimé → DemoViewer échoue silencieusement (404)
- Si `freeze: true` ne gèle pas → vérifier que `demo.js` lit bien `if (!kit.frozen)` dans la boucle
- Paths `learnSrc` sont relatifs à `portfolio/` : `'../learn/<nom>/index.html'`

### Format d'un step LearnKit
```js
{
  title:    string,
  text:     string HTML,
  code:     string | null,       // bloc de code affiché dans le panneau
  highlight: string | null,      // fragment de ligne à surligner en jaune
  freeze:   bool,                // geler l'animation pendant cette étape
  target:   { x, y, label } | null,  // coordonnées canvas à pointer (SVG)
  onEnter(kit) {},
  onExit(kit)  {},
}
```

### Prochaines étapes
- Ajouter d'autres modules `learn/` (spring, easing, fractal-trees...)
- **Nouveaux contenus** : aangee va fouiller ses machines locales pour ajouter de nouvelles expériences
