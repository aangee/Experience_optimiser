ResourcesLoader.loadAllResources(
    {
        listNameImg:
            [
                'ship00',
                'ship01',
                'ship02',
                'terra00',
                'saturne',
                'saturne01',
                'pandora',
                'luna02',
                'luna03',
                'grid03',
                'sunHalo'
            ],
        listNameAudio:['audioTest01']
    },
    ready);


let debug = document.getElementById('debug');
var a_console = document.getElementById('console');
let app = new Athena('v.0.0.1');
/**@param {Number} animationId conteur animation */
let animationId = 0;
/** function lancer par ResourcesLoader un foi tous charge */ 
function ready() {

    app.init();

    function loop() {
        animationId = requestAnimationFrame(loop);
        app.update();
    }
    loop(); 
}

window.addEventListener('keypress', (e) => {
    if (e.key === "²") {
        cancelAnimationFrame(animationId);
    }
});