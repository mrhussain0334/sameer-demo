import {createAction, props} from "@ngrx/store";
import {MapPinDto} from "./map.reducer";

export const loadSearchAddressArcgis = createAction('[Map Task Component] Load Search Address Arcgis', props<{search: string}>());
export const loadSearchAddressArcgisLoading = createAction('[Map Task Component] Load Search Address Arcgis Loading');
export const loadSearchAddressArcgisSuccess = createAction('[Map Task Component] Load Search Address Arcgis Success', props<MapPinDto>());
export const loadSearchAddressArcgisError = createAction('[Map Task Component] Load Search Address Arcgis Error', props<{error: string}>());
export const loadSearchAddressArcgisNotFound = createAction('[Map Task Component] Load Search Address Arcgis NotFound', props<{search: string}>());
export const mapClearNotFound = createAction('[Map Task Component] Clear Not Found')
