// Feu d'artifice — version Learn
// Réutilise Particle + Vec2D de MasterClass (déjà chargé dans index.html)
// N'utilise pas SetupCanvas car le canvas n'est pas plein écran ici

function initDemo(canvas, kit) {
    const ctx = canvas.getContext('2d');
    const W   = canvas.width;
    const H   = canvas.height;
    const TAU = Math.PI * 2;

    let particles = [];

    function createBurst(x, y) {
        for (let i = 0; i < 100; i++) {
            particles.push(
                new Particle(x, y, Math.random() * 4 + 1, Math.random() * TAU, 0)
            );
        }
    }

    // Explosion initiale au centre
    createBurst(W / 2, H / 2);

    // Expose pour steps.js
    kit.demo = { particles, createBurst, W, H };

    // Clic → nouvelle explosion
    canvas.addEventListener('click', e => {
        const rect = canvas.getBoundingClientRect();
        const sx   = W / rect.width;
        const sy   = H / rect.height;
        createBurst((e.clientX - rect.left) * sx, (e.clientY - rect.top) * sy);
    });

    let frameCount = 0;

    function update() {
        if (!kit.frozen) {
            ctx.clearRect(0, 0, W, H);
            for (let i = 0; i < particles.length; i++) {
                const p = particles[i];
                p.update();
                ctx.beginPath();
                ctx.fillStyle = 'red';
                ctx.arc(p.position.getX(), p.position.getY(), 5, 0, TAU);
                ctx.fill();
            }
            // Supprimer les particules hors canvas toutes les 120 frames
            if (++frameCount % 120 === 0) {
                particles = particles.filter(p =>
                    p.position.getX() > -20 && p.position.getX() < W + 20 &&
                    p.position.getY() > -20 && p.position.getY() < H + 20
                );
                kit.demo.particles = particles;
            }
        }
        requestAnimationFrame(update);
    }

    update();
}
