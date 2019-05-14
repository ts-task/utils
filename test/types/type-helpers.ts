import { Task } from '@ts-task/task';
import { TaskValue, TaskError } from '@ts-task/utils';

const t1 = Task.resolve(1);
type T1 = TaskValue<typeof t1>;

// $ExpectType number
const n: T1 = 1 as number;

const e1 = Task.reject('oh no');
type E1 = TaskError<typeof e1>;

// $ExpectType string
const s: E1 = 'oh no' as string;
