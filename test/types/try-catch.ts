import { tryCatch } from '@ts-task/utils';
import { Task } from '@ts-task/task';

const t1 = Task.resolve(1).pipe(
  tryCatch(
    x => x + 1,
    err => {
      // Try Catch is not typed, so the err can be anything
      err; // $ExpectType any
      return 'some error';
    }
  )
);

// And the value is whatever we return from the handler
t1; // $ExpectType Task<number, string | UnknownError>

const t2 = Task.resolve('{some invalid json').pipe(
  tryCatch(
    str => JSON.parse(str),
    err => err as SyntaxError
  )
);
t2; // $ExpectType Task<any, UnknownError | SyntaxError>