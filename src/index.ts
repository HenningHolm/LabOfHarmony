import * as _ from 'lodash';
import { BaseCanvas } from './BaseCanvas';
import { Position } from './Position';
import { Circle, Linear } from './Shapes';
import { DrawCircle, DrawLinear } from './EncapsulatedCommands'
import { GUI } from 'dat.gui'

class Note { }
abstract class Chord { }

var scaler = {
    points: 1.25,
    text: 1.50
};

var noteController = {
    equal: true,
    count: 12
};


function getRelativePosition(val: number, circle: Circle, scale: number = 1): Position {
    var radius: number = circle.getRadius();
    var origin: Position = circle.getOrigin();
    var x: number = Math.cos(val) * radius * scale;
    var y: number = Math.sin(val) * radius * scale;
    return new Position(origin.x + x , origin.y + y);
}

function run() {

    var base: BaseCanvas = new BaseCanvas();
    var circle: Circle = new Circle(base.getOrigin(), 100);
    var drawCircle: DrawCircle = new DrawCircle(circle);

    drawCircle.draw(base.getCanvasContext());

    var noteCount: number = 12;
// Draw small circles
    for (var i: number = 0; i < noteController.count; i++) {
        var rad: number = noteController.equal ? Math.PI*2*(i/noteController.count) : Math.PI*2*Math.pow(2, 1/noteController.count) ** i;
        var origin = getRelativePosition(rad, circle, scaler.points);
        var dc: DrawCircle = new DrawCircle(new Circle(origin, 3));
        dc.draw(base.getCanvasContext());
    }

    var notes: string[] = ["C", "C#", "D", "D#", "E", "F", "F#", "G", "G#", "A", "Bb", "H"];
    // Draw text
    if (noteController.equal && noteController.count === 12) {
        for (var i: number = 0; i < notes.length; i++) {
            var rad: number = Math.PI*2*(i/notes.length);
            var origin = getRelativePosition(rad, circle, scaler.text);
            var dc: DrawCircle = new DrawCircle(new Circle(origin, 3));
            dc.drawText(base.getCanvasContext(), origin, notes[i]);
        }
    }

    // for (var i: number = 0; i < notes.length; i++) {
    //     var rad: number = Math.PI*2*(i/noteCount);
    //     var origin = getRelativePosition(rad, circle, scaler.text);
    //     var dc: DrawCircle = new DrawCircle(new Circle(origin, 3));
    //     dc.drawText(base.getCanvasContext(), origin, notes[i]);
    // }

    // triad without base
    var triadSemitones = [0, 4, 7]
    var triadGraphicPosition: Position[] = [];
    // for (var i: number = 0; i < triadSemitones.length; i++) {
    //     var rad: number = noteController.equal ? Math.PI*2*(triadSemitones[i]/noteController.count) : -Math.PI*2*Math.pow(2, 1/noteController.count) ** triadSemitones[i];
    //     // var rad: number = Math.PI*2*(triadSemitones[i]/noteCount);
    //     triadGraphicPosition.push(getRelativePosition(rad, circle, scaler.points));
    triadSemitones.forEach((val: number) => {
        var rad: number = noteController.equal ? Math.PI*2*(val/noteController.count) : Math.PI*2*Math.pow(2, 1/noteController.count) ** val;
        triadGraphicPosition.push(getRelativePosition(rad, circle, scaler.points));
    });

    var triad: Linear = new Linear(triadGraphicPosition[0], triadGraphicPosition.slice(1));
    var triadDraw: DrawLinear = new DrawLinear(triad);

    triadDraw.draw(base.getCanvasContext());
}

const gui: GUI =  new GUI();
const scaleFolder = gui.addFolder("Scale Controller");
const noteFolder = gui.addFolder("Note Controller");

scaleFolder.add(scaler, "points", 0.01, 10.01, 0.2);
scaleFolder.add(scaler, "text", 0.01, 10.01, 0.2);
scaleFolder.open();
noteFolder.add(noteController, "count", 1, 24, 1);
noteFolder.add(noteController, "equal");
noteFolder.open();


var loop = function() {
    requestAnimationFrame(loop);
    run();
}


loop();
