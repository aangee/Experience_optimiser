function f_Ifs() {
    var canvas = document.getElementById("canvas"),
        context = canvas.getContext("2d"),
        width = canvas.width = window.innerWidth,
        height = canvas.height = window.innerHeight;

    /*  var rules = [{
         a: 0.85,
         b: 0.04,
         c: -0.04,
         d: 0.85,
         tx: 0,
         ty: 1.6,
         weight: 0.65,
         color: "red"
     },
     {
         a: -0.15,
         b: 0.28,
         c: 0.26,
         d: 0.24,
         tx: 0,
         ty: 0.44,
         weight: 0.07,
         color: "green"
     },
     {
         a: 0.2,
         b: -0.26,
         c: 0.23,
         d: 0.22,
         tx: 0,
         ty: 1.6,
         weight: 0.07,
         color: "blue"
     },
     {
         a: 0,
         b: 0,
         c: 0,
         d: 0.16,
         tx: 0,
         ty: 0,
         weight: 0.21,
         color: "yellow"
     }]; */


    var colorMarronL = 'rgb(133, 38, 0, 1)',
        colorMarron = 'rgb(104, 30, 1, 1)',
        colorMarronD = 'rgb(54, 15, 0, 1)',

        colorGreenL = 'rgb(0, 116, 25, 1)',
        colorGreen = 'rgb(0, 80, 17, 1)',
        colorGreenD = 'rgb(0, 46, 10, 1)',

        colorGold = 'rgb(255, 187, 0, 1)';

    var rules = [{
        a: 0.05,
        b: 0,
        c: 0,
        d: 0.6,
        tx: 0,
        ty: 0,
        weight: 0.17,
        color: colorMarronD // Haut du tron
    },
    {
        a: 0.05,
        b: 0,
        c: 0,
        d: -0.5,
        tx: 0,
        ty: 1,
        weight: 0.17,
        color: colorMarron // Bas du tron
    },
    {
        a: 0.46,
        b: -0.321,
        c: 0.386,
        d: 0.383,
        tx: 0,
        ty: 0.6,
        weight: 0.17,
        color: colorMarronL // Premiere branche gauche
    },
    {
        a: 0.47,
        b: -0.154,
        c: 0.171,
        d: 0.423,
        tx: 0,
        ty: 1.1,
        weight: 0.17,
        color: "yellow"
    },
    {
        a: 0.433,
        b: 0.275,
        c: -0.25,
        d: 0.476,
        tx: 0,
        ty: 1,
        weight: 0.16,
        color: "gold"
    },
    {
        a: 0.421,
        b: 0.257,
        c: -0.353,
        d: 0.306,
        tx: 0,
        ty: 0.7,
        weight: 0.16,
        color: "cyan"
    }];



    var x = Math.random(),
        y = Math.random();

    context.translate(width / 2, height);
    iterate();

    function iterate() {
        for (var i = 0; i < 100; i++) {
            var rule = getRule(),
                x1 = x * rule.a + y * rule.b + rule.tx,
                y1 = x * rule.c + y * rule.d + rule.ty;
            x = x1;
            y = y1;
            plot(x, y, rule.color);
        }
        requestAnimationFrame(iterate);
    }

    function getRule() {
        var rand = Math.random();
        for (var i = 0; i < rules.length; i++) {
            var rule = rules[i];
            if (rand < rule.weight) {
                return rule;
            }
            rand -= rule.weight;
        }
    }

    function plot(x, y, color) {
        context.fillStyle = color;
        context.fillRect(x * 350, -y * 350, 0.5, 0.5);
    }
};