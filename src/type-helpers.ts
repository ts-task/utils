import { Task } from "@ts-task/task";

export type TaskValue <T extends Task<any, any>> = T extends Task<infer V, any> ? V : never;
export type TaskError <T extends Task<any, any>> = T extends Task<any, infer E> ? E : never;
