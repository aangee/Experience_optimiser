

window.onload = function () {
    var canvas = document.getElementById('canvas'),
        context = canvas.getContext("2d"),
        width = canvas.width = window.innerWidth,
        height = canvas.height = window.innerHeight,
        p = particle.create(width / 2, height / 2,
            Math.random() * 8 + 5,
            Math.random() * M_PI * 2,
            0.1),
        particles = [];


    p.radius = (Math.random() * 5 + 2);
    p.bounce = -.9;
    
    for (let i = 0; i < 20; i++) {
        var p = particle.create(width / 2, height / 2,
            Math.random() * 5 + 1,
            Math.random() * M_PI * 2,
            0.1);

        p.bounce = -.9;
        p.radius = (Math.random() * 5 + 2);
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


            if (p.position.getX() + p.radius > width) {
                p.position.setX(width - p.radius);
                p.velocity.setX(p.velocity.getX() * p.bounce);
            }
            if (p.position.getX() - p.radius < 0) {
                p.position.setX(p.radius);
                p.velocity.setX(p.velocity.getX() * p.bounce);
            }
            if (p.position.getY() + p.radius > height) {
                p.position.setY(height - p.radius);
                p.velocity.setY(p.velocity.getY() * p.bounce);
            }
            if (p.position.getY() - p.radius < 0) {
                p.position.setY(p.radius);
                p.velocity.setY(p.velocity.getY() * p.bounce);
            }
        }

        //removeDeadParticles();

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