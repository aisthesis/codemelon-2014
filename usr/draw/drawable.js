/**
 * Generic drawable specification
 *
 * Copyright (c) 2013 Marshall Farrier
 * http://www.opensource.org/licenses/mit-license.php
 *
 * Dependencies:
 * extend.js
 */

/** @namespace */
var _c = _c || {};

(function(_c) {
    "use strict";

    /** @namespace */
    _c.draw = _c.draw || {};

    /**
     * Generic drawable object
     * @constructor 
     * @member {function} draw
     * @member {function} contains
     */
    _c.draw.Drawable = _c.Base.extend({

        /**
         * @constructs _c.draw.Drawable
         * @abstract
         */
        init: function(params) {
            throw new Error('must be implemented by subclass!'); 
        },

        /**
         * Draw the drawable into a context
         * @abstract
         * @param {object} context
         */
        draw: function(context) {
            throw new Error('must be implemented by subclass!'); 
        },

        /**
         * Determine whether the shape contains a given point
         * @abstract
         * @param {_c.draw.Point} point
         * @return {boolean}
         */
        contains: function(point) {
            throw new Error('must be implemented by subclass!'); 
        }
    });
})(_c);
