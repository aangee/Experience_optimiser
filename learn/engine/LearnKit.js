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

    // Cercle pointillé sur une coordonnée canvas
    pointTo(cx, cy, label = '') {
        const labelSVG = label
            ? `<text class="target-label" x="${cx}" y="${cy - 34}" text-anchor="middle">${label}</text>`
            : '';
        this.svgOverlay.innerHTML = `
            <circle class="target-ring" cx="${cx}" cy="${cy}" r="28"/>
            ${labelSVG}
        `;
    }

    // Bord clignotant : side = 'left' | 'right' | 'top' | 'bottom'
    highlightEdge(side, label = '') {
        const W = this.canvas.width;
        const H = this.canvas.height;
        const S = 6;
        let x1, y1, x2, y2, lx, ly, anchor;
        switch (side) {
            case 'right':
                x1 = W-S; y1 = S;   x2 = W-S; y2 = H-S;
                lx = W-S-10; ly = H/2 - 14; anchor = 'end'; break;
            case 'left':
                x1 = S;   y1 = S;   x2 = S;   y2 = H-S;
                lx = S+10; ly = H/2 - 14; anchor = 'start'; break;
            case 'bottom':
                x1 = S;   y1 = H-S; x2 = W-S; y2 = H-S;
                lx = W/2; ly = H-S-14; anchor = 'middle'; break;
            case 'top':
                x1 = S;   y1 = S;   x2 = W-S; y2 = S;
                lx = W/2; ly = S+22; anchor = 'middle'; break;
        }
        const labelSVG = label
            ? `<text class="edge-label" x="${lx}" y="${ly}" text-anchor="${anchor}">${label}</text>`
            : '';
        this.svgOverlay.innerHTML = `
            <line class="edge-highlight" x1="${x1}" y1="${y1}" x2="${x2}" y2="${y2}"/>
            ${labelSVG}
        `;
    }

    // Cadre clignotant sur les 4 bords d'un coup
    highlightAllEdges(label = '') {
        const W = this.canvas.width;
        const H = this.canvas.height;
        const S = 6;
        const labelSVG = label
            ? `<text class="edge-label" x="${W/2}" y="${H/2}" text-anchor="middle">${label}</text>`
            : '';
        this.svgOverlay.innerHTML = `
            <rect class="edge-rect" x="${S}" y="${S}" width="${W - S*2}" height="${H - S*2}"/>
            ${labelSVG}
        `;
    }

    // Flèche directionnelle
    drawArrow(x1, y1, x2, y2, label = '') {
        const mx = (x1 + x2) / 2;
        const my = (y1 + y2) / 2;
        const labelSVG = label
            ? `<text class="arrow-label" x="${mx + 8}" y="${my}" text-anchor="start">${label}</text>`
            : '';
        this.svgOverlay.innerHTML = `
            <defs>
                <marker id="ah" markerWidth="8" markerHeight="6" refX="7" refY="3" orient="auto">
                    <polygon class="arrow-head" points="0 0, 8 3, 0 6"/>
                </marker>
            </defs>
            <line class="arrow-line" x1="${x1}" y1="${y1}" x2="${x2}" y2="${y2}" marker-end="url(#ah)"/>
            ${labelSVG}
        `;
    }

    clearAnnotation() {
        this.svgOverlay.innerHTML = '';
    }

    // ── Privé ────────────────────────────────────────────

    _go(index) {
        const prev = this.steps[this.currentIndex];
        if (prev?.onExit) prev.onExit(this);

        this.currentIndex = index;
        this._applyStep(index);
    }

    _applyStep(index) {
        const step = this.steps[index];

        // Toujours synchroniser l'état de gel avec l'étape courante
        if (step.freeze) this.freeze();
        else             this.unfreeze();

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
