/**
 * ============================================================
 * app.js — Point d'entrée du portfolio
 * ============================================================
 * Ce fichier est le dernier chargé par index.html.
 * À ce stade, tous les autres scripts sont déjà disponibles :
 *   - ProjectData.js → la constante PROJECTS
 *   - Gallery.js     → la classe Gallery
 *   - DemoViewer.js  → la classe DemoViewer
 *
 * On initialise tout ici en 3 lignes.
 * ============================================================
 */

// Crée le viewer plein-écran et le rend accessible globalement
// (window.viewer permet à Gallery.js d'y accéder depuis les cartes)
window.viewer = new DemoViewer();

// Crée la galerie et lui dit où afficher les cartes (#gallery dans index.html)
const gallery = new Gallery('gallery');

// Lance le rendu : génère toutes les cartes à partir du catalogue PROJECTS
gallery.render(PROJECTS);
