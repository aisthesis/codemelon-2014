/**
 * Regular convex polygon defined by
 * radius, center and number of sides.
 *
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
     * Creates a new _c.draw.RegularPolygon
     * @constructor 
     * @member {_c.draw.Point} center - center of the polygon
     * @member {number} sides - number of sides
     * @member {number} radius - outer radius of the polygon
     * @member {number} angle - angle in radians at which first
     * vertex will be drawn. Note that the angle 0 corresponds
     * to 3 o'clock.
     * @member {function} innerRadius - polygon's inner radius
     * @member {function} resetVertices - sets vertex positions
     * based on center, sides, radius and angle. Note that
     * for the polygon to render correctly, this method must be called
     * before drawing if any of the above parameters have been modified.
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
     * @member {function} draw
     * @member {function} drawClipped
     * @member {function} prep
     * @member {function} buildPath
     * @member {function} contains
     */
    _c.draw.RegularPolygon = _c.draw.Shape.extend({

        /**
         * @constructs _c.draw.RegularPolygon
         * @param {object} params
         * @param {_c.draw.Point} params.center - center of the polygon
         * @param {number} params.sides - number of sides
         * @param {number} params.radius - outer radius of the polygon
         * @param {number} [params.angle] - angle in radians at which first
         * vertex will be drawn. Note that the angle 0 corresponds
         * to 3 o'clock.
         * @default 0
         * @param {object} [params.styles] - any styles to be applied
         * when the shape is drawn. If styles are not provided,
         * the shape will be drawn using the context's current
         * styles.
         */
        init: function(params) {
            this._super(params);
            // required
            this.center = params.center;
            this.sides = params.sides;
            this.radius = params.radius;
            // optional
            // angle in radians at which first vertex will be drawn
            this.angle = params.angle || 0;
            // calculate vertices array (this.vertices)
            this.resetVertices();
        },

        resetVertices: function() {
            var angle = this.angle,
                increment = 2 * Math.PI / this.sides,
                i;

            this.vertices = [];
            for (i = 0; i < this.sides; i++) {
                this.vertices.push(new _c.draw.Point(this.center.x + this.radius * Math.cos(angle),
                        this.center.y - this.radius * Math.sin(angle)));
                angle += increment;
            }
        },

        buildPath: function(context) {
            var i;

            context.beginPath();
            context.moveTo(this.vertices[0].x, this.vertices[0].y);
            for (i = 1; i < this.sides; i++) {
                context.lineTo(this.vertices[i].x, this.vertices[i].y);
            }
            context.closePath();
        },
        
        innerRadius: function() {
            return this.radius * Math.cos(Math.PI / this.sides);
        },

        contains: function(point) {
            var diffX = point.x - this.center.x,
                diffY = this.center.y - point.y,
                distance = Math.sqrt(diffX * diffX + diffY * diffY),
                innerRadius = this.innerRadius(),
                referenceAngle = Math.PI / this.sides,
                angle,
                steps;

            if (distance > this.radius) { return false; }
            if (distance <= innerRadius) { return true; }

            angle = Math.atan2(diffY, diffX);
            // adjust according to polygon angle
            angle -= this.angle;
            // adjust as needed so that angle is positive
            while (angle < 0) { angle += Math.PI * 2; }
            steps = Math.floor(angle * this.sides / (Math.PI * 2));
            angle -= steps * 2 * referenceAngle;
            angle = Math.abs(angle - referenceAngle);
            return distance <= innerRadius / Math.cos(angle);
        }
    });
})(_c);
