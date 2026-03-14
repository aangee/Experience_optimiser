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
 * ============================================================
 */

const PROJECTS = [

  // ──────────────────────────────────────────────────────────
  // PHASE 1 — Démos visibles maintenant
  // ──────────────────────────────────────────────────────────

  {
    id: 'feu-artifice',           // identifiant unique (utilisé en interne)
    name: 'Feu d\'artifice',      // nom affiché sur la carte
    category: 'Particules',       // catégorie (affiché en petit au-dessus du titre)
    description: 'La toute première démo — des particules explosent là où tu cliques.',
    iframeSrc: '../Paticule/00_Simple_Feu_Artifice/index.html', // chemin vers la démo
    tags: ['particules', 'interaction', 'origine'],             // mots-clés affichés
    phase: 1  // phase: 1 = visible | 2+ = "bientôt"
  },

  {
    id: 'spring',
    name: 'Ressort',
    category: 'Particules',
    description: 'Force de rappel élastique — une particule reliée à ta souris par un ressort virtuel.',
    iframeSrc: '../Paticule/09_Spring/index.html',
    tags: ['physique', 'ressort', 'interaction'],
    phase: 1
  },

  {
    id: 'space-colonization',
    name: 'Space Colonization',
    category: 'Fractales',
    description: 'Un arbre qui pousse vers des points de lumière — algorithme de colonisation de l\'espace.',
    iframeSrc: '../Fractal/Space_Colonization/index.html',
    tags: ['fractal', 'algorithme', 'génératif'],
    phase: 1
  },

  // ──────────────────────────────────────────────────────────
  // PHASE 2 — Démos à venir (affichées en "bientôt")
  // ──────────────────────────────────────────────────────────

  {
    id: 'fractal-trees',
    name: 'Arbres Fractals',
    category: 'Fractales',
    description: 'Arbres récursifs — Pythagorean tree, IFS, animations.',
    iframeSrc: '../Fractal/Fractal_Trees/index.html',
    tags: ['fractal', 'récursion'],
    phase: 2
  },

  {
    id: 'easing',
    name: 'Easing',
    category: 'Particules',
    description: 'Fonctions d\'easing — accélération et décélération non-linéaires.',
    iframeSrc: '../Paticule/12_Easing/index.html',
    tags: ['tweening', 'animation'],
    phase: 2
  },

  {
    id: 'ship-v02',
    name: 'Vaisseau v2',
    category: 'Mini-jeu',
    description: 'Jeu de vaisseau spatial — armement, astéroïdes, physique complète.',
    iframeSrc: '../MiniGame/05_Ship_v02/index.html',
    tags: ['jeu', 'physique', 'ES2022'],
    phase: 2
  },

  {
    id: 'bitmap-detection',
    name: 'Détection Bitmap',
    category: 'Détection',
    description: 'Collisions via lecture pixel — chaque objet a une couleur unique sur un canvas caché.',
    iframeSrc: '../Detection/2D_Detection_Bitmap/index.html',
    tags: ['collision', 'bitmap', 'créatif'],
    phase: 2
  },

];
