/**
 * learn.js — Scénario pédagogique : Feu d'artifice
 *
 * Reconstruit la simulation depuis zéro pour un contrôle
 * frame-by-frame via LearnKit.
 *
 * Steps :
 *  0 — La première étincelle  (100 particules, centre, libre)
 *  1 — Particule = objet       (une particule mise en valeur)
 *  2 — La boucle de jeu        (boucle RAF expliquée)
 *  3 — Premier bug conscient   (400 particules, compteur visible)
 */

window.onload = function () {

  const canvas = document.getElementById('canvas');
  canvas.width  = window.innerWidth;
  canvas.height = window.innerHeight;

  const counterEl   = document.getElementById('lk-particle-count');
  const countBadge  = document.getElementById('lk-count-badge');
  const M_PI = Math.PI;

  // ── Simulation ───────────────────────────────────────────

  const sim = {

    particles:   [],
    highlighted: null,

    /** Réinitialise avec 100 particules depuis le centre. */
    init() {
      this.particles   = [];
      this.highlighted = null;
      const w = canvas.width, h = canvas.height;
      for (let i = 0; i < 100; i++) {
        const p = new Particle(w / 2, h / 2,
          Math.random() * 4 + 1,
          Math.random() * M_PI * 2,
          0);
        p.friction = 0.99;   // ralentissement progressif → reste visible
        this.particles.push(p);
      }
    },

    /** Dessine une frame. Appelé par LearnKit. */
    update(ctx, w, h) {
      ctx.clearRect(0, 0, w, h);

      for (const p of this.particles) {
        p.update();
        ctx.beginPath();

        if (p === this.highlighted) {
          // Particule mise en valeur : blanche + halo jaune
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
        x: 55,
        y: 8
      },
      play: Infinity,
      onEnter(sim) {
        countBadge.style.display = 'none';
        sim.init();
      }
    },

    {
      title: 'Particule = objet',
      annotation: {
        text: 'Chaque point rouge est une instance de la classe Particle. Elle connaît sa position (x, y) et sa vitesse (vx, vy). C\'est tout — le minimum pour simuler un mouvement.',
        x: 4,
        y: 8
      },
      play: Infinity,
      onEnter(sim) {
        countBadge.style.display = 'none';
        sim.init();
        // Met en valeur la première particule
        sim.highlighted = sim.particles[0];
      }
    },

    {
      title: 'La boucle de jeu',
      annotation: {
        text: 'requestAnimationFrame rappelle update() ~60×/s. À chaque frame : on efface le canvas, on recalcule chaque position, on redessine. C\'est le moteur de toute animation canvas.',
        x: 28,
        y: 50
      },
      play: Infinity,
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
        y: 50
      },
      play: Infinity,
      onEnter(sim) {
        countBadge.style.display = '';
        sim.init();
        // Simule 3 clics pour montrer l'accumulation
        const w = canvas.width, h = canvas.height;
        const origins = [
          { x: w * 0.28, y: h * 0.32 },
          { x: w * 0.68, y: h * 0.42 },
          { x: w * 0.50, y: h * 0.70 }
        ];
        for (const o of origins) {
          for (let i = 0; i < 100; i++) {
            const p = new Particle(o.x, o.y,
              Math.random() * 4 + 1,
              Math.random() * M_PI * 2,
              0);
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
