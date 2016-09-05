# rx-collectionassert

A port of [assertEqual from the RxJS
docs](https://github.com/Reactive-Extensions/RxJS/blob/master/doc/gettingstarted/testing.md)
to work with Node's assert lib.

(I got tired of copy-and-pasting this between projects.)

## Usage

This works with any testing lib in Node; example below using
[tape](https://github.com/substack/tape).

```js
var test = require('tape');
var Rx = require('rx'),
    ReactiveTest = Rx.ReactiveTest;

var collectionAssert = require('rx-collectionassert');

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
```
