window.onload = function () {
    let M_PI = Math.PI;

    let setup = new SetupCanvas();

    let p = particle.create(setup.width / 2, setup.height / 2, 3, Math.random() * M_PI * 2);

    p.radius = 100;

    console.log(setup.ctx);
    update();

    document.body.addEventListener('keydown', function (event) {
        /* console.log(event.keyCode);
        console.log(event.key); */
        switch (event.key) {
            case 'z': // up
                thrusting = true;
                break;
            case 's': // down
                //thrust.setY(0.1);
                thrustingBack = true;
                break;
            case 'q': // left
                turningLeft = true;
                break;
            case 'd': // right
                turningRight = true;
                break;

            default:
                break;
        }
    });

    document.body.addEventListener('keyup', function (event) {
        /* console.log(event.keyCode);
        console.log(event.key); */
        switch (event.key) {
            case 'z': // up
                thrusting = false;
                break;
            case 's': // down
                thrustingBack = false;
                break;
            case 'q': // left
                turningLeft = false;
                break;
            case 'd': // right
                turningRight = false;
                break;

            default:
                break;
        }
    });


    function update() {
        //context.clearRect(0, 0, width, height);

        setup.ctx.fillStyle = 'rgba(0,0,0,.98)';
        setup.ctx.rect(0, 0, setup.width, setup.height);
        setup.ctx.fill();

        p.update();


        setup.ctx.beginPath();
        setup.ctx.fillStyle = 'rgba(200,0,200,.8)';
        setup.ctx.strokeStyle = 'rgba(20,200,20,.8)';
        setup.ctx.arc(p.position.getX(), p.position.getY(), p.radius, 0, M_PI * 2, false);
        setup.ctx.stroke();
        setup.ctx.fill();


        if (p.position.getX() - p.radius > setup.width) {
            p.position.setX(- p.radius);
        }
        if (p.position.getX() + p.radius < 0) {
            p.position.setX(setup.width + p.radius);
        }
        if (p.position.getY() - p.radius > setup.height) {
            p.position.setY(- p.radius);
        }
        if (p.position.getY() + p.radius < 0) {
            p.position.setY(setup.height + p.radius);
        }
        requestAnimationFrame(update);
    }
}