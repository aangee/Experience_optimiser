/**
 * ============================================================
 * ProjectData.js
 * ============================================================
 * Ce fichier contient la liste de toutes les démos du portfolio.
 *
 * C'est le "catalogue" — comme une bibliothèque où chaque livre
 * a une fiche avec son titre, sa description, et où le trouver.
 *
 * Pour ajouter une nouvelle démo plus tard, il suffit d'ajouter
 * un bloc { ... } dans le tableau PROJECTS ci-dessous.
 *
 * Champ "controls" : tableau de { key, desc } affiché dans le
 * bandeau de contrôles du viewer (mode Jouer).
 *   key  → touche ou action (ex: "Clic souris", "Z", "Espace")
 *   desc → ce que ça fait  (ex: "Explosion de particules")
 * ============================================================
 */

const PROJECTS = [

  // ──────────────────────────────────────────────────────────
  // PHASE 1 — Démos visibles maintenant
  // ──────────────────────────────────────────────────────────

  {
    id: 'feu-artifice',
    name: 'Feu d\'artifice',
    category: 'Particules',
    description: 'La toute première démo — des particules explosent là où tu cliques.',
    iframeSrc: '../Paticule/00_Simple_Feu_Artifice/index.html',
    tags: ['particules', 'interaction', 'origine'],
    controls: [
      { key: 'Clic souris', desc: 'Explosion de particules' }
    ],
    phase: 1
  },

  {
    id: 'spring',
    name: 'Ressort',
    category: 'Particules',
    description: 'Force de rappel élastique — une particule reliée à ta souris par un ressort virtuel.',
    iframeSrc: '../Paticule/09_Spring/index.html',
    tags: ['physique', 'ressort', 'interaction'],
    controls: [
      { key: 'Déplacer souris', desc: 'Étire le ressort' },
      { key: 'Clic souris',     desc: 'Accroche / lâche la particule' }
    ],
    phase: 1
  },

  {
    id: 'space-colonization',
    name: 'Space Colonization',
    category: 'Fractales',
    description: 'Un arbre qui pousse vers des points de lumière — algorithme de colonisation de l\'espace.',
    iframeSrc: '../Fractal/Space_Colonization/index.html',
    tags: ['fractal', 'algorithme', 'génératif'],
    controls: [
      { key: 'Déplacer souris', desc: 'Guide la croissance de l\'arbre' }
    ],
    phase: 1
  },

  {
    id: 'easing',
    name: 'Easing',
    category: 'Particules',
    description: 'Fonctions d\'easing — accélération et décélération non-linéaires qui donnent de la vie aux animations.',
    iframeSrc: '../Paticule/12_Easing/index.html',
    tags: ['tweening', 'animation', 'mathématiques'],
    controls: [
      { key: 'Clic souris', desc: 'Lance une nouvelle animation' }
    ],
    phase: 1
  },

  {
    id: 'fractal-trees',
    name: 'Arbres Fractals',
    category: 'Fractales',
    description: 'Arbres récursifs — chaque branche se divise en deux, à l\'infini. La récursion rendue visible.',
    iframeSrc: '../Fractal/Fractal_Trees/index.html',
    tags: ['fractal', 'récursion', 'génératif'],
    controls: [
      { key: 'Déplacer souris', desc: 'Modifie l\'angle des branches' }
    ],
    phase: 1
  },

  // ──────────────────────────────────────────────────────────
  // PHASE 2 — Démos intégrées
  // ──────────────────────────────────────────────────────────

  {
    id: 'ship-truster',
    name: 'Vaisseau — Propulsion',
    category: 'Particules',
    description: 'Pont vers les jeux — un vaisseau piloté au clavier avec une physique de poussée et d\'inertie.',
    iframeSrc: '../Paticule/14_1_Ship_Truster/index.html',
    tags: ['physique', 'clavier', 'jeu'],
    controls: [
      { key: 'Z',   desc: 'Propulsion avant' },
      { key: 'S',   desc: 'Propulsion arrière' },
      { key: 'Q / D', desc: 'Rotation gauche / droite' }
    ],
    phase: 1
  },

  {
    id: 'detection-math',
    name: 'Détection Mathématique',
    category: 'Détection',
    description: 'Collisions cercle-cercle par la distance — simple, élégant, et c\'est comme ça que ça marche dans tous les jeux.',
    iframeSrc: '../Detection/2D_Detection_Mathematique/index.html',
    tags: ['collision', 'mathématiques', 'géométrie'],
    controls: [
      { key: 'Déplacer souris', desc: 'Déplace l\'objet de détection' }
    ],
    phase: 1
  },

  {
    id: 'solar-v1',
    name: 'Système Solaire v1',
    category: 'Mini-jeu',
    description: 'Premier essai de "jeu" — des planètes en orbite, la physique gravitationnelle en action.',
    iframeSrc: '../MiniGame/01_SystemSolar_v01/index.html',
    tags: ['gravité', 'orbite', 'simulation'],
    controls: [
      { key: 'Déplacer souris', desc: 'Perturbe le système' }
    ],
    phase: 1
  },

  {
    id: 'ship-v02',
    name: 'Vaisseau v2',
    category: 'Mini-jeu',
    description: 'Jeu de vaisseau spatial — armement, astéroïdes, physique complète. Le projet le plus avancé.',
    iframeSrc: '../MiniGame/05_Ship_v02/index.html',
    tags: ['jeu', 'physique', 'ES2022'],
    controls: [
      { key: 'Z / S',       desc: 'Propulsion avant / arrière' },
      { key: 'Q / D',       desc: 'Rotation gauche / droite' },
      { key: 'Clic souris', desc: 'Tire' },
      { key: '²',           desc: 'Pause' }
    ],
    phase: 1
  },

  {
    id: 'bitmap-detection',
    name: 'Détection Bitmap',
    category: 'Détection',
    description: 'Collisions via lecture pixel — chaque objet a une couleur unique sur un canvas caché.',
    iframeSrc: '../Detection/2D_Detection_Bitmap/index.html',
    tags: ['collision', 'bitmap', 'créatif'],
    controls: [
      { key: 'Déplacer souris', desc: 'Teste les collisions en temps réel' }
    ],
    phase: 1
  },

  // ──────────────────────────────────────────────────────────
  // PHASE 3 — Projets futurs (emplacements réservés)
  // ──────────────────────────────────────────────────────────

  {
    id: 'athena',
    name: 'Athena — moteur ECS',
    category: 'Architecture',
    description: 'Un mini moteur de jeu Unity-like en JS vanilla — ECS, gestion de scènes, collisions bitmap sur canvas dédié.',
    iframeSrc: '',
    tags: ['ECS', 'architecture', 'moteur', 'avancé'],
    controls: [],
    phase: 3
  },

];
