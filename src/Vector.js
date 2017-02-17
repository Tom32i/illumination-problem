import Point from './Point';

/**
 * Vector
 */
class Vector {
    /**
     * Create Vector from an angle
     *
     * @param {Point} point
     * @param {Number} angle
     *
     * @return {Vector}
     */
    static createFromAngle(point, angle) {
        return this.createFromPoints(point, new Point(
            point.x + Math.cos(angle),
            point.y + Math.sin(angle)
        ));
    }

    /**
     * Create Vector from two points
     *
     * @param {Point} from
     * @param {Point} to
     *
     * @return {Vector}
     */
    static createFromPoints(from, to) {
        const slope = this.getSlope(from, to);
        const origin = this.getOrigin(from, slope);

        return new this(slope, origin, from);
    }

    /**
     * Get slope
     *
     * @param {Point} from
     * @param {Point} to
     *
     * @return {Number}
     */
    static getSlope(from, to) {
        return (to.y - from.y) / (to.x - from.x);
    }

    /**
     * Get origin
     *
     * @param {Point} point
     * @param {Number} slope
     *
     * @return {Number}
     */
    static getOrigin(point, slope) {
        return point.y - slope * point.x;
    }

    /**
     * @param {Number} slope
     * @param {Number} origin
     * @param {Point} from
     */
    constructor(slope, origin, from) {
        this.slope = slope;
        this.origin = origin;
        this.from = from;
    }

    /**
     * Get Y position for this given X
     *
     * @param {Number} x
     *
     * @return {Number}
     */
    getY(x) {
        return this.slope * x + this.origin;
    }

    /**
     * Is the vector vertical?
     *
     * @return {Boolean}
     */
    isVertical() {
        return Math.abs(this.slope) === Infinity;
    }

    roundTo(value, precision = 5) {
        const factor = Math.pow(10, precision);

        return Math.round(value * factor) / factor;
    }

    /**
     * Get intersection point with the given vector
     *
     * @param {Vector} vector
     *
     * @return {Array|null}
     */
    getIntersect(vector) {
        if (this.isVertical()) {
            if (vector.isVertical()) {
                return null;
            }

            return new Point(this.from.x, vector.getY(this.from.x));
        } else if(vector.isVertical()) {
            return new Point(vector.from.x, this.getY(vector.from.x));
        }

        const x = (vector.origin - this.origin) / (this.slope - vector.slope);
        const y = this.getY(x);

        if (this.roundTo(y) !== this.roundTo(vector.getY(x))) {
            return null; // Parallel
        }

        return new Point(x, y);
    }

    getVector(xA = 0, xB = 1) {
        const yA = this.getY(xA);
        const yB = this.getY(xB);

        return [xB - xA, yB - yA];
    }
}

export default Vector;
