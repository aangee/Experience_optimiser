class LabelHandler {
    createLabel(param) {
        let tempLabel = new Label(param);
        MasterHandler.createElement(tempLabel);
        return tempLabel;
    }
    createTextArea(param) {
        let tempLabel = new TextArea(param);
        MasterHandler.createElement(tempLabel);
        return tempLabel;
    }
}
