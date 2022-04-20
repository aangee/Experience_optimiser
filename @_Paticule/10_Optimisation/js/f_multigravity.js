function f_multigravity() {


	let sun1 = new Particle(300, 100, 0, 0),
		sun2 = new Particle(700, 500, 0, 0),
		emitter = {
			x: 100,
			y: 0
		},
		particles = [],
		numParticles = 100;


	sun1.mass = 10000;
	sun1.radius = 10;
	sun2.mass = 20000;
	sun2.radius = 20;

	for (let i = 0; i < numParticles; i += 1) {
		let p = new Particle(emitter.x, emitter.y, utils.randomRange(7, 8), Math.PI / 2 + utils.randomRange(-0.1, 0.1));
		p.addGravitation(sun1);
		p.addGravitation(sun2);
		p.radius = 3;
		particles.push(p);
	}


	update();

	function update() {
		setup.ctx.clearRect(0, 0, setup.width, setup.height);

		draw(sun1, "yellow");
		draw(sun2, "yellow");

		for (let i = 0; i < numParticles; i += 1) {
			let p = particles[i];
			p.update();
			draw(p, "lightblue");
			if (p.x > setup.width ||
				p.x < 0 ||
				p.y > setup.height ||
				p.y < 0) {
				p.x = emitter.x;
				p.y = emitter.y;
				p.setSpeed(utils.randomRange(7, 8));
				p.setHeading(Math.PI / 2 + utils.randomRange(-.1, .1));
			}
		}

		requestAnimationFrame(update);
	}

	function draw(p, color) {
		setup.ctx.fillStyle = color;
		setup.ctx.beginPath();
		setup.ctx.arc(p.x, p.y, p.radius, 0, Math.PI * 2, false);
		setup.ctx.fill();
	}

};