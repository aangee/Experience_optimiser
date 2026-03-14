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
   * Génère et affiche toutes les cartes à partir d'un tableau de projets.
   * @param {Array} projects - le tableau PROJECTS de ProjectData.js
   */
  render(projects) {
    // On sépare les projets disponibles (phase 1) des projets à venir (phase 2+)
    const phase1 = projects.filter(p => p.phase === 1);
    const phase2 = projects.filter(p => p.phase >= 2);

    // On crée d'abord les cartes des démos disponibles
    phase1.forEach(p => this.container.appendChild(this._createCard(p, false)));

    // Puis, si des démos "bientôt" existent, on ajoute un séparateur et leurs cartes
    if (phase2.length > 0) {
      const sep = document.createElement('div');
      sep.className = 'section-label';
      sep.textContent = 'bientôt';
      this.container.appendChild(sep);

      // locked = true → la carte est grisée, pas cliquable
      phase2.forEach(p => this.container.appendChild(this._createCard(p, true)));
    }
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
    card.dataset.id = project.id; // stocke l'id pour pouvoir l'identifier plus tard

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
          // Sinon : un vrai iframe qui charge la démo en miniature
          // loading="lazy" = le navigateur attend que la carte soit visible pour charger
          // tabindex="-1"  = l'iframe ne peut pas être sélectionnée au clavier (navigation clavier)
          // pointer-events: none (dans le CSS) = les clics passent à travers l'iframe
          : `<iframe src="${project.iframeSrc}" loading="lazy" tabindex="-1"></iframe>`
        }

        ${locked ? '<div class="card-lock">bientôt</div>' : ''}
      </div>

      <div class="card-info">
        <div class="card-category">${project.category}</div>
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
