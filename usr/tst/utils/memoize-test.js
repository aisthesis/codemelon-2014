test( "fibonacci test", function() {
    var fibonacci = function(n) {
            return _c.utils.memoize(n, _fib, function(result) { return result; }, [0, 1]);
        },
        calculated = [];

    function _fib(i, callback) {
        calculated.push(i);
        return callback(i - 2) + callback(i - 1);
    };

    strictEqual(fibonacci(2), 1, 'correct result for 2');
    strictEqual(fibonacci(8), 21, 'correct result for 8');
    strictEqual(calculated.length, 7, 'values only calculated once');
});
