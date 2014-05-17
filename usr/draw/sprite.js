/**
 * Copyright (c) 2013 Marshall Farrier
 * http://www.opensource.org/licenses/mit-license.php
 * Cf. Core HTML5 Canvas, pp. 395ff.
 *
 * Dependencies:
 * extend.js
 */
/** @namespace */

define(['usr/extend'],
function(Extend) {
    "use strict";

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
     * @member {_c.draw.Drawable} drawable
     * @member {function} paint - paints the drawable into a context
     * @member {function[]} behaviors - methods that will be invoked when
     * this.update() is called
     * @member {function} update - invoke all behaviors, using the calling sprite as
     * this argument
     */
    /**
     * @method paint
     * @param context - context into which to paint the drawable
     * @example
     * sprite.paint(context);
     */
    var Sprite = Extend.Base.extend({

        /**
         * @constructs _c.draw.Sprite
         * @param {object} params
         * @param {_c.draw.Drawable} params.drawable
         * @param {function} [params.paint] - paint method if different from Drawable#draw(context)
         * @default this.drawable.draw
         * @param {function[]} [params.behaviors] - methods that will be invoked when 
         * this.update() is called.
         */
        /**
         * @function params.paint
         * @param context
         * @example
         * paint: function(context) {
         *     _this.drawable.stroke(context);
         * }
         */
        init: function(params) {
            this.drawable = params.drawable;
            /**
             * For shapes Shape#draw() or Shape#drawClipped()
             * There is no need to create an object for this, as in the book.
             */
            this.paint = params.paint || function(context) {
                this.drawable.draw(context);
                return this;
            };
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

    return Sprite;
});
