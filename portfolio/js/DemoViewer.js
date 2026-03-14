/**
 * ============================================================
 * DemoViewer.js
 * ============================================================
 * Ce fichier gère la fenêtre plein-écran qui s'ouvre quand on
 * clique sur une carte de démo.
 *
 * Fonctionnement :
 *   - open(project) → affiche l'overlay et charge la démo dans l'iframe
 *   - close()       → cache l'overlay et vide l'iframe
 *
 * Pourquoi vider l'iframe à la fermeture ?
 *   Les démos canvas utilisent requestAnimationFrame() en boucle infinie.
 *   Si on se contente de cacher l'overlay sans vider l'iframe, la démo
 *   continue de tourner en arrière-plan → gaspillage CPU inutile.
 *   En mettant iframe.src = '', on arrête tout proprement.
 * ============================================================
 */

class DemoViewer {

  constructor() {
    // On récupère les éléments HTML dont on a besoin
    this.overlay  = document.getElementById('viewer');        // la div qui couvre tout l'écran
    this.iframe   = document.getElementById('viewer-iframe'); // l'iframe qui affiche la démo
    this.titleEl  = document.getElementById('viewer-title'); // le titre dans la barre du haut
    this.closeBtn = document.getElementById('viewer-close'); // le bouton ✕

    // Clic sur le bouton ✕ → fermer
    this.closeBtn.addEventListener('click', () => this.close());

    // Touche Échap → fermer (pratique sur PC)
    document.addEventListener('keydown', e => {
      if (e.key === 'Escape') this.close();
    });
  }

  /**
   * Ouvre le viewer avec une démo donnée.
   * @param {Object} project - un objet projet de ProjectData.js
   */
  open(project) {
    this.titleEl.textContent = project.name; // affiche le nom de la démo en haut
    this.iframe.src = project.iframeSrc;     // charge la démo dans l'iframe

    // Affiche l'overlay en retirant la classe 'hidden'
    this.overlay.classList.remove('hidden');

    // Empêche le scroll de la page en arrière-plan pendant que la démo est ouverte
    document.body.style.overflow = 'hidden';
  }

  /**
   * Ferme le viewer et stoppe la démo.
   */
  close() {
    this.overlay.classList.add('hidden'); // cache l'overlay
    this.iframe.src = '';                 // IMPORTANT : stoppe la boucle d'animation
    document.body.style.overflow = '';   // réactive le scroll de la page
  }

}
