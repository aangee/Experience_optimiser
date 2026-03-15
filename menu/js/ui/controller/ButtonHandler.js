class ButtonHandler {

    createRoundedButton(param) {
        let optsBorder = { isRounded: true };
        param.params.optsLabel  = Object.assign(MasterHandler.getDefaultOptsLabel(), param.params.optsLabel);
        param.params.optsBorder = Object.assign(optsBorder, param.params.optsBorder);
        let tempBtn = new RoundedButton(param);
        MasterHandler.createElement(tempBtn);
        return tempBtn;
    }

    createRectButton(param) {
        param.params.optsLabel = Object.assign(MasterHandler.getDefaultOptsLabel(), param.params.optsLabel);
        let tempBtn = new RoundedButton(param);
        MasterHandler.createElement(tempBtn);
        return tempBtn;
    }

    createToggle(param) {
        param.params.optsLabel = Object.assign(MasterHandler.getDefaultOptsLabel(), param.params.optsLabel);
        let tempToggle = new Toggle(param);
        MasterHandler.createElement(tempToggle);
        return tempToggle;
    }

    createPianoKey(name, position, width, height, optsColor, options) {
        MasterHandler.createElement(new PianoKeyButton(name, position, width, height, optsColor, options));
    }
}
