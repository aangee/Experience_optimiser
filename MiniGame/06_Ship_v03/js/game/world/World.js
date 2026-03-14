class World {
    /** Cree un world test
     * @param {*} ctx
     * @param {Vec2D} size
     */
    constructor(ctxWorld, size) {
        this.ctxWorld = ctxWorld;
        this.size = size;

        // Entitys level
        this.station = new Station(this.ctxWorld, 400, 300, 5, 'World II');
        this.sun = new Sun(this.ctxWorld, 300, 300, 10);

        // v3: les étoiles de fond ne bougent pas → on les dessine une seule fois sur un canvas offscreen.
        // En v2, les 50 Sun.update() étaient appelés chaque frame pour rien.
        this.bgCanvas = document.createElement('canvas');
        this.bgCanvas.width = size.x;
        this.bgCanvas.height = size.y;
        const bgCtx = this.bgCanvas.getContext('2d');

        for (let i = 0; i < 50; i++) {
            let xR = utils.randomRange(0, size.x);
            let yR = utils.randomRange(0, size.y);
            let rR = utils.randomRange(1, 3);
            let tempAstre = new Sun(bgCtx, xR, yR, rR);
            tempAstre.update(); // dessiné une seule fois
        }
    }

    update() {
        // v3: on colle le canvas statique des étoiles plutôt que de les recalculer
        this.ctxWorld.drawImage(this.bgCanvas, 0, 0);

        this.sun.update();
        this.station.update(this.sun.engin);

        this.ctxWorld.beginPath();
        this.ctxWorld.fillStyle = 'rgba(0,0,40,.1)';
        this.ctxWorld.strokeStyle = 'rgba(20,200,20,.8)';
        this.ctxWorld.rect(0, 0, this.size.x, this.size.y);
        this.ctxWorld.stroke();
        this.ctxWorld.fill();
    }

}
