/** Component de base pour tous les future compo*/
class Component{
    /** 
     * @param {GameObject} go ref gameObject utilisent se compo*/
    constructor(go) {
        /**@type {GameObject} go*/ 
        this.go = go;

        //Active ou desactive le component
        //this.isActive = false;
    }
    /**Start le compo 
     * @info se lance avant init()
     */
    start(){ }
    /**Initialise le compo  */
    init(){ 
        //TODO: Comportement de Base 
        // On poura venir coller un comportement de base
        // pour tous nos compo si besion
    }
    /**Mise a jour du compo */
    update(){ }
}