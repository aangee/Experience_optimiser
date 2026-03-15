class LearnKit {

    constructor({ canvasId = 'canvas', steps = [], demoInit }) {
        this.steps = steps;
        this.currentIndex = 0;
        this.frozen = false;
        this.showVectors = false;
        this.demo = null;

        this.canvas     = document.getElementById(canvasId);
        this.svgOverlay = document.getElementById('svg-overlay');

        this.svgOverlay.setAttribute('viewBox',
            `0 0 ${this.canvas.width} ${this.canvas.height}`);

        // ── Couches SVG ─────────────────────────────────────
        // Une couche par responsabilité — un seul SVG, plusieurs <g>
        const NS = 'http://www.w3.org/2000/svg';

        // Defs partagées (marker arrowhead) — injecté une seule fois dans le SVG racine
        const defs = document.createElementNS(NS, 'defs');
        defs.innerHTML = `
            <marker id="ah" markerWidth="8" markerHeight="6" refX="7" refY="3" orient="auto">
                <polygon class="arrow-head" points="0 0, 8 3, 0 6"/>
            </marker>`;
        this.svgOverlay.appendChild(defs);

        this._annotLayer   = document.createElementNS(NS, 'g');
        this._annotLayer.id = 'annot';

        this._vectorLayer   = document.createElementNS(NS, 'g');
        this._vectorLayer.id = 'vectors';

        this.svgOverlay.appendChild(this._annotLayer);
        this.svgOverlay.appendChild(this._vectorLayer);

        this._buildDots();
        this._bindNav();

        if (demoInit) demoInit(this.canvas, this);

        this._applyStep(0);
    }

    // ── Navigation ────────────────────────────────────────

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

    // ── Annotations statiques → couche #annot ────────────
    //    Chaque appel remplace le contenu d'#annot.
    //    Les vecteurs live (#vectors) ne sont pas affectés.

    // Cercle pointillé sur une coordonnée canvas
    pointTo(cx, cy, label = '') {
        const lbl = label
            ? `<text class="target-label" x="${cx}" y="${cy - 34}" text-anchor="middle">${label}</text>`
            : '';
        this._annotLayer.innerHTML = `
            <circle class="target-ring" cx="${cx}" cy="${cy}" r="28"/>
            ${lbl}
        `;
    }

    // Marqueur d'émetteur (croix + halo) — vert distinct des annotations jaunes
    markEmitter(x, y, label = '') {
        const S = 10;
        const lbl = label
            ? `<text class="emitter-label" x="${x}" y="${y - S - 10}" text-anchor="middle">${label}</text>`
            : '';
        this._annotLayer.innerHTML = `
            <circle class="emitter-ring"  cx="${x}" cy="${y}" r="${S + 7}"/>
            <line   class="emitter-cross" x1="${x - S}" y1="${y}"     x2="${x + S}" y2="${y}"/>
            <line   class="emitter-cross" x1="${x}"     y1="${y - S}" x2="${x}"     y2="${y + S}"/>
            ${lbl}
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
                x1=W-S; y1=S;   x2=W-S; y2=H-S;
                lx=W-S-10; ly=H/2-14; anchor='end'; break;
            case 'left':
                x1=S;   y1=S;   x2=S;   y2=H-S;
                lx=S+10; ly=H/2-14; anchor='start'; break;
            case 'bottom':
                x1=S;   y1=H-S; x2=W-S; y2=H-S;
                lx=W/2; ly=H-S-14; anchor='middle'; break;
            case 'top':
                x1=S;   y1=S;   x2=W-S; y2=S;
                lx=W/2; ly=S+22; anchor='middle'; break;
        }
        const lbl = label
            ? `<text class="edge-label" x="${lx}" y="${ly}" text-anchor="${anchor}">${label}</text>`
            : '';
        this._annotLayer.innerHTML = `
            <line class="edge-highlight" x1="${x1}" y1="${y1}" x2="${x2}" y2="${y2}"/>
            ${lbl}
        `;
    }

    // Cadre clignotant sur les 4 bords
    highlightAllEdges(label = '') {
        const W = this.canvas.width;
        const H = this.canvas.height;
        const S = 6;
        const lbl = label
            ? `<text class="edge-label" x="${W/2}" y="${H/2}" text-anchor="middle">${label}</text>`
            : '';
        this._annotLayer.innerHTML = `
            <rect class="edge-rect" x="${S}" y="${S}" width="${W-S*2}" height="${H-S*2}"/>
            ${lbl}
        `;
    }

    // Flèche directionnelle unique (ex: gravité, direction initiale)
    drawArrow(x1, y1, x2, y2, label = '') {
        const mx = (x1 + x2) / 2;
        const my = (y1 + y2) / 2;
        const lbl = label
            ? `<text class="arrow-label" x="${mx + 8}" y="${my}" text-anchor="start">${label}</text>`
            : '';
        this._annotLayer.innerHTML = `
            <line class="arrow-line"
                  x1="${x1}" y1="${y1}" x2="${x2}" y2="${y2}"
                  marker-end="url(#ah)"/>
            ${lbl}
        `;
    }

    // Injecte du SVG brut dans #annot (pour les cas sur-mesure des steps.js)
    setAnnotRaw(svgString) {
        this._annotLayer.innerHTML = svgString;
    }

    // Vide uniquement #annot (les vecteurs live restent intacts)
    clearAnnotation() {
        this._annotLayer.innerHTML = '';
    }

    // ── Vecteurs live → couche #vectors ──────────────────
    //    Appelé chaque frame depuis demo.js si kit.showVectors = true.
    //    Dessine une petite flèche par particule dans la direction de (vx, vy).
    //    scale  : multiplie la longueur du vecteur (pixels / unité de vélocité)
    //    maxCount : limite le nombre de flèches pour rester lisible

    drawVelocityVectors(particles, { scale = 12, maxCount = 10 } = {}) {
        const list = particles.slice(0, maxCount);
        let html = '';
        for (const p of list) {
            const vx = p.vx ?? (p.velocity?.getX?.() ?? 0);
            const vy = p.vy ?? (p.velocity?.getY?.() ?? 0);
            const len = Math.sqrt(vx * vx + vy * vy);
            if (len < 0.5) continue;   // vecteur quasi-nul, pas la peine

            const x1 = p.x ?? p.position?.getX?.() ?? 0;
            const y1 = p.y ?? p.position?.getY?.() ?? 0;
            const x2 = x1 + vx * scale;
            const y2 = y1 + vy * scale;

            // Tête de flèche inline (triangle) — pas besoin de <defs>
            const angle = Math.atan2(y2 - y1, x2 - x1);
            const ah = Math.min(6, len * scale * 0.35);
            const ax1 = x2 - Math.cos(angle - 0.45) * ah;
            const ay1 = y2 - Math.sin(angle - 0.45) * ah;
            const ax2 = x2 - Math.cos(angle + 0.45) * ah;
            const ay2 = y2 - Math.sin(angle + 0.45) * ah;

            html += `<line class="vel-line" x1="${x1}" y1="${y1}" x2="${x2}" y2="${y2}"/>`;
            html += `<polygon class="vel-head" points="${x2},${y2} ${ax1},${ay1} ${ax2},${ay2}"/>`;
        }
        this._vectorLayer.innerHTML = html;
    }

    // Vide les vecteurs + désactive le flag
    clearVectors() {
        this._vectorLayer.innerHTML = '';
        this.showVectors = false;
    }

    // ── Privé ────────────────────────────────────────────

    _go(index) {
        const prev = this.steps[this.currentIndex];
        if (prev?.onExit) prev.onExit(this);

        // Nettoyer les deux couches entre les étapes
        this.clearAnnotation();
        this.clearVectors();

        this.currentIndex = index;
        this._applyStep(index);
    }

    _applyStep(index) {
        const step = this.steps[index];

        if (step.freeze) this.freeze();
        else             this.unfreeze();

        // Annotation statique déclarée dans le step (format legacy)
        if (step.target) this.pointTo(step.target.x, step.target.y, step.target.label || '');

        // Contenu panneau
        document.getElementById('step-counter').textContent =
            `Étape ${index + 1} / ${this.steps.length}`;
        document.getElementById('step-title').textContent   = step.title;
        document.getElementById('step-text').innerHTML      = step.text;

        const codeWrap = document.getElementById('step-code');
        if (step.code) {
            codeWrap.style.display = '';
            codeWrap.querySelector('pre').innerHTML =
                this._renderCode(step.code, step.highlight);
        } else {
            codeWrap.style.display = 'none';
        }

        document.querySelectorAll('#step-dots .dot').forEach((d, i) => {
            d.classList.toggle('active', i === index);
        });
        document.getElementById('btn-prev').disabled = (index === 0);
        document.getElementById('btn-next').disabled = (index === this.steps.length - 1);

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
