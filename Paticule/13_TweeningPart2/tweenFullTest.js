
window.onload = function () {

	let setup = new SetupCanvas();
	let ball = {
			x: 100,
			y: 100,
			alpha: 1
	};
	let mouse = {
			x: 100,
			y: 100
		};

	tween(ball, { x: setup.width - 50, y: setup.height - 50, alpha: .1 }, 1000, easeInOutQuad, render, tweenBack);

	document.body.addEventListener('click', (event) => {
		console.log(event.button);
		var ex = event.clientX, ey = event.clientY;


		if (event.shiftKey) {

			mouse.x = ex;
			mouse.y = ey;
			tween(ball, { x: ex, y: ey, alpha: 1 }, 2000, easeOutQuad, render, render);
			
		}else{

			tween(ball, { x: ex, y: ey, alpha: 0.5 }, 1000, easeInOutQuad, render, tweenBack);
		}

	});



	function tweenBack() {
		tween(ball, { x: mouse.x, y: mouse.y, alpha: 1 }, 1000, easeInOutQuad, render, render);
	}

	function tween(obj, props, duration, easingFunc, onProgress, onComplete) {
		var starts = {},
			changes = {},
			startTime = new Date();

		for (var prop in props) {
			starts[prop] = obj[prop];
			changes[prop] = props[prop] - starts[prop];
		}

		update();

		function update() {
			var time = new Date() - startTime;
			if (time < duration) {
				for (var prop in props) {
					obj[prop] = easingFunc(time, starts[prop], changes[prop], duration);
				}
				onProgress();
				requestAnimationFrame(update);
			}
			else {
				time = duration;
				for (var prop in props) {
					obj[prop] = easingFunc(time, starts[prop], changes[prop], duration);
				}
				onComplete();
			}
		}
	}


	function render() {
		setup.ctx.clearRect(0, 0, setup.width, setup.height);
		setup.ctx.beginPath();
		setup.ctx.globalAlpha = ball.alpha;
		setup.ctx.fillStyle = 'red';
		setup.ctx.arc(ball.x, ball.y, 20, 0, Math.PI * 2, false);
		setup.ctx.fill();
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
};