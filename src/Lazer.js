import Vector from './Vector';
import Point from './Point';

/**
 * Lazer
 */
class Lazer {
    static get maxDepth() { return 5; }

    static createFromAngle(origin, angle) {
        const lazer = new this(/*origin,*/ Vector.createFromAngle(origin, angle), angle < Math.PI / 2 || angle > 3 * Math.PI / 2);
        lazer.angle = angle;
        return lazer;
    }

    /**
     * @param {Vector} vector
     * @param {Vector} direction
     */
    constructor(/*origin, */vector, direction = true, depth = 0) {
        //this.origin = origin;
        //this.angle = angle % Math.twoPI;//angle < 0 ? (angle % Math.twoPI) + Math.twoPI : angle % Math.twoPI;
        this.vector = vector;
        this.direction = direction;
        this.depth = depth;
        this.end = null;
        this.reflexion = null;
        this.changed = true;
    }

    get origin() { return this.vector.from; }

    /**
     * Set lazer angle
     *
     * @param {Angle} angle
     */
    setAngle(angle) {
        //if (this.angle !== angle) {
            this.angle = angle;
            this.direction = angle < Math.PI / 2 || angle > 3 * Math.PI / 2;
            this.vector = Vector.createFromAngle(this.origin, angle);
            //this.angle = angle % Math.twoPI;
            this.reflexion = null;
            this.end = null;
            this.changed = true;
        //}
    }

    /*update() {
        if (!this.changed) {
            return false;
        }

        this.changed = false;
        this.vector = Vector.createFromAngle(this.origin, this.angle);

        return true;
    }*/

    getXDirection() {
        return this.angle < Math.PI / 2
            || this.angle > 3 * Math.PI / 2;
    }

    getYDirection() {
        return this.angle > 0
            && this.angle < Math.PI;
    }

    setEnd(end = this.vector.getPoint(this.vector.from.x + (this.direction ? 1 : -1))) {
        this.end = end;
    }

    createReflexion(segment) {
        const dotMultiply = (vA, vB) => { return (vA[0] * vB[0]) + (vA[1] * vB[1]); };
        const add = (vA, vB) => { return [vA[0] + vB[0], vA[1] + vB[1]]; };
        const substract = (vA, vB) => { return [vA[0] - vB[0], vA[1] - vB[1]]; };
        const multiply = (vector, factor) => { return [vector[0] * factor, vector[1] * factor]; };

        //console.log('-'.repeat(35));

        //reflect = incident - 2 * (incident ● normal) * n
        //
        //reflect = [1, 0.577] - 2 * ([1, 0.577] ● [-0, -1]) * [-0, -1]
        //reflect = [1, 0.577] - 2 * (0.577) * [-0, -1]
        //reflect = [1, 0.577] - 2 * [0, 0.577]
        //reflect = [1, 0.577] - 2 * [0, 0.577]
        //reflect = [1, 0.577] - [0, 1.154]
        //reflect = [1, -0.577]
        //
        //
        // [-2.747477419454621, -1] = [1, 2.747477419454621] - 2 * ([1, 2.747477419454621] ● [-1, -1]) * [-1, -1]
        // [1, 2.747477419454621] - 2 * ([1, 2.747477419454621] ● [-1, -1]) * [-1, -1]
        // [1, 2.747477419454621] - 2 * (-3.747477419454621) * [-1, -1]
        // [1, 2.747477419454621] - [3.747477419454621, 3.747477419454621]
        // [-2.747477419454621, -1]

        const incident = this.vector.getVector(0, this.origin.x < this.end.x ? 1 : -1);
        const normal = segment.getNormal();
        let reflect = substract(incident, multiply(normal, 2 * dotMultiply(incident, normal)));
        if (normal[0] !== 0 && normal[1] !== 0) {
            reflect = substract(incident, multiply(normal, dotMultiply(incident, normal)));
        }
        //const reflectVector = Vector.createFromPoints(this.end, new Point(this.end.x + reflect[0], this.end.y + reflect[1]));
        const slope = reflect[1] / reflect[0];
        const reflectVector = new Vector(slope, this.end.y - slope * this.end.x, this.end);
        const direction = reflect[0] > 0;
        //let angle = Math.atan(reflect[1] / reflect[0]);

        //if (reflect[0] < 0) {
            //angle += Math.PI;
        //}

        //console.log('Lazer', this);
        //console.log('surface', segment);
        //console.log('incident', incident);
        //console.log('normal', normal);
        //console.log('reflectVector', reflectVector);
        //console.log('reflect', reflect);
        //console.log('direction', direction);
        //console.log('angle', angle);

        return new Lazer(reflectVector, direction, this.depth + 1);

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

        return (this.direction ? x >= from.x : x <= from.x);
            //&& (this.getYDirection() ? y >= from.y : y <= from.y);
    }
}

export default Lazer;
