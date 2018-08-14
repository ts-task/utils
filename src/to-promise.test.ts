import { toPromise } from './to-promise'
import { Task } from '@acamica/task'

describe('toPromise', () => {
  it('toPromise works with resolved Tasks', () => {
    // GIVEN: a Task resolved with a value
    const value = 9
    const task = Task.resolve(value)

    // WHEN: calling `toPromise` with that Task
    const promise = toPromise(task)

    // THEN: a promise is returned
    expect(promise).toBeInstanceOf(Promise)
    // ...and it's resolved with the Tasks resolution value
    return expect(promise).resolves.toBe(value)
  })

  it('toPromise works with rejected Tasks', () => {
    // GIVEN: a Task reject with an error
    const error = new Error('Boo!')
    const task = Task.reject(error)

    // WHEN: calling `toPromise` with that Task
    const promise = toPromise(task)

    // THEN: a promise is returned
    expect(promise).toBeInstanceOf(Promise)
    // ...and it's rejecte with the Tasks resolution value
    return expect(promise).rejects.toBe(error)
  })
})
