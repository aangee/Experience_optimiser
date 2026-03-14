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
