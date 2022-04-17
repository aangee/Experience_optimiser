class Setup {
    constructor(params) {
        this.canvas = document.getElementById("canvas");
        this.ctx = canvas.getContext("2d");
        this.width = canvas.width = window.innerWidth;
        this.height = canvas.height = window.innerHeight;

        this.points = [];

        this.clickPoint;

        /**
         * Assign the project to an employee.
         * @type {Object} colorSettings => p
         * @param {string} p.colorControl - Couleur des points de controle.
         * @param {string} p.colorPointInterct - Couleur du point interction.
         * @param {string} p.colorLine - Couleur de la ligne. */
        this.colorSettings;
    }
}

window.onload = Run_LineInteractive();