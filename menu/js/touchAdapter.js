/**
 * TouchAdapter local — menu/  (mode curseur mobile)
 *
 * Deux modes sélectionnables via le bouton flottant (visible sur touch) :
 *
 * ● Offset ON (défaut) : touch + glisser déplace un curseur visible,
 *   décalé du doigt vers le centre de l'écran pour rester visible.
 *   Relâcher = clic à la position du curseur.
 *
 * ● Direct : le clic est envoyé exactement à la position du doigt,
 *   sans curseur ni décalage. Utile pour tester si l'offset
 *   cause des ratés sur certains boutons.
 *
 * NOTE : preventDefault uniquement sur touchstart et touchmove.
 * Le mettre sur touchend (passive:false) bloque les touches suivantes
 * sur iOS — ne pas le faire.
 */
(function () {

    const CURSOR_SIZE = 28;
    const OFFSET      = 44;

    let offsetEnabled = true;

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

    /* ── Toggle Offset ON / Direct ───────────────────────────── */
    let toggleEl = null;

    function ensureToggle() {
        if (toggleEl) return;
        toggleEl = document.createElement('button');
        updateToggleLabel();
        toggleEl.style.cssText = [
            'position:fixed',
            'bottom:10px',
            'right:10px',
            'z-index:10000',
            'padding:6px 10px',
            'background:rgba(0,0,0,0.75)',
            'color:white',
            'border:1px solid rgba(255,255,255,0.35)',
            'border-radius:6px',
            'font-size:12px',
            'font-family:monospace',
            'cursor:pointer',
            'user-select:none',
        ].join(';');

        // touchstart sur le bouton : toggle + stopper la propagation
        // (évite que le document listener intercepte ce touch)
        toggleEl.addEventListener('touchstart', function (e) {
            e.stopPropagation();
            e.preventDefault();
            offsetEnabled = !offsetEnabled;
            updateToggleLabel();
            hideCursor();
        }, { passive: false });

        document.body.appendChild(toggleEl);
    }

    function updateToggleLabel() {
        if (!toggleEl) return;
        toggleEl.textContent = offsetEnabled ? '⊕ Offset ON' : '⊙ Direct';
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

    document.addEventListener('touchstart', function (e) {
        e.preventDefault();
        ensureToggle();
        const t = e.touches[0];
        if (offsetEnabled) {
            const pos = offsetFrom(t.clientX, t.clientY);
            cx = pos.x;
            cy = pos.y;
            moveCursor(cx, cy);
        } else {
            cx = t.clientX;
            cy = t.clientY;
        }
        fire('mousemove', cx, cy);
    }, { passive: false });

    document.addEventListener('touchmove', function (e) {
        e.preventDefault();
        const t = e.touches[0];
        if (offsetEnabled) {
            const pos = offsetFrom(t.clientX, t.clientY);
            cx = pos.x;
            cy = pos.y;
            moveCursor(cx, cy);
        } else {
            cx = t.clientX;
            cy = t.clientY;
        }
        fire('mousemove', cx, cy);
    }, { passive: false });

    document.addEventListener('touchend', function (e) {
        if (offsetEnabled) flashCursor();
        fire('mousedown', cx, cy);
        fire('mouseup',   cx, cy);
        setTimeout(hideCursor, 300);
    }, { passive: true });

})();
