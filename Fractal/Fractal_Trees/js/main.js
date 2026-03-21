
//#region Setup
class SetupCanvas {
	constructor(params) {
		this.canvas = document.getElementById("canvas");

		/**@type {CanvasRenderingContext2D} */
		this.ctx = canvas.getContext("2d");
		this.width = canvas.width = window.innerWidth;
		this.height = canvas.height = window.innerHeight;

	}
}
//#endregion



const container = document.getElementById('js-selector');
const paramsPanel = document.getElementById('params-panel');

// Empêche les clics sur le panel (sliders, boutons) de bubler vers les listeners body/canvas des modes
paramsPanel.addEventListener('click', e => e.stopPropagation());
container.addEventListener('click', e => e.stopPropagation());

let currentModeIndex = 0;
let listFunc = [];

window.onload = _ => {

	let nbsFonctionScript = ['f_Ifs', 'f_PyTree', 'f_PyTree_Anim', 'f_Tree', 'f_Tree_Anim'];

	let GeneratorFunction = Object.getPrototypeOf(function* () { }).constructor;
	for (let i = 0; i < nbsFonctionScript.length; i++) {
		let nameFunc = nbsFonctionScript[i];
		let btn = document.createElement('button');
		btn.addEventListener('click', () => { clickSwitch(i); });
		btn.textContent = nameFunc;
		container.appendChild(btn);

		listFunc.push(new GeneratorFunction("", `${nameFunc}();`));
	}

	// Démarrage du mode initial
	clickSwitch(0);
};

function clickSwitch(i) {
	cancelAnimationFrame(window._rafId);
	window._modeParams    = [];
	window._modeRandomize = null;
	currentModeIndex = i;
	listFunc[i]().next();
	renderParams(window._modeParams || []);
}

/**
 * Génère le panneau de paramètres pour le mode actif.
 * Les sliders ne s'appliquent PAS en live — cliquer "Relancer" pour appliquer.
 * @param {Array} defs          - tableau de { label, get, set, min, max, step }
 * @param {Array} [savedValues] - valeurs à afficher (après un Relancer)
 */
function renderParams(defs, savedValues) {
	paramsPanel.innerHTML = '';
	if (!defs.length) return;

	defs.forEach(({ label, get, min, max, step }, i) => {
		const row = document.createElement('div');
		row.className = 'param-row';

		const lbl = document.createElement('label');
		lbl.textContent = label;

		const input = document.createElement('input');
		input.type = 'range';
		input.min = min;
		input.max = max;
		input.step = step;
		// Priorité aux valeurs sauvegardées (après Relancer), sinon valeur courante
		const displayVal = (savedValues && savedValues[i] !== undefined) ? savedValues[i] : get();
		input.value = displayVal;

		const val = document.createElement('span');
		val.className = 'param-value';
		val.textContent = displayVal;

		// Affiche la valeur en cours de glissement mais n'applique pas encore
		input.addEventListener('input', () => {
			val.textContent = input.value;
		});

		row.appendChild(lbl);
		row.appendChild(input);
		row.appendChild(val);
		paramsPanel.appendChild(row);
	});

	const btnRow = document.createElement('div');
	btnRow.style.cssText = 'display:flex;gap:8px;margin-top:4px;';

	// Bouton Relancer :
	// 1. Lit les valeurs des sliders AVANT de redémarrer
	// 2. Redémarre le mode (nouvelles variables locales, nouveaux setters)
	// 3. Applique les valeurs sauvegardées sur les nouveaux setters
	const btn = document.createElement('button');
	btn.className = 'param-restart';
	btn.textContent = '↺ Relancer';
	btn.addEventListener('click', () => {
		// 1. Capture les valeurs slider AVANT tout changement
		const inputs = paramsPanel.querySelectorAll('input[type=range]');
		const saved = Array.from(inputs).map(inp => +inp.value);

		// 2. Cancel + redémarrer le mode (réinitialise les variables locales)
		cancelAnimationFrame(window._rafId);
		window._modeParams    = [];
		window._modeRandomize = null;
		listFunc[currentModeIndex]().next();

		// 3. Appliquer sur les NOUVEAUX setters (nouveaux closures du nouveau scope)
		const newDefs = window._modeParams || [];
		saved.forEach((v, i) => { if (newDefs[i]) newDefs[i].set(v); });

		// 4. Re-rendre le panneau en affichant les valeurs choisies
		renderParams(newDefs, saved);
	});
	btnRow.appendChild(btn);

	// Bouton Aléatoire (uniquement si le mode expose window._modeRandomize)
	if (window._modeRandomize) {
		const rndBtn = document.createElement('button');
		rndBtn.className = 'param-restart';
		rndBtn.textContent = '🎲 Aléatoire';
		rndBtn.addEventListener('click', () => {
			if (window._modeRandomize) {
				window._modeRandomize();
				renderParams(window._modeParams || []);
			}
		});
		btnRow.appendChild(rndBtn);
	}

	paramsPanel.appendChild(btnRow);
}
