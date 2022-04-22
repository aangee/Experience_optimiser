window.onload = function () {
    let canvas = document.getElementById("canvas");
    let context = canvas.getContext("2d");
    let width = canvas.width = window.innerWidth;
    let height = canvas.height = window.innerHeight;
    let p = new Particle(0, 0, 10, 0);
    p.radius = utils.randomRange(3, 17);
    let target = {
        x: width - p.radius,
        y: utils.randomRange(height * .3, (height - p.radius))
    };

    let ease = 0.1;



    update();

    function update() {
        requestAnimationFrame(update);
        context.clearRect(0, 0, width, height);

        context.beginPath();
        context.fillStyle = "lime";
        context.arc(p.x, p.y, p.radius, 0, Math.PI * 2, false);
        context.fill();

        /*
        context.beginPath();
        context.fillStyle = "red";
        context.arc(position.x, position.y, 10, 0, Math.PI * 2, false);
        context.fill();
         let dx = target.x - position.x,
            dy = target.y - position.y,
            vx = dx * ease,
            vy = dy * ease;
        position.x += vx;
        position.y += vy; 
        */

        let dx = target.x - p.x,
            dy = target.y - p.y,
            vx = dx * ease,
            vy = dy * ease;

        p.x += vx;
        p.y += vy;
    }

    document.body.addEventListener('click', (event) => {
        //console.log(event.button);

        target.x = event.clientX;
        target.y = event.clientY;
    });
    document.body.addEventListener('mousemove', (event) => {
        //console.log(event.button);
        if (event.shiftKey) {

            target.x = event.clientX;
            target.y = event.clientY;
        }
    });
}