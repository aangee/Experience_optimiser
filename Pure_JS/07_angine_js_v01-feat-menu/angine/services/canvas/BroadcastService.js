/** Se services permet de dessine du text, et afficher des information pour le player */
class BroadcastService extends CnvService {
    constructor(){
        super('js-canvas-broadcast');
    }

    /** Affiche un message en bas a gauche de la fenetre
     * @param {string} msg message a affiche
     * @param {Number} offsetY decalage du text en Y
     * @param {string} color couleur du text */
    showMsgButtomLeft(msg, offsetY, color) {
        let cnv = this.cnv;
        let ctx = this.ctx;
        let baseOffsetY = 10;
        ctx.font = '12px Courier';
        ctx.fillStyle = color;
        ctx.fillText(msg, 10, (this.cnv.height - baseOffsetY) - offsetY);
        ctx.fill();
    }

    /** Affiche un message en bas a droite de la fenetre
     * @param {string} msg message a affiche
     * @param {Number} offsetY decalage du text en Y
     * @param {Number} offsetX decalage du text en X
     * @param {string} color couleur du text */
    showMsgButtomRight(msg,offsetY,offsetX,color){
        let cnv = this.cnv;
        let ctx = this.ctx;
        let baseOffsetY = 10;
        ctx.font = '14px Courier';
        ctx.fillStyle = color;
        ctx.fillText(msg,(cnv.width-offsetX),(cnv.height - baseOffsetY)-offsetY);
        ctx.fill();
    }

    /**Affiche du text multi ligne en top gauche de la fenetre
     * @param {string} msg message a afficher 
     * @param {Number} x pos en X
     * @param {Number} y pos en Y
     * @param {Number} lineHeight hauteur de ligne
     * @param {Number} maxWidth longeur max d'une line NON IMPLEMENTER
     * @example msg = 'line 1\nline 2\nthird line..'*/
    showMsgTopMulti(msg,color,lineHeight,maxWidth){
        let ctx = this.ctx;
        ctx.font = '18px Courier';
        ctx.fillStyle = color;
        let x = 10;
        let y = 15;
        lineHeight = lineHeight || 10;
        let lines = msg.split('\n');

        for (let i = 0; i<lines.length; i++){
            ctx.fillText(lines[i], x, y + (i*lineHeight) );
        }
    }

    /** NON IMPLEMENTER
     * Ici on test le multi lignes 
     * il va faloir calculer la taille du text
     * cree un tableau qui representent nos lignes
     * verifer se que sort ctx.measureText(text) avent
     * EX: ['ligne 1','ligne 2','ligne 3','ect'] 
     * et sais se tableau que l'on boucle dessu pour afficher avec fillText 
     * @param {*} text 
     * @param {*} x 
     * @param {*} y 
     * @param {*} lineHeight 
     * @param {*} fitWidth */
    printAt(text, x, y, lineHeight, fitWidth) {
        let ctx = BroadcastService.Ctx;
        fitWidth = fitWidth || 0;
    
        if (fitWidth <= 0) {
            ctx.fillText(text, x, y);
            return;
        }
    
        for (let idx = 1; idx <= text.length; idx++) {
            let str = text.substr(0, idx);
            
            console.log(str, ctx.measureText(str).width, fitWidth);
            
            if (ctx.measureText(str).width > fitWidth) {
                ctx.fillText(text.substr(0, idx - 1), x, y);
                BroadcastService.printAt(text.substr(idx - 1), x, y + lineHeight, lineHeight, fitWidth);
                return;
            }
        }
        ctx.fillText(text, x, y);
    }
}