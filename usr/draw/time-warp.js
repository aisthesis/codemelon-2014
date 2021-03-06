/**
 * Used to modify linear timeflow for various
 * animation easings. Once <code>var timeWarp = new _c.draw.TimeWarp(params);</code>
 * has been created, timeWarp.time can be passed to the constructor
 * of an animation timer to create the desired effect.
 * Cf. David Geary, Core HTML5 Canvas, p. 457
 *
 * Copyright (c) 2013 Marshall Farrier
 * http://www.opensource.org/licenses/mit-license.php
 *
 * Dependencies:
 * extend.js
 */

define(['usr/extend'],
function(Extend) {
    'use strict';

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
    var TimeWarp = Extend.Base.extend({

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
        init: function(easing, n) {
            var _easing = easing || 'linear',
                _n = n || 1,
                _elastic = function(count) {
                    return function(progress) {
                        return (1 - Math.cos(progress * Math.PI * count)) * (1 - progress) + progress;
                    };
                },
                fn;

            switch (_easing) {
            case 'linear':
                this.time = function(progress) {
                    return progress;
                };
                break;
            case 'easeIn':
                this.time = function(progress) {
                    return Math.pow(progress, _n * 2);
                };
                break;
            case 'easeOut':
                this.time = function(progress) {
                    return 1 - Math.pow(1 - progress, _n * 2);
                };
                break;
            case 'easeInOut':
                this.time = function(progress) {
                    return progress - Math.sin(progress * 2 * Math.PI) / (2 * Math.PI);
                };
                break;
            case 'elastic':
                this.time = _elastic(_n);
                break;
            case 'bounce':
                fn = _elastic(_n);
                this.time = function(progress) {
                    progress = fn(progress);
                    return progress <= 1 ? progress : 2 - progress;
                };
                break;
            }
        }
    });

    return TimeWarp;
});
