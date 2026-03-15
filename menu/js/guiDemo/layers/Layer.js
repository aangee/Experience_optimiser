class Layer {
    constructor(name, position, size) {
        this.name      = name;
        this.transform = new Transform({ position, size });
        this.position  = this.transform.position;
        this.size      = this.transform.size;
        this.listUIElement = [];
    }

    start() {
        this.panel = MasterHandler.PANEL.createPanel({
            transform: { position: this.position, size: this.size },
            params: {
                optsBorder: { isActive: true, isRounded: true, radius: 9, lineWidth: 3 }
            }
        });
        this.listUIElement.push(this.panel);
    }
    init()   {}
    update() {}

    setActive(bool) {
        this.listUIElement.forEach(el => el.setActive(bool));
    }
}
