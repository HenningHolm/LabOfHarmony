import { Position } from './Position';

abstract class Shape {
    private origin: Position;
    constructor(origin: Position) {
        this.origin = origin;
    }
    getOrigin(): Position { return this.origin; }
}

export class Linear extends Shape {
    private path: Position[];
    constructor(origin: Position, path: Position[]) {
        super(origin);
        this.path = path;
    }
    getPath(): Position[] { return this.path; }
}

export class Circle extends Shape {
    private radius: number;
    constructor(origin: Position, radius: number) {
        super(origin);
        this.radius = radius;
    }
    getRadius(): number { return this.radius; }
}
