// Étapes — Wrapping
// Concept : téléportation bord-à-bord pour un espace "toroïdal" infini

const STEPS = [

    {
        title: "Le wrapping — un espace sans bords",
        text: `Les particules se déplacent et ne rebondissent jamais.
               Elles <em>réapparaissent de l'autre côté</em> quand elles sortent de l'écran.
               <br><br>
               La boule dorée est contrôlable avec <strong>Z / Q / D</strong>.
               Les autres bougent automatiquement.`,
        code: null,
        freeze: false,
        target: null,
    },

    {
        title: "Le déplacement de base",
        text: `Comme toujours : à chaque frame, on ajoute la vélocité à la position.
               Sans wrapping, les particules sortiraient du canvas et disparaîtraient.`,
        code:
`// Chaque frame :
p.x += p.vx;
p.y += p.vy;
// → sans wrapping, hors de l'écran = invisible`,
        highlight: 'p.x += p.vx;',
        freeze: true,
        onEnter(kit) {
            kit.pointTo(kit.demo.main.x, kit.demo.main.y, 'position courante');
        },
        onExit(kit) { kit.clearAnnotation(); },
    },

    {
        title: "Wrapping horizontal",
        text: `Si la particule dépasse le bord droit, on la téléporte au bord gauche.
               Et vice-versa.
               <br><br>
               On utilise <code>p.r</code> (le rayon) pour que la particule
               sorte complètement <em>avant</em> de réapparaître — l'effet est plus naturel.`,
        code:
`// Bord droit → téléporte à gauche
if (p.x - p.r > W)  p.x = -p.r;

// Bord gauche → téléporte à droite
if (p.x + p.r < 0)  p.x = W + p.r;`,
        highlight: 'if (p.x - p.r > W)',
        freeze: false,
        onEnter(kit) {
            kit.pointTo(kit.demo.W - 10, kit.demo.H / 2, 'bord droit');
        },
        onExit(kit) { kit.clearAnnotation(); },
    },

    {
        title: "Wrapping vertical",
        text: `Même logique sur l'axe Y : bord bas → réapparaît en haut, et inversement.
               <br><br>
               Avec les 4 conditions, l'espace devient <strong>toroïdal</strong> —
               comme la surface d'un donut. Sortir à droite = rentrer à gauche,
               sortir en bas = rentrer en haut.`,
        code:
`// Bord bas → téléporte en haut
if (p.y - p.r > H)  p.y = -p.r;

// Bord haut → téléporte en bas
if (p.y + p.r < 0)  p.y = H + p.r;`,
        highlight: 'if (p.y - p.r > H)',
        freeze: false,
        onEnter(kit) {
            kit.pointTo(kit.demo.W / 2, kit.demo.H - 10, 'bord bas');
        },
        onExit(kit) { kit.clearAnnotation(); },
    },

    {
        title: "Les 4 conditions ensemble",
        text: `Quatre conditions, chacune indépendante.
               L'ordre n'a pas d'importance — elles ne s'excluent pas.
               <br><br>
               Ce pattern est universel : jeux de type Pac-Man, simulation de particules,
               univers infini de type "Asteroids"… tous utilisent exactement ça.`,
        code:
`function wrap(p) {
    if (p.x - p.r > W)  p.x = -p.r;
    if (p.x + p.r < 0)  p.x = W + p.r;
    if (p.y - p.r > H)  p.y = -p.r;
    if (p.y + p.r < 0)  p.y = H + p.r;
}`,
        highlight: 'function wrap(p)',
        freeze: false,
    },

];
