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
        target: null,
    },

    {
        title: "Position et vélocité",
        text: `Regarde les particules bouger. Chacune a une <strong>position</strong> <code>(x, y)</code>
               et une <strong>vélocité</strong> <code>(vx, vy)</code>.
               <br><br>
               À chaque frame, on ajoute la vélocité à la position.
               C'est la seule raison pour laquelle elles avancent.`,
        code:
`// À chaque frame :
p.x += p.vx;   // avance de vx pixels en X
p.y += p.vy;   // avance de vy pixels en Y`,
        highlight: 'p.x += p.vx;',
        freeze: false,
        onEnter(kit) {
            const W = kit.demo.W, H = kit.demo.H;
            // Flèche vers bas-droite depuis le centre : visualise un (vx, vy) quelconque
            kit.drawArrow(W/2, H/2, W/2 + 60, H/2 + 45, 'vx, vy');
        },
        onExit(kit) { kit.clearAnnotation(); },
    },

    {
        title: "L'accélération modifie la vélocité",
        text: `L'accélération <code>(ax, ay)</code> ne déplace pas directement la particule.
               Elle <em>modifie la vélocité</em> à chaque frame.
               <br><br>
               La vélocité grossit → la particule va de plus en plus vite.
               C'est la différence entre "vitesse constante" et "accélération".`,
        code:
`// 1. L'accélération modifie la vélocité
p.vx += p.ax;
p.vy += p.ay;

// 2. La vélocité modifie la position
p.x  += p.vx;
p.y  += p.vy;`,
        highlight: 'p.vx += p.ax;',
        freeze: false,
        onEnter(kit) {
            const W = kit.demo.W, H = kit.demo.H;
            // Deux flèches empilées : la petite = ax,ay qui s'ajoute à vx,vy
            kit.drawArrow(W/2 - 10, H/2, W/2 + 55, H/2 + 40, 'ax → vx → x');
        },
        onExit(kit) { kit.clearAnnotation(); },
    },

    {
        title: "Direction aléatoire à la création",
        text: `À la création de chaque particule, <code>ax</code> et <code>ay</code>
               reçoivent une valeur aléatoire entre <code>-0.075</code> et <code>+0.075</code>.
               <br><br>
               Au départ <code>vx = vy = 0</code>. Après quelques frames,
               la vélocité a grandi et la particule file dans sa direction.
               <br><br>
               C'est pourquoi elles partent dans toutes les directions à la fois.`,
        code:
`// À la création :
p.vx = 0;
p.vy = 0;
p.ax = (Math.random() - 0.5) * 0.15;  // -0.075 → +0.075
p.ay = (Math.random() - 0.5) * 0.15;`,
        highlight: 'p.ax = (Math.random() - 0.5) * 0.15;',
        freeze: false,
        target: null,
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
        target: null,
    },

];
