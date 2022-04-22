window.onload = function () {
    var canvas = document.getElementById("canvas"),
        context = canvas.getContext("2d"),
        targetCanvas = document.getElementById("target"),
        targetContext = targetCanvas.getContext("2d"),
        width = canvas.width = targetCanvas.width = window.innerWidth,
        height = canvas.height = targetCanvas.height = window.innerHeight,
        p = particle.create(0, height / 2, 10, 0),
        target = {
            x: width,
            y: utils.randomRange(0,height)
        },
        position = {
            x: 0,
            y: utils.randomRange(0,height)
        },
        ease = 0.1;



    update();

    document.body.addEventListener('click',(event)=>{
        console.log(event.button);
            
        target.x = event.clientX;
        target.y = event.clientY;
    });
    document.body.addEventListener('mousemove',(event)=>{
        console.log(event.button);
        if (event.shiftKey) {
            
        target.x = event.clientX;
        target.y = event.clientY;
        }
    });
    function update() {
        context.clearRect(0, 0, width, height);

        // animation goes here

        context.beginPath();
        context.fillStyle = "red";
        context.arc(position.x, position.y, 10, 0, Math.PI * 2, false);
        context.fill();
        
        var dx = target.x - position.x,
            dy = target.y - position.y,
            vx = dx * ease,
            vy = dy * ease;
           
            position.x += vx;
            position.y += vy;
        requestAnimationFrame(update);
    }

    function resetParticle() {
        p.x = 0;
        p.y = height / 2;
        p.setHeading(utils.randomRange(-.1, .1));
    }
}