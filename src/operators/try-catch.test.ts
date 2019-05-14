import { Task } from '@ts-task/task';
import { assertFork, jestAssertNever, jestAssertUntypedNeverCalled } from '../testing-utils';
import { tryCatch } from './try-catch';

class WrappedError {
    constructor (public error: Error) {}
}

describe('tryCatch', () => {
  it('Should work as map if the function does not throw', cb => {
    // GIVEN: A resolved task
    const task = Task.resolve(1);

    // WHEN: We we use a function that does not throw
    const result = task.pipe(
      tryCatch(
          x => x + 1,
          jestAssertUntypedNeverCalled(cb)
        )
    );

    // THEN: The error fn should not be called, and the value is modified
    result.fork(
      jestAssertNever(cb),
      assertFork(cb, x => expect(x).toBe(2))
    );
  });

  it('Should not be called if the task was rejected', cb => {
    // GIVEN: A rejected task
    const task = Task.reject('fail');

    // WHEN: We we use tryCatch
    const result = task.pipe(
      tryCatch(
          jestAssertUntypedNeverCalled(cb),
          jestAssertUntypedNeverCalled(cb)
        )
    );

    // THEN: The error fn should be called
    result.fork(
        assertFork(cb, x => expect(x).toBe('fail')),
        jestAssertUntypedNeverCalled(cb)
    );
  });

  it('Should catch the error with the handler', cb => {
    // GIVEN: A resolved task
    const task = Task.resolve(1);

    // WHEN: We we use a function that throws
    const result = task.pipe(
      tryCatch(
          x => {throw new Error('oh no')},
          err => new WrappedError(err)
        )
    );

    // THEN: The error fn should be called with the wrapped error
    result.fork(
        assertFork(cb, x => expect(x).toBeInstanceOf(WrappedError)),
        jestAssertUntypedNeverCalled(cb)
    );
  });

});
