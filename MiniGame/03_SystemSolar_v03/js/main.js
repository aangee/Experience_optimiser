
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
};

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


    player = new Player({
        x: width * .5, y: height * .5,
        size: { x: 5, y: 5 },
        canvas: worldCanvas,
        ctx: worldCtx
    });

    //Init du debug panel
    initDebug();

    addEvents();
    gameLoop();

};

//#region GameLoop
let scaleXY = 1;
function gameLoop() {

    animationID = requestAnimationFrame(gameLoop);
    updateDebug();

    clearCanvas(playerCtx, { x: 0, y: 0, w: width, h: height, isAlpha: false });
    clearCanvas(worldCtx, { x: world.x, y: world.y, w: world.size.x, h: world.size.y, isAlpha: true });


    worldCtx.save();

    // On bouge notre monde en fonction des input (z,q,s,d)
    worldCtx.transform(
        scaleXY, // Scale X

        0, 0, // Pour la rotation PAS TOUCHE !!!!

        scaleXY, // Scale Y
        //Position
        -move.x, // X
        -move.y // Y
    );

    //Loop de notre monde
    world.loop();

    worldCtx.restore();


    player.loop();

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
            { label: 'Pos mouse: ', txt: mouse.x + ' x|y ' + mouse.y }
        ],
        [
            { label: 'Player info ', txt: '' },
            { label: 'Size: ', txt: player.size.x + ' x|y ' + player.size.y },
            { label: 'Position: ', txt: player.x + ' x|y ' + player.y },

            { label: 'Map info ', txt: '' },
            { label: 'Position: ', txt: move.x.toFixed(2) + ' x|y ' + move.y.toFixed(2) },
            { label: 'Scale: ', txt: scaleXY.toFixed(2) },
            { label: 'Info input ', txt: '' },
            { label: 'Toggle show panel info: ', txt: '²' },
            { label: 'Zoom x10: ', txt: '+ -' },
            { label: 'Zoom x1: ', txt: '/ *' },
            { label: 'Move: ', txt: 'Z Q S D' }
        ]);

        debug.drawPanel_G();
        debug.drawPanel_D({ wCanva: width });

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
                debug.isShowDebug = !debug.isShowDebug;
                break;

            default:
                break;
        }
    });

    document.body.addEventListener('mousemove', (event) => {

        mouse = {
            x: event.clientX,
            y: event.clientY
        };

    });
}
//#endregion