class UIElement {

    constructor({ transform, params }) {
        let tempTrans = {
            position: MasterHandler.getDefaultPosition(),
            size:     MasterHandler.getDefaultSize()
        }
        let tempParam = {
            optsBorder: MasterHandler.getDefaultOptsBorder(),
            optsColor:  MasterHandler.getDefaultOptsColor(),
            options:    MasterHandler.getDefaultOptsCallback()
        }
        transform        = Object.assign(tempTrans, transform);
        params.optsBorder = Object.assign(tempParam.optsBorder, params.optsBorder);
        params.optsColor  = Object.assign(tempParam.optsColor,  params.optsColor);
        params.options    = Object.assign(tempParam.options,    params.options);
        params            = Object.assign(tempParam, params);

        let { position, size }            = transform;
        let { optsBorder, optsColor, options } = params;

        this.transform = new Transform({ position, size });
        this.position  = this.transform.position;
        this.size      = this.transform.size;

        this.optsBorder   = optsBorder;
        this.colorStats   = optsColor;
        this.hover        = false;
        this.down         = false;
        this.isActive     = true;
        this.options      = options;
        this.colorHitArea = MasterHandler.getRandomColorHitArea();
    }

    click() {
        this.down = true;
        this.options.callback(this.options.value, this);
    }

    setActive(isActive) {
        this.isActive = isActive;
    }

    draw(ctx) {
        ctx.save();
        ctx.beginPath();

        let { position, size } = this.transform;
        let { x, y }           = position;
        let { x: w, y: h }     = size;
        ctx.translate(x, y);

        if (this.optsBorder.isActive) {
            ctx.strokeStyle = this.optsBorder.color;
            ctx.lineWidth   = this.optsBorder.lineWidth;
        }
        ctx.fillStyle = this.colorStats.base;
        if (this.hover) ctx.fillStyle = this.colorStats.hover;
        if (this.down)  ctx.fillStyle = this.colorStats.click;

        if (this.optsBorder.isRounded) this.roundRect(ctx, -w / 2, -h / 2, w, h, this.optsBorder.radius);
        else ctx.rect(-w / 2, -h / 2, w, h);

        if (this.optsBorder.isActive) ctx.stroke();
        ctx.fill();

        ctx.restore();
    }

    drawHitArea(hitCtx) {
        hitCtx.save();
        hitCtx.beginPath();

        let { position, size } = this.transform;
        let { x, y }           = position;
        let { x: w, y: h }     = size;

        hitCtx.translate(x, y);
        hitCtx.fillStyle = this.colorHitArea;

        if (this.optsBorder.isRounded) this.roundRect(hitCtx, -w / 2, -h / 2, w, h, this.optsBorder.radius);
        else hitCtx.rect(-w / 2, -h / 2, w, h);

        hitCtx.fill();
        hitCtx.restore();
    }

    roundRect(ctx, x, y, width, height, radius) {
        if (width  < 2 * radius) radius = width  / 2;
        if (height < 2 * radius) radius = height / 2;
        ctx.beginPath();
        ctx.moveTo(x + radius, y);
        ctx.arcTo(x + width, y,          x + width, y + height, radius);
        ctx.arcTo(x + width, y + height, x,         y + height, radius);
        ctx.arcTo(x,         y + height, x,         y,          radius);
        ctx.arcTo(x,         y,          x + width, y,          radius);
        ctx.closePath();
    }
}
