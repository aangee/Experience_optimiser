function f_test_master() {
    //console.debug('f_test_master', this);

    this.createElememt = function (params) {
        //console.debug(params);

        //* Ici destructuring de object 'params'
        let {
            typeElement,
            label = typeElement, //! affectation par default de la valeur avec une autre valeur si on ne la passe pas en param 
            size = { w: 100, h: 50 },//! Creation de l'object 'size' et assigiation des property ( w, h ) par default de object 'size' 
            color = 'lime'
        } = params;

        let {
            w = 100, h = 50 //! Ici on affecte les valeur ( w, h ) de object 'size' si jamais on done que 'w' ou que 'h' en param
        } = size;

        // Ici on cree notre HTLMElement
        let elm = document.createElement(typeElement);

        //On change le style pour affecter nos valeur voulu
        this.changeStyle(elm, { label: label, color, size: { w, h } });

        console.debug('createElememt', params, elm, this);

        //On reture notre element tous frai
        return elm;
    }


    this.changeStyle = function (elm, params) {
        console.log('changeStyle', params);
        let { label = elm.textContent, color = elm.style.color, size = { w: elm.style.width, h: elm.style.height } } = params;
        let { w, h } = size;



        elm.textContent = label;
        elm.style.color = `${color}`;
        elm.style.width = `${w}px`;
        elm.style.height = `${h}px`;
        console.debug('changeStyle', elm, params, this);

        //return elm;
    }

    //return this;
    console.debug('f_test_master', this);
}

