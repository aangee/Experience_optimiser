/** Rendu d'un ship sur le canvas via CameraService */
 class ShipRenderer extends Renderer{
    constructor(go,image) {
        super(go,image);

        this.cnvService = Service.CAMERA;
        /*if(image) this.image = image;
        else console.warn(this.constructor.name,` ne trouve pas l'image. Via ShipRenederer`);*/
    }
    start(){ }
    init(){ 

    }
    update(){
        let trans = this.go.transform;
        // On dessin les propulseur
        if (this.go.thrusting) {
            let ctx = this.cnvService.ctx;
            ctx.save();
            ctx.translate(trans.position.x,trans.position.y);
            ctx.rotate(this.go.rotation);
            this.cnvService.drawCircle(3, 17, 2,'cyan');
            this.cnvService.drawCircle(-3, 17, 2, 'cyan');

            ctx.restore();
            
        }
        if (this.image) {
            this.cnvService.drawRotateImage(
                this.image,
                this.go.rotation,
                trans.position.x,trans.position.y,
                trans.size.x,trans.size.y);
        }

    }
}