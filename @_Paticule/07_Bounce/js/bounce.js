let M_PI = Math.PI;

//#region Debug
//Div pour le debug pos sourie

let DEBUG_COLOR = 'rgba(150, 25, 75, 0)';
//#endregion

window.onload = DEUG();
function DEUG() {

    let canvas = document.getElementById('canvas');

    let context = canvas.getContext("2d");

    let width = canvas.width = window.innerWidth;

    let height = canvas.height = window.innerHeight;

    let p = particle.create(width / 2, height / 2, Math.random() * 8 + 5, Math.random() * M_PI * 2, 0.1);

    let particles = [];


    p.radius = (Math.random() * 5 + 2);
    p.bounce = -.9 * p.radius;

    for (let i = 0; i < 100; i++) {
        let p = particle.create(width / 2, height / 2,
            Math.random() * 5 + 1,
            Math.random() * M_PI * 2,
            0.1);

        p.radius = (Math.random() * 7 + 2);
        p.bounce = -.9 + (p.radius * .05);
        particles.push(p);
    }

    let DEBUG_DIV = document.getElementById('js-debug');
    console.log(context);
    update();

    document.addEventListener('click', () => {
        for (let i = 0; i < 50; i++) {
            let p = particle.create(width / 2, height / 2,
                Math.random() * 5 + 1,
                Math.random() * M_PI * 2,
                0.1);

            p.radius = (Math.random() * 7 + 2);
            p.bounce = -.9 + (p.radius * .05);
            particles.push(p);
        }
    });

    function update() {
        //context.clearRect(0, 0, width, height);
        if (particles.length === 0)

            DEBUG_DIV.innerHTML = 'Click pour relancer, hihi', DEBUG_DIV.style.color = 'lime';
        else
            DEBUG_DIV.innerHTML = 'Number particles: ' + particles.length, DEBUG_DIV.style.color = 'gold';

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


            if (p.position.getX() + p.radius > width) {
                p.position.setX(width - p.radius);
                p.velocity.setX(p.velocity.getX() * p.bounce);
            }
            if (p.position.getX() - p.radius < 0) {
                p.position.setX(p.radius);
                p.velocity.setX(p.velocity.getX() * p.bounce);
            }
            if (p.position.getY() + p.radius > height) {
                p.position.setY(height - p.radius);
                p.velocity.setY(p.velocity.getY() * p.bounce);
            }
            if (p.position.getY() - p.radius < 0) {
                p.position.setY(p.radius);
                p.velocity.setY(p.velocity.getY() * p.bounce);
            }
        }

        removeDeadParticles();

        requestAnimationFrame(update);
    }

    function removeDeadParticles() {
        for (let i = particles.length - 1; i >= 0; i -= 1) {

            let p = particles[i];
            //console.debug(Math.floor(p.velocity.getY()));
            if (Math.floor(p.velocity.getY()) == 0 && p.position.getY() >= (height - (p.radius + 1))) {
                particles.splice(i, 1);
            }

            /*  if (p.position.getX() - p.radius > width ||
                 p.position.getX() + p.radius < 0 ||
                 p.position.getY() - p.radius > height ||
                 p.position.getY() + p.radius < 0
             ) {
                 particles.splice(i, 1);
             } */
        }
    }
}