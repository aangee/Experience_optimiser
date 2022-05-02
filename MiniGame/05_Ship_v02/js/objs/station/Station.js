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
      new CompoArmement('turret', 2, true),
      new CompoArmement('machineGun', 1, false),
      new CompoArmement('gatling', 3, false),
      new CompoArmement('debugArme', 1, false)
    );

    this.name = _name;
    this.lives = 1000;
    this.isShoot = false;
    this.isTarget = false;
    this.target = { id: 25480, name: 'Ceci sera un ennemi, plus tard  ', x: innerWidth / 2, y: 50 }

  }

  update(engin) {
    //this.engin.vx = 0;
    //this.engin.vy = 0;

    //TEST ciblage - Ajoute du monvement a la cible
    (this.target.x > innerWidth * .8) ? this.target.x = 100 : this.target.x += 1.1;


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

  drawArmes() {
    //console.log(this.armements);

    this.armements.armes[0].x = this.engin.x;
    this.armements.armes[0].y = this.engin.y;
    this.armements.armes[0].lookAt(this.target);

    this.#ctx.beginPath();


    //TEST ciblage - On dessin un cible pour les test
    this.#ctx.beginPath();

    this.#ctx.fillStyle = 'rgba(200,0,100,.71)';
    this.#ctx.strokeStyle = 'rgba(20,200,20,.8)';
    this.#ctx.rect(this.target.x, this.target.y, 1, 20);
    this.#ctx.rect(this.target.x - 10, this.target.y + 10, 20, 1);

    this.#ctx.fill();
    this.#ctx.beginPath();
    this.#ctx.arc(this.target.x, this.target.y + 10, 5, 0, Math.PI * 2, false);
    this.#ctx.arc(this.target.x, this.target.y + 10, 10, 0, Math.PI * 2, false);
    this.#ctx.stroke();
    //TEST FIN test ciblage

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
    this.#ctx.fillText(this.name, 15, 0);

    this.#ctx.fill();

    this.#ctx.closePath();

    this.#ctx.restore();



    this.#ctx.save();
    this.#ctx.translate(this.engin.x, this.engin.y);

    this.#ctx.rotate(this.engin.getHeading() * 2);

    this.#ctx.beginPath();

    this.#ctx.fillStyle = 'rgba(100,0,0,.51)';
    this.#ctx.strokeStyle = 'rgba(20,200,20,.8)';

    this.#ctx.arc(-10, 0, this.radius - 5, 0, Math.PI * 2, false);

    this.#ctx.fill();
    this.#ctx.stroke();

    this.#ctx.closePath();

    this.#ctx.restore();



    this.#ctx.save();
    this.#ctx.translate(this.engin.x, this.engin.y);
    this.#ctx.rotate(this.armements.armes[0].angle);

    this.#ctx.beginPath();

    this.#ctx.fillStyle = this.armements.armes[0].dbgColor;//'rgba(100,0,0,.51)';
    this.#ctx.strokeStyle = 'rgba(20,200,20,.8)';
    this.#ctx.rect(10, 0 - ((this.radius - 5) * .5), this.radius, this.radius - 5);

    this.#ctx.fill();
    this.#ctx.stroke();

    this.#ctx.closePath();

    this.#ctx.restore();

  }
}