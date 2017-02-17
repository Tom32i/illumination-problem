import Canvas from './Canvas';
import World from './World';
import Layout from './Layout';
import Debug from './Debug';
import tokarsky from './layout/tokarsky';

Math.twoPI = Math.PI * 2;

class App {
    constructor() {
        this.layout = new Layout(tokarsky.source, tokarsky.observer, tokarsky.points);
        this.world = new World(this.layout);
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

        const number = 1;

        for (let angle = 0; angle < number; angle++) {
            this.world.addLazer(Math.PI / 11 + angle * Math.twoPI / number);
        }
        //this.world.addLazer(Math.PI / 12);

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

        //lazer.setAngle((lazer.angle + Math.PI / 1000) % (2 * Math.PI));
        this.world.update();
        this.draw();
    }

    /**
     * Draw the scene
     */
    draw() {
        this.canvas.paste(this.background.element);
        this.world.lazers.forEach(this.drawLazer);
    }

    /**
     * Draw a lazer
     *
     * @param {Lazer} lazer
     */
    drawLazer(lazer) {
        if (!lazer.end) {
            console.log(lazer);
            throw new Error();
        }

        console.log('drawLazer', lazer);

        this.canvas.drawLine(lazer.origin, lazer.end, 1, 'orange');
        this.canvas.drawCircle(lazer.end, 3, 'red');

        if (lazer.reflexion) {
            this.drawLazer(lazer.reflexion);
        }

        if (lazer.depth === 2) {
            this.stop();
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
