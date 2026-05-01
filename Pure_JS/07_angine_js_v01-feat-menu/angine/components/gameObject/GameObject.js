class GameObject{
    constructor(pos,size) {
        this.transform = new Transform(pos,size);
        // Passage par valeur, cree un pointer. si je modifi this.pos alors this.transform.position et modifier aussi
        this.pos = this.transform.position;
        this.size = this.transform.size;
        
        this.components = [];
    }

     /**Point entre du gameObject */
     start(){ 
        if(this.components.length > 0){
            for (const component of this.components) {
                component.start();
            }
        }
    }
    /**Inisialisation */
    init(){
        if(this.components.length > 0){
            for (const component of this.components) {
                component.init();
            }
        }
    }
    /**Mise a jour des data */
    update(){
        if(this.components.length > 0){
            for (const component of this.components) {
                component.update();
            }
        }
    }

    setActiveCollider(isActive) {
        if (this.components.length > 0) {
            for (const component of this.components) {
                if (component instanceof Collider)
                    component.isActive = isActive;
            }
        }
    }
     /** Ajoute un composent au gameObject
     * @param {Component} compoToAdd compo a ajouter (PlayerRederer,PlayerUpdathor...) */
    addComponent(compoToAdd){
        if (compoToAdd instanceof Component) {
            //console.debug(compoToAdd.constructor.name, compoToAdd);
            this.components.push(compoToAdd);
        } 
    }
}