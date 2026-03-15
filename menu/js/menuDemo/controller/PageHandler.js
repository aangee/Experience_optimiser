class PageHandler {
    static pages            = [];
    static indexPageCurrent = 0;
    static counterPage      = 0;

    static addPage(page) {
        page.InitElementsInPage();
        page.setActive(false);
        PageHandler.pages.push(page);
        PageHandler.counterPage++;
    }

    static setActive(id, bool) {
        if (bool) PageHandler.indexPageCurrent = id;
        PageHandler.pages[id].setActive(bool);
    }

    static switchPages(index) {
        const b = true;
        switch (index) {
            case -1:
                PageHandler.setActive(0, !b);
                PageHandler.setActive(1, !b);
                PageHandler.setActive(2, !b);
                break;
            case 0:
                PageHandler.setActive(0,  b);
                PageHandler.setActive(1, !b);
                PageHandler.setActive(2, !b);
                break;
            case 1:
                PageHandler.setActive(0, !b);
                PageHandler.setActive(1,  b);
                PageHandler.setActive(2, !b);
                break;
            case 2:
                PageHandler.setActive(0, !b);
                PageHandler.setActive(1, !b);
                PageHandler.setActive(2,  b);
                break;
            default:
                break;
        }
    }

    static getPageById(id) {
        return PageHandler.pages[id];
    }
}
