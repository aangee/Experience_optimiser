/**
 * ============================================================
 * Gallery.js
 * ============================================================
 * Ce fichier s'occupe d'afficher les cartes de démos sur la page.
 *
 * Fonctionnement :
 *   1. On lui donne la liste des projets (depuis ProjectData.js)
 *   2. Il crée une carte HTML pour chaque projet
 *   3. Il place ces cartes dans le conteneur #gallery de la page
 *
 * Les cartes "phase 1" sont cliquables et montrent une preview
 * de la démo qui tourne en temps réel dans un mini-iframe.
 * Les cartes "phase 2+" affichent juste "bientôt".
 * ============================================================
 */

class Gallery {

  /**
   * @param {string} containerId - l'id de l'élément HTML qui accueille la grille
   */
  constructor(containerId) {
    // On récupère l'élément HTML dans lequel on va injecter les cartes
    this.container = document.getElementById(containerId);
  }

  /**
   * Génère et affiche toutes les cartes à partir d'un tableau de projets,
   * regroupées par catégorie.
   * @param {Array} projects - le tableau PROJECTS de ProjectData.js
   */
  render(projects) {
    // On collecte les catégories dans l'ordre d'apparition
    const categories = [];
    const byCategory = {};

    projects.forEach(p => {
      if (!byCategory[p.category]) {
        categories.push(p.category);
        byCategory[p.category] = [];
      }
      byCategory[p.category].push(p);
    });

    // Pour chaque catégorie : titre de section puis cartes (actives d'abord, verrouillées ensuite)
    categories.forEach((cat, index) => {
      const items = byCategory[cat];

      const header = document.createElement('div');
      header.className = 'section-header' + (index === 0 ? ' section-header--first' : '');
      header.textContent = cat;
      this.container.appendChild(header);

      const active = items.filter(p => p.phase === 1);
      const locked = items.filter(p => p.phase > 1);

      active.forEach(p => this.container.appendChild(this._createCard(p, false)));
      locked.forEach(p => this.container.appendChild(this._createCard(p, true)));
    });

    // Démarre le chargement hover-to-activate après injection du DOM
    this._initHoverLoad();
  }

  /**
   * Hover-to-activate : charge l'iframe uniquement quand la souris entre
   * dans la carte. Sur mobile (pointer: coarse), aucune iframe n'est chargée
   * dans les cartes — les démos s'ouvrent directement en fullscreen au clic.
   *
   * Résultat : 0 canvas actif au chargement de la page, 1 seul en mémoire
   * à la fois pendant la navigation, zéro risque de crash mémoire.
   */
  _initHoverLoad() {
    // Sur mobile (écran tactile) : pas d'iframe dans les cartes, rien à faire
    if (window.matchMedia('(pointer: coarse)').matches) return;

    this.container.querySelectorAll('.card:not(.card--locked)').forEach(card => {
      const iframe = card.querySelector('iframe[data-src]');
      if (!iframe) return;

      card.addEventListener('mouseenter', () => {
        // Charge seulement si pas encore fait (data-loaded = flag one-shot)
        if (!iframe.dataset.loaded) {
          iframe.src = iframe.dataset.src;
          iframe.dataset.loaded = '1';
        }
      });
    });
  }

  /**
   * Crée et retourne un élément carte (div.card) pour un projet donné.
   * @param {Object}  project - un objet projet de ProjectData.js
   * @param {boolean} locked  - si true, la carte est grisée ("bientôt")
   * @returns {HTMLElement}
   */
  _createCard(project, locked) {
    const card = document.createElement('div');
    // On ajoute la classe 'card--locked' si la démo n'est pas encore dispo
    card.className = 'card' + (locked ? ' card--locked' : '');
    card.dataset.id = project.id;
    card.title = project.category; // catégorie visible en tooltip au survol

    // Génère les petites étiquettes de tags en HTML
    const tags = (project.tags || [])
      .map(t => `<span class="tag">${t}</span>`)
      .join('');

    // Construction du contenu HTML de la carte
    // Les backticks `` permettent d'écrire du HTML sur plusieurs lignes (template literal)
    card.innerHTML = `
      <div class="card-preview">

        ${locked
          // Si la démo est verrouillée : juste un fond sombre avec "bientôt"
          ? '<div class="card-preview-placeholder"></div>'
          // Sinon : iframe sans src au départ — l'IntersectionObserver la chargera
          // quand elle sera proche du viewport (voir _initLazyLoad).
          // tabindex="-1" = l'iframe ne reçoit pas le focus clavier
          // pointer-events: none (dans le CSS) = les clics passent à travers l'iframe
          : `<iframe data-src="${project.iframeSrc}" tabindex="-1"></iframe>`
        }

        ${locked ? '<div class="card-lock">bientôt</div>' : ''}
        ${project.wip ? '<div class="card-wip-badge" title="Travaux en cours">WIP</div>' : ''}
        ${project.controls && project.controls.length > 0
          ? '<div class="card-controls-badge" title="Contrôles disponibles">🕹</div>'
          : ''}
      </div>

      <div class="card-info">
        <div class="card-name">${project.name}</div>
        <div class="card-desc">${project.description}</div>
        <div class="card-tags">${tags}</div>
      </div>
    `;

    // Si la démo est disponible, on branche le clic pour ouvrir le DemoViewer
    // window.viewer est défini dans app.js
    if (!locked) {
      card.addEventListener('click', () => {
        window.viewer.open(project);
      });
    }

    return card;
  }

}
