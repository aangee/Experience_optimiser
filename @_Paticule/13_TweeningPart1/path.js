window.onload = function () {
    var canvas = document.getElementById("canvas"),
        context = canvas.getContext("2d"),
        targetCanvas = document.getElementById("target"),
        targetContext = targetCanvas.getContext("2d"),
        width = canvas.width = targetCanvas.width = window.innerWidth,
        height = canvas.height = targetCanvas.height = window.innerHeight,
        start = {
            x: 100,
            y: 100
        },
        target = {},
        change = {},
        startTime,
        duration = 1000,
        easing = true;

    drawCircle(start.x, start.y,5,'red');

let baseRadius = 5;
    for (let i = 0; i < 10; i++) {
        var point = {
            x: 0,
            y: 0,
            color: `rgba(${utils.randomRange(0, 255)},${utils.randomRange(0, 25)},${255},1)`,
            radius: baseRadius += .5
        };
    }

    document.body.addEventListener('click', (event) => {
        console.log(event.button);

        target.x = event.clientX;
        target.y = event.clientY;

        change.x = (target.x - start.x);
        change.y = (target.y - start.y);

        startTime = new Date();
        /*if (!easing) {
           easing = true;
           update();
       } */

        update();
    });
    document.body.addEventListener('mousemove', (event) => {
        console.log(event.button);
        if (event.shiftKey) {

            target.x = event.clientX;
            target.y = event.clientY;
    
            change.x = (target.x - start.x);
            change.y = (target.y - start.y);
    
            startTime = new Date();
            /* if (!easing) {
                easing = true;
                update();
            } */
            update();
        }
    });

    /* targetContext.beginPath();
    targetContext.fillStyle = "red";
    targetContext.strokeStyle = 'gold';
    targetContext.arc(width * .5 + 1000, height / 2, 1000, 0, Math.PI * 2, false);
    targetContext.fill();
    targetContext.stroke(); */


    update();


    function update() {
        context.clearRect(0, 0, width, height);

        // animation goes here
        var time = new Date() - startTime;
        if (time < duration) {
            var x = linearTween(time, start.x,change.x,duration),
            y = linearTween(time, start.y,change.y,duration);

            drawCircle(x,y,5,'red');
            requestAnimationFrame(update);
        }else{
            drawCircle(target.x,target.y,5,'red');
            start.x = target.x;
            start.y = target.y;
        }


        //easing = easeTo(position, target, ease);

        //if (easing) requestAnimationFrame(update);
    }

    function linearTween(t, b, c, d) {
        return c * t / d + b;
    }
    function drawCircle(x, y, radius = 5, color = 'red') {

        context.beginPath();
        context.fillStyle = color;
        context.arc(x, y, radius, 0, Math.PI * 2, false);
        context.fill();
    }
    function easeTo(position, target, ease) {

        var dx = target.x - position.x,
            dy = target.y - position.y;
        position.x += dx * ease;
        position.y += dy * ease;

        if (Math.abs(dx) < .1 && Math.abs(dy) < .1) {
            position.x = target.x;
            position.y = target.y;
            return false;
        }
        return true;

        /*  position.x += (target.x - position.x)*ease;
         position.y += (target.y - position.y)*ease; */
    }
}