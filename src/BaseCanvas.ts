import { Coordinate } from './Coordinate';

export class BaseCanvas {
    private canvas: HTMLCanvasElement;
    private ctx: CanvasRenderingContext2D;
    private origin: Coordinate;

    constructor(elementId: string, width: number = window.innerWidth, height: number = window.innerHeight) {
        this.canvas = document.getElementById(elementId) as HTMLCanvasElement;
        this.ctx = this.canvas.getContext("2d");
        this.ctx.canvas.width = width;
        this.ctx.canvas.height = height;
        this.origin = new Coordinate(width / 2, height / 2);
    }

    getOrigin(): Coordinate { return this.origin; }
    getCanvasContext(): CanvasRenderingContext2D { return this.ctx; }
}
