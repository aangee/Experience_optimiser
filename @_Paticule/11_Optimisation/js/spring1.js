console.log('init');
window.onload = function () {
    var canvas = document.getElementById('canvas'),
        context = canvas.getContext("2d"),
        width = canvas.width = window.innerWidth,
        height = canvas.height = window.innerHeight,
        springPoint = {
            x: width / 2,
            y: height / 2
        },
        weight = particle.create(
            Math.random() * width, Math.random() * height,
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
        context.clearRect(0, 0, width, height);


        var dx = springPoint.x - weight.x,
            dy = springPoint.y - weight.y,
            distance = Math.sqrt(dx * dx + dy * dy),
            springForce = (distance - springLength) * k,
            ax = dx / distance * springForce,
            ay = dy / distance * springForce;

        weight.vx += ax;
        weight.vy += ay;

        weight.update();


        context.beginPath();
        context.fillStyle = 'gold';
        context.arc(weight.x, weight.y, weight.radius, 0, M_PI * 2, false);
        context.fill();

        context.beginPath();
        context.fillStyle = 'pink';
        context.arc(springPoint.x, springPoint.y, 4, 0, M_PI * 2, false);
        context.fill();

        context.beginPath();
        context.strokeStyle = 'green';
        context.moveTo(weight.x, weight.y);
        context.lineTo(springPoint.x, springPoint.y);
        context.stroke();

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
