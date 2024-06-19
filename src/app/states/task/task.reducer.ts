import {createReducer, on} from "@ngrx/store"
import {addTask, AddTwoNumbers, removeTask, updateName, updateTask} from "./task.action";
import copy from 'fast-copy';

export interface TaskDto {
  id: number,
  name: string,
  description: string,
}

export interface TaskState {
  tasks: TaskDto[],
  result: number,
  name: string;
}


export const initialTaskState: TaskState = {
  tasks: [],
  result: 0,
  name: ''
}

// { task: [], result: 0 }
// AddTwoNumbers (5,5)
// { task: [], result: 10 }
// Add Task ({})
// { task: [{}], result: 10 }
export const taskReducer = createReducer(initialTaskState,
  on(updateName,(state,action) => {
    return {...state,name: action.name}
  }),
  on(AddTwoNumbers,(state,action) => {
    return {...state,result: action.number1 + action.number2};
  }),
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
