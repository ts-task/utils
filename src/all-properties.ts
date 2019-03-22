import { Task } from '@ts-task/task';
import { TaskValue, TaskError } from './type-helpers';

export interface TaskObject {
    [key: string]: Task<any, any>;
}

export type MapTaskValues <T extends TaskObject> = {
    [P in keyof T]: TaskValue<T[P]>;
};

export type ObjectTaskErrors <T extends TaskObject, K extends keyof T> = TaskError<T[K]>;

/**
 * allProperties works similar to Task.all but for objects instead of array.
 * It traverses an object whose values are Tasks and returns a new Task of the flattened object.
 * The returned Task can fail with the sum of the individual errors.
 * @param obj An object that has Task as values
 */
export function allProperties <T extends TaskObject, K extends keyof T>(obj: T): Task<MapTaskValues<T>, ObjectTaskErrors<T, K>> {
    // Flag to track if any Task has resolved
    let rejected = false;

    // Array that we'll fill with the resolved values, in order
    const resolvedValues: any = {};

    const keys = Object.keys(obj);

    // Counter of resolved Tasks (we can't use resolvedValues.length since we add elements through index)
    let resolvedQty = 0;

    return new Task((outerResolve, outerReject) => {
        // If there are no keys, resolve with an empty object.
        if (!keys.length) {
            outerResolve(resolvedValues);
        }

        keys.forEach((key: string) => {
            const aTask = obj[key];

            aTask
                .fork((err: any) => {
                    // We do only reject if there was no previous rejection
                    if (!rejected) {
                        rejected = true;
                        outerReject(err);
                    }
                }, (x: any) => {
                    // Shouldn't resolve if another Task has rejected
                    if (rejected) {
                        return;
                    }

                    // Track resolved value (in order)
                    resolvedValues[key] = x;
                    // ...and how many tasks has resolved
                    resolvedQty++;
                    if (resolvedQty === keys.length) {
                        outerResolve(resolvedValues);
                    }
                });
        });
    });
}
