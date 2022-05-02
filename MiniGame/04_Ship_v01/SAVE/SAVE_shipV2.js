window.onload = function () {
    var canvas = document.getElementById('canvas'),
        context = canvas.getContext("2d"),
        width = canvas.width = window.innerWidth,
        height = canvas.height = window.innerHeight,
        shipp = particle.create(width / 2, height / 2, 0, 0),
        thrust = vector.create(0, 0),
        angle = 0,
        speed = 1,
        maxSpeed = 10,
        turningLeft = false,
        turningRight = false,
        thrusting = false,
        thrustingBack = false;

    shipp.friction = 0.9975;
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

        context.fillStyle = 'rgba(0,0,0,.98)';
        context.rect(0, 0, width, height);
        context.fill();

        // calcule Rotation
        if (turningLeft) {
            angle -= .05;
        }
        if (turningRight) {
            angle += .05;
        }

        thrust.setAngle(angle);

        // calcule Acceleration
        if (thrusting) {
            thrust.setLength(0.1);
            shipp.friction = 0.99;
        } else if (thrustingBack) {
            thrust.setLength(-0.1);
            shipp.friction = 0.99;
        } else {
            shipp.friction = 0.9975;
            thrust.setLength(0);
        }

        // set accelation & rotation
        shipp.accelerate(thrust.getX(),thrust.getY());
        shipp.update();


        //TODO: Draw ship
        context.save();
        context.translate(shipp.x, shipp.y);
        context.rotate(angle);
        context.scale(3,3);

        context.beginPath();

        //context.imageSmoothingQuality = 'medium';
        context.lineWidth = 2;
        context.fillStyle = 'rgba(200,0,200,.8)';
        context.strokeStyle = 'rgba(20,200,20,.8)';
        context.arc(-6, 0, 4, 0, Math.PI * 2, false);

        context.lineJoin="round";//bevel|round|miter
        context.moveTo(10, 0);
        context.lineTo(-10, -7);
        context.lineTo(-10, 7);
        context.lineTo(10, 0);
        context.closePath();


        context.stroke();
        context.fill();



        // Canon AV
        context.beginPath();
        context.lineCap="round";//butt|round|square

        context.lineWidth = 1;
        context.moveTo(-4, -5);
        context.lineTo(10, -5);
        context.moveTo(-4, 5);
        context.lineTo(10, 5);

        context.stroke();

        //TODO:Draw thruster
        context.beginPath();
        context.lineWidth = 1;
        context.strokeStyle = 'rgba(200,150,0,.8)';
        if (thrusting) {
            context.moveTo(-10, 0);
            context.lineTo(-18, 0);

            context.moveTo(-10, 3);
            context.lineTo(-14, 4);

            context.moveTo(-10, -3);
            context.lineTo(-14, -4);
        } 
        else if (thrustingBack) {
            context.moveTo(10, 0);
            context.lineTo(18, 0);

            context.moveTo(10, 3);
            context.lineTo(14, 4);

            context.moveTo(10, -3);
            context.lineTo(14, -4);
        }
        context.stroke();
        context.restore();

        // Wrapping out canvas 
        if (shipp.x > width) {
            shipp.x = 0;
        }
        if (shipp.x < 0) {
            shipp.x = width;
        }
        if (shipp.y > height) {
            shipp.y = 0;
        }
        if (shipp.y < 0) {
            shipp.y = height;
        }
        requestAnimationFrame(update);
    }
}