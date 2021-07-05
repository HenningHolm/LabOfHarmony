import { Shape } from "./Shapes";

export class ShapeHandler {

    private shapes: Shape[];

    constructor() {
        this.shapes = [];
    }

    render(ctx: CanvasRenderingContext2D): void {
        this.shapes.forEach((s: Shape) => { s.draw(ctx); })
    }

    add(s: Shape): void {
        if ((s ?? null) !== null) this.shapes.push(s);
        else console.log('Unable to add shape');
    }

    pop(): Shape {
        if (this.shapes.length === 0 || this.shapes === null) {
            console.log("Shapelist is empty");
            return null;
        }
        return this.shapes.pop();
    }
}
