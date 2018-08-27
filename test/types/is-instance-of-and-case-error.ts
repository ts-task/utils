import { Task } from '@ts-task/task';
import { caseError, isInstanceOf } from '@ts-task/utils';

// We will test typings when using `isInstanceOf` together with `caseError`

// We got some classes
class Foo {
	Foo = 'Foo';
}

class Bar {
	Bar = 'Bar';
}

class Baz {
	Baz = 'Baz';
}

// And a task that is rejected with all those classes
const task = Task
	.resolve(9)
	.chain(x => x > 0 ? Task.resolve(x) : Task.reject(new Foo()))
	.chain(x => x > 0 ? Task.resolve(x) : Task.reject(new Bar()))
	.chain(x => x > 0 ? Task.resolve(x) : Task.reject(new Baz()))
;

task; // $ExpectType Task<number, UncaughtError | Foo | Bar | Baz>

// If we handle the Foo errors
const fooHandled = task
	.catch(caseError(
		isInstanceOf(Foo),
		_ => Task.resolve(0)
	))
;

// ...we get a Task that is NOT rejected with the Foo errors
fooHandled; // $ExpectType Task<number, UncaughtError | Bar | Baz>

// If we handle the Foo and the Bar errors
const fooAndBarHandled = task
	.catch(caseError(
		isInstanceOf(Foo, Bar),
		_ => Task.resolve(0)
	))
;

// ...we get a Task that is neither rejected with the Foo or the Bar errors
fooAndBarHandled; // $ExpectType Task<number, UncaughtError | Baz>

// If we transform that last Task's Baz error into Bar error
const bazTransformedToBar = fooAndBarHandled
	.catch(caseError(
		isInstanceOf(Baz),
		_ => Task.reject(new Bar())
	))
;

// We get a Task whose error is Bar (or UncaughtError)
bazTransformedToBar; // $ExpectType Task<number, UncaughtError | Bar>