import Canvas from './Canvas';
import Layout from './Layout';
import Lazer from './Lazer';
import square from './layout/square';
import layout from './layout/tokarsky';

class App {
    constructor() {
        this.layout = new Layout(layout.source, layout.observer, layout.points);
        this.lazers = [new Lazer(this.layout.source[0], this.layout.source[1], Math.PI/5)];
        this.background = new Canvas();
        this.canvas = new Canvas();

        this.background.setDimensions(this.layout.width, this.layout.height);
        this.canvas.setDimensions(this.layout.width, this.layout.height);
        this.canvas.attach();

        this.drawLazer = this.drawLazer.bind(this);
        this.onResize = this.onResize.bind(this);

        window.addEventListener('resize', this.onResize);

        this.onResize();
        this.draw();
    }

    /**
     * On resize
     */
    onResize() {
        const scale = this.getScale();
        const width = Math.round(this.layout.width * scale);
        const height = Math.round(this.layout.height * scale);


        this.background.setDimensions(width, height, scale);
        this.canvas.setDimensions(width, height, scale);

        this.drawLayout();
    }

    /**
     * Get current scale
     *
     * @return {Number}
     */
    getScale(precision = 10) {
        const { width, height } = this.layout;
        const { innerWidth, innerHeight } = window;
        const scaleX = (innerWidth * 0.9) / width;
        const scaleY = (innerHeight * 0.9) / height;

        return Math.floor(Math.min(scaleX, scaleY) * precision) / precision;
    }

    draw() {
        this.canvas.paste(this.background.element);
        this.lazers.forEach(this.drawLazer);
    }

    drawLazer(lazer) {
        const { points } = lazer;
        this.canvas.drawLine(points, 1, 'orange');
        lazer.points.forEach(point => {
            this.canvas.drawCircle(point[0], point[1], 3, 'blue');
        });
    }

    drawLayout() {
        const { source, observer, points } = this.layout;

        this.background.drawShape(points);
        this.background.drawCircle(source[0], source[1], 10, 'red');
        this.background.drawCircle(observer[0], observer[1], 10, 'white', 1, 'grey');
    }

    centerAndScale(point) {
        return [
            (point[0] + this.marginX) * this.scale,
            (point[1] + this.marginY) * this.scale,
        ];
    }
}

export default new App();
