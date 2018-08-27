import { isInstanceOf } from '@ts-task/utils';

// In this file we will check "isInstanceOf" functions inference.

class Foo {
	Foo = 'Foo';
}

class Bar {
	Bar = 'Bar';
}

const foo = new Foo();
const bar = new Bar();

const isInstanceOfFoo = isInstanceOf(Foo);
const isInstanceOfFooOrBar = isInstanceOf(Foo, Bar);

// isInstanceOfFoo inference on foo
if (isInstanceOfFoo(foo)) {
	// foo is Foo (duh!)
	foo; // $ExpectType Foo
} else {
	// foo should never be "not Foo"
	foo; // $ExpectType never
}

// isInstanceOfFoo inference on bar
if (isInstanceOfFoo(bar)) {
	// Someway bar is not only Bar, but also Foo
	bar; // $ExpectType Bar & Foo
} else {
	// bar is Bar (duh!)
	bar; // $ExpectType Bar
}

// isInstanceOfFooOrBar inference on foo
if (isInstanceOfFooOrBar(foo)) {
	// foo is only Foo
	foo; // $ExpectType Foo
} else {
	// foo should never be "not Foo"
	foo; // $ExpectType never
}

// isInstanceOfFooOrBar inference on bar
if (isInstanceOfFooOrBar(bar)) {
	// boo is only Bar
	bar; // $ExpectType Bar
} else {
	// bar should never be "not Bar"
	bar; // $ExpectType never
}
