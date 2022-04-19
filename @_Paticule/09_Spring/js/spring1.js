window.onload = function () {
    var canvas = document.getElementById('canvas'),
        context = canvas.getContext("2d"),
        width = canvas.width = window.innerWidth,
        height = canvas.height = window.innerHeight,

        springPoint = vector.create(width / 2, height / 2),
        weight = particle.create(Math.random() * width, Math.random() * height,
            50, Math.random() * M_PI * 2,.5),
        k = 0.1 + Math.random() * .2,
        springLenght = 50;

    weight.radius = 20;
    weight.friction = .86;// + Math.random() * .02;

    document.body.addEventListener('mousemove', function (event) {
        springPoint.setX(event.clientX);
        springPoint.setY(event.clientY);
    });


    update();
    function update() {
        requestAnimationFrame(update);

        context.clearRect(0, 0, width, height);

        var distance = springPoint.subtract(weight.position);
        distance.setLength(distance.getLength() - springLenght);
        var springForce = distance.multiply(k);

        weight.velocity.addTo(springForce);
        weight.update();


        context.beginPath();
        context.fillStyle = 'gold';
        context.arc(weight.position.getX(), weight.position.getY(), weight.radius, 0, M_PI * 2, false);
        context.fill();

        context.beginPath();
        context.fillStyle = 'pink';
        context.arc(springPoint.getX(), springPoint.getY(), 4, 0, M_PI * 2, false);
        context.fill();

        context.beginPath();
        context.strokeStyle = 'green';
        context.moveTo(weight.position.getX(), weight.position.getY());
        context.lineTo(springPoint.getX(), springPoint.getY());
        context.stroke();
    }
};
