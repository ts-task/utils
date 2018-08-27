import { Task, UncaughtError } from '@ts-task/task'

export type Constructor<T> = { new (...args: any[]): T }

export type ErrorHandler<ErrorToHandle, TResult, EResult> = (err: ErrorToHandle) => Task<TResult, EResult>

export function caseError<ErrorToHandle, TResult, EResult>(
  ErrorType: Constructor<ErrorToHandle>,
  errorHandler: ErrorHandler<ErrorToHandle, TResult, EResult>
) {
  return function <InputError> (
    err: InputError | ErrorToHandle
  ): Task<TResult, EResult | Exclude<InputError, ErrorToHandle>> {
    // If the error is of the type we are looking for (E)
    if (err instanceof ErrorType) {
      // Transform the error
      return errorHandler(err);
    } else {
      // If not, leave as it is
      return Task.reject(err as Exclude<InputError, ErrorToHandle>);
    }
  }
}
