class ShipFactory extends Factory {
    constructor() {
        super();
    }
    /**Cree un nouveau ship
       * @param {HTMLImageElement} image du ship
       * @param {string} name nom du ship
       * @param {Vec2D} pos position 
       * @param {Vec2D} size taille de object
       * @returns une nouvelle instanse de Ship.js*/
    createShip(image, name, pos, size) {
        let go = new Ship(name, pos, size);
        go.addComponent(new ShipRenderer(go, image));

        this.listGO.push(go);

        return go;
    }

}
