
function f_PyTree_Anim() {

	let setup = new SetupCanvas();
	let branchAngleA = 0;
	let t = 0;

	draw();

	function draw() {
		setup.ctx.clearRect(0, 0, setup.width, setup.height);
		branchAngleA = -Math.PI / 4 - Math.sin(t += 0.01) * Math.PI / 4;
		setup.ctx.fillStyle = 'brown';
		tree(setup.width * .5, setup.height * .8, 40, 0, 2);
		requestAnimationFrame(draw);
	}

	function tree(x, y, size, angle, limit) {
		setup.ctx.save();
		setup.ctx.translate(x, y);
		setup.ctx.rotate(angle);
		setup.ctx.fillRect(0, 0, size, -size);

		// left branch
		let x0 = 0;
		let y0 = -size;
		let size0 = Math.abs(Math.cos(branchAngleA) * size);
		let angle0 = branchAngleA;

		if (limit > 0) {
			setup.ctx.fillStyle = 'rgba(140,120,100,.2)';
			tree(x0, y0, size0, angle0, limit - 1);
		}
		else {
			setup.ctx.fillStyle = 'pink';
			setup.ctx.save();
			setup.ctx.translate(x0, y0);
			setup.ctx.rotate(angle0);
			setup.ctx.fillRect(0, 0, size0, -size0);
			setup.ctx.restore();
		}

		// right branch
		let x1 = x0 + Math.cos(angle0) * size0;
		let y1 = y0 + Math.sin(angle0) * size0;
		let size1 = Math.abs(Math.sin(branchAngleA) * size);
		let angle1 = angle0 + Math.PI / 2;

		if (limit > 0) {
			setup.ctx.fillStyle = 'rgba(140,120,100,.2)';
			tree(x1, y1, size1, angle1, limit - 1);
		}
		else {
			setup.ctx.fillStyle = 'lime';
			setup.ctx.save();
			setup.ctx.translate(x1, y1);
			setup.ctx.rotate(angle1);
			setup.ctx.fillRect(0, 0, size1, -size1);
			setup.ctx.restore();
		}


		setup.ctx.restore();
	}
};