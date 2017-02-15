/**
 * Layout
 */
class Layout {
    constructor(source, observer, points = []) {
        this.points = points;
        this.source = source;
        this.observer = observer;
        this.width = this.getDifference(points.map(point => point[0]));
        this.height = this.getDifference(points.map(point => point[1]));
    }

    getDifference(values) {
        const min = values.reduce((result, value) => Math.min(result, value), 0);
        const max = values.reduce((result, value) => Math.max(result, value), 0);

        return max - min;
    }
}

export default Layout;
