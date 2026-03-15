class Vec2D {

    constructor(x, y) {
        /**@type {Number} */
        this.x = x;
        /**@type {Number} */
        this.y = y;
    }

    getVec() { return { x: this.x, y: this.y }; }
    setX(value) { this.x = value; }
    getX() { return this.x; }
    setY(value) { this.y = value; }
    getY() { return this.y; }

    setAngle(angle) {
        var length = this.getLength();
        this.x = Math.cos(angle) * length;
        this.y = Math.sin(angle) * length;
    }
    getAngle() { return Math.atan2(this.y, this.x); }

    setLength(length) {
        var angle = this.getAngle();
        this.x = Math.cos(angle) * length;
        this.y = Math.sin(angle) * length;
    }
    getLength() { return Math.sqrt(this.x * this.x + this.y * this.y); }

    add(v2)        { return new Vec2D(this.x + v2.x, this.y + v2.y); }
    add2(x, y)     { return new Vec2D(this.x + x, this.y + y); }
    subtract(v2)   { return new Vec2D(this.x - v2.x, this.y - v2.y); }
    multiply(val)  { return new Vec2D(this.x * val, this.y * val); }
    divide(val)    { return new Vec2D(this.x / val, this.y / val); }

    addTo(v2)        { this.x += v2.x; this.y += v2.y; }
    addTo2(x, y)     { this.x += x;    this.y += y; }
    subtractFrom(v2) { this.x -= v2.x; this.y -= v2.y; }
    multiplyBy(val)  { this.x *= val;  this.y *= val; }
    divideBy(val)    { this.x /= val;  this.y /= val; }
}
