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

var _c = _c || {};

(function(_c) {
    "use strict";

    _c.draw = _c.draw || {};
    _c.draw.Shape = _c.Base.extend({
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

        drawClipped: function(context) {
            _c.draw.paint(this, this.clip, context);
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
         * abstract method
         */
        buildPath: function(context) {
            alert('Subclasses must override buildPath()!');
        }
    });
})(_c);
