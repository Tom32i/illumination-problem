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
    }

    /**
     * Set width
     *
     * @param {Number} width
     * @param {Number} height
     */
    setDimensions(width, height, scale) {
        if (this.width === width && this.height === height && this.scale === scale) {
            return;
        }

        this.scale = scale;
        this.element.width = width;
        this.element.height = height;
        this.element.style.width = `${width}px`;
        this.element.style.height = `${height}px`;
        this.context.imageSmoothingEnabled = false;
    }

    /**
     * Attach to DOM
     */
    attach(parent = document.body) {
        parent.appendChild(this.element);
    }

    paste(image) {
        this.context.globalCompositeOperation = 'copy';
        this.context.drawImage(image, 0, 0);
        this.context.globalCompositeOperation = 'source-over';
    }

    drawCircle(center, radius = 5, color = 'red', border = 0, borderColor = 'grey') {
        const { context, scale } = this;

        context.beginPath();
        context.arc(center.x * scale, center.y * scale, radius, 0, 2 * Math.PI, false);
        context.closePath();

        if (color) {
            context.fillStyle = color;
            context.fill();
        }

        if (border && borderColor) {
            context.lineWidth = border;
            context.strokeStyle = borderColor;
            context.stroke();
        }
    }

    drawLine(from, to, width = 5, color = 'orange') {
        const { context, scale } = this;

        context.lineJoin = 'miter';
        context.lineWidth = width;
        context.strokeStyle = color;

        context.beginPath();
        context.moveTo(from.x * scale, from.y * scale);
        context.lineTo(to.x * scale, to.y * scale);
        context.stroke();
    }

    drawShape(points, width = 5, color = 'black') {
        const { context, scale } = this;
        const last = points[points.length - 1];

        context.lineJoin = 'miter';
        context.lineWidth = width;
        context.strokeStyle = color;

        context.beginPath();
        context.moveTo(last.x * scale, last.y * scale);
        points.forEach(point => context.lineTo(point.x * scale, point.y * scale));
        context.closePath();
        context.stroke();
    }
}

export default Canvas;
