import {AppState} from "../app.state";
import {createSelector} from "@ngrx/store";
import {TaskState} from "./task.reducer";

export const selectTaskState = (state: AppState) => state.task;

export const selectTasks = createSelector(selectTaskState, (state: TaskState) => {
  return state?.tasks ?? [];
});
export const selectResults = createSelector(selectTaskState, (state: TaskState) => {
  return state?.result ?? 0;
});
export const selectName = createSelector(selectTaskState, (state: TaskState) => {
  return state?.name ?? '';
});
