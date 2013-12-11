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
        '../lib/jquery.min.js',
        '../lib/underscore.min.js',
        'extend',
        'utils/shuffle',
        'utils/linked-list',
        'utils/seq-exec',
        'utils/memoize'
    ];

    files.forEach(function(file, i) {
        files[i] = path + file;
    });

    define(files, function(
        $, 
        _, 
        extend, 
        shuffle, 
        linkedList, 
        seqExec,
        memoize
    ) {});

})(_c.path.usr);
