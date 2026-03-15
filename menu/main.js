const params = new URLSearchParams(window.location.search);
const mode = params.get('mode') || 'gui';

let app = new AppMenu(1000, mode);

function animate() {
    window.requestAnimationFrame(animate);
    app.drawScene();
}

animate();
