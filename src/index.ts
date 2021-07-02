import * as _ from 'lodash';
import { BaseCanvas } from './BaseCanvas';
import { Position } from './Position';
import { Circle, Linear } from './Shapes';
import { DrawCircle, DrawLinear } from './EncapsulatedCommands'

class Note { }
abstract class Chord { }

function getRelativePosition(val: number, circle: Circle, mul: number = 1): Position {
    var radius: number = circle.getRadius();
    var origin: Position = circle.getOrigin();
    var x: number = Math.cos(val) * radius * mul;
    var y: number = Math.sin(val) * radius * mul;
    return new Position(origin.x + x , origin.y + y);
}

var base: BaseCanvas = new BaseCanvas();

var circle: Circle = new Circle(base.getOrigin(), 100);
var drawCircle: DrawCircle = new DrawCircle(circle);

drawCircle.draw(base.getCanvasContext());

var noteCount: number = 12;
var mulPoints: number = 1.25;

// Draw small circles
for (var i: number = 0; i < noteCount; i++) {
    var rad: number = Math.PI*2*(i/noteCount);
    var origin = getRelativePosition(rad, circle, mulPoints);
    var dc: DrawCircle = new DrawCircle(new Circle(origin, 3));
    dc.draw(base.getCanvasContext());
}

var notes: string[] = ["C", "C#", "D", "D#", "E", "F", "F#", "G", "G#", "A", "Bb", "H"];
var mulText: number = 1.50;
// Draw text
for (var i: number = 0; i < notes.length; i++) {
    var rad: number = Math.PI*2*(i/noteCount);
    var origin = getRelativePosition(rad, circle, mulText);
    var dc: DrawCircle = new DrawCircle(new Circle(origin, 3));
    dc.drawText(base.getCanvasContext(), origin, notes[i]);
}

for (var i: number = 0; i < notes.length; i++) {
    var rad: number = Math.PI*2*(i/noteCount);
    var origin = getRelativePosition(rad, circle, mulText);
    var dc: DrawCircle = new DrawCircle(new Circle(origin, 3));
    dc.drawText(base.getCanvasContext(), origin, notes[i]);
}

// triad without base
var triadSemitones = [0, 4, 7]
var triadGraphicPosition: Position[] = [];

for (var i: number = 0; i < triadSemitones.length; i++) {
    var rad: number = Math.PI*2*(triadSemitones[i]/noteCount);
    triadGraphicPosition.push(getRelativePosition(rad, circle, mulPoints))
}

var triad: Linear = new Linear(triadGraphicPosition[0], triadGraphicPosition.slice(1));
var triadDraw: DrawLinear = new DrawLinear(triad);

triadDraw.draw(base.getCanvasContext());
