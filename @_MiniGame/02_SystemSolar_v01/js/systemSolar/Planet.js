class Planet {
    constructor(radius, distance, orbitSpeed,angle,color) {
   
        this.radius = radius;
        this.distance = distance;
        this.angle = angle;//random(TWO_PI);
        this.orbitSpeed = orbitSpeed;
        this.color = color;
        this.moons = [];
    }

    orbit() {
        this.angle += this.orbitSpeed;
        if (this.moons.length >= 0) {
            for (let i = 0; i < this.moons.length; i++) {
                this.moons[i].orbit();
            }
        }
    }

    spawnMoons(total, color) {
        this.moons = [];
        for (let i = 0; i < total; i++) {
            let distanceMaxSpawn = 3;
            let distanceMinSpawn = 2;
            let r = this.radius*.1;//this.radius / (level * 2);
            let d = utils.randomRange(this.radius + (r*distanceMinSpawn), (this.radius + r)*distanceMaxSpawn);//utils.randomRange(this.radius + r, (this.radius + r)*2);
            let o = utils.randomRange(-0.0035, 0.0035);//utils.randomRange(-0.01, 0.01);
            this.moons.push(new Moon(r, d, o,utils.randomRange(-360, 360),color));
           
        }
    }
    
    draw(ctx) {

        ctx.save();
        ctx.beginPath();
       
        ctx.rotate(this.angle);
        ctx.translate(this.distance, 0);

        ctx.beginPath();
        ctx.fillStyle = this.color;//'rgba(200,0,0,.9)';
        ctx.strokeStyle = 'rgba(200,0,0,.8)';
        ctx.arc(0, 0, this.radius, 0, Math.PI * 2, false); 

        ctx.stroke();
        ctx.fill();

        if (this.moons.length >= 0) {
            for (let i = 0; i < this.moons.length; i++) {
                this.moons[i].draw(ctx);
            }
        }

        ctx.restore();
    }
}