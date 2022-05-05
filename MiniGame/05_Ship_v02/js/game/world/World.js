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


        this.astres = [];
        for (let i = 0; i < 50; i++) {
            let xR = utils.randomRange(0, size.x);//Random pos X
            let yR = utils.randomRange(0, size.y);//Random pos Y
            let rR = utils.randomRange(1, 3);//Random radius

            let tempAstre = new Sun(this.ctxWorld, xR, yR, rR);

            this.astres.push(tempAstre);
        }
    }

    update() {

        this.sun.update();
        this.station.update(this.sun.engin);


        for (let i = 0; i < this.astres.length; i++) {
            const astre = this.astres[i];

            astre.update();
        }


        this.ctxWorld.beginPath();
        this.ctxWorld.fillStyle = 'rgba(0,0,40,.1)';
        this.ctxWorld.strokeStyle = 'rgba(20,200,20,.8)';
        this.ctxWorld.rect(0, 0, this.size.x, this.size.y);
        this.ctxWorld.stroke();
        this.ctxWorld.fill();
    }

}