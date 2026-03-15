class LearnKit {

    constructor({ canvasId = 'canvas', steps = [], demoInit }) {
        this.steps = steps;
        this.currentIndex = 0;
        this.frozen = false;
        this.demo = null; // démo peut y attacher ses données

        this.canvas = document.getElementById(canvasId);
        this.svgOverlay = document.getElementById('svg-overlay');

        // Le viewBox du SVG = dimensions logiques du canvas
        this.svgOverlay.setAttribute('viewBox', `0 0 ${this.canvas.width} ${this.canvas.height}`);

        this._buildDots();
        this._bindNav();

        // Initialiser la démo en lui passant le canvas et kit
        if (demoInit) demoInit(this.canvas, this);

        // Afficher la première étape
        this._applyStep(0);
    }

    // ── API publique ─────────────────────────────────────

    freeze()   { this.frozen = true;  }
    unfreeze() { this.frozen = false; }

    next() {
        if (this.currentIndex < this.steps.length - 1)
            this._go(this.currentIndex + 1);
    }

    prev() {
        if (this.currentIndex > 0)
            this._go(this.currentIndex - 1);
    }

    pointTo(cx, cy, label = '') {
        const labelSVG = label
            ? `<text class="target-label" x="${cx}" y="${cy - 34}" text-anchor="middle">${label}</text>`
            : '';
        this.svgOverlay.innerHTML = `
            <circle class="target-ring" cx="${cx}" cy="${cy}" r="28"/>
            ${labelSVG}
        `;
    }

    clearAnnotation() {
        this.svgOverlay.innerHTML = '';
    }

    // ── Privé ────────────────────────────────────────────

    _go(index) {
        const prev = this.steps[this.currentIndex];
        if (prev?.onExit)  prev.onExit(this);
        if (prev?.freeze)  this.unfreeze();

        this.currentIndex = index;
        this._applyStep(index);
    }

    _applyStep(index) {
        const step = this.steps[index];

        // Gel de l'animation
        if (step.freeze) this.freeze();

        // Annotation SVG
        if (step.target) this.pointTo(step.target.x, step.target.y, step.target.label || '');
        else             this.clearAnnotation();

        // Contenu panneau
        document.getElementById('step-counter').textContent =
            `Étape ${index + 1} / ${this.steps.length}`;
        document.getElementById('step-title').textContent   = step.title;
        document.getElementById('step-text').innerHTML      = step.text;

        // Bloc code
        const codeWrap = document.getElementById('step-code');
        if (step.code) {
            codeWrap.style.display = '';
            codeWrap.querySelector('pre').innerHTML = this._renderCode(step.code, step.highlight);
        } else {
            codeWrap.style.display = 'none';
        }

        // Dots
        document.querySelectorAll('#step-dots .dot').forEach((d, i) => {
            d.classList.toggle('active', i === index);
        });

        // Boutons
        document.getElementById('btn-prev').disabled = (index === 0);
        document.getElementById('btn-next').disabled = (index === this.steps.length - 1);

        // Hook onEnter
        if (step.onEnter) step.onEnter(this);
    }

    _renderCode(code, highlight) {
        const esc = s => s
            .replace(/&/g, '&amp;')
            .replace(/</g, '&lt;')
            .replace(/>/g, '&gt;');

        return code.split('\n').map(line => {
            const escaped = esc(line);
            if (highlight && line.includes(highlight))
                return `<span class="hl">${escaped}</span>`;
            return escaped;
        }).join('\n');
    }

    _buildDots() {
        const dotsEl = document.getElementById('step-dots');
        dotsEl.innerHTML = '';
        this.steps.forEach((_, i) => {
            const dot = document.createElement('div');
            dot.className = 'dot';
            dot.addEventListener('click', () => this._go(i));
            dotsEl.appendChild(dot);
        });
    }

    _bindNav() {
        document.getElementById('btn-prev').addEventListener('click', () => this.prev());
        document.getElementById('btn-next').addEventListener('click', () => this.next());
    }
}
