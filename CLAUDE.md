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

---

## Projet menu/ — canvas-js-menu (session 2026-03-16)

### Origine
- Repo source : `github.com/aangee/canvas-js-menu`, branche `feat/add-gui/create-interface-inventory`
- Intégré dans `Experience_optimiser/menu/` comme démo autonome du portfolio
- Démo = système de menu/UI **entièrement dessiné sur canvas** (aucun DOM sauf le `<canvas>`)

### Architecture générale

```
menu/
  index.html              ← point d'entrée, charge les scripts dans l'ordre correct
  main.js                 ← instancie AppMenu, lance la boucle animate()
  style.css               ← fond dégradé, canvas centré 80vmin
  js/touchAdapter.js      ← adaptateur touch LOCAL (passive:false + preventDefault)
  js/amath/
    Vec2D.js              ← vecteur 2D (x,y), opérations standard
    Transform.js          ← conteneur {position: Vec2D, size: Vec2D}
  js/ui/
    elements/
      UIElement.js        ← classe de base de tous les composants UI
      extends/
        primitive/
          Canvas.js       ← crée un <canvas> dans le DOM
          Rectangle.js    ← struct {x,y,w,h} simple
          AText.js        ← config texte (font, alignement, colorFont)
        label/Label.js    ← UIElement + texte centré
        button/
          RoundedButton.js  ← UIElement + Label interne
          PianoKeyButton.js ← bouton forme "touche de piano" (non standard)
        panel/
          Panel.js        ← UIElement non-cliquable (fond décoratif)
          StackPanel.js   ← Panel + calculeVerticalStack() / calculeHorizontal()
        text/TextArea.js  ← UIElement + texte multi-lignes avec word-wrap
        toggle/Toggle.js  ← UIElement + case à cocher
    controller/
      MasterHandler.js    ← orchestrateur central (singleton statique)
      LabelHandler.js     ← factory Label / TextArea
      PanelHandler.js     ← factory Panel / StackPanel
      ButtonHandler.js    ← factory RoundedButton / Toggle / PianoKey
  js/menuDemo/            ← démo menu de navigation (HOME / SCORE / OPTION)
    MenuDemo.js           ← crée la navbar + les pages, gère open/close
    controller/PageHandler.js ← switch entre pages (index 0/1/2 ou -1=tout masqué)
    page/
      Page.js             ← classe de base d'une page (panel + label titre + childs[])
      extends/P_Home.js   ← page HOME avec StackPanel de labels et TextArea
      extends/P_Score.js  ← page SCORES avec liste de labels
      extends/P_Option.js ← page OPTIONS avec grille de Toggles (calculeHorizontal)
  js/guiDemo/             ← démo GUI en couches (Layers)
    GUIMaster.js          ← orchestrateur : instancie et délègue aux 3 layers
    layers/
      Layer.js            ← classe de base (name, transform, listUIElement[])
      extends/
        L_Home.js         ← écran d'accueil "PLAY GAME" → ouvre MenuDemo
        L_GUI.js          ← panneau vert en haut à gauche (démo simple)
        L_Inventory.js    ← deux panneaux côte à côte + animation slide
```

### Principe de détection des clics (bitmap hit-testing)

**C'est le mécanisme le plus important à comprendre.**

Deux canvas superposés :
1. `myCanvas` — canvas visible, rendu couleurs normales
2. `hitTestCanvas` — canvas caché (`display:none`), chaque UIElement y est dessiné avec sa propre couleur unique aléatoire (`colorHitArea`)

Au clic :
1. `MasterHandler.onMouseDown(event)` → lit les coordonnées
2. `getColor(hitCtx, position)` → `getImageData(x, y, 1, 1)` → lit la couleur du pixel sous le curseur
3. `isHovering(color)` → cherche dans `elements[]` l'UIElement dont `colorHitArea` correspond
4. Si trouvé → `element.click()` → `options.callback(options.value, element)`

**Pièges** :
- `colorHitArea` est générée aléatoirement à la construction → deux éléments peuvent rarement avoir la même couleur (collision RGB 1/16M)
- Le hitCanvas doit être redessiné chaque frame (`drawElements` appelle `drawHitArea` sur chaque élément actif)
- Les panels (`instanceof Panel`) ne sont PAS dessinés sur le hitCanvas (non-cliquables)
- Les labels des boutons ont `colorHitArea = 'rgba(0,0,0,0)'` → transparents sur le hitCanvas, c'est le bouton parent qui capte le clic

### Touch sur mobile

`menu/js/touchAdapter.js` (LOCAL, ne pas remplacer par `lib/TouchAdapter.js`) :
- Écoute `touchstart` avec **`{ passive: false }`** → permet `e.preventDefault()`
- `preventDefault()` bloque les mouse events natifs du navigateur (~300ms après le touch)
- Sans ça : double déclenchement de `onMouseDown` → comportement aléatoire
- `lib/TouchAdapter.js` utilise `{ passive: true }` → NE PAS l'utiliser ici

### Flux de navigation (cycle PLAY GAME ↔ menu)

```
Démarrage
  └─ AppMenu: mode='gui' (défaut)
       └─ gui.switchLayer('home')  ← montre L_Home avec bouton PLAY GAME

Clic PLAY GAME
  └─ L_Home.clickBtnPlayGame(val)
       ├─ val.setActive(false)     ← cache L_Home
       └─ app.menu.setActive(true) ← ouvre MenuDemo (affiche page HOME)

Dans MenuDemo
  ├─ boutons HOME / SCORE / OPTION → PageHandler.switchPages(0/1/2)
  └─ bouton ❌ CLOSE
       └─ MenuDemo.clickBtnClose(value)
            ├─ value.setActive(false)       ← cache MenuDemo
            └─ app.gui.switchLayer('home')  ← revient à L_Home
```

`app` est une **variable globale** définie dans `main.js`. Les callbacks de boutons (qui perdent le scope `this`) peuvent y accéder directement.

### Ordre de chargement des scripts (CRITIQUE)

Les scripts utilisent `defer` — l'ordre dans `index.html` est l'ordre d'exécution :
1. `touchAdapter.js` (sans defer — exécuté immédiatement)
2. `Vec2D.js`, `Transform.js`
3. Primitives (`Canvas.js`, `Rectangle.js`, `AText.js`)
4. `UIElement.js` (base de tout)
5. Composants (`TextArea`, `Label`, `Toggle`, `RoundedButton`, `PianoKeyButton`, `Panel`, `StackPanel`)
6. Controllers (`MasterHandler`, `LabelHandler`, `PanelHandler`, `ButtonHandler`)
7. Menu demo (`Page`, pages, `PageHandler`, `MenuDemo`)
8. GUI demo (`Layer`, layers, `GUIMaster`)
9. `AppMenu.js`, `main.js`

### Comment ajouter un nouvel UIElement

1. Créer `js/ui/elements/extends/<categorie>/MonElement.js` qui étend `UIElement`
2. Implémenter `draw(ctx)` (visuel) et `drawHitArea(hitCtx)` (zone de détection)
3. Implémenter `click()` et `setActive(bool)`
4. Ajouter un cas dans `MasterHandler.createElement()` (`switch(true)` avec `instanceof`)
5. Optionnel : créer une méthode factory dans le Handler correspondant
6. Ajouter le `<script defer>` dans `index.html` **avant** les controllers

### Bugs connus / pièges à éviter

| Symptôme | Cause probable |
|---|---|
| App complètement blanche, erreur console | Un `Layer.start()` accède à `this.panel` (non existant dans `Layer`) → crash |
| Certains boutons ne répondent pas aux clics | `Canvas.js` manque `willReadFrequently: true` sur hitTestCanvas → Chrome renvoie des pixels GPU périmés depuis un canvas `display:none` |
| Panels en double à l'écran (visuellement) | `Layer.start()` crée un panel de base → chaque layer se retrouve avec 2 panels si son `start()` en crée un aussi. Garder `Layer.start()` vide. |
| Clics ne répondent pas sur mobile | TouchAdapter partagé (`lib/`) utilisé au lieu du local → double events |
| Clic déclenche le mauvais bouton | Collision de `colorHitArea` (1/16M chances) ou canvas non redessiné |
| PLAY GAME ne fait rien après le clic | `clickBtnPlayGame` ne montre pas le menu (oubli `app.menu.setActive(true)`) |
| CLOSE ne ramène pas à l'écran d'accueil | `clickBtnClose` ne rappelle pas `app.gui.switchLayer('home')` |
| Label du bouton non visible | `Label.colorStats` = transparent → normal, c'est voulu (label sans fond) |
| `el.label.setActive` plante | Bouton sans texte → `this.label` undefined → vérifier `if (this.label)` |

### État au 2026-03-16
- ✅ Intégration dans `Experience_optimiser/menu/` (structure, index.html, style.css)
- ✅ Bug `this.panel` corrigé dans L_Home, L_GUI, L_Inventory
- ✅ Cycle PLAY GAME → menu → CLOSE → L_Home opérationnel
- ✅ Touch mobile corrigé (touchAdapter local)
- ✅ Référencé dans `portfolio/js/ProjectData.js` (carte "Système de menus", catégorie Interface)
- ✅ Mode debug supprimé (2026-03-18) — hit canvas caché, canvas principal centré normalement

---

## Comment fonctionne le Mode Comprendre

### Vue d'ensemble

Le bouton "Comprendre" dans le DemoViewer charge une page pédagogique séparée dans l'iframe à la place de la démo brute. Cette page est un **module LearnKit** autonome.

### Logique de chargement (DemoViewer.js)

```
Clic "Comprendre"
  └─ setMode('comprendre')
       └─ learnSrc = version.learnSrc ?? project.learnSrc
            ├─ Si learnSrc trouvé → iframe.src = learnSrc  (module LearnKit)
            └─ Si pas de learnSrc → placeholder "Phase 3" (comportement normal)
```

**Version en priorité** : si la version sélectionnée a son propre `learnSrc`, il est utilisé. Sinon, fallback sur le `learnSrc` de la carte. Sinon, placeholder.

### Pourquoi le placeholder s'affiche

C'est **normal** pour les projets sans module LearnKit. Ce n'est pas un bug. La majorité des cartes affichent le placeholder — seuls feu-artifice et les versions de mouvement ont un vrai module pour l'instant.

### Modules LearnKit existants

| Fichier | Carte | Version |
|---------|-------|---------|
| `learn/feu-artifice/` | Feu d'artifice | (carte entière) |
| `learn/mouvement-acceleration/` | Mouvement | Accélération |
| `learn/mouvement-wrapping/` | Mouvement | Wrapping |
| `learn/mouvement-rebond/` | Mouvement | Rebond |
| `learn/mouvement-friction/` | Mouvement | Friction |

### Ajouter un module LearnKit (checklist)

1. Créer `learn/<nom>/index.html` (copier depuis `learn/feu-artifice/index.html`, changer le titre)
2. Créer `learn/<nom>/demo.js` — exporte une fonction `initDemo(canvas, kit)` qui peuple `kit.demo`
3. Créer `learn/<nom>/steps.js` — exporte `STEPS` (tableau d'étapes, voir format ci-dessous)
4. Ajouter `learnSrc: '../learn/<nom>/index.html'` dans la **version** concernée de `ProjectData.js`
5. Merger la branche sur `main` → GitHub Pages le sert

> ⚠️ Rien n'est visible sur GitHub Pages avant le merge sur `main`.

### Format d'une étape (steps.js)

```js
{
  title:     string,               // titre affiché dans le panneau
  text:      string HTML,          // explication
  code:      string | null,        // bloc de code affiché
  highlight: string | null,        // fragment de ligne à surligner en jaune
  freeze:    bool,                 // geler l'animation pendant cette étape
  target:    { x, y, label } | null, // coordonnées canvas à pointer (SVG)
  onEnter(kit) {},                 // hook appelé à l'entrée de l'étape
  onExit(kit)  {},                 // hook appelé à la sortie
}
```

---

## Importer un nouveau projet dans le portfolio

### Procédure complète

#### Étape 1 — Créer la branche

```bash
git checkout main
git pull origin main
git checkout -b claude/<nom-court>-<ID>
```

#### Étape 2 — Copier les fichiers du projet

Créer un dossier à la racine du repo (ex: `mon-projet/`) et y copier les fichiers.

**Points à vérifier :**
- Les chemins internes fonctionnent depuis ce dossier (pas de chemins absolus)
- Si le projet utilise `lib/MasterClass.js` → chemin relatif `../lib/MasterClass.js`
- Si le projet a son propre système tactile → créer un `touchAdapter.js` local (voir `menu/js/touchAdapter.js`)
- **Ne pas utiliser** `lib/TouchAdapter.js` pour un projet qui utilise `getImageData` → double events

#### Étape 3 — Ajouter la carte dans ProjectData.js

```js
// portfolio/js/ProjectData.js
{
  id: 'mon-projet',
  name: 'Nom affiché',
  category: 'Catégorie',          // Particules | Fractales | Détection | Mini-jeu | Interface | Architecture
  description: 'Description courte.',
  iframeSrc: '../mon-projet/index.html',
  tags: ['tag1', 'tag2'],
  controls: [
    { key: 'Clic souris', desc: 'Description du contrôle' }
  ],
  // Optionnel — si le projet a plusieurs versions :
  versions: [
    { label: 'v1', src: '../mon-projet/index.html?mode=v1', controls: [...] },
    { label: 'v2', src: '../mon-projet/index.html?mode=v2', controls: [...] },
  ],
  // Optionnel — si un module LearnKit existe :
  learnSrc: '../learn/mon-projet/index.html',
  // Optionnel — si le projet est en cours :
  wip: true,
  phase: 1
}
```

#### Étape 4 — Ajouter une entrée dans TimelineData.js (optionnel)

```js
// portfolio/js/TimelineData.js
{
  date: 'Juillet 2022',
  title: 'Nom du projet',
  description: 'Ce que ce projet représente dans la progression.',
  tags: ['tag1'],
  projectId: 'mon-projet'          // doit correspondre à l'id dans ProjectData.js
}
```

#### Étape 5 — Merger

```bash
git add .
git commit -m "feat: import <nom-projet> dans le portfolio"
git push -u origin <branche>
# Créer la PR sur GitHub → merger dans main
```

### Ce qui ne marche PAS sans merge

- GitHub Pages sert uniquement `main` → toute modification est invisible tant qu'elle n'est pas mergée
- Tester en local via `npx serve` ou Live Server VSCode (ouvrir depuis la racine du repo, pas depuis `portfolio/`)

### Projets avec touch mobile

Si le projet doit répondre aux touches sur mobile, deux cas :

| Situation | Solution |
|-----------|----------|
| Projet simple (pas de hit canvas) | Ajouter `<script src="../lib/TouchAdapter.js"></script>` dans le HTML |
| Projet avec hit canvas (getImageData) | Créer un `touchAdapter.js` local avec `{ passive: false }` + `preventDefault()` |

**Pourquoi ?** `lib/TouchAdapter.js` utilise `{ passive: true }` → ne peut pas bloquer les événements souris natifs du navigateur → double déclenchement sur les projets qui lisent les pixels.
