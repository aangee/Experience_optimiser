class L_Home extends Layer {
    constructor(position, size) { super('HOME', position, size); }

    start() {
        super.start();
        this.panel.transform.size = new Vec2D(900, 150);

        let sizeBtn = new Vec2D(400, 56);
        this.btnPlayGame = MasterHandler.BUTTON.createRoundedButton({
            transform: { position: this.panel.transform.position, size: sizeBtn },
            params: {
                optsBorder: { isRounded: true, radius: 15, lineWidth: .5 },
                optsLabel:  { text: 'PLAY GAME', colorFont: 'gold', offset: { x: 0, y: 0 }, font: { size: 27, police: 'monospace' } },
                optsColor:  { base: 'rgba(0,0,75,.4)', hover: 'rgba(0,0,75,.84)' },
                options:    { callback: this.clickBtnPlayGame, value: this }
            }
        });
        this.listUIElement.push(this.btnPlayGame);
    }
    init()          { super.init(); }
    update()        { super.update(); }
    setActive(bool) { super.setActive(bool); }

    clickBtnPlayGame(val) {
        val.setActive(false);
    }
}
