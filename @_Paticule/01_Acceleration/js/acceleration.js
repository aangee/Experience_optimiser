window.onload = function () {
    let PI = Math.PI;
    let setup = new SetupCanvas();



    let accel = new Vec2D(0.051, 0.051);


    let particlesT = [];
    let intervalSpawn = setInterval(() => {

        let rx = (setup.width * .5) + Math.random() * (setup.width * .2);
        let p = new Particle(
            rx, setup.height * .5,
            0.1,
            -PI / 2
        );
        p.color = randomColor();
        p.accel = new Vec2D(0, 0);
        p.accel.random(-.2, .2);
        particlesT.push(p);
    }, 1000);

update();
    function update() {
        setup.ctx.clearRect(0, 0, setup.width, setup.height);

        accel.random(-.21, .21);
        if (particlesT.length >= 100) clearInterval(intervalSpawn);
        particlesT.forEach((p) => {

            let copy = accel;
            copy.random(-.07, .07);
            accel.add(copy);
            //accel.random(-.1, .1);
            p.accelerateV2(accel);
            p.update();

            setup.ctx.beginPath();
            setup.ctx.fillStyle = p.color;
            setup.ctx.arc(p.position.getX(), p.position.getY(), 5, 0, PI * 2, false);
            setup.ctx.fill();

        });

        requestAnimationFrame(update);
    }
    function randomColor() {
        switch (Math.floor(Math.random() * 10)) {
            case 0: return 'blue';
            case 1: return 'red';
            case 2: return 'lime';
            case 3: return 'cyan';
            case 4: return 'gold';
            case 5: return 'deepskyblue';
            case 6: return 'chartreuse';
            case 7: return 'fuchsia';
            case 8: return 'springgreen';
            case 9: return 'purple';
            default: return 'blanchedalmond';
        }
    }
}