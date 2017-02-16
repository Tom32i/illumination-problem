/**
 * Point
 */
class Point {
    /**
     * Create point from an array
     *
     * @param {Array} coordinates
     *
     * @return {Point}
     */
    static createFromArray(coordinates) {
        return new Point(coordinates[0], coordinates[1]);
    }

    /**
     * @param {Number} x
     * @param {Number} y
     */
    constructor(x, y) {
        this.x = x;
        this.y = y;
    }

    getDistance(point) {
        return Math.sqrt(Math.pow(this.x - point.x, 2) + Math.pow(this.y - point.y, 2));
    }
}

export default Point;
