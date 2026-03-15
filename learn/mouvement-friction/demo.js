// Friction — version Learn
// Trois groupes de balles avec différents coefficients de friction
// Clic pour relancer toutes les balles depuis le centre

function initDemo(canvas, kit) {
    const ctx = canvas.getContext('2d');
    const W   = canvas.width;
    const H   = canvas.height;
    const TAU = Math.PI * 2;

    // Trois niveaux de friction pour montrer la différence
    const GROUPS = [
        { friction: 0.99,  color: '#4ECDC4', label: '0.99 (air léger)',  labelY: 60 },
        { friction: 0.96,  color: '#FFD700', label: '0.96 (air dense)',  labelY: 120 },
        { friction: 0.90,  color: '#FF6B6B', label: '0.90 (eau)',        labelY: 180 },
    ];

    let balls = [];

    function spawnAll() {
        balls = [];
        for (const g of GROUPS) {
            for (let i = 0; i < 4; i++) {
                const angle = (Math.PI * 2 * i) / 4 + Math.random() * 0.5;
                balls.push({
                    x: W / 2,
                    y: H / 2,
                    vx: Math.cos(angle) * (8 + Math.random() * 4),
                    vy: Math.sin(angle) * (8 + Math.random() * 4),
                    r:  7,
                    friction: g.friction,
                    color:    g.color,
                });
            }
        }
    }

    spawnAll();

    // Clic → relance
    canvas.addEventListener('click', spawnAll);

    // Expose pour steps.js
    kit.demo = { balls, W, H, GROUPS, spawnAll };

    function drawLabels() {
        ctx.font      = '13px monospace';
        ctx.textAlign = 'left';
        for (const g of GROUPS) {
            ctx.fillStyle = g.color;
            ctx.fillText(`friction : ${g.label}`, 16, g.labelY);
        }
    }

    function update() {
        if (!kit.frozen) {
            ctx.clearRect(0, 0, W, H);
            drawLabels();

            for (const b of balls) {
                // Friction : réduction progressive de la vélocité
                b.vx *= b.friction;
                b.vy *= b.friction;

                b.x += b.vx;
                b.y += b.vy;

                // Rebond sur les murs (sans amortissement pour isoler la friction)
                if (b.x + b.r > W) { b.x = W - b.r; b.vx *= -1; }
                if (b.x - b.r < 0) { b.x = b.r;     b.vx *= -1; }
                if (b.y + b.r > H) { b.y = H - b.r;  b.vy *= -1; }
                if (b.y - b.r < 0) { b.y = b.r;      b.vy *= -1; }

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
