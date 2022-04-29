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

//let world = new World();// Stockage de notre future world HIHI!!!
let player;// Notre fake player
let debug;// Notre panel de debug

let move = {
    x: 0, // Pour une map scale de 1 a 2 utilisiser cette pos (x:430,y:560) 
    y: 0  // Pour une map scale de 3 utilisiser cette pos (x:1360,y:1430) 
}

//TEST World v1
/**@type {SystemSolar} */
let systemSolarSimple = new SystemSolar();


window.onload = function () {

    playerCanvas = document.getElementById("player");
    playerCtx = playerCanvas.getContext("2d");

    worldCanvas = document.getElementById("world");
    worldCtx = worldCanvas.getContext("2d");

    width = playerCanvas.width = window.innerWidth;
    height = playerCanvas.height = window.innerHeight;


    worldCanvas.width = width * 2;
    worldCanvas.height = height * 2;

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
    animationID = requestAnimationFrame(gameLoop);

    updateDebug();

    clearCanvas(playerCtx, { x: 0, y: 0, w: width, h: height, isAlpha: false });
    clearCanvas(worldCtx, { x: 0, y: 0, w: worldCanvas.width, h: worldCanvas.height, isAlpha: true });



    angleTrouNoir += .001;
    angleMoon += .005;



    worldCtx.save();

    worldCtx.transform(
        scaleXY, // Scale X

        0, 0, // ! Pour la rotation PAS TOUCHE !!!!

        scaleXY, // Scale Y
        //Position
        -move.x - player.x, // X
        -move.y - player.y// Y
    );

    //TEST System solar simple
    systemSolarSimple.draw(worldCtx);

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

    debug = DebugInfo.create(DBG_Ctx, 10, 10, 180, 75, true);


    //debug.drawPanel_G();
}
function updateDebug() {
    debug.updateVarDebugInfo(
        [
            { label: 'Animation ', txt: animationID },
            { label: 'World info ', txt: '' },
            { label: 'Radius: ', txt: systemSolarSimple.radius },
            { label: 'Canvas: ', txt: width + ' w|h ' + height },
            { label: 'System: 00 Nbs astre: ', txt: systemSolarSimple.planets.length },
            { label: ' ', txt: '' },
            { label: 'Pos mouse: ', txt: mouse.x + ' x|y ' + mouse.y }
        ],
        [
            { label: 'Player info ', txt: '' },
            { label: 'Size: ', txt: player.size.x + ' x|y ' + player.size.y },
            { label: 'Position: ', txt: player.x + ' x|y ' + player.y },

            { label: ' ', txt: '' },
            { label: 'Map info ', txt: '' },
            { label: 'Position: ', txt: move.x.toFixed(2) + ' dx|dy ' + move.y.toFixed(2) },
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
        //console.log(event.key);
        switch (event.key) {
            case 'z': // up
                move.y -= 10;
                break;
            case 's': // down
                move.y += 10;
                break;
            case 'q': // left
                move.x -= 10;
                break;
            case 'd': // right 
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
                angleTest += 0.1;
                break;

            default:
                break;
        }
    });
    document.body.addEventListener('keyup', function (event) {
        switch (event.key) {
            case 'z': // up
                break;
            case 's': // down
                break;
            case 'q': // left
                break;
            case 'd': // right
                break;
            case 'Escape': // Escape ou echap

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