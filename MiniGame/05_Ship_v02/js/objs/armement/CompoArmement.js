/** class utils pour cree des armement de type differant
 */
class CompoArmement{
    /** Cree une composition arme du meme type
     * @param {String} type Nom de la class de l'arme
     * @param {Number} quantity Numbre arme a cree
     * @param {Boolean} isDestructible Si elle peux etre detruite
     */
    constructor(type,quantity,isDestructible) {
        this.quantity = quantity;
        this.type = type;
        this.isDestructible = isDestructible;
    }
}