const M_PI = Math.PI;

//#region Debug
//Div pour le debug pos sourie
let DEBUG_DIV = document.querySelector('js-debug');
let DEBUG_COLOR = 'rgba(150, 25, 75, 0)';
//#endregion

const setup = new SetupCanvas();
const container = document.getElementById('js-selector');
let ID_Animation = 0;
let nbsFonctionScript = ['f_spring1', 'f_spring2', 'f_multigravity', 'f_orbit', 'f_game_cannon', 5, 'bdhgs', '', () => { }];
console.info('Nbs de function a charger ->', nbsFonctionScript.length);

const listFunc = [];
let GeneratorFunction2 = Object.getPrototypeOf(function* () { }).constructor;

for (let i = 0; i < nbsFonctionScript.length; i++) {
	let nameFunc = nbsFonctionScript[i];
	let btn = document.createElement('button');
	let sp = document.createElement('span');
	let funcTMP;


	if ((typeof nameFunc) === 'string') {
		if (nameFunc !== '' && nameFunc !== ' ') {
			funcTMP = new GeneratorFunction2("", `${nameFunc}();`);
		}
	}

//?
	//& console.debug(funcTMP);
//*
//^ 
	try {
		funcTMP().next();

		//! attention
		sp.innerHTML = ` `;
		btn.addEventListener('click', () => { clickSwitch(i) });
		btn.textContent = nameFunc;
		container.appendChild(btn);
		container.appendChild(sp);


		listFunc.push(funcTMP);
	} catch (err) {
		if (err instanceof ReferenceError) {
			console.log("La fonction n'existe pas");

		}
	}
}

console.debug('Function charger ->', listFunc.length);

console.debug('List charger ->');
console.debug(listFunc[0], listFunc[1], listFunc[2]);


function clickSwitch(i) {
	setup.clear();
	cancelAnimationFrame(ID_Animation);
	let t = setTimeout(() => {
		listFunc[i]().next();
		//console.debug('List func:', listFunc);
		clearTimeout(t);
	}, 500);
}




















//window.onload = f_game_cannon();

function f_game_cannon() {
	let canvas = document.getElementById("canvas"),
		context = canvas.getContext("2d"),
		width = canvas.width = window.innerWidth,
		height = canvas.height = window.innerHeight,
		gun = {
			x: 100,
			y: height,
			angle: -Math.PI / 4
		},
		cannonball = new Particle(gun.x, gun.y, 15, gun.angle, 0.2),
		isShooting = false,
		forceAngle = 0,
		forceSpeed = 0.1,
		rawForce = 0,
		target = {};

	cannonball.radius = 7;

	setTarget();
	update ();

	function setTarget() {
		target.x = utils.randomRange(200, width);
		target.y = height;
		target.radius = utils.randomRange(10, 40);
	}

	document.body.addEventListener("mousedown", onMouseDown);

	document.body.addEventListener("keydown", function(event) {
		switch(event.keyCode) {
			case 32: // space
				if(!isShooting) {
					shoot();
				}
				break;

			default:
				break;
		}
	});

	function shoot() {
		let force = utils.map(rawForce, -1, 1, 2, 20);
		cannonball.x = gun.x + Math.cos(gun.angle) * 40;
		cannonball.y = gun.y + Math.sin(gun.angle) * 40;
		cannonball.setSpeed(force);
		cannonball.setHeading(gun.angle);

		isShooting = true;
	}

	function update() {
		if(!isShooting) {
			forceAngle += forceSpeed;
		}
		rawForce = Math.sin(forceAngle);
		if(isShooting) {
			cannonball.update();
			checkTarget();
		}
		draw();

		if(cannonball.y > height) {
			isShooting = false;
		}
		requestAnimationFrame(update);
	}

	function checkTarget() {
		if(utils.circleCollision(target, cannonball)) {
			// create amazing collision reaction!!!
			setTarget();
		}
	}

	function onMouseDown(event) {
		document.body.addEventListener("mousemove", onMouseMove);
		document.body.addEventListener("mouseup", onMouseUp);
		aimGun(event.clientX, event.clientY);
	}

	function onMouseMove(event) {
		aimGun(event.clientX, event.clientY);
	}

	function onMouseUp(event) {
		document.body.removeEventListener("mousemove", onMouseMove);
		document.body.removeEventListener("mouseup", onMouseUp);
		aimGun(event.clientX, event.clientY);
	}

	function aimGun(mouseX, mouseY) {
		gun.angle = utils.clamp(Math.atan2(mouseY - gun.y, mouseX - gun.x), -Math.PI / 2, -0.3);
	}

	function draw() {
		context.clearRect(0, 0, width, height);

		context.fillStyle = "#ccc";
		context.fillRect(10, height - 10, 20, -100);

		context.fillStyle = "#666";
		context.fillRect(10, height - 10, 20, utils.map(rawForce, -1, 1, 0, -100));

		context.fillStyle = "#ff000";

		context.beginPath();
		context.arc(gun.x, gun.y, 24, 0, Math.PI * 2, false);
		context.fill();

		context.save();
		context.translate(gun.x, gun.y);
		context.rotate(gun.angle);
		context.fillRect(0, -8, 40, 16);
		context.restore();

		context.beginPath();
		context.arc(cannonball.x,
					cannonball.y,
					cannonball.radius,
					0, Math.PI * 2, false);
		context.fill();

		context.fillStyle = "red";
		context.beginPath();
		context.arc(target.x, target.y, target.radius, 0, Math.PI * 2, false);
		context.fill();
	}

};