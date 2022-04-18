
window.app = new App({ type: 'Aartee' });
window.app.init();



function loop() {

    window.app.update();
    requestAnimationFrame(loop)
}
loop();