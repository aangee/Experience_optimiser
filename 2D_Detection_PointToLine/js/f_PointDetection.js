function Run_PointToLine_Detection() {

	let setup = new SetupCanvas();

	var particle = new Particle(setup.width / 2, setup.height / 2);
	let lines = [];
	let ID_Animation = 0;

	//Creation de line avec des points random
	for (var i = 0; i < 7; i++) {
		lines[i] = new Line().Random(setup.width, setup.height);
	}

	document.body.addEventListener("click", onClick);
	function onClick(event) {
		particle = new Particle(setup.width / 2, setup.height / 2);
	}
	update();

	function update() {
		ID_Animation = requestAnimationFrame(update);
		setup.ctx.clearRect(0, 0, setup.width, setup.height);
		drawLines();

		var p0 = new Particle(particle.x, particle.y);

		particle.x += particle.vx;
		particle.y += particle.vy;
		setup.ctx.fillStyle = 'cyan';
		setup.ctx.fillRect(particle.x, particle.y, 4, 4);
		setup.ctx.fill();

		var p1 = new Particle(particle.x + (particle.vx), particle.y + (particle.vy));


		for (var i = 0; i < lines.length; i++) {
			var p2 = lines[i].p0,
				p3 = lines[i].p1;

			var intersect = segmentIntersect(p0, p1, p2, p3);
			if (intersect) {
				setup.ctx.beginPath();
				setup.ctx.strokeStyle = "rgb(255,0,0)";
				setup.ctx.arc(intersect.x, intersect.y, 20, 0, Math.PI * 2, false);
				setup.ctx.stroke();
				cancelAnimationFrame(ID_Animation);

				//Pour voir ou l'on detecte sinon sa relance direct et a pas le temps voir
				let d = setTimeout(() => {

					particle = new Particle(setup.width / 2, setup.height / 2);
					ID_Animation = requestAnimationFrame(update);
					clearTimeout(d);
				}, 200);
			}
		}

	}

	function drawLines() {
		setup.ctx.beginPath();
		setup.ctx.strokeStyle = "green";
		for (var i = 0; i < lines.length; i++) {
			setup.ctx.moveTo(lines[i].p0.x, lines[i].p0.y);
			setup.ctx.lineTo(lines[i].p1.x, lines[i].p1.y);
		}
		setup.ctx.stroke();
	}

	function segmentIntersect(p0, p1, p2, p3) {
		var A1 = p1.y - p0.y,
			B1 = p0.x - p1.x,
			C1 = A1 * p0.x + B1 * p0.y,
			A2 = p3.y - p2.y,
			B2 = p2.x - p3.x,
			C2 = A2 * p2.x + B2 * p2.y,
			denominator = A1 * B2 - A2 * B1;

		if (denominator == 0) {
			return null;
		}

		var intersectX = (B2 * C1 - B1 * C2) / denominator,
			intersectY = (A1 * C2 - A2 * C1) / denominator,
			rx0 = (intersectX - p0.x) / (p1.x - p0.x),
			ry0 = (intersectY - p0.y) / (p1.y - p0.y),
			rx1 = (intersectX - p2.x) / (p3.x - p2.x),
			ry1 = (intersectY - p2.y) / (p3.y - p2.y);

		if (((rx0 >= 0 && rx0 <= 1) || (ry0 >= 0 && ry0 <= 1)) &&
			((rx1 >= 0 && rx1 <= 1) || (ry1 >= 0 && ry1 <= 1))) {
			return {
				x: intersectX,
				y: intersectY
			};
		}
		else {
			return null;
		}
	}
};