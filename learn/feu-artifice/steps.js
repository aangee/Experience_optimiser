// Étapes d'explication — Feu d'artifice
// Chaque étape peut avoir :
//   title      : string
//   text       : HTML string (peut contenir <code>)
//   code       : string (bloc de code à afficher)
//   highlight  : string (fragment de ligne à mettre en jaune)
//   freeze     : bool   (geler l'animation pendant cette étape)
//   target     : { x, y, label } — coordonnées canvas à pointer (optionnel)
//   onEnter(kit) : hook appelé en arrivant sur l'étape
//   onExit(kit)  : hook appelé en quittant l'étape

const STEPS = [
    {
        title: "Le feu d'artifice",
        text: `100 particules explosent depuis le centre du canvas.
               <br><br>
               Clique n'importe où sur le canvas pour créer une nouvelle explosion.
               <br><br>
               On va décortiquer comment tout ça fonctionne, étape par étape.`,
        code: null,
        freeze: false,
    },

    {
        title: "La boucle de jeu",
        text: `<code>requestAnimationFrame</code> appelle <code>update()</code>
               environ 60 fois par seconde.
               <br><br>
               Chaque appel : on efface le canvas, on met à jour toutes les particules,
               on les redessine. C'est la boucle de rendu.`,
        code:
`function update() {
    ctx.clearRect(0, 0, W, H);        // efface le canvas

    for (let i = 0; i < particles.length; i++) {
        const p = particles[i];
        p.update();                   // déplace la particule
        // ... dessiner p
    }

    requestAnimationFrame(update);    // rappelle la prochaine frame
}`,
        highlight: 'requestAnimationFrame(update)',
        freeze: false,
    },

    {
        title: "Créer une particule",
        text: `<code>new Particle(x, y, speed, direction, grav)</code>
               <br><br>
               La <code>direction</code> est un angle en radians.
               <code>Math.random() * Math.PI * 2</code> donne une direction
               aléatoire entre 0 et 360°.
               <br><br>
               Résultat : chaque particule part dans une direction différente —
               ça crée l'explosion.`,
        code:
`new Particle(
    x, y,
    Math.random() * 4 + 1,       // speed : entre 1 et 5
    Math.random() * Math.PI * 2, // direction : 0 → 2π (360°)
    0                            // gravité : désactivée
)`,
        highlight: 'Math.random() * Math.PI * 2',
        freeze: true,
        onEnter(kit) {
            // Pointer le centre du canvas où naissent les particules
            kit.pointTo(kit.demo.W / 2, kit.demo.H / 2, 'Naissance des particules');
        },
        onExit(kit) {
            kit.clearAnnotation();
        },
    },

    {
        title: "Vélocité : cos et sin",
        text: `Dans le constructeur de <code>Particle</code>, l'angle et la vitesse
               sont convertis en composantes <code>vx</code> et <code>vy</code>.
               <br><br>
               <code>Math.cos(angle) × speed</code> → déplacement horizontal par frame.<br>
               <code>Math.sin(angle) × speed</code> → déplacement vertical par frame.
               <br><br>
               Chaque frame, <code>p.update()</code> ajoute ces valeurs à la position.`,
        code:
`// Dans Particle — MasterClass.js
this.vx = Math.cos(direction) * speed;  // composante X
this.vy = Math.sin(direction) * speed;  // composante Y

// Puis dans p.update(), chaque frame :
this.x += this.vx;   // déplace de vx pixels en X
this.y += this.vy;   // déplace de vy pixels en Y`,
        highlight: 'this.vx = Math.cos(direction) * speed;',
        freeze: true,
    },

    {
        title: "Dessiner chaque particule",
        text: `Pour dessiner un disque, on utilise <code>ctx.arc()</code>.
               <br><br>
               La position est lue depuis le vecteur <code>position</code> de la particule
               via <code>getX()</code> et <code>getY()</code>.
               <br><br>
               Le rayon est fixé à 5 pixels. La couleur : rouge.`,
        code:
`ctx.beginPath();
ctx.fillStyle = 'red';
ctx.arc(
    p.position.getX(),   // centre X
    p.position.getY(),   // centre Y
    5,                   // rayon
    0, Math.PI * 2       // arc complet = cercle
);
ctx.fill();`,
        highlight: 'ctx.arc(',
        freeze: false,
    },

    {
        title: "Clic → nouvelle explosion",
        text: `Un listener <code>click</code> sur le canvas récupère les coordonnées
               de la souris et crée une nouvelle salve de 100 particules à cet endroit.
               <br><br>
               On soustrait <code>rect.left</code> et <code>rect.top</code> pour convertir
               les coordonnées de la fenêtre en coordonnées relatives au canvas.
               <br><br>
               Essaie — clique quelque part sur le canvas.`,
        code:
`canvas.addEventListener('click', e => {
    const rect = canvas.getBoundingClientRect();
    const sx = canvas.width  / rect.width;  // facteur d'échelle X
    const sy = canvas.height / rect.height; // facteur d'échelle Y
    createBurst(
        (e.clientX - rect.left) * sx,  // X en coordonnées canvas
        (e.clientY - rect.top)  * sy   // Y en coordonnées canvas
    );
});`,
        highlight: 'const sx = canvas.width  / rect.width;',
        freeze: false,
    },
];
