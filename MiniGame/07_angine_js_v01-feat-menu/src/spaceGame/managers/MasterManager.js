class MasterManager {
    constructor() {
        // ici on gerera tout les managers
        this.factoryManager = new FactoryManager();
        this.factoryManager.addFactory(new PlayerFactory());
        this.factoryManager.addFactory(new ShipFactory());
        this.factoryManager.addFactory(new SolarSystemFactory());

        this.gameManager = new GameManager(this.factoryManager);

    }
    start() {
        this.gameManager.start();
        this.factoryManager.start(); 
    }
    init() {
        this.gameManager.init();
        this.factoryManager.init();
    }
    update() {
        this.gameManager.update();
        this.factoryManager.update();
    }
}