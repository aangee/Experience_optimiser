function f_multigravity() {

	const w = setup.width, h = setup.height;
	const margin = 150;

	let sun1 = new Particle(w * 0.204, h * 0.776, 0, 0),
		sun2 = new Particle(w * 0.711, h * 0.539, 0, 0),
		emitter      = { x: w * 0.860, y: h * 0.792, dir: -0.75 },
		particles    = [],
		numParticles = 25,
		ejectedCount = 0,
		baseSpeed    = 2.2;

	sun1.mass   = 500;
	sun1.radius = 12;
	sun2.mass   = 910;
	sun2.radius = 20;

	for (let i = 0; i < numParticles; i++) {
		particles.push(spawn());
	}

	// ── Interactions ────────────────────────────────────────
	let dragging = null;

	setup.canvas.addEventListener('mousedown', (e) => {
		const mx = e.clientX, my = e.clientY;
		if (hit(mx, my, sun1.x, sun1.y, sun1.radius + 12))      dragging = 'sun1';
		else if (hit(mx, my, sun2.x, sun2.y, sun2.radius + 12)) dragging = 'sun2';
		else if (hit(mx, my, emitter.x, emitter.y, 16))         dragging = 'emitter';
	});
	setup.canvas.addEventListener('mousemove', (e) => {
		if (!dragging) return;
		if (dragging === 'sun1')    { sun1.x = e.clientX; sun1.y = e.clientY; }
		if (dragging === 'sun2')    { sun2.x = e.clientX; sun2.y = e.clientY; }
		if (dragging === 'emitter') { emitter.x = e.clientX; emitter.y = e.clientY; }
	});
	setup.canvas.addEventListener('mouseup',    () => { dragging = null; });
	setup.canvas.addEventListener('mouseleave', () => { dragging = null; });

	// Molette : rotation émetteur ou masse des soleils
	setup.canvas.addEventListener('wheel', (e) => {
		e.preventDefault();
		const mx = e.clientX, my = e.clientY;
		if (hit(mx, my, emitter.x, emitter.y, 30)) {
			if (e.shiftKey) {
				baseSpeed = Math.max(0.5, Math.min(15, baseSpeed - e.deltaY * 0.01));
			} else {
				emitter.dir += e.deltaY * 0.005;
			}
		} else if (hit(mx, my, sun1.x, sun1.y, sun1.radius + 12)) {
			sun1.mass = Math.max(500, sun1.mass - e.deltaY * 10);
		} else if (hit(mx, my, sun2.x, sun2.y, sun2.radius + 12)) {
			sun2.mass = Math.max(500, sun2.mass - e.deltaY * 10);
		}
	}, { passive: false });

	function hit(mx, my, x, y, r) {
		const dx = mx - x, dy = my - y;
		return Math.sqrt(dx * dx + dy * dy) <= r;
	}

	// ── Boucle ──────────────────────────────────────────────
	update();

	function spawn() {
		let p = new Particle(emitter.x, emitter.y, utils.randomRange(baseSpeed * 0.85, baseSpeed * 1.15), emitter.dir + utils.randomRange(-0.02, 0.02));
		p.addGravitation(sun1);
		p.addGravitation(sun2);
		p.radius = 2;
		return p;
	}

	function update() {
		setup.ctx.clearRect(0, 0, w, h);

		drawSun(sun1, '#ffaa33');
		drawSun(sun2, '#ffff00');
		drawEmitter();

		let visibleCount = 0;

		for (let i = particles.length - 1; i >= 0; i--) {
			let p = particles[i];
			p.update();

			if (p.x > w + margin || p.x < -margin || p.y > h + margin || p.y < -margin) {
				particles.splice(i, 1);
				ejectedCount++;
				particles.push(spawn());
			} else {
				drawDot(p, 'lightblue');
				if (p.x >= 0 && p.x <= w && p.y >= 0 && p.y <= h) visibleCount++;
			}
		}

		drawPanel(visibleCount);
		window._rafId = requestAnimationFrame(update);
	}

	// ── Dessin ──────────────────────────────────────────────
	function drawSun(p, color) {
		setup.ctx.fillStyle = color;
		setup.ctx.beginPath();
		setup.ctx.arc(p.x, p.y, p.radius, 0, Math.PI * 2);
		setup.ctx.fill();
	}

	function drawEmitter() {
		const ctx = setup.ctx, ex = emitter.x, ey = emitter.y, arrLen = 22;
		ctx.strokeStyle = 'rgba(255,255,255,0.7)';
		ctx.lineWidth = 1.5;
		ctx.beginPath();
		ctx.arc(ex, ey, 6, 0, Math.PI * 2);
		ctx.stroke();
		ctx.beginPath();
		ctx.moveTo(ex, ey);
		ctx.lineTo(ex + Math.cos(emitter.dir) * arrLen, ey + Math.sin(emitter.dir) * arrLen);
		ctx.stroke();
	}

	function drawDot(p, color) {
		setup.ctx.fillStyle = color;
		setup.ctx.beginPath();
		setup.ctx.arc(p.x, p.y, p.radius, 0, Math.PI * 2);
		setup.ctx.fill();
	}

	function drawPanel(visibleCount) {
		const ctx = setup.ctx;
		const x = 10, y = 10, w = 218, pad = 14;
		const lines = [
			{ c: '#ffaa33', t: `S1 : (${Math.round(sun1.x)}, ${Math.round(sun1.y)})  m:${sun1.mass}` },
			{ c: '#ffff00', t: `S2 : (${Math.round(sun2.x)}, ${Math.round(sun2.y)})  m:${sun2.mass}` },
			{ c: 'rgba(255,255,255,0.7)', t: `Em : (${Math.round(emitter.x)}, ${Math.round(emitter.y)})  dir:${Math.round(emitter.dir * 180 / Math.PI)}°  v:${baseSpeed.toFixed(1)}` },
			{ c: 'lightblue', t: `Visibles  : ${visibleCount} / ${numParticles}` },
			{ c: '#ff9966',   t: `Éjectées  : ${ejectedCount}` },
		];
		ctx.fillStyle = 'rgba(0,0,0,0.55)';
		ctx.fillRect(x, y, w, pad + lines.length * 17 + 6);
		ctx.font = '11px monospace';
		lines.forEach((l, i) => {
			ctx.fillStyle = l.c;
			ctx.fillText(l.t, x + pad, y + pad + i * 17);
		});
	}

};