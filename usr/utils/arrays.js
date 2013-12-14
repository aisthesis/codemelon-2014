/**
 * Copyright (c) 2013 Marshall Farrier
 * http://www.opensource.org/licenses/mit-license.php
 *
 * Utility functions for working with arrays.
 */
 
var _c = _c || {};

(function(_c) {
    'use strict';
    _c.utils = _c.utils || {};

    /**
     * Returns an array of the given size filled with
     * the given value.
     * @param {number} length - length of the resulting array
     * @param value - value to which each entry of the result
     * array is to be set
     * @returns {array}
     */
    _c.utils.fill = function(length, value) {
        var array = [],
            i = 0;

        while (i < length) {
            array[i++] = value;
        }
        return array;
    };
})(_c);
