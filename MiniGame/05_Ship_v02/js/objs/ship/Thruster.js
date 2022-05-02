class Thruster {

    constructor(x, y) {
        this.x = x;
        this.y = y;
    }

    getVec() {
        return { x: this.x, y: this.y };
    }

   /*  setX(value) {
        this.x = value;
    }

    getX() {
        return this.x;
    }

    setY(value) {
        this.y = value;
    }

    getY() {
        return this.y;
    } */

    /** Modifi angle de rotation 
    * @param {Number} heading Angle a applique */
    setHeading(heading) {
        var speed = this.getSpeed();
        this.x = Math.cos(heading) * speed;
        this.y = Math.sin(heading) * speed;
    }

    /** @returns L'angle de rotation actuelle  */
    getHeading() {
        return Math.atan2(this.y, this.x);
    }

    /** Modifi le vitesse
	 *  @param {Number} speed Vitesse a ajoute */
	setSpeed(speed) {
        var heading = this.getHeading();
        this.x = Math.cos(heading) * speed;
        this.y = Math.sin(heading) * speed;
    }

    /** @returns La vitesse actuelle  */
    getSpeed() {
        return Math.sqrt(this.x * this.x + this.y * this.y);
    }

    add(v2) {
        return new Vec2D(this.x + v2.getX(), this.y + v2.getY());
    }

    subtract(v2) {
        return new Vec2D(this.x - v2.getX(), this.y - v2.getY());
    }

    multiply(val) {
        return new Vec2D(this.x * val, this.y * val);
    }

    divide(val) {
        return new Vec2D(this.x / val, this.y / val);
    }

    addTo(v2) {
        this.x += v2.getX();
        this.y += v2.getY();
    }

    subtractFrom(v2) {
        this.x -= v2.getX();
        this.y -= v2.getY();
    }

    multiplyBy(val) {
        this.x *= val;
        this.y *= val;
    }

    divideBy(val) {
        this.x /= val;
        this.y /= val;
    }

}