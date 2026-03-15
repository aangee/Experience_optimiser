// Étapes — Friction
// Concept : résistance progressive qui réduit la vélocité à chaque frame

const STEPS = [

    {
        title: "La friction — ralentir sans s'arrêter brusquement",
        text: `Trois groupes de balles partent du centre avec la même vitesse.
               Elles ralentissent à des rythmes différents selon leur coefficient de friction.
               <br><br>
               Clique pour relancer toutes les balles depuis le centre.`,
        code: null,
        freeze: false,
        onEnter(kit) { kit.demo.spawnAll(); },
    },

    {
        title: "La friction par multiplication",
        text: `Regarde les flèches : au départ elles sont longues (vitesse élevée).
               À chaque frame, la vélocité est multipliée par un coefficient < 1 —
               les flèches <em>rétrécissent progressivement</em>.
               <br><br>
               La croix verte marque l'<strong>émetteur</strong> — toutes les balles naissent là.`,
        code:
`const FRICTION = 0.96;

// Chaque frame :
b.vx *= FRICTION;   // 4% de la vitesse perdue
b.vy *= FRICTION;`,
        highlight: 'b.vx *= FRICTION;',
        freeze: false,
        onEnter(kit) {
            kit.demo.spawnAll();
            kit.showVectors = true;
            kit.markEmitter(kit.demo.W / 2, kit.demo.H / 2, 'spawn');
        },
    },

    {
        title: "L'effet du coefficient",
        text: `Observe les flèches des trois groupes — leurs longueurs divergent rapidement :<br><br>
               <span style="color:#4ECDC4"><strong>0.99</strong></span> — flèches longues : ralentit très lentement<br>
               <span style="color:#FFD700"><strong>0.96</strong></span> — flèches moyennes : décroissance nette<br>
               <span style="color:#FF6B6B"><strong>0.90</strong></span> — flèches courtes : freine fort<br><br>
               Un coefficient de <strong>1</strong> = aucune friction. <strong>0</strong> = arrêt immédiat.`,
        code: null,
        freeze: false,
        onEnter(kit) {
            kit.demo.spawnAll();
            kit.showVectors = true;
        },
    },

    {
        title: "Pourquoi une multiplication et pas une soustraction ?",
        text: `On pourrait soustraire une valeur fixe à chaque frame.
               Mais ça poserait un problème : si la vitesse est déjà quasi-nulle,
               <code>vx</code> passerait en négatif et l'objet repartirait dans l'autre sens.
               <br><br>
               La multiplication garantit que la vélocité
               <em>converge vers zéro sans jamais changer de signe</em>.`,
        code:
`// ❌ Soustraction — peut inverser la direction
b.vx -= 0.1;   // si vx = 0.05 → devient -0.05 → repart !

// ✓ Multiplication — converge vers 0 proprement
b.vx *= 0.96;  // toujours dans la même direction`,
        highlight: 'b.vx *= 0.96;',
        freeze: false,
    },

    {
        title: "Friction et rebond — combinaison courante",
        text: `Dans la plupart des simulations, friction et rebond s'utilisent ensemble.
               La friction freine dans l'air, l'amortissement au rebond absorbe l'énergie à l'impact.
               <br><br>
               Le module Rebond montre comment les combiner.`,
        code:
`// À chaque frame :
b.vx *= FRICTION;   // résistance de l'air
b.vy *= FRICTION;
b.x  += b.vx;
b.y  += b.vy;

// Au contact avec le sol :
if (b.y + b.r > H) {
    b.y  = H - b.r;
    b.vy *= -BOUNCE;   // rebond amorti
}`,
        highlight: 'b.vx *= FRICTION;',
        freeze: false,
    },

];
