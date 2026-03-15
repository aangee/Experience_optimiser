// Mouvement 2D — version Learn
// Démo autonome : balles avec vélocité, gravité, rebond, friction
// Code intentionnellement explicite (pas de classe Particle) pour coller aux étapes

function initDemo(canvas, kit) {
    const ctx = canvas.getContext('2d');
    const W   = canvas.width;
    const H   = canvas.height;
    const TAU = Math.PI * 2;

    const GRAVITY  = 0.3;   // pixels/frame² ajoutés à vy
    const FRICTION = 0.985; // facteur de ralentissement par frame
    const BOUNCE   = 0.70;  // énergie conservée au rebond

    const COLORS = ['#FF6B6B', '#4ECDC4', '#45B7D1', '#96CEB4', '#FFEAA7', '#DDA0DD', '#98D8C8'];

    let balls = [];

    function spawnBall(x, y) {
        balls.push({
            x,
            y,
            vx: (Math.random() - 0.5) * 12,
            vy: (Math.random() - 0.5) * 8,
            r:  Math.random() * 8 + 5,
            color: COLORS[Math.floor(Math.random() * COLORS.length)],
        });
    }

    // Naissance initiale : 20 balles depuis le haut-centre
    for (let i = 0; i < 20; i++) {
        spawnBall(
            W / 2 + (Math.random() - 0.5) * 200,
            H * 0.3 + (Math.random() - 0.5) * 80
        );
    }

    // Expose pour steps.js
    kit.demo = { balls, W, H, spawnBall };

    // Clic → nouvelle balle à la position de la souris
    canvas.addEventListener('click', e => {
        const rect = canvas.getBoundingClientRect();
        const sx   = W / rect.width;
        const sy   = H / rect.height;
        spawnBall((e.clientX - rect.left) * sx, (e.clientY - rect.top) * sy);
    });

    function update() {
        if (!kit.frozen) {
            ctx.clearRect(0, 0, W, H);

            for (const b of balls) {
                // 1. Gravité — vy augmente à chaque frame
                b.vy += GRAVITY;

                // 2. Friction — légère perte d'énergie dans l'air
                b.vx *= FRICTION;
                b.vy *= FRICTION;

                // 3. Déplacement — position += vélocité
                b.x += b.vx;
                b.y += b.vy;

                // 4. Rebond sur les murs
                if (b.x + b.r > W) { b.x = W - b.r; b.vx *= -BOUNCE; }
                if (b.x - b.r < 0) { b.x = b.r;     b.vx *= -BOUNCE; }
                if (b.y + b.r > H) { b.y = H - b.r;  b.vy *= -BOUNCE; }
                if (b.y - b.r < 0) { b.y = b.r;      b.vy *= -BOUNCE; }

                // Dessin
                ctx.beginPath();
                ctx.fillStyle = b.color;
                ctx.arc(b.x, b.y, b.r, 0, TAU);
                ctx.fill();
            }
        }
        requestAnimationFrame(update);
    }

    update();
}
