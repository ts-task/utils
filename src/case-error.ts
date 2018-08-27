import { Task } from '@ts-task/task'

export type ErrorHandler<ErrorToHandle, TResult, EResult> = (err: ErrorToHandle) => Task<TResult, EResult>

export type ErrorPredicate <ErrorToHandle> = <T> (err: T | ErrorToHandle) => err is ErrorToHandle;

export function caseError<ErrorToHandle, TResult, EResult>(
  errorPredicate: ErrorPredicate<ErrorToHandle>,
  errorHandler: ErrorHandler<ErrorToHandle, TResult, EResult>
) {
  return function <InputError> (
    err: InputError | ErrorToHandle
  ): Task<TResult, EResult | Exclude<InputError, ErrorToHandle>> {
    // If the error is of the type we are looking for (E)
    if (errorPredicate(err)) {
      // Transform the error
      return errorHandler(err);
    } else {
      // If not, leave as it is
      return Task.reject(err as Exclude<InputError, ErrorToHandle>);
    }
  }
}
