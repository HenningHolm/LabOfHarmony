import { Position } from './Position';

export class BaseCanvas {
    private canvas: HTMLCanvasElement;
    private ctx: CanvasRenderingContext2D;
    private origin: Position;

    constructor() {
        this.canvas = document.getElementById('myCanvas') as HTMLCanvasElement;
        this.ctx = this.canvas.getContext("2d");
        this.ctx.canvas.width = window.innerWidth;
        this.ctx.canvas.height = window.innerHeight;
        this.origin = new Position(this.ctx.canvas.width / 2,
                        this.ctx.canvas.height / 2);
    }

    getOrigin(): Position { return this.origin; }
    getCanvasContext(): CanvasRenderingContext2D { return this.ctx; }
}
