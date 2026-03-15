class Page {
    constructor({ name, position, size }) {
        this.id       = PageHandler.counterPage;
        this.name     = name;
        this.position = position;
        this.size     = size;
        this.isActive = false;
        this.childs   = [];
        this.panel;
        this.label;
    }

    InitElementsInPage() {
        let posPanel  = this.position;
        let sizePanel = this.size;

        this.panel = MasterHandler.PANEL.createPanel({
            transform: { position: posPanel, size: sizePanel },
            params: {
                optsBorder: { isActive: true, isRounded: true, radius: 8, lineWidth: 5 }
            }
        });

        let widthLabel  = 180;
        let heightLabel = 60;
        let positionLabel = {
            x: posPanel.x,
            y: posPanel.y - ((sizePanel.y * .5) - (heightLabel * .5))
        };

        this.label = MasterHandler.LABEL.createLabel({
            transform: { position: positionLabel, size: { x: widthLabel, y: heightLabel } },
            params: {
                optsLabel: { font: { size: 26 }, text: this.name, offset: { x: 0, y: 0 } },
                optsBorder: { isActive: false },
                optsColor:  { base: 'rgba(0,0,0,0)', hover: 'gold', click: 'red' }
            }
        });
    }

    setActive(bool) {
        this.isActive = bool;
        this.panel.setActive(bool);
        this.label.setActive(bool);
        for (const element of this.childs) {
            element.setActive(bool);
        }
    }
}
