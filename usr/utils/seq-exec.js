var _c = _c || {};

(function(_c) {
    'use strict';
    _c.utils = _c.utils || {};
    /**
     * Contract for actions is to return a jQuery deferred object
     */
    _c.utils.seqExec = function(actions, continueOnError, failureCallback) {
        var deferred = $.Deferred();

        if (typeof continueOnError === 'undefined') continueOnError = false; 
        if (typeof failureCallback !== 'function') failureCallback = function() {};
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
