
function f_PyTree_Anim() {
	var canvas = document.getElementById("canvas"),
		context = canvas.getContext("2d"),
		width = canvas.width = window.innerWidth,
		height = canvas.height = window.innerHeight;

	var branchAngleA = 0,
		t = 0;

	draw();

	function draw() {
		context.clearRect(0, 0, width, height);
		branchAngleA = -Math.PI / 4 - Math.sin(t += 0.01) * Math.PI / 4;
		context.fillStyle = 'brown';
		tree(width * .5, height * .8, 40, 0, 2);
		requestAnimationFrame(draw);
	}

	function tree(x, y, size, angle, limit) {
		context.save();
		context.translate(x, y);
		context.rotate(angle);
		context.fillRect(0, 0, size, -size);

		// left branch
		let x0 = 0;
		let y0 = -size;
		let size0 = Math.abs(Math.cos(branchAngleA) * size);
		let angle0 = branchAngleA;

		if (limit > 0) {
			context.fillStyle = 'rgba(140,120,100,.2)';
			tree(x0, y0, size0, angle0, limit - 1);
		}
		else {
			context.fillStyle = 'pink';
			context.save();
			context.translate(x0, y0);
			context.rotate(angle0);
			context.fillRect(0, 0, size0, -size0);
			context.restore();
		}

		// right branch
		let x1 = x0 + Math.cos(angle0) * size0;
		let y1 = y0 + Math.sin(angle0) * size0;
		let size1 = Math.abs(Math.sin(branchAngleA) * size);
		let angle1 = angle0 + Math.PI / 2;

		if (limit > 0) {
			context.fillStyle = 'rgba(140,120,100,.2)';
			tree(x1, y1, size1, angle1, limit - 1);
		}
		else {
			context.fillStyle = 'lime';
			context.save();
			context.translate(x1, y1);
			context.rotate(angle1);
			context.fillRect(0, 0, size1, -size1);
			context.restore();
		}


		context.restore();
	}
};