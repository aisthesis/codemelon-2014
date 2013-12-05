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
        'draw/canvas-utils',
        'draw/highlights',
        'draw/point',
        'draw/shape',
        'draw/circle',
        'draw/rectangle',
        'draw/regular-polygon'
    ];

    files.forEach(function(file, i) {
        files[i] = path + file;
    });
    define(['require'].concat(files),
        function(require) {
            files.forEach(function(file) {
                require(file);
            });
        });
})(_c.path.usr);
