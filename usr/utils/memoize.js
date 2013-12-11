/**
 * Copyright (c) 2013 Marshall Farrier
 * http://www.opensource.org/licenses/mit-license.php
 */
 
var _c = _c || {};

(function(_c) {
    "use strict";
    _c.utils = _c.utils || {};

    /**
     * This version attaches the memo to the iterator so that you
     * don't have the issue that reuse starts you off with results
     * from a completely different function. This approach also eliminates the
     * need for passing the memo to the iterator.
     * @param {number} n - argument to be processed
     * @param {function} iterator - function to apply at each step of the iteration
     * @param {function} oncomplete - function that will be applied when
     * calculations are completed
     * @param {array} [baseCases] - base cases for recursion if necessary.
     */
    /**
     * The memo will be attached to the iterator.
     * @callback iterator
     * @param {number} index to be processed
     * @param {function} callback - calls iterator on indices to be used in the recursion.
     * @returns answer for the given iteration. In the typical use case, this
     * answer is expressed in terms of calls to callback.
     */
    /**
     * @callback oncomplete
     * @param [result] - the result of the recursion
     * @param [memo] - the set of memorized values after the iteration has completed.
     */
    _c.utils.memoize = function memoize(n, iterator, oncomplete, baseCases) {
        if (!iterator.memo) {
            iterator.memo = [];
            // the base cases can also be defined in the iterator rather than passed
            if (baseCases) {
                baseCases.forEach(function(val, i) {
                    iterator.memo[i] = val;
                });
            }
        }
        _inner(n);
        return oncomplete(iterator.memo[n], iterator.memo);
        function _inner(_n) {
            if (_n <= 0) return 0;
            if (iterator.memo[_n]) return iterator.memo[_n];
            return iterator.memo[_n] = iterator(_n, _inner);
        };
    };
})(_c);
