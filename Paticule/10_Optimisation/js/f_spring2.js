function f_spring2() {

    let particleA = new Particle(
        utils.randomRange(0, setup.width),
        utils.randomRange(0, setup.height),
        utils.randomRange(0, 50),
        utils.randomRange(0, M_PI * 2), .5),

        particleB = new Particle(
            utils.randomRange(0, setup.width),
            utils.randomRange(0, setup.height),
            utils.randomRange(0, 50),
            utils.randomRange(0, M_PI * 2), .5),

        particleC = new Particle(
            utils.randomRange(0, setup.width),
            utils.randomRange(0, setup.height),
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
        setup.ctx.clearRect(0, 0, setup.width, setup.height);

        /* spring(particleA, particleB, separation);
        spring(particleB, particleC, separation);
        spring(particleC, particleA, separation); */

        spring(particleA, particleB, separation);
        spring(particleA, particleC, separation);
        spring(particleC, particleB, separation);

        particleA.update();
        particleB.update();
        particleC.update();

        setup.ctx.beginPath();
        setup.ctx.strokeStyle = 'green';
        setup.ctx.moveTo(particleA.x, particleA.y);
        setup.ctx.lineTo(particleB.x, particleB.y);
        setup.ctx.lineTo(particleC.x, particleC.y);
        setup.ctx.lineTo(particleA.x, particleA.y);
        setup.ctx.stroke();


        setup.ctx.strokeStyle = 'gold';
        setup.ctx.beginPath();
        setup.ctx.fillStyle = 'blue';
        setup.ctx.arc(particleA.x, particleA.y, particleA.radius, 0, M_PI * 2, false);
        setup.ctx.fill();
        setup.ctx.stroke();

        setup.ctx.beginPath();
        setup.ctx.fillStyle = 'white';
        setup.ctx.arc(particleB.x, particleB.y, particleB.radius, 0, M_PI * 2, false);
        setup.ctx.fill();
        setup.ctx.stroke();

        setup.ctx.beginPath();
        setup.ctx.fillStyle = 'red';
        setup.ctx.arc(particleC.x, particleC.y, particleC.radius, 0, M_PI * 2, false);
        setup.ctx.fill();
        setup.ctx.stroke();

        detectionEdges(particleA);
        detectionEdges(particleB);
        detectionEdges(particleC);



        requestAnimationFrame(update);
    }
    function detectionEdges(p) {
        if (p.x + p.radius > setup.width) {
            p.x = (setup.width - p.radius);
            p.vx = (p.vx * p.bounce);
        }
        if (p.x - p.radius < 0) {
            p.x = (p.radius);
            p.vx = (p.vx * p.bounce);
        }
        if (p.y + p.radius > setup.height) {
            p.y = (setup.height - p.radius);
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
