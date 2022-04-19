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
            utils.randomRange(0, M_PI * 2),.5),

        particleB = particle.create(
            utils.randomRange(0, width),
            utils.randomRange(0, height),
            utils.randomRange(0, 50),
            utils.randomRange(0, M_PI * 2),.5),

        particleC = particle.create(
            utils.randomRange(0, width),
            utils.randomRange(0, height),
            utils.randomRange(0, 50),
            utils.randomRange(0, M_PI * 2),.5),


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
        particleA.position.setX(event.clientX);
        particleA.position.setY(event.clientY);
    });

    update();

    function update() {
        context.clearRect(0, 0, width, height);

        /* spring(particleA, particleB, separation);
        spring(particleB, particleC, separation);
        spring(particleC, particleA, separation); */

        spring(particleA, particleB, separation);
        spring(particleA, particleC, separation);
        //spring(particleC, particleA, separation);

        particleA.update();
        particleB.update();
        particleC.update();

        context.beginPath();
        context.strokeStyle = 'green';
        context.moveTo(particleA.position.getX(), particleA.position.getY());
        context.lineTo(particleB.position.getX(), particleB.position.getY());
        context.lineTo(particleC.position.getX(), particleC.position.getY());
        context.lineTo(particleA.position.getX(), particleA.position.getY());
        context.stroke();

        
        context.strokeStyle = 'gold';
        context.beginPath();
        context.fillStyle = 'blue';
        context.arc(particleA.position.getX(), particleA.position.getY(), particleA.radius, 0, M_PI * 2, false);
        context.fill();
        context.stroke();

        context.beginPath();
        context.fillStyle = 'white';
        context.arc(particleB.position.getX(), particleB.position.getY(), particleB.radius, 0, M_PI * 2, false);
        context.fill();
        context.stroke();

        context.beginPath();
        context.fillStyle = 'red';
        context.arc(particleC.position.getX(), particleC.position.getY(), particleC.radius, 0, M_PI * 2, false);
        context.fill();
        context.stroke();

        detectionEdges(particleA);
        detectionEdges(particleB);
        detectionEdges(particleC);



        requestAnimationFrame(update);
    }
    function detectionEdges(p) {
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
    function spring(p0, p1, separation) {
        var distance = p0.position.subtract(p1.position);
        distance.setLength(distance.getLength() - separation);

        var springForce = distance.multiply(k);

        p1.velocity.addTo(springForce);
        p0.velocity.subtractFrom(springForce);
    }
};
