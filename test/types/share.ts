import { share } from '@ts-task/utils';
import { Task } from '@acamica/task';

// We will test `toPromise` that just transform a Task into a Promise, losing the typings on the error.

// NoNegativesError is the error we are interested in.
// It has a `NoNegativesError` public property because TypeScript inference is structural
class NoNegativesError extends Error {
  NoNegativesError = 'NoNegativesError';
}

// rejectNegative is a function that will return a Task possible rejected with a NoNegativesError
const rejectNegative = (x: number): Task<number, NoNegativesError> =>
  x >= 0 ? Task.resolve(x) : Task.reject(new NoNegativesError())
;

// GIVEN: a Task, typed on the success and on the error...
const tNumber = rejectNegative(9); // $ExpectType Task<number, NoNegativesError>

// WHEN: calling piping `share`...
const sharedNumber = tNumber
	.pipe(share())
;

// THEN: we get a Task typed like the original one (but possible rejected with an UncaughtError)
sharedNumber;  // $ExpectType Task<number, UncaughtError | NoNegativesError>
