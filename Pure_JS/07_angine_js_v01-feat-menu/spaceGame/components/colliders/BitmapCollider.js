class BitmapCollider extends Collider{
    constructor(go, uColor) {
        super(go); 
        /**Couleur de la zone de detection */
        this.uColor = uColor;//TODO: Trouver un moyen de donner une couleur et etre sur quelle nai pas deja utiliser

        /*Il nous faut une position en avent du ship
        //une ref du canvasHit 
        //il fau redessine des shap simple sur le canvasHit pour tous gameObject(Planet, lune, aseroide, ect...)
        //on detecte si a la position du ship dans le canvasHit si la valeur et different de rgba(0,0,0,0)
        //si elle different sais que l'on touche un truc */
    }

    start(){ super.start(); }
    init() { super.init(); }

    update() { 
        if (this.isActive) {
            //On dessine la zone de detection
            this.drawHitZone();
            //On detecte si le ship touche la couleur de la zone de detection
            this.checkCollision();
        }

        if (this.isColliding) {

            console.debug("Collision en cours");
        }

    }

    /** Redessine des shap simple sur le canvasHit  */
    drawHitZone() {
        let { x, y } = this.pos;
        let radius = 180;
        this.cnvService.drawHitZoneCircle(x, y, radius, this.uColor);
        Service.MAP.drawCircle(x, y, radius, 'rgba(200,0,0,.1)');
    }

    onCollisionEnter() {
        console.log('collisionEnter:', this.go.name);
    }
    onCollisionExit() {
        console.log('collisionExit:', this.go.name);

    }

    checkCollision() {

        let shipPos = app.player.pos;
        let data = Service.HIT.ctx.getImageData(shipPos.x, shipPos.y, 1, 1);
        let [r, g, b, a] = data.data;
        let strRGB = `rgb(${r},${g},${b})`;
        //console.debug(strRGB);
        //console.debug(this.uColor);
       // if (a > 0) console.debug("Data Color: ", r, g, b, a);
        if (r > 0 || g > 0 || b > 0) {
            if (this.uColor) {
                if (strRGB === this.uColor) {
                    if (!this.isColliding) {
                        this.isColliding = true;
                        this.onCollisionEnter();
                    }
                }
            }
        }
        else {
            if (this.isColliding) {
                this.isColliding = false;
                this.onCollisionExit();
            }
        }
    }
}