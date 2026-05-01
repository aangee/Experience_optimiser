class AppKeyCommandHandler extends KeyCommandHandler{
    constructor() {
        super();
        this.infoKey = "e";
        this.mapKey = "a";
        this.actionKey = "f"
        this.infoKeyHelp = false;
        this.mapKeyHelp = false;
        this.actionKeyHelp = false;
        this.infoCommand = new InfoCommand(this);
        this.mapCommand = new MapCommand(this);
        this.actionCommand = new ActionCommand(this);

        this.nullCommand = new NullKeyCommand(this);
        this.listenForKeyUp(true);
    }
    executeCommand(event, setTo){
        let command = this.nullCommand;
        switch (event.key) {
            case this.infoKey:
                command = this.infoCommand;
                command.execute(setTo);
                break;
            case this.mapKey:
                command = this.mapCommand;
                command.execute(setTo);
                break;
            case this.actionKey:
                command = this.actionCommand;
                command.execute(setTo);
                break;
            default:

                break;
        }
    }
}