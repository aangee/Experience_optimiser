class Station {
    #ctx;
    constructor(ctx, x, y, radius, _name) {
        this.#ctx = ctx;
        this.x = x;
        this.y = y;
        this.radius = radius;
        this.thruster = new Thruster(0, 0);//Notre force pour accel le ship
        this.engin = new Particle(this.x, this.y, 1.4, -1.5);// Notre 'moteur' sais lui con envoi la force du thruster
        this.engin.mass = 100;

        // Tous les armements de la station
        this.armements = new Armement(
          new CompoArmement('turret',2,true),
          new CompoArmement('machineGun',1,false),
          new CompoArmement('gatling',3,false),
          new CompoArmement('debug',1,false)
        );

        this.name = _name;
        this.lives = 1000;
        this.isShoot = false;
        this.isTarget = false;
        this.target = { id: 25480, name: 'Ceci sera un ennemi, plus tard  ', a: 'Fake posX', b: 'Fake posY  ' }
    }

    update(engin) {
        //this.engin.vx = 0;
        //this.engin.vy = 0;
        this.engin.gravitateTo(engin);


        this.engin.update();
        this.draw();

        this.drawArmes();

        this.lives -= (this.lives >= 0) ? utils.randomRange(.001, .01) : -1000;

    }

    draw() {
        this.#ctx.beginPath();
        this.#ctx.fillStyle = 'rgba(0,0,0,1)';
        this.#ctx.strokeStyle = 'rgba(20,200,20,.8)';
        this.#ctx.arc(this.engin.x, this.engin.y, this.radius, 0, Math.PI * 2, false);
        this.#ctx.fill();
        this.#ctx.stroke();
        this.#ctx.closePath();
    }

    drawArmes(){
        //console.log(this.armements);
        this.armements.armements[0].targetCible(.01);

        this.#ctx.save();
        this.#ctx.translate(this.engin.x, this.engin.y);

        this.#ctx.beginPath();

        this.#ctx.font = "10px monospace"
        this.#ctx.shadowBlur = 0;
        this.#ctx.shadowColor = "rgba(0, 0, 0, 1)";
        this.#ctx.shadowOffsetX = 1.5;
        this.#ctx.shadowOffsetY = 2;
        this.#ctx.fillStyle = 'rgba(255,255,255,1)';
        this.#ctx.fillText('Station:', 8, -10);
        this.#ctx.font = "8px monospace"
        this.#ctx.fillText('Terra VII', 15, 0);
        
        this.#ctx.fill();

        this.#ctx.closePath();

        this.#ctx.restore();



        this.#ctx.save();
        this.#ctx.translate(this.engin.x, this.engin.y);

        this.#ctx.rotate(this.armements.armements[0].angle);

        this.#ctx.beginPath();

        this.#ctx.fillStyle = 'rgba(100,0,0,.51)';
        this.#ctx.strokeStyle = 'rgba(20,200,20,.8)';

        this.#ctx.arc(-10, 0, this.radius-5, 0, Math.PI * 2, false);
        
        this.#ctx.fill();
        this.#ctx.stroke();

        this.#ctx.closePath();

        this.#ctx.restore();



        this.#ctx.save();
        this.#ctx.translate(this.engin.x, this.engin.y);
        this.#ctx.rotate(this.engin.getHeading()*2);

        this.#ctx.beginPath();

        this.#ctx.fillStyle = 'rgba(100,0,0,.51)';
        this.#ctx.strokeStyle = 'rgba(20,200,20,.8)';
        this.#ctx.rect(0-((this.radius-5)*.5), 10, this.radius-5, this.radius);

        this.#ctx.fill();
        this.#ctx.stroke();

        this.#ctx.closePath();

        this.#ctx.restore();
        
    }
}