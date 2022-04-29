class Branch {
    constructor(parent, pos, dir) {
        /**@type {Vec2D} */
        this.pos = pos;
        /**@type {Branch} */
        this.parent = parent;
        /**@type {Vec2D} */
        this.dir = dir;

        /**@type {Vec2D} */
        this.origDir = this.dir.copy();
        this.count = 0;

        this.len = 5;
    }

    reset() {
        this.dir = this.origDir.copy();
        this.count = 0;
    }
    next() {

        /*let nextDir = this.dir.multiply(this.len);
       let nextPos = this.pos.add(nextDir); */
        let nextPos = this.pos.add(this.dir);
        let nextBranch = new Branch(this, nextPos, this.dir.copy());
        return nextBranch;
    }
    show(ctx) {
        if (this.parent != null) {
            ctx.beginPath();
            //ctx.fillStyle = 'gold';
            ctx.strokeStyle = 'gold';
            ctx.lineWidth = 1;

            ctx.moveTo(this.pos.x, this.pos.y);
            ctx.lineTo(this.pos.x, this.pos.y);
            ctx.lineTo(this.parent.pos.x, this.parent.pos.y);

            //ctx.fill();
            ctx.stroke();
            ctx.closePath();
        }

    }
}