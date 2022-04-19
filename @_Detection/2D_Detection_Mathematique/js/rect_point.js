

window.onload = function () {
    var canvas = document.getElementById('canvas'),
        context = canvas.getContext("2d"),
        width = canvas.width = window.innerWidth,
        height = canvas.height = window.innerHeight,
        rect = {
            x: (width * .5) + Math.random() * 50,
            y: (height * .5) + Math.random() * 50,
            width: Math.random() * 200 + 10,
            height: Math.random() * 100 + 10
        };




    let DEBUG_DIV = document.getElementById('js-debug');
    let para = document.createElement('p');
    para.textContent = 'Rectangle to circle'
    DEBUG_DIV.before(para);

    context.fillStyle = '#999';

    document.body.addEventListener('mousemove', function (event) {


        context.fillStyle = 'rgba(0,0,0,.98)';
        context.rect(0, 0, width, height);
        context.fill();


        if (utils.pointInRect(event.clientX, event.clientY, rect)) {
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
        context.rect(rect.x, rect.y, rect.width, rect.height);
        context.stroke();
        context.fill();

    });
}