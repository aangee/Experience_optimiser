/**
 * ============================================================
 * TouchAdapter.js
 * ============================================================
 * Ajouté le 2026-03-14 — lors de la construction du portfolio.
 *
 * Problème : toutes les démos de Experience_optimiser utilisent
 * des événements souris (mousemove, mousedown, mouseup, click).
 * Sur téléphone, ces événements ne sont pas déclenchés par le
 * doigt → les démos sont non-interactives sur mobile.
 *
 * Solution : ce fichier "traduit" les événements tactiles en
 * événements souris équivalents, de façon transparente.
 * Les démos n'ont pas besoin d'être modifiées — elles reçoivent
 * les événements mouse comme si c'était une vraie souris.
 *
 * Correspondances :
 *   touchstart  → mousedown
 *   touchmove   → mousemove  (+ bloque le scroll natif)
 *   touchend    → mouseup + click
 *
 * Utilisation — ajouter UNE ligne dans le HTML de la démo,
 * après MasterClass.js :
 *
 *   <script src="../lib/TouchAdapter.js"></script>
 *
 * Limites connues :
 *   - Le multi-touch n'est pas géré (on suit uniquement le
 *     premier doigt). Suffisant pour toutes les démos actuelles.
 *   - Les démos qui utilisent des contrôles clavier (vaisseau,
 *     jeux) nécessiteront un overlay de boutons virtuels séparé.
 * ============================================================
 */

(function () {

  /**
   * Crée et dispatch un MouseEvent depuis les coordonnées d'un Touch.
   * @param {string}     eventName - 'mousedown', 'mousemove', 'mouseup', 'click'
   * @param {Touch}      touch     - l'objet Touch source
   * @param {EventTarget} target   - l'élément sur lequel dispatcher l'événement
   */
  function dispatchMouse(eventName, touch, target) {
    const evt = new MouseEvent(eventName, {
      bubbles:    true,
      cancelable: true,
      clientX:    touch.clientX,
      clientY:    touch.clientY,
      screenX:    touch.screenX,
      screenY:    touch.screenY,
    });
    target.dispatchEvent(evt);
  }

  // touchstart → mousedown
  document.addEventListener('touchstart', function (e) {
    dispatchMouse('mousedown', e.touches[0], e.target);
  }, { passive: true });

  // touchmove → mousemove
  // passive: false est nécessaire pour pouvoir appeler preventDefault()
  // et bloquer le scroll natif pendant qu'on interagit avec une démo.
  document.addEventListener('touchmove', function (e) {
    e.preventDefault();
    dispatchMouse('mousemove', e.touches[0], e.target);
  }, { passive: false });

  // touchend → mouseup + click
  // changedTouches[0] : le doigt qui vient de se lever
  document.addEventListener('touchend', function (e) {
    const touch = e.changedTouches[0];
    dispatchMouse('mouseup',  touch, e.target);
    dispatchMouse('click',    touch, e.target);
  }, { passive: true });

})();
