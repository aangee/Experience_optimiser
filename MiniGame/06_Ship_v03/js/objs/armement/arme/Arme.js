class Arme {
    constructor(type, isDestructible) {
        this.x = 0;
        this.y = 0;
        this.radiusSpottage = 300;
        this.speedRotation = .01;
        this.type = type;
        this.isDestructible = isDestructible;
        this.dbgColor;
    }


    lookAt(pos) {
        this.dbgColor = 'green';
        if (this.distanceTo(pos) >= this.radiusSpottage) return;
        // calcule de l'angle a donne a l'arme si on spot un enemy
        let tempAngle = utils.clamp(Math.atan2(pos.y - this.y, pos.x - this.x), -Math.PI, Math.PI);


        //On anime vite fait la rotation de la turret
        //FIXME: on anime que dans un seul de rotation 
        //MODIF: Avoir pour changer celont la cible
        if (this.angle > tempAngle) {
            this.angle += tempAngle * this.speedRotation;
            this.dbgColor = 'orange';
            //console.info('Ciblager OKI!!','Pret a faire feu!!!');
        } 
        else{
            this.angle = tempAngle;
            this.dbgColor = 'red';
            //console.info('Ciblager en cour...');
        }
    }

    distanceTo(p2) {
        var dx = p2.x - this.x,
            dy = p2.y - this.y;

        return Math.sqrt(dx * dx + dy * dy);
    }

}