class AText {
  constructor(
    param = {
      text: '',
      font: { size: 0, police: '' },
      alignement: { textAlign: '', textBaseline: '' },
      colorFont: '',
    }
  ) {
    let tempParam = MasterHandler.getDefaultOptsAText();
    param.font      = Object.assign(tempParam.font,      param.font);
    param.alignement = Object.assign(tempParam.alignement, param.alignement);
    param = Object.assign(tempParam, param);

    let { text, font, alignement, colorFont } = param;
    this.text      = text;
    this.font      = font;
    this.alignement = alignement;
    this.colorFont  = colorFont;
  }

  getFontForCTX() {
    return `${this.font.size}px ${this.font.police}`;
  }
}
