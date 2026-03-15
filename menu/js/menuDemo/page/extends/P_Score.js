class P_Score extends Page {
    constructor({ name, position, size }) {
        super({ name, position, size });
        this.stackPanel;
    }

    InitElementsInPage() {
        super.InitElementsInPage();
        let posPanel  = this.position;
        let sizePanel = this.size;

        this.stackPanel = MasterHandler.PANEL.createStackPanel({
            transform: { position: posPanel, size: sizePanel },
            params: { optsBorder: { isRounded: true, radius: 8, lineWidth: 5 } }
        });

        let nbpts       = 10000;
        let widthLabel  = 400;
        let heightLabel = 40;

        for (let i = 1; i <= 9; i++) {
            let tempLabel = MasterHandler.LABEL.createLabel({
                transform: { position: new Vec2D(posPanel.x, posPanel.y), size: { x: widthLabel, y: heightLabel } },
                params: {
                    optsLabel:  { font: { size: 20 }, text: 'Player ' + i + ' Pts: ' + Math.round(nbpts) + ' EGLD', offset: { x: 0, y: 0 } },
                    optsBorder: { isActive: false },
                    optsColor:  { base: 'rgba(0,0,0,.2)', hover: 'gold', click: 'red' }
                }
            });
            nbpts -= (13.2 + (i * 172.58));
            this.childs.push(tempLabel);
        }

        this.stackPanel.calculeVerticalStack(this.childs);
    }

    setActive(bool) {
        super.setActive(bool);
        this.stackPanel.setActive(bool);
    }
}
