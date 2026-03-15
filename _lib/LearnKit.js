/**
 * ============================================================
 * LearnKit.js — Moteur pédagogique deux colonnes
 * ============================================================
 *
 * Format d'un step :
 *   {
 *     title    : string,
 *     text     : string,
 *     target   : { x: number, y: number } | null,   // % du canvas
 *     play     : number | Infinity,  // 0 = figé, N frames puis pause
 *     onEnter(sim) {}
 *   }
 *
 * Comportement :
 *   - L'animation joue librement pendant `play` frames.
 *   - Quand elle se fige, le cercle-cible (.lk-target) apparaît
 *     positionné au bon endroit sur le canvas.
 *   - La bulle d'annotation est dans le panneau latéral : pas
 *     d'overlay, pas de SVG, pas de ligne flottante.
 *
 * HTML attendu dans learn.html :
 *   .lk-canvas-wrap > canvas#canvas + div.lk-target#lk-target
 *   .lk-panel-inner > #lk-step-badge #lk-title #lk-text #lk-counter
 *   button#lk-prev  button#lk-next
 *
 * sim doit exposer : sim.update(ctx, width, height)
 * ============================================================
 */

class LearnKit {

  constructor(canvas, steps, sim) {
    this._canvas      = canvas;
    this._ctx         = canvas.getContext('2d');
    this._steps       = steps;
    this._sim         = sim;
    this._current     = 0;
    this._frameCount  = 0;
    this._rafId       = null;
    this._running     = false;
    this._targetEl    = null;
  }

  // ── Démarrage ───────────────────────────────────────────────

  start() {
    this._targetEl = document.getElementById('lk-target');

    document.getElementById('lk-prev')
      .addEventListener('click', () => this._goTo(this._current - 1));
    document.getElementById('lk-next')
      .addEventListener('click', () => this._goTo(this._current + 1));

    // Resize : recalcule le canvas et replace la cible si visible
    window.addEventListener('resize', () => {
      this._sizeCanvas();
      const step = this._steps[this._current];
      if (!this._running && step && step.target) this._showTarget(step);
    });

    this._sizeCanvas();
    this._goTo(0);
  }

  // ── Canvas ──────────────────────────────────────────────────

  _sizeCanvas() {
    const wrap = this._canvas.parentElement;
    this._canvas.width  = wrap.clientWidth;
    this._canvas.height = wrap.clientHeight;
  }

  // ── Navigation ──────────────────────────────────────────────

  _goTo(index) {
    const n = this._steps.length;
    this._current = ((index % n) + n) % n;
    const step = this._steps[this._current];

    this._stopLoop();
    this._hideTarget();
    this._frameCount = 0;

    if (step.onEnter) step.onEnter(this._sim);
    this._updateUI();

    if (step.play === 0) {
      // Figé : dessine le frame initial, montre la cible tout de suite
      this._sim.update(this._ctx, this._canvas.width, this._canvas.height);
      if (step.target) this._showTarget(step);
    } else {
      this._startLoop();
    }
  }

  // ── Boucle RAF ──────────────────────────────────────────────

  _startLoop() {
    this._running = true;
    const step = this._steps[this._current];

    const tick = () => {
      if (!this._running) return;

      this._sim.update(this._ctx, this._canvas.width, this._canvas.height);
      this._frameCount++;

      if (step.play !== Infinity && this._frameCount >= step.play) {
        this._stopLoop();
        if (step.target) this._showTarget(step);
        return;
      }

      this._rafId = requestAnimationFrame(tick);
    };

    this._rafId = requestAnimationFrame(tick);
  }

  _stopLoop() {
    this._running = false;
    if (this._rafId !== null) {
      cancelAnimationFrame(this._rafId);
      this._rafId = null;
    }
  }

  // ── Cercle cible ────────────────────────────────────────────

  _showTarget(step) {
    if (!this._targetEl || !step.target) return;
    const tx = (step.target.x / 100) * this._canvas.width;
    const ty = (step.target.y / 100) * this._canvas.height;
    this._targetEl.style.left    = tx + 'px';
    this._targetEl.style.top     = ty + 'px';
    this._targetEl.style.display = 'block';
  }

  _hideTarget() {
    if (this._targetEl) this._targetEl.style.display = 'none';
  }

  // ── UI ──────────────────────────────────────────────────────

  _updateUI() {
    const step = this._steps[this._current];
    const n    = this._steps.length;
    const i    = this._current;

    document.getElementById('lk-step-badge').textContent = `étape ${i + 1} / ${n}`;
    document.getElementById('lk-title').textContent      = step.title;
    document.getElementById('lk-text').textContent       = step.text;
    document.getElementById('lk-counter').textContent    = `${i + 1} / ${n}`;
  }

}
