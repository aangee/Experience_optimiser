window.onload = function () {
    var canvas = document.getElementById("canvas"),
        context = canvas.getContext("2d"),
        width = canvas.width = window.innerWidth,
        height = canvas.height = window.innerHeight,
        target = {
            x: width - 21,
            y: utils.randomRange(height * .3, height)
        },
        points = [],
        numPoints = 30,
        baseRadius = 5,
        ease = 0.1;

    for (let i = 0; i < numPoints; i++) {
        points.push({
            x: 0,
            y: 0,
            color: `rgba(${utils.randomRange(0, 255)},${utils.randomRange(0, 25)},${255},1)`,
            radius: baseRadius += .5
        });
    }

    document.body.addEventListener('click', (event) => {

        target.x = event.clientX;
        target.y = event.clientY;
    });
    document.body.addEventListener('mousemove', (event) => {

        if (event.shiftKey) {
            target.x = event.clientX;
            target.y = event.clientY;
        }
    });


    update();


    function update() {
        context.clearRect(0, 0, width, height);

        // animation goes here
        var leader = {
            x: target.x,
            y: target.y
        };
        for (let i = 0; i < numPoints; i++) {
            var point = points[i];
            point.x += (leader.x - point.x) * ease;
            point.y += (leader.y - point.y) * ease;

            context.beginPath();
            context.fillStyle = point.color;
            context.arc(point.x, point.y, point.radius, 0, Math.PI * 2, false);
            context.fill();

            leader.x = point.x;
            leader.y = point.y;
        }


        requestAnimationFrame(update);
    }

}