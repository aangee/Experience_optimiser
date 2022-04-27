window.onload = function () {
    var canvas = document.getElementById('canvas'),
        context = canvas.getContext("2d"),
        width = canvas.width = window.innerWidth,
        height = canvas.height = window.innerHeight,
        ship = particle.create(width / 2, height / 2, 0, 0),
        thrust = vector.create(0, 0),
        angle = 0,
        turningLeft = false,
        turningRight = false,
        thrusting = false,
        thrustingBack = false;


    ship.friction = 0.9975;
    console.log(context);
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

        context.fillStyle = 'rgba(38,38,38,.98)';
        context.rect(0, 0, width, height);
        context.fill();

        if (turningLeft) {
            angle -= .05;
        }
        if (turningRight) {
            angle += .05;
        }
        thrust.setAngle(angle);
        if (thrusting) {
            thrust.setLength(0.1);
        } else if (thrustingBack) {
            thrust.setLength(-0.1);
        } else {
            thrust.setLength(0);
        }

        // On limite la vitesse du ship
        if (ship.velocity.getLength() <= 5) ship.accelerate(thrust);


        ship.update();

        context.save();
        context.translate(ship.position.getX(), ship.position.getY());
        context.rotate(angle);

        context.beginPath();
        //context.imageSmoothingQuality = 'medium';
        context.lineWidth = 2;
        context.fillStyle = 'rgba(200,0,200,.8)';
        context.strokeStyle = 'rgba(20,200,20,.8)';
        context.arc(0, 0, 5, 0, (Math.PI) * 2, false);
        context.moveTo(10, 0);
        context.lineTo(-10, -7);
        context.lineTo(-10, 7);
        context.lineTo(10, 0);

        context.stroke();
        context.fill();


        //context.save();
        context.beginPath();
        context.lineWidth = 1;
        context.strokeStyle = 'rgba(200,150,0,.8)';
        if (thrusting) {
            //console.log(context);
            context.moveTo(-10, 0);
            context.lineTo(-18, 0);

            context.moveTo(-10, 3);
            context.lineTo(-14, 4);

            context.moveTo(-10, -3);
            context.lineTo(-14, -4);

            //context.stroke();

        } else if (thrustingBack) {
            //console.log(context);
            //context.beginPath();
            //context.strokeStyle = 'rgba(255,0,0,.8)';
            context.moveTo(10, 0);
            context.lineTo(18, 0);

            context.moveTo(10, 3);
            context.lineTo(14, 4);

            context.moveTo(10, -3);
            context.lineTo(14, -4);



        }
        context.stroke();
        //context.restore();

        /* context.stroke();
        context.fill(); */
        context.restore();

        if (ship.position.getX() > width) {
            ship.position.setX(0);
        }
        if (ship.position.getX() < 0) {
            ship.position.setX(width);
        }
        if (ship.position.getY() > height) {
            ship.position.setY(0);
        }
        if (ship.position.getY() < 0) {
            ship.position.setY(height);
        }
        requestAnimationFrame(update);
    }
}