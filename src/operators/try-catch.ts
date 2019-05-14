import { Task } from '@ts-task/task';

type TryFn<A, B> = (value: A) => B;
type CatchFn<E> = (err: any) => E;

export function tryCatch<A, B, E> (tryFn: TryFn<A, B>, catchFn: CatchFn<E>) {
    return function <InnerError>(input: Task<A, InnerError>) {
        return new Task<B, InnerError | E>((outerResolve, outerReject) => {
            input.fork(
                outerReject,
                val => {
                    try {
                        outerResolve(tryFn(val));
                    } catch (err) {
                        outerReject(catchFn(err));
                    }
                }
            )
        });
    }
}