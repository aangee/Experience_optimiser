class PlanetRender extends Renderer{
    constructor(go,image) {
        super(go,image);
        /**@type {MapService} */
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
                    trans.size.x,trans.size.y);
        }
        // si la planet et selectionner par le player
        if(this.go.isSelected) this.drawSelected();
        
    }
    drawSelected(){
        // Destructuration du gameObject(Planet)
        let {moons,name} = this.go;
        let {x,y} = this.go.transform.position;
        let {x:w,y:h} = this.go.transform.size;
        
        //Dessine un carre de selection
        this.cnvService.drawRecStroke(x,y,w,h,true);   
 
        //Dessin de l'orbit
        if(moons.length > 0){ 
            for (let i = 0; i < moons.length; i++) {
                const moon = moons[i];
              
                this.cnvService.drawStrokeCircle(x,y,moon.orbite.dist,1);   
                //dessin un carre autour de la lune
                //MapService.drawRecStroke(moon.x,moon.y,moon.w,moon.h,true); 
            }
        }
        //Text info planet affiche juste le nom et la position de la planet
        /*let offsetX = 20;
        let offsetY = -20;
        if(moons.length > 0) offsetX *= moons[moons.length-1].orbite.dist*.05;
        //console.log(moons);
        
        this.cnvService.drawMsgBox(
            x+offsetX,y + offsetY - 10,
            70,25,
            'lime',
            `${name}`,
            `${x.toFixed(0)} X|Y ${y.toFixed(0)}` );*/
    }
}