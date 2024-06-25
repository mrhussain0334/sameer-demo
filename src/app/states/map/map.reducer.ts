import {createReducer, on} from "@ngrx/store";
import {
  loadSearchAddressArcgisError,
  loadSearchAddressArcgisLoading, loadSearchAddressArcgisNotFound,
  loadSearchAddressArcgisSuccess, mapClearNotFound
} from "./map.action";
import copy from "fast-copy";

export interface MapPinDto {
  text: string,
  lat: number,
  lng: number;
}

export interface MapState {
  isLoading: boolean;
  error: any;
  pins: MapPinDto[];
  notFound: boolean;
  search: string
}


export const initialMapState: MapState = {
  isLoading: false,
  error: null,
  pins: [],
  notFound: false,
  search: ''
}


export const mapReducer = createReducer(initialMapState,
  on(loadSearchAddressArcgisLoading, (state, action) => {
    return {...state, isLoading: true}
  }),
  on(loadSearchAddressArcgisSuccess, (state, action) => {
    const t = copy(state.pins);
    t.push(action);
    return {...state, pins: t, isLoading: false,error: null}
  }),
  on(loadSearchAddressArcgisError, (state, action) => {
    return {...state, error: action.error, isLoading: false}
  }),
  on(loadSearchAddressArcgisNotFound, (state, action) => {
    return {...state, error: null, isLoading: false,notFound: true,search: action.search}
  }),
  on(mapClearNotFound, (state, action) => {
    return {...state, error: null, isLoading: false,notFound: false,search: ''}
  }),
)
