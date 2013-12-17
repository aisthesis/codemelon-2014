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
    /**
     * Creates a new _c.draw.Sprite
     * A sprite is a thin wrapper around a drawable to facilitate control of the
     * manner in which updates occur, namely by invoking various behavior functions
     * in sequence. This allows combining behaviors such as vertical and 
     * horizontal motion or advancing the frame with appropriate drawables.
     * This implementation leaves out several parameters included in 
     * David Geary's Core HTML5 Canvas:
     * box, velocity, visible, animating
     * These properties can be attached to specific sprites as needed
     * but just create extra baggage that is usually empty.
     * @constructor 
     * @member {(_c.draw.Shape|_c.draw.Image|_c.draw.TileSet|_c.draw.FrameSet)} drawable
     * @member {function} paint - paints the drawable into a context
     * @member {function[]} behaviors - methods that will be invoked when
     * the this.update() is called
     * @member {function} update - invoke all behaviors, using the calling sprite as
     * this argument
     * */
    _c.draw.Sprite = _c.Base.extend({

        /**
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
