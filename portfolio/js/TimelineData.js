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
 *
 * Champ "versionLabel" (optionnel) :
 *   Si renseigné en même temps que demoId, "voir la démo" ouvre
 *   directement cette version dans le viewer.
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
    title: 'Mouvement, gravité, cycle de vie',
    desc: 'Les briques fondamentales : accélération, wrapping, rebond, friction, gravité, naissance et mort des particules.',
    demoId: 'mouvement',
    tags: ['physique', 'particules']
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
    title: 'Tweening — interpolation contrôlée',
    desc: 'Déplacer un objet d\'un point A à un point B de façon fluide et paramétrable. Trois versions progressives.',
    demoId: 'tweening',
    tags: ['tweening', 'animation']
  },

  {
    date: { day: null, month: 'avr', year: 2022, approx: true },
    title: 'Vaisseau — Propulsion',
    desc: 'Premier objet piloté au clavier. Vecteur de poussée, inertie, rotation. La physique devient jouable.',
    demoId: 'vaisseau',
    versionLabel: 'Propulsion',
    tags: ['physique', 'jeu']
  },

  {
    date: { day: null, month: 'avr', year: 2022, approx: true },
    title: 'Vaisseau — Friction',
    desc: 'La résistance de l\'espace. Même moteur, mais la vélocité s\'amortit progressivement — plus réaliste.',
    demoId: 'vaisseau',
    versionLabel: 'Friction',
    tags: ['physique']
  },

  {
    date: { day: null, month: 'avr', year: 2022, approx: true },
    title: 'Détection — 5 méthodes',
    desc: 'Mathématique, bitmap, ligne à ligne, point à ligne, raycast. Cinq façons de détecter une collision.',
    demoId: 'detection',
    tags: ['collision', 'algorithme']
  },

  {
    date: { day: null, month: 'mai', year: 2022, approx: true },
    title: 'Système Solaire — v1',
    desc: 'Première simulation gravitationnelle : des planètes en orbite autour d\'un soleil. Pas encore de joueur.',
    demoId: 'systeme-solaire',
    versionLabel: 'v1',
    tags: ['gravité', 'simulation']
  },

  {
    date: { day: null, month: 'mai', year: 2022, approx: true },
    title: 'Système Solaire — v2',
    desc: 'Un vaisseau pilotable entre dans la simulation. Le joueur peut interagir avec le système gravitationnel.',
    demoId: 'systeme-solaire',
    versionLabel: 'v2',
    tags: ['gravité', 'jeu']
  },

  {
    date: { day: null, month: 'mai', year: 2022, approx: true },
    title: 'Système Solaire — v3',
    desc: 'Version épurée et équilibrée : orbites stables, pilotage fluide, esthétique soignée.',
    demoId: 'systeme-solaire',
    versionLabel: 'v3',
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
    title: 'Vaisseau — v1',
    desc: 'Premier jeu complet : armement, cibles, souris pour viser. La boucle de jeu prend forme.',
    demoId: 'vaisseau',
    versionLabel: 'v1',
    tags: ['jeu', 'architecture']
  },

  {
    date: { day: null, month: 'mai', year: 2022, approx: true },
    title: 'Vaisseau — v2',
    desc: 'Propriétés privées ES2022, composition, 3 canvas séparés. Le projet le plus avancé de la collection.',
    demoId: 'vaisseau',
    versionLabel: 'v2',
    tags: ['jeu', 'ES2022', 'architecture']
  },

  {
    date: { day: 14, month: 'mar', year: 2026, approx: false },
    title: 'Portfolio — Ce site',
    desc: 'Mise en valeur de la collection. JS vanilla, iframes lazy-loaded, architecture modulaire, contrôles tactiles.',
    demoId: null,
    tags: ['portfolio', 'architecture']
  },

  {
    date: { day: 14, month: 'mar', year: 2026, approx: false },
    title: 'Vaisseau — v3',
    desc: 'Review de perf : beginPath() manquant, double getImageData, AudioSource pooling, étoiles statiques. Bugs corrigés, astéroïdes mieux formés.',
    demoId: 'vaisseau',
    versionLabel: 'v3',
    tags: ['optimisation', 'bug fix']
  },

];
