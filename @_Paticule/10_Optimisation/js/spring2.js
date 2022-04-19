console.log('init');
window.onload = function () {
    var canvas = document.getElementById('canvas'),
        context = canvas.getContext("2d"),
        width = canvas.width = window.innerWidth,
        height = canvas.height = window.innerHeight,

        particleA = particle.create(
            utils.randomRange(0, width),
            utils.randomRange(0, height),
            utils.randomRange(0, 50),
            utils.randomRange(0, M_PI * 2), .5),

        particleB = particle.create(
            utils.randomRange(0, width),
            utils.randomRange(0, height),
            utils.randomRange(0, 50),
            utils.randomRange(0, M_PI * 2), .5),

        particleC = particle.create(
            utils.randomRange(0, width),
            utils.randomRange(0, height),
            utils.randomRange(0, 50),
            utils.randomRange(0, M_PI * 2), .5),


        k = 0.01,
        separation = 150;



    particleA.friction = 0.98;
    particleA.radius = 20;
    particleA.bounce = -.9;


    particleB.friction = 0.98;
    particleB.radius = 15;
    particleB.bounce = -.9;

    particleC.friction = 0.98;
    particleC.radius = 10;
    particleC.bounce = -.9;


    document.body.addEventListener('mousemove', function (event) {
        /* particleA.position.setX(event.clientX);
        particleA.position.setY(event.clientY); */
    });
    document.body.addEventListener('mousedown', function (event) {
        particleA.x = (event.clientX);
        particleA.y = (event.clientY);
    });

    update();

    function update() {
        context.clearRect(0, 0, width, height);

        /* spring(particleA, particleB, separation);
        spring(particleB, particleC, separation);
        spring(particleC, particleA, separation); */

        spring(particleA, particleB, separation);
        spring(particleA, particleC, separation);
        spring(particleC, particleB, separation);

        particleA.update();
        particleB.update();
        particleC.update();

        context.beginPath();
        context.strokeStyle = 'green';
        context.moveTo(particleA.x, particleA.y);
        context.lineTo(particleB.x, particleB.y);
        context.lineTo(particleC.x, particleC.y);
        context.lineTo(particleA.x, particleA.y);
        context.stroke();


        context.strokeStyle = 'gold';
        context.beginPath();
        context.fillStyle = 'blue';
        context.arc(particleA.x, particleA.y, particleA.radius, 0, M_PI * 2, false);
        context.fill();
        context.stroke();

        context.beginPath();
        context.fillStyle = 'white';
        context.arc(particleB.x, particleB.y, particleB.radius, 0, M_PI * 2, false);
        context.fill();
        context.stroke();

        context.beginPath();
        context.fillStyle = 'red';
        context.arc(particleC.x, particleC.y, particleC.radius, 0, M_PI * 2, false);
        context.fill();
        context.stroke();

        detectionEdges(particleA);
        detectionEdges(particleB);
        detectionEdges(particleC);



        requestAnimationFrame(update);
    }
    function detectionEdges(p) {
        if (p.x + p.radius > width) {
            p.x = (width - p.radius);
            p.vx = (p.vx * p.bounce);
        }
        if (p.x - p.radius < 0) {
            p.x = (p.radius);
            p.vx = (p.vx * p.bounce);
        }
        if (p.y + p.radius > height) {
            p.y = (height - p.radius);
            p.vy = (p.vy * p.bounce);
        }
        if (p.y - p.radius < 0) {
            p.y = (p.radius);
            p.vy = (p.vy * p.bounce);
        }
    }
    function spring(p0, p1, separation) {
        var dx = p0.x - p1.x,
            dy = p0.y - p1.y,
            distance = Math.sqrt(dx * dx + dy * dy),
            springForce = (distance - separation) * k,
            ax = dx / distance * springForce,
            ay = dy / distance * springForce;

        /* p1.velocity.addTo(springForce);
        p0.velocity.subtractFrom(springForce); */

        p1.vx += ax;
        p1.vy += ay;
        p0.vx -= ax;
        p0.vy -= ay;
    }
};
