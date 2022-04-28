
let mouse = {
    x: 100,
    y: 100
};

let playerCanvas;// Pour le rendu de base
let playerCtx;// context du rendu de base
let worldCanvas;// Pour gere les collision Bitmap
let worldCtx;// context pour la collison Bitmap
/** @param {Number} width Taille global */
let width;// Pour un appel plus simple dans notre programe ont defini widht global
/** @param {Number} height Taille global */
let height;// Pour un appel plus simple dans notre programe ont defini height global
let animationID = 0;


let world = new World();// Stockage de notre future world HIHI!!!
let player;// Notre fake player
let debug;// Notre panel de debug

let move = {
    x: 0, // Pour une map scale de 1 a 2 utilisiser cette pos (x:430,y:560) 
    y: 0  // Pour une map scale de 3 utilisiser cette pos (x:1360,y:1430) 
}

//TEST World v1
let systemSolarSimple = new SystemSolar();
let systemSolarSimpleV2 = new SystemSolarV2();


window.onload = function () {

    playerCanvas = document.getElementById("player");
    playerCtx = playerCanvas.getContext("2d");

    worldCanvas = document.getElementById("world");
    worldCtx = worldCanvas.getContext("2d");

    width = playerCanvas.width = window.innerWidth;
    height = playerCanvas.height = window.innerHeight;

    world = new World({
        x: 0, y: 0,
        size: { x: 1000, y: 1000 },
        canvas: worldCanvas,
        ctx: worldCtx
    });
    world.isActiveMoonForPlanet = false;


    player = new Player({
        x: width * .5, y: height * .5,
        size: { x: 5, y: 5 },
        canvas: worldCanvas,
        ctx: worldCtx
    });






    //Init du debug panel
    initDebug();
    updateDebug();

    addEvents();
    gameLoop();

};
//#region GameLoop
let angleTrouNoir = 0;
let angleMoon = 0;
let scaleXY = 1;
function gameLoop() {


    //context.clearRect(0, 0, width, height);
    updateDebug();

    clearCanvas(playerCtx, { x: 0, y: 0, w: width, h: height, isAlpha: false });
    clearCanvas(worldCtx, { x: world.x, y: world.y, w: world.size.x, h: world.size.y, isAlpha: true });



    /* worldCtx.fillStyle = 'rgba(0,0,0,.9)';
      worldCtx.rect(0, 0, width, height);
      worldCtx.fill(); */
    angleTrouNoir += .001;
    angleMoon += .005;



    worldCtx.save();

    // On centre l'axe 0|0 sur le centre de notre monde
    //worldCtx.translate(0 - world.size.x * 0.5, 0 - world.size.y * 0.5);
    // On bouge le tous au centre du canvas qui nous sert de player & view ou camera
    //worldCtx.translate(width * 0.5, height * 0.5);
    // Ensuit on bouge notre monde en fonction des input (z,q,s,d)
    worldCtx.transform(
        scaleXY, // Scale X

        0, 0, // ! Pour la rotation PAS TOUCHE !!!!

        scaleXY, // Scale Y
        //Position
        -move.x, // X
        -move.y // Y
    );





    //TEST System solar simple
    //systemSolarSimple.draw(worldCtx);
    //systemSolarSimpleV2.draw(worldCtx);


    //Loop de notre monde
    world.loop();

    worldCtx.restore();


    player.loop();

    animationID = requestAnimationFrame(gameLoop);
}
function clearCanvas(ctx, params) {

    if (params.isAlpha) {
        ctx.fillStyle = 'rgba(0,0,0,.85)';
        ctx.rect(params.x, params.y, params.w, params.h);
        ctx.fill();
    } else
        ctx.clearRect(params.x, params.y, params.w, params.h);
}
//#endregion


//#region DEBUG
function initDebug() {
    const DBG_Canvas = document.getElementById("debug");
    const DBG_Ctx = DBG_Canvas.getContext("2d");
    DBG_Canvas.width = width;
    DBG_Canvas.height = height;

    debug = DebugInfo.create(DBG_Ctx, 10, 10, 180, 135, true);


    //debug.drawPanel_G();
}
function updateDebug() {
    debug.updateVarDebugInfo(
        [
            { label: 'Animation ', txt: animationID },
            { label: 'World info ', txt: '' },
            { label: 'Size: ', txt: world.size.x + ' x|y ' + world.size.y },
            { label: 'Canvas: ', txt: world.canvas.width + ' w|h ' + world.canvas.height },
            { label: world.sytemes[0].typeName + ': Nbs moon: ', txt: world.sytemes[0].planets.length },
            { label: 'Pos system: ', txt: world.sytemes[0].x.toFixed(0) + ' x|y ' + world.sytemes[0].y.toFixed(0) },
            { label: 'Pos system: ', txt: world.sytemes[0].dx.toFixed(0) + ' dx|dy ' + world.sytemes[0].dy.toFixed(0) },
            { label: 'Pos mouse: ', txt: mouse.x + ' x|y ' + mouse.y }/* ,
            { label: 'Pos moon: ', txt: world.sytemes[0].planets[0].dx.toFixed(0) + ' x|y ' + world.sytemes[0].planets[0].dy.toFixed(0) },
            { label: world.sytemes[1].typeName + ': Nbs moon: ', txt: world.sytemes[1].planets.length },
            { label: 'Pos planet: ', txt: world.sytemes[1].dx.toFixed(0) + ' x|y ' + world.sytemes[1].dy.toFixed(0) },
            { label: 'Pos moon: ', txt: world.sytemes[1].planets[0].dx.toFixed(0) + ' x|y ' + world.sytemes[1].planets[0].dy.toFixed(0) } */
        ],
        [
            { label: 'Player info ', txt: '' },
            { label: 'Size: ', txt: player.size.x + ' x|y ' + player.size.y },
            { label: 'Position: ', txt: player.x + ' x|y ' + player.y },

            { label: 'Map info ', txt: '' },
            { label: 'Position: ', txt: move.x.toFixed(2) + ' x|y ' + move.y.toFixed(2) },
            { label: 'Scale: ', txt: scaleXY.toFixed(2) }
        ]);

    if (debug.isShowDebug) {
        debug.drawPanel_G();
        debug.drawPanel_D({ wCanva: width });
    }
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
                /* game.ship.thrusting = true; */
                move.y -= 10;
                break;
            case 's': // down
                /* game.ship.thrustingBack = true; */
                move.y += 10;
                break;
            case 'q': // left
                /* game.ship.turningLeft = true; */
                move.x -= 10;
                break;
            case 'd': // right 
                /* game.ship.turningRight = true; */
                move.x += 10;
                break;
            case 'Escape': // Escape ou echap
                break;

            // Zoom map
            case '+':
                scaleXY += .1;
                break;
            case '-':
                scaleXY -= .1;
                break;
            case '/':
                scaleXY += .01;
                break;
            case '*':
                scaleXY -= .01;
                break;


            case '²': // Pause game
                /* game.isAppPause = !game.isAppPause;
                if (game.isAppPause) {
                    cancelAnimationFrame(game.animationID);
                } else {
                    gameLoop();
                } */
                angleTest += 0.1;
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
                /* game.ship.thrusting = false; */
                break;
            case 's': // down
                /* game.ship.thrustingBack = false; */
                break;
            case 'q': // left
                /* game.ship.turningLeft = false; */
                break;
            case 'd': // right
                /* game.ship.turningRight = false; */
                break;
            case 'Escape': // Escape ou echap
                /* DebugInfo.isShowDebug = !DebugInfo.isShowDebug;
                game.isVueFollow = !game.isVueFollow; */
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

        /* game.ship.aimPoint(mouse.x, mouse.y);
        if (event.shiftKey) {

            //game.ship.followPoint(target, 0.01);

        } */
    });
    document.body.addEventListener('mousedown', (event) => {
        /* 
                game.ship.isShooting = true; */

    });
    document.body.addEventListener('mouseup', (event) => {

        /* 
                game.ship.isShooting = false; */

    });
}
//#endregion