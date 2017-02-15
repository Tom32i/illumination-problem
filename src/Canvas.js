/**
 * Canvas
 */
class Canvas {
    /**
     * Constructor
     *
     * @param {Element} element
     */
    constructor(element = document.createElement('canvas')) {
        this.element = element;
        this.context = this.element.getContext('2d');
        this.scale = 1;

        this.onResize = this.onResize.bind(this);

        window.addEventListener('resize', this.onResize);
    }

    /**
     * Set width
     *
     * @param {Number} width
     * @param {Number} height
     */
    setDimensions(width, height) {
        if (this.element.width === width && this.element.height === height) {
            return;
        }

        this.element.width = width;
        this.element.height = height;
        this.context.imageSmoothingEnabled = false;
        this.onResize();
    }

    paste(image) {
        this.context.globalCompositeOperation = 'copy';
        this.context.drawImage(image, 0, 0);
        this.context.globalCompositeOperation = 'source-over';
    }

    /**
     * Attach to DOM
     */
    attach(parent = document.body) {
        parent.appendChild(this.element);
    }

    /**
     * On resize
     */
    onResize() {
        this.scale = this.getScale();

        const width = Math.round(this.element.width * this.scale);
        const height = Math.round(this.element.height * this.scale);

        this.element.style.width = `${width}px`;
        this.element.style.height = `${height}px`;
    }

    /**
     * Get current scale
     *
     * @return {Number}
     */
    getScale(precision = 5) {
        const { width, height } = this.element;
        const { innerWidth, innerHeight } = window;
        const scale = Math.min(innerWidth, innerHeight) / Math.max(width, height);

        return Math.floor(scale * precision) / precision;
    }

    drawCircle(x, y, radius = 5, color = 'red', border = 0, borderColor = 'grey') {
        const { context, scale } = this;

        console.log(arguments);

        context.beginPath();
        context.arc(x, y, radius / scale, 0, 2 * Math.PI, false);
        context.closePath();

        if (color) {
            context.fillStyle = color;
            context.fill();
        }

        if (border && borderColor) {
            context.lineWidth = border / scale;
            context.strokeStyle = borderColor;
            context.stroke();
        }
    }

    drawLine(points, width = 5, color = 'orange') {
        const { context, scale } = this;
        const last = points[points.length - 1];

        context.lineJoin = 'miter';
        context.lineWidth = width / scale;
        context.strokeStyle = color;

        context.beginPath();
        context.moveTo(last[0], last[1]);
        points.forEach(point => context.lineTo(point[0], point[1]));
        context.stroke();
    }

    drawShape(points, width = 5, color = 'black') {
        const { context, scale } = this;
        const last = points[points.length - 1];

        context.lineJoin = 'miter';
        context.lineWidth = width / scale;
        context.strokeStyle = color;

        context.beginPath();
        context.moveTo(last[0], last[1]);
        points.forEach(point => context.lineTo(point[0], point[1]));
        context.closePath();
        context.stroke();
    }
}

export default Canvas;
