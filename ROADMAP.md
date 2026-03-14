# ROADMAP — Nouveau Portfolio aangee

> Plan de construction du site portfolio fusionnant Experience_optimiser + angine_js_v01.
> Objectif : raconter la courbe d'apprentissage de manière interactive.

---

## Vision globale

Un site **statique déployable sur GitHub Pages** (zéro serveur), en JS vanilla, qui présente les projets/démos avec deux modes d'exploration :
- **Jouer** : la démo tourne, contrôles affichés discrètement
- **Comprendre** : même démo + annotations interactives qui expliquent le code en temps réel

---

## Contenu à intégrer

### Démos prioritaires (depuis Experience_optimiser)

| Catégorie | Démo | Intérêt portfolio | Priorité |
|-----------|------|-------------------|----------|
| Paticule | 00_Simple_Feu_Artifice | Première démo, symbolique | ★★★ |
| Paticule | 09_Spring | Physique ressorts, interactif | ★★★ |
| Paticule | 12_Easing | Visuel, compréhensible | ★★★ |
| Paticule | 14_1_Ship_Truster | Pont vers les jeux | ★★ |
| Detection | 2D_Detection_Bitmap | Technique originale | ★★★ |
| Detection | 2D_Detection_Mathematique | Simple, élégant | ★★ |
| Fractal | Fractal_Trees | Récursion, beau visuellement | ★★★ |
| Fractal | Space_Colonization | Algorithme fascinant | ★★★ |
| MiniGame | 01_SystemSolar_v01 | Première approche jeu | ★★ |
| MiniGame | 05_Ship_v02 | Jeu le plus avancé | ★★★ |
| Athena | angine_js_v01 | Architecture ECS, étape majeure | ★★★ |

### Projets futurs à prévoir (emplacements réservés)
- Ship avancé (version Chromebook, à récupérer)
- angine_js_v02 (évolution d'Athena)
- HaccpOpsCore (si portion démo possible)

---

## Architecture du site

```
portfolio-aangee/
├── index.html              ← page d'accueil / galerie
├── css/
│   ├── reset.css
│   ├── main.css            ← thème global (fond sombre, typo)
│   ├── gallery.css         ← grille de cartes
│   └── demo-viewer.css     ← fenêtre de démo (modes Jouer/Comprendre)
├── js/
│   ├── app.js              ← init + données projets
│   ├── Gallery.js          ← rendu grille de cartes
│   ├── DemoViewer.js       ← fenêtre démo + switch modes
│   ├── LearnMode.js        ← système d'annotations interactives
│   └── ProjectData.js      ← catalogue de tous les projets
├── demos/                  ← copies des démos existantes (inchangées)
│   ├── feu-artifice/
│   ├── spring/
│   ├── fractal-trees/
│   ├── ship-v02/
│   └── ...
└── assets/
    └── thumbnails/         ← captures statiques pour les cartes
```

---

## Phases de construction

### Phase 1 — Squelette + galerie (MVP) ✓
- [x] Page d'accueil avec grille de cartes groupées par catégorie
- [x] Cartes avec preview iframe animée en miniature
- [x] `ProjectData.js` : catalogue structuré de toutes les démos
- [x] 5 démos actives (feu-artifice, spring, easing, fractal-trees, space-colonization)
- [x] DemoViewer plein écran — modes Jouer / Comprendre (placeholder)
- [x] Bandeau contrôles clavier par démo
- [x] Support tactile (TouchAdapter)
- [x] Section timeline placeholder en bas de page

### Phase 2 — Intégration des démos restantes ← en cours
- [ ] Activer les 5 démos verrouillées (ship-truster, detection-math, solar-v1, ship-v02, bitmap-detection)
- [ ] Vérifier les chemins `iframeSrc` et le comportement dans le viewer
- [ ] Affiner les descriptions et contrôles dans `ProjectData.js` si besoin

### Phase 3 — Mode Comprendre
- [ ] Système d'annotations : bulles positionnées sur canvas
- [ ] Déclenchement au clic/interaction : afficher quelle fonction est appelée
- [ ] Panneau latéral : extrait de code surligné correspondant
- [ ] Implémenter sur 2-3 démos pilotes (spring, feu-artifice, ship)

### Phase 4 — Polish
- [ ] Animations hover sur les cartes
- [ ] Effets souris sur la page d'accueil (particles légères ?)
- [ ] Timeline/progression visible (de la première démo à Athena)
- [ ] Section "À propos" discrète
- [ ] Responsive mobile

### Phase 5 — Contenu futur
- [ ] Intégrer Ship avancé quand récupéré
- [ ] Section "En construction" pour angine v2
- [ ] Système de tags (physique, collision, fractal, jeu...)

---

## Décisions techniques

| Question | Décision | Raison |
|----------|----------|--------|
| Framework ? | Vanilla JS | Cohérent avec les démos, pas de dépendance |
| Build tool ? | Aucun (fichiers statiques) | Déployable GitHub Pages sans CI |
| Démos intégrées ? | `<iframe>` | Isolation propre, démos inchangées |
| CSS ? | Vanilla + Custom Properties | Thème cohérent sans overhead |
| Animations ? | CSS transitions + Canvas | Léger, maîtrisé |
| Hébergement ? | GitHub Pages | Gratuit, simple, déjà utilisé |

---

## Notes importantes

- Les démos existantes **ne sont pas modifiées** — elles sont copiées telles quelles dans `demos/`
- Le Mode Comprendre est une **couche par-dessus** les démos, pas intégré dedans
- Prévoir dès le début des **emplacements vides** pour les projets futurs (cards "coming soon")
- Le site doit fonctionner **sans connexion** une fois chargé

---

## Prochaine étape

Activer les démos Phase 2 dans `ProjectData.js` (passer `phase: 2` → `phase: 1`) et valider chaque démo dans le viewer.
