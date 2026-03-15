//console.log("app : app");
let planetTest;
let solarSystemTest;
let playerTest;

console.log("Athena Loader script");
let timerRequestTest;
class Athena {
    constructor(version) {
        console.log("Athena constructor");

        this.version = version;
        this.devBricoder = 'aangee';

        /* ------ ZONE DE TEST ------ */
        /**@type {MasterManager} Permet la gestion de tous les manager */
        this.masterManager = new MasterManager();

        /**@type {GameManager} Prepare et cree les objects */
        this.gameManager = this.masterManager.gameManager;

        /**@type {AppKeyCommandHandler} Gestion des event's Keyboard*/
        this.keyHandler = new AppKeyCommandHandler();

        /**@type {NavBall} Affiche du boussole pour informe le player de la position de la planet*/
        this.navBall = new NavBall();

        /**@type {SolarSystem} un solarSystem represente(le soleil, les planets, les lune)*/
        this.solarSystem = null;

        /**@type {Player} le joueur represent( le player, le ship)*/
        this.player = null;

        this.timerCurrent = Number;
        this.statesRequest = {
            demande:0,
            noValide:1,
            valide:2,
            current:-1
        };

    }

    init() {
        // On start le masterManager pour start tous les managers,
        // les factorys, les gameobject, sinon on na peux rien cree(instantier)
        this.masterManager.start();
       //Reglage taille all canvas
        Service.setAllSizeCanvas(650);
        // Init command & key
        this.keyHandler.init();

        // On cree nos objects qui son cree par la factory
        // Player
        this.player = this.gameManager.initOnePlayer();
        // SolarSystem
        this.solarSystem = this.gameManager.initOneSolarSystem();


        // On init le masterManager pour init tous manager 
        this.masterManager.init();
        /* ------ ZONE DE TEST ------ */

        /* ------ FIN ZONE DE TEST ------ */
        // Camera centrage du canvas map et de image du player
        Service.initCameraScaleTranslate(this.player);

        // NavBall
        this.navBall.init(this.player);

    }
    update() {

        //V2 canvas service
        Service.clearAllCanvas();

        this.masterManager.update();

        // ? Key 'e' pour achiffer la direction vers la planet selectionne
        if (this.keyHandler.infoKeyHelp) {
            let planetTest = this.solarSystem.listAstre[this.solarSystem.indexSeletedPlanet];
            let { position, size } = planetTest.transform;
            let { x: planetX, y: planetY } = position;
            let { x: planetW, y: planetH } = size;

            this.navBall.setTarget({
                x: planetX, y: planetY,
                w: planetW, h: planetH
            });

            //Remise a zero du boolen, sinon il reste sur true et sa fait du kaka
            //this.keyHandler.infoKeyHelp = false;
        }


        // ? Key 'a' pour defiler la selection des planet
        if (this.keyHandler.mapKeyHelp) {

            this.solarSystem.indexSeletedPlanet++;
            if (this.solarSystem.indexSeletedPlanet >= this.solarSystem.listAstre.length) {
                this.solarSystem.indexSeletedPlanet = 0;
            }

            this.solarSystem.currentSeletedPlanet.landRequest = false;
            // On met a jour la planet en selectionner et tous les autre en non-selectionner 
            this.solarSystem.selectedPlanet(this.solarSystem.indexSeletedPlanet);

            //FIXME: il un truc que je fait mal, je ne devrai pas avoir a reset le KEY
            //Remise a zero du boolen, sinon il reste sur true et sa fait du kaka
            this.keyHandler.mapKeyHelp = false;
        }


        // ? Key 'f' pour la demende atterissage
        if (this.keyHandler.actionKeyHelp) {
            //console.log("coucou");
            this.isTimerStart = true;
            this.solarSystem.currentSeletedPlanet.landRequest = true;
            this.keyHandler.actionKeyHelp = false;
        }
        if(this.isTimerStart) this.setTimerRequestTest();

        //Ici mise a jour de la navBall
        this.navBall.update();
        //Affiche des info du system
        Service.BROADCAST.showMsgTopMulti(
                `Name system: ${this.solarSystem.name}\n
Type: ${this.solarSystem.type}\n
Size: ${this.solarSystem.alSize}\n
Planet: 3\n
Lune: 2\n
Select:${this.solarSystem.currentSeletedPlanet.name}`,
                'gold'
            );

        Service.BROADCAST.showMsgButtomLeft(`Planet "${this.solarSystem.currentSeletedPlanet.name}" en selection`, 33, 'cyan');
        let isValidLandRequest = false;
        //TEST: recuperation de la detection de collision sur la planet en coure de selection
        this.solarSystem.currentSeletedPlanet.components.forEach(c => {
            if (c instanceof Collider) {
                if (c.isColliding) {
                    isValidLandRequest = true;
                    Service.BROADCAST.showMsgButtomLeft(`Entre dans la gravite`, 0, 'lime');
                }
            }
        });
        if (this.solarSystem.currentSeletedPlanet.landRequest === true) {
            if (isValidLandRequest) {
               // Service.BROADCAST.showMsgButtomLeft(`Demande d'approche approuver`, 15, 'lime');
            } else {
               // Service.BROADCAST.showMsgButtomLeft(`Demande d'approche en attente...`, 15, 'lime');
            }
        }
        if (this.statesRequest.current === 0) {

            Service.BROADCAST.showMsgButtomLeft(`Demande d'approche en attente...`, 15, 'lime');
            

        } else if (this.statesRequest.current === 2) {
            Service.BROADCAST.showMsgButtomLeft(`Demande d'approche approuver`, 15, 'lime');
            
        }

        /* ------ ZONE DE TEST ------ */

        /* ------ FIN ZONE DE TEST ------ */
        
        // Rappel key map
        Service.BROADCAST.showMsgButtomRight('Key map rappel:', 33, 150, 'cyan');
        Service.BROADCAST.showMsgButtomRight('-A-> switch info', 15, 150, 'lime');
        Service.BROADCAST.showMsgButtomRight('-E-> target'+this.timerRequestTest, 0, 150, 'lime');

    }

    setTimerRequestTest(){
        this.isTimerStart=false;
        let test = 0;

        this.statesRequest.current = 0;
        
        timerRequestTest = setInterval(()=>{
            if(test === 4){
                this.statesRequest.current = 2;
            }
            if(test == 10){
                this.statesRequest.current = -1;
                clearInterval(timerRequestTest);
            }

            test++;
        }, 500);
        
        

    }
}