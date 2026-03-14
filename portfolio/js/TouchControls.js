/**
 * ============================================================
 * TouchControls.js
 * ============================================================
 * Contrôles tactiles virtuels pour les démos canvas.
 *
 * Portrait  → D-pad (croix 4 boutons) + bouton Tir
 * Landscape → Joystick analogique (knob) + bouton Tir
 *
 * Le joystick mappe les directions sur les touches ZQSD :
 *   - knob vers le haut   → Z (avant)
 *   - knob vers le bas    → S (arrière)
 *   - knob vers la gauche → Q (gauche)
 *   - knob vers la droite → D (droite)
 * Les diagonales sont supportées (Z+Q, Z+D, etc.)
 *
 * Bouton ⇄ : inverse gauche/droite (droitier ↔ gaucher).
 * Préférence persistée dans localStorage.
 *
 * Tout est injecté EN DEHORS de l'iframe (overlay dans le parent).
 * Les touches sont dispatchées dans iframe.contentWindow → aucune
 * modification des démos nécessaire.
 * ============================================================
 */

const IS_TOUCH = 'ontouchstart' in window || navigator.maxTouchPoints > 0;

class TouchControls {

  constructor() {
    this.iframe   = null;
    this.overlay  = null;
    this.heldKeys = new Set();
    // Préférence swap persistée (false = défaut : move à droite, fire à gauche)
    this.swapped  = JSON.parse(localStorage.getItem('tc-swapped') || 'false');
  }

  // ── API publique ────────────────────────────────────────

  /**
   * Monte les contrôles tactiles dans le viewer.
   * @param {HTMLIFrameElement} iframe
   * @param {{ dpad: boolean, fire: boolean }|null} config
   */
  mount(iframe, config) {
    this.unmount();
    if (!IS_TOUCH || !config) return;

    this.iframe = iframe;

    const overlay = document.createElement('div');
    overlay.className = 'tc-overlay' + (this.swapped ? ' tc-swapped' : '');

    // Panneau mouvement (D-pad + Joystick)
    const movePanel = document.createElement('div');
    movePanel.className = 'tc-move';
    if (config.dpad) {
      movePanel.appendChild(this._buildDpad());
      movePanel.appendChild(this._buildJoystick());
    }

    // Panneau tir
    const firePanel = document.createElement('div');
    firePanel.className = 'tc-fire';
    if (config.fire) {
      firePanel.appendChild(this._buildFireBtn());
    }

    // Bouton swap toujours présent
    overlay.appendChild(movePanel);
    overlay.appendChild(firePanel);
    overlay.appendChild(this._buildSwapBtn(overlay));

    // Inséré dans #viewer-body par-dessus l'iframe
    iframe.parentNode.appendChild(overlay);
    this.overlay = overlay;
  }

  /** Cache / montre l'overlay (ex: mode Comprendre). */
  setVisible(visible) {
    if (this.overlay) this.overlay.classList.toggle('hidden', !visible);
  }

  /** Démonte et libère toutes les touches maintenues. */
  unmount() {
    if (this.overlay) {
      this.heldKeys.forEach(k => this._releaseKey(k));
      this.overlay.remove();
      this.overlay = null;
    }
    this.iframe = null;
  }

  // ── Builders ───────────────────────────────────────────

  /** Croix directionnelle (visible en portrait). */
  _buildDpad() {
    const dpad = document.createElement('div');
    dpad.className = 'tc-dpad';

    [
      { key: 'z', label: '▲', cls: 'tc-btn--top'    },
      { key: 'q', label: '◀', cls: 'tc-btn--left'   },
      { key: 'd', label: '▶', cls: 'tc-btn--right'  },
      { key: 's', label: '▼', cls: 'tc-btn--bottom' },
    ].forEach(({ key, label, cls }) => {
      dpad.appendChild(this._buildKeyBtn(label, cls, key));
    });

    return dpad;
  }

  /** Joystick analogique (visible en landscape). */
  _buildJoystick() {
    const outer = document.createElement('div');
    outer.className = 'tc-joystick';

    const knob = document.createElement('div');
    knob.className = 'tc-joystick-knob';
    outer.appendChild(knob);

    const MAX  = 42;    // px max du knob depuis le centre
    const DEAD = 10;    // zone morte px
    let ox = 0, oy = 0; // origin du touch

    outer.addEventListener('pointerdown', e => {
      e.preventDefault();
      outer.setPointerCapture(e.pointerId);
      const r = outer.getBoundingClientRect();
      ox = r.left + r.width  / 2;
      oy = r.top  + r.height / 2;
      this._moveJoystick(e.clientX - ox, e.clientY - oy, knob, MAX, DEAD);
    }, { passive: false });

    outer.addEventListener('pointermove', e => {
      if (!outer.hasPointerCapture(e.pointerId)) return;
      e.preventDefault();
      this._moveJoystick(e.clientX - ox, e.clientY - oy, knob, MAX, DEAD);
    }, { passive: false });

    const reset = e => {
      e.preventDefault();
      knob.style.transform = 'translate(-50%, -50%)';
      ['z', 's', 'q', 'd'].forEach(k => this._releaseKey(k));
    };
    outer.addEventListener('pointerup',     reset, { passive: false });
    outer.addEventListener('pointercancel', reset, { passive: false });

    return outer;
  }

  /** Déplace le knob et calcule les touches correspondantes. */
  _moveJoystick(dx, dy, knob, max, dead) {
    const dist  = Math.hypot(dx, dy);
    const ratio = Math.min(dist, max) / (dist || 1);
    knob.style.transform =
      `translate(calc(-50% + ${dx * ratio}px), calc(-50% + ${dy * ratio}px))`;

    if (dist < dead) {
      ['z', 's', 'q', 'd'].forEach(k => this._releaseKey(k));
      return;
    }

    const nx = dx / dist; // -1 → 1
    const ny = dy / dist; // -1 → 1
    const T  = 0.38;      // seuil de déclenchement

    nx < -T ? this._pressKey('q') : this._releaseKey('q');
    nx >  T ? this._pressKey('d') : this._releaseKey('d');
    ny < -T ? this._pressKey('z') : this._releaseKey('z'); // haut = y négatif
    ny >  T ? this._pressKey('s') : this._releaseKey('s');
  }

  /** Bouton de tir (grand cercle rouge). */
  _buildFireBtn() {
    const btn = document.createElement('button');
    btn.className = 'tc-btn tc-btn--fire';
    btn.textContent = '●';
    btn.setAttribute('aria-label', 'Tir');
    btn.addEventListener('pointerdown', e => {
      e.preventDefault();
      btn.setPointerCapture(e.pointerId);
      this._fireMouse('mousedown');
      if ('vibrate' in navigator) navigator.vibrate(30);
    }, { passive: false });
    btn.addEventListener('pointerup',     e => { e.preventDefault(); this._fireMouse('mouseup');   }, { passive: false });
    btn.addEventListener('pointercancel', e => { e.preventDefault(); this._fireMouse('mouseup');   }, { passive: false });
    return btn;
  }

  /** Bouton ⇄ pour inverser gauche / droite. */
  _buildSwapBtn(overlay) {
    const btn = document.createElement('button');
    btn.className = 'tc-btn tc-btn--swap';
    btn.textContent = '⇄';
    btn.setAttribute('aria-label', 'Inverser les contrôles');
    btn.addEventListener('pointerdown', e => {
      e.preventDefault();
      this.swapped = !this.swapped;
      localStorage.setItem('tc-swapped', JSON.stringify(this.swapped));
      overlay.classList.toggle('tc-swapped', this.swapped);
    }, { passive: false });
    return btn;
  }

  /** Bouton discret pour le D-pad. */
  _buildKeyBtn(label, cls, key) {
    const btn = document.createElement('button');
    btn.className = `tc-btn ${cls}`;
    btn.textContent = label;
    btn.setAttribute('aria-label', key);
    btn.addEventListener('pointerdown', e => {
      e.preventDefault();
      btn.setPointerCapture(e.pointerId);
      this._pressKey(key);
    }, { passive: false });
    btn.addEventListener('pointerup',     e => { e.preventDefault(); this._releaseKey(key); }, { passive: false });
    btn.addEventListener('pointercancel', e => { e.preventDefault(); this._releaseKey(key); }, { passive: false });
    return btn;
  }

  // ── Injection dans l'iframe ─────────────────────────────

  _pressKey(key) {
    if (this.heldKeys.has(key)) return;
    this.heldKeys.add(key);
    this.iframe?.contentWindow?.dispatchEvent(
      new KeyboardEvent('keydown', { key, bubbles: true, cancelable: true })
    );
    if ('vibrate' in navigator) navigator.vibrate(18);
  }

  _releaseKey(key) {
    if (!this.heldKeys.has(key)) return;
    this.heldKeys.delete(key);
    this.iframe?.contentWindow?.dispatchEvent(
      new KeyboardEvent('keyup', { key, bubbles: true, cancelable: true })
    );
  }

  _fireMouse(type) {
    if (!this.iframe?.contentWindow) return;
    const r = this.iframe.getBoundingClientRect();
    this.iframe.contentWindow.document.body.dispatchEvent(
      new MouseEvent(type, { bubbles: true, clientX: r.width / 2, clientY: r.height / 2 })
    );
  }

}
