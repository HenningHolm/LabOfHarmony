import { Coordinate } from './Coordinate';

export abstract class Shape implements Drawable {

    public center: Coordinate;

    constructor(center?: Coordinate) { this.center = center || null ; }

    getCenter(): Coordinate { return this.center; }
    abstract draw(ctx: CanvasRenderingContext2D): void;
}

interface Drawable {
    draw(ctx: CanvasRenderingContext2D): void;
}

export class Circle extends Shape implements Drawable {
    private radius: number;

    constructor(center: Coordinate, radius: number) {
        super(center);
        this.radius = radius;
    }

    getRadius(): number { return this.radius; }

    draw(ctx: CanvasRenderingContext2D): void {
        var radius: number = this.radius;
        ctx.beginPath();
        ctx.arc(this.center.x, this.center.y, radius, 0, 2 * Math.PI);
        ctx.stroke();
    }

}

export class Polygon extends Shape {
    private vertices: Coordinate[];

    constructor(vertices: Coordinate[], center?: Coordinate) {
        super(center);
        this.vertices = vertices;
    }

    getVertices(): Coordinate[] { return this.vertices; }

    draw(ctx: CanvasRenderingContext2D): void {
        var start = this.vertices[0];
        var path = this.vertices.slice(1);
        ctx.beginPath();
        ctx.moveTo(start.x, start.y);
        path.forEach((p: Coordinate) => { ctx.lineTo(p.x, p.y) ; });
        ctx.lineTo(start.x, start.y);
        ctx.stroke();
    }
}

export class Text extends Shape {
    private text: string;

    constructor(center: Coordinate, text: string) {
        super(center);
        this.text = text;
    }

    draw(ctx: CanvasRenderingContext2D) {
        ctx.fillText(this.text, this.center.x, this.center.y);
    }
}

function Shapetest(center?: Coordinate) {
    this.center = center;
}

// Shapetest.prototype.draw = function(): void;

function Circletest(...args, radius: number) {
    Shapetest.apply(this, args);
    this.radius = radius;
}
