console.log('init');
const M_PI = Math.PI;
window.onload = function () {

    let setup = new SetupCanvas();

    let particles = [];
    let numParticles = 100;
    let currentNbsParticle = numParticles;
    let counterElement = document.getElementById('js-counter');
    let posMouse = { x: 0, y: 0 };

    for (let i = 0; i < numParticles; i += 1) {
        particles.push(new Particle(setup.width / 2, setup.height / 2, (Math.random() * 4 + 1), (Math.random() * M_PI * 2), 0));
    }

    update();

    function update() {
        setup.ctx.clearRect(0, 0, setup.width, setup.height);

        for (let i = particles.length - 1; i >= 0; i -= 1) {
            const p = particles[i];
            p.update();

            const px = p.position.getX();
            const py = p.position.getY();

            if (px < -10 || px > setup.width + 10 || py < -10 || py > setup.height + 10) {
                particles.splice(i, 1);
                currentNbsParticle -= 1;
                continue;
            }

            setup.ctx.beginPath();
            setup.ctx.fillStyle = 'red';
            setup.ctx.arc(px, py, 5, 0, M_PI * 2, false);
            setup.ctx.fill();
        }

        counterElement.textContent = currentNbsParticle;
        requestAnimationFrame(update);
    }

    function feu() {
        //particles = [];
        currentNbsParticle += numParticles;
        for (let i = 0; i < numParticles; i += 1) {
            particles.push(new Particle(posMouse.x, posMouse.y, (Math.random() * 4 + 1), (Math.random() * M_PI * 2), 0));
        }
    }
    document.body.addEventListener("mousedown", onMouseDown);

    function onMouseDown(event) {

        posMouse.x = event.clientX;
        posMouse.y = event.clientY;
        //document.body.addEventListener("mousemove", onMouseMove);
        document.body.addEventListener("mouseup", onMouseUp);

    }

    function onMouseUp(event) {
        console.log(posMouse);
        feu();
        //document.body.removeEventListener("mousemove", onMouseMove);
        document.body.removeEventListener("mouseup", onMouseUp);
    }

    function onMouseMove(event) {
        posMouse.x = event.clientX;
        posMouse.y = event.clientY;
    }

};


