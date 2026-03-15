class GameManager {
    constructor(factoryManager) {
        this.factoryManager = factoryManager;
    }
    start() {
        console.debug('start GameManager');
    }
    init() {
        console.debug('init GameManager');
    }
    update() {
    }

    initOnePlayer() {
        // On cherche l'image dans les resource deja charger
        let imgPlayer = ResourcesLoader.findImageByName('ship02');
        let pos = new Vec2D(0, 0);
        let size = new Vec2D(50, 50);
        let ship = this.factoryManager.factories[1]
            .createShip(imgPlayer, 'ship test', pos, size);
        let player = this.factoryManager.factories[0]
            .createPlayer(imgPlayer, 'Player 1', pos, size, ship);

        return player;
    }

    initOneSolarSystem() {
        // On cherche l'image dans les resource deja charger
        let imgFakeSun = ResourcesLoader.findImageByName('sunHalo');
        let systemSize = Service.MAP.getMapSize();
        let solarSytem = this.factoryManager.factories[2]
            .createSolarSystem(imgFakeSun,
                new Vec2D(systemSize / 2, systemSize / 2),
                new Vec2D(systemSize, systemSize),
                {
                    name: 'Sentory II',
                    type: 'Miniaire',
                    alSize: '1.15 al'
                });

        return solarSytem;
    }
}