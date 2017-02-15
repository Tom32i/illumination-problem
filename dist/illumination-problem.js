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
/******/ 	return __webpack_require__(__webpack_require__.s = 5);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
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

    drawCircle(x, y, radius = 5, color = 'red', border = 0, borderColor = 'grey') {
        const { context, scale } = this;

        context.beginPath();
        context.arc(x * scale, y * scale, radius, 0, 2 * Math.PI, false);
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

    drawLine(points, width = 5, color = 'orange') {
        const { context, scale } = this;
        const last = points[points.length - 1];

        context.lineJoin = 'miter';
        context.lineWidth = width;
        context.strokeStyle = color;

        context.beginPath();
        context.moveTo(last[0] * scale, last[1] * scale);
        points.forEach(point => context.lineTo(point[0] * scale, point[1] * scale));
        context.stroke();
    }

    drawShape(points, width = 5, color = 'black') {
        const { context, scale } = this;
        const last = points[points.length - 1];

        context.lineJoin = 'miter';
        context.lineWidth = width;
        context.strokeStyle = color;

        context.beginPath();
        context.moveTo(last[0] * scale, last[1] * scale);
        points.forEach(point => context.lineTo(point[0] * scale, point[1] * scale));
        context.closePath();
        context.stroke();
    }
}

/* harmony default export */ __webpack_exports__["a"] = Canvas;


/***/ }),
/* 1 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
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

/* harmony default export */ __webpack_exports__["a"] = Layout;


/***/ }),
/* 2 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
class Lazer {
    constructor(x, y, angle) {
        this.x = x;
        this.y = y;
        this.angle = angle;
        this.coeffDir = this.getCoeffDir(x, y, angle);
        this.ordOrigin = this.getOrdOrigin(x, y, this.coeffDir);
        this.points = [[x, y]];

        for (let i = 1; i < 2; i++) {
            const px = x + i * 1;
            this.points.push([px, this.getY(px)]);
        }
    }

    getCoeffDir(x, y, angle, dist = 100) {
        const xb = x + dist * Math.cos(angle);
        const yb = y + dist * Math.sin(angle);

        return (yb - y) / (xb - x);
    }

    getOrdOrigin(x, y, m) {
        return y - m * x;
    }

    getY(x) {
        return this.coeffDir * x + this.ordOrigin;
    }
}

/* harmony default export */ __webpack_exports__["a"] = Lazer;


/***/ }),
/* 3 */
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
/* 4 */
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
/* 5 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__Canvas__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__Layout__ = __webpack_require__(1);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__Lazer__ = __webpack_require__(2);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__layout_square__ = __webpack_require__(3);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__layout_tokarsky__ = __webpack_require__(4);






class App {
    constructor() {
        this.layout = new __WEBPACK_IMPORTED_MODULE_1__Layout__["a" /* default */](__WEBPACK_IMPORTED_MODULE_4__layout_tokarsky__["a" /* default */].source, __WEBPACK_IMPORTED_MODULE_4__layout_tokarsky__["a" /* default */].observer, __WEBPACK_IMPORTED_MODULE_4__layout_tokarsky__["a" /* default */].points);
        this.lazers = [new __WEBPACK_IMPORTED_MODULE_2__Lazer__["a" /* default */](this.layout.source[0], this.layout.source[1], Math.PI/5)];
        this.background = new __WEBPACK_IMPORTED_MODULE_0__Canvas__["a" /* default */]();
        this.canvas = new __WEBPACK_IMPORTED_MODULE_0__Canvas__["a" /* default */]();

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

/* harmony default export */ __webpack_exports__["default"] = new App();


/***/ })
/******/ ]);
//# sourceMappingURL=illumination-problem.js.map