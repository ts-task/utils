import { tap } from '../../src/tap';

// We will test that the function returned by `tap` mantains its parameter's type
// and also uses it as return type.

// Given a function from number to another type
const stringifyNumber = (x: number) => x.toString(); // $ExpectType (x: number) => string

// ...the tapped version goes from number to number
tap(stringifyNumber); // $ExpectType (x: number) => number

///////////////////////////////////

// Given a function from boolean to another type
const yesOrNo = (x: boolean) => x ? 'Yes' : 'No'; // $ExpectType (x: boolean) => "Yes" | "No"

// ...the tapped versions goes from boolean to boolean
tap(yesOrNo); // $ExpectType (x: boolean) => boolean
