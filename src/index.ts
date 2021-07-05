import * as _ from 'lodash';
import { GUI } from 'dat.gui'

import { BaseCanvas } from './BaseCanvas';
import { Coordinate } from './Coordinate';
import { Circle, Polygon, Text, Shape } from './Shapes';
import { DrawCircle, DrawLinear } from './EncapsulatedCommands'
import { ShapeHandler } from './ShapeHandler'


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

function init(elementId: string): BaseCanvas {
    var base: BaseCanvas = new BaseCanvas(elementId);
    var shapeHandler: ShapeHandler = new ShapeHandler();
    return base;
}

function getRelativePosition(val: number, circle: Circle, scale: number = 1): Coordinate {
    var radius: number = circle.getRadius();
    var center: Coordinate = circle.getCenter();
    var x: number = Math.cos(val) * radius * scale;
    var y: number = Math.sin(val) * radius * scale;
    return new Coordinate(center.x + x , center.y + y);
}

function run() {
    var base: BaseCanvas = new BaseCanvas('myCanvas');
    var circle: Circle = new Circle(base.getOrigin(), 100);
    var shapeHandler: ShapeHandler = new ShapeHandler();
    shapeHandler.add(circle);


    for (var i: number = 0; i < noteController.count; i++) {
        var rad: number = noteController.equal ? Math.PI*2*(i/noteController.count) : Math.PI*2*Math.pow(2, 1/noteController.count) ** i;
        var center = getRelativePosition(rad, circle, scaler.points);
        shapeHandler.add(new Circle(center, 3));
    }

    var notes: string[] = ["C", "C#", "D", "D#", "E", "F", "F#", "G", "G#", "A", "Bb", "H"];

    // Draw text
    if (noteController.equal && noteController.count === 12) {
        for (var i: number = 0; i < notes.length; i++) {
            var rad: number = Math.PI*2*(i/notes.length);
            var center = getRelativePosition(rad, circle, scaler.text);
            shapeHandler.add(new Text(center, notes[i]));
    }

    var triadSemitones = [0, 4, 7]
    var triadGraphicPosition: Coordinate[] = [];
    triadSemitones.forEach((val: number) => {
        var rad: number = noteController.equal ? Math.PI*2*(val/noteController.count) : Math.PI*2*Math.pow(2, 1/noteController.count) ** val;
        triadGraphicPosition.push(getRelativePosition(rad, circle, scaler.points));
    });

    var triangle: Polygon = new Polygon(triadGraphicPosition);
    shapeHandler.add(triangle);
    shapeHandler.render(base.getCanvasContext());
    }
}

function run_depr() {
    var base: BaseCanvas = new BaseCanvas('myCanvas');
    var circle: Circle = new Circle(base.getOrigin(), 100);
    circle.draw(base.getCanvasContext());

    // var drawCircle: DrawCircle = new DrawCircle(circle);

    // drawCircle.draw(base.getCanvasContext());

    var noteCount: number = 12;
    // Draw small circles
    //
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

    var triadSemitones = [0, 4, 7]
    var triadGraphicPosition: Coordinate[] = [];

    triadSemitones.forEach((val: number) => {
        var rad: number = noteController.equal ? Math.PI*2*(val/noteController.count) : Math.PI*2*Math.pow(2, 1/noteController.count) ** val;
        triadGraphicPosition.push(getRelativePosition(rad, circle, scaler.points));
    });

    // var triad: Polygon = new Polygon(triadSemitones);
    // var triadDraw: DrawLinear = new DrawLinear(triad);

    // triadDraw.draw(base.getCanvasContext());
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
