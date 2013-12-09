var _c = _c || {};

(function(_c) {
    'use strict';
    _c.utils = _c.utils || {};
    /**
     * Execute a list of actions in series. For each i,
     * actions[i + 1]() will only execute after actions[i]() has completed.
     * Contract for actions is to return a jQuery deferred object.
     * 
     * @param {function[]} actions - an array of actions to be 
     * executed in sequence. Each action must return a jQuery 
     * Promise object. Otherwise an exception will be thrown,
     * and execution will terminate. No parameters are passed
     * to these functions.
     * @callback [failureCallback] - if provided, this callback
     * will execute whenever an action fails, and execution will
     * continue. Note that providing this callback means that
     * the promise returned by seqExec will show success even
     * if some or all actions have failed. If failure should
     * result in termination of execution, place failure behavior
     * inside error callbacks of the deferred. Providing a
     * do-nothing function() {} as callback will merely serve to
     * make execution to continue on failure of an action rather 
     * than to terminate.
     */
    _c.utils.seqExec = function(actions, failureCallback) {
        var deferred = $.Deferred(),
            continueOnError = true;

        if (typeof failureCallback !== 'function') {
            failureCallback = function() {};
            continueOnError = false;
        }
        doAll(actions, deferred, continueOnError, failureCallback, 0);
        return deferred.promise();
    };

    function doAll(actions, deferred, continueOnError, failureCallback, i) {
        if (i >= actions.length) {
            deferred.resolve();
            return; 
        }
        var promise = actions[i]();

        promise.fail(failureCallback);
        if (continueOnError) {
            promise.always(function() {
                doAll(actions, deferred, continueOnError, failureCallback, i + 1);
            });
        }
        else {
            promise.done(function() {
                doAll(actions, deferred, continueOnError, failureCallback, i + 1);
            });
            promise.fail(function() {
                deferred.reject();
                return; 
            });
        }
    }
})(_c);
