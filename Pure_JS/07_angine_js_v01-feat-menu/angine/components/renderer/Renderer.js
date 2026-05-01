class Renderer extends Component{
    constructor(go,image) {
        super(go);
        if(image) this.image = image;
        else console.warn(`Renderer ne trouve pas l'image`);
        /**@type {CnvService} */
        this.cnvService = null;// CnvService.DEFAULT;
    
    }
    start(){ super.start(); }
    init(){ super.init(); }
    update(){
        super.update();
        if (this.image) {
            this.cnvService.drawRotateImage(
                this.image,
                this.rotation,
                this.go.x,this.go.y,
                this.go.w,this.go.h);//Pour diminier la taille de image de base

        }
    }
}