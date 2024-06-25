import {inject} from "@angular/core";
import {Actions, createEffect, ofType} from "@ngrx/effects";
import {catchError, from, map, of, switchMap} from "rxjs";
import {ArcGisMapService} from "../../pages/map-tasks/services/arc-gis-map.service";
import {
  loadSearchAddressArcgis,
  loadSearchAddressArcgisError,
  loadSearchAddressArcgisNotFound,
  loadSearchAddressArcgisSuccess
} from "./map.action";

export class MapEffect {
  private api = inject(ArcGisMapService);
  action$ = inject(Actions)
  loadMap$ = createEffect(() => this.action$.pipe(
    ofType(loadSearchAddressArcgis),
    switchMap(action => from(this.api.geocodeAddress(action.search)).pipe(
      map(result => {
        if (result.lat == 0 && result.lng == 0) {
          return loadSearchAddressArcgisNotFound({
            search: action.search,
          });
        }
        return loadSearchAddressArcgisSuccess({
          text: action.search,
          lat: result.lat,
          lng: result.lng
        });
      }),
      catchError(error => of(loadSearchAddressArcgisError({
        error: error.message
      })))
    ))
  ));
}
