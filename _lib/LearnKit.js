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
 *     target:     { x: number, y: number } | null,        // cercle indicateur, % du canvas
 *     play: number | Infinity,  // 0 = figé, N = N frames puis pause, Infinity = libre
 *     onEnter(sim) {}           // appelé avant chaque step
 *   }
 *
 * Comportement :
 *   - L'animation joue `play` frames puis se fige (canvas gardé tel quel).
 *   - Si `target` est défini, un cercle indicateur est dessiné sur le canvas
 *     à chaque frame (et sur la frame figée), pour indiquer "c'est ici".
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
      // Step figé — une seule frame
      this._drawFrame(step);
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

      this._drawFrame(step);
      this._frameCount++;

      if (step.play !== Infinity && this._frameCount >= step.play) {
        this._stopLoop();
        // Dernière frame figée : redessine avec indicateur visible
        this._drawFrame(step);
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

  // ── Dessin d'une frame ──────────────────────────────────

  /** Appelle sim.update puis superpose l'indicateur de cible si défini. */
  _drawFrame(step) {
    const ctx = this._ctx;
    const w   = this._canvas.width;
    const h   = this._canvas.height;

    this._sim.update(ctx, w, h);

    if (step.target) {
      const tx = (step.target.x / 100) * w;
      const ty = (step.target.y / 100) * h;

      ctx.save();

      // Halo extérieur
      ctx.beginPath();
      ctx.arc(tx, ty, 26, 0, Math.PI * 2);
      ctx.strokeStyle = 'rgba(100, 180, 255, 0.55)';
      ctx.lineWidth = 2;
      ctx.stroke();

      // Cercle intérieur
      ctx.beginPath();
      ctx.arc(tx, ty, 14, 0, Math.PI * 2);
      ctx.strokeStyle = 'rgba(100, 180, 255, 0.85)';
      ctx.lineWidth = 1.5;
      ctx.stroke();

      // Point central
      ctx.beginPath();
      ctx.arc(tx, ty, 3.5, 0, Math.PI * 2);
      ctx.fillStyle = 'rgba(140, 200, 255, 0.95)';
      ctx.fill();

      ctx.restore();
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
