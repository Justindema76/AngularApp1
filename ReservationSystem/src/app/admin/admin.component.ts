import { Component } from "@angular/core";
import { ReservationRepository } from "../reservations/reservation.respository";

@Component({
  selector: "admin",
  templateUrl: "./admin.component.html",
})
export class AdminComponent {
  constructor(private reservationRepository: ReservationRepository) {}

  get reservations() {
    return this.reservationRepository.getReservations();
  }
}
