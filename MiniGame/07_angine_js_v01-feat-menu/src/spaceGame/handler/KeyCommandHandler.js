class KeyCommandHandler{
    constructor(params) {
        this.command = new NullKeyCommand();
        this.listenForKeyDownPress = true;
        this.listenForKeyUpPress = true;
    }

    init(){
        window.addEventListener("keydown",(event)=>{
            //console.debug(event.keyCode);
            if (this.listenForKeyDownPress) {
                this.executeCommand(event,true);
            }
        });
        window.addEventListener("keyup",(event)=>{
            if (this.listenForKeyUpPress) {
                this.executeCommand(event,false);
            }
        });
    }

    listenForKeyDown(toggle){
        this.listenForKeyDownPress = toggle;
    }
    listenForKeyUp(toggle){
        this.listenForKeyUpPress = toggle;
    }

    executeCommand(event,setTo){ }
}