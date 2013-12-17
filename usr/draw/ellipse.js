/**
 * Copyright (c) 2013 Marshall Farrier
 * http://www.opensource.org/licenses/mit-license.php
 *
 * Dependencies:
 * extend.js
 * shape.js
 * point.js
 */

/** @namespace */
var _c = _c || {};

(function(_c) {
    "use strict";

    /** @namespace */
    _c.draw = _c.draw || {};

    /**
     * Creates a new _c.draw.Ellipse
     * @constructor 
     * @member {_c.draw.Point} center
     * @member {number} radius - radius before being stretched
     * @member {number} stretch - how much to stretch the
     * original circle horizontally before rotating. A value
     * of 1 generates a circle.
     * @member {number} angle - angle in radians that the ellipse
     * will be rotated after it has been stretched
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
    _c.draw.Ellipse = _c.draw.Shape.extend({

        /**
         * @constructs _c.draw.Ellipse
         * @param {object} params
         * @param {_c.draw.Point} params.center - center of the ellipse
         * @param {number} params.radius - radius before being stretched
         * @param {number} params.stretch - how much the original circle will be 
         * stretched horizontally before being rotated. A value of 1 makes a circle.
         * @param {number} params.angle - angle in radians that the ellipse
         * will be rotated after it has been stretched
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
            this.stretch = params.stretch;
            this.angle = params.angle;
            this.center.x = this.center.x / this.stretch;
        },

        buildPath: function(context) {
            context.beginPath();
            context.arc(this.center.x, this.center.y, this.radius, 
                0, Math.PI * 2, false);
        },

        render: function(context, callback) {
            context.save();
            context.translate(this.center.x * this.stretch, this.center.y);
            context.rotate(this.angle);
            context.translate(-this.center.x * this.stretch, -this.center.y);
            context.scale(this.stretch, 1);
            this.buildPath(context);
            context.restore();
            callback();
        },

        contains: function(point) {
            throw new Error('not yet implemented');
        }
    });
})(_c);
