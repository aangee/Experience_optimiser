class PlayerFactory extends Factory {
    constructor() {
        super();
    }
    /**Cree un nouveau player
   * @param {HTMLImageElement} image du player
   * @param {string} name nom player
   * @param {Vec2D} pos position 
   * @param {Vec2D} size taille de object
   * @returns une nouvelle instanse de Player.js*/
    createPlayer(image, name, pos, size, ship) {
        let go = new Player(name, pos, size);
        go.addComponent(new PlayerRenderer(go, image));
        // Ship
        go.ship = ship;
        this.listGO.push(go);

        return go;
    }
}