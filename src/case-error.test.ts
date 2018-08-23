import { Task, UncaughtError } from '@acamica/task'
import { assertFork, jestAssertNever, jestAssertUntypedNeverCalled } from './testing-utils'
import { caseError } from './case-error'

class DivisionByZeroError extends Error {
  type = 'DivisionByZeroError'
}

class DontLikePairsError extends Error {
  type = 'IDontLikePairsError'
}

class NewTypeOfError extends Error {
  type = 'NewTypeOfError'
}

// function divideTask (numerator: number, denominator: number) {
function divideTask(numerator: number, denominator: number): Task<number, DivisionByZeroError> {
  if (denominator === 0) {
    return Task.reject(new DivisionByZeroError())
  } else {
    return Task.resolve(numerator / denominator)
  }
}

function rejectPairsTaks(n: number): Task<number, DontLikePairsError> {
  if (n % 2 === 0) {
    return Task.reject(new DontLikePairsError())
  } else {
    return Task.resolve(n)
  }
}

const divideAndRejectPairs = (numerator: number, denominator: number) =>
  divideTask(numerator, denominator).chain(rejectPairsTaks)

describe('caseError:', () => {
  it('Should catch and resolve the cased error', cb => {
    // GIVEN: A task that fails with DivisionByZeroError
    const task = divideTask(2, 0)

    // WHEN: We catch and solve the error
    const result = task.catch(caseError(DivisionByZeroError, _ => Task.resolve(-1000)))
    // THEN: The resulting type doesn't have the catched error as a posibility
    //       and the task is resolved with the catched response
    result.fork(jestAssertUntypedNeverCalled(cb), assertFork(cb, n => expect(n).toBe(-1000)))
  })

  it('Should catch and reject the cased error', cb => {
    // GIVEN: A task that fails with DivisionByZeroError
    const task = divideAndRejectPairs(2, 0)

    // WHEN: We catch and reject with a new error
    const result = task.catch(
      caseError(DivisionByZeroError, _ => Task.reject(new NewTypeOfError()))
    )
    // THEN: The resulting type doesn't have the catched error as a posibility
    //       the resulting type has the new rejected type as a posibility
    //       and the task is rejected with the new error
    result.fork(
      assertFork(cb, err => expect(err).toBeInstanceOf(NewTypeOfError)),
      jestAssertUntypedNeverCalled(cb)
    )
  })

  it('Should leave untouched an unmatched error', cb => {
    // GIVEN: A task that fails with IDontLikePairsError
    const task = divideAndRejectPairs(4, 2)

    // WHEN: We catch the wrong exception trying to reject with a new error
    const result = task.catch(
      caseError(DivisionByZeroError, _ => Task.reject(new NewTypeOfError()))
    )
    // THEN: The resulting type doesn't have the unmatched error as a posibility
    //       the resulting type has the new rejected type as a posibility
    //       and the task is rejected with the original error
    result.fork(
      assertFork(cb, err => expect(err).toBeInstanceOf(DontLikePairsError)),
      jestAssertUntypedNeverCalled(cb)
    )
  })

  it('Should be able to catch all errors', cb => {
    // GIVEN: A task that resolves
    const task = divideAndRejectPairs(5, 1)

    // WHEN: We try to catch every possible error
    const result = task
      .map(n => `The result is ${n}`)
      .catch(
        caseError(DivisionByZeroError, _ =>
          Task.resolve('Could not compute: DivisionByZeroError ocurred')
        )
      )
      .catch(
        caseError(DontLikePairsError, _ =>
          Task.resolve('Could not compute: IDontLikePairsError ocurred')
        )
      )
      .catch(
        caseError(UncaughtError, err => Task.resolve(`Could not compute: UncaughtError ${err}`))
      )
    // THEN: The resulting type doesn't have the catched errors
    //       and the task is resolved with the mapped answer
    result.fork(jestAssertNever(cb), assertFork(cb, s => expect(s).toBe('The result is 5')))
  })

  it('Should not compile when trying to catch an error that isnt throwed', cb => {
    // GIVEN: A task that fails with DivisionByZeroError
    const task = divideTask(4, 0)

    // WHEN: We catch an imposible exception
    const result = task.catch(
      caseError(
        DontLikePairsError, // TODO: It would be nice to see this fail compilation as it is not possible that
        //       task fails with IDontLikePairsError
        _ => Task.resolve(0)
      )
    )
    // THEN: The task is rejected with the original error
    result.fork(
      assertFork(cb, err => expect(err).toBeInstanceOf(DivisionByZeroError)),
      jestAssertUntypedNeverCalled(cb)
    )
  })
})
