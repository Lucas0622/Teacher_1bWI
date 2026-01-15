export class Homer {
    constructor() {
        this.x = 100;
    }
    move(delta) {
        this.x++;
        console.log("x:", this.x);
    }
    render(ctx) {
        console.log("rendering");
        ctx.fillRect(this.x, 50, 50, 50);
    }
}
