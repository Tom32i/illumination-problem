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
/******/ 	return __webpack_require__(__webpack_require__.s = 3);
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

/* harmony default export */ __webpack_exports__["a"] = Canvas;


/***/ }),
/* 1 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
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

/* harmony default export */ __webpack_exports__["a"] = Layout;


/***/ }),
/* 2 */
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
/* 3 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__Canvas__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__Layout__ = __webpack_require__(1);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__Lazer__ = __webpack_require__(5);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__layout_square__ = __webpack_require__(2);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__layout_tokarsky__ = __webpack_require__(4);






class App {
    static get size() { return 1000; }

    constructor() {
        this.layout = new __WEBPACK_IMPORTED_MODULE_1__Layout__["a" /* default */](App.size, __WEBPACK_IMPORTED_MODULE_4__layout_tokarsky__["a" /* default */].source, __WEBPACK_IMPORTED_MODULE_4__layout_tokarsky__["a" /* default */].observer, __WEBPACK_IMPORTED_MODULE_4__layout_tokarsky__["a" /* default */].points);
        this.lazers = [
            new __WEBPACK_IMPORTED_MODULE_2__Lazer__["a" /* default */](this.layout.source[0], this.layout.source[1], Math.PI),
        ];
        this.background = new __WEBPACK_IMPORTED_MODULE_0__Canvas__["a" /* default */]();
        this.canvas = new __WEBPACK_IMPORTED_MODULE_0__Canvas__["a" /* default */]();

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

/* harmony default export */ __webpack_exports__["default"] = new App();


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
class Lazer {
    constructor(x, y, angle) {
        this.x = x;
        this.y = y;
        this.angle = angle;
        this.points = [
            [x, y],
            [
                x + 100 * Math.cos(this.angle),
                y + 100 * Math.sin(this.angle),
            ]
        ];
    }
}

/* harmony default export */ __webpack_exports__["a"] = Lazer;


/***/ })
/******/ ]);
//# sourceMappingURL=illumination-problem.js.map