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
- `MasterClass.js` : lib partagée avec `Vec2D`, `Particle`, `ParticleVec2D`, `SetupCanvas`, `Utils`
- `MasterCss.css` : styles globaux canvas (fond sombre, titre, panneau info)
- Chaque sous-dossier = une démo autonome (HTML + JS)

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
- Prévoir un emplacement pour les projets futurs (Ship avancé sur Chromebook, angine v2...)

### Voir ROADMAP.md pour le plan détaillé
