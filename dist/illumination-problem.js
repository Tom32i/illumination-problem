/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId])
/******/ 			return installedModules[moduleId].exports;
/******/
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// identity function for calling harmony imports with the correct context
/******/ 	__webpack_require__.i = function(value) { return value; };
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, {
/******/ 				configurable: false,
/******/ 				enumerable: true,
/******/ 				get: getter
/******/ 			});
/******/ 		}
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = 8);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
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

/* harmony default export */ __webpack_exports__["a"] = Point;


/***/ }),
/* 1 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__Point__ = __webpack_require__(0);


/**
 * Vector
 */
class Vector {
    /**
     * Create Vector from an angle
     *
     * @param {Point} point
     * @param {Number} angle
     *
     * @return {Vector}
     */
    static createFromAngle(point, angle) {
        return this.createFromPoints(point, new __WEBPACK_IMPORTED_MODULE_0__Point__["a" /* default */](
            point.x + Math.cos(angle),
            point.y + Math.sin(angle)
        ));
    }

    /**
     * Create Vector from two points
     *
     * @param {Point} from
     * @param {Point} to
     *
     * @return {Vector}
     */
    static createFromPoints(from, to) {
        const slope = this.getSlope(from, to);
        const origin = this.getOrigin(from, slope);

        return new this(slope, origin, from);
    }

    /**
     * Get slope
     *
     * @param {Point} from
     * @param {Point} to
     *
     * @return {Number}
     */
    static getSlope(from, to) {
        return (to.y - from.y) / (to.x - from.x);
    }

    /**
     * Get origin
     *
     * @param {Point} point
     * @param {Number} slope
     *
     * @return {Number}
     */
    static getOrigin(point, slope) {
        return point.y - slope * point.x;
    }

    /**
     * @param {Number} slope
     * @param {Number} origin
     * @param {Point} from
     */
    constructor(slope, origin, from) {
        this.slope = slope;
        this.origin = origin;
        this.from = from;
    }

    /**
     * Get Y position for this given X
     *
     * @param {Number} x
     *
     * @return {Number}
     */
    getY(x) {
        return this.slope * x + this.origin;
    }

    /**
     * Is the vector vertical?
     *
     * @return {Boolean}
     */
    isVertical() {
        return Math.abs(this.slope) === Infinity;
    }

    roundTo(value, precision = 5) {
        const factor = Math.pow(10, precision);

        return Math.round(value * factor) / factor;
    }

    /**
     * Get intersection point with the given vector
     *
     * @param {Vector} vector
     *
     * @return {Array|null}
     */
    getIntersect(vector) {
        if (this.isVertical()) {
            if (vector.isVertical()) {
                return null;
            }

            return new __WEBPACK_IMPORTED_MODULE_0__Point__["a" /* default */](this.from.x, vector.getY(this.from.x));
        }

        const x = (vector.origin - this.origin) / (this.slope - vector.slope);
        const y = this.getY(x);

        if (this.roundTo(y) !== this.roundTo(vector.getY(x))) {
            return null; // Parallel
        }

        return new __WEBPACK_IMPORTED_MODULE_0__Point__["a" /* default */](x, y);
    }
}

/* harmony default export */ __webpack_exports__["a"] = Vector;


/***/ }),
/* 2 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
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

/* harmony default export */ __webpack_exports__["a"] = Canvas;


/***/ }),
/* 3 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
class Debug {
    constructor(element = document.createElement('p')) {
        this.element = element;

        this.attach();
    }

    /**
     * Attach to DOM
     */
    attach(parent = document.body) {
        parent.appendChild(this.element);
    }

    log(value) {
        this.element.innerText = value;
    }
}

window.debug = new Debug();

/* unused harmony default export */ var _unused_webpack_default_export = window.debug;


/***/ }),
/* 4 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__Segment__ = __webpack_require__(9);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__Point__ = __webpack_require__(0);



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

        return __WEBPACK_IMPORTED_MODULE_0__Segment__["a" /* default */].createFromPoints(points[previous], point);
    }

    /**@param {Point} source
     * @param {Point} observer
     * @param {Array} points
     */
    constructor(source, observer, points = []) {
        this.source = __WEBPACK_IMPORTED_MODULE_1__Point__["a" /* default */].createFromArray(source);
        this.observer = __WEBPACK_IMPORTED_MODULE_1__Point__["a" /* default */].createFromArray(observer);
        this.points = points.map(__WEBPACK_IMPORTED_MODULE_1__Point__["a" /* default */].createFromArray);
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

/* harmony default export */ __webpack_exports__["a"] = Layout;


/***/ }),
/* 5 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__Vector__ = __webpack_require__(1);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__Point__ = __webpack_require__(0);



/**
 * Lazer
 */
class Lazer {
    /**
     * @param {Point} origin
     * @param {Number} angle
     */
    constructor(origin, angle) {
        this.angle = angle;
        this.origin = origin;
        this.vector = __WEBPACK_IMPORTED_MODULE_0__Vector__["a" /* default */].createFromAngle(this.origin, angle);
    }

    /**
     * Set lazer angle
     *
     * @param {Angle} angle
     */
    setAngle(angle) {
        if (this.angle !== angle) {
            this.angle = angle;
            this.vector = __WEBPACK_IMPORTED_MODULE_0__Vector__["a" /* default */].createFromAngle(this.origin, angle);
        }
    }

    getXDirection() {
        return this.angle < Math.PI / 2
            || this.angle > 3 * Math.PI / 2;
    }

    getYDirection() {
        return this.angle > 0
            && this.angle < Math.PI;
    }

    contains(point) {
        const { x, y } = point;
        const { from } = this.vector;

        return (this.getXDirection() ? x >= from.x : x <= from.x)
            && (this.getYDirection() ? y >= from.y : y <= from.y);
    }

    /**
     * Get closest intersection
     *
     * @param {Array} walls
     *
     * @return {Point}
     */
    getClosestIntersection(walls, canvas) {
        return walls.reduce((intersection, segment, index) => {
            const point = segment.getIntersect(this.vector, index === 16);

            if (point) {
                if (segment.contains(point)) {
                    if (this.contains(point)) {
                        if (!intersection || this.origin.getDistance(intersection) > this.origin.getDistance(point)) {
                            return point;
                        }
                    }
                }
            }

            return intersection;
        }, null);
    }
}

/* harmony default export */ __webpack_exports__["a"] = Lazer;


/***/ }),
/* 6 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* unused harmony default export */ var _unused_webpack_default_export = {
    source: [1, 1],
    observer: [1, 2],
    points: [
        [0, 0],
        [0, 3],
        [2, 3],
        [2, 0],
    ]
};


/***/ }),
/* 7 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony default export */ __webpack_exports__["a"] = {
    source: [2, 2],
    observer: [6, 2],
    points: [
        [1, 0],
        [2, 0],
        [2, 1],
        [3, 1],
        [3, 2],
        [5, 2],
        [5, 1],
        [6, 1],
        [6, 0],
        [7, 1],
        [8, 1],
        [8, 2],
        [7, 2],
        [7, 3],
        [6, 4],
        [6, 3],
        [5, 3],
        [4, 4],
        [4, 3],
        [3, 3],
        [2, 4],
        [2, 3],
        [1, 3],
        [1, 2],
        [0, 2],
        [1, 1],
    ],
};


/***/ }),
/* 8 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__Canvas__ = __webpack_require__(2);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__Layout__ = __webpack_require__(4);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__Lazer__ = __webpack_require__(5);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__Vector__ = __webpack_require__(1);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__Point__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__Debug__ = __webpack_require__(3);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6__layout_square__ = __webpack_require__(6);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_7__layout_tokarsky__ = __webpack_require__(7);









class App {
    constructor() {
        this.layout = new __WEBPACK_IMPORTED_MODULE_1__Layout__["a" /* default */](__WEBPACK_IMPORTED_MODULE_7__layout_tokarsky__["a" /* default */].source, __WEBPACK_IMPORTED_MODULE_7__layout_tokarsky__["a" /* default */].observer, __WEBPACK_IMPORTED_MODULE_7__layout_tokarsky__["a" /* default */].points);
        this.lazers = [new __WEBPACK_IMPORTED_MODULE_2__Lazer__["a" /* default */](this.layout.source, 0)];
        this.background = new __WEBPACK_IMPORTED_MODULE_0__Canvas__["a" /* default */]();
        this.canvas = new __WEBPACK_IMPORTED_MODULE_0__Canvas__["a" /* default */]();
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

/* harmony default export */ __webpack_exports__["default"] = new App();


/***/ }),
/* 9 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__Vector__ = __webpack_require__(1);


/**
 * Segment
 */
class Segment extends __WEBPACK_IMPORTED_MODULE_0__Vector__["a" /* default */] {
    /**
     * Create Segment from two points
     *
     * @param {Point} from
     * @param {Point} to
     *
     * @return {Vector}
     */
    static createFromPoints(from, to) {
        const slope = this.getSlope(from, to);
        const origin = this.getOrigin(from, slope);

        return new this(slope, origin, from, to);
    }

    /**
     * @param {Point} point
     * @param {Number} slope
     * @param {Number} origin
     */
    constructor(slope, origin, from, to) {
        super(slope, origin, from);

        this.to = to;
    }

    contains(point) {
        const { x, y } = point;

        if (this.isVertical()) {
            return this.roundTo(x) === this.roundTo(this.from.x)
                && y >= Math.min(this.from.y, this.to.y)
                && y <= Math.max(this.from.y, this.to.y);
        }

        return x >= Math.min(this.from.x, this.to.x)
            && x <= Math.max(this.from.x, this.to.x)
            && y >= Math.min(this.from.y, this.to.y)
            && y <= Math.max(this.from.y, this.to.y);
    }
}

/* harmony default export */ __webpack_exports__["a"] = Segment;


/***/ })
/******/ ]);
//# sourceMappingURL=illumination-problem.js.map