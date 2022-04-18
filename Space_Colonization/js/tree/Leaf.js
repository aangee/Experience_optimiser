class Leaf{
    constructor() {
        //Attention a la max_dist si on nai trop haut en (h) par rapport au (tron) sa ne fonctionne pas
        let x = utils.randomRange(300,sizeCanvas.w-300);
        let y = utils.randomRange(100,sizeCanvas.h-100);
        this.pos = new Vec2D(x,y);
        this.reached = false;
    }


    show(ctx){
        ctx.beginPath();
        ctx.fillStyle = 'green';
        ctx.strokeStyle = 'cyan';
        ctx.lineWidth = 1;

        ctx.arc(this.pos.x, this.pos.y, 2, 0, Math.PI*2,false);

        ctx.fill();
        ctx.stroke();
        ctx.closePath();
    }
}