/**
 * Calls `fn` performing its side effects but discarding its return value and returning the input parameter instead.
 * @param fn Unary function that performs side effects and whose return value will be discarded
 * @returns "tapped" `fn`
 */
export const tap = <T> (fn: (x: T) => any) =>
	(x: T) => {
		fn(x);
		return x;
	}
;
