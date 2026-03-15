/**
 * learn.js — Scénario pédagogique : Feu d'artifice
 *
 * step.play :
 *   0        → figé sur la frame initiale (cible affichée immédiatement)
 *   N        → animation libre N frames, puis pause + cible
 *   Infinity → animation libre, pas de pause automatique
 */

window.onload = function () {

  const canvas = document.getElementById('canvas');
  // Les dimensions sont gérées par LearnKit._sizeCanvas()

  const M_PI       = Math.PI;
  const counterEl  = document.getElementById('lk-particle-count');
  const countBadge = document.getElementById('lk-count-badge');

  // ── Simulation ─────────────────────────────────────────────

  const sim = {

    particles:   [],
    highlighted: null,

    init() {
      this.particles   = [];
      this.highlighted = null;
      const w = canvas.width, h = canvas.height;
      for (let i = 0; i < 100; i++) {
        const p = new Particle(
          w / 2, h / 2,
          Math.random() * 4 + 1,
          Math.random() * M_PI * 2,
          0
        );
        p.friction = 0.99;
        this.particles.push(p);
      }
    },

    update(ctx, w, h) {
      ctx.clearRect(0, 0, w, h);

      for (const p of this.particles) {
        p.update();
        ctx.beginPath();

        if (p === this.highlighted) {
          ctx.arc(p.x, p.y, 9, 0, M_PI * 2);
          ctx.fillStyle = '#ffffff';
          ctx.fill();
          ctx.strokeStyle = '#ffd044';
          ctx.lineWidth = 2;
          ctx.stroke();
        } else {
          ctx.arc(p.x, p.y, 5, 0, M_PI * 2);
          ctx.fillStyle = '#e83030';
          ctx.fill();
        }
      }

      if (counterEl) counterEl.textContent = this.particles.length;
    }

  };

  // ── Steps ──────────────────────────────────────────────────

  const steps = [

    {
      title: 'La première étincelle',
      text:  'Au démarrage, 100 particules naissent au même point — le centre de l\'écran. Chaque angle de départ est tiré au hasard entre 0 et 2π, ce qui produit l\'explosion dans toutes les directions.',
      // play:0 → frame 0, toutes les particules sont encore au centre
      target: { x: 50, y: 50 },
      play: 0,
      onEnter(sim) {
        countBadge.style.display = 'none';
        sim.init();
      }
    },

    {
      title: 'Particule = objet',
      text:  'Chaque point rouge est une instance de la classe Particle. Elle stocke sa position (x, y) et sa vitesse (vx, vy). À chaque frame, on lui ajoute la vélocité à la position. La particule blanche est identique — juste mise en valeur.',
      // Pas de target fixe : la particule blanche (en mouvement) est elle-même l'indicateur visuel
      target: null,
      play: 120,
      onEnter(sim) {
        countBadge.style.display = 'none';
        sim.init();
        sim.highlighted = sim.particles[0];
      }
    },

    {
      title: 'La boucle de jeu',
      text:  'requestAnimationFrame rappelle la fonction update() environ 60 fois par seconde. À chaque appel : on efface le canvas, on recalcule les positions, on redessine. C\'est le moteur de toute animation canvas.',
      target: null,
      play: 90,
      onEnter(sim) {
        countBadge.style.display = 'none';
        sim.init();
      }
    },

    {
      title: 'Premier bug conscient',
      text:  'À chaque clic, 100 nouvelles particules s\'ajoutent sans jamais en supprimer. Le compteur grimpe indéfiniment. Ce bug a été laissé volontairement — la prochaine démo montre comment gérer le cycle de vie des particules.',
      target: null,
      play: Infinity,
      onEnter(sim) {
        countBadge.style.display = '';
        const w = canvas.width, h = canvas.height;
        sim.particles   = [];
        sim.highlighted = null;
        const origins = [
          { x: w * 0.50, y: h * 0.50 },
          { x: w * 0.28, y: h * 0.35 },
          { x: w * 0.70, y: h * 0.35 },
          { x: w * 0.40, y: h * 0.65 }
        ];
        for (const o of origins) {
          for (let i = 0; i < 100; i++) {
            const p = new Particle(
              o.x, o.y,
              Math.random() * 4 + 1,
              Math.random() * M_PI * 2,
              0
            );
            p.friction = 0.99;
            sim.particles.push(p);
          }
        }
      }
    }

  ];

  // ── Lancement ──────────────────────────────────────────────

  const kit = new LearnKit(canvas, steps, sim);
  kit.start();

};
