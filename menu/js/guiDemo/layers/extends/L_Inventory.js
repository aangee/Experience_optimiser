class L_Inventory extends Layer {
    constructor(position, size) { super('Inventory', position, size); }

    start() {
        super.start();
        this.panel.transform.size         = new Vec2D(700, 700);
        this.panel.colorStats.base        = 'rgba(0, 0, 210, .5)';
        this.panel.optsBorder.color       = 'rgba(100,0,100,1)';
        this.panel.optsBorder.radius      = 9;
        this.panel.optsBorder.lineWidth   = 2;
    }
    init()          { super.init(); }
    update()        { super.update(); }
    setActive(bool) { super.setActive(bool); }
}
