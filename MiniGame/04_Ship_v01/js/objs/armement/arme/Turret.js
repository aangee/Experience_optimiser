class Turret{
    constructor(numBallChargeur,tpsRechargement, isDestructible) {
        this.angle = 0;
        this.numBallChargeur = numBallChargeur;
        this.tpsRechargement = tpsRechargement;
        this.isDestructible = isDestructible;
        this.angle = 0;
    }

    targetCible(angle){
        this.angle += angle;
    }
}