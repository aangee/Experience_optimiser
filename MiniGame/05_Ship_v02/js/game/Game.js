class Game {
    constructor(canvasSetting) {
        console.log('Game load');
        this.isAppPause = false;
        this.mouse = {
            x: 100,
            y: 100
        };

        this.cooldownShoot = 0;

        this.canvasGame = canvasSetting.gameCanvas;// = document.getElementById("canvas");
        this.ctxGame = canvasSetting.gameCtx;

        this.canvasWorld = canvasSetting.worldCanvas;// = document.getElementById("target");
        this.ctxWorld = canvasSetting.worldCtx;


        this.canvasCollision = canvasSetting.collisionCanvas;// = document.getElementById("target");
        this.ctxCollision = canvasSetting.collisionCtx;

        this.width = this.canvasGame.width;
        this.height = this.canvasGame.height;

        this.animationID = 0;
        this.gameDetecteCollision = 0;
        this.conteur = 0;


        let sizeWorld = { x: this.width*2, y: this.height*2 };
        this.canvasWorld.width = sizeWorld.x;
        this.canvasWorld.height = sizeWorld.y;
        this.world = new World(this.ctxWorld, sizeWorld);

        this.ship = new Ship(this.canvasGame, this.width / 2, this.height / 2);

        // TEST Blocage de la vue sur le ship
        this.isVueFollow = true;

        this.levels = [];
        console.log(this.world);
        console.log(canvasSetting);

    }

    createOneLevel(settingLevel) {
        let tempCanvasSetting = {
            gameCanvas: this.canvasGame,
            gameCtx: this.ctxGame,
            collisionCanvas: this.canvasCollision,
            ctxCollision: this.ctxCollision
        };
        this.levels.push(new Level(tempCanvasSetting, settingLevel));
    }

    run() {
        this.loop();
    }

    loop() {

        this.conteur++;
        //this.ctxGame.clearRect(0, 0, this.world.size.x, this.world.size.y);
        this.ctxWorld.clearRect(0, 0, this.world.size.x, this.world.size.y);




        this.ship.update();


        //TEST faire suivre le canvas au ship

        if (this.isVueFollow) {
            this.ship.isVueFollow = true;
            this.ctxWorld.save();
            let ratioDeplacement = 1;
            let centrageWorld = { w: (this.world.size.x * .5), h: (this.world.size.y * .5) }
            /* this.ctxWorld.setTransform(2, 0, 0, 2,
                //Position 
                centrageWorld.w + this.ship.engin.x * -ratioDeplacement,// X
                centrageWorld.h + this.ship.engin.y * -ratioDeplacement);// Y */
            this.ctxWorld.setTransform(2, 0, 0, 2,
                //Position 
                this.ship.engin.x * -ratioDeplacement,// X
                this.ship.engin.y * -ratioDeplacement);// Y


            this.world.update();

            this.ctxWorld.restore();
        } else {
            this.ship.isVueFollow = false;
            this.world.update();

        }






        //TODO Ici on gere le cooldown pour la cadence de tire du ship
        //FIXME Faire sa dans le ship 
        if (this.ship.isShooting && this.cooldownShoot >= 10) {
            let audioSource = new AudioSource('./js/objs/audio/TestTire01');
            audioSource.play();
            this.cooldownShoot = 0;
            this.ship.shoot();
        }
        (this.cooldownShoot >= 20) ? this.cooldownShoot = 20 : this.cooldownShoot++;


        //Update level
        this.levels[0].update();


        this.getCollisionBitmap(this.ctxWorld);
        this.getCollisionBitmap(this.ctxGame);



        //TEST fin test

    }


    getCollisionBitmap(ctxScan) {
        //this.#ctx.clearRect(0, 0, this.#canvas.width, this.#canvas.height);
        // On recup un pixel sur le canvas(target) et on check alpha du pixel
        let limiteColor = 50;//RVB a 50
        var imageData = ctxScan.getImageData(this.ship.engin.x, this.ship.engin.y, 2, 2);
        //console.log(imageData.data);
        if (imageData.data[0] > limiteColor || imageData.data[1] > limiteColor || imageData.data[2] > limiteColor ||
            imageData.data[4] > limiteColor || imageData.data[5] > limiteColor || imageData.data[6] > limiteColor ||
            imageData.data[8] > limiteColor || imageData.data[9] > limiteColor || imageData.data[10] > limiteColor ||
            imageData.data[12] > limiteColor || imageData.data[13] > limiteColor || imageData.data[14] > limiteColor
        ) {
            //this.#targetCtx.globalCompositeOperation = 'destination-out';
            /*  this.ctxGame.beginPath();
             this.ctxGame.fillStyle = "green";
             this.ctxGame.strokeStyle = 'red';
             this.ctxGame.arc(_p.x, _p.y, 2, 0, Math.PI * 2, false);
             this.ctxGame.fill(); */
            //targetContext.stroke();


            this.gameDetecteCollision++;
        }
    }
}