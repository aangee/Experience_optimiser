
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

window.onload = _ => {


	let nbsFonctionScript = ['f_Ifs', 'f_PyTree', 'f_PyTree_Anim', 'f_Tree', 'f_Tree_Anim'];

	let listFunc = [];
	let GeneratorFunction = Object.getPrototypeOf(function* () { }).constructor;
	for (let i = 0; i < nbsFonctionScript.length; i++) {
		let nameFunc = nbsFonctionScript[i];
		let btn = document.createElement('button');
		btn.addEventListener('click', () => { clickSwitch(i) });
		btn.textContent = nameFunc;
		container.appendChild(btn);

		/* let GeneratorFunction = Object.getPrototypeOf(function* () { }).constructor;
		let g = new GeneratorFunction("a", "yield a * 2");
		let itérateur = g(10); */
		/* let g = new GeneratorFunction("", `${nameFunc}();`); */
		//g().next();
		listFunc.push(new GeneratorFunction("", `${nameFunc}();`));
		//console.log(g); // 
		//let itérateur = g(10).next();
		//itérateur.next().value;
		/* console.log(GeneratorFunction); //
		console.log(itérateur); // 
		console.log(itérateur.next().value); // 20 */


	} 
	function clickSwitch(i) {
		listFunc[i]().next();
		console.log(listFunc);
	}
	


	f_Ifs();
};