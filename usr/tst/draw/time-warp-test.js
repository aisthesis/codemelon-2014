(function() {
    module('TimeWarp tests');

    test( "Test TimeWarp()", function() {
        var tw = new _c.draw.TimeWarp(),
            progress;

        strictEqual(typeof tw.time, 'function', 'correct type');
        progress = 0;
        strictEqual(tw.time(progress), progress, 'correct for progress ' + progress);
        progress = 0.5;
        strictEqual(tw.time(progress), progress, 'correct for progress ' + progress);
        progress = 1;
        strictEqual(tw.time(progress), progress, 'correct for progress ' + progress);
    });
})();
