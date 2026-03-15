class Planet extends GameObject{
    constructor(pos,size,params) {
        super(pos,size);

        const {rotation={},orbite={}} = params;
        const {current:currentRot,speed:speedRot} = rotation;
        const {current:currentOrb,speed:speedOrb,dist} = orbite;

        this.name = params.name;
        this.gravity = params.gravity;
        this.rotation = {
            current:currentRot,
            speed:speedRot
        };
        this.orbite = {
            current: currentOrb,
            dist: dist,
            speed: speedOrb//POUR LES TEST
        }


        this.moons = [];

        this.isSelected = false;

        this.landRequest = false;
    }
    start(){ }
    init(){ }
    update(){
        super.update();
        
        //On ajoute orbite pour les lune de la planet si il y a une lune
        if(this.moons.length>0){ 
            this.orbiteAllMoons();
        }

        // Ajoute une Orbite circulaire
        this.orbite.current += this.orbite.speed;

        // Ajoute une rotation sur elle meme
        this.rotation.current += this.rotation.speed;
    }
    
    /** Ajoute une lune"Planet" a cette planet
     * @param {Planet} moon lune a ajoute
     */
    addMoon(moon){
        this.moons.push(moon);
    }
    orbiteAllMoons(){
        for (let i = 0; i < this.moons.length; i++) {
            const moon = this.moons[i];
            moon.orbitTo(this.transform.position.x,this.transform.position.y);
        }
    }
    orbitTo(x,y){

        let dist = this.orbite.dist;
        this.transform.position.x = x + dist*Math.cos(this.orbite.current);
        this.transform.position.y = y + dist*Math.sin(this.orbite.current);
    }
}