class Canvas {

    constructor(options) {
        let defaulOptions = {
            type: "autre",
            parentNameID: "console",
            classAdd: "DEFAULT",
            size: { w: 400, h: 400 }
        };

        options = Object.assign(defaulOptions, options);

        /** @type {HTMLCanvasElement} canvas */
        this.canvas = document.createElement("canvas");
        document.querySelector(`#${options.parentNameID}`).appendChild(this.canvas);

        this.canvas.id = options.classAdd;

        this.width  = options.size.w;
        this.height = options.size.h;

        this.canvas.width  = this.width;
        this.canvas.height = this.height;

        // hitTestCanvas a besoin de willReadFrequently pour que getImageData
        // retourne les pixels courants même quand le canvas est display:none
        // (sans ça, Chrome peut retourner des pixels périmés depuis le GPU)
        /** @type {CanvasRenderingContext2D} Le context de notre canvas */
        if (options.classAdd === "hitTestCanvas") {
            this.context = this.canvas.getContext("2d", { willReadFrequently: true });
        } else {
            this.context = this.canvas.getContext("2d");
        }
    }

    setStep(size) {
        this.stepX = this.width  / size.width;
        this.stepY = this.height / size.height;
    }

    clear() {
        this.context.clearRect(0, 0, this.canvas.width, this.canvas.height);
    }
}
