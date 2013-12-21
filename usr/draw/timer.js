/**
 * Constructs a timer for animations.
 * If a TimeWarp is passed to the constructor, the timer
 * will distort time accordingly.
 * Cf. David Geary, Core HTML5 Canvas, p. 457
 * Geary's stopwatch function can easily be eliminated
 * for improved performance as well as code simplification.
 *
 * Copyright (c) 2013 Marshall Farrier
 * http://www.opensource.org/licenses/mit-license.php
 *
 * Dependencies:
 * extend.js
 * time-warp.js
 */

/** @namespace */
var _c = _c || {};

(function(_c) {
    'use strict';

    /** @namespace */
    _c.draw = _c.draw || {};

    /**
     * Creates a new _c.draw.TimeWarp
     * @constructor 
     * @member {function} time - the timer function
     */
    /**
     * @method time
     * @param {number} progress - number between 0 and 1 specifying progress toward the timer's completion
     * @returns number - distorted measure of progress
     */
    _c.draw.Timer = _c.Base.extend({

        /**
         * @constructs _c.draw.TimeWarp
         * @param {string} easing='linear' - easing to be used for the TimeWarp.
         * Possible values:
         * 'linear',
         * 'easeIn',
         * 'easeOut',
         * 'easeInOut',
         * 'elastic',
         * 'bounce'
         * @param {number} n=1 - additional argument with meaning depending on type of easing.
         */
        init: function(duration, timeWarp) {
            this.duration = duration;
            this.startTime = 0;
            this.running = false;
            this.elapsed = undefined;
            this.getTime = getTimeFunction(duration, timeWarp);
        },

        start: function() {
            this.startTime = new Date();
            this.elapsed = undefined;
            this.running = true;
            return 0;
        },

        stop: function() {
            this.elapsed = new Date() - this.startTime();
            this.running = false;
            return this.elapsed;
        }
    });

    function getTimeFunction(duration, timeWarp) {
        if (timeWarp) {
            return function() {
                var _elapsed = getElapsed(this.running, this.startTime, this.elapsed),
                    _progress = _elapsed / duration;

                
            }
        }
        return function() {
            return getElapsed(this.running, this.startTime, this.elapsed);
        }
    };

    function getElapsed(running, startTime, elapsed) {
        if (running) return new Date() - startTime;
        return elapsed;
    };
})(_c);
