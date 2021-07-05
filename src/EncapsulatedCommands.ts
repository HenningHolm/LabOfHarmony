import { Coordinate } from './Coordinate';
import { Circle, Polygon } from './Shapes';

interface Drawable {
    draw(ctx: CanvasRenderingContext2D): void;
    drawText(ctx: CanvasRenderingContext2D, pos: Coordinate, text: string): void;
}

export class DrawCircle implements Drawable {
    private circle: Circle;

    constructor(circle: Circle) {
      this.circle = circle;
    }

    draw(ctx: CanvasRenderingContext2D): void {
        var center: Coordinate = this.circle.getCenter();
        var radius: number = this. circle.getRadius();
        ctx.beginPath();
        ctx.arc(center.x, center.y, radius, 0, 2 * Math.PI);
        ctx.stroke();
    }

    drawText(ctx: CanvasRenderingContext2D, pos: Coordinate, text: string): void {
        ctx.fillText(text, pos.x, pos.y);
    }
}

export class DrawLinear implements Drawable {
    private shape: Polygon;

    constructor(shape: Polygon) {
        this.shape = shape;
    }

    draw(ctx: CanvasRenderingContext2D): void {
        var center: Coordinate = this.shape.getCenter();
        var vertices: Coordinate[] = this.shape.getVertices();
        ctx.beginPath();
        ctx.moveTo(center.x, center.y);
        vertices.forEach((p: Coordinate) => { ctx.lineTo(p.x, p.y) ; });
        ctx.lineTo(center.x, center.y);
        ctx.stroke();
    }

    drawText(ctx: CanvasRenderingContext2D, pos: Coordinate, text: string): void { }
}
