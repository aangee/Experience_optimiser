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

    // Changement de version via le <select>
    this.versionsEl.addEventListener('change', () => {
      if (!this.project || !this.project.versions) return;
      const idx = parseInt(this.versionsEl.value);
      this._switchVersion(this.project.versions[idx]);
    });
  }

  // ── API publique ─────────────────────────────────────────

  /**
   * Ouvre le viewer avec un projet donné.
   * @param {Object} project      - objet de ProjectData.js
   * @param {string} versionLabel - (optionnel) label de la version à afficher d'emblée
   */
  open(project, versionLabel = null) {
    this.project = project;

    // Titre dans la barre du haut
    this.titleEl.textContent = project.name;

    // Détermine quelle version charger en priorité
    let initialSrc      = project.iframeSrc;
    let initialControls = project.controls || [];

    if (versionLabel && project.versions) {
      const target = project.versions.find(v => v.label === versionLabel);
      if (target) {
        initialSrc      = target.src;
        initialControls = target.controls || project.controls || [];
      }
    }

    // Charge la démo dans l'iframe
    this.iframe.src = initialSrc;

    // Construit le bandeau de contrôles
    this._renderControls(initialControls);

    // Construit le sélecteur de version si besoin
    this._renderVersions(project.versions || [], initialSrc);

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
   * Peuple le <select> de version ou le cache s'il n'y a pas de versions.
   * @param {Array<{label, src, controls}>} versions
   * @param {string} activeSrc - src actuellement chargé (pour présélectionner)
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
   * Bascule vers une version différente du même projet.
   * @param {{label, src, controls}} version
   */
  _switchVersion(version) {
    this.iframe.src = version.src;
    this._renderControls(version.controls || this.project.controls || []);
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
