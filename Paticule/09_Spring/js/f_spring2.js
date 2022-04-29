
function f_spring2() {


    let particleA = new ParticleVec2D(
        utils.randomRange(0, setup.width),
        utils.randomRange(0, setup.height),
        utils.randomRange(0, 50),
        utils.randomRange(0, M_PI * 2), .5);
    let particleB = new ParticleVec2D(
        utils.randomRange(0, setup.width),
        utils.randomRange(0, setup.height),
        utils.randomRange(0, 50),
        utils.randomRange(0, M_PI * 2), .5);

    let particleC = new ParticleVec2D(
        utils.randomRange(0, setup.width),
        utils.randomRange(0, setup.height),
        utils.randomRange(0, 50),
        utils.randomRange(0, M_PI * 2), .5);


    let k = 0.01;
    let separation = 150;



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
        particleA.position.setX(event.clientX);
        particleA.position.setY(event.clientY);
    });

    update();

    function update() {
        ID_Animation = requestAnimationFrame(update);
        setup.ctx.clearRect(0, 0, setup.width, setup.height);

        /* spring(particleA, particleB, separation);
        spring(particleB, particleC, separation);
        spring(particleC, particleA, separation); */

        spring(particleA, particleB, separation);
        spring(particleA, particleC, separation);
        //spring(particleC, particleA, separation);

        particleA.update();
        particleB.update();
        particleC.update();

        setup.ctx.beginPath();
        setup.ctx.strokeStyle = 'green';
        setup.ctx.moveTo(particleA.position.getX(), particleA.position.getY());
        setup.ctx.lineTo(particleB.position.getX(), particleB.position.getY());
        setup.ctx.lineTo(particleC.position.getX(), particleC.position.getY());
        setup.ctx.lineTo(particleA.position.getX(), particleA.position.getY());
        setup.ctx.stroke();


        setup.ctx.strokeStyle = 'gold';
        setup.ctx.beginPath();
        setup.ctx.fillStyle = 'blue';
        setup.ctx.arc(particleA.position.getX(), particleA.position.getY(), particleA.radius, 0, M_PI * 2, false);
        setup.ctx.fill();
        setup.ctx.stroke();

        setup.ctx.beginPath();
        setup.ctx.fillStyle = 'white';
        setup.ctx.arc(particleB.position.getX(), particleB.position.getY(), particleB.radius, 0, M_PI * 2, false);
        setup.ctx.fill();
        setup.ctx.stroke();

        setup.ctx.beginPath();
        setup.ctx.fillStyle = 'red';
        setup.ctx.arc(particleC.position.getX(), particleC.position.getY(), particleC.radius, 0, M_PI * 2, false);
        setup.ctx.fill();
        setup.ctx.stroke();

        detectionEdges(particleA);
        detectionEdges(particleB);
        detectionEdges(particleC);



    }
    function detectionEdges(p) {
        if (p.position.getX() + p.radius > setup.width) {
            p.position.setX(setup.width - p.radius);
            p.velocity.setX(p.velocity.getX() * p.bounce);
        }
        if (p.position.getX() - p.radius < 0) {
            p.position.setX(p.radius);
            p.velocity.setX(p.velocity.getX() * p.bounce);
        }
        if (p.position.getY() + p.radius > setup.height) {
            p.position.setY(setup.height - p.radius);
            p.velocity.setY(p.velocity.getY() * p.bounce);
        }
        if (p.position.getY() - p.radius < 0) {
            p.position.setY(p.radius);
            p.velocity.setY(p.velocity.getY() * p.bounce);
        }
    }
    function spring(p0, p1, separation) {
        let distance = p0.position.subtract(p1.position);
        distance.setLength(distance.getLength() - separation);

        let springForce = distance.multiply(k);

        p1.velocity.addTo(springForce);
        p0.velocity.subtractFrom(springForce);
    }
};
