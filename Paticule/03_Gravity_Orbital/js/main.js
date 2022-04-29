window.onload = function () {
    let M_PI = Math.PI;

    let setup = new SetupCanvas();

    let sun = new Particle(400, 400, 0, 0);
    let planet = new Particle(484, 308, 2, -M_PI / 2);
    let moon = new Particle(100, 100, 0, 0);
    let particlesT = [];


    let intervalSpawn = setInterval(() => {
        particlesT.push(new Particle(300, 200, 2, -M_PI / 2));
    }, 500);

    for (let i = 0; i < 10; i++) {
        particlesT.push(new Particle(200 - (i * 10), 450 - (i * 10), .5, -M_PI / 2))

    }
    moon.mass = 1000;
    sun.mass = 1000;

    update();
    function update() {

        if (particlesT.length >= 20) clearInterval(intervalSpawn);


        setup.ctx.clearRect(0, 0, setup.width, setup.height);



        planet.gravitateTo(sun);
        //planet.update();

        planet.gravitateTo(moon);
        planet.update();

        particlesT.forEach((particle) => {
            particle.gravitateTo(sun);
            //particle.update();
            particle.gravitateTo(moon);
            particle.update();
        });

        setup.ctx.beginPath();
        setup.ctx.strokeStyle = '#ffff00';
        setup.ctx.arc(sun.position.getX(), sun.position.getY(), 20, 0, M_PI * 2, false);
        setup.ctx.stroke();

        setup.ctx.beginPath();
        setup.ctx.strokeStyle = '#00ffff';
        setup.ctx.arc(planet.position.getX(), planet.position.getY(), 5, 0, M_PI * 2, false);
        setup.ctx.stroke();

        setup.ctx.beginPath();
        setup.ctx.strokeStyle = '#0f00f0';
        setup.ctx.arc(moon.position.getX(), moon.position.getY(), 15, 0, M_PI * 2, false);
        setup.ctx.stroke();

        particlesT.forEach((particle, i) => {
            setup.ctx.beginPath();
            if (i < 10) {

                setup.ctx.fillStyle = '#f04ef0';
            } else {

                setup.ctx.fillStyle = '#f0f0f0';
            }
            setup.ctx.arc(particle.position.getX(), particle.position.getY(), 5, 0, M_PI * 2, false);
            setup.ctx.fill();
        });
        requestAnimationFrame(update);
    }
}