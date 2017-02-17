import Vector from './Vector';

/**
 * Segment
 */
class Segment extends Vector {
    /**
     * Create Segment from two points
     *
     * @param {Point} from
     * @param {Point} to
     *
     * @return {Vector}
     */
    static createFromPoints(from, to) {
        const slope = this.getSlope(from, to);
        const origin = this.getOrigin(from, slope);

        return new this(slope, origin, from, to);
    }

    /**
     * @param {Point} point
     * @param {Number} slope
     * @param {Number} origin
     */
    constructor(slope, origin, from, to) {
        super(slope, origin, from);

        this.to = to;
    }

    getNormal() {
        const x = this.to.x - this.from.x;
        const y = this.to.y - this.from.y;

        return [-y, x];
    }

    contains(point) {
        const { x, y } = point;

        if (this.isVertical()) {
            return this.roundTo(x) === this.roundTo(this.from.x)
                && y >= Math.min(this.from.y, this.to.y)
                && y <= Math.max(this.from.y, this.to.y);
        }

        return x >= Math.min(this.from.x, this.to.x)
            && x <= Math.max(this.from.x, this.to.x)
            && y >= Math.min(this.from.y, this.to.y)
            && y <= Math.max(this.from.y, this.to.y);
    }
}

export default Segment;
