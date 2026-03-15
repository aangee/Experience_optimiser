class KeyCommand{
    constructor() { }
    execute(setTo){ }
}

class NullKeyCommand extends KeyCommand{
    constructor(handler) {
        super();
        this.handler = handler;
    }
    execute(setTo){
        console.debug('Key command non implementer');
        this.handler.nullKeyHelp = setTo;
    }
}
class TurnLeftCommand extends KeyCommand{
    constructor(handler) {
        super();
        this.handler = handler;
    }
    execute(setTo){
        this.handler.turnLeftKeyHelp = setTo;
    }
}
class TurnRightCommand extends KeyCommand{
    constructor(handler) {
        super();
        this.handler = handler;
    }
    execute(setTo){
        this.handler.turnRightKeyHelp = setTo;
    }
}
class MoveForwardCommand extends KeyCommand{
    constructor(handler) {
        super();
        this.handler = handler;
    }
    execute(setTo){
        this.handler.moveForwardKeyHelp = setTo;
    }
}
class MoveBackwardCommand extends KeyCommand{
    constructor(handler) {
        super();
        this.handler = handler;
    }
    execute(setTo){
        this.handler.moveBackwardKeyHelp = setTo;
    }
}
class InfoCommand extends KeyCommand {
    constructor(handler) {
        super();
        this.handler = handler;
    }
    execute(setTo) {
        this.handler.infoKeyHelp = setTo;
    }
}
class MapCommand extends KeyCommand {
    constructor(handler) {
        super();
        this.handler = handler;
    }
    execute(setTo){
        this.handler.mapKeyHelp = setTo;
    }
}
class ActionCommand extends KeyCommand {
    constructor(handler) {
        super();
        this.handler = handler;
    }
    execute(setTo) {
        this.handler.actionKeyHelp = setTo;
    }
}