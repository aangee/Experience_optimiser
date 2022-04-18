window.onload = function () {
    var canvas = document.getElementById('canvas');
    /**@type {CanvasRenderingContext2D} */
    let context = canvas.getContext("2d"),
        width = canvas.width = window.innerWidth,
        height = canvas.height = window.innerHeight,
        sun = particle.create(400, 400, 0, 0),
        planet = particle.create(484, 308, 2, -M_PI / 2),
        moon = particle.create(100, 100, 0, 0),
        particlesT = [],
        accel = vector.create(0.1, 0.1);


    let intervalSpawn = setInterval(() => {
        particlesT.push(particle.create(300, 200, 2, -M_PI / 2));
    }, 500);

    for (let i = 0; i < 10; i++) {
        particlesT.push(particle.create(200 - (i * 10), 450 - (i * 10), .5, -M_PI / 2))

    }
    moon.mass = 1000;
    sun.mass = 1000;

    update();
    function update() {

        if (particlesT.length >= 20) clearInterval(intervalSpawn);


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
        context.strokeStyle = '#ffff00';
        context.arc(sun.position.getX(), sun.position.getY(), 20, 0, M_PI * 2, false);
        context.stroke();

        context.beginPath();
        context.strokeStyle = '#00ffff';
        context.arc(planet.position.getX(), planet.position.getY(), 5, 0, M_PI * 2, false);
        context.stroke();

        context.beginPath();
        context.strokeStyle = '#0f00f0';
        context.arc(moon.position.getX(), moon.position.getY(), 15, 0, M_PI * 2, false);
        context.stroke();

        particlesT.forEach((particle, i) => {
            context.beginPath();
            if (i < 10) {

                context.fillStyle = '#f04ef0';
            } else {

                context.fillStyle = '#f0f0f0';
            }
            context.arc(particle.position.getX(), particle.position.getY(), 5, 0, M_PI * 2, false);
            context.fill();
        });
        requestAnimationFrame(update);
    }
}