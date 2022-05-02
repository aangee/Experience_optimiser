class Asteroid {
    #ctx;
    #canvas;
    #testVaEtVien = 1;
    #isMax = false;
    constructor(ctx, canvas, x, y, radius, level, collisionRadius) {
        this.#ctx = ctx;
        this.#canvas = canvas;
        this.visible = true;
        this.radiuSpawn = 300;
        this.x = x || (this.#canvas.width / 2) - (this.radiuSpawn / 2) + Math.random() * this.radiuSpawn;
        this.y = y || (this.#canvas.height / 2) - (this.radiuSpawn / 2) + Math.random() * this.radiuSpawn;
        this.speed = (Math.random() * 2.161 + .16180);
        this.radius = radius || (Math.random() * 30 + 25);
        this.angle = (Math.random() <= .5) ? Math.random() : -Math.random();//Math.floor(Math.random() * 359);
        this.strokeColor = 'white';
        this.collisionRadius = collisionRadius || 46;
        // Used to decide if this asteroid can be broken into smaller pieces
        this.level = level || 1;
        this.seed = [
            utils.randomRange(0.7,1),
            utils.randomRange(0.85,1),
            utils.randomRange(0.7,1),
            utils.randomRange(0.68,1),
            utils.randomRange(0.7,1),
            utils.randomRange(0.85,1),
        
            utils.randomRange(0.85,1),
            utils.randomRange(0.8,1),
            utils.randomRange(0.85,1),
            utils.randomRange(0.75,1),
            utils.randomRange(0.8,1),
            utils.randomRange(0.7,1)]
    }
    Update() {
        let radians = this.angle / Math.PI * 180;
        this.x += Math.cos(radians) * this.speed;
        this.y += Math.sin(radians) * this.speed;


        this.Draw();
        this.WarppingEdge()
    }
    Draw() {
        this.#ctx.beginPath();
        this.#ctx.lineWidth = 2;
        this.#ctx.fillStyle = 'rgba(200,0,200,.8)';
        this.#ctx.strokeStyle = 'rgba(100,8,0,.8)';
        let vertAngle = ((Math.PI * 2) / 12);
        var radians = this.angle / Math.PI * 180;


        /* for (let i = 0; i < 6; i++) {
            this.#ctx.lineTo(
                this.x - (this.radius * this.#testVaEtVien) * Math.cos(vertAngle * i + radians),
                this.y - (this.radius * this.#testVaEtVien) * Math.sin(vertAngle * i + radians));
        } */
        for (let i = 0; i < 12; i++) {
            this.#ctx.lineTo(
                this.x - (this.radius * this.seed[i]) * Math.cos(vertAngle * i + radians),
                this.y - (this.radius * this.seed[i]) * Math.sin(vertAngle * i + radians));
        }
        this.#ctx.closePath();
        //this.#ctx.fill();
        this.#ctx.stroke();


        //this.angle += .00006;
        if ((this.#testVaEtVien <= 1) && !this.#isMax) {

            this.#testVaEtVien += 0.005;
            if ((this.#testVaEtVien >= 1)) {
                this.#isMax = true;
            }
        } else {

            this.#testVaEtVien -= 0.001;
            if ((this.#testVaEtVien <= .95)) {
                this.#isMax = false;
            }
        }

    }

    WarppingEdge() {


        if ((this.x - this.radius) > this.#canvas.width) {
            this.x = -this.radius;
        }
        if ((this.x + this.radius) < 0) {
            this.x = this.#canvas.width + this.radius;
        }
        if ((this.y - this.radius) > this.#canvas.height) {
            this.y = -this.radius;
        }
        if ((this.y + this.radius) < 0) {
            this.y = this.#canvas.height + this.radius;
        }
    }
}