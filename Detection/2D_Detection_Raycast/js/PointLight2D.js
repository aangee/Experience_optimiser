class PointLight2D {
    constructor(pos, color) {
        this.pos = new Vec2D(pos.x, pos.y);
        this.color = color;
        // Liste de rayon de "lumiere"
        this.rays = [];

        // Creation de ray sur 360°
        for (let a = 0; a < 360; a += 1) {
            this.rays.push(new Ray(this.pos, this.angleToRad(a), this.color));
        }
    }
    /**
     * Permet de bouger la "lumiere"
     * @param {Number} x pos X
     * @param {Number} y pos Y
     */
    move(x, y) {
        this.pos.x = x;
        this.pos.y = y;
    }

    /** On check sur un mur
     * @param {Boundary} wall obstacle
     * @param {CanvasRenderingContext2D} ctx context pour dessine
     */
    rayCastHit(wall, ctx) {
        for (let ray of this.rays) {
            //check intersect
            let pt = ray.cast(wall);

            if (pt) {


                ctx.beginPath();
                //ctx.fillStyle = 'gold';
                ctx.strokeStyle = this.color;
                ctx.lineWidth = 20;

                ctx.moveTo(this.pos.x, this.pos.y);
                ctx.lineTo(this.pos.x, this.pos.y);
                ctx.lineTo(pt.x, pt.y);

                //ctx.fill();
                ctx.stroke();
                ctx.closePath();

            }
        }
    }

    /**
     * On check dans un tableau de mur
     * @param {Array} walls obstacles
     * @param {CanvasRenderingContext2D} ctx context pour dessine
     */
    rayCastAllHits(walls, ctx) {
        for (let ray of this.rays) {
            let closest = null;
            let record = Infinity;

            for (let wall of walls) {
                //check intersect
                const pt = ray.cast(wall);

                if (pt) {
                    //Calcule de la distance entre notre "lumiere" et le point de hit du ray
                    const d = this.pos.distTo(pt);
                    //On check si cette distence de hit et la plus courte 
                    //(Pour savoir si on touche le premiere mur ou ceux de derrier)
                    if (d < record) {
                        record = d;
                        closest = pt;
                    }
                }
                /*  if (pt && closest) {
                     ctx.beginPath();
                     ctx.lineWidth = .3;
                     //ctx.fillStyle = 'gold';
 
                     //ctx.moveTo(this.pos.x, this.pos.y);
                     ctx.strokeStyle = 'rgba(200,200,200,1)';//'gold';
                     ctx.moveTo(closest.x, closest.y);
                     ctx.lineTo(pt.x, pt.y);
 
                     //ctx.fill();
                     ctx.stroke();
                     ctx.closePath();
                 } */
            }

            //Quant on trouve le hit le plus coure on trace notre ray
            if (closest) {
                ctx.beginPath();
                ctx.lineWidth = .3;
                //ctx.fillStyle = 'gold';
                ctx.strokeStyle = this.color;// 'rgba(255,215,0,.1)';//'gold';

                ctx.moveTo(this.pos.x, this.pos.y);
                ctx.lineTo(this.pos.x, this.pos.y);
                ctx.lineTo(closest.x, closest.y);

                //ctx.fill();
                ctx.stroke();
                ctx.closePath();
            }
        }
    }

    /**Afficher la direction de ray juste pour le debug */
    show(ctx) {
        for (let i = 0; i < this.rays.length; i += 20) {
            const ray = this.rays[i];

            ray.show(ctx);
        }
    }


    angleToRad(angle) {
        return ((Math.PI / 180) * angle);
    }
}