window.onload = function () {
	var canvas = document.getElementById("canvas"),
		context = canvas.getContext("2d"),
		width = canvas.width = window.innerWidth,
		height = canvas.height = window.innerHeight,
		start = {
			x: 100,
			y: 100
		},
		target = {},
		change = {},
		startTime,
		duration = 1000;

	drawCircle(start.x, start.y, 5, 'red');


	document.body.addEventListener("click", function (event) {
		target.x = event.clientX;
		target.y = event.clientY;
		change.x = target.x - start.x;
		change.y = target.y - start.y;
		startTime = new Date();
		update();
	});
	document.body.addEventListener('mousemove', (event) => {
		console.log(event.button);
		if (event.shiftKey) {

			target.x = event.clientX;
			target.y = event.clientY;

			change.x = (target.x - start.x);
			change.y = (target.y - start.y);

			startTime = new Date();
			/* if (!easing) {
				easing = true;
				update();
			} */
			update();
		}
	});

	function update() {
		context.clearRect(0, 0, width, height);

		var time = new Date() - startTime;
		if (time < duration) {
			var x = easeInOutQuad(time, start.x, change.x, duration),
				y = easeInOutQuad(time, start.y, change.y, duration);
			drawCircle(x, y, 5, 'red');
			requestAnimationFrame(update);
		}
		else {
			drawCircle(target.x, target.y, 5, 'red');
			start.x = target.x;
			start.y = target.y;
		}

	}

	// simple linear tweening - no easing
	// t: current time, b: beginning value, c: change in value, d: duration
	function linearTween(t, b, c, d) {
		return c * t / d + b;
	}

	///////////// QUADRATIC EASING: t^2 ///////////////////

	// quadratic easing in - accelerating from zero velocity
	// t: current time, b: beginning value, c: change in value, d: duration
	// t and d can be in frames or seconds/milliseconds
	function easeInQuad(t, b, c, d) {
		return c * (t /= d) * t + b;
	};

	// quadratic easing out - decelerating to zero velocity
	function easeOutQuad(t, b, c, d) {
		return -c * (t /= d) * (t - 2) + b;
	};

	// quadratic easing in/out - acceleration until halfway, then deceleration
	function easeInOutQuad(t, b, c, d) {
		if ((t /= d / 2) < 1) return c / 2 * t * t + b;
		return -c / 2 * ((--t) * (t - 2) - 1) + b;
	};



	function drawCircle(x, y, radius = 5, color = 'red') {

		context.beginPath();
		context.fillStyle = color;
		context.arc(x, y, radius, 0, Math.PI * 2, false);
		context.fill();
	}

};