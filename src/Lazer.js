import Vector from './Vector';
import Point from './Point';

/**
 * Lazer
 */
class Lazer {
    static get maxDepth() { return 2; }

    /**
     * @param {Point} origin
     * @param {Number} angle
     */
    constructor(origin, angle, depth = 0) {
        this.origin = origin;
        this.angle = angle;
        this.depth = depth;
        this.end = null;
        this.vector = null;
        this.reflexion = null;
        this.changed = true;
    }

    /**
     * Set lazer angle
     *
     * @param {Angle} angle
     */
    setAngle(angle) {
        if (this.angle !== angle) {
            this.angle = angle;
            this.changed = true;
        }
    }

    update() {
        if (!this.changed) {
            return false;
        }

        this.changed = false;
        this.vector = Vector.createFromAngle(this.origin, this.angle);

        return true;
    }

    getXDirection() {
        return this.angle < Math.PI / 2
            || this.angle > 3 * Math.PI / 2;
    }

    getYDirection() {
        return this.angle > 0
            && this.angle < Math.PI;
    }

    createReflexion(segment) {
        dotMultiply = (vA, vB) => [];
        multiply = (vA, vB) => [];

        const incident = [this.end.x - this.from.x, this.end.y - this.from.y];
        const surface = [this.end.x, this.end.y];
        const normal = [this.end.x, this.end.y];

        const reflect = N.multiply(2 * (incident.dotMultiply(N))) - incident;

        const angle = - this.angle;//segment.reflect(this);

        return new Lazer(this.end, angle, this.depth + 1);
    }

    /**
     * Does the lazer contain this point?
     *
     * @param {Point} point
     *
     * @return {Boolean}
     */
    contains(point) {
        const { x, y } = point;
        const { from } = this.vector;

        return (this.getXDirection() ? x >= from.x : x <= from.x)
            && (this.getYDirection() ? y >= from.y : y <= from.y);
    }
}

export default Lazer;
