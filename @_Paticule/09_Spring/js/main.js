const setup = new SetupCanvas();
const container = document.getElementById('js-debug');
let ID_Animation = 0;
let nbsFonctionScript = ['f_spring1', 'f_spring2'];

const listFunc = [];
let GeneratorFunction = Object.getPrototypeOf(function* () { }).constructor;

for (let i = 0; i < nbsFonctionScript.length; i++) {
    let nameFunc = nbsFonctionScript[i];
    let btn = document.createElement('button');
    btn.addEventListener('click', () => { clickSwitch(i) });
    btn.textContent = nameFunc;
    container.appendChild(btn);


    let funcTMP = new GeneratorFunction("", `${nameFunc}();`);
    listFunc.push(funcTMP);



    console.debug(funcTMP);
}
function clickSwitch(i) {
    setup.clear();
    cancelAnimationFrame(ID_Animation);
    let t = setTimeout(() => {
        listFunc[i]().next();
        //console.debug('List func:', listFunc);
        clearTimeout(t);
    }, 500);

}

f_spring2();