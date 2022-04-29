let DEBUG_ELEMENT = document.getElementById('js-debug');
let CONTAINER_ELEMENT = document.getElementById('js-selector');
DEBUG_ELEMENT.textContent = 'hello game';





/** //& Appel de function pas 'REFERENCE'
 * ^ Ici on appel des function 
 * ^ charger par le  DOM, avec des balise srcipt
 * ToDo: On charge juste la function dans le tableau mais on ne appel pas */

// * On se cree un tableau avec les ref des function
let listFunc = [f_test_01, f_test_02, f_test_master]; // les fuction son dans les 3 ficher ' f_test_XX.js '

// * On lance une function 'f_test_02'
// ! Dans le bloc de la function ' this ' fai ref au tableau " listFunc "
listFunc[1]();





/** //& Appel de function par function 'ANONYME'
 * ^ Ici on appel des function
 * ^ charger par le  DOM, avec des balise srcipt
 * ToDo: On charge la function dans le tableau mais on ne appel pas */

// * On se cree un tableau avec des function anonyme qui lanceront leur function le moment voulu (click btn, ect...)
let f = [() => { f_test_01() }, () => { f_test_02() }, () => { f_test_master() }]

// * On lance la function 'f_test_02'
// ! Dans le bloc de la function ' this ' fai ref a " window "
f[1]();





/** //& Creation d'une function content plusieur (property, function)
 * ^ On cree notre MasterFunction qui nous return un object 
 * ^ avec cette object cree, on appel la function a l'interier 'createElememt()'
 * ^ elle nous reture un (elementHTML ou Node) 
 * ToDo: (la sa cree juste un btn et on change un peu le style)
 * ^ ensuite avec MasterFunction on change un peu style de element 
 * ! et ne pas oublier de ajoute au DOM */

let elmCreator = new f_test_master();
let tmpElm = elmCreator.createElememt({ label: 'CouCou', typeElement: 'button', color: 'gold', size: { w: 200 } });
elmCreator.changeStyle(tmpElm, { label: 'hello game', color: 'red' });
CONTAINER_ELEMENT.appendChild(tmpElm);

/* console.log('elmCreator :>> ', elmCreator);
console.log('elmCreator.createElememt :>> ', elmCreator.createElememt);
console.log('tmpElm :>> ', tmpElm); */