class L_GUI extends Layer {
    constructor(position, size) { super('GUI', position, size); }

    start() {
        super.start();
        let sizePanel = new Vec2D(450, 150);
        let offsetXY  = 10;
        this.panel.transform.size     = sizePanel;
        this.panel.transform.position = new Vec2D(sizePanel.x / 2 + offsetXY, sizePanel.y / 2 + offsetXY);
        this.panel.colorStats.base    = 'rgba(0,210,0,.5)';
        this.panel.optsBorder.color   = 'rgba(0,100,0,1)';
        this.panel.optsBorder.radius  = 7;
        this.panel.optsBorder.lineWidth = 5;
    }
    init()          { super.init(); }
    update()        { super.update(); }
    setActive(bool) { super.setActive(bool); }
}
