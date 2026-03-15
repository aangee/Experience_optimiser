class PanelHandler {
    createPanel(param) {
        let tempPanel = new Panel(param);
        MasterHandler.createElement(tempPanel);
        return tempPanel;
    }
    createStackPanel(param) {
        let tempPanel = new StackPanel(param);
        MasterHandler.createElement(tempPanel);
        return tempPanel;
    }
}
