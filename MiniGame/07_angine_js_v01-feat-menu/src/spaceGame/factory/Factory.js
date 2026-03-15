class Factory {
    constructor() {
        this.listGO = [];
    }
    // Initialisation
    // on lance les methode start et init sur tous les gameObject
    start() {
        for (let i = 0; i < this.listGO.length; i++) {
            const go = this.listGO[i];
            go.start();
        }
    }
    // Initialisation
    // on lance les methode start et init sur tous les gameObject
    init() {
        for (let i = 0; i < this.listGO.length; i++) {
            const go = this.listGO[i];
            go.init();
        }
    }
    // Update 
    // on lance la methode update sur tous les gameObject
    update() {
        for (let i = 0; i < this.listGO.length; i++) {
            const go = this.listGO[i];
            go.update();
        }
    }
}