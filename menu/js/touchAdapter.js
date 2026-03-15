/**
 * TouchAdapter local — menu/
 *
 * Différence avec lib/TouchAdapter.js :
 *   touchstart utilise { passive: false } + preventDefault()
 *   → bloque les mouse events NATIFS que le navigateur génère
 *     après un touch (le délai ~300ms "fantôme" qui causait des
 *     doubles clics et brisait la détection bitmap).
 */
(function () {

  function fire(name, touch) {
    touch.target.dispatchEvent(new MouseEvent(name, {
      bubbles:    true,
      cancelable: true,
      clientX:    touch.clientX,
      clientY:    touch.clientY,
      screenX:    touch.screenX,
      screenY:    touch.screenY,
    }));
  }

  // passive: false + preventDefault = le navigateur ne génère pas
  // ses propres mousedown/mouseup ~300ms plus tard
  document.addEventListener('touchstart', function (e) {
    e.preventDefault();
    fire('mousedown', e.touches[0]);
  }, { passive: false });

  document.addEventListener('touchend', function (e) {
    const t = e.changedTouches[0];
    fire('mouseup', t);
    fire('click',   t);
  }, { passive: true });

})();
