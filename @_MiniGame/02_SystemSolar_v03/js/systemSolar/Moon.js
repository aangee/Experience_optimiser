class Moon {
    constructor(radius, distance, orbitSpeed, angle, color) {

        this.radius = radius;
        this.distance = distance;
        this.angle = angle;//random(TWO_PI);
        this.orbitSpeed = orbitSpeed;
        this.color = color;
    }

    orbit() {
        this.angle += this.orbitSpeed;
    }

   

    draw(ctx) {

        ctx.save();
        ctx.beginPath();

        ctx.rotate(this.angle);
        ctx.translate(this.distance, 0);

        ctx.beginPath();
        ctx.fillStyle = this.color;//'rgba(0,200,0,.9)';
        ctx.strokeStyle = 'rgba(0,200,0,.8)';
        ctx.arc(0, 0, this.radius, 0, Math.PI * 2, false);


        ctx.stroke();
        ctx.fill();
        ctx.restore();
    }
}