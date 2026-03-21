
const params   = new URLSearchParams(window.location.search);
const animated = params.get('mode') === 'anim';
const style    = params.get('style') || 'default';

window.app = new App({ type: 'Aartee', animated, style });
window.app.init();

function loop() {
    window.app.update();
    requestAnimationFrame(loop);
}
loop();