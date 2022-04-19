
//#region Constante
const M_PI = Math.PI;
const DEBUG_COLOR = 'rgba(150, 25, 75, 0)';

//Paragraphe pour le debug nbs particule
let DEBUG_Element = document.getElementById('js-debug');

//#endregion

window.onload = function () {

    let setup = new SetupCanvas();

    let particles = [];
    let maxParticle = 100;
    let centerWorld = setup.centerWorld;



    for (let i = 0; i < 100; i++) {
        var p = new Particle(centerWorld[0], centerWorld[1], Math.random() * 5 + 2, Math.random() * M_PI * 2);
        p.radius = 10;
        particles.push(p);
    }

    DEBUG_Element.innerHTML = 'Number particles: ' + maxParticle;



    function update() {
        requestAnimationFrame(update);

        setup.clear();

        updateParticles();
    }
    update();

    function updateParticles() {

        for (let i = 0; i < particles.length; i++) {
            var p = particles[i];
            p.update();

            drawParticles(p);
        }
        removeDeadParticles();
    }

    function drawParticles(p) {
        setup.ctx.beginPath();
        setup.ctx.fillStyle = 'rgba(200,0,200,.8)';
        setup.ctx.strokeStyle = 'rgba(20,200,20,.8)';
        setup.ctx.arc(p.position.getX(), p.position.getY(), p.radius, 0, M_PI * 2, false);
        setup.ctx.stroke();
        setup.ctx.fill();
    }


    function removeDeadParticles() {
        for (var i = particles.length - 1; i >= 0; i -= 1) {

            var p = particles[i];

            if (p.position.getX() - p.radius > setup.width ||
                p.position.getX() + p.radius < 0 ||
                p.position.getY() - p.radius > setup.height ||
                p.position.getY() + p.radius < 0
            ) {
                particles.splice(i, 1);
                DEBUG_Element.innerHTML = 'Number particles: ' + particles.length;
            }
        }
    }
}