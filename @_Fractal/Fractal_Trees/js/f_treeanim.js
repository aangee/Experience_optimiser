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



	function draw() {
		setup.ctx.clearRect(0, 0, setup.width, setup.height);
		branchAngleA = Math.cos(tA += tAS) * Math.PI / 2;
		branchAngleB = Math.cos(tB += tBS) * Math.PI / 2;

		treeAnimation(p0, p1, 8);
		requestAnimationFrame(draw);
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