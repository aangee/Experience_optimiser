

window.onload = function () {
    var canvas = document.getElementById('canvas'),
        context = canvas.getContext("2d"),
        width = canvas.width = window.innerWidth,
        height = canvas.height = window.innerHeight,
        particles = [];

    for (let i = 0; i < 100; i++) {
        var p = particle.create(width / 2, height / 2, Math.random() * 5 + 2, Math.random() * M_PI * 2);
        p.radius = 10;
        particles.push(p);
    }

    let DEBUG_DIV = document.querySelector('#debug_div');
    console.log(context);
    update();


    function update() {
        //context.clearRect(0, 0, width, height);
        DEBUG_DIV.innerHTML = 'Number particles: ' + particles.length;

        context.fillStyle = 'rgba(0,0,0,.98)';
        context.rect(0, 0, width, height);
        context.fill();


        for (let i = 0; i < particles.length; i++) {
            var p = particles[i];
            p.update();

            context.beginPath();
            context.fillStyle = 'rgba(200,0,200,.8)';
            context.strokeStyle = 'rgba(20,200,20,.8)';
            context.arc(p.position.getX(), p.position.getY(), p.radius, 0, M_PI * 2, false);
            context.stroke();
            context.fill();
        }

        removeDeadParticles();

        requestAnimationFrame(update);
    }

    function removeDeadParticles() {
        for (var i = particles.length - 1; i >= 0; i -= 1) {

            var p = particles[i];

            if (p.position.getX() - p.radius > width ||
                p.position.getX() + p.radius < 0 ||
                p.position.getY() - p.radius > height ||
                p.position.getY() + p.radius < 0
            ) {
                particles.splice(i, 1);
            }
        }
    }
}