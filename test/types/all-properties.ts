import { Task } from '@ts-task/task';
import { allProperties } from '@ts-task/utils';

class CustomError {
}

const obj = {
    a: Task.resolve<string, string>('a'),
    b: Task.resolve<number, CustomError>(2)
};

allProperties(obj).fork(
    err => {
        // $ExpectType string | CustomError
        err;
    },
    val => {
        // $ExpectType string
        val.a;
        // $ExpectType number
        val.b;
    }
);