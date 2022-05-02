class Level {

    #canvas;
    #ctx;

    #targetCanvas;
    #targetCtx;

    /**
     * 
     * @param {*} canvasSetting 
     * @param {*} levelSettings 
     */
    constructor(canvasSetting, levelSettings) {
        // canvas
        this.#canvas = canvasSetting.canvas00;
        this.#ctx = canvasSetting.ctx00;
        this.#targetCanvas = canvasSetting.canvas01;//targetCanvas;
        this.#targetCtx = canvasSetting.ctx01;//targetCtx;
        // level
        this.ship = levelSettings.ship;
        this.idLevel = levelSettings.idLevel;
        this.numEnemys = levelSettings.numEnemys;
        this.isEnemyRespawn = levelSettings.isEnemyRespawn;

        //NOTE: pour la logique du level
        this.enemys = [];
        this.numCollision = 0;

        // Entitys level
        this.station = new Station(this.#ctx, 450, 300, 10, 'Terra VII');
        this.sun = new Sun(this.#ctx, 350, 320, 30);



        //TEST Juste pour le fun
        /**@property {Numbers} points Nbs de point current level */
        this.points = 0;
        this.totalLevelFini = -1;
    }

    start() {
        this.spawnEnenys();
    }

    update() {
        this.drawPoint();

        //this.ship.engin.gravitateTo(this.sun.engin);
        this.sun.update();
        this.station.update(this.sun.engin);


        if (this.enemys.length !== 0) {
            for (let j = 0; j < this.enemys.length; j++) {
                this.enemys[j].Update();
                // Pass j so we can track which asteroid points
                // to store
                //this.enemys[j].Draw();
            }
        }
        if (this.enemys.length === 0) {
            this.spawnEnenys();
            this.totalLevelFini++;
        }

        this.updateCollision();
        if (this.ship) this.getCollisionBitmap(this.ship.engin, 50);
    }

    spawnEnenys() {

        for (let i = 0; i < this.numEnemys; i++) {
            let asteroid = new Asteroid(this.#ctx, this.#canvas);
            asteroid.speed = (Math.random() * 1.061 + .16180);
            //asteroid.level = 1;
            this.enemys.push(asteroid);
        }

    }

    updateCollision() {
        // Check for collision of ship with asteroid
        /*if (this.enemys.length !== 0) {
            for (let k = 0; k < this.enemys.length; k++) {
                if (this.circleCollision(this.ship.x, this.ship.y, 11, this.enemys[k].x, this.enemys[k].y, this.enemys[k].collisionRadius)) {
                     this.ship.x = canvasWidth / 2;
                    this.ship.y = canvasHeight / 2;
                    this.ship.velX = 0;
                    this.ship.velY = 0; 
                    //lives -= 1;
                }
            }
        }*/



        // Check for collision with bullet and asteroid
        if (this.enemys.length !== 0 && this.ship.balls.length != 0) {
            loop1:
            for (let l = 0; l < this.enemys.length; l++) {
                for (let m = 0; m < this.ship.balls.length; m++) {
                    if (this.circleCollision(this.ship.balls[m].x, this.ship.balls[m].y, 3, this.enemys[l].x, this.enemys[l].y, this.enemys[l].collisionRadius)) {
                        // Check if asteroid can be broken into smaller pieces
                        if (this.enemys[l].radius >= 10) {
                            if (this.enemys[l].level === 1) {
                                this.addPoints(10);
                                this.enemys.push(new Asteroid(this.#ctx, this.#canvas, this.enemys[l].x - 5, this.enemys[l].y - 5, 25, 2, 26));
                                this.enemys.push(new Asteroid(this.#ctx, this.#canvas, this.enemys[l].x + 5, this.enemys[l].y + 5, 25, 2, 26));
                            } else if (this.enemys[l].level === 2) {
                                this.addPoints(30);
                                this.enemys.push(new Asteroid(this.#ctx, this.#canvas, this.enemys[l].x - 5, this.enemys[l].y - 5, 15, 3, 16));
                                this.enemys.push(new Asteroid(this.#ctx, this.#canvas, this.enemys[l].x + 5, this.enemys[l].y + 5, 15, 3, 16));
                            } else {
                                this.addPoints(70);
                            }
                        }

                        this.enemys.splice(l, 1);
                        this.ship.balls.splice(m, 1);

                        //score += 20;

                        // Used to break out of loops because splicing arrays
                        // you are looping through will break otherwise
                        break loop1;
                    }
                }
            }
        }

    }
    addPoints(val) {

        this.points += val;
    }

    drawPoint() {

        this.#ctx.beginPath();
        this.#ctx.font = "15px monospace"
        this.#ctx.shadowBlur = 0;
        this.#ctx.shadowColor = "rgba(0, 0, 0, 1)";
        this.#ctx.shadowOffsetX = 1.5;
        this.#ctx.shadowOffsetY = 2;
        this.#ctx.fillStyle = 'rgba(255,255,255,1)';
        this.#ctx.textAlign = 'center';
        //this.ctx.strokeStyle = 'rgba(200,20,80,1)';
        //this.ctx.fillText(Math.round(this.variable.txt),this.x+5,this.y+10,this.w)  

        this.#ctx.fillText('Level: ' + this.totalLevelFini, this.#canvas.width * .5, 15, 50);
        this.#ctx.fillText('Score: ' + this.points, this.#canvas.width * .5, 30, 100);

        this.#ctx.fill();
        //this.ctx.stroke();
        this.#ctx.closePath();
        this.#ctx.shadowColor = "rgba(0, 0, 0, 0)";
        this.#ctx.textAlign = 'start';
    }

    circleCollision(p1x, p1y, r1, p2x, p2y, r2) {
        let radiusSum;
        let xDiff;
        let yDiff;

        radiusSum = r1 + r2;
        xDiff = p1x - p2x;
        yDiff = p1y - p2y;

        if (radiusSum > Math.sqrt((xDiff * xDiff) + (yDiff * yDiff))) {
            return true;
        } else {
            return false;
        }
    }

    getCollisionBitmap(_p, _offsetSpawn) {
        //this.#ctx.clearRect(0, 0, this.#canvas.width, this.#canvas.height);
        // On recup un pixel sur le canvas(target) et on check alpha du pixel
        let limiteColor = 50;//RVB a 50
        var imageData = this.#ctx.getImageData(this.ship.engin.x, this.ship.engin.y, 2, 2);
        //console.log(imageData.data);
        if (imageData.data[0] > limiteColor || imageData.data[1] > limiteColor || imageData.data[2] > limiteColor ||
            imageData.data[4] > limiteColor || imageData.data[5] > limiteColor || imageData.data[6] > limiteColor ||
            imageData.data[8] > limiteColor || imageData.data[9] > limiteColor || imageData.data[10] > limiteColor ||
            imageData.data[12] > limiteColor || imageData.data[13] > limiteColor || imageData.data[14] > limiteColor
        ) {
            //this.#targetCtx.globalCompositeOperation = 'destination-out';
            this.#targetCtx.beginPath();
            this.#targetCtx.fillStyle = "cyan";
            this.#targetCtx.strokeStyle = 'red';
            this.#targetCtx.arc(_p.x, _p.y, 2, 0, Math.PI * 2, false);
            this.#targetCtx.fill();
            //targetContext.stroke();

            //resetParticle(_p, _offsetSpawn);
            //resetParticle1();
            this.numCollision++;
        }


        if (_p.x > this.#canvas.width) {

            //resetParticle(_p, _offsetSpawn);
        }

        //_p.update(); 
    }
}