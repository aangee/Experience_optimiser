class Toggle extends UIElement {
    constructor(param) {
        super(param);

        param.params.optsColor = {
            base:  'rgba(0,0,0,0)',
            hover: 'rgba(0,0,0,0)',
            click: 'rgba(0,0,0,0)'
        }
        if (param.params.optsLabel.text) {
            this.label = MasterHandler.LABEL.createLabel(param);
            this.label.colorHitArea = 'rgba(0,0,0,0)';
            this.label.offset.x = -20;
        }
        this.setPosAllCase();
        this.isCaseCheck = false;
    }

    click() {
        super.click();
        this.isCaseCheck = !this.isCaseCheck;
    }
    setActive(bool) {
        super.setActive(bool);
        if (this.label) this.label.setActive(this.isActive);
    }

    setPosAllCase() {
        let rectCaseExt = {
            x: this.position.x + ((this.size.x * .5) - (this.size.x * .2)),
            y: this.position.y,
            w: this.size.x * .2,
            h: this.size.y * .4
        };
        this.caseExt = new Rectangle(rectCaseExt);

        let rectCaseInt = {
            x: this.position.x + ((this.size.x * .5) - (this.size.x * .2)),
            y: this.position.y,
            w: this.size.x * .15,
            h: this.size.y * .3
        };
        this.caseInt = new Rectangle(rectCaseInt);
    }

    draw(ctx) {
        super.draw(ctx);
        ctx.save();
        ctx.beginPath();
        ctx.translate(this.caseExt.x, this.caseExt.y);
        ctx.strokeStyle = "black";
        ctx.lineWidth   = this.optsBorder.lineWidth;
        ctx.fillStyle   = this.colorStats.base;
        if (this.hover) ctx.fillStyle = this.colorStats.hover;
        if (this.down)  ctx.fillStyle = this.colorStats.click;
        if (this.optsBorder.isRounded)
            this.roundRect(ctx, -this.caseExt.w / 2, -this.caseExt.h / 2, this.caseExt.w, this.caseExt.h, this.optsBorder.radius);
        else
            ctx.rect(-this.caseExt.w / 2, -this.caseExt.h / 2, this.caseExt.w, this.caseExt.h);
        if (this.optsBorder.isActive) ctx.stroke();
        ctx.fill();
        ctx.restore();

        if (this.isCaseCheck) {
            ctx.save();
            ctx.beginPath();
            ctx.translate(this.caseInt.x, this.caseInt.y);
            ctx.strokeStyle = "black";
            ctx.lineWidth   = this.optsBorder.lineWidth;
            ctx.fillStyle   = 'rgba(0,0,75,.74)';
            if (this.optsBorder.isRounded)
                this.roundRect(ctx, -this.caseInt.w / 2, -this.caseInt.h / 2, this.caseInt.w, this.caseInt.h, this.optsBorder.radius);
            else
                ctx.rect(-this.caseInt.w / 2, -this.caseInt.h / 2, this.caseInt.w, this.caseInt.h);
            if (this.optsBorder.isActive) ctx.stroke();
            ctx.fill();
            ctx.restore();
        }
    }
}
