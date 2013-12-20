/**
 * Paths are relative to the location from which
 * require.js is called.
 * To assemble the module, define the path variable
 * _c.path.usr in main.js
 * For example:
 * var _c = _c || {};
 * _c.path = _c.path || {};
 * _c.path.usr = '../usr/';
 */
(function(path) {
    var files = [
        'extend',
        'utils/arrays',
        'draw/canvas-utils',
        'draw/highlights',
        'draw/point',
        'draw/drawable',
        'draw/shape',
        'draw/ellipse',
        'draw/circle',
        'draw/rectangle',
        'draw/polygon',
        'draw/regular-polygon',
        'draw/image',
        'draw/tile-set',
        'draw/frame-set',
        'draw/composite',
        'draw/sprite',
        'draw/time-warp'
    ];

    files.forEach(function(file, i) {
        files[i] = path.usr + file;
    });

    define(files, function(
        extend, 
        arrayUtils,
        canvasUtils, 
        highlights, 
        Point, 
        Drawable,
        Shape, 
        Ellipse,
        Circle, 
        Rectangle, 
        Polygon,
        RegularPolygon,
        Image,
        TileSet,
        FrameSet,
        Composite,
        Sprite,
        TimeWarp
    ) {
        if (!path.images) path.images = './images/'; 
    });
})(_c.path);
