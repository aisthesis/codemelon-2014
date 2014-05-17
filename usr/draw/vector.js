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
     * Creates a new _c.draw.Vector
     * @constructor 
     * @member {number} x - x coordinate
     * @member {number} y - y coordinate
     */
    var Vector = Extend.Base.extend({
        /**
         * @constructs _c.draw.Vector
         * @param {number} x - x coordinate 
         * @param {number} y - y coordinate
         */
        init: function(x, y) {
            this.x = x;
            this.y = y;
        },

        /** @param {Vector} */
        plus: function(vector) {
            return new Vector(this.x + vector.x, this.y + vector.y);
        },

        /** @param {Vector} */
        minus: function(vector) {
            return new Vector(this.x - vector.x, this.y - vector.y);
        }
    });

    return Vector;
});
