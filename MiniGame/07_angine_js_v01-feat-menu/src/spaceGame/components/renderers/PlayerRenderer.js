//console.log("PlayerRenderer");
/** Rendu d'un player sur le canvas via CameraService */
class PlayerRenderer extends Renderer{
    constructor(go,image) {
        super(go,image);
        this.cnvService = Service.CAMERA;
        /*if(image) this.image = image;
        else console.warn(`PlayerRenederer ne trouve pas l'image`);*/
    }
    start(){ }
    init(){ }
    update(){

        let trans = this.go.transform;
        /*if (this.image) {
            this.cnvService.drawRotateImage(
                this.image,
                this.go.rotation,
                trans.position.x,trans.position.y,
                trans.size.x,trans.size.y);
        }*/
    }
}