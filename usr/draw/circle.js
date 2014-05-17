/**
 * Copyright (c) 2013 Marshall Farrier
 * http://www.opensource.org/licenses/mit-license.php
 *
 * Dependencies:
 * extend.js
 * shape.js
 * point.js
 */

define([
    'usr/extend',
    'usr/draw/shape',
    'usr/draw/point'
], function(
    Extend,
    Shape,
    Point) {
    "use strict";

    /**
     * Creates a new _c.draw.Circle
     * @constructor 
     * @member {_c.draw.Point} center
     * @member {number} radius
     *
     * Inherited from _c.draw.Shape:
     * @member {object} styles - styles to be applied to context
     * before shape is drawn
     * @member {number} [styles.lineWidth]
     * @member {string} [styles.fillStyle]
     * @member {string} [styles.strokeStyle]
     * @member {string} [styles.shadowColor]
     * @member {number} [styles.shadowOffsetX]
     * @member {number} [styles.shadowOffsetY]
     * @member {number} [styles.shadowBlur]
     * @member {function} render
     * @member {function} clip
     * @member {function} fill
     * @member {function} stroke
     * @member {function} drawClipped
     * @member {function} prep
     * @member {function} buildPath
     *
     * Inherited from _c.draw.Drawable:
     * @member {function} draw
     * @member {function} contains
     */
    var Circle = Shape.extend({

        /**
         * @constructs _c.draw.Circle
         * @param {object} params
         * @param {_c.draw.Point} params.center - center of the circle
         * @param {number} params.radius - radius of the circle
         * @param {object} [params.styles] - any styles to be applied
         * when the shape is drawn. If styles are not provided,
         * the shape will be drawn using the context's current
         * styles.
         */
        init: function(params) {
            this._super(params);
            // required
            this.center = params.center;
            this.radius = params.radius;
        },

        buildPath: function(context) {
            context.beginPath();
            context.arc(this.center.x, this.center.y, this.radius, 
                0, Math.PI * 2, false);
        },

        contains: function(point) {
            return this.center.distanceTo(point) <= this.radius;
        }
    });

    return Circle;
});
