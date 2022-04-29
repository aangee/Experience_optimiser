

window.onload = function () {

    let setup = new SetupCanvas();

    let p = particle.create(setup.width / 2, setup.height / 2,
        Math.random() * 18 + 5,
        Math.random() * M_PI * 2,
        .5);

    let friction = vector.create(0.15, 0);
    let particles = [p];


    p.radius = (Math.random() * 5 + 2);
    p.bounce = -.9;

    for (let i = 0; i < 20; i++) {
        let p = particle.create(setup.width / 2, setup.height * .3,
            Math.random() * 8 + 3,
            Math.random() * M_PI * 2,
            0);

        p.bounce = -.9;
        p.radius = (Math.random() * 5 + 2);
        particles.push(p);
    }

    let DEBUG_DIV = document.getElementById('js-debug');


    update();
    function update() {
        //context.clearRect(0, 0, width, height);
        DEBUG_DIV.innerHTML = 'Number particles: ' + particles.length;

        setup.ctx.fillStyle = 'rgba(0,0,0,.98)';
        setup.ctx.rect(0, 0, setup.width, setup.height);
        setup.ctx.fill();


        for (let i = 0; i < particles.length; i++) {
            var p = particles[i];

            friction.setAngle(p.velocity.getAngle());
            if (p.velocity.getLength() > friction.getLength()) {

                p.velocity.subtractFrom(friction);
            }
            else {

                p.velocity.setLength(0);
            }
            p.update();

            setup.ctx.beginPath();
            setup.ctx.fillStyle = 'rgba(200,0,200,.8)';
            setup.ctx.strokeStyle = 'rgba(20,200,20,.8)';
            setup.ctx.arc(p.position.getX(), p.position.getY(), p.radius, 0, M_PI * 2, false);
            setup.ctx.stroke();
            setup.ctx.fill();


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

        requestAnimationFrame(update);
    }
}