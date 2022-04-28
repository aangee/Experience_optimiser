


class SystemSolar {
    constructor() {
        this.etoile = new Etoile(50, 0, 0, 0, 'red');
        this.etoile.spawnPlanets(7, 'lightblue');
    }

    draw(ctx) {
        this.etoile.orbit();
        this.etoile.draw(ctx);
    }
}