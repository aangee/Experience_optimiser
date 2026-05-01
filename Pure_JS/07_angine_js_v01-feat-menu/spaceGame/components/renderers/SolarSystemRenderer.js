class SolarSystemRenderer extends Renderer{
    constructor(go,image) {
        super(go,image);
        /**@type {MapServiceV2} */
        this.cnvService = Service.MAP;
        //this.image = image;
    
    }
    start(){ }
    init(){ }
    update() {
        if (this.image) {
            let trans = this.go.transform;
                this.cnvService.drawRotateImage(
                    this.image,
                    this.go.rotation.current,
                    trans.position.x,trans.position.y,
                    trans.size.x*.1,trans.size.y*.1);

                //MapService.drawStrokeCircle(this.go.x,this.go.y,10,2);
        }
    }
}