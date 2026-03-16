class L_GUI extends Layer {
    constructor(position, size) { super('GUI', position, size); }

    start() {
        super.start();

        let sizePanel = new Vec2D(450, 150);
        let offsetXY  = 10;
        let posPanel  = new Vec2D(sizePanel.x / 2 + offsetXY, sizePanel.y / 2 + offsetXY);

        let panel = MasterHandler.PANEL.createPanel({
            transform: { position: posPanel, size: sizePanel },
            params: {
                optsBorder: { isActive: true, isRounded: true, radius: 7, lineWidth: 5, color: 'rgba(0,100,0,1)' },
                optsColor:  { base: 'rgba(0,210,0,.5)' }
            }
        });
        this.listUIElement.push(panel);
    }

    init()          { super.init(); }
    update()        { super.update(); }
    setActive(bool) { super.setActive(bool); }
}
