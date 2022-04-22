window.onload = function () {
    var canvas = document.getElementById("canvas"),
        context = canvas.getContext("2d"),
        targetCanvas = document.getElementById("target"),
        targetContext = targetCanvas.getContext("2d"),
        width = canvas.width = targetCanvas.width = window.innerWidth,
        height = canvas.height = targetCanvas.height = window.innerHeight,
        target = {
            x: width,
            y: utils.randomRange(0, height)
        },
        position = {
            x: 0,
            y: utils.randomRange(0, height)
        },
        ease = 0.1,
        easing = true;



    document.body.addEventListener('click', (event) => {
        console.log(event.button);

        target.x = event.clientX;
        target.y = event.clientY;
        if (!easing) {
            easing = true;
            update();
        }
    });
    document.body.addEventListener('mousemove', (event) => {
        console.log(event.button);
        if (event.shiftKey) {

            target.x = event.clientX;
            target.y = event.clientY;

            if (!easing) {
                easing = true;
                update();
            }
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


        context.beginPath();
        context.fillStyle = "red";
        context.arc(position.x, position.y, 10, 0, Math.PI * 2, false);
        context.fill();

        easing = easeTo(position, target, ease);

        if (easing) requestAnimationFrame(update);
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