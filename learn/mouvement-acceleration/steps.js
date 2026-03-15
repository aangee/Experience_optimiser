// Étapes — Accélération
// Concept : position → vélocité → accélération (la pile du mouvement physique)

const STEPS = [

    {
        title: "L'accélération — pourquoi ça part dans tous les sens",
        text: `Des particules naissent près du centre et s'éloignent dans toutes les directions.
               <br><br>
               Elles n'ont pas de vitesse de départ : elles <em>accélèrent depuis zéro</em>.
               Chacune a sa propre direction d'accélération, choisie au hasard.`,
        code: null,
        freeze: false,
    },

    {
        title: "Position et vélocité",
        text: `Regarde les flèches orangées sur les particules : ce sont les <strong>vecteurs de vélocité</strong>.
               Leur direction = où va la particule. Leur longueur = à quelle vitesse.
               <br><br>
               À chaque frame : <code>x += vx</code> et <code>y += vy</code>.
               C'est tout ce qui fait bouger une particule.`,
        code:
`// À chaque frame :
p.x += p.vx;   // avance de vx pixels en X
p.y += p.vy;   // avance de vy pixels en Y`,
        highlight: 'p.x += p.vx;',
        freeze: false,
        onEnter(kit) { kit.showVectors = true; },
        onExit(kit)  { kit.clearVectors(); },
    },

    {
        title: "L'accélération modifie la vélocité",
        text: `Regarde la longueur des flèches : les particules récentes ont des flèches courtes
               (elles viennent de naître, <code>vx ≈ 0</code>).
               Les plus anciennes ont des flèches longues — leur vélocité a grandi.
               <br><br>
               C'est l'accélération en action : elle s'ajoute à la vélocité à chaque frame.`,
        code:
`// 1. L'accélération modifie la vélocité
p.vx += p.ax;
p.vy += p.ay;

// 2. La vélocité modifie la position
p.x  += p.vx;
p.y  += p.vy;`,
        highlight: 'p.vx += p.ax;',
        freeze: false,
        onEnter(kit) { kit.showVectors = true; },
        onExit(kit)  { kit.clearVectors(); },
    },

    {
        title: "Direction aléatoire à la création",
        text: `La croix verte marque l'<strong>émetteur</strong> — la zone de naissance des particules.
               Les flèches partent dans toutes les directions car chaque particule reçoit un
               <code>ax</code> et <code>ay</code> aléatoires à sa création.
               <br><br>
               Au départ <code>vx = vy = 0</code>.
               Quelques frames plus tard, la vélocité a grandi dans sa direction unique.`,
        code:
`// À la création :
p.vx = 0;
p.vy = 0;
p.ax = (Math.random() - 0.5) * 0.15;  // -0.075 → +0.075
p.ay = (Math.random() - 0.5) * 0.15;`,
        highlight: 'p.ax = (Math.random() - 0.5) * 0.15;',
        freeze: false,
        onEnter(kit) {
            kit.showVectors = true;
            kit.markEmitter(kit.demo.W / 2, kit.demo.H / 2, 'spawn');
        },
        onExit(kit) {
            kit.clearVectors();
            kit.clearAnnotation();
        },
    },

    {
        title: "La pile complète — 3 niveaux",
        text: `C'est la hiérarchie fondamentale de la physique 2D :<br><br>
               <strong>Accélération</strong> modifie la <strong>Vélocité</strong>
               qui modifie la <strong>Position</strong>.<br><br>
               En changeant <code>ax</code> et <code>ay</code> dynamiquement —
               gravité, vent, propulsion, ressort — on obtient tous les mouvements physiques.`,
        code:
`function update() {
    for (const p of particles) {
        p.vx += p.ax;   // accél → vélocité
        p.vy += p.ay;
        p.x  += p.vx;   // vélocité → position
        p.y  += p.vy;
    }
    requestAnimationFrame(update);
}`,
        highlight: 'p.vx += p.ax;',
        freeze: false,
    },

];
