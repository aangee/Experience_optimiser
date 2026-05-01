class CameraService extends CnvService{
    
    constructor(){
        super('js-canvas-camera');

    }

    /** Permet de dessin une image avec rotation sur le canvas
     * @param {HTMLImageElement} image image a afficher
     * @param {Number} rotation angle de rotation en RAD en non en degre
     * @param {Number} xpos position de l'image en X
     * @param {Number} ypos position de l'image en Y
     * @param {Number} w taille de l'image en largeur
     * @param {Number} h taille de l'image en hauteur */
    drawRotateImage(image,rotation,xpos,ypos,w,h){
        if (image) {
            let ctx = this.ctx;
            ctx.save();//.translate().rotate().drawImage().restore();
            ctx.translate(xpos,ypos);
            ctx.rotate(rotation);
            ctx.drawImage(image,-(w/2),-(h/2),w,h);
            ctx.restore();
        }else{
            console.debug('CameraService na pas trouver image: ',image);
        }
    }
}