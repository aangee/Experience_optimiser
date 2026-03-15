/**
 * ============================================================
 * LearnKit.js — Moteur pédagogique partagé
 * ============================================================
 *
 * Format d'un step :
 *   {
 *     title: string,
 *     annotation: { text: string, x: number, y: number }, // % du viewport
 *     target:     { x: number, y: number } | null,        // % du canvas
 *     play: number | Infinity,  // 0 = figé, N = N frames puis pause, Infinity = libre
 *     onEnter(sim) {}
 *   }
 *
 * Comportement :
 *   - L'animation joue `play` frames librement (pas d'indicateur).
 *   - Quand elle se fige : cercle-cible dessiné sur le canvas +
 *     trait SVG de la bulle vers la cible.
 *
 * sim doit exposer : sim.update(ctx, width, height)
 * ============================================================
 */

class LearnKit {

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
    this._svgEl   = null;
    this._lineTimer = null;
  }

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
    this._clearLine();
    this._frameCount = 0;

    if (step.onEnter) step.onEnter(this._sim);

    this._updateUI();

    if (step.play === 0) {
      // Figé dès le départ — frame initiale + indicateur immédiat
      this._renderFrame(step, false);
      this._scheduleLine(step);
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

      this._renderFrame(step, false);   // animation libre — pas d'indicateur
      this._frameCount++;

      if (step.play !== Infinity && this._frameCount >= step.play) {
        this._stopLoop();
        // Frame finale figée : affiche l'indicateur
        this._renderFrame(step, true);
        this._scheduleLine(step);
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

  // ── Rendu canvas ────────────────────────────────────────

  /**
   * @param {Object}  step
   * @param {boolean} showTarget  — dessine le cercle-cible si true
   */
  _renderFrame(step, showTarget) {
    const ctx = this._ctx;
    const w   = this._canvas.width;
    const h   = this._canvas.height;

    this._sim.update(ctx, w, h);

    if (showTarget && step.target) {
      const tx = (step.target.x / 100) * w;
      const ty = (step.target.y / 100) * h;

      ctx.save();

      ctx.beginPath();
      ctx.arc(tx, ty, 28, 0, Math.PI * 2);
      ctx.strokeStyle = 'rgba(100, 180, 255, 0.45)';
      ctx.lineWidth = 2;
      ctx.stroke();

      ctx.beginPath();
      ctx.arc(tx, ty, 14, 0, Math.PI * 2);
      ctx.strokeStyle = 'rgba(100, 180, 255, 0.80)';
      ctx.lineWidth = 1.5;
      ctx.stroke();

      ctx.beginPath();
      ctx.arc(tx, ty, 3.5, 0, Math.PI * 2);
      ctx.fillStyle = 'rgba(140, 210, 255, 0.95)';
      ctx.fill();

      ctx.restore();
    }
  }

  // ── Trait SVG annotation → cible ───────────────────────

  /**
   * Attend la fin de la transition CSS de la bulle (~380 ms)
   * puis trace le trait SVG de la bulle vers la cible.
   */
  _scheduleLine(step) {
    if (!step.target) return;
    clearTimeout(this._lineTimer);
    this._lineTimer = setTimeout(() => {
      if (this._steps[this._current] === step) this._drawLine(step);
    }, 380);
  }

  _drawLine(step) {
    if (!this._svgEl || !step.target) return;

    const W = this._root.offsetWidth;
    const H = this._root.offsetHeight;

    // Centre de la bulle (coordonnées viewport)
    const ann  = document.getElementById('lk-annotation');
    const rect = ann.getBoundingClientRect();
    const bx   = rect.left + rect.width  / 2;
    const by   = rect.top  + rect.height / 2;

    // Position de la cible sur le canvas = même repère que SVG
    const tx = (step.target.x / 100) * W;
    const ty = (step.target.y / 100) * H;

    this._svgEl.setAttribute('viewBox', `0 0 ${W} ${H}`);
    this._svgEl.innerHTML = `
      <line
        x1="${bx}" y1="${by}" x2="${tx}" y2="${ty}"
        stroke="rgba(100,180,255,0.40)"
        stroke-width="1.5"
        stroke-dasharray="5 4"
      />
    `;
  }

  _clearLine() {
    clearTimeout(this._lineTimer);
    if (this._svgEl) this._svgEl.innerHTML = '';
  }

  // ── UI ─────────────────────────────────────────────────

  _buildUI() {
    const root = document.createElement('div');
    root.id = 'lk-root';
    root.innerHTML = `
      <svg class="lk-svg" id="lk-svg" xmlns="http://www.w3.org/2000/svg"></svg>
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
    this._root  = root;
    this._svgEl = document.getElementById('lk-svg');

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
