import Canvas from './Canvas';
import Layout from './Layout';
import Lazer from './Lazer';
import Vector from './Vector';
import Point from './Point';
import Debug from './Debug';
import square from './layout/square';
import layout from './layout/tokarsky';

class App {
    constructor() {
        this.layout = new Layout(layout.source, layout.observer, layout.points);
        this.lazers = [new Lazer(this.layout.source, 0)];
        this.background = new Canvas();
        this.canvas = new Canvas();
        this.frame = null;

        this.background.setDimensions(this.layout.width, this.layout.height);
        this.canvas.setDimensions(this.layout.width, this.layout.height);
        this.canvas.attach();

        this.update = this.update.bind(this);
        this.stop = this.stop.bind(this);
        this.drawLazer = this.drawLazer.bind(this);
        this.onResize = this.onResize.bind(this);

        window.addEventListener('resize', this.onResize);
        window.addEventListener('error', this.stop);
        window.addEventListener('keypress', this.update);

        this.onResize();
        this.update();
    }

    /**
     * Stop animation
     */
    stop() {
        this.frame = cancelAnimationFrame(this.frame);
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
        this.draw();
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

    /**
     * Update the simulation
     */
    update() {
        this.frame = requestAnimationFrame(this.update);

        const lazer = this.lazers[0];

        lazer.setAngle((lazer.angle + Math.PI / 1000) % (2 * Math.PI));

        this.draw();
        //this.stop();
    }

    /**
     * Draw the scene
     */
    draw() {
        this.canvas.paste(this.background.element);
        this.lazers.forEach(this.drawLazer);
    }

    /**
     * Draw a lazer
     *
     * @param {Lazer} lazer
     */
    drawLazer(lazer) {
        const point = lazer.getClosestIntersection(this.layout.walls);

        if (point) {
            this.canvas.drawLine(lazer.origin, point, 1, 'orange');
            this.canvas.drawCircle(point, 3, 'red');
        }
    }

    /**
     * Draw the layout
     */
    drawLayout() {
        const { source, observer, points } = this.layout;

        this.background.drawShape(points);
        this.background.drawCircle(source, 10, 'red');
        this.background.drawCircle(observer, 10, 'white', 1, 'grey');
    }
}

export default new App();
