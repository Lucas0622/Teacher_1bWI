import { Actor } from "./Actor";

export class Homer implements Actor {
  private x: number = 100;

  move(delta: number): void {
    this.x++;
    console.log("x:", this.x);
  }
  render(ctx: CanvasRenderingContext2D): void {
    console.log("rendering");
    ctx.fillRect(this.x, 50, 50, 50);
  }
}
