/**
 * Regular convex polygon defined by
 * radius, center and number of sides.
 *
 * Dependencies:
 * extend.js
 * shape.js
 * point.js
 */

var _c = _c || {};

(function(_c) {
    "use strict";

    _c.draw = _c.draw || {};
    _c.draw.Rectangle = _c.draw.Shape.extend({
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
