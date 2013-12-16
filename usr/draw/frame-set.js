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
            var _this = this,
                fn;

            // each frame is an object of type _c.draw.Image
            this.frames = params.frames;
            this.index = 0;
            // temporary variable for holding the corner where the image will be drawn
            this.corner = new _c.draw.Point(0, 0);
            // offset to be applied to the frame's corner
            this.offset = params.offset || new _c.draw.Vector(0, 0);
            this.loaded = _c.utils.fill(this.frames.length, false);
            // the onload callback for each image should normally call 
            // FrameSet#draw()
            // The following ensures that all frames have been loaded
            this.frames.forEach(function(frame, i) {
                fn = frame.image.onload;
                frame.image.onload = function(event) {
                    _this.loaded[i] = true;
                    if (_.reduce(_this.loaded, 
                            function(memo, value) { return memo && value; }, true)) {
                        return fn(event);
                    }
                };
            });
        },
        
        advance: function() {
            this.index = (this.index + 1) % this.frames.length;
        },

        draw: function(context) {
            var frame = this.frames[this.index];

            frame.corner.offset(this.offset, this.corner);
            context.drawImage(frame.image,
                this.corner.x, this.corner.y,
                frame.width, frame.height);
        },

        contains: function(point) {
            return this.frames[this.index].contains(point.offset(this.offset, 
                this.corner));
        }
    });
})(_c);
