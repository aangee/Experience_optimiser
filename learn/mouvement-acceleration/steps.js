// Étapes — Accélération
// Concept : position → vélocité → accélération (la pile du mouvement physique)

const STEPS = [

    {
        title: "L'accélération — pourquoi ça part dans tous les sens",
        text: `Des particules naissent au centre et s'éloignent dans toutes les directions.
               <br><br>
               Elles n'ont pas de vitesse de départ — elles <em>accélèrent</em> depuis zéro.
               Chacune a sa propre direction d'accélération, choisie au hasard.`,
        code: null,
        freeze: false,
        target: null,
    },

    {
        title: "Position et vélocité",
        text: `Chaque particule a une position <code>(x, y)</code> et une vélocité <code>(vx, vy)</code>.
               <br><br>
               À chaque frame, on ajoute la vélocité à la position.
               C'est la base de tout déplacement en 2D.`,
        code:
`// À chaque frame :
p.x += p.vx;   // avance de vx pixels en X
p.y += p.vy;   // avance de vy pixels en Y`,
        highlight: 'p.x += p.vx;',
        freeze: true,
        onEnter(kit) {
            const p = kit.demo.particles[0];
            if (p) kit.pointTo(p.x, p.y, 'position (x, y)');
        },
        onExit(kit) { kit.clearAnnotation(); },
    },

    {
        title: "L'accélération — modifier la vélocité",
        text: `L'accélération <code>(ax, ay)</code> ne déplace pas la particule directement.
               <br><br>
               Elle <em>change la vélocité</em> à chaque frame.
               La vélocité grossit → la particule va de plus en plus vite.
               <br><br>
               C'est la différence entre "vitesse constante" et "accélération".`,
        code:
`// 1. L'accélération modifie la vélocité
p.vx += p.ax;
p.vy += p.ay;

// 2. La vélocité modifie la position
p.x += p.vx;
p.y += p.vy;`,
        highlight: 'p.vx += p.ax;',
        freeze: true,
        onEnter(kit) {
            const p = kit.demo.particles[0];
            if (p) kit.pointTo(p.x, p.y, 'accélère depuis (0, 0)');
        },
        onExit(kit) { kit.clearAnnotation(); },
    },

    {
        title: "Direction aléatoire",
        text: `À la création, chaque particule reçoit un <code>ax</code> et <code>ay</code>
               choisi aléatoirement entre <code>-0.075</code> et <code>+0.075</code>.
               <br><br>
               Au départ <code>vx = vy = 0</code>. Après quelques frames,
               <code>vx</code> et <code>vy</code> ont grandi — la particule file dans sa direction.`,
        code:
`// À la création :
p.vx = 0;
p.vy = 0;
p.ax = (Math.random() - 0.5) * 0.15;  // -0.075 → +0.075
p.ay = (Math.random() - 0.5) * 0.15;`,
        highlight: 'p.ax = (Math.random() - 0.5) * 0.15;',
        freeze: false,
    },

    {
        title: "La pile complète — position, vélocité, accélération",
        text: `C'est la hiérarchie fondamentale de la physique 2D :<br><br>
               <strong>Accélération</strong> modifie la <strong>Vélocité</strong>
               qui modifie la <strong>Position</strong>.<br><br>
               Chaque frame, dans cet ordre. En changeant
               <code>ax</code> ou <code>ay</code> dynamiquement (gravité, vent, propulsion…)
               on obtient tous les mouvements physiques possibles.`,
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
