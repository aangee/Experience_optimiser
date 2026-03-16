class MenuDemo {
    constructor({ position, size }) {
        this.size     = size;
        this.position = position;
        this.posTopRight = new Vec2D(
            this.position.x - (this.size.x * .5),
            this.position.y - (this.size.y * .5)
        );
        this.navElements = [];
        this.createNavPage();
        this.createAllPages();
    }

    createAllPages() {
        let posPage  = this.position;
        let sizePage = this.size;
        PageHandler.addPage(new P_Home({ name: 'HOME',   position: posPage, size: sizePage }));
        PageHandler.addPage(new P_Score({ name: 'SCORE', position: posPage, size: sizePage }));
        PageHandler.addPage(new P_Option({ name: 'OPTION', position: posPage, size: sizePage }));
    }

    createNavPage() {
        let posPanel  = new Vec2D(this.position.x, this.position.y + 20);
        let sizePanel = new Vec2D(this.size.x + 20, this.size.y + 100);

        let panel = MasterHandler.PANEL.createStackPanel({
            transform: { position: posPanel, size: sizePanel },
            params: {
                optsBorder: { isActive: true, isRounded: true, radius: 8, lineWidth: 0 },
                optsColor:  { base: 'rgba(120,0,120,.3)' }
            }
        });

        let sizeBtn   = new Vec2D(130, 45);
        let offsetBtnY = 10;
        let offsetBtnX = 15;
        let btnCX = posPanel.x;
        let btnCY = posPanel.y + (((sizePanel.y * .5) - (sizeBtn.y * .5)) - offsetBtnY);

        let btnHome = MasterHandler.BUTTON.createRoundedButton({
            transform: { position: new Vec2D(btnCX - (sizeBtn.x + offsetBtnX), btnCY), size: sizeBtn },
            params: {
                optsBorder: { isRounded: true, radius: 15, lineWidth: .5 },
                optsLabel:  { text: 'HOME', offset: { x: 0, y: 0 } },
                optsColor:  { base: 'cyan' },
                options:    { callback: this.clickBtnHome, value: 'Active Panel Home' }
            }
        });

        let btnScore = MasterHandler.BUTTON.createRectButton({
            transform: { position: new Vec2D(btnCX, btnCY), size: sizeBtn },
            params: {
                optsLabel: { text: 'SCORE', offset: { x: 0, y: 0 } },
                options:   { callback: this.clickBtnScore, value: 'Active Panel Score' }
            }
        });

        let btnOption = MasterHandler.BUTTON.createRoundedButton({
            transform: { position: new Vec2D(btnCX + (sizeBtn.x + offsetBtnX), btnCY), size: sizeBtn },
            params: {
                optsBorder: { isRounded: true, radius: 8, lineWidth: 1 },
                optsLabel:  { text: 'OPTION', offset: { x: 0, y: 0 } },
                optsColor:  { base: 'cyan', hover: 'red' },
                options:    { callback: this.clickBtnOption, value: 'Active Panel Option' }
            }
        });

        let btnClose = MasterHandler.BUTTON.createRoundedButton({
            transform: {
                position: new Vec2D(posPanel.x + (sizePanel.x * .5) - 15, posPanel.y - (sizePanel.y * .5) + 15),
                size: { x: 20, y: 20 }
            },
            params: {
                optsBorder: { isRounded: true, radius: 5, lineWidth: .5 },
                optsLabel:  { text: '❌', font: { size: 14 }, offset: { x: 0, y: 0 } },
                optsColor:  { base: 'cyan' },
                options:    { callback: this.clickBtnClose, value: this }
            }
        });

        this.navElements.push(panel, btnHome, btnScore, btnOption, btnClose);
    }

    clickBtnHome(value)  { PageHandler.switchPages(0); }
    clickBtnScore(value) { PageHandler.switchPages(1); }
    clickBtnOption(value){ PageHandler.switchPages(2); }
    clickBtnClose(value) {
        value.setActive(false);
        app.gui.switchLayer('home');
    }

    setActive(bool) {
        if (bool)  PageHandler.switchPages(0);
        else       PageHandler.switchPages(-1);
        for (let element of this.navElements) {
            element.setActive(bool);
        }
    }
}
