import { Task } from '@acamica/task'
import { toPromise } from './to-promise'

export function share<T, E>() {
  let result: Promise<T> | undefined
  return function(input: Task<T, E>): Task<T, E> {
    return new Task((outerResolve, outerReject) => {
      if (typeof result === 'undefined') {
        result = toPromise(input)
      }
      result.then(outerResolve, outerReject)
    })
  }
}
