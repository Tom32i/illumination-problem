import Segment from './Segment';
import Point from './Point';

/**
 * Layout
 */
class Layout {
    /**
     * Vectorise the list of points
     *
     * @param {Point} point
     * @param {Number} index
     * @param {Array} points
     *
     * @return {Segment}
     */
    static vectorise(point, index, points) {
        const previous = index === 0 ? points.length -1 : index - 1;

        return Segment.createFromPoints(points[previous], point);
    }

    /**@param {Point} source
     * @param {Point} observer
     * @param {Array} points
     */
    constructor(source, observer, points = []) {
        this.source = Point.createFromArray(source);
        this.observer = Point.createFromArray(observer);
        this.points = points.map(Point.createFromArray);
        this.walls = this.points.map(Layout.vectorise);
        this.width = this.getMaxDistance(this.points.map(point => point.x));
        this.height = this.getMaxDistance(this.points.map(point => point.y));
    }

    /**
     * Get maximun distance between values
     *
     * @param {Array} values
     *
     * @return {Number}
     */
    getMaxDistance(values) {
        const min = values.reduce((result, value) => Math.min(result, value), 0);
        const max = values.reduce((result, value) => Math.max(result, value), 0);

        return max - min;
    }
}

export default Layout;
