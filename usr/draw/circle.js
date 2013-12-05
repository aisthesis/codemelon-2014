/**
 * Dependencies:
 * extend.js
 * shape.js
 * point.js
 */
var _c = _c || {};

(function(_c) {
    "use strict";

    _c.draw = _c.draw || {};
    _c.draw.Circle = _c.draw.Shape.extend({
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
})(_c);
