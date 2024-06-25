import {Component, EventEmitter, Input, Output} from '@angular/core';
import {MapPinDto} from "../../../../states/map/map.reducer";
import {NgForOf} from "@angular/common";

@Component({
  selector: 'app-map-point-view',
  standalone: true,
  imports: [
    NgForOf
  ],
  templateUrl: './map-point-view.component.html',
  styleUrl: './map-point-view.component.css'
})
export class MapPointViewComponent {
  @Input() points: MapPinDto[] | null = [];
  @Output() onRowSelect: EventEmitter<MapPinDto> = new EventEmitter<MapPinDto>();
  _onRowSelect(row: MapPinDto) {
    this.onRowSelect.emit(row);
  }
}
