class MachineGun extends Arme{
    constructor(numBallChargeur,tpsRechargement, isDestructible) {
        super('machineGun',isDestructible);
        this.numBallChargeur = numBallChargeur;
        this.tpsRechargement = tpsRechargement;
        this.isDestructible = isDestructible;
    }
}