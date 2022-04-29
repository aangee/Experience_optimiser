var sizeCanvas = {};

let mouse = {};
let xoff, yoff = 0;


/**@type {Tree} le debut */
let tree;
let max_dist = 180;//Attention a la hauteur du spawn de nos leaf.js
let min_dist = 5;
class App {
    constructor(options) {
        let defaulOptions =
        {
            type: "autre",
            size: { w: 400, h: 400 }
        };
        options = Object.assign(defaulOptions, options)
        this.type = options.type;
        /**@type {Canvas} canvas  */
        this.canvas = new Canvas({ parentNameID: "console", classAdd: "NFTGene", size: { w: 1000, h: 1000 } });
        this.ctx = this.canvas.context;

        let centerX = this.canvas.width * .5;
        let centerY = this.canvas.height * .5;

        //START Space Colonization
        sizeCanvas = { w: this.canvas.width, h: this.canvas.height };

        tree = new Tree();
        for (let g = 0; g < 10; g++) {

            tree.grow();
        }
        tree.show(this.ctx);
    }

    init() {


    }

    update() {
        //On efface notre canvas
        /*  this.canvas.clear();
 
         tree.show(this.ctx);
         tree.grow(); */
    }
}