class NavBall{
    constructor() {
        /**@type {GameObject} */
        this.anchor = undefined;
        /**@type {GameObject} */
        this.target = undefined;
    }
    init(anchor){
        this.anchor = anchor;
    }

    setTarget(target){
        this.target = target;
    }

    update(){
        if (this.anchor && this.target) {
            //console.debug('update navball');
            let ctx = Service.CAMERA.ctx;
            let x = 0;
            let y = 0;
            let width = this.anchor.transform.size.x/2;
            let size = 50;//100
            let diff = 12.5;//25

            ctx.fillStyle = 'limegreen';
            ctx.save();
            ctx.translate(
                this.anchor.transform.position.x,// + this.anchor.w/2,
                this.anchor.transform.position.y// + this.anchor.h/2
            );
            
            ctx.rotate(Math.atan2(
                ((this.target.y * 2) + (Service.MAP.ctx.getTransform().f) + this.target.h / 2) - (this.anchor.transform.position.y + this.anchor.transform.size.x / 2),
                ((this.target.x * 2) + (Service.MAP.ctx.getTransform().e) + this.target.w / 2) - (this.anchor.transform.position.x + this.anchor.transform.size.y / 2)
            ));

            ctx.beginPath();
            ctx.moveTo(x+(width*2),y);
            ctx.lineTo(x+size,y);
            ctx.lineTo(x+size-diff,y-diff);
            ctx.arcTo(x+(width*2),y,x+size-diff,y+diff,15);
            ctx.closePath();
            
            ctx.fill();
            ctx.restore();
        }
    }
}