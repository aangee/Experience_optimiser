class AppMenu {
	/**
	 * @param {Number} size taille de base pour nos canvas
	 * @param {string} mode 'gui' | 'menu'
	 */
	constructor(size, mode = 'gui') {
		this.size = size;
		this.mode = mode;

		this.cnv    = this.initializeCanvas("myCanvas",      'js-canvas');
		this.cnvHit = this.initializeCanvas("hitTestCanvas", 'js-canvas');

		// Canvas hit utilisé seulement pour la détection — caché en portfolio
		this.cnvHit.canvas.style = "display:none";

		MasterHandler.init(this.cnv, this.cnvHit, this.size);

		this.menu = this.setupMenuDemo();
		this.menu.setActive(false);

		this.gui = this.setupGUIDemo();
		this.gui.start();
		this.gui.init();

		if (mode === 'menu') {
			this.menu.setActive(true);
		} else {
			this.gui.switchLayer('home');
		}

		MasterHandler.save();
	}

	drawScene() {
		this.cnv.context.clearRect(0, 0, this.size, this.size);
		this.gui.update();
		MasterHandler.drawElements(this.cnv.context);
	}

	initializeCanvas(canvasName, parentId) {
		let canvas = new Canvas({
			size: { w: this.size, h: this.size },
			classAdd: canvasName,
			parentNameID: parentId
		});
		return canvas;
	}

	setupMenuDemo() {
		let posMenu  = new Vec2D(this.size * .5, this.size * .5);
		let sizeMenu = new Vec2D(900, 700);
		return new MenuDemo({ position: posMenu, size: sizeMenu });
	}

	setupGUIDemo() {
		let posGUI  = new Vec2D(this.size * .5, this.size * .5);
		let sizeGUI = new Vec2D(this.size, this.size);
		return new GUIMaster(posGUI, sizeGUI);
	}
}
