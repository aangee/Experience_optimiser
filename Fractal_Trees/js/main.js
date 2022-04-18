const container = document.getElementById('js-selector');

window.onload = _ => {


	let nbsFonctionScript = ['f_Ifs', 'f_PyTree', 'f_PyTree_Anim', 'f_Tree', 'f_Tree_Anim'];

	for (let i = 0; i < nbsFonctionScript.length; i++) {
		let nameFunc = nbsFonctionScript[i];
		let btn = document.createElement('button');
		btn.addEventListener('click', ()=>{clickSwitch(nameFunc)});
		btn.textContent = nameFunc;
		container.appendChild(btn);

		/*var GeneratorFunction = Object.getPrototypeOf(function*(){}).constructor;
var g = new GeneratorFunction("a", "yield a * 2");
var itérateur = g(10);
console.log(itérateur.next().value); // 20*/

	}

	function clickSwitch(name) {
		
		name();

		console.debug(name,name());
	}



	f_Tree();
};