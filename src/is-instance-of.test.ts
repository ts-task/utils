import { isInstanceOf } from './is-instance-of';

describe('isInstanceOf', () => {
	class Foo {
		Foo = 'Foo';
	}

	class Bar {
		Bar = 'Bar';
	}

	class Baz {
		Baz = 'Baz';
	}

	describe('instanceOf with only one constructor', () => {
		it('An isInstanceOf function returns false when the object is not instance of the constructor', () => {
			// GIVEN: an "isInstanceOf" function that checks agains `Foo`
			const isInstanceOfFoo = isInstanceOf(Foo);
			// ...and an object that is not instance of `Foo`
			const bar = new Bar();
	
			// WHEN: calling that "instanceOf" function with that object
			const result = isInstanceOfFoo(bar);
	
			// THEN: the result is false
			expect(result).toBe(false);
		});
	
		it('An isInstanceOf function returns true when the object is instance of the constructor', () => {
			// GIVEN: an "isInstanceOf" function that checks agains `Foo`
			const isInstanceOfFoo = isInstanceOf(Foo);
			// ...and an object that is instance of `Foo`
			const foo = new Foo();
	
			// WHEN: calling that "instanceOf" function with that object
			const result = isInstanceOfFoo(foo);
	
			// THEN: the result is true
			expect(result).toBe(true);
		});	
	});

	describe('instanceOf with multiple constructors', () => {
		it('An isInstanceOf function returns false when the object is not instance of any of the constructors', () => {
			// GIVEN: an "isInstanceOf" function that checks agains `Foo` and `Bar`
			const isInstanceOfFooOrBar = isInstanceOf(Foo, Bar);
			// ...and an object that is neither instance of `Foo` or `Bar`
			const baz = new Baz();
	
			// WHEN: calling that "instanceOf" function with that object
			const result = isInstanceOfFooOrBar(baz);
	
			// THEN: the result is false
			expect(result).toBe(false);
		});
	
		it('An isInstanceOf function returns true when the object is instance of one of the constructors', () => {
			// GIVEN: an "isInstanceOf" function that checks agains `Foo`
			const isInstanceOfFooOrBar = isInstanceOf(Foo, Bar);
			// ...and an object that is instance of `Foo`
			const foo = new Foo();
	
			// WHEN: calling that "instanceOf" function with that object
			const result = isInstanceOfFooOrBar(foo);
	
			// THEN: the result is true
			expect(result).toBe(true);
		});	
	
		it('An isInstanceOf function returns true when the object is instance of the other constructor', () => {
			// GIVEN: an "isInstanceOf" function that checks agains `Foo`
			const isInstanceOfFooOrBar = isInstanceOf(Foo, Bar);
			// ...and an object that is instance of `Foo`
			const bar = new Bar();
	
			// WHEN: calling that "instanceOf" function with that object
			const result = isInstanceOfFooOrBar(bar);
	
			// THEN: the result is true
			expect(result).toBe(true);
		});	
	});
});
