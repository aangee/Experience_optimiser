class ShapeShip {

    #ctx;
    constructor(ctx, x, y) {
        this.#ctx = ctx;
        this.x = x;
        this.y = y;
        this.radius = 10;
        this.angle = 0;
        this.canon00 = { x: 0, y: 0 };
        this.canon01 = { x: 0, y: 0 };
        this.canon02 = { x: 0, y: 0 };

        let numPointsShap = 3;
        this.vertexAngle = ((Math.PI * 2) / 3);// (/3) Pour un triangle (/4) pour un carre ect


        this.p0 = { x: 0, y: 0 };// { x: 10, y: 0 };
        this.p1 = { x: 0, y: 0 };// { x: -10, y: -7 };
        this.p2 = { x: 0, y: 0 };// { x: -10, y: 7 };



        this.thrusting = false;
        this.thrustingBack = false;
    }


    update() {

        this.updatePositionPoints();
        this.updatePositionCanons();
        
        this.drawAll();
    }
    updateSetting(settings) {
        this.x = settings.x;
        this.y = settings.y;
        this.angle = settings.angle;
        this.thrusting = settings.thrusting;
        this.thrustingBack = settings.thrustingBack;

        this.update();
    }
    //#region Calcule position & rotation
    updatePositionPoints() {

        // Le point du nez du ship 
        this.p0.x = (this.x) + (this.radius * 2) * Math.cos(this.vertexAngle * 0 + this.angle);
        this.p0.y = (this.y) + (this.radius * 2) * Math.sin(this.vertexAngle * 0 + this.angle);

        // Les deux autre point
        this.p1.x = (this.x) + (this.radius) * Math.cos(this.vertexAngle * 1 + this.angle);
        this.p1.y = (this.y) + (this.radius) * Math.sin(this.vertexAngle * 1 + this.angle);


        this.p2.x = (this.x) + (this.radius) * Math.cos(this.vertexAngle * 2 + this.angle);
        this.p2.y = (this.y) + (this.radius) * Math.sin(this.vertexAngle * 2 + this.angle);
    }
    updatePositionCanons() {

        // Position de 1 new point en arriere du point du nez
        this.noseX = this.x + (this.radius - 1) * Math.cos(this.angle);
        this.noseY = this.y + (this.radius - 1) * Math.sin(this.angle);

        // Position du canon central
        this.canon00.x = this.x + this.radius * Math.cos(this.angle);
        this.canon00.y = this.y + this.radius * Math.sin(this.angle);


        // Position canon droite
        this.canon01.x = (this.x) + (this.radius + 3) * Math.cos(this.angle + .5);
        this.canon01.y = (this.y) + (this.radius + 3) * Math.sin(this.angle + .5);

        // Position canon gauche
        this.canon02.x = (this.x) + (this.radius + 3) * Math.cos(this.angle - .5);
        this.canon02.y = (this.y) + (this.radius + 3) * Math.sin(this.angle - .5);
    }
    //#endregion

    //#region Draw
    drawAll() {

        //this.#ctx.save();
        //this.#ctx.translate(this.x*.5, this.y*.5);

        //this.#ctx.scale(1.5, 1.5);

        this.drawCanons();
        this.drawShip();

        this.drawThrusters();

        //this.#ctx.restore();
    }
    drawShip() {
        this.#ctx.beginPath();
        this.#ctx.lineWidth = 1;
        this.#ctx.fillStyle = 'rgba(200,0,200,.8)';
        this.#ctx.strokeStyle = 'rgba(20,200,20,.8)';

        this.#ctx.moveTo(this.p0.x, this.p0.y);

        this.#ctx.lineTo(this.p1.x, this.p1.y);

        this.#ctx.lineTo(this.p2.x, this.p2.y);

        this.#ctx.closePath();

        this.#ctx.fill();
        this.#ctx.stroke();


        //Deco pour le ship
        this.#ctx.beginPath();
        this.#ctx.fillStyle = 'rgba(0,0,0,1)';
        this.#ctx.strokeStyle = 'rgba(20,200,20,.8)';
        this.#ctx.arc(this.x, this.y, 4, 0, Math.PI * 2, false);
        this.#ctx.fill();
        this.#ctx.stroke();
        this.#ctx.closePath();

        this.#ctx.beginPath();
        this.#ctx.fillStyle = 'rgba(0,0,0,1)';
        this.#ctx.strokeStyle = 'rgba(20,200,20,.8)';
        this.#ctx.arc(this.noseX, this.noseY, 2, 0, Math.PI * 2, false);
        this.#ctx.fill();
        this.#ctx.stroke();
        this.#ctx.closePath();


    }
    drawThrusters() {
        //TODO:Draw thruster
        this.#ctx.save();
        this.#ctx.translate(this.x, this.y);
        this.#ctx.rotate(this.angle);
        this.#ctx.beginPath();
        this.#ctx.lineWidth = 1;
        this.#ctx.lineCap = "round";//butt|round|square
        this.#ctx.strokeStyle = 'rgba(200,150,0,.8)';

        if (this.thrusting) {
            this.#ctx.moveTo(-10, 0);
            this.#ctx.lineTo(-18, 0);

            this.#ctx.moveTo(-10, 3);
            this.#ctx.lineTo(-14, 4);

            this.#ctx.moveTo(-10, -3);
            this.#ctx.lineTo(-14, -4);
        }
        else if (this.thrustingBack) {
            this.#ctx.moveTo(21, 0);
            this.#ctx.lineTo(28, 0);

            this.#ctx.moveTo(20, 3);
            this.#ctx.lineTo(24, 4);

            this.#ctx.moveTo(20, -3);
            this.#ctx.lineTo(24, -4);
        }

        this.#ctx.stroke();
        this.#ctx.restore();
    }
    drawCanons() {
        // Canon AV 
        this.#ctx.save();
        this.#ctx.translate(this.x, this.y);
        this.#ctx.rotate(this.angle);
        this.#ctx.beginPath();
        this.#ctx.lineCap = "round";//butt|round|square
        this.#ctx.fillStyle = 'rgba(0,0,0,1)';
        this.#ctx.strokeStyle = 'rgba(20,200,20,.8)';

        this.#ctx.lineWidth = 2;
        this.#ctx.moveTo(-6, -6);
        this.#ctx.lineTo(9, -6);


        this.#ctx.moveTo(-6, 6);
        this.#ctx.lineTo(9, 6);

        this.#ctx.stroke();
        this.#ctx.fill();

        this.#ctx.restore();
    }
    //#endregion
}