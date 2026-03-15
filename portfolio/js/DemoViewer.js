/**
 * ============================================================
 * DemoViewer.js
 * ============================================================
 * Gère la fenêtre plein-écran d'une démo.
 *
 * Deux modes :
 *   "jouer"      → iframe plein écran + bandeau contrôles en bas
 *   "comprendre" → panneau explicatif (placeholder Phase 3)
 *
 * Si un projet a un tableau "versions", un <select> apparaît
 * dans la barre du haut pour naviguer entre les versions.
 * open(project, versionLabel) permet d'ouvrir directement
 * une version précise (ex. depuis la timeline).
 *
 * Sur appareil tactile, TouchControls monte un overlay D-pad /
 * joystick par-dessus l'iframe si la version a une config touch.
 * ============================================================
 */

class DemoViewer {

  constructor() {
    // Éléments HTML
    this.overlay        = document.getElementById('viewer');
    this.iframe         = document.getElementById('viewer-iframe');
    this.titleEl        = document.getElementById('viewer-title');
    this.versionsEl     = document.getElementById('viewer-versions');
    this.closeBtn       = document.getElementById('viewer-close');
    this.modeToggle     = document.getElementById('viewer-mode-toggle');
    this.comprendreEl   = document.getElementById('viewer-comprendre');
    this.controlsBar    = document.getElementById('controls-bar');
    this.controlsList   = document.getElementById('controls-list');
    this.controlsToggle = document.getElementById('controls-toggle');
    this.backBtn        = document.getElementById('btn-back-jouer');

    // Contrôles tactiles (opérationnel seulement sur touch device)
    this.touch = new TouchControls();

    // LearnMode conservé en stub no-op pour compatibilité
    this.learn = new LearnMode();

    // État courant
    this.mode            = 'jouer';
    this.project         = null;
    this._currentVersion = null;   // version active (objet ou null si pas de versions)
    this._currentSrc     = '';

    // ── Événements ──────────────────────────────────────────
    this.closeBtn.addEventListener('click', () => this.close());

    document.addEventListener('keydown', e => {
      if (e.key === 'Escape') this.close();
    });

    this.modeToggle.addEventListener('click', () => {
      this.setMode(this.mode === 'jouer' ? 'comprendre' : 'jouer');
    });

    this.backBtn.addEventListener('click', () => this.setMode('jouer'));

    this.controlsToggle.addEventListener('click', () => {
      this.controlsBar.classList.toggle('controls-bar--collapsed');
      this.controlsToggle.textContent =
        this.controlsBar.classList.contains('controls-bar--collapsed') ? '▸' : '▾';
    });

    this.versionsEl.addEventListener('change', () => {
      if (!this.project?.versions) return;
      this._switchVersion(this.project.versions[parseInt(this.versionsEl.value)]);
    });
  }

  // ── API publique ─────────────────────────────────────────

  /**
   * Ouvre le viewer avec un projet donné.
   * @param {Object} project      - objet de ProjectData.js
   * @param {string} versionLabel - (optionnel) version à afficher d'emblée
   */
  open(project, versionLabel = null) {
    this.project = project;
    this.titleEl.textContent = project.name;

    // Détermine la version initiale
    const version = this._resolveVersion(project, versionLabel);
    this._currentVersion = version;
    const src      = version?.src      ?? project.iframeSrc;
    const controls = version?.controls ?? project.controls ?? [];
    const touch    = version?.touch    ?? null;

    this._currentSrc = src;
    this.iframe.src  = src;
    this._renderControls(controls);
    this._renderVersions(project.versions ?? [], src);
    this.touch.mount(this.iframe, touch);

    this.mode = null;
    this.setMode('jouer');

    this.overlay.classList.remove('hidden');
    document.body.style.overflow = 'hidden';
  }

  /** Ferme le viewer et stoppe la démo. */
  close() {
    this.touch.unmount();
    this.overlay.classList.add('hidden');
    this.iframe.src = '';
    document.body.style.overflow = '';
    this.project = null;
  }

  /**
   * Bascule entre les modes 'jouer' et 'comprendre'.
   * @param {'jouer'|'comprendre'} mode
   */
  setMode(mode) {
    if (this.mode === mode) return;
    this.mode = mode;

    const isJouer = mode === 'jouer';
    this.modeToggle.dataset.mode = mode;
    this.controlsBar.classList.toggle('hidden', !isJouer);
    this.touch.setVisible(isJouer);

    if (isJouer) {
      this.learn.unmount();
      this.comprendreEl.classList.add('hidden');
      this.iframe.src = this._currentSrc;
      this.iframe.classList.remove('hidden');
    } else {
      // learnSrc : version en priorité, sinon carte, sinon placeholder
      const learnSrc = this._currentVersion?.learnSrc ?? this.project?.learnSrc;
      if (learnSrc) {
        this.iframe.src = learnSrc;
        this.iframe.classList.remove('hidden');
        this.comprendreEl.classList.add('hidden');
      } else {
        // Pas de learnSrc : placeholder Phase 3
        this.iframe.classList.add('hidden');
        this.comprendreEl.classList.remove('hidden');
      }
    }
  }

  // ── Privé ────────────────────────────────────────────────

  /**
   * Retourne la version à charger en priorité.
   * Si versionLabel est fourni → cherche cette version.
   * Sinon → dernière version du tableau (la plus récente).
   */
  _resolveVersion(project, versionLabel) {
    if (!project.versions) return null;
    if (versionLabel) {
      const found = project.versions.find(v => v.label === versionLabel);
      if (found) return found;
    }
    // Par défaut : dernière version (= iframeSrc de la racine)
    return project.versions[project.versions.length - 1];
  }

  /** Bascule vers une version différente du même projet. */
  _switchVersion(version) {
    this._currentVersion = version;
    this._currentSrc     = version.src;
    this._renderControls(version.controls || this.project.controls || []);
    this.touch.mount(this.iframe, version.touch || null);

    if (this.mode === 'comprendre') {
      const learnSrc = version.learnSrc ?? this.project?.learnSrc;
      if (learnSrc) {
        this.iframe.src = learnSrc;
        this.iframe.classList.remove('hidden');
        this.comprendreEl.classList.add('hidden');
      } else {
        this.iframe.classList.add('hidden');
        this.comprendreEl.classList.remove('hidden');
      }
    } else {
      this.iframe.src = version.src;
    }
  }

  /**
   * Peuple le <select> de version ou le cache s'il n'y a pas de versions.
   * @param {Array} versions
   * @param {string} activeSrc
   */
  _renderVersions(versions, activeSrc) {
    this.versionsEl.innerHTML = '';

    if (versions.length === 0) {
      this.versionsEl.classList.add('hidden');
      return;
    }

    this.versionsEl.classList.remove('hidden');
    versions.forEach((version, index) => {
      const option = document.createElement('option');
      option.value = index;
      option.textContent = version.label;
      if (version.src === activeSrc) option.selected = true;
      this.versionsEl.appendChild(option);
    });
  }

  /**
   * Remplit le bandeau des contrôles.
   * @param {Array<{key: string, desc: string}>} controls
   */
  _renderControls(controls) {
    this.controlsList.innerHTML = '';

    if (controls.length === 0) {
      this.controlsBar.classList.add('hidden');
      return;
    }

    controls.forEach(({ key, desc }) => {
      const item = document.createElement('div');
      item.className = 'control-item';
      item.innerHTML = `<kbd>${key}</kbd><span>${desc}</span>`;
      this.controlsList.appendChild(item);
    });

    this.controlsBar.classList.remove('hidden');
    this.controlsBar.classList.remove('controls-bar--collapsed');
    this.controlsToggle.textContent = '▾';
  }

}
