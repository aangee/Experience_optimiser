
class PlayerShap {
    constructor(x, y, radius, color = 'rgba(200,200,0,.9)') {
        this.x = x;
        this.y = y;
        this.radius = radius;
        this.color = color;
    }

    /**
     * 
     * @param {CanvasRenderingContext2D} ctx 
     */
    draw(ctx) {

        ctx.save();

        ctx.translate(this.x, this.y);
        ctx.beginPath();
        ctx.fillStyle = this.color; 'rgba(200,200,0,.9)';
        ctx.strokeStyle = 'rgba(255,200,0,.8)';
        ctx.arc(0, 0, this.radius, 0, Math.PI * 2, false);
        ctx.fill();
        ctx.stroke();
        ctx.closePath();

        ctx.beginPath();
        ctx.font = "10px monospace"
        ctx.shadowBlur = 0;
        ctx.shadowColor = "rgba(255, 255, 255, .1)";
        ctx.shadowOffsetX = 1.5;
        ctx.shadowOffsetY = 2;
        ctx.fillStyle = 'rgba(0,255,0,1)';
        //this.ctx.strokeStyle = 'rgba(200,20,80,1)';
        //this.ctx.fillText(Math.round(this.variable.txt),this.x+5,this.y+10,this.w)  


        ctx.fillText('Player', -15, -12, 50);

        ctx.fill();
        //this.ctx.stroke();
        ctx.closePath();


        ctx.restore();

        // Pour afficher les bord de notre world
        let offsetXY = 5;
        let cw = ((width-offsetXY) * .5);
        let ch = ((height-offsetXY) * .5);
        let cx = (this.x - cw);
        let cy = (this.y - ch);
        ctx.beginPath();
        //ctx.fillStyle = 'rgba(0,255,0,1)';
        ctx.lineWidth = 2;
        ctx.lineJoin = "round";//butt|round|square 

        ctx.strokeStyle = 'rgba(0,200,100,.8)';
        ctx.rect(cx, cy, width-offsetXY, height-offsetXY);
        //ctx.fill();
        ctx.stroke();
        ctx.closePath();
    }
}