/**
 * ============================================================
 * LearnMode.js
 * ============================================================
 * Overlay d'annotations pour le mode "Comprendre".
 *
 * Monte un calque transparent par-dessus l'iframe :
 *   - une bulle de texte positionnée en % de la zone
 *   - une ligne pointillée SVG vers la zone annotée
 *   - un cercle + point cible
 *   - une barre de navigation ◀ n/total ▶
 *
 * L'animation de l'iframe est gelée à l'entrée en mode Comprendre
 * en remplaçant son requestAnimationFrame par une version no-op
 * (compatible toutes démos, sans modifier les fichiers source).
 *
 * Usage :
 *   const learn = new LearnMode(bodyEl);
 *   learn.mount(stepsArray, iframeEl);  // gèle + affiche step 0
 *   learn.unmount();                    // dégèle + retire l'overlay
 *
 * Format d'un step :
 *   {
 *     title:  string,
 *     text:   string,
 *     target: { x: number, y: number },   // % de la zone
 *     bubble: { x: number, y: number }    // % de la zone
 *   }
 * ============================================================
 */

class LearnMode {

  constructor(bodyEl) {
    this._body    = bodyEl;
    this._overlay = null;
    this._iframe  = null;
    this._steps   = [];
    this._current = 0;
  }

  // ── API publique ─────────────────────────────────────────

  mount(steps, iframeEl = null) {
    this.unmount();
    this._steps   = steps;
    this._current = 0;
    this._iframe  = iframeEl;
    this._pauseAnimation();
    this._build();
    this._goTo(0);
  }

  unmount() {
    if (this._overlay) {
      this._overlay.remove();
      this._overlay = null;
    }
    this._resumeAnimation();
    this._iframe = null;
  }

  // ── Animation pause / resume ─────────────────────────────

  /**
   * Gèle visuellement l'iframe en deux temps :
   *
   * 1. Snapshot canvas → <img> posé par-dessus l'iframe.
   *    Garanti instantané, indépendant de l'implémentation de la démo.
   *
   * 2. Tentative de freeze RAF (bonus CPU) : remplace requestAnimationFrame
   *    par un no-op qui stocke le dernier callback pour pouvoir reprendre.
   *    Si l'accès contentWindow échoue, le snapshot suffit quand même.
   */
  _pauseAnimation() {
    this._snapshot = null;
    try {
      const doc = this._iframe?.contentDocument;
      const canvas = doc?.querySelector('canvas');
      if (canvas) {
        const img = document.createElement('img');
        img.src = canvas.toDataURL();
        img.className = 'learn-snapshot';
        this._body.appendChild(img);
        this._snapshot = img;
      }
    } catch (_) {}

    try {
      const win = this._iframe?.contentWindow;
      if (!win || win._learnPaused) return;
      const orig = win.requestAnimationFrame.bind(win);
      win._learnOrigRAF = orig;
      win._learnLastCb  = null;
      win._learnPaused  = true;
      win.requestAnimationFrame = (cb) => { win._learnLastCb = cb; return 0; };
    } catch (_) {}
  }

  /**
   * Retire le snapshot et relance la boucle RAF si elle avait été gelée.
   */
  _resumeAnimation() {
    if (this._snapshot) {
      this._snapshot.remove();
      this._snapshot = null;
    }
    try {
      const win = this._iframe?.contentWindow;
      if (!win || !win._learnPaused) return;
      const orig = win._learnOrigRAF;
      const cb   = win._learnLastCb;
      win.requestAnimationFrame = orig;
      delete win._learnOrigRAF;
      delete win._learnLastCb;
      delete win._learnPaused;
      if (cb) orig(cb);
    } catch (_) {}
  }

  // ── Privé ────────────────────────────────────────────────

  _build() {
    const el = document.createElement('div');
    el.className = 'learn-overlay';
    el.innerHTML = `
      <svg class="learn-svg" xmlns="http://www.w3.org/2000/svg"></svg>
      <div class="learn-bubble">
        <div class="learn-bubble-header">
          <span class="learn-step-badge"></span>
          <h3 class="learn-bubble-title"></h3>
        </div>
        <p class="learn-bubble-text"></p>
      </div>
      <nav class="learn-nav">
        <button class="learn-btn learn-prev" title="Étape précédente">◀</button>
        <span class="learn-counter"></span>
        <button class="learn-btn learn-next" title="Étape suivante">▶</button>
      </nav>
    `;
    this._body.appendChild(el);
    this._overlay = el;

    el.querySelector('.learn-prev').addEventListener('click', () => this._goTo(this._current - 1));
    el.querySelector('.learn-next').addEventListener('click', () => this._goTo(this._current + 1));
  }

  _goTo(index) {
    const n = this._steps.length;
    this._current = ((index % n) + n) % n;
    const step = this._steps[this._current];

    // Contenu de la bulle
    this._overlay.querySelector('.learn-step-badge').textContent   = `${this._current + 1} / ${n}`;
    this._overlay.querySelector('.learn-bubble-title').textContent = step.title;
    this._overlay.querySelector('.learn-bubble-text').textContent  = step.text;
    this._overlay.querySelector('.learn-counter').textContent      = `${this._current + 1} / ${n}`;

    // Position de la bulle
    const bubble = this._overlay.querySelector('.learn-bubble');
    bubble.style.left = `${step.bubble.x}%`;
    bubble.style.top  = `${step.bubble.y}%`;

    // Ligne SVG — après le prochain rendu pour avoir les dimensions réelles
    requestAnimationFrame(() => this._drawLine(step));
  }

  _drawLine(step) {
    if (!this._overlay) return;

    const svg   = this._overlay.querySelector('.learn-svg');
    const oRect = this._overlay.getBoundingClientRect();
    const bRect = this._overlay.querySelector('.learn-bubble').getBoundingClientRect();

    const W = oRect.width;
    const H = oRect.height;

    // Centre de la bulle (coordonnées relatives à l'overlay)
    const bx = bRect.left - oRect.left + bRect.width  / 2;
    const by = bRect.top  - oRect.top  + bRect.height / 2;

    // Point cible (en px)
    const tx = (step.target.x / 100) * W;
    const ty = (step.target.y / 100) * H;

    svg.setAttribute('viewBox', `0 0 ${W} ${H}`);
    svg.innerHTML = `
      <line
        x1="${bx}" y1="${by}" x2="${tx}" y2="${ty}"
        style="stroke:var(--accent-dim);stroke-width:1.5;stroke-dasharray:5 4;opacity:0.5"
      />
      <circle cx="${tx}" cy="${ty}" r="22"
        style="fill:none;stroke:var(--accent);stroke-width:1.5;opacity:0.6"
      />
      <circle cx="${tx}" cy="${ty}" r="4"
        style="fill:var(--accent);opacity:0.85"
      />
    `;
  }

}
