
window.app = new Scene();
window.app.init();

window.input = new InputHandler();


function loop() {

    window.app.update();
    requestAnimationFrame(loop)
}
loop();