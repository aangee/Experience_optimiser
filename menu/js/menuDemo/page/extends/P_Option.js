let GLOBAL_PAGE_OPTION;

class P_Option extends Page {
    constructor({ name, position, size }) {
        super({ name, position, size });
        this.stackPanel;
        GLOBAL_PAGE_OPTION = this;
    }

    InitElementsInPage() {
        super.InitElementsInPage();

        let posPanel  = this.position;
        let sizePanel = new Vec2D(this.size.x * .7, this.size.y * .4);

        this.stackPanel = MasterHandler.PANEL.createStackPanel({
            transform: { position: posPanel, size: sizePanel },
            params: { optsBorder: { isRounded: true, radius: 8, lineWidth: 5 } }
        });

        let sizeBtn = new Vec2D(140, 45);
        let posBtn  = new Vec2D(
            posPanel.x - ((sizePanel.x / 2) - (sizeBtn.x / 2)),
            posPanel.y - ((sizePanel.y / 2) - (sizeBtn.y / 2))
        );

        for (let i = 0; i <= 15; i++) {
            if (i === 15) {
                let btnHome = MasterHandler.BUTTON.createRoundedButton({
                    transform: { position: new Vec2D(posBtn.x, posBtn.y), size: sizeBtn },
                    params: {
                        optsBorder: { radius: 15, lineWidth: .5 },
                        optsLabel:  { text: 'Control toggle 0', font: { size: 20, police: 'Calibri' }, offset: { x: 0, y: 0 } },
                        optsColor:  { base: 'cyan' },
                        options:    { callback: this.clickDebug, value: 'Button test stack click!!!' }
                    }
                });
                this.childs.push(btnHome);
            } else {
                let sizeToggle = new Vec2D(130, 45);
                let tmpToggle  = MasterHandler.BUTTON.createToggle({
                    transform: { position: new Vec2D(posBtn.x, posBtn.y), size: sizeToggle },
                    params: {
                        optsLabel:  { text: 'TOGGLE: ' + i, font: { size: 15 }, offset: { x: 0, y: 0 } },
                        optsBorder: { isRounded: true, radius: 15 },
                        options:    { callback: this.clickDebug, value: 'Toggle test click!!' }
                    }
                });
                this.childs.push(tmpToggle);
            }
        }

        this.stackPanel.calculeHorizontal(this.childs, 20, 'center', true);
    }

    setActive(bool) {
        super.setActive(bool);
        this.stackPanel.setActive(bool);
    }

    clickDebug(value, elmclick) {
        console.log(value, elmclick, this);
        if (elmclick instanceof RoundedButton)
            GLOBAL_PAGE_OPTION.childs[0].isCaseCheck = !GLOBAL_PAGE_OPTION.childs[0].isCaseCheck;
    }
}
