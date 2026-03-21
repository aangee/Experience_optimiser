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

        this.animated  = options.animated || false;
        this._style    = options.style    || 'default';
        this._frame    = 0;
        this._interval = 4; // grow() tous les 4 frames (~15 steps/sec à 60fps)

        tree = new Tree(this._style);
        if (!this.animated) {
            for (let g = 0; g < 200; g++) {
                tree.grow();
            }
            tree.show(this.ctx);
        }
    }

    init() {}

    restart() {
        tree = new Tree(this._style);
        this._frame = 0;
        this.canvas.clear();
    }

    update() {
        if (!this.animated) return;
        this._frame++;
        if (this._frame % this._interval !== 0) return;
        this.canvas.clear();
        tree.grow();
        tree.show(this.ctx);
    }
}