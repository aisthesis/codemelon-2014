(function() {
    module('Timer tests');

    test( "Test Timer() with no warping", function() {
        var timer = new _c.draw.Timer(),
            delay = 100,
            times = [],
            actions = [
                function() {
                    var deferred = $.Deferred();

                    setTimeout(function() {
                        times.push(timer.getTime());
                        deferred.resolve();
                    }, delay);
                    return deferred.promise();
                },

                function() {
                    var deferred = $.Deferred();

                    setTimeout(function() {
                        timer.stop(); 
                        deferred.resolve();
                    }, delay);
                    return deferred.promise();
                },

                function() {
                    var deferred = $.Deferred();

                    setTimeout(function() {
                        times.push(timer.getTime());
                        deferred.resolve();
                    }, delay);
                    return deferred.promise();
                }
            ],
            promise;

        strictEqual(timer.getTime(), undefined, 'time undefined prior to start');
        stop();
        timer.start();
        promise = _c.utils.seqExec(actions);
        promise.done(function() {
            ok(times[0] >= delay, 'time value exceeds expected min'); 
            ok(times[0] < 1.1 * delay, 'time value smaller than expected max');
            ok(times[1] >= 2 * delay, 'after stop and delay time value exceeds expected min'); 
            ok(times[1] < 2.1 * delay, 'after stop and delay time value smaller than expected max');
            start();    
        });
    });

    test( "Test Timer(duration, timeWarp) with easeIn timeWarp", function() {
        var delay = 100, 
            timer = new _c.draw.Timer(2 * delay, new _c.draw.TimeWarp('easeIn')),
            times = [],
            actions = [
                function() {
                    var deferred = $.Deferred();

                    setTimeout(function() {
                        times.push(timer.getTime());
                        deferred.resolve();
                    }, delay);
                    return deferred.promise();
                },

                function() {
                    var deferred = $.Deferred();

                    setTimeout(function() {
                        timer.stop(); 
                        deferred.resolve();
                    }, delay);
                    return deferred.promise();
                },

                function() {
                    var deferred = $.Deferred();

                    setTimeout(function() {
                        times.push(timer.getTime());
                        deferred.resolve();
                    }, delay);
                    return deferred.promise();
                }
            ],
            promise;

        strictEqual(timer.getTime(), undefined, 'time undefined prior to start');
        stop();
        timer.start();
        promise = _c.utils.seqExec(actions);
        promise.done(function() {
            ok(times[0] >= delay / 2, 'time value exceeds expected min'); 
            ok(times[0] < 0.1 + delay / 2, 'time value smaller than expected max');
            ok(times[1] >= 2 * delay, 'after stop and delay time value exceeds expected min'); 
            ok(times[1] < 2.1 * delay, 'after stop and delay time value smaller than expected max');
            start();    
        });
    });
})();
