class TextArea extends UIElement {
    constructor(param) {
        super(param);

        let testParamText = {
            text:       param.params.optsLabel.text,
            font:       param.params.optsLabel.font,
            alignement: param.params.optsLabel.alignement,
            colorFont:  param.params.optsLabel.colorFont
        };

        this.aText  = new AText(testParamText);
        this.offset = param.params.optsLabel.offset;
    }

    click()         { super.click(); }
    setActive(bool) { super.setActive(bool); }

    draw(ctx) {
        super.draw(ctx);
        var maxWidth   = this.size.x - 20;
        var lineHeight = 30;
        var x = this.offset.x;
        var y = this.offset.y;

        ctx.save();
        ctx.translate(this.position.x, this.position.y);
        ctx.beginPath();
        ctx.fillStyle    = this.aText.colorFont;
        ctx.font         = this.aText.getFontForCTX();
        ctx.textAlign    = this.aText.alignement.textAlign;
        ctx.textBaseline = this.aText.alignement.textBaseline;

        this.wrapText(ctx, this.aText.text, x, y, maxWidth, lineHeight);
        ctx.restore();
    }

    drawHitArea(ctx) { super.drawHitArea(ctx); }

    wrapText(ctx, text, x, y, maxWidth, lineHeight) {
        var cars = text.split("\n");
        for (var ii = 0; ii < cars.length; ii++) {
            var line  = "";
            var words = cars[ii].split(" ");
            for (var n = 0; n < words.length; n++) {
                var testLine  = line + words[n] + " ";
                var metrics   = ctx.measureText(testLine);
                var testWidth = metrics.width;
                if (testWidth > maxWidth) {
                    ctx.fillText(line, x, y);
                    line = words[n] + " ";
                    y += lineHeight;
                } else {
                    line = testLine;
                }
            }
            ctx.fillText(line, x, y);
            y += lineHeight;
        }
    }
}
