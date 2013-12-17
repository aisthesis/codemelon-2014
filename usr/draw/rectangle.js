/**
 * Copyright (c) 2013 Marshall Farrier
 * http://www.opensource.org/licenses/mit-license.php
 *
 * Regular convex polygon defined by
 * radius, center and number of sides.
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
     * Creates a new _c.draw.Rectangle
     * @constructor 
     * @member {_c.draw.Point} corner - corner from which length
     * and width are measured. Normally, this should be the top
     * left corner, but it may be different if a negative value
     * is used for width or height (as may be needed if the rectangle
     * is used as a surrounding rubber band manipulated by the user).
     * @member {number} width
     * @member {number} height
     * @member {function} left - returns the x coordinate for the left
     * edge of the rectangle
     * @member {function} top - returns the y coordinate for the top 
     * edge of the rectangle
     * @member {function} absWidth - returns the absolute value of the 
     * rectangle's width
     * @member {function} absHeight - returns the absolute value of the
     * rectangle's height
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
    _c.draw.Rectangle = _c.draw.Shape.extend({

        /**
         * @constructs _c.draw.Rectangle
         * @param {object} params
         * @param {_c.draw.Point} params.corner - corner from which length
         * and width are measured. Normally, this should be the top
         * left corner, but it may be different if a negative value
         * is used for width or height (as may be needed if the rectangle
         * is used as a surrounding rubber band manipulated by the user).
         * @param {number} params.width
         * @param {number} params.height
         * @param {object} [params.styles] - any styles to be applied
         * when the shape is drawn. If styles are not provided,
         * the shape will be drawn using the context's current
         * styles.
         */
        init: function(params) {
            this._super(params);
            // required
            this.corner = params.corner;
            // default to 0
            this.width = params.width || 0;
            this.height = params.height || 0;
        },

        buildPath: function(context) {
            context.beginPath();
            context.rect(this.left(), this.top(), this.absWidth(), this.absHeight());
        },
        
        contains: function(point) {
            var xMin = this.left(),
                yMin = this.top();

            if (point.x < xMin || xMin + this.absWidth() < point.x) { return false; }
            if (point.y < yMin || yMin + this.absHeight() < point.y) { return false; }
            return true;
        },

        left: function() {
            return this.width >= 0 ? this.corner.x : this.corner.x + this.width;
        },

        top: function() {
            return this.height >= 0 ? this.corner.y : this.corner.y + this.height;
        },

        absWidth: function() {
            return Math.abs(this.width);
        },

        absHeight: function() {
            return Math.abs(this.height);
        }
    });
})(_c);
