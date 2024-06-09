import {createReducer, on} from "@ngrx/store"
import {addTask, removeTask, updateTask} from "./task.action";
import copy from 'fast-copy';

export interface TaskDto {
  id: number,
  name: string,
  description: string,
}

export interface TaskState {
  tasks: TaskDto[],
}


export const initialTaskState: TaskState = {
  tasks: [],
}


export const taskReducer = createReducer(initialTaskState,
  on(addTask, (state, action) => {
    const t = copy(state.tasks);
    t.push(action.task);
    return {...state,tasks: t};
  }),
  on(removeTask, (state, action) => {
    let t = copy(state.tasks);
    t = t.filter((task) => task.id !== action.id);
    return {...state,tasks: t};
  }),
  on(updateTask, (state, action) => {
    let t = copy(state.tasks);
    const task = t.find((task) => task.id === action.task.id);
    if (task != null) {
      task.description = action.task.description;
      task.name = action.task.name;
    }
    return {...state,tasks: t}
  }),
)
