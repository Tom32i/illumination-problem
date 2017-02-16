import Vector from './Vector';
import Point from './Point';

/**
 * Lazer
 */
class Lazer {
    /**
     * @param {Point} origin
     * @param {Number} angle
     */
    constructor(origin, angle) {
        this.angle = angle;
        this.origin = origin;
        this.vector = Vector.createFromAngle(this.origin, angle);
    }

    /**
     * Set lazer angle
     *
     * @param {Angle} angle
     */
    setAngle(angle) {
        if (this.angle !== angle) {
            this.angle = angle;
            this.vector = Vector.createFromAngle(this.origin, angle);
        }
    }

    getXDirection() {
        return this.angle < Math.PI / 2
            || this.angle > 3 * Math.PI / 2;
    }

    getYDirection() {
        return this.angle > 0
            && this.angle < Math.PI;
    }

    contains(point) {
        const { x, y } = point;
        const { from } = this.vector;

        return (this.getXDirection() ? x >= from.x : x <= from.x)
            && (this.getYDirection() ? y >= from.y : y <= from.y);
    }

    /**
     * Get closest intersection
     *
     * @param {Array} walls
     *
     * @return {Point}
     */
    getClosestIntersection(walls, canvas) {
        return walls.reduce((intersection, segment, index) => {
            const point = segment.getIntersect(this.vector, index === 16);

            if (point) {
                if (segment.contains(point)) {
                    if (this.contains(point)) {
                        if (!intersection || this.origin.getDistance(intersection) > this.origin.getDistance(point)) {
                            return point;
                        }
                    }
                }
            }

            return intersection;
        }, null);
    }
}

export default Lazer;
