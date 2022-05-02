class DEBUG_Arme extends Arme{
    constructor(numBallChargeur,tpsRechargement, isDestructible) {
        super('debugArme',isDestructible);
        this.numBallChargeur = numBallChargeur;
        this.tpsRechargement = tpsRechargement;
    }
}