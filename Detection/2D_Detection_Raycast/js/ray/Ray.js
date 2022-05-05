class Ray {
    constructor(pos, angle, color) {
        this.pos = pos;
        this.dir = new Vec2D(0, 1);
        this.color = color;
        this.dir.setAngle(angle);
    }

    lookAt(x, y) {
        this.dir.x = x - this.pos.x;
        this.dir.y = y - this.pos.y;

        //TODO Ajoute le normalisation au vector de dir
        this.dir = this.dir.normalize();
    }

    /**Afficher la direction de ray juste pour le debug */
    show(ctx) {

        ctx.save()
        ctx.translate(this.pos.x, this.pos.y);

        ctx.beginPath();
        ctx.lineWidth = 1;
        //ctx.fillStyle = 'gold';
        ctx.strokeStyle = 'red';// 'rgba(255,155,0,.5)';

        ctx.moveTo(0, 0);
        ctx.lineTo(0, 0);
        ctx.lineTo(this.dir.x * 10, this.dir.y * 10);

        //ctx.fill();
        ctx.stroke();
        ctx.closePath();

        ctx.restore();
    }

    cast(wall) {
        const x1 = wall.a.x;
        const y1 = wall.a.y;
        const x2 = wall.b.x;
        const y2 = wall.b.y;

        const x3 = this.pos.x;
        const y3 = this.pos.y;
        const x4 = this.pos.x + this.dir.x;
        const y4 = this.pos.y + this.dir.y;

        //Denominateur
        const den = (x1 - x2) * (y3 - y4) - (y1 - y2) * (x3 - x4);

        if (den == 0) {
            //console.log('Denominateur egale zero');
            return;
        }

        const t = ((x1 - x3) * (y3 - y4) - (y1 - y3) * (x3 - x4)) / den;
        const u = -((x1 - x2) * (y1 - y3) - (y1 - y2) * (x1 - x3)) / den;

        if (t > 0 && t < 1 && u > 0) {

            const ptHit = new Vec2D(0, 0);

            ptHit.x = x1 + t * (x2 - x1);
            ptHit.y = y1 + t * (y2 - y1);

            return ptHit;
        } else {
            return;
        }


    }
}