class Vector {
    /**
     * Create Vector from an angle
     *
     * @param {Number} x
     * @param {Number} y
     * @param {Number} angle
     *
     * @return {Vector}
     */
    static createFromAngle(x, y, angle) {
        return Vector.createFromPoints(x, y, angle);
    }

    /**
     * Create Vector from two points
     *
     * @param {Number} x
     * @param {Number} y
     * @param {Number} angle
     *
     * @return {Vector}
     */
    static createFromPoints(x, y, xb, yb) {
        return new Vector(x, y, atan((yb - y) / (xb - x)));
    }


    /**
     * Constructor
     *
     * @param {Number} x
     * @param {Number} y
     * @param {Number} slope
     * @param {Number} origin
     *
     * @return {Number}
     */
    constructor(x, y, angle) {
        this.x = x;
        this.y = y;
        this.angle = angle;
    }

    /**
     * Get Y position for this given X
     *
     * @param {Number} x
     *
     * @return {Number}
     */
    getY(x) {
        return x * tan(this.angle);
    }

    getIntersect(vector) {
        if (vector.angle === this.angle) {
            return null;
        }

        const x = (vector.origin - this.origin) / (this.slope - vector.slope);
        const y = this.getY(x);

        if (y !== vector.getY(x)) {
            return null; // Parallel
        }

        return [x, y];
    }
}

export default Vector;
