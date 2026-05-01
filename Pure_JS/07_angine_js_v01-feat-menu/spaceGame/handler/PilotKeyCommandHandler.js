class PilotKeyCommandHandler extends KeyCommandHandler{
    constructor() {
        super();
        this.turnLeftKeyHelp = false;
        this.turnRightKeyHelp = false;
        this.moveForwardKeyHelp = false;
        this.moveBackwardKeyHelp = false;
        
        this.leftKey = 'q';
        this.rightKey = 'd';
        this.moveForwardKey = 'z';
        this.moveBackwardKey = 's';
        
        this.turnLeftCommand = new TurnLeftCommand(this);
        this.turnRightCommand = new TurnRightCommand(this);
        this.moveForwardCommand = new MoveForwardCommand(this);
        this.moveBackwardCommand = new MoveBackwardCommand(this);
        this.nullCommand = new NullKeyCommand(this);
        this.listenForKeyUp(true);
    }
    executeCommand(event, setTo){
        let command = this.nullCommand;
        switch (event.key) {
            case this.leftKey:
                command = this.turnLeftCommand;
                command.execute(setTo);
                break;
            case this.rightKey:
                command = this.turnRightCommand;
                command.execute(setTo);
                break;
            case this.moveForwardKey:
                command = this.moveForwardCommand;
                command.execute(setTo);
                break;
            case this.moveBackwardKey:
                command = this.moveBackwardCommand;
                command.execute(setTo);
                break;
            default:

                break;
        }
    }

}