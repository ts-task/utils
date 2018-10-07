import { Task } from '@ts-task/task';
import { jestAssertNever, assertFork } from './testing-utils';
import { tap } from './tap';

describe('tap', () => {
	it('`tap` calls the function and returns the argument', cb => {
		// GIVEN:
		// A callback,
		const callback = jest.fn();
		// ...a value
		const value = 3;

		// ...and a Task that is resolved with that value
		const task = Task
			.resolve(value)
		
		// WHEN:
		// The task is mapped with `tap` and the callback
			.map(tap(callback))
		;

		// THEN:
		task.fork(
			jestAssertNever(cb),
			assertFork(cb, resolvedValue => {
				// The callback is called with the value
				expect(callback).toBeCalledWith(value);

				// ...and the value is resolved itself.
				expect(resolvedValue).toEqual(value);
			})
		);
	});
});
