/**
 * draw.js
 * Loads the complete draw module
 *
 * Copyright (c) 2014 Marshall Farrier
 * http://www.opensource.org/licenses/mit-license.php
 */

define([
    'usr/draw/canvas-utils',
    'usr/draw/circle',
    'usr/draw/composite',
    'usr/draw/drawable',
    'usr/draw/ellipse',
    'usr/draw/frame-set',
    'usr/draw/highlights',
    'usr/draw/image',
    'usr/draw/point',
    'usr/draw/polygon',
    'usr/draw/rectangle',
    'usr/draw/regular-polygon',
    'usr/draw/shape',
    'usr/draw/sprite',
    'usr/draw/tile-set',
    'usr/draw/time-warp',
    'usr/draw/timer',
    'usr/draw/vector'
], function(
    CanvasUtils,
    Circle,
    Composite,
    Drawable,
    Ellipse,
    FrameSet,
    Highlights,
    Image,
    Point,
    Polygon,
    Rectangle,
    RegularPolygon,
    Shape,
    Sprite,
    TileSet,
    TimeWarp,
    Timer,
    Vector
) {
    "use strict";
    var Draw = {};

    Draw.CanvasUtils = CanvasUtils;
    Draw.Circle = Circle;
    Draw.Composite = Composite;
    Draw.Drawable = Drawable;
    Draw.Ellipse = Ellipse;
    Draw.FrameSet = FrameSet;
    Draw.Highlights = Highlights;
    Draw.Image = Image;
    Draw.Point = Point;
    Draw.Polygon = Polygon;
    Draw.Rectangle = Rectangle;
    Draw.RegularPolygon = RegularPolygon;
    Draw.Shape = Shape;
    Draw.Sprite = Sprite;
    Draw.TileSet = TileSet;
    Draw.TimeWarp = TimeWarp;
    Draw.Timer = Timer;
    Draw.Vector = Vector;

    return Draw;
});
