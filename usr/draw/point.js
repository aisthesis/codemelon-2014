/**
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
     * Creates a new _c.draw.Point
     * @constructor 
     * @member {number} x - x coordinate
     * @member {number} y - y coordinate
     */
    var Point = Extend.Base.extend({

        /**
         * @constructs _c.draw.Point
         * @param {number} x - x coordinate 
         * @param {number} y - y coordinate
         */
        init: function(x, y) {
            this.x = x;
            this.y = y;
        },

        distanceTo: function(point) {
            var diffX = this.x - point.x,
                diffY = this.y - point.y;

            return Math.sqrt(diffX * diffX + diffY * diffY);
        },

        /**
         * Doesn't modify the caller but returns the new point
         * determined by the given offset vector.
         * If the optional point parameter is provided, it
         * is modified to be the result of the operation and
         * then returned. Using this parameter improves performance
         * because no new object needs to be created.
         * @param {Vector} vector - vector representing the desired offset
         * @param {Point} [point] - point in which to store the result 
         * @returns {Point}
         */
        offset: function(vector, point) {
            if (point) {
                point.x = this.x + vector.x;
                point.y = this.y + vector.y;
                return point;
            }
            return new _c.draw.Point(this.x + vector.x, this.y + vector.y);
        },

        /**
         * Modifies the caller by the given offset vector
         * @param {Vector} vector - vector representing the desired offset
         */
        move: function(vector) {
            this.x += vector.x;
            this.y += vector.y;
        }
    });

    return Point;
});
