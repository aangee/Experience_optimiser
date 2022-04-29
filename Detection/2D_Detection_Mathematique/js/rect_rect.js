

window.onload = function () {
    var canvas = document.getElementById('canvas'),
        context = canvas.getContext("2d"),
        width = canvas.width = window.innerWidth,
        height = canvas.height = window.innerHeight,
        rect0 = {
            x: (width * .5) + Math.random() * 50,
            y: (height * .5) + Math.random() * 50,
            width: Math.random() * 200 + 10,
            height: Math.random() * 100 + 10
        },
        rect1 = {
            x: 200,
            y: 100,
            width: Math.random() * 200 + 10,
            height: Math.random() * 100 + 10
        };

    let DEBUG_DIV = document.getElementById('js-debug');

    let para = document.createElement('p');
    para.textContent = 'Rectangle to rectangle'
    DEBUG_DIV.before(para);

    context.fillStyle = '#999';
    draw();
    document.body.addEventListener('mousemove', function (event) {

        context.clearRect(0, 0, width, height);


        rect1.x = event.clientX - (rect1.width * .5);
        rect1.y = event.clientY - (rect1.height * .5);



        if (utils.rectIntersect(rect0, rect1)) {
            context.fillStyle = '#f66';
            DEBUG_DIV.innerText = 'Collision !!!';
            DEBUG_DIV.style.color = 'lime';
        } else {
            context.fillStyle = '#999';
            DEBUG_DIV.innerText = 'Detection en cours...';
            DEBUG_DIV.style.color = '';

        }

        draw();

    });

    function draw() {

        context.beginPath();
        //context.fillStyle = 'rgba(200,0,200,.8)';
        context.strokeStyle = 'rgba(20,200,20,.8)';
        context.rect(rect0.x, rect0.y, rect0.width, rect0.height);
        context.stroke();
        context.fill();


        context.beginPath();
        //context.fillStyle = 'rgba(200,0,200,.8)';
        context.strokeStyle = 'rgba(20,200,20,.8)';
        context.rect(rect1.x, rect1.y, rect1.width, rect1.height);
        context.stroke();
        context.fill();
    }
}