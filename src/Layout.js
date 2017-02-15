/**
 * Layout
 */
class Layout {
    constructor(size, source, observer, points = []) {
        this.centerAndScale = this.centerAndScale.bind(this);

        this.cols = this.getDifference(points.map(point => point[0]));
        this.rows = this.getDifference(points.map(point => point[1]));
        this.size = Math.max(this.cols, this.rows);
        this.marginX = /*Math.floor*/(((this.size + 2) - this.cols) / 2);
        this.marginY = /*Math.floor*/(((this.size + 2) - this.rows) / 2);
        this.scale = size / (this.size + 2);
        console.log(size, this);
        this.points = points.map(this.centerAndScale.bind(this));
        this.source = this.centerAndScale(source);
        this.observer = this.centerAndScale(observer);
    }

    getDifference(values) {
        const min = values.reduce((result, value) => Math.min(result, value), 0);
        const max = values.reduce((result, value) => Math.max(result, value), 0);

        return max - min;
    }

    centerAndScale(point) {
        return [
            (point[0] + this.marginX) * this.scale,
            (point[1] + this.marginY) * this.scale,
        ];
    }
}

export default Layout;
