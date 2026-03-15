class RoundedButton extends UIElement {
    constructor(param) {
        super(param);
        let optsColor = {
            base:  'rgba(0,0,0,0)',
            hover: 'rgba(0,0,0,0)',
            click: 'rgba(0,0,0,0)'
        }
        if (param.params.optsLabel && param.params.optsLabel.text) {
            this.label = MasterHandler.LABEL.createLabel(param);
            this.label.colorStats   = optsColor;
            this.label.colorHitArea = 'rgba(0,0,0,0)';
        }
    }

    click()         { super.click(); }
    setActive(bool) {
        super.setActive(bool);
        if (this.label) this.label.setActive(this.isActive);
    }
    draw(ctx)         { super.draw(ctx); }
    drawHitArea(ctx)  { super.drawHitArea(ctx); }
}
