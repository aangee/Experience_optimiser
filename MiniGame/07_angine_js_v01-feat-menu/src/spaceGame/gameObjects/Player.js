class Player extends GameObject{
    constructor(name,pos,size) {
        super(pos,size);
        this.name = name;
        this.rotation = 0;
        /**@type {Ship} */
        this.ship;// <-- Et ajoute par la factory au moment de la creation du player
        
        this.keyHandler = new PilotKeyCommandHandler();
    }
    start(){ }
    init(){
        this.keyHandler.init();
    }
    update(){
        //super.update(); 
        //Mise a jour du controle du ship par keyHandler
        this.ship.thrusting = this.keyHandler.moveForwardKeyHelp;
        this.ship.thrustingBack = this.keyHandler.moveBackwardKeyHelp;
        this.ship.turningLeft = this.keyHandler.turnLeftKeyHelp;
        this.ship.turningRight = this.keyHandler.turnRightKeyHelp;
    }
}