class Ship {
    /** @property {Thruster} thruster Notre force pour accel le ship */
    #thruster;// = new Thruster(0, 0);
    #angle;
    #limitAcceleration;// = 5;
    #ctx;
    #canvas;
    constructor(canvas, x, y, grav = 0) {
        this.#canvas = canvas;
        this.#ctx = canvas.getContext("2d");
        this.#angle = 0;//Angle current pour faire tourne le ship
        this.#limitAcceleration = 5;//On limit acceleration ( la pousse du ship ) sinon on arrive vite a INFINI
        this.shapeShip = new ShapeShip(this.#ctx, x, y);//La partie dessin
        
		/** @property {Particle} engin Fake moteur du ship 😉 */
        this.engin = new Particle(x, y, 0, 0, grav);// Notre 'moteur' sais a lui qu'on envoi la force du thruster
       
        this.#thruster = new Thruster(0, 0);// Copie d'un vec2D

        this.isShooting = false;

        //TODO Revoir syteme de commende ship
        this.turningLeft = false;
        this.turningRight = false;
        this.thrusting = false;
        this.thrustingBack = false;

        //On stock tous missiles du player
        this.balls = [];// new Particle(x, y, 0, 0, 0);

    }

    //#region UPDATE
    update() {
        this.updateRotation();
        this.updateAcceleration();

        this.updateBalls();

        //Mise a jours de la particule qui nous sert de moteur pour notre ship
        this.engin.update();

        //Mise a jours du visuel
        this.updateShapShip();

        //Check si le ship sort du canvas
        this.WarppingEdge();
    }

    /** Mise a jour de le rotation du ship */
    updateRotation() {
        // On decremente notre angle pour la rotation
        if (this.turningLeft) {
            this.#angle -= .05;
        }
        // On incremente notre angle pour la rotation
        if (this.turningRight) {
            this.#angle += .05;
        }

        //On ajoute cette angle a thruster(qui en un vec2D)
        this.#thruster.setHeading(this.#angle);
    }
    updateAcceleration() {
        // calcule Acceleration
        if (this.thrusting) {
            this.#thruster.setSpeed(0.1);
            //NOTE On modifi un peu de friction pour un meilleur control du ship 
            this.engin.friction = 0.99;
        } else if (this.thrustingBack) {
            this.#thruster.setSpeed(-0.1);

            this.engin.friction = 0.99;
        } else {
            this.#thruster.setSpeed(0);

            this.engin.friction = 0.9975;
        }

        //On ajoute accel seulment si le ship ne depace notre '#limitAcceleration'
        if (this.engin.getSpeed() <= this.#limitAcceleration)
            this.engin.accelerateV2(this.#thruster.getVec());

    }

    /** On met a jour le visuel du ship */
    updateShapShip() {
        //On cree un object(anonyme) pour envoyer au visuel 
        let settings = {
            x: this.engin.x,//Position X
            y: this.engin.y,//Position Y
            angle: this.#angle,//Rotation
            thrusting: this.thrusting,//Pour affichager ou non les truster AR
            thrustingBack: this.thrustingBack//Pour affichager ou non les truster AV
        };

        // On envoi au visuel
        this.shapeShip.updateSetting(settings);
    }

    /** Mise a jour de toute les balls tire par ce ship */
    updateBalls() {
        if (this.balls.length >= 0) {

            for (let i = 0; i < this.balls.length; i++) {
                const ball = this.balls[i];

                ball.update();//On met a jour la ball
                this.drawBalls(ball);//On dessine sur le canvas la ball
            }

            //On refait une boucle pour supprimer les balls sortie du canvas
            for (let i = 0; i < this.balls.length; i++) {
                const ball = this.balls[i];
                if (ball.x <= 0 || ball.x >= this.#canvas.width ||
                    ball.y <= 0 || ball.y >= this.#canvas.height) {
                    this.balls.splice(i, 1);
                }
            }
        }
    }
    //#endregion

    //#region DRAW

    /** Dessin notre ball sur la canvas
     * @param {Particle} ball Particule tire par le ship
     */
    drawBalls(ball) {

        this.#ctx.beginPath();
        this.#ctx.fillStyle = 'rgba(20,200,20,.8)';//'rgba(200,0,200,.8)';
        this.#ctx.strokeStyle = 'rgba(200,0,200,.8)';//'rgba(20,200,20,.8)';
        this.#ctx.arc(
            ball.x,
            ball.y,
            ball.radius,
            0, Math.PI * 2, false);

        this.#ctx.fill();

    }
    //#endregion

    //#region FOLLOW POINT & AIMPOINT

    /** Permet au ship de suivre un point(x,y) 
     * @param {Particle} target Cible a suivre
     * @param {Number} ease force du suivie
     * @returns true temps que le ship nai pas a la position de la 'target' et {false} une fois arrive sur 'target
     */
    followPoint(target, ease) {

        //Calcule de la distence entre les deux position
        var dx = target.x - this.engin.x,
            dy = target.y - this.engin.y;

        //Ajout du deplacement multiplier par la force de suivie    
        this.engin.x += dx * ease;
        this.engin.y += dy * ease;

        //On fait tourne le ship dans le direction de la target
        this.aimPoint(target.x, target.y);

        //On check la distance pour savoir si le ship et arrive sur la target
        if (Math.abs(dx) < .1 && Math.abs(dy) < .1) {
            this.engin.x = target.x;
            this.engin.y = target.y;
            return false;
        }
        return true;
    }

    /** Permet de faire tourne le ship dans le direction de position 
     * @param {Number} posX Position X a regarder
     * @param {Number} posY Position Y a regarder
     */
    aimPoint(posX, posY) {
        this.#angle = utils.clamp(Math.atan2(posY - this.engin.y, posX - this.engin.x), -Math.PI, Math.PI);
    }
    //#endregion

    //#region SHOOT 

    shoot() {
        var isBulletPhysique = false;
        let isOneShoot = true;


        let temp = new Particle(this.shapeShip.canon00.x, this.shapeShip.canon00.y, 0, 0, 0);
        let temp1 = new Particle(this.shapeShip.canon01.x, this.shapeShip.canon01.y, 0, 0, 0);
        let temp2 = new Particle(this.shapeShip.canon02.x, this.shapeShip.canon02.y, 0, 0, 0);
        temp.radius = 5;
        temp1.radius = 1.5;
        temp2.radius = 1.5;


        /* this.cannonball.x = this.ship.x;
        this.cannonball.y = this.ship.y;
        this.cannonball.vx = 0;
        this.cannonball.vy = 0; */
        if (isOneShoot) {

            temp.setSpeed(5);
            temp.setHeading(this.#angle);
            this.balls.push(temp);
            return;
        }


        if (isBulletPhysique) {
            //TODO: Simule la physique sur le projectile
            var poudre = new Vec2D(0, 0);
            poudre.setLength(10);
            poudre.setAngle(this.#angle);

            temp.accelerateV2(poudre.getVec());
        } else {
            temp.setSpeed(1);
            temp.setHeading(this.#angle);

            temp1.setSpeed(4);
            temp1.setHeading(this.#angle);

            temp2.setSpeed(4);
            temp2.setHeading(this.#angle);
        }

        this.balls.push(temp);
        this.balls.push(temp1);
        this.balls.push(temp2);
        this.isShooting = true;


        //console.log(temp.getSpeed() + ' | ' + this.cannonball.getSpeed());
        console.log(this.balls);
        this.isShooting = false;
    }
    //#endregion

    /** Ici on check si le ship sort du canvas */
    WarppingEdge() {
        let offsetRad = 1.5;
        let radDivPar2 = this.shapeShip.radius * offsetRad;

        if ((this.engin.x - radDivPar2) > this.#canvas.width) {
            this.engin.x = -radDivPar2;
        }
        if ((this.engin.x + radDivPar2) < 0) {
            this.engin.x = this.#canvas.width + radDivPar2;
        }
        if ((this.engin.y - radDivPar2) > this.#canvas.height) {
            this.engin.y = -radDivPar2;
        }
        if ((this.engin.y + radDivPar2) < 0) {
            this.engin.y = this.#canvas.height + radDivPar2;
        }
    }
}