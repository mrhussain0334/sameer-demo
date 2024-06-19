import {createAction, props} from '@ngrx/store';
import {TaskDto} from "./task.reducer";


export const updateName = createAction('[Task Management Component] Update Name', props<{name: string}>());
export const addTask = createAction('[Task Management Component] Add Task', props<{task: TaskDto}>());
export const removeTask = createAction('[Task Management Component] Remove Task', props<{ id: number }>());
export const updateTask = createAction('[Task Management Component] Update Task', props<{task: TaskDto}>());
export const AddTwoNumbers = createAction('[Task Management Component] Add Two Numbers', props<{number1: number, number2: number}>());
