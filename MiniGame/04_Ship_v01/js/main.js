
let isAppPause = false;
let level00;
window.onload = function () {
    let cooldownShoot = 0;
    let canvas = document.getElementById("canvas");
    let context = canvas.getContext("2d");
    let targetCanvas = document.getElementById("target");
    let targetContext = targetCanvas.getContext("2d");
    let width = canvas.width = targetCanvas.width = window.innerWidth;
    let height = canvas.height = targetCanvas.height = window.innerHeight;
    let animationID = 0;
    let conteur = 0;
    let ship = new Ship(canvas, width / 2 + 80, height / 2 + 40);
    level00 = new Level(
        {
            canvas00: canvas,
            ctx00: context,
            canvas01: targetCanvas,
            ctx01: targetContext
        },
        {
            idLevel: 0,
            ship: ship,
            numEnemys: 3,
            isEnemyRespawn: false
        });
    //level00.start();


    DebugInfo.create(context, 10, 10, 165, 135, true);

    //#region EVENTs DOM-Element-body
    document.body.addEventListener('keydown', function (event) {
        /*console.log(event.keyCode);*/
        console.log(event.key);
        switch (event.key) {
            case 'z': // up
                ship.thrusting = true;
                break;
            case 's': // down
                ship.thrustingBack = true;
                break;
            case 'q': // left
                ship.turningLeft = true;
                break;
            case 'd': // right 
                ship.turningRight = true;
                break;
            case 'Escape': // Escape ou echap
                

                break;
            case '²': // Escape ou echap
                isAppPause = !isAppPause;
                if (isAppPause) {
                    cancelAnimationFrame(animationID);
                } else {
                    gameLoop();
                }
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
                ship.thrusting = false;
                break;
            case 's': // down
                ship.thrustingBack = false;
                break;
            case 'q': // left
                ship.turningLeft = false;
                break;
            case 'd': // right
                ship.turningRight = false;
                break;
            case 'Escape': // Escape ou echap
                DebugInfo.isShowDebug = !DebugInfo.isShowDebug;
                break;

            default:
                break;
        }
    });
    document.body.addEventListener('mousemove', (event) => {
        //console.log(event.button);
        var target = {
            x: event.clientX,
            y: event.clientY
        };

        ship.aimPoint(target.x, target.y);
        if (event.shiftKey) {

            //ship.followPoint(target, 0.01);

        }
    });
    document.body.addEventListener('mousedown', (event) => {

        ship.isShooting = true;

    });
    document.body.addEventListener('mouseup', (event) => {


        ship.isShooting = false;

    });
    //#endregion


    function gameLoop() {
        //context.clearRect(0, 0, width, height);

        conteur++;

        context.fillStyle = 'rgba(0,0,0,.9)';
        context.rect(0, 0, width, height);
        context.fill();

        ship.update();
        if (ship.isShooting && cooldownShoot >= 10) {

            let audioSource = new AudioSource('./js/objs/audio/TestTire01');

            audioSource.play();
            cooldownShoot = 0;
            ship.shoot();
        }

        (cooldownShoot >= 20) ? cooldownShoot = 20 : cooldownShoot++;

        level00.update();

        //#region DEBUG
        if (DebugInfo.isShowDebug) {
            DebugInfo.drawPanel_G();
            DebugInfo.drawPanel_D({ wCanva: width });
        }
        DebugInfo.updateVarDebugInfo(
            [
                { label: 'Numbres enemy: ', txt: level00.enemys.length },
                { label: 'Numbers balls: ', txt: ship.balls.length },
                { label: 'Cooldown Shoot: ', txt: cooldownShoot },
                { label: 'Speed: ', txt: ship.engin.getSpeed().toFixed(0) },
                { label: 'Shoot: ', txt: ship.isShooting },
                { label: 'Thrust', txt: ship.thrusting },
                { label: '     ---  Turn  --- ', txt: '' },
                { label: '', txt: '|Left> ' + ship.turningLeft + ' |Right> ' + ship.turningRight },
                { label: 'Friction: ', txt: ship.engin.friction },
                { label: 'Angle: ', txt: ship.shapeShip.angle.toFixed(2) },
                { label: 'Velocity: ', txt: '|x> ' + ship.engin.vx.toFixed(0) + ' |y> ' + ship.engin.vy.toFixed(0) },
                { label: 'Position: ', txt: '|x> ' + ship.engin.x.toFixed(0) + ' |y> ' + ship.engin.y.toFixed(0) },
                { label: 'Animation: ', txt: animationID }
            ],
            [
                { label: 'Collision: ', txt: level00.numCollision },
                { label: 'Station: ', txt: level00.station.name },
                { label: 'Sante: ', txt: level00.station.lives.toFixed(0) },
                { label: 'DistanceTo Sun: ', txt: level00.station.engin.distanceTo(level00.sun.engin).toFixed(0) },
                { label: 'Velocity: ', txt: '|x> ' + level00.station.engin.vx.toFixed(1) + ' |y> ' + level00.station.engin.vy.toFixed(1) },
                { label: 'Position: ', txt: '|x> ' + level00.station.engin.x.toFixed(0) + ' |y> ' + level00.station.engin.y.toFixed(0) },
                { label: 'Angle: ', txt: level00.station.engin.getHeading().toFixed(2) },
                { label: 'Speed: ', txt: level00.station.engin.getSpeed().toFixed(2) },
                { label: 'Cible trouve: ', txt: level00.station.isTarget },
                { label: 'Nom: ', txt: level00.station.target.name },
                { label: 'Position: ', txt: level00.station.target.a + ' | ' + level00.station.target.b },
                { label: 'INFO: ', txt: '"Echap" open/close DBG' },
                { label: 'INFO: ', txt: '"²" Pause game' }
            ]);
        //#endregion


        animationID = requestAnimationFrame(gameLoop);

    } gameLoop();

}