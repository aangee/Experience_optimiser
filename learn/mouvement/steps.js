// Étapes d'explication — Mouvement 2D
// Couvre : vélocité, gravité (accélération), rebond, friction

const STEPS = [

    {
        title: "Le mouvement en 2D",
        text: `Des balles tombent, rebondissent, ralentissent.
               <br><br>
               En apparence c'est magique — en réalité, quatre petites règles
               s'appliquent à chaque balle, 60 fois par seconde.
               <br><br>
               Clique n'importe où sur le canvas pour ajouter une balle.`,
        code: null,
        freeze: false,
    },

    {
        title: "Vélocité — le déplacement par frame",
        text: `Chaque balle a deux propriétés : <code>vx</code> et <code>vy</code>.
               <br><br>
               Chaque frame, on les ajoute à la position.
               C'est tout. C'est comme ça que tout se déplace.
               <br><br>
               Si <code>vx = 3</code>, la balle avance de 3 pixels vers la droite par frame.
               Si <code>vy = -5</code>, elle monte de 5 pixels.`,
        code:
`// Chaque frame, pour chaque balle :
b.x += b.vx;   // déplace de vx pixels en X
b.y += b.vy;   // déplace de vy pixels en Y`,
        highlight: 'b.x += b.vx;',
        freeze: true,
        onEnter(kit) {
            const b = kit.demo.balls[0];
            if (b) kit.pointTo(b.x, b.y, 'Position (x, y)');
        },
        onExit(kit) { kit.clearAnnotation(); },
    },

    {
        title: "Gravité — une accélération constante",
        text: `La gravité ne déplace pas directement la balle.
               Elle <em>modifie</em> <code>vy</code> à chaque frame.
               <br><br>
               À chaque frame, <code>vy</code> augmente de 0.3.
               Donc la balle tombe de plus en plus vite — comme dans la réalité.
               <br><br>
               C'est ça une <strong>accélération</strong> : un changement de vitesse dans le temps.`,
        code:
`const GRAVITY = 0.3;

// Appliqué à chaque frame, avant le déplacement :
b.vy += GRAVITY;   // vy grossit → balle accélère vers le bas`,
        highlight: 'b.vy += GRAVITY;',
        freeze: false,
        onEnter(kit) {
            kit.pointTo(kit.demo.W / 2, kit.demo.H - 40, 'Le sol attire les balles');
        },
        onExit(kit) { kit.clearAnnotation(); },
    },

    {
        title: "Rebond — inverser la vélocité",
        text: `Quand une balle touche le sol, sa <code>vy</code> est positive
               (elle descend). On la rend négative : la balle repart vers le haut.
               <br><br>
               On multiplie aussi par <code>0.70</code> — la balle perd 30 % de son
               énergie à chaque rebond, comme une vraie balle en caoutchouc.`,
        code:
`// Quand la balle touche le sol :
if (b.y + b.r > H) {
    b.y  = H - b.r;   // recaler pour ne pas traverser
    b.vy *= -0.70;     // inverser + amortir (30% d'énergie perdue)
}`,
        highlight: 'b.vy *= -0.70;',
        freeze: false,
        onEnter(kit) {
            kit.pointTo(kit.demo.W * 0.6, kit.demo.H - 20, 'Contact avec le sol');
        },
        onExit(kit) { kit.clearAnnotation(); },
    },

    {
        title: "Friction — résistance de l'air",
        text: `Même en l'air, les balles perdent un tout petit peu de vitesse
               à chaque frame. On multiplie <code>vx</code> et <code>vy</code> par
               <code>0.985</code>.
               <br><br>
               0.985 × 0.985 × … 60 fois par seconde = la balle ralentit progressivement.
               Un coefficient plus bas (0.9) = freinage très fort.
               Un coefficient de 1 = pas de friction du tout.`,
        code:
`const FRICTION = 0.985;

// À chaque frame, avant le déplacement :
b.vx *= FRICTION;   // ralentit horizontalement
b.vy *= FRICTION;   // ralentit verticalement`,
        highlight: 'b.vx *= FRICTION;',
        freeze: false,
    },

    {
        title: "Tout ensemble — 60 fois par seconde",
        text: `À chaque frame, dans cet ordre :<br><br>
               <strong>1.</strong> Gravité → <code>vy += 0.3</code><br>
               <strong>2.</strong> Friction → <code>vx *= 0.985 ; vy *= 0.985</code><br>
               <strong>3.</strong> Déplacement → <code>x += vx ; y += vy</code><br>
               <strong>4.</strong> Rebond → si contact mur, inverser + amortir<br><br>
               Quatre lignes. C'est la base de toute physique 2D.
               <br><br>
               Clique sur le canvas pour ajouter des balles et observer.`,
        code:
`function update() {
    for (const b of balls) {
        b.vy += GRAVITY;        // gravité
        b.vx *= FRICTION;       // friction
        b.vy *= FRICTION;
        b.x += b.vx;            // déplacement
        b.y += b.vy;
        if (b.y + b.r > H) {   // rebond sol
            b.y = H - b.r;
            b.vy *= -BOUNCE;
        }
        // ... rebond autres murs, dessin
    }
    requestAnimationFrame(update);
}`,
        highlight: 'requestAnimationFrame(update);',
        freeze: false,
    },

];
