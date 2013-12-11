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
    
    /**
     * Typically makes top down memoization 2 lines of code:
     * 1 for setup and 1 to define the iterator.
     */
    _c.utils.fibonacciTopDown = function(n, oncomplete) {
        console.log('calling fibonacciTopDown()');
        return _c.utils.memoize(n, _fibTd, oncomplete, [0, 1]);
    };    

    function _fibTd(i, callback) {
        console.log('top down fib iterator called for ' + i);
        return callback(i - 2) + callback(i - 1);
    };

    _c.utils.fibonacciTopDown(6, function(result) { 
        console.log('result: ' + result); 
    });

    _c.utils.fibonacciTopDown(9, function(result, memo) { 
        memo.forEach(function(val, i) {
            console.log(i + ': ' + val);
        });
    });

    /**
     * The memoize() function doesn't really make bottom
     * up memoization any more concise
     */
    _c.utils.fibonacciBottomUp = function(n, oncomplete) {
        console.log('calling fibonacciBottomUp()');
        return _c.utils.memoize(n, _fibBu, oncomplete);
    };

    function _fibBu(i, callback) {
        if (_fibBu.memo.length < 2) {
            _fibBu.memo = [0, 1];
        }
        for (var j = 2; j <= i; j++) {
            if (!_fibBu.memo[j]) {
                console.log('calculating for ' + j);
                _fibBu.memo[j] = _fibBu.memo[j - 2] + _fibBu.memo[j - 1];
            }
        }
        return _fibBu.memo[i];
    };

    _c.utils.fibonacciBottomUp(3, function(result) {
        console.log('result is ' + result);
    });

    _c.utils.fibonacciBottomUp(6, function(result) {
        console.log('result is ' + result);
    });

    _c.utils.fibonacciBottomUp(5, function(result) {
        console.log('result is ' + result);
    });
})(_c);
