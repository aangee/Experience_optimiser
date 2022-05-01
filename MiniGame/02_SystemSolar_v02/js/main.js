
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

let player;// Notre fake player
let debug;// Notre panel de debug

let move = {
    x: 0, // Pour une map scale de 1 a 2 utilisiser cette pos (x:430,y:560) 
    y: 0  // Pour une map scale de 3 utilisiser cette pos (x:1360,y:1430) 
}

//TEST World v1
let systemSolarSimple = new SystemSolar();


window.onload = function () {

    playerCanvas = document.getElementById("player");
    playerCtx = playerCanvas.getContext("2d");

    worldCanvas = document.getElementById("world");
    worldCtx = worldCanvas.getContext("2d");

    width = playerCanvas.width = worldCanvas.width = window.innerWidth;
    height = playerCanvas.height = worldCanvas.height = window.innerHeight;


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
    clearCanvas(worldCtx, { x: 0, y: 0, w: width, h: height, isAlpha: true });



    angleTrouNoir += .001;
    angleMoon += .005;



    worldCtx.save();

    worldCtx.transform(
        scaleXY, // Scale X

        0, 0, // Pour la rotation PAS TOUCHE !!!!

        scaleXY, // Scale Y
        //Position
        -move.x, // X
        -move.y // Y
    );





    //TEST System solar simple
    systemSolarSimple.draw(worldCtx);


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
            { label: 'Nbs planets: ', txt: systemSolarSimple.etoile.planets.length },
            { label: 'Planet 1 ', txt: '' },
            { label: 'Distance: ' + systemSolarSimple.etoile.planets[0].distance.toFixed(0) + ' Nbs moon: ', txt: systemSolarSimple.etoile.planets[0].moons.length },
            { label: 'Planet 2 ', txt: '' },
            { label: 'Distance: ' + systemSolarSimple.etoile.planets[1].distance.toFixed(0) + ' Nbs moon: ', txt: systemSolarSimple.etoile.planets[1].moons.length },
            { label: 'Planet 3 ', txt: '' },
            { label: 'Distance: ' + systemSolarSimple.etoile.planets[2].distance.toFixed(0) + ' Nbs moon: ', txt: systemSolarSimple.etoile.planets[2].moons.length },
            { label: 'Planet 4 ', txt: '' },
            { label: 'Distance: ' + systemSolarSimple.etoile.planets[3].distance.toFixed(0) + ' Nbs moon: ', txt: systemSolarSimple.etoile.planets[3].moons.length },
            { label: 'Planet ', txt: systemSolarSimple.etoile.planets.length },
            { label: 'Distance: ' + systemSolarSimple.etoile.planets[systemSolarSimple.etoile.planets.length - 1].distance.toFixed(0) + ' Nbs moon: ', txt: systemSolarSimple.etoile.planets[systemSolarSimple.etoile.planets.length - 1].moons.length }
            /*  { label: 'Pos system: ', txt: systemSolarSimple.etoile[0].x.toFixed(0) + ' x|y ' + systemSolarSimple.etoile[0].y.toFixed(0) },
             { label: 'Pos system: ', txt: systemSolarSimple.etoile[0].dx.toFixed(0) + ' dx|dy ' + systemSolarSimple.etoile[0].dy.toFixed(0) }, */
        ],
        [
            { label: 'Canvas: ', txt: worldCanvas.width + ' w|h ' + worldCanvas.height },
            { label: 'Player info ', txt: '' },
            { label: 'Size: ', txt: player.size.x + ' x|y ' + player.size.y },
            { label: 'Position: ', txt: player.x + ' x|y ' + player.y },

            { label: 'Map info ', txt: '' },
            { label: 'Position: ', txt: move.x.toFixed(2) + ' dx|dy ' + move.y.toFixed(2) },
            { label: 'Scale: ', txt: scaleXY.toFixed(2) },
            { label: 'Pos mouse: ', txt: mouse.x + ' x|y ' + mouse.y },
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
 *  & ' mousemove, mousedown, mouseup ' pour la sourie
 */
function addEvents() {
    document.body.addEventListener('keydown', function (event) {

        /*console.log(event.keyCode);*/
        console.log(event.key);
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


            case '²':
                debug.isShowDebug = !debug.isShowDebug;
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

    });
}
//#endregion