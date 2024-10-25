import { NgModule } from "@angular/core";
import { BrowserModule } from "@angular/platform-browser";
import { FormsModule } from "@angular/forms";
import { ModelModule } from "../model/model.module"; // Ensure your model module exists
import { ReservationsComponent } from "./reservations.component"; // Import your ReservationsComponent

@NgModule({
  imports: [ModelModule, BrowserModule, FormsModule], // Import necessary modules
  declarations: [ReservationsComponent], // Declare the ReservationsComponent
  exports: [ReservationsComponent] // Export the ReservationsComponent
})
// src/app/reservations/reservations.model.ts

export class Reservation {
  constructor(
    public id: number,             // Unique identifier for the reservation
    public locationId: number,     // The ID of the location being reserved
    public timeSlot: Date,         // The date and time of the reservation
  ) {}
}

