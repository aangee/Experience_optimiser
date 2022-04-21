
let DEBUG_ELEMENT = document.getElementById('js-debug');
//console.log(DEBUG_ELEMENT);
DEBUG_ELEMENT.textContent = 'hello game';



// On se cree un tableau avec les ref des function
let listFunc = [f_test_01, f_test_02, f_test_03];
//^ On lance une function 'f_test_02'
listFunc[1]();



// On se cree un tableau avec des function anonyme qui lanceront leur function le moment voulu (click btn, ect...)
let f = [() => { f_test_01() }, () => { f_test_02() }, () => { f_test_03() }]

//^ On lance une function 'f_test_03'
f[1]();


//! Attention ici ' this '  return  ' window '
//? f[0]();





listFunc[2]();//* Dans le bloc de la function ' this ' fai ref au tableau " listFunc "

f[2]();//* Dans le bloc de la function ' this ' fai ref a " window "