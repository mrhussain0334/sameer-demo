import {createAction, props} from "@ngrx/store";

export const loadGrokAi = createAction('[GrokAi Management Component] Load GrokAi', props<{data: string}>());
export const loadGrokAiLoading = createAction('[GrokAi Management Component] Load GrokAi Loader');
export const loadGrokAiSuccess = createAction('[GrokAi Management Component] Load GrokAi Success', props<{data: string}>());
export const loadGrokAiError = createAction('[GrokAi Management Component] Load GrokAi Error', props<{error: any}>());
