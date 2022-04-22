// & Juste pour le debug
// u = update // ^ le nbs de foi ou detecte rien
// a = ajoute  // ^ le nbs de foi ou ajoute de la couleur en utilisent 'globalCompositeOperation' en mode = 'destination-over'
// r = retire  // ^ le nbs de foi ou retire de la couleur en utilisent 'globalCompositeOperation' en mode = 'destination-out'
// raz = raz  // ^ le nbs de foi ou une particule et remise a zero
let u = 0, a = 0, r = 0, raz = 0;


window.onload = function () {
    let canvas = document.getElementById("canvas");
    let context = canvas.getContext("2d");
    let targetCanvas = document.getElementById("target");
    let targetContext = targetCanvas.getContext("2d");
    let width = canvas.width = targetCanvas.width = window.innerWidth;
    let height = canvas.height = targetCanvas.height = window.innerHeight;


    let p0 = particle.create(0, height / 2, 3, utils.randomRange(-.52, .52));
    p0.isSpawn = false;//& <-- Juste pour le debug

    let p1 = particle.create(0, height / 2, 3, utils.randomRange(-.52, .52));
    let p2 = particle.create(0, height / 2, 3, utils.randomRange(-.52, .52));
    let p3 = particle.create(0, height / 2, 3, utils.randomRange(-.52, .52));



    // Ici on dessine une gros boule sur la droite
    // sais la cible sur la quelle on poura retire de la couleur 
    targetContext.beginPath();
    targetContext.fillStyle = "red";
    targetContext.strokeStyle = 'gold';
    targetContext.arc(width * .5 + 1000, height / 2, 1000, 0, Math.PI * 2, false);
    targetContext.fill();
    targetContext.stroke();



    update();
    function update() {
        requestAnimationFrame(update);
        context.clearRect(0, 0, width, height);


        drawProjectile({ p: p0, color: 'gold' });
        drawProjectile({ p: p1, color: 'red' });
        drawProjectile({ p: p2, color: 'white' });
        drawProjectile({ p: p3, color: 'blue' });


        getCollisionBitmap(p0, .55);
        getCollisionBitmap(p1, .50);
        getCollisionBitmap(p2, .45);
        getCollisionBitmap(p3, .40);

        if (p0.isSpawn) p0.update();//& <-- Juste pour le debug
        p1.update();
        p2.update();
        p3.update();

        // & Juste pour le debug
        DEBUG_ELEMENT.innerHTML = `
            <p style='width:60%'>Retire :</p><span class='js-spanDeb'>${r}</span>
            <p style='width:60%'>Ajouter :</p><span class='js-spanDeb'>${a}</span>
            <p style='width:60%'>Reset :</p><span class='js-spanDeb'>${raz}</span>`;

    }


    function drawProjectile(params) {
        let { p, color } = params;
        let { x, y } = p;

        context.beginPath();
        context.fillStyle = color;
        context.arc(x, y, 5, 0, Math.PI * 2, false);
        context.fill();
    }

    function getCollisionBitmap(_p, _offsetSpawn) {
        // On recup un pixel sur le canvas(target) et on check alpha du pixel
        var imageData = targetContext.getImageData(_p.x, _p.y, 1, 1);// ! Ici on check sur le context du canvas TARGET 
        // ~ imageData.data contient les info du pixel sous forme d'un tableau [red, green, blue, alpha, ect...]


        // On check le si il y a plus 50 dans le rouge(red)
        if (imageData.data[0] > 50) {
            // Ici on n'a detecter du 'red', alors a l'endroi de la detection on dessin un 'arc' 'green' de rayon 15
            // se qui pour effet d'ajoute 'arc' 'green' au reste des couleur deja presente dans le canvas 
            targetContext.globalCompositeOperation = 'destination-over';// ! NE PAS OUBLIER, la on ajoute le 'green' !
            targetContext.beginPath();
            targetContext.fillStyle = "green";
            //targetContext.strokeStyle = 'red';
            targetContext.arc(_p.x, _p.y, 15, 0, Math.PI * 2, false);
            targetContext.fill();
            //targetContext.stroke();

            a++;//& <-- Juste pour le debug
            resetParticle(_p, _offsetSpawn);
            //resetParticle1();
        }
        else if (imageData.data[3] > 0) {// On check le si l'alpha depasse le 0

            // Ici on n'a detecter que 'alpha' n'ai plus a 0, alors a l'endroi de la detection on dessin un 'arc' 'green' de rayon 30
            // se qui a pour effet de faire un trou
            targetContext.globalCompositeOperation = 'destination-out';// ! NE PAS OUBLIER, la on retire le 'green' !
            targetContext.beginPath();
            targetContext.fillStyle = "green";
            targetContext.arc(_p.x, _p.y, 30, 0, Math.PI * 2, false);
            targetContext.fill();

            r++;//& <-- Juste pour le debug
            resetParticle(_p, _offsetSpawn);
        }

        // Si on depasse l taille de notre canvas en (X ou en W) 
        if (_p.x > width) resetParticle(_p, _offsetSpawn);  
    }

    function resetParticle(_p, _offsetSpawn) {
        _p.x = 0;
        _p.y = height * _offsetSpawn;
        _p.setHeading(utils.randomRange(-.52, .52));


        if (_p.isSpawn) p0.isSpawn = false;//& <-- Juste pour le debug
        raz++;//& <-- Juste pour le debug
    }
    // & Juste pour le debug
    targetCanvas.addEventListener('click', (e) => {

        if (!p0.isSpawn) {
            let { layerX: x, layerY: y } = e;

            p0.x = x;
            p0.y = y;
            p0.setHeading(utils.randomRange(-.52, .52));
            p0.setSpeed(5);
            p0.isSpawn = true;
        }
    });
}


function razInfos() {
    r = a = raz = 0;
}