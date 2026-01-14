"use strict";
/**
 * Simple 2D Game Framework
 * Provides canvas management, game loop, and basic rendering
 */
Object.defineProperty(exports, "__esModule", { value: true });
exports.GameFramework = exports.Game = void 0;
/**
 * Game Interface
 * All concrete games must implement these methods
 */
var Game = /** @class */ (function () {
    function Game() {
    }
    return Game;
}());
exports.Game = Game;
var GameFramework = /** @class */ (function () {
    /**
     * @param {Game} game - A game instance that implements the Game interface
     * @param {number} width - Canvas width
     * @param {number} height - Canvas height
     * @param {string} canvasId - Canvas element ID
     */
    function GameFramework(game, width, height, canvasId) {
        if (width === void 0) { width = 800; }
        if (height === void 0) { height = 600; }
        if (canvasId === void 0) { canvasId = "gameCanvas"; }
        this.gameObjects = [];
        this.running = false;
        this.deltaTime = 0;
        this.lastFrameTime = 0;
        if (!(game instanceof Game)) {
            throw new Error("Game must be an instance of Game class");
        }
        this.game = game;
        this.width = width;
        this.height = height;
        // Setup canvas
        var existingCanvas = document.getElementById(canvasId);
        if (existingCanvas) {
            this.canvas = existingCanvas;
        }
        else {
            this.canvas = document.createElement("canvas");
            this.canvas.id = canvasId;
            document.body.appendChild(this.canvas);
        }
        this.canvas.width = width;
        this.canvas.height = height;
        var context = this.canvas.getContext("2d");
        if (!context) {
            throw new Error("Could not get 2D context from canvas");
        }
        this.ctx = context;
    }
    /**
     * Add a game object to the scene
     * @param {GameObject} obj - Object with x, y, width, height, and optional update/render methods
     */
    GameFramework.prototype.addObject = function (obj) {
        this.gameObjects.push(obj);
    };
    /**
     * Remove a game object from the scene
     * @param {GameObject} obj - The object to remove
     */
    GameFramework.prototype.removeObject = function (obj) {
        var index = this.gameObjects.indexOf(obj);
        if (index > -1) {
            this.gameObjects.splice(index, 1);
        }
    };
    /**
     * Update all game objects
     */
    GameFramework.prototype.updateObjects = function (deltaTime) {
        for (var _i = 0, _a = this.gameObjects; _i < _a.length; _i++) {
            var obj = _a[_i];
            if (obj.update) {
                obj.update(deltaTime);
            }
        }
    };
    /**
     * Render all game objects
     */
    GameFramework.prototype.renderObjects = function () {
        for (var _i = 0, _a = this.gameObjects; _i < _a.length; _i++) {
            var obj = _a[_i];
            if (obj.render) {
                obj.render(this.ctx);
            }
        }
    };
    /**
     * Clear canvas with background color
     */
    GameFramework.prototype.clearCanvas = function (color) {
        if (color === void 0) { color = "#ffffff"; }
        this.ctx.fillStyle = color;
        this.ctx.fillRect(0, 0, this.width, this.height);
    };
    /**
     * Main game loop
     */
    GameFramework.prototype.gameLoop = function (currentTime) {
        var _this = this;
        if (this.lastFrameTime === 0) {
            this.lastFrameTime = currentTime;
        }
        this.deltaTime = (currentTime - this.lastFrameTime) / 1000; // Convert to seconds
        this.lastFrameTime = currentTime;
        // Update game and all objects
        this.game.update(this.deltaTime);
        this.updateObjects(this.deltaTime);
        // Clear and render
        this.clearCanvas();
        this.renderObjects();
        this.game.render(this.ctx);
        // Continue loop
        if (this.running) {
            requestAnimationFrame(function (time) { return _this.gameLoop(time); });
        }
    };
    /**
     * Start the game
     */
    GameFramework.prototype.start = function () {
        var _this = this;
        if (this.running)
            return;
        this.running = true;
        this.game.init();
        requestAnimationFrame(function (time) { return _this.gameLoop(time); });
    };
    /**
     * Stop the game
     */
    GameFramework.prototype.stop = function () {
        this.running = false;
    };
    /**
     * Draw a rectangle
     */
    GameFramework.prototype.drawRect = function (x, y, width, height, color) {
        if (color === void 0) { color = "#000000"; }
        this.ctx.fillStyle = color;
        this.ctx.fillRect(x, y, width, height);
    };
    /**
     * Draw a circle
     */
    GameFramework.prototype.drawCircle = function (x, y, radius, color) {
        if (color === void 0) { color = "#000000"; }
        this.ctx.fillStyle = color;
        this.ctx.beginPath();
        this.ctx.arc(x, y, radius, 0, Math.PI * 2);
        this.ctx.fill();
    };
    /**
     * Draw text
     */
    GameFramework.prototype.drawText = function (text, x, y, color, fontSize) {
        if (color === void 0) { color = "#000000"; }
        if (fontSize === void 0) { fontSize = 16; }
        this.ctx.fillStyle = color;
        this.ctx.font = "".concat(fontSize, "px Arial");
        this.ctx.fillText(text, x, y);
    };
    return GameFramework;
}());
exports.GameFramework = GameFramework;
