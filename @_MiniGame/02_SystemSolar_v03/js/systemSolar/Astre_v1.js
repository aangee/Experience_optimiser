
class Astre_V1 {
    constructor(tempDistance, tempDiameter) {
        // Each planet object keeps track of its own angle of rotation.
        this.angle = utils.randomRange(-100, 100);                       // Rotation around sun
        this.diameter = tempDiameter;         // Size of planet
        this.distance = tempDistance;         // Distance from sun
        this.orbitspeed = utils.randomRange(0.01, 0.015); // Orbit speed

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
        
        // Once the planet is drawn, the matrix is restored with pop() so that the next planet is not affected.
        ctx.restore();
    }

}
