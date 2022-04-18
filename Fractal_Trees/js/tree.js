function f_Tree() {
    let canvas = document.getElementById("canvas");
    /**@type {CanvasRenderingContext2D} */
    let context = canvas.getContext("2d");
    let width = canvas.width = window.innerWidth;
    let height = canvas.height = window.innerHeight;

    let p0 = {
        x: width / 2,
        y: height - 50
    };
    let p1 = {
        x: width / 2,
        y: 50
    };
    let branchAngleA = randomRange(-Math.PI / 2, Math.PI / 2);
    let branchAngleB = randomRange(-Math.PI / 2, Math.PI / 2);
    let trunkRatio = randomRange(0.25, 0.75);
    let debugListPoint = [];


    tree(p0, p1, 3);
    drawCircle();

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




        context.strokeStyle = 'green';
        context.beginPath();
        context.moveTo(p0.x, p0.y);
        context.lineTo(pA.x, pA.y);
        context.stroke();

        if (limit > 0) {
            tree(pA, pC, limit - 1);
            tree(pA, pB, limit - 1);
        }
        else {

            context.strokeStyle = 'cyan';
            context.beginPath();
            context.moveTo(pB.x, pB.y);
            context.lineTo(pA.x, pA.y);
            context.lineTo(pC.x, pC.y);
            context.stroke();
        }
        branchAngleA += randomRange(-0.02, 0.02);
        branchAngleB += randomRange(-0.02, 0.02);
        trunkRatio += randomRange(-0.02, 0.02);
        if (trunkRatio >= 0.9 || trunkRatio <= 0.01) {
            trunkRatio = randomRange(0.25, 0.35);
        }


        debugListPoint.push([pA, pB, pC]);
    }
    function drawCircle() {
        //console.log(debugListPoint);
        for (let b = 0; b < debugListPoint.length; b++) {
            const br = debugListPoint[b];

            for (let i = 0; i < br.length; i++) {
                const point = br[i];

                context.strokeStyle = 'red';
                context.beginPath();
                context.arc(point.x, point.y, 5, 0, Math.PI * 2, false);
                context.stroke();
            }
        }
    }
    function randomRange(min, max) {
        return min + Math.random() * (max - min);
    }


    document.body.addEventListener("click", function () {
        debugListPoint = [];
        context.clearRect(0, 0, width, height);

        p0 = {
            x: width / 2,
            y: height - 50
        };
        p1 = {
            x: width / 2,
            y: 50
        };
        random = randomRange(-Math.PI / 2, Math.PI / 2)
        branchAngleA = random;// randomRange(-Math.PI / 2, Math.PI / 2);
        branchAngleB = -random;//randomRange(-Math.PI / 2, Math.PI / 2);
        trunkRatio = randomRange(0.25, 0.35);

        tree(p0, p1, 3);
        drawCircle();
    });

};

