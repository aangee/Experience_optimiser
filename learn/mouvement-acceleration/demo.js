// Accélération — version Learn
// Des particules naissent au centre, chacune avec un vecteur accélération aléatoire
// Code explicite sans classes partagées pour coller aux étapes

function initDemo(canvas, kit) {
    const ctx = canvas.getContext('2d');
    const W   = canvas.width;
    const H   = canvas.height;
    const TAU = Math.PI * 2;

    const COLORS = ['#FF6B6B', '#4ECDC4', '#45B7D1', '#96CEB4', '#FFEAA7', '#DDA0DD', '#98D8C8'];

    let particles = [];

    function spawnParticle() {
        particles.push({
            x:   W / 2 + (Math.random() - 0.5) * 100,
            y:   H / 2 + (Math.random() - 0.5) * 100,
            vx:  0,
            vy:  0,
            ax:  (Math.random() - 0.5) * 0.15,  // accélération X aléatoire
            ay:  (Math.random() - 0.5) * 0.15,  // accélération Y aléatoire
            r:   Math.random() * 4 + 2,
            color: COLORS[Math.floor(Math.random() * COLORS.length)],
            alpha: 1,
        });
    }

    // 40 particules initiales
    for (let i = 0; i < 40; i++) spawnParticle();

    // Spawn une nouvelle particule toutes les 800ms
    const spawnInterval = setInterval(() => {
        if (particles.length < 120) spawnParticle();
    }, 800);

    // Expose pour steps.js
    kit.demo = { particles, W, H };

    function update() {
        if (!kit.frozen) {
            ctx.clearRect(0, 0, W, H);

            for (let i = particles.length - 1; i >= 0; i--) {
                const p = particles[i];

                // 1. Accélération → modifie la vélocité
                p.vx += p.ax;
                p.vy += p.ay;

                // 2. Vélocité → modifie la position
                p.x += p.vx;
                p.y += p.vy;

                // Fade + suppression quand hors canvas
                if (p.x < -50 || p.x > W + 50 || p.y < -50 || p.y > H + 50) {
                    particles.splice(i, 1);
                    continue;
                }

                ctx.globalAlpha = p.alpha;
                ctx.beginPath();
                ctx.fillStyle = p.color;
                ctx.arc(p.x, p.y, p.r, 0, TAU);
                ctx.fill();
            }

            ctx.globalAlpha = 1;
        }
        // Vecteurs sur couche SVG — mis à jour même quand gelé (flèches statiques)
        if (kit.showVectors)
            kit.drawVelocityVectors(particles, { scale: 14, maxCount: 12 });

        requestAnimationFrame(update);
    }

    update();
}
