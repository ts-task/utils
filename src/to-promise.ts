import { Task } from '@ts-task/task'

export function toPromise<T>(task: Task<T, any>) {
  return new Promise<T>((resolve, reject) => task.fork(reject, resolve))
}
