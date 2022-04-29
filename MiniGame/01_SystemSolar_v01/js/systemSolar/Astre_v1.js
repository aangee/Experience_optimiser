
class Astre_V1 {
    constructor(tempDistance, tempDiameter) {
        //index 
        this.index = -1;
        //console.debug(index);
        // Each planet object keeps track of its own angle of rotation.
        this.angle = Utils.randomRange(-100, 100);                       // Rotation around sun
        this.diameter = tempDiameter;         // Size of planet
        this.distance = tempDistance;         // Distance from sun
        this.orbitspeed = Utils.randomRange(0.00051, 0.00515); // Orbit speed

    }

    update() {
        // Increment the angle to rotate
        this.angle += this.orbitspeed;

    }

    draw(ctx) {
        // Before rotation and translation, the state of the matrix is saved with push().
        ctx.save();
        ctx.beginPath();
        // Rotate orbit
        ctx.rotate(this.angle);
        // Translate out distance
        ctx.translate(this.distance, 0);


        ctx.fillStyle = 'rgba(0,20,100,.9)';
        ctx.strokeStyle = 'rgba(0,100,20,.58)';
        ctx.arc(0, 0, this.diameter, 0, Math.PI * 2, false);
        //ctx.ellipse(0, 0, this.diameter, this.diameter,0,0,0,false);
        ctx.stroke();
        ctx.fill();

        //this.ctx.stroke();
        ctx.closePath();




        ctx.save();
        ctx.beginPath();
        ctx.rotate(-this.angle);
        //ctx.translate(this.distance, 0);
        ctx.beginPath();
        ctx.font = "10px monospace"
        ctx.shadowBlur = 0;
        ctx.shadowColor = "rgba(255, 255, 255, .1)";
        ctx.shadowOffsetX = 1.5;
        ctx.shadowOffsetY = 2;
        ctx.fillStyle = 'rgba(0,255,0,1)';
        ctx.fillText('Astre', -13, 2, 50);
        ctx.fillText(this.index, -5, 12, 50);
        ctx.fill();
        ctx.restore();


        // Once the planet is drawn, the matrix is restored with pop() so that the next planet is not affected.
        ctx.restore();

    }

}
