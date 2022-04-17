//#region Vector
class Vec2D {
    constructor(x, y) {
        this.x = x;
        this.y = y;
    }
    Random(width, height) {
        this.x = Math.random() * width;
        this.y = Math.random() * height;
        return this;
    }
}
//#endregion

//#region Point
class Point {
    constructor(x, y) {
        this.x = x;
        this.y = y;
    }
    Random(width, height) {
        let random = new Vec2D(0, 0).Random(width, height);
        this.x = random.x;
        this.y = random.y;
        return this;
    }
}
//#endregion

//#region Line
class Line {
    constructor(p0, p1) {
        this.p0 = p0;
        this.p1 = p1;
    }
    Random(width, height) {
        this.p0 = new Point(0, 0).Random(width, height);
        this.p1 = new Point(0, 0).Random(width, height);
        return this;
    }
}
//#endregion

//#region Particle
class Particle {
    constructor(x, y) {
        this.x = x;
        this.y = y;
        this.vx = Math.random() * 8 - 4;
        this.vy = Math.random() * 8 - 4;
    }
}
//#endregion

//#region Setup
class SetupCanvas {
    constructor(params) {
        this.canvas = document.getElementById("canvas");
        this.ctx = canvas.getContext("2d");
        this.width = canvas.width = window.innerWidth;
        this.height = canvas.height = window.innerHeight;

    }
}
//#endregion