/**
 * Copyright (c) 2013 Marshall Farrier
 * http://www.opensource.org/licenses/mit-license.php
 * Cf. Core HTML5 Canvas, pp. 395ff.
 *
 * Dependencies:
 * extend.js
 */
/** @namespace */
var _c = _c || {};

(function(_c) {
    "use strict";

    /** @namespace */
    _c.draw = _c.draw || {};
    /** @constructor */
    _c.draw.Sprite = _c.Base.extend({
        /**
         * Leaving out several parameters included in the book:
         * box, velocity, visible, animating
         * These properties can be attached in specific cases
         * but just create extra baggage that is often unneeded.
         */
        init: function(params) {
            /**
             * For shapes Shape#draw() or Shape#drawClipped()
             * There is no need to create an object for this, as in the book.
             */
            this.paint = params.paint || function(context) {};
            // shape, image, etc.
            this.drawable = params.drawable;
            // behaviors are functions, not objects, so no need for separate behavior.execute()
            this.behaviors = params.behaviors || [];
        },

        update: function(context, time) {
            var _this = this;

            this.behaviors.forEach(function(behavior) {
                // allows natural use of 'this' inside behavior function
                // a behavior thus only takes context and time as arguments
                behavior.call(_this, context, time);
            });
            return this;
        }
    });
})(_c);
