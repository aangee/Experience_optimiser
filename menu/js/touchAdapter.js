/**
 * TouchAdapter local — menu/  (mode curseur mobile)
 *
 * Sur mobile, un simple tap est imprécis sur les petits boutons.
 * Ce mode simule un curseur de souris :
 *   - touch + glisser → déplace un curseur visible à l'écran
 *   - relâcher        → clic à la position du curseur
 *
 * MasterHandler reçoit de vrais MouseEvent avec les bonnes coordonnées,
 * rien d'autre n'a besoin d'être modifié.
 *
 * passive:false + preventDefault sur tous les events touch
 * → empêche le scroll parasite ET les mouse events fantômes (~300ms)
 * que le navigateur génère après un touch.
 */
(function () {

    /* ── Curseur visuel ──────────────────────────────────────── */
    const SIZE = 28;
    let cursorEl = null;

    function ensureCursor() {
        if (cursorEl) return;
        cursorEl = document.createElement('div');
        cursorEl.style.cssText = [
            'position:fixed',
            'width:'  + SIZE + 'px',
            'height:' + SIZE + 'px',
            'border-radius:50%',
            'border:2px solid rgba(255,255,255,0.9)',
            'background:rgba(255,255,255,0.15)',
            'box-shadow:0 0 6px rgba(0,0,0,0.6)',
            'pointer-events:none',
            'transform:translate(-50%,-50%)',
            'display:none',
            'z-index:9999',
        ].join(';');
        document.body.appendChild(cursorEl);
    }

    function moveCursor(x, y) {
        ensureCursor();
        cursorEl.style.left    = x + 'px';
        cursorEl.style.top     = y + 'px';
        cursorEl.style.display = 'block';
    }

    function flashCursor() {
        if (cursorEl) cursorEl.style.borderColor = 'cyan';
    }

    function hideCursor() {
        if (cursorEl) {
            cursorEl.style.display     = 'none';
            cursorEl.style.borderColor = 'rgba(255,255,255,0.9)';
        }
    }

    /* ── Dispatch vers le canvas ─────────────────────────────── */
    function getCanvas() {
        return document.getElementById('myCanvas');
    }

    function fire(name, x, y) {
        const canvas = getCanvas();
        if (!canvas) return;
        canvas.dispatchEvent(new MouseEvent(name, {
            bubbles:    true,
            cancelable: true,
            clientX: x,
            clientY: y,
        }));
    }

    /* ── Position courante du curseur ────────────────────────── */
    let cx = 0;
    let cy = 0;

    /* ── Listeners touch ─────────────────────────────────────── */

    // touchstart : pose le curseur + initialise le hover
    document.addEventListener('touchstart', function (e) {
        e.preventDefault();
        const t = e.touches[0];
        cx = t.clientX;
        cy = t.clientY;
        moveCursor(cx, cy);
        fire('mousemove', cx, cy);   // met à jour l'état hover dans MasterHandler
    }, { passive: false });

    // touchmove : fait glisser le curseur
    document.addEventListener('touchmove', function (e) {
        e.preventDefault();
        const t = e.touches[0];
        cx = t.clientX;
        cy = t.clientY;
        moveCursor(cx, cy);
        fire('mousemove', cx, cy);   // feedback hover pendant le drag
    }, { passive: false });

    // touchend : clic à la position du curseur
    document.addEventListener('touchend', function (e) {
        e.preventDefault();
        flashCursor();               // flash cyan = clic pris en compte
        fire('mousedown', cx, cy);
        fire('mouseup',   cx, cy);
        setTimeout(hideCursor, 300); // curseur visible 300ms puis disparaît
    }, { passive: false });

})();
