/**
 * ============================================================
 * app.js — Point d'entrée du portfolio
 * ============================================================
 * Ce fichier est le dernier chargé par index.html.
 * À ce stade, tous les autres scripts sont déjà disponibles :
 *   - ProjectData.js  → la constante PROJECTS
 *   - TimelineData.js → la constante TIMELINE
 *   - Gallery.js      → la classe Gallery
 *   - Timeline.js     → la classe Timeline
 *   - DemoViewer.js   → la classe DemoViewer
 * ============================================================
 */

// Crée le viewer plein-écran et le rend accessible globalement
// (window.viewer permet à Gallery.js et Timeline.js d'y accéder)
window.viewer = new DemoViewer();

// Galerie : génère toutes les cartes à partir du catalogue PROJECTS
const gallery = new Gallery('gallery');
gallery.render(PROJECTS);

// Timeline : affiche le parcours d'apprentissage
const timeline = new Timeline('timeline');
timeline.render(TIMELINE);

// ===== Navigation par onglets =====
const tabs = document.querySelectorAll('.tab');
const tabContents = document.querySelectorAll('.tab-content');

tabs.forEach(tab => {
  tab.addEventListener('click', () => {
    const target = tab.dataset.tab;

    tabs.forEach(t => t.classList.remove('tab--active'));
    tab.classList.add('tab--active');

    tabContents.forEach(content => {
      const isTarget = content.id === 'tab-' + target;
      content.classList.toggle('hidden', !isTarget);
    });
  });
});
