class Etoile {
    constructor(radius, distance, orbitSpeed, angle, color) {
        this.radius = radius;
        this.distance = distance;
        this.angle = angle;//random(TWO_PI);
        this.orbitSpeed = orbitSpeed;
        this.color = color;
        this.planets = [];
    }
    orbit() {
        this.angle += this.orbitSpeed;
        if (this.planets.length >= 0) {
            for (let i = 0; i < this.planets.length; i++) {
                this.planets[i].orbit();
            }
        }
    }
    spawnPlanets(total, color) {
        this.planets = [];
        for (let i = 0; i < total; i++) {
            let r = this.radius * .2;//this.radius / (level * 2);
            let d = utils.randomRange(this.radius + (r*5), (this.radius + r) * 5);//utils.randomRange(this.radius + r, (this.radius + r)*2);
            let o = utils.randomRange(0.0001, 0.00055);//utils.randomRange(-0.01, 0.01);
            this.planets.push(new Planet(r, d, o, utils.randomRange(-360, 360), color));

            let num = utils.randomInt(0, 3);
            this.planets[i].spawnMoons(num, 'green');

        }
    }

    draw(ctx) {
        ctx.save();
        ctx.beginPath();
        ctx.translate(worldCanvas.width * .5, worldCanvas.height * .5);

        ctx.beginPath();
        ctx.fillStyle = this.color;//'rgba(0,200,0,.9)';
        ctx.strokeStyle = 'rgba(200,200,25,.8)';
        ctx.arc(0, 0, this.radius, 0, Math.PI * 2, false);
        ctx.fill();
        ctx.stroke();

        if (this.planets.length >= 0) {
            for (let i = 0; i < this.planets.length; i++) {
                this.planets[i].orbit();
                this.planets[i].draw(ctx);
            }
        }

        ctx.restore();
    }
}