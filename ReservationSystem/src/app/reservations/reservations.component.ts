import { Component, OnInit } from "@angular/core";
import { Location } from "../model/location.model"; 
import { LocationRepository } from "../model/location.repository"; 
import { ReservationRepository } from "../model/reservation.repository";

@Component({
  selector: "reservations",
  templateUrl: "./reservations.component.html",
})
export class ReservationsComponent implements OnInit {
  selectedLocationId: number | null = null; 
  selectedFromTime: string | null = null; 
  selectedToTime: string | null = null; 
  selectedDate: string | null = null; 
  locations: Location[] = []; 
  selectedLocation: Location | null = null; 
  availableTimes: string[] = [];
  minDate: string = new Date().toISOString().split("T")[0]; // Disable past dates
  message: string | null = null; // New message property to display messages

  constructor(
    private locationRepository: LocationRepository,
    private reservationRepository: ReservationRepository
  ) {}

  ngOnInit(): void {
    this.locationRepository.getLocations().subscribe((locations) => {
      this.locations = locations;
    });
    this.populateAvailableTimes();
  }

  populateAvailableTimes(): void {
    this.availableTimes = [];
    for (let hour = 9; hour <= 17; hour++) {
      const hourString = hour < 10 ? `0${hour}` : `${hour}`;
      this.availableTimes.push(`${hourString}:00`);
      this.availableTimes.push(`${hourString}:30`);
    }
  }

  selectLocation(id: number): void {
    this.selectedLocationId = id;
    this.selectedLocation = this.locations.find(location => location.id === id) || null;
  }

  reserve(): void {
    if (this.selectedLocationId && this.selectedDate && this.selectedFromTime && this.selectedToTime) {
      const fromDateTime = new Date(`${this.selectedDate}T${this.selectedFromTime}:00`);
      const toDateTime = new Date(`${this.selectedDate}T${this.selectedToTime}:00`);

      if (this.validateTimeSlot(fromDateTime, toDateTime)) {
        this.reservationRepository.addReservation(this.selectedLocationId, fromDateTime, toDateTime);
        this.message = `Reservation successfully made for ${this.selectedLocation?.name} from ${this.selectedFromTime} to ${this.selectedToTime}`;
        this.resetForm();
      }
    } else {
      this.message = "Please select a location, date, and valid time slots before booking.";
    }
  }

  validateTimeSlot(fromTime: Date, toTime: Date): boolean {
    const timeDifference = (toTime.getTime() - fromTime.getTime()) / (1000 * 60 * 60); // Difference in hours

    if (timeDifference < 1 || timeDifference > 3) {
      this.message = "The booking duration must be between 1 hour and 3 hours.";
      return false;
    }
    
    if (fromTime.getHours() < 9 || toTime.getHours() > 18 || (toTime.getHours() === 18 && toTime.getMinutes() > 0)) {
      this.message = "You can only book time slots between 9:00 AM and 6:00 PM.";
      return false;
    }

    if (fromTime >= toTime) {
      this.message = "The start time must be before the finish time.";
      return false;
    }

    return true;
  }

  resetForm(): void {
    this.selectedLocationId = null;
    this.selectedFromTime = null;
    this.selectedToTime = null;
    this.selectedDate = null;
    this.selectedLocation = null;
  }

  selectHome(): void {
    // This should clear everything and take the user back to the "home" state
    this.resetForm();
    this.message = "You have returned to the Home screen.";
  }
}
