import {Injectable} from "@angular/core";
import {HttpClient} from "@angular/common/http";
import {map, Observable} from "rxjs";
import axios from "axios";
import {MapPinDto} from "../../../states/map/map.reducer";

@Injectable({
  providedIn: "root"
})
export class ArcGisMapService {
  private arcgisUrl = 'https://geocode.arcgis.com/arcgis/rest/services/World/GeocodeServer/findAddressCandidates';

  constructor(private http: HttpClient) {
  }


  delay(ms: number) {
    return new Promise(resolve => setTimeout(resolve, ms));
  }
  getRandomCoordinates(): { lat: number, lng: number } {
    const latMin = 24.396308;
    const latMax = 49.384358;
    const lonMin = -125.0;
    const lonMax = -66.93457;

    const lat = Math.random() * (latMax - latMin) + latMin;
    const lng = Math.random() * (lonMax - lonMin) + lonMin;

    return { lat, lng };
  }

  async geocodeAddress(address: string): Promise<MapPinDto> {
    const params = {
      SingleLine: address,
      f: 'json',
      outFields: 'Match_addr,Addr_type'
    };
    await this.delay(1000);
    if (!address.includes('Test')) {
      var point = this.getRandomCoordinates();
      return {
        lat: point.lat,
        lng: point.lng,
        text: address
      };
    }
    return {
      lat: 0,
      lng: 0,
      text: address
    };
    // return this.http.get(this.arcgisUrl, {params}).pipe(
    //   map((response: any) => {
    //     if (response.candidates && response.candidates.length > 0) {
    //       const location = response.candidates[0].location;
    //       return {lat: location.y, lng: location.x};
    //     } else {
    //       throw new Error('No results found');
    //     }
    //   })
    // );
  }
}

