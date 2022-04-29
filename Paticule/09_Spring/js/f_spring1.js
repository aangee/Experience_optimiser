function f_spring1() {

    let springPoint = new Vec2D(setup.width / 2, setup.height / 2);

    let particule = new ParticleVec2D(Math.random() * setup.width, Math.random() * setup.height, 50, Math.random() * M_PI * 2, .5);
    let k = 0.1 + Math.random() * .2;
    let springLenght = 50;


    particule.radius = 20;
    particule.friction = .86;// + Math.random() * .02;

    document.body.addEventListener('mousemove', function (event) {
        springPoint.setX(event.clientX);
        springPoint.setY(event.clientY);
    });


    update();
    function update() {

        ID_Animation = requestAnimationFrame(update);
        setup.ctx.clearRect(0, 0, setup.width, setup.height);

        let distance = springPoint.subtract(particule.position);
        distance.setLength(distance.getLength() - springLenght);
        let springForce = distance.multiply(k);

        particule.velocity.addTo(springForce);
        particule.update();


        setup.ctx.beginPath();
        setup.ctx.fillStyle = 'gold';
        setup.ctx.arc(particule.position.getX(), particule.position.getY(), particule.radius, 0, M_PI * 2, false);
        setup.ctx.fill();

        setup.ctx.beginPath();
        setup.ctx.fillStyle = 'pink';
        setup.ctx.arc(springPoint.getX(), springPoint.getY(), 4, 0, M_PI * 2, false);
        setup.ctx.fill();

        setup.ctx.beginPath();
        setup.ctx.strokeStyle = 'green';
        setup.ctx.moveTo(particule.position.getX(), particule.position.getY());
        setup.ctx.lineTo(springPoint.getX(), springPoint.getY());
        setup.ctx.stroke();
    }
};
