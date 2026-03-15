class P_Home extends Page {
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

        let widthLabel  = 400;
        let heightLabel = 40;

        let label1 = MasterHandler.LABEL.createLabel({
            transform: { position: new Vec2D(posPanel.x, posPanel.y), size: { x: widthLabel, y: heightLabel } },
            params: {
                optsLabel: { font: { size: 26, police: 'Calibri' }, text: 'Salut toi, chaud a game!?', colorFont: 'rgb(20,0,20)', offset: { x: 0, y: 0 } },
                optsBorder: { isActive: false },
                optsColor:  { base: 'rgba(0,0,0,.2)', hover: 'gold', click: 'red' }
            }
        });

        let label2 = MasterHandler.LABEL.createLabel({
            transform: { position: new Vec2D(posPanel.x, posPanel.y), size: { x: widthLabel, y: heightLabel } },
            params: {
                optsLabel: { font: { size: 24, police: 'monospace' }, text: 'alors s\'est tipar 🎮', offset: { x: 0, y: 0 } },
                optsBorder: { isActive: false },
                optsColor:  { base: 'rgba(0,0,0,.2)', hover: 'gold', click: 'red' }
            }
        });

        let label3 = MasterHandler.LABEL.createLabel({
            transform: { position: new Vec2D(posPanel.x, posPanel.y), size: { x: widthLabel, y: heightLabel } },
            params: {
                optsLabel: { font: { size: 24 }, colorFont: 'yellow', text: 'Merci, et bonne chance', offset: { x: 0, y: 0 } },
                optsBorder: { isActive: false, isRounded: true, radius: 10 },
                optsColor:  { base: 'rgba(0,0,75,.4)', hover: 'rgba(0,0,75,.84)', click: 'red' }
            }
        });

        let textArea = MasterHandler.LABEL.createTextArea({
            transform: { position: new Vec2D(posPanel.x, posPanel.y), size: { x: widthLabel, y: 300 } },
            params: {
                optsLabel: {
                    font:       { size: 20 },
                    colorFont:  'lightgray',
                    alignement: { textAlign: "left", textBaseline: "middle" },
                    text:       `Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged.`,
                    offset:     { x: -(widthLabel * .5) + 20, y: -135 }
                },
                optsBorder: { isActive: false, isRounded: true, radius: 10 },
                optsColor:  { base: 'rgba(0,0,75,.4)', hover: 'rgba(0,0,75,.84)', click: 'red' }
            }
        });

        this.childs.push(label1, label2, label3, textArea);
        this.stackPanel.calculeVerticalStack(this.childs);
    }

    setActive(bool) {
        super.setActive(bool);
        this.stackPanel.setActive(bool);
    }
}
