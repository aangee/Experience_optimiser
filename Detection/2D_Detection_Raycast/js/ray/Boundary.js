class Boundary{
    constructor(x1, y1, x2, y2) {
        this.a = new Vec2D(x1,y1);
        this.b = new Vec2D(x2,y2);
    }

    show(ctx){
        ctx.beginPath();
        ctx.lineWidth = 1;
        //ctx.fillStyle = 'red';
        ctx.strokeStyle = 'red';
        
        ctx.moveTo(this.a.x,this.a.y);
        ctx.lineTo(this.a.x,this.a.y);
        ctx.lineTo(this.b.x,this.b.y);
        //ctx.fill();
        ctx.stroke();
        ctx.closePath();
    }
}