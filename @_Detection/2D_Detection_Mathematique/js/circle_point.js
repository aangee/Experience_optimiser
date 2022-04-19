

window.onload = function () {
    var canvas = document.getElementById('canvas'),
        context = canvas.getContext("2d"),
        width = canvas.width = window.innerWidth,
        height = canvas.height = window.innerHeight,
        circle = {
            x: Math.random() * width,
            y: Math.random() * height,
            radius: 30 + Math.random() * 10
        };


    let DEBUG_DIV = document.getElementById('js-debug');
    let para = document.createElement('p');
    para.textContent = 'Point to circle'
    DEBUG_DIV.before(para);

    context.fillStyle = '#999';

    document.body.addEventListener('mousemove', function (event) {


        context.fillStyle = 'rgba(0,0,0,.98)';
        context.rect(0, 0, width, height);
        context.fill();


        if (utils.circlePointCollision(event.clientX, event.clientY, circle)) {
            context.fillStyle = '#f66';
            DEBUG_DIV.innerText = 'Collision !!!';
            DEBUG_DIV.style.color = 'lime';
        } else {
            context.fillStyle = '#999';
            DEBUG_DIV.innerText = 'Detection en cours...';
            DEBUG_DIV.style.color = '';
        }


        context.beginPath();
        //context.fillStyle = 'rgba(200,0,200,.8)';
        context.strokeStyle = 'rgba(20,200,20,.8)';
        context.arc(circle.x, circle.y, circle.radius, 0, M_PI * 2, false);
        context.stroke();
        context.fill();

    });
}