test('fill() test', function() {
    var len = 4,
        val = 'blah',
        result = _c.utils.fill(len, val);

        strictEqual(result.length, len, 'correct length');
        result.forEach(function(_val) {
            strictEqual(_val, val, 'correct value');
        });
});
