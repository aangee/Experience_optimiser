class PianoKeyButton {
    constructor(name, position, width, height, optColors, options) {
        this.position   = position;
        this.width      = width;
        this.height     = height;
        this.colorBase  = optColors.base;
        this.colorHover = optColors.hover;
        this.colorClick = optColors.click;
        this.name       = name;
        this.hover      = false;
        this.down       = false;
        this.isActive   = true;
        this.options    = options;
        this.colorHitArea = MasterHandler.getRandomColorHitArea();
        this.lineWidth  = 5;
    }

    click() {
        this.down = true;
        this.options.callback(this.options.value);
    }
    setActive(bool) { this.isActive = bool; }

    draw(ctx) {
        ctx.save();
        ctx.beginPath();
        ctx.strokeStyle = "black";
        ctx.lineWidth   = this.lineWidth;
        ctx.fillStyle   = this.colorBase;
        if (this.hover) ctx.fillStyle = this.colorHover;
        if (this.down)  ctx.fillStyle = this.colorClick;
        ctx.translate(this.position[0], this.position[1]);
        ctx.moveTo(-this.width / 2, -this.height / 2);
        ctx.lineTo(-this.width / 2, +this.height / 2);
        ctx.arc(0, +this.height / 2, this.width / 2, 0, Math.PI);
        ctx.lineTo(+this.width / 2, +this.height / 2);
        ctx.lineTo(+this.width / 2, -this.height / 2);
        ctx.closePath();
        ctx.stroke();
        ctx.fill();
        ctx.beginPath();
        ctx.fillStyle    = "black";
        ctx.font         = (this.height * 0.5) + "px Arial";
        ctx.textAlign    = "center";
        ctx.textBaseline = "middle";
        ctx.fillText(this.name, 0, 0);
        ctx.restore();
    }

    drawHitArea(ctx) {
        ctx.save();
        ctx.beginPath();
        ctx.fillStyle = this.colorHitArea;
        ctx.translate(this.position[0], this.position[1]);
        ctx.moveTo(-this.width / 2, -this.height / 2);
        ctx.lineTo(-this.width / 2, +this.height / 2);
        ctx.arc(0, +this.height / 2, this.width / 2, 0, Math.PI);
        ctx.lineTo(+this.width / 2, +this.height / 2);
        ctx.lineTo(+this.width / 2, -this.height / 2);
        ctx.closePath();
        ctx.fill();
        ctx.restore();
    }
}
