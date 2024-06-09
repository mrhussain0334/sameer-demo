import {Component, OnInit} from '@angular/core';
import Map from '@arcgis/core/Map';
import MapView from '@arcgis/core/views/MapView';
import Graphic from "@arcgis/core/Graphic";
import SimpleLineSymbol from "@arcgis/core/symbols/SimpleLineSymbol";
import Polyline from "@arcgis/core/geometry/Polyline";

@Component({
  selector: 'app-map-demo',
  standalone: true,
  templateUrl: './map-demo.component.html',
  styleUrl: './map-demo.component.css'
})
export class MapDemoComponent implements OnInit {
  private view: MapView = new MapView();

  ngOnInit() {
    const map = new Map({
      basemap: 'topo-vector'
    });

    this.view = new MapView({
      container: 'viewDiv',
      map: map,
      center: [-118.80500, 34.02700], // Longitude, latitude
      zoom: 13
    });
  }
  drawLine(): void {
    // Define the start and end points
    const pointA = [10, 30];
    const pointB = [-120, 35];

    // Create a polyline geometry
    const polyline = new Polyline({
      paths: [[pointA, pointB]]
    });

    // Define a simple line symbol
    const lineSymbol = new SimpleLineSymbol({
      color: [226, 119, 40], // RGB color values
      width: 4
    });

    // Create a graphic and add the geometry and symbol to it
    const polylineGraphic = new Graphic({
      geometry: polyline,
      symbol: lineSymbol
    });

    // Add the graphic to the map view's graphics layer
    this.view.graphics.add(polylineGraphic);
  }
}
