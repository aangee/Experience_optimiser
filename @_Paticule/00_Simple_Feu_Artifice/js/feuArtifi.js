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
        counterElement.textContent = currentNbsParticle;


        for (let i = 0; i < particles.length; i += 1) {
            const p = particles[i];
            p.update();
            setup.ctx.beginPath();
            setup.ctx.fillStyle = 'red';
            setup.ctx.arc(p.position.getX(), p.position.getY(), 5, 0, M_PI * 2, false);
            setup.ctx.fill();

        }

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


