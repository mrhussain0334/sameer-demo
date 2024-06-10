import {AppState} from "../app.state";
import {createSelector} from "@ngrx/store";
import {GrokAiState} from "./grokai.reducer";

export const selectGrokAiState = (state: AppState) => state.grokAi;

export const selectGrokAisIsLoading = createSelector(selectGrokAiState, (state: GrokAiState) => {
  return state.isLoading;
});
export const selectGrokAisResult = createSelector(selectGrokAiState, (state: GrokAiState) => {
  return state.result;
});
export const selectGrokAisError = createSelector(selectGrokAiState, (state: GrokAiState) => {
  return state.error;
});
