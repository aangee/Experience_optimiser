const container = document.getElementById('js-selector');

window.onload = _ => {


	let nbsFonctionScript = ['f_Ifs', 'f_PyTree', 'f_PyTree_Anim', 'f_Tree', 'f_Tree_Anim'];

	for (let i = 0; i < nbsFonctionScript.length; i++) {
		let nameFunc = nbsFonctionScript[i].valueOf();
		let btn = document.createElement('button');
		btn.addEventListener('click', () => { `${nameFunc}`() });
		btn.textContent = nameFunc;
		container.appendChild(btn);
	}

	function clickSwitch() {
		console.log('hi');
	}



	f_Tree();
};