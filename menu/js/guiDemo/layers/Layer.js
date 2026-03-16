class Layer {
    constructor(name, position, size) {
        this.name      = name;
        this.transform = new Transform({ position, size });
        this.position  = this.transform.position;
        this.size      = this.transform.size;
        this.listUIElement = [];
    }

    start() {
        // Chaque layer concret crée ses propres panels dans son start()
        // Ne pas créer de panel de base ici (causerait des doublons)
    }
    init()   {}
    update() {}

    setActive(bool) {
        this.listUIElement.forEach(el => el.setActive(bool));
    }
}
