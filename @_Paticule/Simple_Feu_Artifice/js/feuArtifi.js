console.log('init');
const M_PI = Math.PI;
window.onload = function () {
    var canvas = document.getElementById('canvas'),
        context = canvas.getContext("2d"),
        width = canvas.width = window.innerWidth,
        height = canvas.height = window.innerHeight,
        particles = [],
        numParticles = 100;


    for (var i = 0; i < numParticles; i += 1) {
        particles.push(particle.create(width / 2, height / 2, (Math.random() * 4 + 1), (Math.random() * M_PI * 2),0))
    }

    update();

    function update() {
        context.clearRect(0, 0, width, height);

  

        for (let i = 0; i < numParticles; i += 1) {
            const p = particles[i];
            p.update();
            context.beginPath();
            context.fillStyle = 'red';
            context.arc(p.position.getX(), p.position.getY(), 5, 0, M_PI * 2, false);
            context.fill();

        }

        requestAnimationFrame(update);
    }
};
