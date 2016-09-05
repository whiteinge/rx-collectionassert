var test = require('tape');
var Rx = require('rx'),
    ReactiveTest = Rx.ReactiveTest;

var collectionAssert = require('./index');

test('An RxJS test', function(assert) {
    var scheduler = new Rx.TestScheduler();

    var source = scheduler.createHotObservable(
        ReactiveTest.onNext(250, 'foo'),
        ReactiveTest.onNext(260, 'bar'),
        ReactiveTest.onCompleted(270));

    var results = scheduler.startScheduler(function() {
        return source.map(x => x);
    }, {created: 100, subscribed: 200, disposed: 500});

    collectionAssert.assertEqual(results.messages, [
        ReactiveTest.onNext(250, 'foo'),
        ReactiveTest.onNext(260, 'bar'),
        ReactiveTest.onCompleted(270),
    ]);

    assert.end();
});
