/**
 * Copyright (c) 2013 Marshall Farrier
 * http://www.opensource.org/licenses/mit-license.php
 */
 
var _c = _c || {};

(function(_c) {
    "use strict";
    _c.utils = _c.utils || {};

    _c.utils.memoize = function _memoize(arg, iterator, oncomplete, baseCases, usePrevious) {
        if (!_memoize.memo || !usePrevious) {
            _memoize.memo = [];
            if (baseCases) {
                baseCases.forEach(function(val, i) {
                    _memoize.memo[i] = val;
                });
            }
        }
        _inner(arg);
        return oncomplete(arg, _memoize.memo);
        function _inner(_arg) {
            if (_arg <= 0) return 0;
            if (_memoize.memo[_arg]) return _memoize.memo[_arg];
            return _memoize.memo[_arg] = iterator(_arg, _inner, _memoize.memo);
        };
    };

    console.log('bottom-up fibonacci using memoize()');
    _c.utils._tmp = function(n, usePrevious) {
        _c.utils.memoize(
            n,
            function(i, callback, memo) {
                var j;

                for (j = 2; j <= i; j++) {
                    if (!memo[j]) {
                        console.log('calculating for ' + j);
                        memo[j] = memo[j - 2] + memo[j - 1];
                    }
                }
                return memo[i];
            },
            function(n, values) {
                values.forEach(function(val, i) {
                    console.log(i + ': ' + val);
                });
            },
            [0, 1],
            usePrevious
        );
    };

    _c.utils._tmp(6);
    _c.utils._tmp(11, true);

    console.log('top-down fibonacci using memoize()');
    _c.utils.memoize(
        6,
        function(i, callback) {
            return callback(i - 2) + callback(i - 1);
        },
        function(n, values) {
            values.forEach(function(val, i) {
                console.log(i + ': ' + val);
            });
        },
        [0, 1]
    );

    _c.utils.fibonacci = function fib(n, oncomplete) {
        if (!fib.memo) {
            fib.memo = [0, 1];
        }
        _fib(n);
        return oncomplete(n, fib.memo);
        function _fib(i) {
            console.log(i);
            console.log(fib.memo);
            if (i <= 0) return 0;
            if (fib.memo[i]) return fib.memo[i];
            return fib.memo[i] = _fib(i - 2) + _fib(i - 1);
        };
    };

    console.log('direct fibonacci implementation');
    _c.utils.fibonacci(5, function(n, memo) {
        memo.forEach(function(val, i) {
            console.log(i + ': ' + val);
        });
    });
})(_c);
