function f_Tree() {

    let setup = new SetupCanvas();

    let p0 = {
        x: setup.width / 2,
        y: setup.height - 50
    };
    let p1 = {
        x: setup.width / 2,
        y: 50
    };
    let branchAngleA = randomRange(-Math.PI / 2, Math.PI / 2);
    let branchAngleB = randomRange(-Math.PI / 2, Math.PI / 2);
    let trunkRatio = randomRange(0.25, 0.75);
    let debugListPoint = [];

    let interationMax = 8;

    /* tree(p0, p1, 3);
    drawCircle(); */

    function draw() {
        debugListPoint = [];
        setup.ctx.clearRect(0, 0, setup.width, setup.height);

        tree(p0, p1, interationMax);
        drawCircle();
        requestAnimationFrame(draw);
    }
    draw();
    function tree(p0, p1, limit) {
        var dx = p1.x - p0.x,
            dy = p1.y - p0.y,
            dist = Math.sqrt(dx * dx + dy * dy),
            angle = Math.atan2(dy, dx),
            branchLength = dist * (1 - trunkRatio),
            pA = {
                x: p0.x + dx * trunkRatio,
                y: p0.y + dy * trunkRatio
            },
            pB = {
                x: pA.x + Math.cos(angle + branchAngleA) * branchLength,
                y: pA.y + Math.sin(angle + branchAngleA) * branchLength,
            },
            pC = {
                x: pA.x + Math.cos(angle + branchAngleB) * branchLength,
                y: pA.y + Math.sin(angle + branchAngleB) * branchLength,
            };




        setup.ctx.strokeStyle = 'green';
        setup.ctx.beginPath();
        setup.ctx.moveTo(p0.x, p0.y);
        setup.ctx.lineTo(pA.x, pA.y);
        setup.ctx.stroke();

        if (limit > 0) {
            tree(pA, pC, limit - 1);
            tree(pA, pB, limit - 1);
        }
        else {

            setup.ctx.strokeStyle = 'cyan';
            setup.ctx.beginPath();
            setup.ctx.moveTo(pB.x, pB.y);
            setup.ctx.lineTo(pA.x, pA.y);
            setup.ctx.lineTo(pC.x, pC.y);
            setup.ctx.stroke();
        }


        /* branchAngleA += randomRange(-0.02, 0.02);
        branchAngleB += randomRange(-0.02, 0.02);
        trunkRatio += randomRange(-0.02, 0.02);
        if (trunkRatio >= 0.9 || trunkRatio <= 0.01) {
            trunkRatio = randomRange(0.25, 0.35);
        } */


        debugListPoint.push([pA, pB, pC]);
    }
    function drawCircle() {
        //console.log(debugListPoint);
        for (let b = 0; b < debugListPoint.length; b++) {
            const br = debugListPoint[b];

            for (let i = 0; i < br.length; i++) {
                const point = br[i];

                setup.ctx.strokeStyle = 'red';
                setup.ctx.beginPath();
                setup.ctx.arc(point.x, point.y, 5, 0, Math.PI, false);
                setup.ctx.stroke();
            }
        }
    }
    function randomRange(min, max) {
        return min + Math.random() * (max - min);
    }


    document.body.addEventListener("click", (event) => {
        debugListPoint = [];
        setup.ctx.clearRect(0, 0, setup.width, setup.height);

        p0 = {
            x: setup.width / 2,
            y: setup.height - 50
        };
        p1 = {
            x: setup.width / 2,
            y: 50
        };
        random = randomRange(-Math.PI / 2, Math.PI / 2)
        branchAngleA = random;// randomRange(-Math.PI / 2, Math.PI / 2);
        branchAngleB = -random;//randomRange(-Math.PI / 2, Math.PI / 2);
        trunkRatio = randomRange(0.25, 0.35);

        tree(p0, p1, interationMax);
        drawCircle();
    });

};

