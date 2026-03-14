/**
 * ============================================================
 * ProjectData.js
 * ============================================================
 * Catalogue de toutes les démos du portfolio.
 *
 * Champ "versions" (optionnel) :
 *   Si présent, le viewer affiche des pills de version dans sa
 *   barre du haut. Chaque version peut avoir ses propres contrôles.
 *   La version par défaut est la dernière du tableau (la plus récente).
 *   iframeSrc et controls au niveau racine = copie de cette dernière version.
 * ============================================================
 */

const PROJECTS = [

  // ──────────────────────────────────────────────────────────
  // PARTICULES
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
    id: 'mouvement',
    name: 'Mouvement',
    category: 'Particules',
    description: 'Les bases du mouvement — accélération, wrapping, rebond et friction. Les briques fondamentales de toute physique 2D.',
    iframeSrc: '../Paticule/01_Acceleration/index.html',
    tags: ['mouvement', 'physique', 'bases'],
    controls: [],
    versions: [
      {
        label: 'Accélération',
        src: '../Paticule/01_Acceleration/index.html',
        controls: []
      },
      {
        label: 'Wrapping',
        src: '../Paticule/04_Wrapping/index.html',
        controls: [
          { key: 'Z / Q / D', desc: 'Propulsion et rotation' }
        ]
      },
      {
        label: 'Rebond',
        src: '../Paticule/07_Bounce/index.html',
        controls: [
          { key: 'Clic souris', desc: 'Relancer l\'animation' }
        ]
      },
      {
        label: 'Friction',
        src: '../Paticule/08_Friction/index.html',
        controls: []
      }
    ],
    phase: 1
  },

  {
    id: 'gravite',
    name: 'Gravité',
    category: 'Particules',
    description: 'La gravité simulée — chute libre puis attraction orbitale entre corps célestes.',
    iframeSrc: '../Paticule/03_Gravity_Orbital/index.html',
    tags: ['gravité', 'physique', 'orbite'],
    controls: [],
    versions: [
      {
        label: 'Simple',
        src: '../Paticule/02_Gravity/index.html',
        controls: []
      },
      {
        label: 'Orbitale',
        src: '../Paticule/03_Gravity_Orbital/index.html',
        controls: []
      }
    ],
    phase: 1
  },

  {
    id: 'cycle-de-vie',
    name: 'Cycle de vie',
    category: 'Particules',
    description: 'Naissance et mort des particules — comment les créer, les supprimer, et les faire renaître.',
    iframeSrc: '../Paticule/06_Regeneration/index.html',
    tags: ['particules', 'cycle', 'gestion'],
    controls: [],
    versions: [
      {
        label: 'Suppression',
        src: '../Paticule/05_Removal/index.html',
        controls: []
      },
      {
        label: 'Régénération',
        src: '../Paticule/06_Regeneration/index.html',
        controls: []
      }
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
    id: 'optimisation',
    name: 'Optimisation',
    category: 'Particules',
    description: 'Des centaines de particules gérées efficacement — ressorts, gravité, interactions massives sans perdre en fluidité.',
    iframeSrc: '../Paticule/10_Optimisation/index.html',
    tags: ['optimisation', 'performance', 'ressort'],
    controls: [
      { key: 'Clic souris',   desc: 'Interagit avec les particules' },
      { key: 'Glisser souris', desc: 'Déplace / attire les particules' }
    ],
    phase: 1
  },

  {
    id: 'tweening',
    name: 'Tweening',
    category: 'Particules',
    description: 'Interpolation et animation fluide — déplacer un objet d\'un point A à un point B de façon contrôlée.',
    iframeSrc: '../Paticule/13_TweeningPart2/index.html',
    tags: ['tweening', 'animation', 'interpolation'],
    controls: [
      { key: 'Clic souris', desc: 'Déplace la cible' }
    ],
    versions: [
      {
        label: 'Part 1',
        src: '../Paticule/13_TweeningPart1/index.html',
        controls: [
          { key: 'Clic souris', desc: 'Déplace la cible' }
        ]
      },
      {
        label: 'Part 2',
        src: '../Paticule/13_TweeningPart2/index.html',
        controls: [
          { key: 'Clic souris',       desc: 'Déplace la cible' },
          { key: 'Shift + Clic',      desc: 'Déplace la cible secondaire' }
        ]
      },
      {
        label: 'Complet',
        src: '../Paticule/11_Tweening/index.html',
        controls: [
          { key: 'Clic souris', desc: 'Lance une animation' }
        ]
      }
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

  // ──────────────────────────────────────────────────────────
  // FRACTALES
  // ──────────────────────────────────────────────────────────

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
  // DÉTECTION
  // ──────────────────────────────────────────────────────────

  {
    id: 'detection',
    name: 'Détection',
    category: 'Détection',
    description: 'Toutes les méthodes de collision — mathématique, bitmap, lignes, points, et raycast. Cinq approches, un même problème.',
    iframeSrc: '../Detection/2D_Detection_Raycast/index.html',
    tags: ['collision', 'mathématiques', 'raycast', 'bitmap'],
    controls: [
      { key: 'Déplacer souris', desc: 'Interagit avec la scène' }
    ],
    versions: [
      {
        label: 'Mathématique',
        src: '../Detection/2D_Detection_Mathematique/index.html',
        controls: [
          { key: 'Déplacer souris', desc: 'Déplace l\'objet de détection' }
        ]
      },
      {
        label: 'Bitmap',
        src: '../Detection/2D_Detection_Bitmap/index.html',
        controls: [
          { key: 'Déplacer souris', desc: 'Teste les collisions en temps réel' }
        ]
      },
      {
        label: 'Ligne à Ligne',
        src: '../Detection/2D_Detection_LineToLine/index.html',
        controls: [
          { key: 'Clic + glisser', desc: 'Dessine une ligne' }
        ]
      },
      {
        label: 'Point à Ligne',
        src: '../Detection/2D_Detection_PointToLine/index.html',
        controls: [
          { key: 'Déplacer souris', desc: 'Déplace le point' },
          { key: 'Clic souris',     desc: 'Ajoute un segment' }
        ]
      },
      {
        label: 'Raycast',
        src: '../Detection/2D_Detection_Raycast/index.html',
        controls: [
          { key: 'Déplacer souris', desc: 'Déplace la source de lumière' }
        ]
      }
    ],
    phase: 1
  },

  // ──────────────────────────────────────────────────────────
  // MINI-JEUX — avec versions
  // ──────────────────────────────────────────────────────────

  {
    id: 'systeme-solaire',
    name: 'Système Solaire',
    category: 'Mini-jeu',
    description: 'Simulation gravitationnelle : des orbites, un joueur, l\'évolution d\'une idée en trois versions.',
    // Dernière version par défaut
    iframeSrc: '../MiniGame/03_SystemSolar_v03/index.html',
    tags: ['gravité', 'orbite', 'simulation'],
    controls: [
      { key: 'Z / Q / D',       desc: 'Déplace le vaisseau' },
      { key: 'Déplacer souris', desc: 'Vise' }
    ],
    versions: [
      {
        label: 'v1',
        src: '../MiniGame/01_SystemSolar_v01/index.html',
        controls: [
          { key: 'Déplacer souris', desc: 'Perturbe le système solaire' }
        ],
        touch: null
      },
      {
        label: 'v2',
        src: '../MiniGame/02_SystemSolar_v02/index.html',
        controls: [
          { key: 'Z / S / Q / D', desc: 'Déplace le vaisseau' },
          { key: 'Déplacer souris', desc: 'Vise' }
        ],
        touch: { dpad: true, fire: false }
      },
      {
        label: 'v3',
        src: '../MiniGame/03_SystemSolar_v03/index.html',
        controls: [
          { key: 'Z / Q / D',       desc: 'Déplace le vaisseau' },
          { key: 'Déplacer souris', desc: 'Vise' }
        ],
        touch: { dpad: true, fire: false }
      }
    ],
    phase: 1
  },

  {
    id: 'vaisseau',
    name: 'Vaisseau',
    category: 'Mini-jeu',
    description: 'De la première propulsion au jeu complet — armement, astéroïdes, physique avancée, ES2022.',
    // Dernière version par défaut — mise à jour 2026-03-14 : v3 optimisée
    iframeSrc: '../MiniGame/06_Ship_v03/index.html',
    tags: ['jeu', 'physique', 'progression'],
    controls: [
      { key: 'Z / S',       desc: 'Propulsion avant / arrière' },
      { key: 'Q / D',       desc: 'Rotation gauche / droite' },
      { key: 'Clic souris', desc: 'Tire' },
      { key: '²',           desc: 'Pause' }
    ],
    versions: [
      {
        label: 'Propulsion',
        src: '../Paticule/14_1_Ship_Truster/index.html',
        controls: [
          { key: 'Z',      desc: 'Propulsion avant' },
          { key: 'S',      desc: 'Propulsion arrière' },
          { key: 'Q / D',  desc: 'Rotation gauche / droite' }
        ],
        touch: { dpad: true, fire: false }
      },
      {
        label: 'Friction',
        src: '../Paticule/14_2_Ship_Friction/index.html',
        controls: [
          { key: 'Z / S',  desc: 'Propulsion avant / arrière' },
          { key: 'Q / D',  desc: 'Rotation gauche / droite' }
        ],
        touch: { dpad: true, fire: false }
      },
      {
        label: 'v1',
        src: '../MiniGame/04_Ship_v01/index.html',
        controls: [
          { key: 'Z / S',       desc: 'Propulsion avant / arrière' },
          { key: 'Q / D',       desc: 'Rotation gauche / droite' },
          { key: 'Clic souris', desc: 'Tire' }
        ],
        touch: { dpad: true, fire: true }
      },
      {
        label: 'v2',
        src: '../MiniGame/05_Ship_v02/index.html',
        controls: [
          { key: 'Z / S',       desc: 'Propulsion avant / arrière' },
          { key: 'Q / D',       desc: 'Rotation gauche / droite' },
          { key: 'Clic souris', desc: 'Tire' },
          { key: '²',           desc: 'Pause' }
        ],
        touch: { dpad: true, fire: true }
      },
      {
        label: 'v3',
        src: '../MiniGame/06_Ship_v03/index.html',
        controls: [
          { key: 'Z / S',       desc: 'Propulsion avant / arrière' },
          { key: 'Q / D',       desc: 'Rotation gauche / droite' },
          { key: 'Clic souris', desc: 'Tire' },
          { key: '²',           desc: 'Pause' }
        ],
        touch: { dpad: true, fire: true }
      }
    ],
    phase: 1
  },

  // ──────────────────────────────────────────────────────────
  // À VENIR
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
