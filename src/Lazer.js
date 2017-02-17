import Vector from './Vector';
import Point from './Point';

/**
 * Lazer
 */
class Lazer {
    static get maxDepth() { return 3; }

    /**
     * @param {Point} origin
     * @param {Number} angle
     */
    constructor(origin, angle, depth = 0) {
        this.origin = origin;
        this.angle = angle % Math.twoPI;//angle < 0 ? (angle % Math.twoPI) + Math.twoPI : angle % Math.twoPI;
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
            this.reflexion = null;
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
        const dotMultiply = (vA, vB) => vA[0] * vB[0] + vA[1] * vB[1];
        const add = (vA, vB) => [vA[0] + vB[0], vA[1] + vB[1]];
        const substract = (vA, vB) => [vA[0] - vB[0], vA[1] - vB[1]];
        const multiply = (vector, factor) => vector.map(value => value * factor);

        const incident = this.vector.getVector();
        const normal = segment.getNormal();
        const reflect = substract(incident, multiply(normal, 2 * dotMultiply(incident, normal)));
        //const reflectVector = Vector.createFromPoints(new Point(0, 0), new Point(reflect[0], reflect[1]));
        let angle = Math.atan(reflect[1], reflect[0]);

        if (reflect[0] < 0 && reflect[1] < 0) {
            angle = Math.PI - angle;
        }

        console.log('Lazer', this);
        console.log('surface', segment);
        console.log('incident', incident);
        console.log('normal', normal);
        console.log('reflect', reflect);
        //console.log('reflectVector', reflectVector);
        console.log('angle', angle);

        return new Lazer(this.end, angle, this.depth + 1);

        /*const angle = - this.angle;//segment.reflect(this);

        return new Lazer(this.end, angle, this.depth + 1);*/
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
