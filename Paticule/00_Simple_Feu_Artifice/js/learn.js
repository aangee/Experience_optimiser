/**
 * learn.js — Scénario pédagogique : Feu d'artifice
 *
 * Flux par step :
 *   1. clic ▶ → onEnter remet la sim dans le bon état
 *   2. animation joue N frames (librement, pas d'indicateur)
 *   3. canvas se fige → cercle-cible + trait SVG vers l'annotation
 */

window.onload = function () {

  const canvas = document.getElementById('canvas');
  canvas.width  = window.innerWidth;
  canvas.height = window.innerHeight;

  const counterEl  = document.getElementById('lk-particle-count');
  const countBadge = document.getElementById('lk-count-badge');
  const M_PI = Math.PI;

  // ── Simulation ───────────────────────────────────────────

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

  // ── Steps ────────────────────────────────────────────────

  const steps = [

    {
      title: 'La première étincelle',
      annotation: {
        text: 'Au démarrage, 100 particules naissent au centre de l\'écran. Chaque angle est tiré au hasard entre 0 et 2π — ce qui forme l\'explosion initiale dans toutes les directions.',
        x: 4,
        y: 4
      },
      // play:0 → figé sur la frame initiale, toutes les particules sont encore au centre
      target: { x: 50, y: 50 },
      play: 0,
      onEnter(sim) {
        countBadge.style.display = 'none';
        sim.init();
      }
    },

    {
      title: 'Particule = objet',
      annotation: {
        text: 'Chaque point rouge est une instance de la classe Particle. Elle connaît sa position (x, y) et sa vitesse (vx, vy). La particule blanche est mise en valeur pour la montrer.',
        x: 4,
        y: 4
      },
      // Pas de target statique : la particule blanche est elle-même l'indicateur visuel
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
      annotation: {
        text: 'requestAnimationFrame rappelle update() ~60×/s. À chaque frame : on efface le canvas, on recalcule chaque position, on redessine. C\'est le moteur de toute animation canvas.',
        x: 60,
        y: 4
      },
      target: null,
      play: 90,
      onEnter(sim) {
        countBadge.style.display = 'none';
        sim.init();
      }
    },

    {
      title: 'Premier bug conscient',
      annotation: {
        text: 'À chaque clic, 100 nouvelles particules s\'ajoutent sans jamais en supprimer. Le compteur grimpe indéfiniment. Bug laissé volontairement — pour apprendre ensuite le cycle de vie.',
        x: 4,
        y: 4
      },
      target: null,
      play: 90,
      onEnter(sim) {
        countBadge.style.display = '';
        sim.init();
        const w = canvas.width, h = canvas.height;
        const origins = [
          { x: w * 0.28, y: h * 0.32 },
          { x: w * 0.68, y: h * 0.42 },
          { x: w * 0.50, y: h * 0.70 }
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

  // ── Lancement ────────────────────────────────────────────

  const kit = new LearnKit(canvas, steps, sim);
  kit.start();

};
