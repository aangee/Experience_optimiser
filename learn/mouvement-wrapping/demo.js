// Wrapping — version Learn
// Plusieurs particules se déplacent à vitesse constante et wrappent sur les bords
// Z/Q/D pour piloter la principale, les autres bougent automatiquement

function initDemo(canvas, kit) {
    const ctx = canvas.getContext('2d');
    const W   = canvas.width;
    const H   = canvas.height;
    const TAU = Math.PI * 2;

    const COLORS = ['#FF6B6B', '#4ECDC4', '#45B7D1', '#96CEB4', '#FFEAA7', '#DDA0DD'];

    // Particule principale (contrôlable)
    const main = {
        x: W / 2, y: H / 2,
        vx: 2.5, vy: 1.2,
        r: 14,
        color: '#FFD700',
        angle: 0,
        thrusting: false,
        turningLeft: false,
        turningRight: false,
    };

    // Particules automatiques
    const autos = Array.from({ length: 8 }, (_, i) => ({
        x: Math.random() * W,
        y: Math.random() * H,
        vx: (Math.random() - 0.5) * 4,
        vy: (Math.random() - 0.5) * 4,
        r: Math.random() * 5 + 3,
        color: COLORS[i % COLORS.length],
    }));

    // Contrôles clavier pour la particule principale
    const keys = {};
    document.addEventListener('keydown', e => { keys[e.key] = true; });
    document.addEventListener('keyup',   e => { keys[e.key] = false; });

    // Expose pour steps.js
    kit.demo = { main, autos, W, H };

    function wrapParticle(p) {
        if (p.x - p.r > W)  p.x = -p.r;
        if (p.x + p.r < 0)  p.x = W + p.r;
        if (p.y - p.r > H)  p.y = -p.r;
        if (p.y + p.r < 0)  p.y = H + p.r;
    }

    function drawParticle(p, isMain) {
        ctx.beginPath();
        ctx.fillStyle   = p.color;
        ctx.strokeStyle = isMain ? '#fff' : 'transparent';
        ctx.lineWidth   = 2;
        ctx.arc(p.x, p.y, p.r, 0, TAU);
        ctx.fill();
        if (isMain) ctx.stroke();
    }

    function update() {
        if (!kit.frozen) {
            ctx.clearRect(0, 0, W, H);

            // Contrôle particule principale
            if (keys['z'] || keys['Z']) {
                main.vx += Math.cos(main.angle) * 0.3;
                main.vy += Math.sin(main.angle) * 0.3;
            }
            if (keys['q'] || keys['Q']) main.angle -= 0.05;
            if (keys['d'] || keys['D']) main.angle += 0.05;

            // Friction légère sur la principale
            main.vx *= 0.99;
            main.vy *= 0.99;

            // Déplacement + wrapping de la principale
            main.x += main.vx;
            main.y += main.vy;
            wrapParticle(main);
            drawParticle(main, true);

            // Particules automatiques
            for (const p of autos) {
                p.x += p.vx;
                p.y += p.vy;
                wrapParticle(p);
                drawParticle(p, false);
            }

            // Indicateur de direction sur la principale
            ctx.beginPath();
            ctx.strokeStyle = '#FFD70088';
            ctx.lineWidth   = 2;
            ctx.moveTo(main.x, main.y);
            ctx.lineTo(
                main.x + Math.cos(main.angle) * 24,
                main.y + Math.sin(main.angle) * 24
            );
            ctx.stroke();
        }
        // Vecteurs sur couche SVG — mis à jour même quand gelé
        if (kit.showVectors)
            kit.drawVelocityVectors([main, ...autos], { scale: 18, maxCount: 9 });

        requestAnimationFrame(update);
    }

    update();
}
