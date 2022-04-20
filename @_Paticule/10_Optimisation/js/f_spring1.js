function f_spring1() {


    let springPoint = {
        x: setup.width / 2,
        y: setup.height / 2
    },
        weight = new Particle(
            Math.random() * setup.width, Math.random() * setup.height,
            50, Math.random() * Math.PI * 2, 0.5),
        k = 0.1,
        springLength = 100;

    weight.radius = 20;
    weight.friction = 0.95;

    document.body.addEventListener("mousemove", function (event) {
        springPoint.x = event.clientX;
        springPoint.y = event.clientY;
    });
    /*    for (var i = 0; i < numParticles; i += 1) {
           let p = particle.create(width / 2, height / 2, (Math.random() * 4 + 1), (Math.random() * M_PI * 2),0);
           p.radius = 5;
           particles.push(p)
       } */

    update();

    function update() {
        setup.ctx.clearRect(0, 0, setup.width, setup.height);


        var dx = springPoint.x - weight.x,
            dy = springPoint.y - weight.y,
            distance = Math.sqrt(dx * dx + dy * dy),
            springForce = (distance - springLength) * k,
            ax = dx / distance * springForce,
            ay = dy / distance * springForce;

        weight.vx += ax;
        weight.vy += ay;

        weight.update();


        setup.ctx.beginPath();
        setup.ctx.fillStyle = 'gold';
        setup.ctx.arc(weight.x, weight.y, weight.radius, 0, M_PI * 2, false);
        setup.ctx.fill();

        setup.ctx.beginPath();
        setup.ctx.fillStyle = 'pink';
        setup.ctx.arc(springPoint.x, springPoint.y, 4, 0, M_PI * 2, false);
        setup.ctx.fill();

        setup.ctx.beginPath();
        setup.ctx.strokeStyle = 'green';
        setup.ctx.moveTo(weight.x, weight.y);
        setup.ctx.lineTo(springPoint.x, springPoint.y);
        setup.ctx.stroke();

        /*  for (let i = 0; i < numParticles; i += 1) {
             const p = particles[i];
             p.update();
             context.beginPath();
             context.fillStyle = 'red';
             context.arc(p.position.getX(), p.position.getY(), p.radius, 0, M_PI * 2, false);
             context.fill();
 
         } */

        requestAnimationFrame(update);
    }
};
