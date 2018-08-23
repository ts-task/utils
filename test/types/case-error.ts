import { caseError } from '@ts-task/utils';
import { Task } from '@acamica/task';

// `caseError` is intended to handle an error if it's instance of an specific class.

// NoNegativesError is the error we are interested in.
// It has a `NoNegativesError` public property because TypeScript inference is structural
class NoNegativesError extends Error {
  NoNegativesError = 'NoNegativesError';
}

// rejectNegative is a function that will return a Task possible rejected with a NoNegativesError
const rejectNegative = (x: number): Task<number, NoNegativesError> =>
  x >= 0 ? Task.resolve(x) : Task.reject(new NoNegativesError())
;

// We will tests our `caseError` function with two variables
// (that is because of a bug we had with the Tasks rejected with only one possible type),
// one is `aNumber`, whose type is
const aNumber = rejectNegative(9); // $ExpectType Task<number, NoNegativesError>

// ...the other one is `anotherNumber`, whose type is
const anotherNumber = aNumber // $ExpectType Task<number, NoNegativesError | UncaughtError>
  .map(x => x)
;

// The only difference between both variables is that `anotherNumber` is possibly rejected
// with two different errors (`NoNegativesError` and `UncaughtError`), while `aNumber` is
// possible rejected with only one error (`NoNegativesError`).

// We will also need a function `fixNoNegativesError` that should handle (and resolve)
// the `NegativesError` case, delegating in `caseError`.
const fixNoNegativesError = caseError(NoNegativesError, _ => Task.resolve(0));

// We try our `fixNoNegativesError` on both Tasks
const result = aNumber.catch(fixNoNegativesError);
const anotherResult = anotherNumber.catch(fixNoNegativesError);

// And in both cases we expect the results to be:
result; // $ExpectType Task<number, UncaughtError>
anotherResult; // $ExpectType Task<number, UncaughtError>

// Notice how the `UncaughtError` is present in both results. In `result`
// it is because of the `.catch` method. In `anotherResult` it was already present before.
