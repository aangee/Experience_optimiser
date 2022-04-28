class SystemSolar {

    constructor() {

        this.maxPlanet = 7;
        this.planets = [];
        this.radius = 30;

        // The planet objects are initialized 
        for (let i = 0; i < this.maxPlanet; i++) {

            let r = this.radius * .5;
            let d = utils.randomRange(this.radius + r, (this.radius + r) * 2);
            let planet = new Astre_V1(d + i * this.radius, r, 1);
            planet.index = '0' + i;

            this.planets.push(planet);


            //this.planets[i] = new Astre_V1(64 + i * 32, 24);
        }
    }


    draw(ctx) {
        this.debugBorderCanvas(ctx);
        // Drawing the Sun
        ctx.save();
        ctx.beginPath();
        ctx.translate((width * 2) / 2, (height * 2) / 2);

        ctx.lineWidth = 5;
        ctx.fillStyle = 'rgba(200,150,20,.9)';
        ctx.strokeStyle = 'rgba(200,100,100,.8)';
        ctx.arc(0, 0, this.radius, 0, Math.PI * 2, false);
        //ctx.ellipse(0, 0, 64, 64,0,0,0,false);

        ctx.stroke();
        ctx.fill();
        ctx.closePath();

        // Drawing all Planets
        for (let i = 0; i < this.planets.length; i++) {
            const planet = this.planets[i];
            planet.update();
            planet.draw(ctx);
        }
        ctx.restore();
    }

    debugBorderCanvas(ctx) {

        ctx.beginPath();
        ctx.lineWidth = 5;
        ctx.strokeStyle = 'rgba(150,20,20,.9)';
        ctx.rect(0, 0, width * 2, height * 2);
        ctx.stroke();
        ctx.closePath();
    }
}