class SolarSystem extends GameObject{
    constructor(pos,size,params) {
        super(pos,size);
        // Info sur le system
        let {name,type,alSize} = params;
        this.name = name;
        this.type = type;
        this.alSize = alSize;

        this.rotation = {
            current:0,
            speed:0
        };
        /**@param nbsAstre nombre de planets dans le system */
        this.nbsAstre = 0;
        this.listAstre = [];
        /**@type {Planet} */
        this.currentSeletedPlanet = null;
        this.indexSeletedPlanet = 0;

    }

    start(){}
    init(){
        //Juste pour les mettre sur leur orbite au debut
        this.orbiteAllPlanets();
        //On force initialise de la seletion pour eviter des bug 
        //FIXME: voir au niveau de affichage de la navBall, il faudrai attendre que la planet exite
        this.selectedPlanet(0);
    }
    update(){
        super.update();
        //NOTE: si on active l'orbite pour les planet il fo infomer la navBall que la planet bouge
        // mis a jour des rotation
        // par rapport au centre du system
        //this.orbiteAllPlanets();
    }
    /** Selection une planet dans se system
     * Ajoute un carre autoure de la planet
     * @param {Num} ii index de la planet a selectionne*/
    selectedPlanet(ii){
        //if(i >= 0) this.listAstre[i].isSelected = true;
        for (let i = 0; i < this.listAstre.length; i++) {
            /**@type {Planet} */
            const planet = this.listAstre[i];

            planet.isSelected = false; 
            //Desactive les colliiders
            planet.setActiveCollider(false);

            if (i === ii) {
                planet.isSelected = true;
                //Active les colliiders
                planet.setActiveCollider(true);

                //On set la current planet
                this.currentSeletedPlanet = planet;
            }
        }
    }
    /**Ajoute une planet a la list du solarSystem
     * @param {Planet} planet a ajouter au system*/
    addPlanet(planet){
        this.listAstre.push(planet);
        this.nbsAstre++;
        //console.debug(this.nbsAstre,this.listAstre.length);
    }
    /**Active la rotation orbitale de toutes les planets du systeme via son centre*/
    orbiteAllPlanets(){
        for (let i = 0; i < this.listAstre.length; i++) {
            const planet = this.listAstre[i];
            planet.orbitTo(this.transform.position.x,this.transform.position.y);
        }
    }
}