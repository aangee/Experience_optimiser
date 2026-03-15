// Étapes — Rebond
// Concept : détecter le contact avec un mur, inverser la vélocité, amortir

const STEPS = [

    {
        title: "Le rebond — inverser pour repartir",
        text: `Des balles tombent, frappent les murs et repartent.
               À chaque rebond elles perdent un peu d'énergie — comme une vraie balle.
               <br><br>
               Clique sur le canvas pour faire apparaître de nouvelles balles.`,
        code: null,
        freeze: false,
    },

    {
        title: "La gravité fait tomber les balles",
        text: `La gravité augmente <code>vy</code> à chaque frame.
               La balle accélère vers le bas — même principe que l'étape Accélération,
               mais ici <code>ay</code> est toujours positif (vers le bas).`,
        code:
`const GRAVITY = 0.4;

// Chaque frame :
b.vy += GRAVITY;   // vy grossit → descente de plus en plus rapide
b.x  += b.vx;
b.y  += b.vy;`,
        highlight: 'b.vy += GRAVITY;',
        freeze: false,
        onEnter(kit) {
            const W = kit.demo.W, H = kit.demo.H;
            // Flèche vers le bas depuis le milieu haut : représente la gravité
            kit.drawArrow(W / 2, H * 0.25, W / 2, H * 0.25 + 70, 'gravité');
        },
    },

    {
        title: "Détecter le contact avec le sol",
        text: `Une balle touche le sol quand son bord inférieur (<code>y + r</code>)
               dépasse la hauteur du canvas (<code>H</code>).
               <br><br>
               Il faut corriger la position avant d'inverser — sinon la balle
               s'enfonce dans le sol frame après frame avant de rebondir.`,
        code:
`if (b.y + b.r > H) {
    b.y = H - b.r;   // recaler au ras du sol
    // ... rebond ici
}`,
        highlight: 'b.y = H - b.r;',
        freeze: true,
        onEnter(kit) { kit.highlightEdge('bottom', 'sol = H'); },
        onExit(kit)  { kit.clearAnnotation(); },
    },

    {
        title: "Inverser et amortir",
        text: `Quand la balle touche le sol, <code>vy</code> est positive (elle descend).
               On la rend négative pour qu'elle remonte, et on multiplie par <code>0.75</code>.
               <br><br>
               La balle conserve 75% de son énergie. Un coefficient de <strong>1</strong>
               = rebond parfait. <strong>0</strong> = la balle s'écrase sans rebondir.`,
        code:
`const BOUNCE = 0.75;   // 75% énergie conservée

if (b.y + b.r > H) {
    b.y  = H - b.r;
    b.vy *= -BOUNCE;   // inverse + amortit
}`,
        highlight: 'b.vy *= -BOUNCE;',
        freeze: false,
        onEnter(kit) { kit.highlightEdge('bottom', 'vy × −0.75'); },
        onExit(kit)  { kit.clearAnnotation(); },
    },

    {
        title: "Les 4 murs — même principe partout",
        text: `On applique la même logique sur les 4 bords.
               <code>vx</code> s'inverse sur les bords latéraux,
               <code>vy</code> s'inverse sur le sol et le plafond.
               <br><br>
               Toujours recaler la position <em>avant</em> d'inverser,
               sinon la balle reste coincée dans le mur.`,
        code:
`if (b.y + b.r > H) { b.y = H - b.r; b.vy *= -BOUNCE; }  // sol
if (b.y - b.r < 0) { b.y = b.r;     b.vy *= -BOUNCE; }  // plafond
if (b.x + b.r > W) { b.x = W - b.r; b.vx *= -BOUNCE; }  // droite
if (b.x - b.r < 0) { b.x = b.r;     b.vx *= -BOUNCE; }  // gauche`,
        highlight: 'b.vy *= -BOUNCE;',
        freeze: false,
        onEnter(kit) { kit.highlightAllEdges(); },
        onExit(kit)  { kit.clearAnnotation(); },
    },

];
