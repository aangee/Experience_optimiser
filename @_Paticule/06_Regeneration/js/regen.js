
//#region Constante
const M_PI = Math.PI;
const DEBUG_COLOR = 'rgba(150, 25, 75, 0)';

//Paragraphe pour le debug nbs particule
let DEBUG_Element = document.getElementById('js-debug');

//#endregion


window.onload = function () {
    var canvas = document.getElementById('canvas'),
        context = canvas.getContext("2d"),
        width = canvas.width = window.innerWidth,
        height = canvas.height = window.innerHeight,
        particles = [];

    let maxParticle = 100;
    let currentNbsParticle = 0;
    for (let i = 0; i < maxParticle; i++) {
        var p = particle.create(width / 2, height, Math.random() * 8 + 5, -M_PI / 2 + (Math.random() * .2 - .1), 0.1);
        p.radius = (Math.random() * 5 + 2);
        particles.push(p);
    }

    console.log(context);
    update();


    function update() {
        //context.clearRect(0, 0, width, height);
        DEBUG_Element.innerHTML = 'Particles regen: ' + currentNbsParticle;

        context.fillStyle = 'rgba(0,0,0,.98)';
        context.rect(0, 0, width, height);
        context.fill();


        for (let i = 0; i < particles.length; i++) {
            let p = particles[i];
            p.update();

            context.beginPath();
            context.fillStyle = 'rgba(200,0,200,.8)';
            context.strokeStyle = 'rgba(20,200,20,.8)';
            context.arc(p.position.getX(), p.position.getY(), p.radius, 0, M_PI * 2, false);
            context.stroke();
            context.fill();


        }

        regenParticles();

        requestAnimationFrame(update);
    }

    function regenParticles() {
        //for (var i = particles.length - 1; i >= 0; i -= 1) {
        for (let i = 0; i < particles.length; i++) {
            let p = particles[i];

            if (p.position.getY() - p.radius > (height)) {

                // currentNbsParticle++;
                p.isRegen = false;
            }

            if (p.position.getY() - p.radius > height + (Math.random() * 5000)) {
                p.position.setX(width / 2);
                p.position.setY(height + p.radius);
                p.velocity.setLength(Math.random() * 8 + 5);
                p.velocity.setAngle(-M_PI / 2 + (Math.random() * .2 - .1));

                // currentNbsParticle--;
                p.isRegen = true;
                //(currentNbsParticle <= 0) ? currentNbsParticle = 0 : currentNbsParticle--;
            }

        }

        for (let i = 0; i < particles.length; i++) {
            let p = particles[i];

            if (p.isRegen) (currentNbsParticle >= maxParticle) ? currentNbsParticle = maxParticle : currentNbsParticle++;
            if (!p.isRegen) (currentNbsParticle <= 0) ? currentNbsParticle = 0 : currentNbsParticle--;
        }
    }
}