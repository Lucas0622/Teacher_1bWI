// MyGame - Example implementation of Game interface
import { Game, GameFramework } from "./GameFramework.js";

interface Rectangle {
  x: number;
  y: number;
  width: number;
  height: number;
  vx: number; // pixels per second
}

class MyGame extends Game {
  private rect1: Rectangle = {
    x: 50,
    y: 250,
    width: 60,
    height: 40,
    vx: 200, // pixels per second
  };

  private rectangle: Rectangle = {
    x: 50,
    y: 250,
    width: 60,
    height: 40,
    vx: 200, // pixels per second
  };

  init(): void {
    console.log("Game started!");
  }

  update(deltaTime: number): void {
    console.log("update:", deltaTime);

    this.rectangle.x += this.rectangle.vx * deltaTime;
    if (this.rectangle.x > 800) {
      this.rectangle.x = -this.rectangle.width;
    }
    this.rectangle.width++;
  }

  render(ctx: CanvasRenderingContext2D): void {
    // Draw rectangle
    ctx.fillStyle = "#FF66aa";

    ctx.fillRect(
      this.rectangle.x,
      this.rectangle.y,
      this.rectangle.width,
      this.rectangle.height
    );
  }
}

const game = new MyGame();
const framework = new GameFramework(game, 800, 600);
framework.start();
