class HitService extends CnvService {
    constructor(){
        super('js-canvas-hit');

    }

    /** Permet de dessin la zone de detection de collision
     * @param {Number} xpos positon de la zone en X
     * @param {Number} ypos position de la zone en Y
     * @param {Number} radius rayon de la zone
     * @param {string} color couleur de la zone
     */
    drawHitZoneCircle(xpos,ypos,radius,color){
        let ctx = this.ctx;
        ctx.fillStyle = color;
        ctx.beginPath();
        ctx.arc(xpos,ypos,radius,0,Math.PI*2);
        ctx.fill();
        ctx.closePath();
    }
}