
let mouse = {
    x: 100,
    y: 100
};

let gameCanvas;// Pour le rendu de base
let gameCtx;// context du rendu de base
let collisionCanvas;// Pour gere les collision Bitmap
let collisionCtx;// context pour la collison Bitmap
let worldCanvas;// Pour le rendu world
let worldCtx;// context pour le world
let width;// Pour un appel plus simple dans notre programe ont defini widht global
let height;// Pour un appel plus simple dans notre programe ont defini height global


let game;// Stockage de notre future game HIHI!!!

window.onload = function () {

    gameCanvas = document.getElementById("game");
    gameCtx = gameCanvas.getContext("2d");

    collisionCanvas = document.getElementById("collision");
    collisionCtx = collisionCanvas.getContext("2d");

    worldCanvas = document.getElementById("world");
    worldCtx = worldCanvas.getContext("2d");

    width = gameCanvas.width = collisionCanvas.width = window.innerWidth;
    height = gameCanvas.height = collisionCanvas.height = window.innerHeight;

    // On regle nos parametre pour le game
    let settingsCanvasGame = {
        gameCanvas: gameCanvas,
        gameCtx: gameCtx,
        worldCanvas: worldCanvas,
        worldCtx: worldCtx,
        collisionCanvas: collisionCanvas,
        collisionCtx: collisionCtx
    };
    // On cree notre game
    game = new Game(settingsCanvasGame);

    // On regle nos parmetre pour le level 00
    let settingsLevel = {
        idLevel: 0,
        numEnemys: 3,
        isEnemyRespawn: false,
        ship: game.ship
    };
    // On cree un level
    game.createOneLevel(settingsLevel);



    //DEBUG
    DebugInfo.create(gameCtx, 10, 10, 160, 135, true);

    //On ajoute les event mouse et keybord
    addEvents();


    // On lance la loop pour le rendu, calcule du game
    //FIXME Genere la physique et le rendu dans deux loop separe
    gameLoop();
}

//#region GameLoop
function gameLoop() {
    //context.clearRect(0, 0, width, height);


    gameCtx.fillStyle = 'rgba(0,0,0,.9)';
    gameCtx.rect(0, 0, width, height);
    gameCtx.fill();

    /* worldCtx.fillStyle = 'rgba(0,0,0,.9)';
    worldCtx.rect(0, 0, width, height);
    worldCtx.fill(); */

    game.loop();


    //#region DEBUG
    if (DebugInfo.isShowDebug) {
        DebugInfo.drawPanel_G();
        DebugInfo.drawPanel_D({ wCanva: width });
    }
    DebugInfo.updateVarDebugInfo(
        [
            { label: 'Numbres enemy: ', txt: game.levels[0].enemys.length },
            { label: 'Numbers balls: ', txt: game.ship.balls.length },
            { label: 'Cooldown Shoot: ', txt: game.cooldownShoot },
            { label: 'Speed: ', txt: game.ship.engin.getSpeed().toFixed(0) },
            { label: 'Shoot: ', txt: game.ship.isShooting },
            { label: 'Thrust: ', txt: game.ship.thrusting },
            { label: '     ---  Turn  --- ', txt: '' },
            { label: '', txt: '|Left> ' + game.ship.turningLeft + ' |Right> ' + game.ship.turningRight },
            { label: 'Friction: ', txt: game.ship.engin.friction },
            { label: 'Angle: ', txt: game.ship.shapeShip.angle.toFixed(2) },
            { label: 'Velocity: ', txt: '|x> ' + game.ship.engin.vx.toFixed(0) + ' |y> ' + game.ship.engin.vy.toFixed(0) },
            { label: 'Position: ', txt: '|x> ' + game.ship.engin.x.toFixed(0) + ' |y> ' + game.ship.engin.y.toFixed(0) },
            { label: 'Animation: ', txt: game.animationID }
        ],
        [
            { label: 'Cillision World: ', txt: game.gameDetecteCollision },
            { label: 'Station: ', txt: game.levels[0].station.name },
            { label: 'Sante: ', txt: game.levels[0].station.lives.toFixed(0) },
            { label: 'DistanceTo Sun: ', txt: game.levels[0].station.engin.distanceTo(game.levels[0].sun.engin).toFixed(0) },
            { label: 'Velocity: ', txt: '|x> ' + game.levels[0].station.engin.vx.toFixed(1) + ' |y> ' + game.levels[0].station.engin.vy.toFixed(1) },
            { label: 'Position: ', txt: '|x> ' + game.levels[0].station.engin.x.toFixed(0) + ' |y> ' + game.levels[0].station.engin.y.toFixed(0) },
            { label: 'Angle: ', txt: game.levels[0].station.engin.getHeading().toFixed(2) },
            { label: 'Speed: ', txt: game.levels[0].station.engin.getSpeed().toFixed(2) },
            { label: 'Cible trouve: ', txt: game.levels[0].station.isTarget },
            { label: 'Nom: ', txt: game.levels[0].station.target.name },
            { label: 'Id: ', txt: game.levels[0].station.target.id },
            { label: 'Position: ', txt: game.levels[0].station.target.x.toFixed(2) + ' | ' + game.levels[0].station.target.y.toFixed(2) },
            { label: 'Armement: ', txt: game.levels[0].station.armements.armes.length + ' Actif: 1' }/*,
            { label: 'Type: ', txt: game.levels[0].station.armements.armes[0].type }
            { label: 'Thrust', txt: game.ship.thrusting },
            { label: '     ---  Turn  --- ', txt: '' },
            { label: '', txt: '|Left> ' + game.ship.turningLeft + ' |Right> ' + game.ship.turningRight },
            { label: 'Friction: ', txt: game.ship.engin.friction },
            { label: 'Angle: ', txt: game.ship.shapegame.ship.angle.toFixed(2) }, */
        ]);
    //#endregion


    game.animationID = requestAnimationFrame(gameLoop);

}
//#endregion

//#region EVENTs DOM-Element-body
/** Ajout event 'keydown, keyup' pour la clavier
 *  & 'mousemove, mousedown, mouseup' pour la sourie
 */
function addEvents() {
    document.body.addEventListener('keydown', function (event) {
        /*console.log(event.keyCode);*/
        console.log(event.key);
        switch (event.key) {
            case 'z': // up
                game.ship.thrusting = true;
                break;
            case 's': // down
                game.ship.thrustingBack = true;
                break;
            case 'q': // left
                game.ship.turningLeft = true;
                break;
            case 'd': // right 
                game.ship.turningRight = true;
                break;
            case 'Escape': // Escape ou echap


                break;
            case '²': // Pause game
                game.isAppPause = !game.isAppPause;
                if (game.isAppPause) {
                    cancelAnimationFrame(game.animationID);
                } else {
                    gameLoop();
                }
                break;

            default:
                break;
        }
    });
    document.body.addEventListener('keyup', function (event) {
        /* console.log(event.keyCode);
        console.log(event.key); */
        switch (event.key) {
            case 'z': // up
                game.ship.thrusting = false;
                break;
            case 's': // down
                game.ship.thrustingBack = false;
                break;
            case 'q': // left
                game.ship.turningLeft = false;
                break;
            case 'd': // right
                game.ship.turningRight = false;
                break;
            case 'Escape': // Escape ou echap
                DebugInfo.isShowDebug = !DebugInfo.isShowDebug;
                game.isVueFollow = !game.isVueFollow;
                break;

            default:
                break;
        }
    });
    document.body.addEventListener('mousemove', (event) => {
        //console.log(event.button);
        mouse = {
            x: event.clientX,
            y: event.clientY
        };

        game.ship.aimPoint(mouse.x, mouse.y);
        if (event.shiftKey) {

            //game.ship.followPoint(target, 0.01);

        }
    });
    document.body.addEventListener('mousedown', (event) => {

        game.ship.isShooting = true;

    });
    document.body.addEventListener('mouseup', (event) => {


        game.ship.isShooting = false;

    });
}
//#endregion