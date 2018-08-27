export type Constructor<T> = { new (...args: any[]): T }

export function isInstanceOf <A, B, C, D, E, F, G, H, I, J> (
	constructor1: Constructor<A>,
	constructor2: Constructor<B>,
	constructor3: Constructor<C>,
	constructor4: Constructor<D>,
	constructor5: Constructor<E>,
	constructor6: Constructor<F>,
	constructor7: Constructor<G>,
	constructor8: Constructor<H>,
	constructor9: Constructor<I>,
	constructor10: Constructor<J>
):
	<T> (instance: T | A | B | C | D | E | F | G | H | I | J) => instance is A | B | C | D | E | F | G | H | I | J
;
export function isInstanceOf <A, B, C, D, E, F, G, H, I> (
	constructor1: Constructor<A>,
	constructor2: Constructor<B>,
	constructor3: Constructor<C>,
	constructor4: Constructor<D>,
	constructor5: Constructor<E>,
	constructor6: Constructor<F>,
	constructor7: Constructor<G>,
	constructor8: Constructor<H>,
	constructor9: Constructor<I>
):
	<T> (instance: T | A | B | C | D | E | F | G | H | I) => instance is A | B | C | D | E | F | G | H | I
;
export function isInstanceOf <A, B, C, D, E, F, G, H> (
	constructor1: Constructor<A>,
	constructor2: Constructor<B>,
	constructor3: Constructor<C>,
	constructor4: Constructor<D>,
	constructor5: Constructor<E>,
	constructor6: Constructor<F>,
	constructor7: Constructor<G>,
	constructor8: Constructor<H>
):
	<T> (instance: T | A | B | C | D | E | F | G | H) => instance is A | B | C | D | E | F | G | H
;
export function isInstanceOf <A, B, C, D, E, F, G> (
	constructor1: Constructor<A>,
	constructor2: Constructor<B>,
	constructor3: Constructor<C>,
	constructor4: Constructor<D>,
	constructor5: Constructor<E>,
	constructor6: Constructor<F>,
	constructor7: Constructor<G>
):
	<T> (instance: T | A | B | C | D | E | F | G) => instance is A | B | C | D | E | F | G
;
export function isInstanceOf <A, B, C, D, E, F> (
	constructor1: Constructor<A>,
	constructor2: Constructor<B>,
	constructor3: Constructor<C>,
	constructor4: Constructor<D>,
	constructor5: Constructor<E>,
	constructor6: Constructor<F>
):
	<T> (instance: T | A | B | C | D | E | F) => instance is A | B | C | D | E | F
;
export function isInstanceOf <A, B, C, D, E> (
	constructor1: Constructor<A>,
	constructor2: Constructor<B>,
	constructor3: Constructor<C>,
	constructor4: Constructor<D>,
	constructor5: Constructor<E>
):
	<T> (instance: T | A | B | C | D | E) => instance is A | B | C | D | E
;
export function isInstanceOf <A, B, C, D> (
	constructor1: Constructor<A>,
	constructor2: Constructor<B>,
	constructor3: Constructor<C>,
	constructor4: Constructor<D>
):
	<T> (instance: T | A | B | C | D) => instance is A | B | C | D
;
export function isInstanceOf <A, B, C> (
	constructor1: Constructor<A>,
	constructor2: Constructor<B>,
	constructor3: Constructor<C>
):
	<T> (instance: T | A | B | C) => instance is A | B | C
;
export function isInstanceOf <A, B> (
	constructor1: Constructor<A>,
	constructor2: Constructor<B>
):
	<T> (instance: T | A | B) => instance is A | B
;
export function isInstanceOf <A> (
	constructor1: Constructor<A>
):
	<T> (instance: T | A) => instance is A
;
export function isInstanceOf <A> (...constructors: Constructor<A>[]) {
	return <T> (instance: T | A): instance is A =>
		constructors.some(aConstructor =>
			instance instanceof aConstructor
		);
}
