import {Component, OnInit} from '@angular/core';
import Map from "@arcgis/core/Map";
import Graphic from '@arcgis/core/Graphic';
import Point from '@arcgis/core/geometry/Point';
import SimpleMarkerSymbol from '@arcgis/core/symbols/SimpleMarkerSymbol';
import PopupTemplate from '@arcgis/core/PopupTemplate';
import MapView from "@arcgis/core/views/MapView";
import {FormControl, ReactiveFormsModule, Validators} from "@angular/forms";
import {Store} from "@ngrx/store";
import {AppState} from "../../../../states/app.state";
import {
  loadSearchAddressArcgis,
  loadSearchAddressArcgisSuccess,
  mapClearNotFound
} from "../../../../states/map/map.action";
import {MapPinDto} from "../../../../states/map/map.reducer";
import {selectMapPins, selectMapsError, selectMapsNotFound} from "../../../../states/map/map.selector";
import {lastValueFrom, Observable} from "rxjs";
import {AsyncPipe, NgIf} from "@angular/common";
import {MapPointViewComponent} from "../map-point-view/map-point-view.component";
import BasemapGallery from "@arcgis/core/widgets/BasemapGallery";

@Component({
  selector: 'app-map-tasks',
  standalone: true,
  imports: [
    ReactiveFormsModule,
    NgIf,
    MapPointViewComponent,
    AsyncPipe
  ],
  templateUrl: './map-tasks.component.html',
  styleUrl: './map-tasks.component.css'
})
export class MapTasksComponent implements OnInit {

  searchControl = new FormControl('',[Validators.required]);
  mapTypeControl = new FormControl('',[Validators.required]);

  mapPins$: Observable<MapPinDto[]>;
  searchNotFound$: Observable<boolean>;
  searchNotFound: boolean = false;
  constructor(private store: Store<AppState>) {
    this.mapPins$ = this.store.select(selectMapPins);
    this.searchNotFound$ = this.store.select(selectMapsNotFound);
    this.searchNotFound$.subscribe(p => {
      this.searchNotFound = p;
      if (this.searchNotFound) {
        this.searchControl.disable();
      }
      else {
        this.searchControl.enable();
        this.searchControl.reset();
      }
    });
    this.mapPins$.subscribe(p => {
      if (this.view) {
        this.view.graphics.removeAll();
        this.searchControl.reset();
        p.forEach(x => {
          this.addPoint(x.lng,x.lat,'Location Info', x.text ?? '');
        });
      }
    });
    this.mapTypeControl.valueChanges.subscribe(p => {
      if (p){
        this.view.map.basemap = p as any;
      }
    });
  }
  private view: MapView = new MapView();
  ngOnInit() {
    const map = new Map({
      basemap: 'streets-navigation-vector'
    });

    this.view = new MapView({
      container: 'viewDiv',
      map: map,
      center: [-118.80500, 34.02700], // Longitude, latitude
      zoom: 13,
    });
    this.view.on('click', (event) => {
      if (this.searchNotFound) {
        const lat = event.mapPoint.latitude;
        const lon = event.mapPoint.longitude;
        this.store.dispatch(loadSearchAddressArcgisSuccess({
          lat: lat,
          lng: lon,
          text: this.searchControl.value ?? ''
        }))
        this.store.dispatch(mapClearNotFound())
      }
      else {
        this.view.hitTest(event).then((response) => {
          if (response.results.length) {
            for (let result of response.results) {
              let pointGraphic = this.view.graphics.find(p => p.geometry == result.mapPoint);
              if (pointGraphic) {
                this.view.popup.open({
                  title: pointGraphic.popupTemplate.title.toString(),
                  content: pointGraphic.popupTemplate.content.toString(),
                  location: pointGraphic.geometry
                });
                break;
              }
            }
          }
        });
      }
    });
  }

  searchAndAdd() {
    if (!this.searchControl.valid) {
      return;
    }
    this.store.dispatch(loadSearchAddressArcgis({
      search: this.searchControl.value ?? ""
    }));
  }

  addPoint(lon: number, lat: number, title: string, content: string): void {
    const point = new Point({
      longitude: lon,
      latitude: lat
    });

    const markerSymbol = new SimpleMarkerSymbol({
      color: [226, 119, 40],
      outline: {
        color: [255, 255, 255],
        width: 1
      }
    });

    const popupTemplate = new PopupTemplate({
      title: title,
      content: content
    });

    const pointGraphic = new Graphic({
      geometry: point,
      symbol: markerSymbol,
      popupTemplate: popupTemplate
    });

    this.view.graphics.add(pointGraphic);
  }

  onRowSelect($event: MapPinDto) {
    this.view.center = new Point({
      latitude: $event.lat,
      longitude: $event.lng
    });
  }
}
