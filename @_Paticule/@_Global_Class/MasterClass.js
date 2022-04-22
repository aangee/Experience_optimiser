//#region Vector
/**
 * Cree un vector (x, y)
 */
class Vec2D {

    /**
     * @param { Number } x Pos X | Size W
     * @param { Number } y Pos Y | Size H
     */
    constructor(x, y) {
        this.x = x;
        this.y = y;
    }

    getVec() {
        return { x: this.x, y: this.y };
    }

    setX(value) {
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
    }

    setAngle(angle) {
        var length = this.getLength();
        this.x = Math.cos(angle) * length;
        this.y = Math.sin(angle) * length;
    }

    getAngle() {
        return Math.atan2(this.y, this.x);
    }

    setLength(length) {
        var angle = this.getAngle();
        this.x = Math.cos(angle) * length;
        this.y = Math.sin(angle) * length;
    }

    getLength() {
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

    randomRange(minn, maxx) {
        return minn + Math.random() * (maxx - minn);
    }
    random(minn, maxx) {
        this.x = minn + Math.random() * (maxx - minn);
        this.y = minn + Math.random() * (maxx - minn);
        //return rvec;
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

    /** Cree une particule
     * @param {Number} x Position en X
     * @param {Number} y Position en Y
     * @param {Number} speed Vitesse de la particule
     * @param {Number} direction Angle de rotation
     * @param {Number} grav Valeur gravity si null = 0 */
    constructor(x, y, speed, direction, grav) {
        //var obj = Object.create(this);

        /** @property {Number} x Position en X */
        this.x = x;
        /** @property {Number} y Position en Y */
        this.y = y;
        /** @property {Number} vx Velocity en X */
        this.vx = Math.cos(direction) * speed;
        /** @property {Number} vx Velocity en Y */
        this.vy = Math.sin(direction) * speed;

        /** @property {Vec2D} position Position via Vec2D */
        this.position = new Vec2D(x, y);

        /** @property {Number} radius Radius de la particule */
        this.radius = 2;
        this.bounce = -1;
        /** @property {Number} friction Friction a ajoute a la particule */
        this.friction = 1;
        /** @property {Number} mass Mass de la paricule NOTE: pour la gravity */
        this.mass = 1;
        /** @property {Number} gravity Gravity a ajoute a la particule */
        this.gravity = grav || 0;
        /** @property {array} gravitations Toute les particule avec les quelle cette particule interagie au niveau de la gravitation */
        this.gravitations = [];


        /** @property {array} springs Toute les particule avec les quelle cette particule interagie au niveau des springs "Resort" */
        this.springs = [];
        //return this;
    }

    /**Faire gravite autoure d'une autre particule
     * @param {Particle} p Particule autour de la quelle cette particule gravitera 
     */
    addGravitation(p) {
        this.removeGravitation(p);
        this.gravitations.push(p);
    }

    removeGravitation(p) {
        for (var i = 0; i < this.gravitations.length; i += 1) {
            if (p === this.gravitations[i]) {
                this.gravitations.splice(i, 1);
                return;
            }
        }
    }

    addSpring(point, k, length) {
        this.removeSpring(point);
        this.springs.push({
            point: point,
            k: k,
            length: length || 0
        });
    }

    removeSpring(point) {
        for (var i = 0; i < this.springs.length; i += 1) {
            if (point === this.springs[i].point) {
                this.springs.splice(i, 1);
                return;
            }
        }
    }

    /** @returns La vitesse actuelle  */
    getSpeed() {
        return Math.sqrt(this.vx * this.vx + this.vy * this.vy);
    }
    /** Modifi le vitesse
     *  @param {Number} speed Vitesse a ajoute */
    setSpeed(speed) {
        var heading = this.getHeading();
        this.vx = Math.cos(heading) * speed;
        this.vy = Math.sin(heading) * speed;
    }

    /** @returns L'angle de rotation actuelle  */
    getHeading() {
        return Math.atan2(this.vy, this.vx);
    }

    /** Modifi angle de rotation 
     * @param {Number} heading Angle a applique
     */
    setHeading(heading) {
        var speed = this.getSpeed();
        this.vx = Math.cos(heading) * speed;
        this.vy = Math.sin(heading) * speed;
    }

    /** Ajoute une acceleration
     * @param {Number} ax Acceleration en X
     * @param {Number} ay Acceleration en Y
     */
    accelerate(ax, ay) {
        this.vx += ax;
        this.vy += ay;
    }
    /** Ajoute une acceleration avec un vec2D
    * @param { Vec2D } vec Accel
    * @param { Number } vec.x Accel en X
    * @param { Number } vec.y Accel en Y
    */
    accelerateV2(vec) {
        this.vx += vec.x;
        this.vy += vec.y;
    }

    /** Mise a jour de la particule */
    update() {
        this.handleSprings();
        this.handleGravitations();
        this.vx *= this.friction;
        this.vy *= this.friction;
        this.vy += this.gravity;
        this.x += this.vx;
        this.y += this.vy;

        this.position.x = this.x;
        this.position.y = this.y;
    }

    /** Calcule de la gravition */
    handleGravitations() {
        for (var i = 0; i < this.gravitations.length; i += 1) {
            this.gravitateTo(this.gravitations[i]);
        }
    }
    /** Calcule pour les spring "Resort" */
    handleSprings() {
        for (var i = 0; i < this.springs.length; i += 1) {
            var spring = this.springs[i];
            this.springTo(spring.point, spring.k, spring.length);
        }
    }

    angleTo(p2) {
        return Math.atan2(p2.y - this.y, p2.x - this.x);
    }

    /** Calcule la distence entre cette particule(this) et une particule cible(p2)
     * @param {Particle} p2 Particule cible
     * @returns Distance entre p & p2
     */
    distanceTo(p2) {
        var dx = p2.x - this.x,
            dy = p2.y - this.y;

        return Math.sqrt(dx * dx + dy * dy);
    }

    /** Calcule de la gravite entre cette particule(this) et une particule cible(p2)
     * @param {Particle} p2 Particule cible */
    gravitateTo(p2) {
        var dx = p2.x - this.x,
            dy = p2.y - this.y,
            distSQ = dx * dx + dy * dy,
            dist = Math.sqrt(distSQ),
            force = p2.mass / distSQ,
            ax = dx / dist * force,
            ay = dy / dist * force;

        this.vx += ax;
        this.vy += ay;
    }

    /** Calcule du systeme de spring "Resort"
     * @param {*} point 
     * @param {*} k 
     * @param {*} length */
    springTo(point, k, length) {
        var dx = point.x - this.x,
            dy = point.y - this.y,
            distance = Math.sqrt(dx * dx + dy * dy),
            springForce = (distance - length || 0) * k;
        this.vx += dx / distance * springForce,
            this.vy += dy / distance * springForce;
    }
}

class ParticleVec2D {
    constructor(x, y, speed, direction, grav) {

        this.position = new Vec2D(x, y);
        this.velocity = new Vec2D(0, 0);
        this.velocity.setLength(speed);
        this.velocity.setAngle(direction);
        this.gravity = new Vec2D(0, grav || 0);

        this.mass = 1;
        this.radius = 0;
        this.bounce = -1;
        this.friction = 1;


    }

    accelerate(accel) {
        this.velocity.addTo(accel);
    }

    update() {
        this.velocity.multiplyBy(this.friction);
        this.velocity.addTo(this.gravity);
        this.position.addTo(this.velocity);
    }

    angleTo(p2) {
        return Math.atan2(p2.position.getY() - this.position.getY(), p2.position.getX() - this.position.getX());
    }

    distanceTo(p2) {
        var dx = p2.position.getX() - this.position.getX(),
            dy = p2.position.getY() - this.position.getY();

        return Math.sqrt(dx * dx + dy * dy);
    }

    gravitateTo(p2) {
        var grav = new Vec2D(0, 0),
            dist = this.distanceTo(p2);

        grav.setLength(p2.mass / (dist * dist));
        grav.setAngle(this.angleTo(p2));
        this.velocity.addTo(grav);
    }
}
//#endregion

//#region Setup
class SetupCanvas {
    constructor() {
        this.canvas = document.getElementById("canvas");
        this.ctx = canvas.getContext("2d");
        this.width = canvas.width = window.innerWidth;
        this.height = canvas.height = window.innerHeight;

        /**
         * @type {Number[]}Position centre du setup dans un tableau
         * @param {Number} centerWorld [0]  => x
         * @param {Number} centerWorld [1] => y */
        this.centerWorld = [this.width * .5, this.height * .5];
    }

    clear(color) {
        if (color === undefined) this.ctx.clearRect(0, 0, this.width, this.height);

        if (color === undefined) return
        this.ctx.fillStyle = color;
        this.ctx.rect(0, 0, this.width, this.height);
        this.ctx.fill();
    }
}
//#endregion