var _c = _c || {};

(function(_c) {
    'use strict';
    var i = 0,
        results = [],
        expected = [0, 1, 2, 3],
        _url =  "http://ajax.googleapis.com/ajax/libs/jquery/1.10.2/jquery.js",
        actions = [
            function() {
                var deferred = $.Deferred();

                setTimeout(function() {
                    results.push(expected[i++]);
                    deferred.resolve();
                }, 100);
                return deferred.promise();
            },
            function() {
                return $.ajax({
                    url: _url
                })
                .done(function(data) {
                    results.push(expected[i++]);
                });
            },
            function() {
                var deferred = $.Deferred();

                setTimeout(function() {
                    results.push(expected[i++]);
                    deferred.reject();
                }, 100);
                return deferred.promise();
            },
            function() {
                return $.ajax({
                    url: _url
                })
                .done(function(data) {
                    results.push(expected[i++]);
                });
            }
        ];

    _c.utils = _c.utils || {};

    QUnit.testStart(function() {
        results = [];
        i = 0;
    });

    test('seqExec() continuing on error, empty failureCallback', function() {
        var promise = _c.utils.seqExec(actions, function() {});

        stop();
        promise.done(function() {
            expected.forEach(function(val, i) {
                strictEqual(results[i], val, 'correct result for index ' + i);
            });
            start();
        });
    });

    test('seqExec() continuing on error with failureCallback', function() {
        var hasFailure = false,
            promise = _c.utils.seqExec(actions, function() { hasFailure = true; });

        stop();
        promise.done(function() {
            expected.forEach(function(val, i) {
                strictEqual(results[i], val, 'correct result for index ' + i);
            });
            ok(hasFailure, 'failure callback was triggered');
            start();
        });
    });

    test('seqExec() aborting on error, no failureCallback', function() {
        var promise = _c.utils.seqExec(actions);

        stop();
        promise.fail(function() {
            results.forEach(function(val, i) {
                strictEqual(val, expected[i], 'correct result for index ' + i);
            });
            strictEqual(results.length, 3, 'correct number of results');
            start();
        });
    });
})(_c);
