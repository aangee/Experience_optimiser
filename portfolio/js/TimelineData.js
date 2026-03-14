/**
 * ============================================================
 * TimelineData.js
 * ============================================================
 * Données de la timeline d'apprentissage.
 *
 * Chaque entrée représente une étape clé du parcours.
 * Pour modifier les dates ou ajouter une étape : éditer ce fichier.
 *
 * Champ "date" :
 *   day   → numéro du jour (optionnel, mettre null si inconnu)
 *   month → abréviation 3 lettres : 'jan', 'fév', 'mar', 'avr', 'mai',
 *            'jui', 'jul', 'aoû', 'sep', 'oct', 'nov', 'déc'
 *   year  → année (nombre)
 *   approx → true = affiche un "~" devant la date (date approximative)
 *
 * Champ "demoId" (optionnel) :
 *   Si renseigné, un lien s'affiche pour ouvrir la démo depuis la timeline.
 *   La valeur doit correspondre à un "id" dans ProjectData.js.
 * ============================================================
 */

const TIMELINE = [

  {
    date: { day: null, month: 'avr', year: 2022, approx: true },
    title: 'Le début — Feu d\'artifice',
    desc: 'La toute première démo canvas. Des particules qui explosent là où on clique. C\'est là que tout a commencé.',
    demoId: 'feu-artifice',
    tags: ['particules']
  },

  {
    date: { day: null, month: 'avr', year: 2022, approx: true },
    title: 'Physique — Ressort & Easing',
    desc: 'Forces élastiques, fonctions d\'easing. La physique commence à donner vie aux animations.',
    demoId: 'spring',
    tags: ['physique', 'animation']
  },

  {
    date: { day: null, month: 'avr', year: 2022, approx: true },
    title: 'Vaisseau — Propulsion',
    desc: 'Premier objet piloté au clavier. La physique de poussée et d\'inertie : le pont vers les jeux.',
    demoId: 'ship-truster',
    tags: ['physique', 'jeu']
  },

  {
    date: { day: null, month: 'avr', year: 2022, approx: true },
    title: 'Détection — Maths & Bitmap',
    desc: 'Collisions par calcul de distance, puis par lecture de pixel sur canvas caché. Deux approches très différentes.',
    demoId: 'detection-math',
    tags: ['collision', 'algorithme']
  },

  {
    date: { day: null, month: 'mai', year: 2022, approx: true },
    title: 'Système solaire — Gravité',
    desc: 'Premier essai de simulation : des planètes en orbite avec physique gravitationnelle.',
    demoId: 'solar-v1',
    tags: ['gravité', 'simulation']
  },

  {
    date: { day: null, month: 'mai', year: 2022, approx: true },
    title: 'Fractales — Récursion visible',
    desc: 'Arbres récursifs et space colonization : les algorithmes générés deviennent visuels.',
    demoId: 'fractal-trees',
    tags: ['fractal', 'récursion']
  },

  {
    date: { day: null, month: 'mai', year: 2022, approx: true },
    title: 'Vaisseau v2 — Projet complet',
    desc: 'Tir, astéroïdes, physique complète, propriétés privées ES2022. Le projet le plus avancé de la collection.',
    demoId: 'ship-v02',
    tags: ['jeu', 'ES2022', 'architecture']
  },

  {
    date: { day: null, month: 'mar', year: 2026, approx: false },
    title: 'Portfolio — Ce site',
    desc: 'Mise en valeur de la collection. JS vanilla, iframes lazy-loaded, architecture modulaire.',
    demoId: null,
    tags: ['portfolio', 'architecture']
  },

];
