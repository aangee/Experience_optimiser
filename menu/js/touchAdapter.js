/**
 * TouchAdapter local — menu/  (mode curseur mobile)
 *
 * Deux modes sélectionnables via le bouton flottant (visible sur touch) :
 *
 * ● Zones (défaut) : décalage proportionnel à la proximité du bord.
 *   Dans les 28% autour de chaque bord → curseur poussé vers le centre.
 *   Coins → les deux axes combinés.
 *   Zone centrale → aucun décalage (curseur au doigt).
 *   Relâcher = clic à la position du curseur.
 *
 * ● Direct : le clic est envoyé exactement à la position du doigt,
 *   sans curseur ni décalage. Utile pour tester les hitzones brutes.
 *
 * NOTE : preventDefault uniquement sur touchstart et touchmove.
 * Le mettre sur touchend (passive:false) bloque les touches suivantes
 * sur iOS — ne pas le faire.
 */
(function () {

    const CURSOR_SIZE  = 28;
    const OFFSET_MAX   = 55;   // décalage maximum en px (au ras du bord)
    const EDGE_MARGIN  = 0.28; // zone active : 28% depuis chaque bord

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

    /* ── Toggle Zones / Direct ───────────────────────────────── */
    // Créé immédiatement (pas au premier touch) pour être sûr qu'il existe.
    // Caché par défaut sur desktop via media query touch.
    // Visible dès que le device supporte le touch (ontouchstart in window).
    const toggleEl = document.createElement('button');
    toggleEl.textContent = '⊕ Zones';
    toggleEl.style.cssText = [
        'position:fixed',
        'bottom:10px',
        'right:10px',
        'z-index:10000',
        'padding:8px 12px',
        'background:rgba(0,0,0,0.82)',
        'color:white',
        'border:1px solid rgba(255,255,255,0.4)',
        'border-radius:8px',
        'font-size:13px',
        'font-family:monospace',
        'cursor:pointer',
        'user-select:none',
        // Visible uniquement si le device a le touch
        'display:' + ('ontouchstart' in window ? 'block' : 'none'),
    ].join(';');

    // touchstart sur le bouton : toggle + stopper la propagation
    toggleEl.addEventListener('touchstart', function (e) {
        e.stopPropagation();
        e.preventDefault();
        offsetEnabled = !offsetEnabled;
        toggleEl.textContent = offsetEnabled ? '⊕ Zones' : '⊙ Direct';
        hideCursor();
    }, { passive: false });

    // Aussi cliquable à la souris (pratique en DevTools mobile)
    toggleEl.addEventListener('mousedown', function (e) {
        e.stopPropagation();
    });
    toggleEl.addEventListener('click', function () {
        offsetEnabled = !offsetEnabled;
        toggleEl.textContent = offsetEnabled ? '⊕ Zones' : '⊙ Direct';
        hideCursor();
    });

    // Le script est chargé sans defer → body peut ne pas exister encore.
    // On insère le bouton dès que le DOM est prêt.
    if (document.body) {
        document.body.appendChild(toggleEl);
    } else {
        document.addEventListener('DOMContentLoaded', function () {
            document.body.appendChild(toggleEl);
        });
    }

    /* ── Calcul de la position décalée par zones de bord ─────── */
    function offsetFrom(tx, ty) {
        const W = window.innerWidth;
        const H = window.innerHeight;

        const leftEdge   = EDGE_MARGIN * W;
        const rightEdge  = (1 - EDGE_MARGIN) * W;
        const topEdge    = EDGE_MARGIN * H;
        const bottomEdge = (1 - EDGE_MARGIN) * H;

        let dx = 0;
        let dy = 0;

        // Bord gauche : plus proche du bord → plus d'offset vers la droite
        if (tx < leftEdge) {
            dx = OFFSET_MAX * (1 - tx / leftEdge);
        }
        // Bord droit : plus proche du bord → plus d'offset vers la gauche
        else if (tx > rightEdge) {
            dx = -OFFSET_MAX * ((tx - rightEdge) / (W - rightEdge));
        }

        // Bord haut : offset vers le bas
        if (ty < topEdge) {
            dy = OFFSET_MAX * (1 - ty / topEdge);
        }
        // Bord bas : offset vers le haut
        else if (ty > bottomEdge) {
            dy = -OFFSET_MAX * ((ty - bottomEdge) / (H - bottomEdge));
        }

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
