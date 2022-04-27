window.onload = function () {
    let canvas = document.getElementById('canvas');
    let context = canvas.getContext("2d");
    let width = canvas.width = window.innerWidth;
    let height = canvas.height = window.innerHeight;
    let ship = particle.create(width / 2, height / 2, 0, 0);
    let thrust = vector.create(0, 0);
    let angle = 0;
    let turningLeft = false;
    let turningRight = false;
    let thrusting = false;
    let thrustingBack = false;



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
        if (ship.velocity.getLength() >= 5) ship.velocity.setLength(5);
        ship.accelerate(thrust);
        ship.update();

        context.save();
        context.translate(ship.position.getX(), ship.position.getY());
        context.rotate(angle);

        context.beginPath();
        //context.imageSmoothingQuality = 'medium';
        context.lineWidth = 2;
        context.fillStyle = 'rgba(200,0,200,.8)';
        context.strokeStyle = 'rgba(20,200,20,.8)';
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