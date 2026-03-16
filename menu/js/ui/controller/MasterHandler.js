class MasterHandler {

    static size;
    static mouse = [0, 0];
    static elements = [];

    static labelArray  = [];
    static panelArray  = [];
    static buttonArray = [];

    /**@type {LabelHandler} */  static LABEL  = {};
    /**@type {PanelHandler} */  static PANEL  = {};
    /**@type {ButtonHandler} */ static BUTTON = {};

    static hitCtx;
    static canvas;
    static currentElementHovering = {};

    static init(canvasEvent, canvasHit, size) {
        MasterHandler.hitCtx = canvasHit.context;
        MasterHandler.canvas = canvasEvent.canvas;
        MasterHandler.addEventListeners(canvasEvent.canvas);
        MasterHandler.size   = size;
        MasterHandler.LABEL  = new LabelHandler();
        MasterHandler.PANEL  = new PanelHandler();
        MasterHandler.BUTTON = new ButtonHandler();
    }

    static createElement(element) {
        switch (true) {
            case (element instanceof Panel):
                MasterHandler.panelArray.push(element);
                break;
            case (element instanceof Label):
                MasterHandler.labelArray.push(element);
                break;
            case (element instanceof RoundedButton):
            case (element instanceof PianoKeyButton):
            case (element instanceof Toggle):
                MasterHandler.buttonArray.push(element);
                break;
            default:
                MasterHandler.buttonArray.push(element);
                console.warn('UIElement:' + element.constructor.name, ' non implementer', element);
                break;
        }
    }

    static save() {
        for (const panel  of MasterHandler.panelArray)  MasterHandler.elements.push(panel);
        for (const button of MasterHandler.buttonArray) MasterHandler.elements.push(button);
        for (const label  of MasterHandler.labelArray)  MasterHandler.elements.push(label);
        MasterHandler.panelArray  = [];
        MasterHandler.buttonArray = [];
        MasterHandler.labelArray  = [];
    }

    static drawElements(ctx) {
        let hitCtx = MasterHandler.hitCtx;
        hitCtx.clearRect(0, 0, MasterHandler.size, MasterHandler.size);

        for (let i = 0; i < MasterHandler.elements.length; i++) {
            const el = MasterHandler.elements[i];
            if (!el.isActive) {
                if (el instanceof RoundedButton) el.label.setActive(false);
                continue;
            }
            el.draw(ctx);
            if (el instanceof Panel) continue;
            el.drawHitArea(hitCtx);
        }
    }

    //#region Events
    static addEventListeners(canvas) {
        canvas.addEventListener("mouseup",   MasterHandler.onMouseUp);
        canvas.addEventListener("mousedown", MasterHandler.onMouseDown);
        canvas.addEventListener("mousemove", MasterHandler.onMouseMove);
    }

    static onMouseUp() {
        for (let i = 0; i < MasterHandler.elements.length; i++) {
            MasterHandler.elements[i].down = false;
        }
    }

    static onMouseDown(event) {
        let position    = MasterHandler.getMousePosition(event);
        let color       = MasterHandler.getColor(MasterHandler.hitCtx, position);
        let tempElement = MasterHandler.isHovering(color);
        if (tempElement) tempElement.click();
    }

    static onMouseMove(event) {
        MasterHandler.mouse = MasterHandler.getMousePosition(event);
        let color = MasterHandler.getColor(MasterHandler.hitCtx, MasterHandler.mouse);
        MasterHandler.resetHoveringStates();
        let tempElement = MasterHandler.isHovering(color);
        if (tempElement) {
            tempElement.hover = true;
            MasterHandler.canvas.style.cursor = "pointer";
        } else {
            MasterHandler.canvas.style.cursor = "auto";
        }
    }
    //#endregion

    //#region State UIElement
    static resetHoveringStates() {
        for (let i = 0; i < MasterHandler.elements.length; i++) {
            MasterHandler.elements[i].hover = false;
        }
        MasterHandler.currentElementHovering = { element: undefined, className: undefined };
    }

    static isHovering(color) {
        for (let i = 0; i < MasterHandler.elements.length; i++) {
            if (MasterHandler.elements[i].colorHitArea === color) {
                return MasterHandler.setCurrentHoveringElement(MasterHandler.elements[i]);
            }
        }
        return false;
    }
    //#endregion

    //#region Utility GET
    static getRandomColorHitArea() {
        const r = () => Math.floor(Math.random() * 200) + 55;
        return "rgb(" + r() + "," + r() + "," + r() + ")";
    }

    static getColor(ctx, position) {
        let data = ctx.getImageData(position[0], position[1], 1, 1);
        return "rgb(" + data.data[0] + "," + data.data[1] + "," + data.data[2] + ")";
    }

    static getMousePosition(event) {
        let rect = event.target.getBoundingClientRect();
        return [
            Math.floor(MasterHandler.size * (event.clientX - rect.left) / (rect.right  - rect.left)),
            Math.floor(MasterHandler.size * (event.clientY - rect.top)  / (rect.bottom - rect.top))
        ];
    }

    static getMousePositionVec2(event) {
        let { left, top, right, bottom } = event.target.getBoundingClientRect();
        let { clientX, clientY }         = event;
        return new Vec2D(
            Math.floor(MasterHandler.size * (clientX - left) / (right  - left)),
            Math.floor(MasterHandler.size * (clientY - top)  / (bottom - top))
        );
    }
    //#endregion

    //#region Default options
    static getDefaultPosition()   { return { x: 0, y: 0 }; }
    static getDefaultSize()       { return { x: 100, y: 80 }; }
    static getDefaultTransform()  { return { position: MasterHandler.getDefaultPosition(), size: MasterHandler.getDefaultSize() }; }

    static getDefaultOptsAText() {
        return {
            text:       "DEFAULT",
            font:       { size: 15, police: "Arial" },
            alignement: { textAlign: "center", textBaseline: "middle" },
            colorFont:  "rgba(0,0,0,1)",
        };
    }
    static getDefaultOptsLabel() {
        return { text: 'Default', font: { size: 20, police: 'Arial' }, offset: { x: 0, y: 0 } };
    }
    static getDefaultOptsBorder() {
        return { isActive: true, color: 'rgba(50,50,250,1)', isRounded: false, lineWidth: .5, radius: 5 };
    }
    static getDefaultOptsColor() {
        return { base: 'rgba(200,200,220,1)', hover: 'rgba(150,150,250,1)', click: 'rgba(180,180,255,1)' };
    }
    static getDefaultOptsCallback() {
        return { callback: () => { console.warn('callback non initialiser'); }, value: 'Default value callback' };
    }
    //#endregion

    //#region Utility SET
    static setCurrentHoveringElement(element) {
        MasterHandler.currentElementHovering = { element, className: element.constructor.name };
        return element;
    }
    //#endregion
}
