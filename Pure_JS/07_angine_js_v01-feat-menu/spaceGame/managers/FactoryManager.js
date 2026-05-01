/** Manager pour gere toute nos fabrique a gameObject */
class FactoryManager {
    constructor() {
        this.factories = [];
    }

    addFactory(factory) {
        this.factories.push(factory);
    }

    // on lance les methode start sur tous les factory
    start() {
        for (let f = 0; f < this.factories.length; f++) {
            const factory = this.factories[f];
            factory.start();
        }
    }
    // Initialisation
    // on lance les methode init sur tous les factory
    init() {
        for (let f = 0; f < this.factories.length; f++) {
            const factory = this.factories[f];
            factory.init();
        }
    }
    // Update
    // on lance la methode update sur tous les factory
    update() {
        for (let f = 0; f < this.factories.length; f++) {
            const factory = this.factories[f];
            factory.update();
        }
    }
}