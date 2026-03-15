class StackPanel extends Panel {
    constructor(param) {
        super(param);
        this.stackParams = {
            space:      { x: 5, y: 5 },
            calculePos: { x: this.position.x, y: this.position.y - (this.size.y * .4) }
        }
    }

    calculeVerticalStack(listElement) {
        for (let i = 0; i < listElement.length; i++) {
            const child = listElement[i];
            this.stackParams.calculePos.y += (child.size.y + this.stackParams.space.y);
            child.position.y = this.stackParams.calculePos.y;
            if (child instanceof Toggle) {
                child.caseExt.y   = this.stackParams.calculePos.y;
                child.caseInt.y   = this.stackParams.calculePos.y;
                child.label.position.y = this.stackParams.calculePos.y;
            }
            if (child instanceof RoundedButton) {
                child.label.position.y = this.stackParams.calculePos.y;
            }
        }
    }

    calculeHorizontal(listElement, spacing, alignment, isWrapMode) {
        let sizeWcanvas = this.size.x;
        let x = spacing;
        let y = spacing;
        let maxHeight = 0;
        let ypos = 0;

        for (let i = 0; i < listElement.length; i++) {
            maxHeight = Math.max(maxHeight, listElement[i].size.y);
        }

        for (let i = 0; i < listElement.length; i++) {
            const element = listElement[i];
            if (isWrapMode && x + element.size.x + spacing > sizeWcanvas) {
                x = spacing;
                y += maxHeight + spacing;
            }
            if (alignment === 'bottom') {
                ypos = maxHeight - element.size.y;
            } else if (alignment === 'center') {
                ypos = (maxHeight - element.size.y) / 2;
            }

            element.position.x += x;
            element.position.y += y + ypos;
            if (element instanceof Toggle) {
                element.setPosAllCase();
            }
            x += element.size.x + spacing;
        }
    }
}
