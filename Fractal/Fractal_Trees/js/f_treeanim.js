function f_Tree_Anim() {

	let setup = new SetupCanvas();


	let p0 = {
		x: setup.width / 2,
		y: setup.height - 50
	};
	let p1 = {
		x: setup.width / 2,
		y: 50
	};
	let branchAngleA;
	let branchAngleB;
	let trunkRatio = 0.35;
	let tA = Math.PI;
	let tAS = 0.01;
	let tB = 0;
	let tBS = 0.01437;
	let baseHue = 15;

	window._modeParams = [
		{ label: 'Ratio tronc', get: () => trunkRatio, set: v => { trunkRatio = +v; }, min: 0.1, max: 0.9, step: 0.05 },
		{ label: 'Vitesse A',   get: () => tAS,        set: v => { tAS        = +v; }, min: 0.001, max: 0.05, step: 0.001 },
		{ label: 'Vitesse B',   get: () => tBS,        set: v => { tBS        = +v; }, min: 0.001, max: 0.05, step: 0.001 },
		{ label: 'Teinte (°)',  get: () => baseHue,    set: v => { baseHue    = +v; }, min: 0, max: 360, step: 5 }
	];



	function draw() {
		setup.ctx.clearRect(0, 0, setup.width, setup.height);
		branchAngleA = Math.cos(tA += tAS) * Math.PI / 2;
		branchAngleB = Math.cos(tB += tBS) * Math.PI / 2;

		treeAnimation(p0, p1, 8);
		window._rafId = requestAnimationFrame(draw);
	}
	draw();

	function treeAnimation(p0, p1, limit) {
		var dx = p1.x - p0.x,
			dy = p1.y - p0.y,
			dist = Math.sqrt(dx * dx + dy * dy),
			angle = Math.atan2(dy, dx),
			branchLength = dist * (1 - trunkRatio),
			pA = {
				x: p0.x + dx * trunkRatio,
				y: p0.y + dy * trunkRatio
			},
			pB = {
				x: pA.x + Math.cos(angle + branchAngleA) * branchLength,
				y: pA.y + Math.sin(angle + branchAngleA) * branchLength,
			},
			pC = {
				x: pA.x + Math.cos(angle + branchAngleB) * branchLength,
				y: pA.y + Math.sin(angle + branchAngleB) * branchLength,
			};

		const ratio = limit / 8;
		const hue = baseHue + (1 - ratio) * 100;
		const lightness = 30 + (1 - ratio) * 25;
		setup.ctx.strokeStyle = `hsl(${hue}, 70%, ${lightness}%)`;
		setup.ctx.lineWidth = 1 + ratio * 3;

		setup.ctx.beginPath();
		setup.ctx.moveTo(p0.x, p0.y);
		setup.ctx.lineTo(pA.x, pA.y);
		setup.ctx.stroke();

		if (limit > 0) {
			treeAnimation(pA, pC, limit - 1);
			treeAnimation(pA, pB, limit - 1);
		}
		else {
			setup.ctx.beginPath();
			setup.ctx.moveTo(pB.x, pB.y);
			setup.ctx.lineTo(pA.x, pA.y);
			setup.ctx.lineTo(pC.x, pC.y);
			setup.ctx.stroke();
		}
	}
};