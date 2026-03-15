/**
 * ============================================================
 * LearnKit.js — Moteur pédagogique partagé
 * ============================================================
 *
 * Usage dans un learn.js :
 *
 *   const kit = new LearnKit(canvas, steps, sim);
 *   kit.start();
 *
 * Format d'un step :
 *   {
 *     title: string,
 *     annotation: { text: string, x: number, y: number }, // % du viewport
 *     play: number | Infinity,  // 0 = figé, N = N frames puis pause, Infinity = libre
 *     onEnter(sim) {}           // appelé avant chaque step
 *   }
 *
 * L'objet sim doit exposer :
 *   sim.update(ctx, width, height)  // dessine une frame
 * ============================================================
 */

class LearnKit {

  /**
   * @param {HTMLCanvasElement} canvas
   * @param {Array}             steps
   * @param {Object}            sim   - doit avoir update(ctx, w, h)
   */
  constructor(canvas, steps, sim) {
    this._canvas  = canvas;
    this._ctx     = canvas.getContext('2d');
    this._steps   = steps;
    this._sim     = sim;
    this._current = 0;
    this._frameCount = 0;
    this._rafId   = null;
    this._running = false;
    this._root    = null;
  }

  /** Lance le moteur depuis le step 0. */
  start() {
    this._buildUI();
    this._goTo(0);
  }

  // ── Navigation ─────────────────────────────────────────

  _goTo(index) {
    const n = this._steps.length;
    this._current = ((index % n) + n) % n;
    const step = this._steps[this._current];

    this._stopLoop();
    this._frameCount = 0;

    if (step.onEnter) step.onEnter(this._sim);

    this._updateUI();

    if (step.play === 0) {
      // Step figé — une seule frame pour afficher l'état initial
      this._sim.update(this._ctx, this._canvas.width, this._canvas.height);
    } else {
      this._startLoop();
    }
  }

  // ── Boucle RAF ─────────────────────────────────────────

  _startLoop() {
    this._running = true;
    const step = this._steps[this._current];

    const tick = () => {
      if (!this._running) return;

      this._sim.update(this._ctx, this._canvas.width, this._canvas.height);
      this._frameCount++;

      if (step.play !== Infinity && this._frameCount >= step.play) {
        this._stopLoop();
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

  // ── Construction de l'UI ────────────────────────────────

  _buildUI() {
    const root = document.createElement('div');
    root.id = 'lk-root';
    root.innerHTML = `
      <div class="lk-annotation" id="lk-annotation">
        <div class="lk-annotation-step" id="lk-step-badge"></div>
        <div class="lk-annotation-title" id="lk-title"></div>
        <div class="lk-annotation-text" id="lk-text"></div>
      </div>
      <nav class="lk-nav">
        <button class="lk-btn" id="lk-prev" title="Étape précédente">◀</button>
        <span class="lk-counter" id="lk-counter"></span>
        <button class="lk-btn" id="lk-next" title="Étape suivante">▶</button>
      </nav>
    `;
    document.body.appendChild(root);
    this._root = root;

    document.getElementById('lk-prev').addEventListener('click', () => this._goTo(this._current - 1));
    document.getElementById('lk-next').addEventListener('click', () => this._goTo(this._current + 1));
  }

  _updateUI() {
    const step = this._steps[this._current];
    const n = this._steps.length;
    const i = this._current;

    document.getElementById('lk-step-badge').textContent = `étape ${i + 1} / ${n}`;
    document.getElementById('lk-title').textContent      = step.title;
    document.getElementById('lk-text').textContent       = step.annotation.text;
    document.getElementById('lk-counter').textContent    = `${i + 1} / ${n}`;

    const ann = document.getElementById('lk-annotation');
    ann.style.left = step.annotation.x + '%';
    ann.style.top  = step.annotation.y + '%';
  }

}
