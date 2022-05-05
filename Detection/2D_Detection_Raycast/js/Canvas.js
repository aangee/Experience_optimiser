class Canvas {

    constructor(options) {


        let defaulOptions =
        {
            type: "autre",
            parentNameID: "console",
            classAdd: "DEFAULT",
            size: { w: 400, h: 400 }
        };

        options = Object.assign(defaulOptions, options)

        /** @type {Canvas} canvas */
        this.canvas = document.createElement("canvas");
        document.querySelector(`#${options.parentNameID}`).appendChild(this.canvas);

        this.canvas.classList.add("canvas");
        this.canvas.classList.add(options.classAdd);

        this.width = options.size.w;
        this.height = options.size.h;

        this.canvas.width = this.width;
        this.canvas.height = this.height;

        this.context = this.canvas.getContext("2d");
    }

    setStep(size) {
        this.stepX = this.width / size.width;
        this.stepY = this.height / size.height;
    }

    draw() {


        this.context.beginPath();
        this.context.lineWidth = 2;
        this.context.lineJoin = "round";//butt|round|square 
        this.context.fillStyle = 'rgba(0,0,100,.5)';
        this.context.strokeStyle = 'rgba(200,0,200,1)';
        this.context.rect(0, 0, this.canvas.width, this.canvas.height);
        //this.context.fill();
        this.context.stroke();
        this.context.closePath();
    }

    clear() {
        this.context.clearRect(0, 0, this.canvas.width, this.canvas.height);
    }
}