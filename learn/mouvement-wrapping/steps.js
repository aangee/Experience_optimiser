// Étapes — Wrapping
// Concept : téléportation bord-à-bord pour un espace "toroïdal" infini

const STEPS = [

    {
        title: "Le wrapping — un espace sans bords",
        text: `Les particules se déplacent et ne rebondissent jamais.
               Quand elles touchent un bord, elles <em>réapparaissent de l'autre côté</em>.
               <br><br>
               La boule dorée se contrôle avec <strong>Z</strong> (propulsion)
               et <strong>Q / D</strong> (rotation). Les autres bougent automatiquement.`,
        code: null,
        freeze: false,
        onEnter(kit) { kit.highlightAllEdges(); },
        onExit(kit)  { kit.clearAnnotation(); },
    },

    {
        title: "Le déplacement de base",
        text: `Comme toujours : à chaque frame, on ajoute la vélocité à la position.
               <br><br>
               Sans wrapping, une particule qui sort à droite continuerait
               à <code>x = 900, 1000…</code> et disparaîtrait de l'écran pour toujours.`,
        code:
`// Chaque frame :
p.x += p.vx;
p.y += p.vy;
// → sans wrapping, hors canvas = invisible`,
        highlight: 'p.x += p.vx;',
        freeze: true,
    },

    {
        title: "Wrapping horizontal — gauche ↔ droite",
        text: `Si la particule dépasse le <strong>bord droit</strong>, on la téléporte au bord gauche.
               Et vice-versa.
               <br><br>
               On utilise le rayon <code>r</code> pour que le cercle sorte
               <em>entièrement</em> avant de réapparaître — l'illusion est plus propre.`,
        code:
`// Bord droit → téléporte à gauche
if (p.x - p.r > W)  p.x = -p.r;

// Bord gauche → téléporte à droite
if (p.x + p.r < 0)  p.x = W + p.r;`,
        highlight: 'if (p.x - p.r > W)',
        freeze: false,
        onEnter(kit) {
            // Allume les deux bords verticaux pour montrer la paire
            const W = kit.demo.W, H = kit.demo.H;
            const S = 6;
            kit.svgOverlay.innerHTML = `
                <line class="edge-highlight" x1="${W-S}" y1="${S}" x2="${W-S}" y2="${H-S}"/>
                <text class="edge-label" x="${W-S-10}" y="${H/2 - 14}" text-anchor="end">bord droit</text>
                <line class="edge-highlight" x1="${S}" y1="${S}" x2="${S}" y2="${H-S}" style="animation-delay:0.45s"/>
                <text class="edge-label" x="${S+10}" y="${H/2 + 8}" text-anchor="start">bord gauche</text>
            `;
        },
        onExit(kit) { kit.clearAnnotation(); },
    },

    {
        title: "Wrapping vertical — haut ↔ bas",
        text: `Même logique sur l'axe Y : le <strong>bord bas</strong> renvoie en haut, et inversement.
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
            const W = kit.demo.W, H = kit.demo.H;
            const S = 6;
            kit.svgOverlay.innerHTML = `
                <line class="edge-highlight" x1="${S}" y1="${H-S}" x2="${W-S}" y2="${H-S}"/>
                <text class="edge-label" x="${W/2}" y="${H-S-14}" text-anchor="middle">bord bas</text>
                <line class="edge-highlight" x1="${S}" y1="${S}" x2="${W-S}" y2="${S}" style="animation-delay:0.45s"/>
                <text class="edge-label" x="${W/2}" y="${S+22}" text-anchor="middle">bord haut</text>
            `;
        },
        onExit(kit) { kit.clearAnnotation(); },
    },

    {
        title: "Les 4 conditions ensemble",
        text: `Quatre conditions, chacune indépendante. L'ordre n'a pas d'importance.
               <br><br>
               Ce pattern est universel : Pac-Man, simulation de particules,
               Asteroids… tous les espaces "infinis" utilisent exactement ça.`,
        code:
`function wrap(p) {
    if (p.x - p.r > W)  p.x = -p.r;
    if (p.x + p.r < 0)  p.x = W + p.r;
    if (p.y - p.r > H)  p.y = -p.r;
    if (p.y + p.r < 0)  p.y = H + p.r;
}`,
        highlight: 'function wrap(p)',
        freeze: false,
        onEnter(kit) { kit.highlightAllEdges(); },
        onExit(kit)  { kit.clearAnnotation(); },
    },

];
