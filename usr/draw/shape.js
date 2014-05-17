/**
 * Abstract superclass for closed geometric shapes,
 * such as Polygon or Circle.
 * The buildPath() method must be overriden to define
 * the shape to be drawn.
 *
 * Copyright (c) 2013 Marshall Farrier
 * http://www.opensource.org/licenses/mit-license.php
 *
 * Dependencies:
 * extend.js
 */

define([
        'usr/extend',
        'usr/draw/drawable'
],function(Extend, Drawable) {
    "use strict";

    /**
     * Creates a new _c.draw.Shape
     * @constructor 
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
    var Shape = Drawable.extend({

        /**
         * @constructs _c.draw.Shape
         * @param {object} [params]
         * @param {object} [params.styles] - any styles to be applied
         * when the shape is drawn. If styles are not provided,
         * the shape will be drawn using the context's current
         * styles.
         */
        init: function(params) {
            this.styles = params.styles || {};
        },

        render: function(context, callback) {
            this.buildPath(context);
            callback();
        },

        clip: function(context, callback) {
            this.render(context, function() {
                context.clip();
                callback();
            });
        },

        fill: function(context) {
            var _this = this;

            this.render(context, function() {
                if (_this.styles.fillStyle) context.fillStyle = _this.styles.fillStyle;
                context.fill();
            });
        },

        stroke: function(context) {
            var _this = this;

            this.render(context, function() {
                if (_this.styles.strokeStyle) context.strokeStyle = _this.styles.strokeStyle;
                if (_this.styles.lineWidth) context.lineWidth = _this.styles.lineWidth;
                context.stroke();
            });
        },

        draw: function(context) {
            _c.draw.paint(this, this.render, context);
        },

        /**
         * Wrapped in a save() - restore() block to avoid clipping next drawing
         */
        drawClipped: function(context) {
            context.save();
            _c.draw.paint(this, this.clip, context);
            context.restore();
        },

        /**
         * prep the context by setting strokeStyle, lineWidth and
         * fillStyle.
         */
        prep: function(context) {
            for (var style in this.styles) {
                context[style] = this.styles[style];
            }
        },

        /**
         * Clear all subpaths and create a new path corresponding to the given shape
         * @abstract
         * @param {object} context
         */
        buildPath: function(context) {
            throw new Error('must be implemented by subclass!'); 
        }
    });

    return Shape;
});
