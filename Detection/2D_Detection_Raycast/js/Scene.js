let walls = [];

/** @type {PointLight2D} @info lumiere 1 Jaune */
let pointLight1;
/** @type {PointLight2D} @info lumiere 2 Bleu*/
let pointLight2;

/** @type {PointLight2D} @info lumiere 3 Blanche */
let pointLight3;

/** @type {Vec2D} position X & Y de la sourie */
let mouse = new Vec2D(100, 200);
let xoff = 0;
let yoff = 0;
let xoff2 = 0
let yoff2 = 0;


let angle = 0;
class Scene {
    constructor() {

        this.canvas = new Canvas({ parentNameID: "console", classAdd: "RayCast", size: { w: 600, h: 500 } });
        this.ctx = this.canvas.context;

        let centerX = this.canvas.width * .5;
        let centerY = this.canvas.height * .5;
    }

    init() {


        // ? Ajoute de mur au bord du canvas
        walls.push(new Boundary(0, 0, this.canvas.width, 0));
        walls.push(new Boundary(this.canvas.width, 0, this.canvas.width, this.canvas.height));
        walls.push(new Boundary(this.canvas.width, this.canvas.height, 0, this.canvas.height));
        walls.push(new Boundary(0, this.canvas.height, 0, 0));



        // ? Le 'E' de ethan, lol
        walls.push(new Boundary(200 * .5, 100 * .5, 200 * .5, 300 * .5));
        walls.push(new Boundary(200 * .5, 100 * .5, 350 * .5, 100 * .5));
        walls.push(new Boundary(200 * .5, 300 * .5, 350 * .5, 300 * .5));
        walls.push(new Boundary(200 * .5, 175 * .5, 350 * .5, 175 * .5));

        // ? Ajoute des mur(Line) aleatoire
        for (let b = 0; b < 2; b++) {
            let x1 = utils.randomRange(0, this.canvas.width);
            let x2 = utils.randomRange(0, this.canvas.width);

            let y1 = utils.randomRange(0, this.canvas.height);
            let y2 = utils.randomRange(0, this.canvas.height);

            walls.push(new Boundary(x1, y1, x2, y2));
        }

        // ? Ajout de shape complexe
        this.addShape((this.canvas.width * .2), (this.canvas.height * .6), 100, 1.5);//Carre
        this.addShape((this.canvas.width * .7), (this.canvas.height * .2), 50, 2);//Triangle
        this.addShape((this.canvas.width * .7), (this.canvas.height * .6), 100, .1);//Cercle

        // ? Ajoute des "lumieres"
        pointLight1 = new PointLight2D({ x: 100, y: 200 }, 'rgba(255,215,0,.6)');//Jaune
        pointLight2 = new PointLight2D({ x: 100, y: 200 }, 'rgba(0,215,255,.6)');//Bleu
        pointLight3 = new PointLight2D({ x: 500, y: 700 }, 'rgba(250,250,250,.008)');//Blanche

    }

    update() {
        // ? On bouge dans notre perlinNoise
        xoff += 0.002;
        yoff += 0.007;
        xoff2 += 0.007;
        yoff2 += 0.002;
        //On efface notre canvas
        this.canvas.clear();



        // ? Creation du noise pour faire bouger nos lumieres
        let noiX = noise.perlin2(xoff, yoff) * (this.canvas.width * .5);
        let noiY = noise.perlin2(xoff2 - 47825, yoff2 + 354) * (this.canvas.height * .5);
        let noiX2 = noise.perlin2(xoff2 - 2541, yoff2 - 354) * (this.canvas.width * .5);
        let noiY2 = noise.perlin2(xoff, yoff) * (this.canvas.height * .5);
        let newPos = {
            x: (this.canvas.width * .5) + noiX,
            y: (this.canvas.height * .5) + noiY
        };
        let newPos2 = {
            x: (this.canvas.width * .5) - noiX,
            y: (this.canvas.height * .5) - noiY
        };
        let newPos3 = {
            x: (this.canvas.width * .4) + (noiX2),
            y: (this.canvas.height * .4) + (noiY2)
        };
        // ? Bouge les lumieres avec le perlin noise
        //pointLight1.move(newPos.x, newPos.y);
        pointLight2.move(newPos2.x, newPos2.y);
        pointLight3.move(newPos3.x, newPos3.y);

        // ? Bouge les lumieres avec le sourie
        pointLight1.move(mouse.x, mouse.y);
        //pointLight2.move(mouse.x, mouse.y);
        //pointLight3.move(mouse.x, mouse.y);



        // ? Calcule du hit de tous les ray de nos lumieres
        pointLight1.rayCastAllHits(walls, this.ctx);// ! Light 1

        pointLight2.rayCastAllHits(walls, this.ctx);// ! Light 2

        pointLight3.rayCastHit(walls[0], this.ctx);// ! Light 3
        pointLight3.rayCastHit(walls[1], this.ctx);// ! Light 3
        pointLight3.rayCastHit(walls[2], this.ctx);// ! Light 3
        pointLight3.rayCastHit(walls[3], this.ctx);// ! Light 3


        // ? Affichage des ray pour le debug (1ray tous 20ray lancer)
        pointLight1.show(this.ctx);
        //pointLight2.show(this.ctx);


        // ? On dessin tous nos murs 
        // ~ (Juste pour les voir n'affect pas leur detection par les rayCast)
        for (const wall of walls) {
            wall.show(this.ctx);
        }

    }

    /** Permer de cree des formes avec un nbs de face differante
     * @param {Number} x possition en X 
     * @param {Number} y possition en Y
     * @param {Number} radius taille de la forme
     * @param {Number} inc nbs incremantation pour cree des forme differante
     * @example 
     *      addShape(x:100, y:100, radius:20, inc:2) Pour un triangle
     *      addShape(x:100, y:100, radius:20, inc:.1) Pour un cercle */
    addShape(x, y, radius, inc) {
        let listVide = [];
        //Ajoute une shep complexe
        for (let angle = 0; angle < ((Math.PI / 180) * 361); angle += inc) {

            let xt = Math.cos(angle) * radius;
            let yt = Math.sin(angle) * radius;

            listVide.push({
                x: xt + x,
                y: yt + y
            });
        }
        for (let h = 1; h < listVide.length - 1; h++) {
            const point1 = listVide[h - 1];
            const point2 = listVide[h];
            //On ajoute les face de la form
            walls.push(new Boundary(point1.x, point1.y, point2.x, point2.y));
        }
        //Ajoute du dernier secement
        walls.push(new Boundary(listVide[listVide.length - 2].x, listVide[listVide.length - 2].y, listVide[0].x, listVide[0].y));
    }

    onMouseMove(e) {
        mouse = {
            x: e.layerX,
            y: e.layerY
        }
    }
    onMouseDown(e) {

    }
    onMouseUp(e) {

    }
    onMouseContextMenu(e) {

    }
    onKeyUp(e) {

    }
    onKeyDown(e) {

    }
}