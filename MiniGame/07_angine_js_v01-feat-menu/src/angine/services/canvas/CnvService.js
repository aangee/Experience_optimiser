/** Class de base pour les canvasService cree et a cree */
class CnvService {
    constructor(idCanvas){
        /**@type {HTMLCanvasElement} */
        this.cnv = document.getElementById(idCanvas);
        if (idCanvas === "js-canvas-hit") {

            /**@type {CanvasRenderingContext2D} */
            this.ctx = this.cnv.getContext('2d', { willReadFrequently: true });
        } else {

            /**@type {CanvasRenderingContext2D} */
            this.ctx = this.cnv.getContext('2d');
        }
    }
    
    /** Permet de regler la taille du canvas(resolution en pixel)
     * @param {Number} size Taille du canvas en pixel */
    setSize(size){
        this.cnv.width = size;
        this.cnv.height = size;
    }
    /** Retourne la taille de la map utilser pour calculer les positions des elements(planete, position du player dans la map)
     * @returns {number} Taille de la map*/
    getMapSize(){
        return 2000;
    }
    /** Efface le canvas selon sa taille ou bien celle de la map
     * @param {Number} useSizeMap Taille a utiliser  */
    clearCanvas(useSizeMap) {
        let cnv = this.cnv;
        let ctx = this.ctx;
        let size = this.getMapSize();
        if (!useSizeMap) ctx.clearRect(0, 0, cnv.width, cnv.height);
        else ctx.clearRect(0, 0, size, size);
    }

    /** Permet de dessiner un rectangle de la taille de la map ( pour cree un fake background)
     * @param {string} color Couleur du remplissage */
    backgroundCanvas(color) {
        let ctx = this.ctx;
        let size = this.getMapSize();
        ctx.fillStyle = color;
        ctx.fillRect(0,0,size,size);
    }


    drawMsgBox(xpos,ypos,w,h,fontColor,...msg){
        let ctx = this.ctx;
        let lineWidth = 1;
        let lineHeight = 10;
        let fontSize = 9;

        ctx.lineWidth = lineWidth;
        ctx.strokeStyle = 'red';
        ctx.strokeRect(xpos-5,ypos-10,w,h);
        ctx.stroke();


        ctx.font = `${fontSize}px Courier`;
        ctx.fillStyle = fontColor;

        let hline = 0;
        for (const m of msg) {
            ctx.fillText(m,xpos,ypos+hline);

            hline += lineHeight;
        }

    }

    //#region SHAPES DRAWING METHODS (drawLine, drawRect, drawCircle, drawArc, drawPolygon, drawText)

    /** Permet de dessiner les bord d'un rectangle centrer ou non sur le canvas
     * @param {Number} xpos pos x du rectangle
     * @param {Number} ypos pos y du rectangle
     * @param {Number} w largeur du rectangle   
     * @param {Number} h hauteur du rectangle 
     * @param {boolean} isCenter si true, le rectangle sera centré sur le canvas */
    drawRecStroke(xpos, ypos, w, h, isCenter = false) {

        let ctx = this.ctx;
        ctx.strokeStyle = 'gold';
        if (isCenter) {
            ctx.save();
            ctx.translate(xpos, ypos);
            ctx.strokeRect(-(w / 2), -(h / 2), w, h);
            ctx.restore();
        } else {
            ctx.strokeRect(xpos, ypos, w, h);
        }
    }
    /** Permet de dessiner un cercle plain
     * @param {Number} xpos pos x du cercle
     * @param {Number} ypos pos y du cercle
     * @param {Number} radius rayon du cercle
     * @param {string} color couleur de remplissage du cercle */
    drawCircle(xpos,ypos,radius,color){
        let ctx = this.ctx;
        ctx.fillStyle = color;
        ctx.beginPath();
        ctx.arc(xpos,ypos,radius,0,Math.PI*2);
        ctx.fill();
        ctx.closePath();
    }
    /** Permet de dessiner les bord d'un cercle
     * @param {Number} xpos pos x du cercle
     * @param {Number} ypos pos y du cercle
     * @param {Number} radius rayon du cercle
     * @param {Number} lineWidth epaisseur du trait */
    drawStrokeCircle(xpos,ypos,radius,lineWidth){
        let ctx = this.ctx;
        
        ctx.beginPath();
        ctx.lineWidth = lineWidth;
        ctx.strokeStyle = 'gold';
        ctx.arc(xpos, ypos, radius, 0, Math.PI * 2);
        ctx.stroke();
        ctx.closePath();
    }
    //#endregion
}