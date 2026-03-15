// Étapes — Rebond
// Concept : détecter le contact avec un mur, inverser la vélocité, amortir

const STEPS = [

    {
        title: "Le rebond — inverser pour repartir",
        text: `Des balles tombent, frappent les murs et repartent.
               À chaque rebond elles perdent un peu d'énergie — comme une vraie balle.
               <br><br>
               Clique sur le canvas pour ajouter des balles.`,
        code: null,
        freeze: false,
        target: null,
    },

    {
        title: "La gravité fait tomber les balles",
        text: `Avant de gérer le rebond, on a besoin que les balles tombent.
               La gravité augmente <code>vy</code> à chaque frame.
               La balle accélère vers le bas.`,
        code:
`const GRAVITY = 0.4;

// Chaque frame :
b.vy += GRAVITY;   // vy grossit → descente de plus en plus rapide
b.x  += b.vx;
b.y  += b.vy;`,
        highlight: 'b.vy += GRAVITY;',
        freeze: false,
        onEnter(kit) {
            kit.pointTo(kit.demo.W / 2, kit.demo.H - 30, 'le sol attire les balles');
        },
        onExit(kit) { kit.clearAnnotation(); },
    },

    {
        title: "Détecter le contact avec le sol",
        text: `Une balle touche le sol quand son bord inférieur (<code>y + r</code>)
               dépasse la hauteur du canvas (<code>H</code>).
               <br><br>
               Il faut aussi corriger la position — sinon la balle s'enfonce dans le sol
               frame après frame avant de rebondir.`,
        code:
`if (b.y + b.r > H) {
    b.y = H - b.r;   // recaler au ras du sol
    // ... rebond ici
}`,
        highlight: 'b.y = H - b.r;',
        freeze: true,
        onEnter(kit) {
            kit.pointTo(kit.demo.W * 0.5, kit.demo.H - 5, 'contact sol');
        },
        onExit(kit) { kit.clearAnnotation(); },
    },

    {
        title: "Inverser et amortir",
        text: `Quand la balle touche le sol, <code>vy</code> est positive (descente).
               On la rend négative pour qu'elle remonte.
               <br><br>
               On multiplie par <code>0.75</code> — la balle conserve 75% de son énergie.
               Un coefficient de 1 = rebond parfait. 0 = la balle s'écrase sans rebondir.`,
        code:
`const BOUNCE = 0.75;   // 75% énergie conservée

if (b.y + b.r > H) {
    b.y  = H - b.r;
    b.vy *= -BOUNCE;   // inverse + amortit
}`,
        highlight: 'b.vy *= -BOUNCE;',
        freeze: false,
        onEnter(kit) {
            const b = kit.demo.balls[0];
            if (b) kit.pointTo(b.x, kit.demo.H - b.r - 5, 'vy s\'inverse ici');
        },
        onExit(kit) { kit.clearAnnotation(); },
    },

    {
        title: "Les 4 murs — même principe partout",
        text: `On applique la même logique sur les 4 bords.
               Le signe de <code>vx</code> ou <code>vy</code> s'inverse selon le mur touché.
               <br><br>
               Important : on recale toujours la position <em>avant</em> d'inverser,
               sinon la balle reste coincée dans le mur.`,
        code:
`// Sol
if (b.y + b.r > H) { b.y = H - b.r; b.vy *= -BOUNCE; }
// Plafond
if (b.y - b.r < 0) { b.y = b.r;     b.vy *= -BOUNCE; }
// Droite
if (b.x + b.r > W) { b.x = W - b.r; b.vx *= -BOUNCE; }
// Gauche
if (b.x - b.r < 0) { b.x = b.r;     b.vx *= -BOUNCE; }`,
        highlight: 'b.vy *= -BOUNCE;',
        freeze: false,
    },

];
