class Gatling extends Arme{
    constructor(numBallChargeur,tpsRechargement, isDestructible) {
        super('gatling',isDestructible);
        this.numBallChargeur = numBallChargeur;
        this.tpsRechargement = tpsRechargement;
        //this.isDestructible = isDestructible;
    }
}