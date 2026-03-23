function f_orbit() {

	let sun    = new Particle(setup.width / 2,       setup.height / 2, 0,  0);
	let planet = new Particle(setup.width / 2 + 200, setup.height / 2, 10, -Math.PI / 2);

	sun.mass = 20000;

	update();

	function update() {
		setup.ctx.clearRect(0, 0, setup.width, setup.height);

		planet.gravitateTo(sun);
		planet.update();

		setup.ctx.lineWidth = 2;

		// Soleil
		setup.ctx.beginPath();
		setup.ctx.strokeStyle = '#ffff00';
		setup.ctx.arc(sun.x, sun.y, 20, 0, Math.PI * 2, false);
		setup.ctx.stroke();

		// Planète
		setup.ctx.beginPath();
		setup.ctx.strokeStyle = '#4488ff';
		setup.ctx.arc(planet.x, planet.y, 8, 0, Math.PI * 2, false);
		setup.ctx.stroke();

		window._rafId = requestAnimationFrame(update);
	}
};