window.onload = function () {
    var canvas = document.getElementById("canvas"),
        context = canvas.getContext("2d"),
        targetCanvas = document.getElementById("target"),
        targetContext = targetCanvas.getContext("2d"),
        width = canvas.width = targetCanvas.width = window.innerWidth,
        height = canvas.height = targetCanvas.height = window.innerHeight,
        p = particle.create(0, height / 2, 10, 0);


    targetContext.beginPath();
    targetContext.fillStyle = "red";
    targetContext.arc(width * .8, height / 2, 200, 0, Math.PI * 2, false);
    targetContext.fill();


    update();


    function update() {
        context.clearRect(0, 0, width, height);

        // animation goes here


        context.beginPath();
        context.fillStyle = "green";
        context.arc(p.x, p.y, 5, 0, Math.PI * 2, false);
        context.fill();

        // On recup un pixel sur le canvas(target) et on check alpha du pixel
        var imageData = targetContext.getImageData(p.x, p.y, 1, 1);
        if (imageData.data[0] > 50) {

            //targetContext.globalCompositeOperation = 'destination-out';
            targetContext.globalCompositeOperation = 'destination-over';
            targetContext.beginPath();
            targetContext.fillStyle = "green";
            targetContext.arc(p.x, p.y, 15, 0, Math.PI * 2, false);
            targetContext.fill();

            resetParticle();
        }
        
        if (imageData.data[3] > 0) {

            targetContext.globalCompositeOperation = 'destination-out';
            //targetContext.globalCompositeOperation = 'destination-over';
            targetContext.beginPath();
            targetContext.fillStyle = "green";
            targetContext.arc(p.x, p.y, 30, 0, Math.PI * 2, false);
            targetContext.fill();

            resetParticle();
        }  
        
        if (p.x > width) {

            resetParticle();
        }

        p.update();
        requestAnimationFrame(update);
    }

    function resetParticle() {
        p.x = 0;
        p.y = height / 2;
        p.setHeading(utils.randomRange(-.1, .1));
    }
}