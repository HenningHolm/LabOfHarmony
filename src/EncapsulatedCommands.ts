import { Position } from './Position';
import { Circle, Linear } from './Shapes';

interface Drawable {
    draw(ctx: CanvasRenderingContext2D): void;
    drawText(ctx: CanvasRenderingContext2D, pos: Position, text: string): void;
}

export class DrawCircle implements Drawable {
    private circle: Circle;

    constructor(circle: Circle) {
      this.circle = circle;
    }

    draw(ctx: CanvasRenderingContext2D): void {
        var origin: Position = this.circle.getOrigin();
        var radius: number = this. circle.getRadius();
        ctx.beginPath();
        ctx.arc(origin.x, origin.y, radius, 0, 2 * Math.PI);
        ctx.stroke();
    }

    drawText(ctx: CanvasRenderingContext2D, pos: Position, text: string): void {
        ctx.fillText(text, pos.x, pos.y);
    }
}

export class DrawLinear implements Drawable {
    private shape: Linear;

    constructor(shape: Linear) {
        this.shape = shape;
    }

    draw(ctx: CanvasRenderingContext2D): void {
        var origin: Position = this.shape.getOrigin();
        var path: Position[] = this.shape.getPath();
        ctx.beginPath();
        ctx.moveTo(origin.x, origin.y);
        path.forEach((p: Position) => { ctx.lineTo(p.x, p.y) ; });
        ctx.lineTo(origin.x, origin.y);
        ctx.stroke();
    }

    drawText(ctx: CanvasRenderingContext2D, pos: Position, text: string): void { }
}
