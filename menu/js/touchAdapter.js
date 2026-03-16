/**
 * TouchAdapter local — menu/  (mode curseur mobile)
 *
 * Sur mobile, touch + glisser déplace un curseur visible.
 * Relâcher = clic à la position du curseur.
 *
 * Le curseur est décalé du doigt vers le centre de l'écran :
 *   doigt côté droit  → curseur à gauche
 *   doigt côté gauche → curseur à droite
 *   doigt en bas      → curseur en haut
 *   doigt en haut     → curseur en bas
 * → le curseur n'est jamais caché sous le doigt.
 *
 * NOTE : preventDefault uniquement sur touchstart et touchmove.
 * Mettre preventDefault sur touchend (passive:false) bloque les
 * touches suivantes sur iOS — ne pas le faire.
 */
(function () {

    const CURSOR_SIZE = 28;  // diamètre du cercle en px
    const OFFSET      = 44;  // décalage curseur ↔ doigt en px

    /* ── Curseur visuel ──────────────────────────────────────── */
    let cursorEl = null;

    function ensureCursor() {
        if (cursorEl) return;
        cursorEl = document.createElement('div');
        cursorEl.style.cssText = [
            'position:fixed',
            'width:'  + CURSOR_SIZE + 'px',
            'height:' + CURSOR_SIZE + 'px',
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

    /* ── Calcul de la position décalée ───────────────────────── */
    function offsetFrom(tx, ty) {
        const dx = tx > window.innerWidth  / 2 ? -OFFSET : +OFFSET;
        const dy = ty > window.innerHeight / 2 ? -OFFSET : +OFFSET;
        return { x: tx + dx, y: ty + dy };
    }

    /* ── Position courante du curseur ────────────────────────── */
    let cx = 0;
    let cy = 0;

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

    /* ── Listeners touch ─────────────────────────────────────── */

    // touchstart : place le curseur (décalé), initialise le hover
    document.addEventListener('touchstart', function (e) {
        e.preventDefault();
        const t   = e.touches[0];
        const pos = offsetFrom(t.clientX, t.clientY);
        cx = pos.x;
        cy = pos.y;
        moveCursor(cx, cy);
        fire('mousemove', cx, cy);
    }, { passive: false });

    // touchmove : fait glisser le curseur (décalé)
    document.addEventListener('touchmove', function (e) {
        e.preventDefault();
        const t   = e.touches[0];
        const pos = offsetFrom(t.clientX, t.clientY);
        cx = pos.x;
        cy = pos.y;
        moveCursor(cx, cy);
        fire('mousemove', cx, cy);
    }, { passive: false });

    // touchend : clic à la position du curseur
    // passive:true + pas de preventDefault → évite de bloquer
    // les touches suivantes sur iOS
    document.addEventListener('touchend', function (e) {
        flashCursor();
        fire('mousedown', cx, cy);
        fire('mouseup',   cx, cy);
        setTimeout(hideCursor, 300);
    }, { passive: true });

})();
