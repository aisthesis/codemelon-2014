/**
 * Copyright (c) 2013 Marshall Farrier
 * http://www.opensource.org/licenses/mit-license.php
 *
 * Polygon defined by an array of vertices, which are
 * connected sequentially.
 *
 * Dependencies:
 * extend.js
 * shape.js
 * point.js
 */

define([
    'usr/extend',
    'usr/draw/shape'
], function(
    Extend,
    Shape) {
    "use strict";

    /**
     * Creates a new _c.draw.Polygon
     * @constructor 
     * @member {_c.draw.Point[]} vertices - vertices defining the polygon
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
     * @member {function} contains - not yet implemented
     * @abstract
     */
    var Polygon = Shape.extend({

        /**
         * @constructs _c.draw.Polygon
         * @param {object} params
         * @param {_c.draw.Point[]} params.vertices - vertices
         * defining the polygon
         * @param {object} [params.styles] - any styles to be applied
         * when the shape is drawn. If styles are not provided,
         * the shape will be drawn using the context's current
         * styles.
         */
        init: function(params) {
            this._super(params);
            // required
            this.vertices = params.vertices || [];
        },

        buildPath: function(context) {
            var len = this.vertices.length,
                i;

            context.beginPath();
            context.moveTo(this.vertices[0].x, this.vertices[0].y);
            for (i = 1; i < len; i++) {
                context.lineTo(this.vertices[i].x, this.vertices[i].y);
            }
            context.closePath();
        }
    });

    return Polygon;
});
