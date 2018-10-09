# @ts-task/utils
[![Npm version](https://img.shields.io/npm/v/@ts-task/utils.svg)](https://www.npmjs.com/package/@ts-task/utils)
[![Build Status](https://travis-ci.com/ts-task/utils.svg?branch=master)](https://travis-ci.com/ts-task/utils)
[![Coverage Status](https://coveralls.io/repos/github/ts-task/utils/badge.svg?branch=master)](https://coveralls.io/github/ts-task/utils?branch=master)
![npm bundle size (minified)](https://img.shields.io/bundlephobia/min/@ts-task/utils.svg)
[![styled with prettier](https://img.shields.io/badge/styled_with-prettier-ff69b4.svg)](https://github.com/prettier/prettier)

Utils _functions_ to use with [Task](https://github.com/ts-task/task).

## API

### `isInstanceOf`

`isInstanceOf(Constructor1, Constructor2, ...) => (instance: any) => instance is Constructor1 | Constructor2 | ...`

It is an util function to use with [`caseError`](https://github.com/ts-task/utils#caseerror). `isInstanceOf` takes any number of _constructors_ (or _classes_) and returns a function that tells us if an object is an instance of any of those _constructors_. In case it is, it is also typed as well (see [_type guards_](https://www.typescriptlang.org/docs/handbook/advanced-types.html#type-guards-and-differentiating-types)).

```typescript
class Dog {
    bark () {
        return 'WOOF!';
    }
}

class Cat {
    meow () {
        return 'Meeeeeoooooooow';
    }
}

const isDog = isInstanceOf(Dog);

// This example is only for demonstration porpuses.
// I should actually prefer the animals to be polymorphic.
const talk = (animal: Dog | Cat) => {
    if (isDog(animal)) {
        // animal is typed as Dog
        animal.bark();
    }
    else {
        // animal is typed as Cat
        animal.meow();
    }
}
```

### `caseError`

`caseError(predicate, errHandler)`

`caseError` takes a _predicate_ (a _function_ to a `boolean`) and an _error handler_. If `predicate` returns `true` when called with the _rejected error_, then `errHandler` is called with the error and it's return value is returned. Else, the _rejected error_ is rejected again.

```typescript
import { Task } from '@ts-task/task';
import { caseError } from '@ts-task/utils';

// rejectedTask is a Task<never, FooError | BarError>
const rejectedTask = Task.reject(
        Math.random() > 0.5 ?
            new FooError() :
            new BarError()
    );

rejectedTask
    .catch(err =>
        // err is FooError | BarError
        Task.reject(err)
    )
    .catch(
        caseError(
            isInstanceOf(FooError),
            err =>
                // err is a FooError
                Task.resolve('foo ' + err.toString())
        )
    )
    .catch(err =>
        // err is a BarError (since the FooError case was resolved)
        Task.reject(err)
    )
;
```

> Note: have in mind that TypeScript does duck typing checks, hence `FooError` and `BarError` should have different _properties_ to let TypeScript infere they are different, since TypeScript has _structural typing_ instead of _nominal typing_.

### `toPromise`

`toPromise(task)`

`toPromise` _function_ naturally transforms a `Task` into a `Promise`.

```typescript
import { Task } from '@ts-task/task';
import { toPromise } from '@ts-task/utils';

// resolvedTask is a Task<number, never>
const resolvedTask = Task.resolve(9);

// resolvedPromise is Promise<number>
const resolvedPromise = toPromise(resolvedTask);


// rejectedTask is a Task<never, Error>
const rejectedTask = Task.resolve(new Error());

// rejectedPromise is Promise<never>, rejected with Error
const rejectedPromise = toPromise(rejectedTask);
```

### `share`

`task.pipe(share())`

As `Tasks` are _lazy_, the `Task`'s code isn't executed until it's resolved. But, for the same reason the `Task`'s code is executed each time it is `fork`ed (_operators_ - including `.map`, `.chain` and `.catch` _methods_ -  do `fork` the `Task`). `share` _function_ is an _operator_ that resolves the `Task` to that point and returns a `Task` _resolved_ (or _rejected_) with that value, so original `Task`'s code is executed only once.

```typescript
import { Task } from '@ts-task/task';
import { share } from '@ts-task/utils';

const task = new Task<string, never>(resolve => {
    console.log('Task\'s code is called');
    resolve('Foo');
});

const sharedTask = task
    .pipe(share);

sharedTask.fork(err => console.log(err), val => console.log(val));
sharedTask.fork(err => console.log(err), val => console.log(val));
sharedTask.fork(err => console.log(err), val => console.log(val));

// The message "Task's code is called" will be logged only once (even when forking multiple times).
```

## Credits

<!-- ALL-CONTRIBUTORS-LIST:START - Do not remove or modify this section -->
<!-- prettier-ignore -->
| [<img src="https://avatars1.githubusercontent.com/u/1573956?v=4" width="100px;"/><br /><sub><b>Gonzalo Gluzman</b></sub>](https://github.com/dggluz)<br />[💻](https://github.com/dggluz/@ts-task/utils/commits?author=dggluz "Code") [📖](https://github.com/dggluz/@ts-task/utils/commits?author=dggluz "Documentation") [⚠️](https://github.com/dggluz/@ts-task/utils/commits?author=dggluz "Tests") | [<img src="https://avatars0.githubusercontent.com/u/2634059?v=4" width="100px;"/><br /><sub><b>Hernan Rajchert</b></sub>](https://github.com/hrajchert)<br />[💻](https://github.com/dggluz/@ts-task/utils/commits?author=hrajchert "Code") [🎨](#design-hrajchert "Design") [📖](https://github.com/dggluz/@ts-task/utils/commits?author=hrajchert "Documentation") [🤔](#ideas-hrajchert "Ideas, Planning, & Feedback") [⚠️](https://github.com/dggluz/@ts-task/utils/commits?author=hrajchert "Tests") |
| :---: | :---: |
<!-- ALL-CONTRIBUTORS-LIST:END -->

This project follows the [all-contributors](https://github.com/kentcdodds/all-contributors) specification. Contributions of any kind are welcome!
