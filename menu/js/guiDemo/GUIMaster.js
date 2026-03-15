class GUIMaster {
    constructor(position, size) {
        this.l_Home      = new L_Home(position, new Vec2D(400, 250));
        this.l_GUI       = new L_GUI(position, size);
        this.l_Inventory = new L_Inventory(position, size);
    }

    start() {
        this.l_GUI.start();
        this.l_Inventory.start();
        this.l_Home.start();
    }
    init() {
        this.l_GUI.init();
        this.l_Inventory.init();
        this.l_Home.init();
    }
    update() {
        this.l_GUI.update();
        this.l_Inventory.update();
        this.l_Home.update();
    }
    setActive(bool) {
        this.l_GUI.setActive(bool);
        this.l_Inventory.setActive(bool);
        this.l_Home.setActive(bool);
    }

    /** Switch entre les layers
     * @param {string} name 'inv' | 'home' | 'gui' */
    switchLayer(name) {
        switch (name) {
            case 'inv':
                this.l_GUI.setActive(false);
                this.l_Inventory.setActive(true);
                this.l_Home.setActive(false);
                break;
            case 'home':
                this.l_GUI.setActive(false);
                this.l_Inventory.setActive(false);
                this.l_Home.setActive(true);
                break;
            case 'gui':
                this.l_GUI.setActive(true);
                this.l_Inventory.setActive(false);
                this.l_Home.setActive(false);
                break;
            default:
                console.warn(`->${name}<- n'existe pas dans les layers crees`);
                break;
        }
    }
}
