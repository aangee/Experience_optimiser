class Sun{
    #ctx;
    constructor(ctx, x, y, radius) { 
        this.#ctx = ctx; 
        this.x = x;
        this.y = y;
        this.radius = radius;
        this.thruster = new Thruster(0, 0);//Notre force pour accel le ship
        this.engin = new Particle(this.x, this.y, 0, 0);// Notre 'moteur' sais lui con envoi la force du thruster

        this.engin.mass = 160;
    }

    update(){
        this.draw();
        this.engin.update();
    }

    draw(){
        this.#ctx.beginPath();
        this.#ctx.fillStyle = 'rgba(200,200,0,.9)';
        this.#ctx.strokeStyle = 'rgba(255,200,0,.8)';
        this.#ctx.arc(this.engin.x, this.engin.y, this.radius, 0, Math.PI * 2, false);
        this.#ctx.fill();
        this.#ctx.stroke();
        this.#ctx.closePath();
    }
}