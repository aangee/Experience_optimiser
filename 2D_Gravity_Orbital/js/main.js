window.onload = function () {
    var canvas = document.getElementById('canvas'),
        context = canvas.getContext("2d"),
        width = canvas.width = window.innerWidth,
        height = canvas.height = window.innerHeight,
        sun = particle.create(width / 2, height / 2, 0, 0),
        planet = particle.create(width / 2 + 200, height / 2, 2, -M_PI / 2),
        moon = particle.create(150, 150, 0, 0),
        particlesT = [],
        accel = vector.create(0.1, 0.1);


        let intervalSpawn = setInterval(() => {
            particlesT.push(particle.create(width / 2 + 200, height / 2, 2, -M_PI / 2));
        }, 500);

    /* for (let i = 0; i < 10; i++) {
        particlesT.push(particle.create(width / 2 + 200-i, height / 2-i, 2, -M_PI / 2))

    } */
    moon.mass = 1000;
    sun.mass = 1000;

    update();
    function update() {
    if(particlesT.length >= 100) clearInterval(intervalSpawn);
        context.clearRect(0, 0, width, height);

        

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

        context.beginPath();
        context.fillStyle = '#ffff00';
        context.arc(sun.position.getX(), sun.position.getY(), 20, 0, M_PI * 2, false);
        context.fill();

        context.beginPath();
        context.fillStyle = '#00ffff';
        context.arc(planet.position.getX(), planet.position.getY(), 5, 0, M_PI * 2, false);
        context.fill();

        context.beginPath();
        context.fillStyle = '#0f00f0';
        context.arc(moon.position.getX(), moon.position.getY(), 15, 0, M_PI * 2, false);
        context.fill();

        particlesT.forEach((particle) => {
            context.beginPath();
            context.fillStyle = '#f0f0f0';
            context.arc(particle.position.getX(), particle.position.getY(), 5, 0, M_PI * 2, false);
            context.fill();
        });
        requestAnimationFrame(update);
    }
}