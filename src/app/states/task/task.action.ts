import {createAction, props} from '@ngrx/store';
import {TaskDto} from "./task.reducer";

export const addTask = createAction('[Task Management Component] Add Task', props<{task: TaskDto}>());
export const removeTask = createAction('[Task Management Component] Remove Task', props<{ id: number }>());
export const updateTask = createAction('[Task Management Component] Update Task', props<{task: TaskDto}>());
