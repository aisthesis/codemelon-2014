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

define(['usr/extend'],
function(Extend) {
    'use strict';

    /**
     * Creates a new _c.draw.Timer
     * @constructor 
     * @member {number} duration - duration of the timer
     * @member {number} startTime - time when the start() method was last called
     * @member {boolean} running - whether the timer is currently running
     * @member {function} getTime - returns the elapsed time using any TimeWarp function
     * passed to the constructor. If no TimeWarp was passed, returns the time since
     * the timer was started until the timer has been stopped. When the timer has stopped,
     * returns the elapsed time when it was stopped.
     * @member {number} elapsed - shouldn't be accessed directly. Use Timer#getTime() instead.
     */
    var Timer = Extend.Base.extend({

        /**
         * @constructs _c.draw.Timer
         * @param {number} [duration] - duration of the timer. If not passed, the timer uses
         * linear time with unlimited duration.
         * @param {_c.draw.TimeWarp} [timeWarp] - object whose time() method returns a
         * value between 0 and 1 describing a distorted description of the timer's progress.
         * @param {string} easing='linear' - easing to be used for the TimeWarp.
         */
        init: function(duration, timeWarp) {
            this.duration = duration;
            this.startTime = 0;
            this.running = false;
            this.getTime = getTimeFunction(duration, timeWarp);
        },

        start: function() {
            this.startTime = new Date();
            this.running = true;
            return 0;
        },

        stop: function() {
            this.elapsed = new Date() - this.startTime;
            this.running = false;
            return this.elapsed;
        }
    });

    function getTimeFunction(duration, timeWarp) {
        if (duration && timeWarp) {
            return function() {
                var _elapsed = getElapsed(this.running, this.startTime, this.elapsed),
                    _progress;

                // timer not yet started
                if (!_elapsed || !this.running) {
                    return _elapsed;
                }
                _progress = _elapsed / duration;
                return duration * timeWarp.time(_progress);
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

    return Timer;
});
