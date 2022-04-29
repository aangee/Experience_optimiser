window.onload = function() {
	let canvas = document.getElementById("canvas");
	/**@type {CanvasRenderingContext2D} */
	let context = canvas.getContext("2d");
	let width = canvas.width = window.innerWidth;
	let height = canvas.height = window.innerHeight;
	let angle = 0;
	let targetAngle = 0;
	let limitAngle = .35;
	let ease = 0.05;
	let wheel;

	wheel = document.createElement("img");
	wheel.addEventListener("load", function() {
		render();
	});
	wheel.src = "wheel.png";


	function render() {
		requestAnimationFrame(render);
		context.clearRect(0, 0, width, height);

		angle += (targetAngle - angle) * ease;

		context.save();
		context.translate(width / 2, height / 2);
		context.rotate(angle);

		context.drawImage(wheel, -wheel.width / 2, -wheel.height / 2);

		context.restore();
	}

	document.body.addEventListener("mousemove", function(event) {
		targetAngle = utils.map(event.clientX, 0, width, -Math.PI * limitAngle, Math.PI * limitAngle);
	});


};