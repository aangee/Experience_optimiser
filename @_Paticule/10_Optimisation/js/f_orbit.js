function f_orbit() {

	let sun = new Particle(setup.width / 2, setup.height / 2, 0, 0);
	let planet = new Particle(setup.width / 2 + 200, setup.height / 2, 10, -Math.PI / 2);

	sun.mass = 20000;

	update();


	function update() {
		setup.ctx.clearRect(0, 0, setup.width, setup.height);

		// animation goes here

		planet.gravitateTo(sun);
		planet.update();

		setup.ctx.beginPath();
		setup.ctx.fillStyle = "#ffff00";
		setup.ctx.arc(sun.x, sun.y, 20, 0, Math.PI * 2, false);
		setup.ctx.fill();

		setup.ctx.beginPath();
		setup.ctx.fillStyle = "#0000ff";
		setup.ctx.arc(planet.x, planet.y, 4, 0, Math.PI * 2, false);
		setup.ctx.fill();

		requestAnimationFrame(update);
	}
};