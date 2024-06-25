import {AppState} from "../app.state";
import {createSelector} from "@ngrx/store";
import {MapState} from "./map.reducer";

export const selectMapState = (state: AppState) => state.map;

export const selectMapsIsLoading = createSelector(selectMapState, (state: MapState) => {
  return state.isLoading;
});
export const selectMapPins = createSelector(selectMapState, (state: MapState) => {
  return state.pins;
});
export const selectMapsError = createSelector(selectMapState, (state: MapState) => {
  return state.error;
});
export const selectMapsNotFound = createSelector(selectMapState, (state: MapState) => {
  return state.notFound;
});
