/** Cree un systeme armement (Turret, MachinGun, Gatling)
 */
class Armement {
    constructor(...armes) {
        this.armes = this.setupCompo(armes);



        
    }
    setupCompo(armes) {

        let tempCompoArmes = [];
        for (let i = 0; i < armes.length; i++) {
            const arme = armes[i];
            //if (arme.quantity) {
            for (let i = 0; i < arme.quantity; i++) {

                let tempArme = this.selecteTypeSwitch(arme.type, arme);
                //console.log(tempArme.type);
                tempCompoArmes.push(tempArme);
            }
            //}

        }
        return tempCompoArmes;
    }

    selecteTypeSwitch(nameType, arme) {
        switch (nameType) {
            case 'turret':
                return new Turret(10, 1000, arme.isDestructible);

            case 'machineGun':
                return new MachineGun(200, 12000, arme.isDestructible);

            case 'gatling':
                return new Gatling(1000, 3000, arme.isDestructible);

            case 'debugArme':
                return new DEBUG_Arme(Infinity, Infinity, arme.isDestructible);

            default:
                break;
        }
    }

}