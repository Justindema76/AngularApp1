import { Injectable } from "@angular/core";
import { Location } from "./location.model"; // Make sure the path matches your setup
import { Observable, from } from "rxjs";

@Injectable()
export class StaticDataSource {
  // Replace the sample products with your location data
  private locations: Location[] = [
    new Location(1, "CN Tower", "A famous landmark in Toronto, Canada.", 30),
    new Location(2, "Banff National Park", "A beautiful national park in the Rockies.", 50),
    new Location(3, "Niagara Falls", "One of the most famous waterfalls in the world.", 25),
    new Location(4, "Stanley Park", "A large urban park in Vancouver.", 15),
    new Location(5, "Gros Morne National Park", "A UNESCO World Heritage site in Newfoundland.", 40),
    new Location(6, "Whistler Blackcomb", "A major ski resort in British Columbia.", 60),
  ];

  // Method to get the list of locations
  getLocations(): Observable<Location[]> {
    return from([this.locations]);
  }
}
