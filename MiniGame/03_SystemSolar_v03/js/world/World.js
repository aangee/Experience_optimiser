class World {
    /**
     * Construie le monde, hihi
     * @param { Object } settings Option de reglage du world
     * @param { Number } settings.x Position du world en X
     * @param { Number } settings.y Position du world en Y
     * @param { Vec2D } settings.size Size du world
     * @param { String } settings.canvas
     * @param { CanvasRenderingContext2D } settings.ctx Context de rendu
     */
    constructor(settings) {
        if (settings == null) return; // Sais juste pour avoir intellicense dans le script "main.js"

        this.x = settings.x; // pos X
        this.y = settings.y; // pos Y
        /**
        * @param { Vec2D } size Size
        * @param { Number } size.x Size W
        * @param { Number } size.y Size H
        */
        this.size = settings.size; // Vec2D

        this.centerWorld = { x: this.size.x * .5, y: this.size.y * .5 };
        //this.centerWorld.x -= 400;
        this.canvas = settings.canvas;
        this.ctx = settings.ctx;


        // On regle la taille du canvas
        this.canvas.width = this.size.x;
        this.canvas.height = this.size.y;

        // On cree le centre de notre galaxie
        this.blackHold = new Astre(this.centerWorld.x, this.centerWorld.y, 10, 0, 'black', 'Trou Noir');

         
        /** @property { Astre[] } planets On stock toutes les syteme */
        this.sytemes = [];

        // Si on veux que les lune de nos planet et aussi une lune. §§LOL§§
        this.isActiveMoonForPlanet = false;


        this.createCenterGalactic();
        console.log(this.ctx.__proto__);
    }

    createCenterGalactic() {
        for (let i = 0; i < 7; i++) {
            let sizeZoneSpawn = 300;// Taille du spawn des syteme
            let rx = utils.randomRange(this.centerWorld.x + sizeZoneSpawn, this.centerWorld.x - sizeZoneSpawn);// Position x
            let ry = utils.randomRange(this.centerWorld.y + sizeZoneSpawn, this.centerWorld.y - sizeZoneSpawn);// Position y
            let rr = utils.randomRange(3, 7);// Size ou radius comme tu prefaire
            let rc = `rgba(${utils.randomRange(0, 255)},${utils.randomRange(0, 255)},${utils.randomRange(0, 255)},1)`;
            let ra = utils.randomRange(.0001, .00012);//utils.randomRange(-.005, .005);// Speed ou vitesse 
            let rp = utils.randomInt(1, 7);//NOTE Chance pour avoir une ou plusieur planet

            let tempSystem = new Astre(rx, ry, rr, ra, rc, 'System ' + i, rp, 0);// System a ajoute

            for (let j = 0; j < tempSystem.numPlanets; j++) {
                let rx1 = utils.randomRange(tempSystem.x + 30, tempSystem.x - 30);// Position x
                let ry1 = utils.randomRange(tempSystem.y + 30, tempSystem.y - 30);// Position y
                let rr1 = utils.randomRange(2, 3);// Size ou radius
                let rc1 = `rgba(${utils.randomRange(0, 255)},${utils.randomRange(0, 255)},${utils.randomRange(0, 255)},1)`;
                let ra1 = utils.randomRange(-.003, .003);// Speed
                let rm = utils.randomInt(-1, 2);//NOTE Chance pour avoir une ou plusieur lune
                let tempPlanet = new Astre(rx1, ry1, rr1, ra1, rc1, 'planet ' + j, 0, rm);

                if (this.isActiveMoonForPlanet) {
                    for (let k = 0; k < tempPlanet.numMoons; k++) {
                        let rx2 = utils.randomRange(tempPlanet.x + 10, tempPlanet.x - 10);
                        let ry2 = utils.randomRange(tempPlanet.y + 10, tempPlanet.y - 10);
                        let rr2 = utils.randomRange(1, 2);
                        let rc2 = `rgba(${utils.randomRange(0, 255)},${utils.randomRange(0, 255)},${utils.randomRange(0, 255)},1)`;
                        let ra2 = utils.randomRange(-.03, .03);
                        //let rm2 = utils.randomInt(0,1);
                        let tempMoon = new Astre(rx2, ry2, rr2, ra2, rc2, 'moon ' + k, 0);
                        // Ajoute d'une lune
                        tempPlanet.moons.push(tempMoon);

                    }
                }

                // Ajoute d'une planet
                tempSystem.planets.push(tempPlanet);

            }

            console.log(tempSystem);
            // Ajoute d'un system
            this.sytemes.push(tempSystem);
        }
    }


    loop() {

        this.blackHold.draw(this.ctx);
        this.blackHold.drawText(this.ctx);

        this.ctx.save();// On save pour le centre galatique

        // LOOP: Systemes
        for (let i = 0; i < this.sytemes.length; i++) {
            const tempSystem = this.sytemes[i];

            // On centre l'axe 0|0 sur le centre galatique
            this.ctx.translate(this.centerWorld.x, this.centerWorld.y);
            // On ajoute la rotation
            this.ctx.rotate(tempSystem.angle);
            // On re bouge le tous 
            this.ctx.translate(-this.centerWorld.x, -this.centerWorld.y);

            // On recup la position pour avoir en global
            tempSystem.dx = tempSystem.x + this.ctx.getTransform().e;//+tempSystem.x*.5;
            tempSystem.dy = tempSystem.y + this.ctx.getTransform().f;//+tempSystem.y*.5;

            // On dessin notre etoile
            tempSystem.draw(this.ctx);
            tempSystem.drawText(this.ctx);

            // LOOP: Planetes
            for (let i = 0; i < tempSystem.planets.length; i++) {
                const planet = tempSystem.planets[i];

                this.ctx.save();// On save pour les planetes

                // On centre l'axe 0|0 sur le centre de notre syteme
                this.ctx.translate(tempSystem.x, tempSystem.y);
                // On ajoute la rotation
                this.ctx.rotate(-planet.angle);
                // On re bouge le tous 
                this.ctx.translate(-tempSystem.x, -tempSystem.y);

                // On recup la position pour avoir en global
                planet.dx = this.ctx.getTransform().e;
                planet.dy = this.ctx.getTransform().f;

                // On dessin notre planete
                planet.draw(this.ctx);

                //planet.drawText(this.ctx);

                //FIXME Avoir pour se faire une fonction pour eviter ses 3 repetition
                // Si notre planete a ses propre lune
                if (planet.moons != null) {
                    // LOOP: Lunes
                    for (let k = 0; k < planet.moons.length; k++) {
                        const moon2 = planet.moons[k];

                        this.ctx.save();// On save pour les lunes

                        // On centre l'axe 0|0 sur le centre de notre planete
                        this.ctx.translate(planet.x, planet.y);
                        // On ajoute la rotation
                        this.ctx.rotate(-moon2.angle);
                        // On re bouge le tous 
                        this.ctx.translate(-planet.x, -planet.y);

                        // On recup la position pour avoir en global
                        //moon2.dx = this.ctx.getTransform().e;
                        //moon2.dy = this.ctx.getTransform().f;

                        // On dessin notre lune
                        moon2.draw(this.ctx);
                        this.ctx.restore();// On restore pour les lunes

                    }

                }
                this.ctx.restore();// On restore pour les planetes
            }
        }

        this.ctx.restore();// On restore pour le centre galatique


        // Pour afficher les bord de notre world
        this.ctx.beginPath();
        //ctx.fillStyle = 'rgba(0,255,0,1)';
        this.ctx.lineWidth = 2;
        this.ctx.lineJoin = "round";//butt|round|square 

        this.ctx.strokeStyle = 'rgba(200,0,100,.8)';
        this.ctx.rect(this.x, this.y, this.size.x, this.size.y);
        //ctx.fill();
        this.ctx.stroke();
        this.ctx.closePath();
    }
}



