/**
 * LearnMode.js — Stub no-op
 *
 * L'ancienne logique (freeze iframe + overlay d'annotations) est
 * remplacée par l'architecture LearnKit : chaque démo possède son
 * propre learn.html chargé directement dans l'iframe.
 *
 * Ce stub conserve l'interface publique pour ne pas casser DemoViewer.
 */

class LearnMode {
  constructor() {}
  mount()   {}
  unmount() {}
}
