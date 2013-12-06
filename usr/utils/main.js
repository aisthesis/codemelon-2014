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
        'utils/shuffle',
        'utils/linked-list'
    ];

    files.forEach(function(file, i) {
        files[i] = path + file;
    });
    define(files, function(extend, shuffle, linkedList) {});
})(_c.path.usr);
