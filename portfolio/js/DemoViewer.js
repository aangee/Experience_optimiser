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
 * Si un projet a un tableau "versions", des pills apparaissent
 * dans la barre du haut pour naviguer entre les versions.
 *
 * Pourquoi vider l'iframe à la fermeture ?
 *   Les démos canvas tournent en boucle requestAnimationFrame().
 *   Sans ça, elles continuent en arrière-plan → gaspillage CPU.
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

    // État courant
    this.mode    = 'jouer';
    this.project = null;

    // ── Événements ──────────────────────────────────────────
    this.closeBtn.addEventListener('click', () => this.close());

    // Touche Échap → fermer
    document.addEventListener('keydown', e => {
      if (e.key === 'Escape') this.close();
    });

    // Bascule Jouer ↔ Comprendre
    this.modeToggle.addEventListener('click', () => {
      this.setMode(this.mode === 'jouer' ? 'comprendre' : 'jouer');
    });

    // Bouton "Retour à Jouer" dans le panneau Comprendre
    this.backBtn.addEventListener('click', () => this.setMode('jouer'));

    // Toggle plier / déplier le bandeau contrôles
    this.controlsToggle.addEventListener('click', () => {
      this.controlsBar.classList.toggle('controls-bar--collapsed');
      this.controlsToggle.textContent =
        this.controlsBar.classList.contains('controls-bar--collapsed') ? '▸' : '▾';
    });
  }

  // ── API publique ─────────────────────────────────────────

  /**
   * Ouvre le viewer avec un projet donné.
   * @param {Object} project - objet de ProjectData.js
   */
  open(project) {
    this.project = project;

    // Titre dans la barre du haut
    this.titleEl.textContent = project.name;

    // Charge la démo dans l'iframe
    this.iframe.src = project.iframeSrc;

    // Construit le bandeau de contrôles
    this._renderControls(project.controls || []);

    // Construit les pills de version si besoin
    this._renderVersions(project.versions || []);

    // Remet toujours en mode Jouer à l'ouverture
    this.mode = null; // force le recalcul dans setMode
    this.setMode('jouer');

    // Affiche l'overlay
    this.overlay.classList.remove('hidden');
    document.body.style.overflow = 'hidden';
  }

  /**
   * Ferme le viewer et stoppe la démo.
   */
  close() {
    this.overlay.classList.add('hidden');
    this.iframe.src = '';             // IMPORTANT : stoppe la boucle d'animation
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

    // Met à jour l'attribut data-mode sur le bouton (utilisé par le CSS pour le style actif)
    this.modeToggle.dataset.mode = mode;

    // Affiche iframe ou panneau Comprendre
    this.iframe.classList.toggle('hidden', !isJouer);
    this.comprendreEl.classList.toggle('hidden', isJouer);

    // Bandeau contrôles visible seulement en mode Jouer
    this.controlsBar.classList.toggle('hidden', !isJouer);
  }

  // ── Privé ────────────────────────────────────────────────

  /**
   * Affiche les pills de version si le projet en a.
   * La version active est celle dont le src correspond à project.iframeSrc.
   * @param {Array<{label, src, controls}>} versions
   */
  _renderVersions(versions) {
    this.versionsEl.innerHTML = '';

    if (versions.length === 0) {
      this.versionsEl.classList.add('hidden');
      return;
    }

    this.versionsEl.classList.remove('hidden');

    versions.forEach(version => {
      const btn = document.createElement('button');
      btn.className = 'version-btn';
      btn.textContent = version.label;

      // Marque comme active la version correspondant à iframeSrc
      if (version.src === this.project.iframeSrc) {
        btn.classList.add('version-btn--active');
      }

      btn.addEventListener('click', () => this._switchVersion(version));
      this.versionsEl.appendChild(btn);
    });
  }

  /**
   * Bascule vers une version différente du même projet.
   * @param {{label, src, controls}} version
   */
  _switchVersion(version) {
    // Recharge l'iframe avec la nouvelle source
    this.iframe.src = version.src;

    // Met à jour les contrôles (fallback sur les contrôles du projet)
    this._renderControls(version.controls || this.project.controls || []);

    // Met à jour le pill actif
    this.versionsEl.querySelectorAll('.version-btn').forEach(btn => {
      btn.classList.toggle('version-btn--active', btn.textContent === version.label);
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

    // Remet la barre visible et dépliée
    this.controlsBar.classList.remove('hidden');
    this.controlsBar.classList.remove('controls-bar--collapsed');
    this.controlsToggle.textContent = '▾';
  }

}
