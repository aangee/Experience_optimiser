function Run_LineInteractive() {

	let setup = new Setup();

	setup.points = [
		// Line 00
		{ x: setup.width * .1, y: setup.height * .1 },
		{ x: setup.width * .8, y: setup.height * .8 },
		// Line 01
		{ x: setup.width * .8, y: setup.height * .1 },
		{ x: setup.width * .1, y: setup.height * .9 },
		// Line 02
		{ x: setup.width * .1, y: setup.height * .4 },
		{ x: setup.width * .4, y: setup.height * .3 }
	];

	setup.colorSettings = {
		colorControl: "orange",
		colorLine: "gold",
		colorPointInterct: "red"
	};


	document.body.addEventListener("mousedown", onMouseDown);

	function onMouseDown(event) {
		setup.clickPoint = getClickPoint(event.clientX, event.clientY);
		if (setup.clickPoint) {
			document.body.addEventListener("mousemove", onMouseMove);
			document.body.addEventListener("mouseup", onMouseUp);
		}
	}

	function onMouseMove(event) {
		setup.clickPoint.x = event.clientX;
		setup.clickPoint.y = event.clientY;
		render();
	}

	function onMouseUp(event) {
		document.body.removeEventListener("mousemove", onMouseMove);
		document.body.removeEventListener("mouseup", onMouseUp);
	}

	function getClickPoint(x, y) {
		var points = setup.points;
		for (var i = 0; i < points.length; i++) {
			var p = points[i],
				dx = p.x - x,
				dy = p.y - y,
				dist = Math.sqrt(dx * dx + dy * dy);
			if (dist < 10) {
				return p;
			}

		}
	}


	render();

	function render() {
		setup.ctx.clearRect(0, 0, setup.width, setup.height);

		let line0 = drawLine(setup.points[0], setup.points[1]);
		let line1 = drawLine(setup.points[2], setup.points[3]);
		let line2 = drawLine(setup.points[4], setup.points[5]);

		drawControlLine(line0);
		drawControlLine(line1);
		drawControlLine(line2);


		drawHit(lineIntersect(line0, line1));
		drawHit(lineIntersect(line1, line2));
		drawHit(lineIntersect(line2, line0));


		var intersect0 = segmentIntersect(line0, line1);
		var intersect1 = segmentIntersect(line1, line2);
		var intersect2 = segmentIntersect(line2, line0);

		if (intersect0) {
			drawPoint(intersect0,'lightgreen');
		}
		if (intersect1) {
			drawPoint(intersect1,'cyan');
		}
		if (intersect2) {
			drawPoint(intersect2,'red');
		}
	}

	function drawLine(p0, p1) {
		setup.ctx.beginPath();
		setup.ctx.lineWidth = .5;
		setup.ctx.strokeStyle = setup.colorSettings.colorLine;
		setup.ctx.moveTo(p0.x, p0.y);
		setup.ctx.lineTo(p1.x, p1.y);
		setup.ctx.stroke();

		return { p0, p1 }
	}

	function drawControlLine(line) {
		drawPoint(line.p0);
		drawPoint(line.p1);

	}

	function drawPoint(p,col) {
		setup.ctx.beginPath();
		setup.ctx.fillStyle = col || setup.colorSettings.colorControl;
		setup.ctx.arc(p.x, p.y, 7, 0, Math.PI * 2, false);
		setup.ctx.fill();
	}

	function drawHit(p) {

		setup.ctx.beginPath();
		setup.ctx.strokeStyle = setup.colorSettings.colorPointInterct;
		setup.ctx.arc(p.x, p.y, 5, 0, Math.PI * 2, false);
		setup.ctx.stroke();
	}

	// Utils
	function lineIntersect(line0, line1) {
		let p0 = line0.p0,
			p1 = line0.p1,
			p2 = line1.p0,
			p3 = line1.p1;

		var A1 = p1.y - p0.y,
			B1 = p0.x - p1.x,
			C1 = A1 * p0.x + B1 * p0.y,
			A2 = p3.y - p2.y,
			B2 = p2.x - p3.x,
			C2 = A2 * p2.x + B2 * p2.y,
			denominator = A1 * B2 - A2 * B1;

		return {
			x: (B2 * C1 - B1 * C2) / denominator,
			y: (A1 * C2 - A2 * C1) / denominator
		}
	}

	function segmentIntersect(line0, line1) {
		let p0 = line0.p0,
			p1 = line0.p1,
			p2 = line1.p0,
			p3 = line1.p1;

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

		if (
			((rx0 >= 0 && rx0 <= 1) || (ry0 >= 0 && ry0 <= 1)) &&
			((rx1 >= 0 && rx1 <= 1) || (ry1 >= 0 && ry1 <= 1))
		) {
			return {
				x: intersectX,
				y: intersectY,
			};
		} else {
			return null;
		}
	}
};