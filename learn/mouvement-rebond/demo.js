// Rebond — version Learn
// Des balles rebondissent sur les 4 murs avec amortissement
// Clic pour ajouter des balles

function initDemo(canvas, kit) {
    const ctx = canvas.getContext('2d');
    const W   = canvas.width;
    const H   = canvas.height;
    const TAU = Math.PI * 2;

    const GRAVITY = 0.4;
    const BOUNCE  = 0.75;   // énergie conservée au rebond (25% perdue)
    const COLORS  = ['#FF6B6B', '#4ECDC4', '#45B7D1', '#96CEB4', '#FFEAA7', '#DDA0DD', '#98D8C8'];

    let balls = [];

    function spawnBall(x, y) {
        balls.push({
            x,
            y,
            vx: (Math.random() - 0.5) * 10,
            vy: (Math.random() - 0.5) * 6 - 4,
            r:  Math.random() * 10 + 5,
            color: COLORS[Math.floor(Math.random() * COLORS.length)],
        });
    }

    // Spawn initial : 15 balles
    for (let i = 0; i < 15; i++) {
        spawnBall(
            W * 0.1 + Math.random() * W * 0.8,
            H * 0.1 + Math.random() * H * 0.4
        );
    }

    const MAX_BALLS = 60;

    // Clic → ajouter des balles (plafonné à MAX_BALLS)
    canvas.addEventListener('click', e => {
        if (balls.length >= MAX_BALLS) return;
        const rect = canvas.getBoundingClientRect();
        const sx   = W / rect.width;
        const sy   = H / rect.height;
        const toAdd = Math.min(8, MAX_BALLS - balls.length);
        for (let i = 0; i < toAdd; i++) {
            spawnBall(
                (e.clientX - rect.left) * sx,
                (e.clientY - rect.top)  * sy
            );
        }
    });

    // Expose pour steps.js
    kit.demo = { balls, W, H, spawnBall };

    function update() {
        if (!kit.frozen) {
            ctx.clearRect(0, 0, W, H);

            for (let i = balls.length - 1; i >= 0; i--) {
                const b = balls[i];

                // Gravité
                b.vy += GRAVITY;

                // Déplacement
                b.x += b.vx;
                b.y += b.vy;

                // Rebond sol
                if (b.y + b.r > H) {
                    b.y  = H - b.r;
                    b.vy *= -BOUNCE;
                    b.vx *= 0.98;   // léger freinage sur le sol
                }
                // Rebond plafond
                if (b.y - b.r < 0) {
                    b.y  = b.r;
                    b.vy *= -BOUNCE;
                }
                // Rebond bord droit
                if (b.x + b.r > W) {
                    b.x  = W - b.r;
                    b.vx *= -BOUNCE;
                }
                // Rebond bord gauche
                if (b.x - b.r < 0) {
                    b.x  = b.r;
                    b.vx *= -BOUNCE;
                }

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
