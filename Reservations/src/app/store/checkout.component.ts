import { Component } from "@angular/core";
import { NgForm } from "@angular/forms";
import { OrderRepository } from "../model/order.repository";
import { Order } from "../model/order.model";

@Component({
    templateUrl: "checkout.component.html",
    styleUrls: ["checkout.component.css"]
})
export class CheckoutComponent {
    orderSent: boolean = false;
    submitted: boolean = false;
    purchasedItems: any[] = []; // Initialize the array to store purchased items

    constructor(public repository: OrderRepository, public order: Order) {}

    submitOrder(form: NgForm) {
        this.submitted = true;
        if (form.valid) {
            // Capture the purchased items from the order
            this.purchasedItems = this.order.items; // Assuming order.items contains the purchased items
            this.repository.saveOrder(this.order).subscribe(() => {
                this.order.clear(); // Clear the order after saving
                this.orderSent = true; // Set orderSent to true
                this.submitted = false; // Reset submitted state
            });
        }
    }
}
