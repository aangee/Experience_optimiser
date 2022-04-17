let Point = class {
    constructor(x, y) {
        this.x = x;
        this.y = y;
    }
    RandomPoint(width, height) {
        this.x = Math.random() * width;
        this.y = Math.random() * height;
        return this;
    }

}

let Particle = class {
    constructor(x, y) {
        this.x = x;
        this.y = y;
        this.vx = Math.random() * 8 - 2;
        this.vy = Math.random() * 8 - 2;
    }
};

let Line = class {
    constructor(p0, p1) {
        this.p0 = p0;
        this.p2 = p1;
    }
    RandomPoints(width, height) {
        this.p0 = new Point(0, 0).RandomPoint(width, height);
        this.p1 = new Point(0, 0).RandomPoint(width, height);
        return this;
    }
};

