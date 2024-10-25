import { Injectable } from "@angular/core";
import { Observable, from } from "rxjs";
import { Location } from "./location.model"; 

@Injectable({
  providedIn: 'root' 
})
export class LocationRepository {
  private locations: Location[] = [
    new Location(1, "CN Tower", "Iconic tower in Toronto", 100),
    new Location(2, "Niagara Falls", "Famous waterfalls located on the border of Ontario", 150),
    new Location(3, "Algonquin Park", "Large provincial park in Ontario", 50),
    new Location(4, "Banff National Park", "Stunning national park in Alberta", 200)
  ];

  getLocations(): Observable<Location[]> {
    return from([this.locations]); // Returns an observable containing the array
  }
}
