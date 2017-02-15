import Canvas from './Canvas';
import Layout from './Layout';
import Lazer from './Lazer';
import square from './layout/square';
import layout from './layout/tokarsky';

class App {
    static get size() { return 1000; }

    constructor() {
        this.layout = new Layout(App.size, layout.source, layout.observer, layout.points);
        this.lazers = [
            new Lazer(this.layout.source[0], this.layout.source[1], Math.PI),
        ];
        this.background = new Canvas();
        this.canvas = new Canvas();

        this.background.setDimensions(App.size, App.size);
        this.canvas.setDimensions(App.size, App.size);
        this.canvas.attach();

        this.drawLazer = this.drawLazer.bind(this);

        this.drawLayout();
        this.draw();
    }

    draw() {
        this.canvas.paste(this.background.element);
        this.lazers.forEach(this.drawLazer);
    }

    drawLazer(lazer) {
        const { points } = lazer;
        this.canvas.drawLine(points, 5, 'orange');
    }

    drawLayout() {
        const { source, observer, points } = this.layout;

        this.background.drawShape(points);
        this.background.drawCircle(source[0], source[1], 5, 'red');
        this.background.drawCircle(observer[0], observer[1], 5, 'white', 1, 'grey');
    }
}

export default new App();
