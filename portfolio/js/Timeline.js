/**
 * ============================================================
 * Timeline.js
 * ============================================================
 * Affiche la section timeline à partir des données de TimelineData.js.
 *
 * Structure HTML générée pour chaque entrée :
 *   .tl-entry
 *     .tl-date         ← colonne gauche : date
 *     .tl-spine        ← ligne verticale + point
 *     .tl-content      ← colonne droite : texte
 * ============================================================
 */

class Timeline {

  /**
   * @param {string} containerId - id de l'élément <section> à remplir
   */
  constructor(containerId) {
    this.container = document.getElementById(containerId);
  }

  /**
   * Injecte les entrées dans le DOM.
   * @param {Array} entries - tableau TIMELINE de TimelineData.js
   */
  render(entries) {
    // On remplace le contenu statique du HTML par le rendu dynamique.
    // On garde l'en-tête existant et on remplace uniquement le track.
    const existingTrack = this.container.querySelector('.timeline-track');
    if (existingTrack) existingTrack.remove();

    const existingDesc = this.container.querySelector('.timeline-desc');
    if (existingDesc) existingDesc.remove();

    const existingBadge = this.container.querySelector('.timeline-badge');
    if (existingBadge) existingBadge.remove();

    const body = document.createElement('div');
    body.className = 'tl-body';

    entries.forEach((entry, index) => {
      body.appendChild(this._createEntry(entry, index === entries.length - 1));
    });

    this.container.appendChild(body);
  }

  /**
   * Crée et retourne un élément entrée de timeline.
   * @param {Object}  entry  - une entrée de TIMELINE
   * @param {boolean} isLast - true si c'est la dernière entrée (pas de ligne en dessous)
   */
  _createEntry(entry, isLast) {
    const el = document.createElement('div');
    el.className = 'tl-entry' + (isLast ? ' tl-entry--last' : '');

    const { day, month, year, approx } = entry.date;

    // Formate la date : "~avr 2022" ou "14 mar 2026" etc.
    const dayStr  = day ? `<span class="tl-day">${String(day).padStart(2, '0')}</span>` : '';
    const approxStr = approx ? '<span class="tl-approx">~</span>' : '';

    // Tag optionnel "Voir la démo" si un demoId est renseigné
    const demoLink = entry.demoId
      ? `<button class="tl-demo-btn" data-id="${entry.demoId}">▶ voir la démo</button>`
      : '';

    const tags = (entry.tags || [])
      .map(t => `<span class="tag">${t}</span>`)
      .join('');

    el.innerHTML = `
      <div class="tl-date">
        ${approxStr}
        ${dayStr}
        <span class="tl-month">${month}</span>
        <span class="tl-year">${year}</span>
      </div>

      <div class="tl-spine">
        <div class="tl-dot"></div>
        ${isLast ? '' : '<div class="tl-line"></div>'}
      </div>

      <div class="tl-content">
        <div class="tl-title">${entry.title}</div>
        <div class="tl-desc">${entry.desc}</div>
        <div class="tl-footer">
          <div class="tl-tags">${tags}</div>
          ${demoLink}
        </div>
      </div>
    `;

    // Clic sur "voir la démo" → ouvre le viewer (avec la version précise si renseignée)
    if (entry.demoId) {
      el.querySelector('.tl-demo-btn').addEventListener('click', (e) => {
        e.stopPropagation();
        const project = PROJECTS.find(p => p.id === entry.demoId);
        if (project && window.viewer) window.viewer.open(project, entry.versionLabel || null);
      });
    }

    return el;
  }

}
