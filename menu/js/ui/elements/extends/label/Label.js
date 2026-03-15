class Label extends UIElement {
    constructor(param) {
        super(param);
        let { optsLabel }                        = param.params;
        let { text, font, alignement, colorFont, offset } = optsLabel;
        this.aText  = new AText({ text, font, alignement, colorFont });
        this.offset = offset;
    }

    click()         { super.click(); }
    setActive(bool) { super.setActive(bool); }

    draw(ctx) {
        super.draw(ctx);
        let { x, y }                          = this.transform.position;
        let { colorFont, alignement, text }   = this.aText;

        ctx.save();
        ctx.translate(x, y);
        ctx.beginPath();
        ctx.fillStyle    = colorFont;
        ctx.font         = this.aText.getFontForCTX();
        ctx.textAlign    = alignement.textAlign;
        ctx.textBaseline = alignement.textBaseline;
        ctx.fillText(text, this.offset.x, this.offset.y);
        ctx.restore();
    }

    drawHitArea(ctx) { super.drawHitArea(ctx); }
}
