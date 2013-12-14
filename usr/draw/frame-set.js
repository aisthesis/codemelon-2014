/**
 * Copyright (c) 2013 Marshall Farrier
 * http://www.opensource.org/licenses/mit-license.php
 *
 * Handles frame sets for use in sprites. Similar to
 * SpriteAnimator from Core HTML5 Canvas, p. 420
 *
 * Dependencies:
 * extend.js
 * point.js
 * utils/arrays.js
 */

var _c = _c || {};

(function(_c) {
    'use strict';

    _c.draw = _c.draw || {};
    _c.draw.FrameSet = _c.Base.extend({
        init: function(params) {
            var _this = this;

            // each frame is an object of type _c.draw.Image
            this.frames = params.frames;
            this.index = 0;
            this.loaded = _c.utils.fill(this.frames.length, false);
            this.frames.forEach(function(frame, i) {
                frame.image.onload = function(event) {
                    _this.loaded[i] = true;
                    if (_.reduce(_this.loaded, 
                            function(memo, value) { return memo && value; }, true)) {
                        frame.image.onload(event);
                    }
                };
            });
        },
        
        advance: function() {
            this.index = (this.index + 1) % this.frames.length;
        },

        draw: function(context) {
            var frame = this.frames[this.index];

            context.drawImage(frame.image,
                frame.corner.x, frame.corner.y,
                frame.width, frame.height);
        },

        contains: function(point) {
            return this.frames[this.index].contains(point);
        }
    });
})(_c);
