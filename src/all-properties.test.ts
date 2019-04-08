import { Task } from '@ts-task/task';
import { assertFork, jestAssertNever, jestAssertUntypedNeverCalled } from './testing-utils';
import { allProperties } from './all-properties';

describe('allProperties:', () => {
  it('Should resolve inmediatly if passed an empty object', cb => {
    // GIVEN: An empty object
    const obj = {};

    // WHEN: We wait on it
    const result = allProperties(obj);

    // THEN: It should return inmediatly with an empty object
    result.fork(
      jestAssertNever(cb),
      assertFork(cb, obj => expect(obj).toEqual({}))
    );
  });

  it('Should resolve succesfully with one task', cb => {
    // GIVEN: An object with one task
    const obj = {
      a: Task.resolve('a')
    };

    // WHEN: We wait on it
    const result = allProperties(obj);

    // THEN: It should return inmediatly with the flattened object
    result.fork(
      jestAssertNever(cb),
      assertFork(cb, obj => expect(obj.a).toEqual('a'))
    );
  });

  it('Should resolve succesfully with multiple task', cb => {
    // GIVEN: An object with multiple task
    const obj = {
      a: Task.resolve('a'),
      n1: Task.resolve(1),
      t: Task.resolve(true)
    };

    // WHEN: We wait on it
    const result = allProperties(obj);

    // THEN: It should return inmediatly with the flattened object
    result.fork(
      jestAssertNever(cb),
      assertFork(cb, obj => expect(obj).toEqual({a: 'a', n1: 1, t: true}))
    );
  });

  it('Should fail if one of the properties fails', cb => {
    // GIVEN: An object with one failure
    const obj = {
      f: Task.reject('ups'),
      n1: Task.resolve(1),
      a: Task.resolve('a')
    };

    // WHEN: We wait on it
    const result = allProperties(obj);

    // THEN: It should fail inmediatly with the reason
    result.fork(
      assertFork(cb, f => expect(f).toEqual('ups')),
      jestAssertUntypedNeverCalled(cb),
    );
  });

  it('Should only fail once', cb => {
    // GIVEN: An object with multiple failure
    const obj = {
      f1: Task.reject('f1'),
      f2: Task.reject('f2'),
      f3: Task.reject('f3')
    };

    // WHEN: We wait on it
    const result = allProperties(obj);

    // THEN: It should fail inmediatly with one of the reasons
    result.fork(
      assertFork(cb, f => expect(f).toMatch(/f1|f2|f3/)),
      jestAssertUntypedNeverCalled(cb),
    );
  });
});
