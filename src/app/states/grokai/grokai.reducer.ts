import {createReducer, on} from "@ngrx/store";
import {loadGrokAiError, loadGrokAiLoading, loadGrokAiSuccess} from "./grokai.action";

export interface GrokAiState {
  isLoading: boolean;
  error: any;
  result: any;
}


export const initialGrokAiState: GrokAiState = {
  isLoading: false,
  error: null,
  result: null,
}


export const grokAiReducer = createReducer(initialGrokAiState,
  on(loadGrokAiLoading, (state, action) => {
    return {...state, isLoading: true}
  }),
  on(loadGrokAiSuccess, (state, action) => {
    return {...state, result: action.data, isLoading: false}
  }),
  on(loadGrokAiError, (state, action) => {
    console.log(action);
    return {...state, error: action.error, isLoading: false}
  }),
)
