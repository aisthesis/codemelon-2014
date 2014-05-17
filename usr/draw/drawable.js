/**
 * Generic drawable specification
 *
 * Copyright (c) 2013 Marshall Farrier
 * http://www.opensource.org/licenses/mit-license.php
 *
 * Dependencies:
 * extend.js
 */

define([
    'usr/extend'
], function(Extend) {
    "use strict";

    /**
     * Generic drawable object
     * @constructor 
     * @member {function} draw
     * @member {function} contains
     */
    var Drawable = Extend.Base.extend({

        /**
         * @constructs _c.draw.Drawable
         * @abstract
         */
        init: function(params) {
            throw new Error('ctor must be implemented by subclass!'); 
        },

        /**
         * Draw the drawable into a context
         * @abstract
         * @param {object} context
         */
        draw: function(context) {
            throw new Error('Drawable#draw(context) must be implemented by subclass!'); 
        },

        /**
         * Determine whether the shape contains a given point
         * @abstract
         * @param {_c.draw.Point} point
         * @return {boolean}
         */
        contains: function(point) {
            throw new Error('Drawable#contains(point) must be implemented by subclass!'); 
        }
    });

    return Drawable;
});
