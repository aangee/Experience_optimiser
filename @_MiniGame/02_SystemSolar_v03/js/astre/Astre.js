class Astre {
  /** Cree un astre
   * @param {Number} x Position en X
   * @param {Number} y Position en X
   * @param {Number} radius Radius de notre astre
   * @param {Number} angleSpeed Vitesse de rotation autour de son parent
   * @param {String} color Color de astre
   * @param {String} typeName Type astre (etoile, planet, lune, ect...)
   * @param {Number} numPlanets Numbre de astre a ajoute si on et sur un centre galactique
   * @param {Number} numMoons Numbre de lune a ajoute si on et sur une planet ou lune
   */
  constructor(
    x,
    y,
    radius,
    angleSpeed,
    color = "rgba(200,200,0,.9)",
    typeName = "DEFAULT",
    numPlanets,
    numMoons
  ) {
    /** @property {Number} typeName Type astre (etoile, planet, lune, ect...) */
    this.typeName = typeName;

    /** @property {Number} x Position en X */
    this.x = x;

    /** @property {Number} y Position en Y */
    this.y = y;

    /** @property {Number} dx Position global en X */
    this.dx = x;

    /** @property {Number} dy Position global en Y */
    this.dy = y;

    /** @property {Number} radius Radius de notre astre */
    this.radius = radius;

    /** @property {String} color Color de astre */
    this.color = color;

    /** @property {Number} angleSpeed Vitesse de rotation autour de son parent */
    this.angleSpeed = angleSpeed;

    /** @property {Number} angle Angle de rotation */
    this.angle = 0;

    /** @property {Number} numPlanets Numbre de astre a ajoute si on et sur un centre galactique */
    this.numPlanets = numPlanets;

    /** @property { Astre[] } planets Tous les planet de notre astre */
    this.planets = [];

    /** @property {Number} numMoons Numbre de lune a ajoute si on et sur une planet ou lune */
    this.numMoons = numMoons;

    /** @property { Astre[] } moons Tous les lune de notre astre */
    this.moons = [];
  }

  draw(ctx) {
    // On ajoute notre vite pour faire tourne le bazard
    this.angle += this.angleSpeed;

    ctx.beginPath();
    ctx.lineWidth = 0.1;
    ctx.fillStyle = this.color; // 'rgba(200,200,0,.9)';
    ctx.strokeStyle = "rgba(255,200,0,.8)";
    ctx.arc(this.x, this.y, this.radius, 0, Math.PI * 2, false);
    ctx.fill();
    ctx.stroke();
    ctx.closePath();

    //this.drawText(ctx);
  }

  drawText(ctx) {
    //ctx.save()
    ctx.beginPath();
    ctx.font = "3px monospace";
    ctx.shadowBlur = 0;
    ctx.shadowColor = "rgba(255, 255, 255, .1)";
    ctx.shadowOffsetX = 1.5;
    ctx.shadowOffsetY = 2;
    ctx.fillStyle = "rgba(255,200,200,1)";
    //this.ctx.strokeStyle = 'rgba(200,20,80,1)';
    //this.ctx.fillText(Math.round(this.variable.txt),this.x+5,this.y+10,this.w)

    //ctx.fillText(this.typeName, this.x, this.y, 50);
    ctx.fillText(this.typeName, this.x, this.y - (this.radius + 2), 50);

    ctx.fill();
    //this.ctx.stroke();
    ctx.closePath();
    ctx.shadowColor = "rgba(255, 255, 255, 0)";
    //ctx.restore();
  }
}