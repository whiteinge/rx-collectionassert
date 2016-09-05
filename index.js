/**
A port of assertEqual from the RxJS docs to work with Node's assert lib

https://github.com/Reactive-Extensions/RxJS/blob/master/doc/gettingstarted/testing.md
**/
var assert = require('assert');
var Rx = require('rx');

function createMessage(expected, actual) {
    return 'Expected: [' + expected.toString() + ']\r\nActual: [' + actual.toString() + ']';
}

module.exports = {
    assertEqual: function(actual, expected) {
        var comparer = Rx.internals.isEqual, isOk = true;

        if (expected.length !== actual.length) {
            assert.ok(false, 'Not equal length. Expected: ' + expected.length + ' Actual: ' + actual.length);
            return;
        }

        for (var i = 0, len = expected.length; i < len; i += 1) {
            isOk = comparer(expected[i], actual[i]);
            if (!isOk) {
                break;
            }
        }

        assert.ok(isOk, createMessage(expected, actual));
    },
};
