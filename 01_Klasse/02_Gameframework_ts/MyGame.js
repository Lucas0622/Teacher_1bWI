"use strict";
var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (Object.prototype.hasOwnProperty.call(b, p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        if (typeof b !== "function" && b !== null)
            throw new TypeError("Class extends value " + String(b) + " is not a constructor or null");
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
Object.defineProperty(exports, "__esModule", { value: true });
// MyGame - Example implementation of Game interface
var GameFramework_js_1 = require("./GameFramework.js");
var MyGame = /** @class */ (function (_super) {
    __extends(MyGame, _super);
    function MyGame() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.rect1 = {
            x: 50,
            y: 250,
            width: 60,
            height: 40,
            vx: 200, // pixels per second
        };
        _this.rectangle = {
            x: 50,
            y: 250,
            width: 60,
            height: 40,
            vx: 200, // pixels per second
        };
        return _this;
    }
    MyGame.prototype.init = function () {
        console.log("Game started!");
    };
    MyGame.prototype.update = function (deltaTime) {
        console.log("update:", deltaTime);
        this.rectangle.x += this.rectangle.vx * deltaTime;
        if (this.rectangle.x > 800) {
            this.rectangle.x = -this.rectangle.width;
        }
        this.rectangle.width++;
    };
    MyGame.prototype.render = function (ctx) {
        // Draw rectangle
        ctx.fillStyle = "#FF66aa";
        ctx.fillRect(this.rectangle.x, this.rectangle.y, this.rectangle.width, this.rectangle.height);
    };
    return MyGame;
}(GameFramework_js_1.Game));
var game = new MyGame();
var framework = new GameFramework_js_1.GameFramework(game, 800, 600);
framework.start();
