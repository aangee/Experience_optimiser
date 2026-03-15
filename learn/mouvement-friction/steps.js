// Étapes — Friction
// Concept : résistance progressive qui réduit la vélocité à chaque frame

const STEPS = [

    {
        title: "La friction — ralentir sans s'arrêter brusquement",
        text: `Trois groupes de balles partent du centre avec la même vitesse.
               Elles ralentissent à des rythmes différents selon leur coefficient de friction.
               <br><br>
               Clique pour relancer toutes les balles.`,
        code: null,
        freeze: false,
        target: null,
    },

    {
        title: "La friction par multiplication",
        text: `La façon la plus simple de simuler la friction : multiplier la vélocité
               par un coefficient légèrement inférieur à 1, à chaque frame.
               <br><br>
               La vélocité ne tombe jamais à zéro en un seul coup — elle
               <em>décroît exponentiellement</em>, comme dans la réalité.`,
        code:
`const FRICTION = 0.96;

// Chaque frame :
b.vx *= FRICTION;   // 4% de la vitesse perdue
b.vy *= FRICTION;`,
        highlight: 'b.vx *= FRICTION;',
        freeze: true,
        onEnter(kit) {
            kit.pointTo(kit.demo.W / 2, kit.demo.H / 2, 'départ depuis le centre');
        },
        onExit(kit) { kit.clearAnnotation(); },
    },

    {
        title: "L'effet du coefficient",
        text: `Les trois couleurs illustrent trois coefficients différents :<br><br>
               <span style="color:#4ECDC4"><strong>0.99</strong></span> → perd 1% par frame → ralentit très lentement (air léger)<br>
               <span style="color:#FFD700"><strong>0.96</strong></span> → perd 4% par frame → ralentit clairement<br>
               <span style="color:#FF6B6B"><strong>0.90</strong></span> → perd 10% par frame → freine fort (dans l'eau)<br><br>
               Un coefficient de <strong>1</strong> = aucune friction. De <strong>0</strong> = arrêt immédiat.`,
        code:
`// Même vitesse initiale, coefficients différents :
// cyan  : vx *= 0.99  →  lente décroissance
// jaune : vx *= 0.96  →  décroissance moyenne
// rouge : vx *= 0.90  →  décroissance rapide`,
        highlight: 'vx *= 0.99',
        freeze: false,
    },

    {
        title: "Pourquoi une multiplication et pas une soustraction ?",
        text: `On pourrait soustraire une valeur fixe à chaque frame.
               Mais ça poserait un problème : la vélocité pourrait passer en négatif
               et le objet repartirait dans l'autre sens.
               <br><br>
               La multiplication garantit que la vélocité <em>converge vers zéro</em>
               sans jamais changer de signe — comportement physiquement correct.`,
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
               La prochaine démo (Rebond) montre comment les combiner.`,
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
