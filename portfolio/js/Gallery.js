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

    // Démarre le chargement intelligent des iframes après injection du DOM
    this._initLazyLoad();
  }

  /**
   * Intersection Observer : charge l'iframe quand elle approche du viewport,
   * la décharge quand elle s'en éloigne.
   * Résultat : seulement ~4-5 canvases actifs en même temps.
   *
   * rootMargin: "400px 0px"
   *   → l'iframe se charge 400px AVANT d'être visible (scroll fluide)
   *   → elle se décharge 400px APRÈS être sortie du viewport
   *   Avec des cartes de ~260px de hauteur, ça couvre environ 1-2 cartes
   *   au-dessus et 1-2 en dessous de ce qui est visible.
   */
  _initLazyLoad() {
    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        const iframe = entry.target;
        if (entry.isIntersecting) {
          // La carte approche → on branche la source pour démarrer le canvas
          if (iframe.dataset.src && iframe.src !== iframe.dataset.src) {
            iframe.src = iframe.dataset.src;
          }
        } else {
          // La carte est loin → on coupe le canvas pour libérer les ressources
          iframe.removeAttribute('src');
        }
      });
    // haut: ~1 carte | bas: ~2 cartes (on scrolle plus souvent vers le bas)
    }, { rootMargin: '280px 0px 560px 0px' });

    // On observe toutes les iframes qui ont un data-src (les démos actives)
    this.container.querySelectorAll('iframe[data-src]').forEach(iframe => {
      observer.observe(iframe);
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
