class L_Inventory extends Layer {
    constructor(position, size) {
        super('Inventory', position, size);

        this.sizePanelPlayer = new Vec2D(480, 650);
        // position de départ (hors écran à gauche) et d'arrivée du panneau joueur
        this.pos0PanelPlayer = new Vec2D(
            (this.position.x - this.size.x) + (this.sizePanelPlayer.x / 2),
            this.position.y
        );
        this.pos1PanelPlayer = new Vec2D(
            this.position.x - (this.sizePanelPlayer.x / 2),
            this.position.y
        );
    }

    start() {
        super.start();

        let spacingXpanel = 10;

        let panelPlayer = MasterHandler.PANEL.createPanel({
            transform: {
                position: new Vec2D(this.pos0PanelPlayer.x, this.pos0PanelPlayer.y),
                size: this.sizePanelPlayer
            },
            params: {
                optsBorder: { isActive: true, isRounded: true, radius: 9, lineWidth: 2, color: 'rgba(100,0,100,1)' },
                optsColor:  { base: 'rgba(0,0,210,.5)' }
            }
        });

        let sizeLoot = new Vec2D(400, 650);
        let posLoot  = new Vec2D(
            this.position.x + ((sizeLoot.x / 2) + spacingXpanel),
            this.position.y
        );
        let panelLoot = MasterHandler.PANEL.createPanel({
            transform: { position: posLoot, size: sizeLoot },
            params: {
                optsBorder: { isActive: true, isRounded: true, radius: 9, lineWidth: 2, color: 'rgba(100,0,100,1)' },
                optsColor:  { base: 'rgba(0,0,210,.5)' }
            }
        });

        this.listUIElement.push(panelPlayer, panelLoot);
    }

    init()   { super.init(); }

    update() {
        super.update();
        // Animation : le panneau joueur glisse depuis la gauche jusqu'à sa position finale
        if (this.listUIElement[0].position.x < this.pos1PanelPlayer.x) {
            this.listUIElement[0].position.x += 3;
        }
    }

    setActive(bool) { super.setActive(bool); }
}
